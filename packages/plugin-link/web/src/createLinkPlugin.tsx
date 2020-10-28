import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import {
  insertLinkInPosition,
  fixPastedLinks,
  hasLinksInSelection,
  getVisibleSelectionRect,
  EditorState,
} from 'wix-rich-content-editor-common';
import {
  addLinkPreview,
  LINK_PREVIEW_TYPE,
} from 'wix-rich-content-plugin-link-preview/dist/lib/utils';
import { isValidUrl, CreatePluginFunction } from 'wix-rich-content-common';
import React, { KeyboardEvent } from 'react';
import { LINK_TYPE } from './types';
import { Component } from './LinkComponent';
import { linkEntityStrategy } from './strategy';
import createLinkToolbar from './toolbar/createToolbar';
import { DEFAULTS } from './defaults';
import { DraftHandleValue, ContentBlock } from 'draft-js';

type LinkifyData = {
  string: string;
  block: ContentBlock;
  blockKey: string;
  index: number;
  endIndex: number;
};

const createLinkPlugin: CreatePluginFunction = config => {
  const type = LINK_TYPE;
  const { theme, anchorTarget, relValue, [type]: settings = {}, commonPubsub, ...rest } = config;
  const targetBlank = anchorTarget === '_blank';
  const nofollow = relValue === 'nofollow';
  settings.minLinkifyLength = settings.minLinkifyLength || 6;
  const toolbar = createLinkToolbar({ ...config, closeInlinePluginToolbar });

  const decorators = [
    { strategy: linkEntityStrategy, component: props => <Component {...props} theme={theme} /> },
  ];
  let linkifyData: LinkifyData | undefined;

  const handleReturn = (
    event: KeyboardEvent,
    editorState: EditorState,
    pluginFunctions // eslint-disable-line @typescript-eslint/no-unused-vars, no-unused-vars
  ): DraftHandleValue => {
    linkifyData = getLinkifyData(editorState);
    if (shouldConvertToLinkPreview(linkifyData)) {
      const url = getBlockLinkUrl(linkifyData);
      const blockKey = linkifyData?.block.getKey();
      if (url && blockKey) {
        addLinkPreview(editorState, config, blockKey, url);
      }
    }
    return 'not-handled';
  };

  const shouldConvertToLinkPreview = (linkifyData?: LinkifyData) =>
    linkifyData && linkifyData.block?.getType() === 'unstyled' && config[LINK_PREVIEW_TYPE];

  const getBlockLinkUrl = linkifyData => {
    const { string, block } = linkifyData;
    if (block.getText() === string) {
      return string;
    }
  };

  const handleBeforeInput = (
    chars: string,
    editorState: EditorState,
    eventTimeStamp: number, // eslint-disable-line @typescript-eslint/no-unused-vars, no-unused-vars
    pluginFunctions // eslint-disable-line @typescript-eslint/no-unused-vars, no-unused-vars
  ): DraftHandleValue => {
    if (/\s/.test(chars)) {
      linkifyData = getLinkifyData(editorState);
    }
    return 'not-handled';
  };

  let prevContentState;
  const isPasteChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const contentChanged = contentState !== prevContentState;
    prevContentState = contentState;
    return contentChanged && editorState.getLastChangeType() === 'insert-fragment';
  };

  function openInlinePluginToolbar(commonPubsubData) {
    commonPubsub.set('cursorOnInlinePlugin', commonPubsubData);
  }
  function closeInlinePluginToolbar() {
    commonPubsub.set('cursorOnInlinePlugin', null);
  }

  const onChange = (editorState: EditorState) => {
    const selection = editorState.getSelection();
    if (hasLinksInSelection(editorState) && selection.isCollapsed() && selection.getHasFocus()) {
      setTimeout(() => {
        const boundingRect = getVisibleSelectionRect(window);
        openInlinePluginToolbar({ type, boundingRect });
      });
    } else {
      closeInlinePluginToolbar();
    }
    let newEditorState = editorState;
    if (isPasteChange(editorState)) {
      newEditorState = fixPastedLinks(editorState, { anchorTarget, relValue });
    } else if (linkifyData) {
      newEditorState = addLinkAt(linkifyData, editorState);
    }
    linkifyData = undefined;
    return newEditorState;
  };

  const getLinkifyData = (editorState: EditorState) => {
    const strData = findLastStringWithNoSpaces(editorState);
    return shouldLinkify(strData) ? strData : undefined;
  };

  const shouldLinkify = (consecutiveString: LinkifyData) =>
    consecutiveString.string.length >= settings.minLinkifyLength &&
    isValidUrl(consecutiveString.string) &&
    !(rangeContainsEntity(consecutiveString) && blockContainsPlainText(consecutiveString));

  const findLastStringWithNoSpaces = (editorState: EditorState): LinkifyData => {
    const selection = editorState.getSelection();
    const blockKey = selection.getAnchorKey();
    const block = editorState.getCurrentContent().getBlockForKey(blockKey);
    const text = block.getText();
    const endIndex = selection.getEndOffset();
    const index = text.lastIndexOf(' ', endIndex) + 1;
    const string = text.slice(index, endIndex);
    return { string, block, blockKey, index, endIndex };
  };

  const rangeContainsEntity = ({ block, index, endIndex }: LinkifyData) => {
    // eslint-disable-next-line fp/no-loops
    for (let i = index; i < endIndex; i++) {
      if (block.getEntityAt(i) !== null) {
        return true;
      }
    }
    return false;
  };

  const blockContainsPlainText = ({ block, string }: LinkifyData) =>
    block.getText().length > string.length;

  const addLinkAt = ({ string, index, endIndex, blockKey }, editorState) => {
    return insertLinkInPosition(editorState, blockKey, index, endIndex, {
      url: string,
      anchorTarget,
      relValue,
      targetBlank,
      nofollow,
    });
  };

  return createBasePlugin(
    {
      theme,
      toolbar,
      type,
      anchorTarget,
      relValue,
      settings,
      commonPubsub,
      defaultPluginData: DEFAULTS,
      ...rest,
    },
    { decorators, handleBeforeInput, handleReturn, onChange }
  );
};

export { createLinkPlugin };
