import {
  createBasePlugin,
  insertLinkInPosition,
  fixPastedLinks,
  hasLinksInSelection,
  getVisibleSelectionRect,
} from 'wix-rich-content-editor-common';
import {
  isValidUrl,
  // getUrlMatches,
} from 'wix-rich-content-common';
import React from 'react';
import { LINK_TYPE } from './types';
import { Component } from './LinkComponent';
import { linkEntityStrategy } from './strategy';
import createLinkToolbar from './toolbar/createLinkToolbar';

const createLinkPlugin = (config = {}) => {
  const type = LINK_TYPE;
  const { theme, anchorTarget, relValue, [type]: settings = {}, commonPubsub, ...rest } = config;
  settings.minLinkifyLength = settings.minLinkifyLength || 6;
  const toolbar = createLinkToolbar(config);

  const decorators = [
    { strategy: linkEntityStrategy, component: props => <Component {...props} theme={theme} /> },
  ];
  let linkifyData;

  const handleReturn = (event, editorState) => {
    linkifyData = getLinkifyData(editorState);
  };

  const handleBeforeInput = (chars, editorState) => {
    if (/\s/.test(chars)) {
      linkifyData = getLinkifyData(editorState);
    }
  };

  let prevContentState;
  const isPasteChange = editorState => {
    const contentState = editorState.getCurrentContent();
    const contentChanged = contentState !== prevContentState;
    prevContentState = contentState;
    return contentChanged && editorState.getLastChangeType() === 'insert-fragment';
  };

  const onChange = editorState => {
    const selection = editorState.getSelection();
    if (hasLinksInSelection(editorState) && selection.isCollapsed()) {
      const boundingRect = getVisibleSelectionRect(window);
      commonPubsub.set('cursorOnInlinePlugin', { type, editorState, boundingRect });
    } else {
      commonPubsub.set('cursorOnInlinePlugin', null);
    }
    if (isPasteChange(editorState)) {
      return fixPastedLinks(editorState, { anchorTarget, relValue });
    } else if (linkifyData) {
      const newEditorState = addLinkAt(linkifyData, editorState);
      linkifyData = false;
      return newEditorState;
    }
    return editorState;
  };

  const getLinkifyData = editorState => {
    const str = findLastStringWithNoSpaces(editorState);
    return shouldLinkify(str) && str;
  };

  const shouldLinkify = consecutiveString =>
    consecutiveString.string.length >= settings.minLinkifyLength &&
    isValidUrl(consecutiveString.string) &&
    !rangeContainsEntity(consecutiveString);

  const findLastStringWithNoSpaces = editorState => {
    const selection = editorState.getSelection();
    const blockKey = selection.getAnchorKey();
    const block = editorState.getCurrentContent().getBlockForKey(blockKey);
    const text = block.getText();
    const endIndex = selection.getEndOffset();
    const index = text.lastIndexOf(' ', endIndex) + 1;
    const string = text.slice(index, endIndex);
    return { string, block, blockKey, index, endIndex };
  };

  const rangeContainsEntity = ({ block, index, endIndex }) => {
    // eslint-disable-next-line fp/no-loops
    for (let i = index; i < endIndex; i++) {
      if (block.getEntityAt(i) !== null) {
        return true;
      }
    }
    return false;
  };

  const addLinkAt = ({ string, index, endIndex, blockKey }, editorState) => {
    return insertLinkInPosition(editorState, blockKey, index, endIndex, {
      url: string,
      anchorTarget,
      relValue,
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
      ...rest,
    },
    { decorators, handleBeforeInput, handleReturn, onChange }
  );
};

export { createLinkPlugin };
