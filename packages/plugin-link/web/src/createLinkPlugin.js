import {
  createBasePlugin,
  // getUrlMatches,
  insertLinkInPosition,
  isValidUrl,
} from 'wix-rich-content-common';
import { LINK_TYPE } from './types';
import { Component } from './LinkComponent';
import { linkEntityStrategy } from './strategy';
import createLinkToolbar from './toolbar/createLinkToolbar';

const createLinkPlugin = (config = {}) => {
  const type = LINK_TYPE;
  const { theme, anchorTarget, relValue, [type]: settings = {}, ...rest } = config;
  settings.minLinkifyLength = settings.minLinkifyLength || 6;
  const toolbar = createLinkToolbar(config);

  const decorators = [{ strategy: linkEntityStrategy, component: Component }];
  let linkifyData;

  const handleReturn = (event, editorState) => {
    linkifyData = getLinkifyData(editorState);
  };

  const handleBeforeInput = (chars, editorState) => {
    if (/\s/.test(chars)) {
      linkifyData = getLinkifyData(editorState);
    }
  };

  const onChange = editorState => {
    if (linkifyData) {
      const newEditorState = addLinkAt(linkifyData, editorState);
      linkifyData = false;
      return newEditorState;
    }
    return editorState;
  };
  // linkify pasted text
  // onChange = editorState => {
  //   let newEditorState = editorState;
  //   if (editorState.getLastChangeType() === 'insert-fragment') {
  //     const content = editorState.getCurrentContent();
  //     const startKey = content.getSelectionBefore().getStartKey();
  //     const endKey = content.getSelectionAfter().getEndKey();
  //     const blockMap = content.getBlockMap();
  //     const blockKeys = blockMap.keySeq();
  //     const startIndex = blockKeys.indexOf(startKey);
  //     const endIndex = blockKeys.indexOf(endKey) + 1;
  //
  //     blockMap.slice(startIndex, endIndex).forEach(block => {
  //       const text = block.getText();
  //       getUrlMatches(text)
  //         .filter(({ text: url, index: start, lastIndex: end }) => {
  //           const entityKey = block.getEntityAt(start);
  //           const entityType = entityKey !== null && content.getEntity(entityKey).getType();
  //           const longEnough = url.length >= minLinkifyLength;
  //           return entityType !== 'LINK' && entityType !== 'WAS_LINK' && longEnough;
  //         })
  //         .forEach(({ text: url, index: start, lastIndex: end }) => {
  //           newEditorState = addLinkAt(
  //             { string: url, index: start, endIndex: end, blockKey: block.getKey() },
  //             newEditorState
  //           );
  //         });
  //     });
  //   }
  //   return newEditorState;
  // };

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
      ...rest,
    },
    { decorators, handleBeforeInput, handleReturn, onChange }
  );
};

export { createLinkPlugin };
