import mockLinkEditorState from '../../../../../e2e/tests/fixtures/headers.json';
import mockAlignmentEditorState from '../../../../../e2e/tests/fixtures/text-alignment.json';
import mockGifEditorState from '../../../../../e2e/tests/fixtures/gif.json';

import { EditorState, convertToRaw } from 'draft-js';
import {
  insertLinkAtCurrentSelection,
  insertLinkInPosition,
  hasLinksInBlock,
  hasLinksInSelection,
  getLinkDataInSelection,
  removeLinksInSelection,
  setTextAlignment,
  getAnchorBlockData,
  isAtomicBlockFocused,
  replaceWithEmptyBlock,
  deleteBlock,
  getSelectedBlocks,
} from './draftUtils';
import { normalizeInitialState } from 'wix-rich-content-common';
import { convertFromRaw, createWithContent } from 'wix-rich-content-editor';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test draftUtils functions', () => {
  const getContentStateAsComp = contentState => (
    <div>{JSON.stringify(convertToRaw(contentState))}</div>
  );
  const getContentStateAsTree = contentState =>
    renderer.create(getContentStateAsComp(contentState)).toJSON();
  const getStateFromObject = obj => {
    const anchorTarget = '_top';
    const relValue = 'noreferrer'; //
    const normalizedState = normalizeInitialState(obj, {
      anchorTarget,
      relValue,
    });
    const editorState = createWithContent(convertFromRaw(normalizedState));
    return { editorState, viewerState: normalizedState };
  };
  const getEditorStateWithSelectionAt = (editorState, blockKey) => {
    return setEditorStateSelection(editorState, {
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: 1,
    });
  };
  const setEditorStateSelection = (editorState, selection) => {
    const editorSelection = editorState.getSelection();
    const newSelection = editorSelection.merge(selection);
    return EditorState.forceSelection(editorState, newSelection);
  };
  describe('Test draftUtils Links functions', () => {
    const linkData = {
      url: 'www.google.com',
      targetBlank: true,
      nofollow: false,
      anchorTarget: '_blank',
      relValue: 'nofollow',
    };
    const { editorState } = getStateFromObject(mockLinkEditorState);
    const editorStateWithLink = insertLinkInPosition(editorState, '50k2j', 0, 7, linkData);
    const editorSelection = editorState.getSelection();
    const newSelection = editorSelection.merge({
      anchorKey: '50k2j',
      anchorOffset: 0,
      focusKey: '50k2j',
      focusOffset: 7,
    });

    const editorStateWithSelection = setEditorStateSelection(editorState, {
      anchorKey: '50k2j',
      anchorOffset: 0,
      focusKey: '50k2j',
      focusOffset: 7,
    });
    const editorStateWithSelectionOnLink = setEditorStateSelection(
      editorStateWithLink,
      newSelection
    );
    it('Test insertLinkInPosition function', () => {
      const tree = getContentStateAsTree(editorStateWithLink.getCurrentContent());
      expect(tree).toMatchSnapshot();
    });

    it('Test insertLinkAtCurrentSelection function', () => {
      const editorStateWithLink = insertLinkAtCurrentSelection(editorStateWithSelection, linkData);
      const tree = getContentStateAsTree(editorStateWithLink.getCurrentContent());
      expect(tree).toMatchSnapshot();
    });

    describe('Test hasLinksInBlock function', () => {
      const contentState = editorStateWithLink.getCurrentContent();
      it('should return true on block with link', () => {
        expect(hasLinksInBlock(contentState.getBlockForKey('50k2j'), contentState)).toEqual(true);
      });
      it('should return false on block without link', () => {
        expect(hasLinksInBlock(contentState.getBlockForKey('d4hhc'), contentState)).toEqual(false);
      });
    });

    describe('Test hasLinksInSelection function', () => {
      const editorStateWithoutLinks = EditorState.forceSelection(editorState, newSelection);

      it('should return true on editor state with link in selection', () => {
        expect(hasLinksInSelection(editorStateWithSelectionOnLink)).toEqual(true);
      });
      it('should return false on editor state without links in selection', () => {
        expect(hasLinksInSelection(editorStateWithoutLinks)).toEqual(false);
      });
      it('should return false on editor state without selections at all', () => {
        expect(hasLinksInSelection(editorState)).toEqual(false);
      });
    });

    it('Test getLinkDataInSelection function', () => {
      const selectionLinkData = getLinkDataInSelection(editorStateWithSelectionOnLink);
      const tree = renderer.create(<div>{JSON.stringify(selectionLinkData)}</div>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    describe('Test removeLinksInSelection function', () => {
      it('should remove link in selection', () => {
        const newEditorState = removeLinksInSelection(editorStateWithSelectionOnLink);
        const tree = getContentStateAsTree(newEditorState.getCurrentContent());
        expect(tree).toMatchSnapshot();
      });
      it('should not remove links outside the selection', () => {
        const newEditorState = removeLinksInSelection(editorStateWithLink);
        const tree = getContentStateAsTree(newEditorState.getCurrentContent());
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('Test draftUtils Alignment functions', () => {
    const { editorState } = getStateFromObject(mockAlignmentEditorState);
    const editorStateWithSelection = getEditorStateWithSelectionAt(editorState, '50k2j');
    it('Test getTextAlignment function', () => {
      const tree = getContentStateAsTree(editorStateWithSelection.getCurrentContent());
      expect(tree).toMatchSnapshot();
    });
    it('Test setTextAlignment function', () => {
      const newEditorState = setTextAlignment(editorStateWithSelection, 'right');
      const tree = getContentStateAsTree(newEditorState.getCurrentContent());
      expect(tree).toMatchSnapshot();
    });
    it('Test getAnchorBlockData function', () => {
      const anchorBlockData = getAnchorBlockData(editorStateWithSelection);
      const tree = renderer.create(<div>{JSON.stringify(anchorBlockData)}</div>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Test draftUtils Blocks functions', () => {
    const { editorState } = getStateFromObject(mockGifEditorState);
    const editorStateWithSelectionOnAtomic = getEditorStateWithSelectionAt(editorState, '1u5r4');
    const editorStateWithSelectionOnNotAtomic = getEditorStateWithSelectionAt(editorState, '8s1v3');

    it('Test replaceWithEmptyBlock function', () => {
      const newEditorState = replaceWithEmptyBlock(editorStateWithSelectionOnAtomic, '1u5r4');
      const tree = getContentStateAsTree(newEditorState.getCurrentContent());
      expect(tree).toMatchSnapshot();
    });

    it('Test deleteBlock function', () => {
      const newEditorState = deleteBlock(editorState, '1u5r4');
      const tree = getContentStateAsTree(newEditorState.getCurrentContent());
      expect(tree).toMatchSnapshot();
    });

    describe('Test isAtomicBlockFocused function', () => {
      it('should return false for no focus on atomic block', () => {
        expect(isAtomicBlockFocused(editorStateWithSelectionOnNotAtomic)).toEqual(false);
      });
      it('should return true for focus on atomic block', () => {
        expect(isAtomicBlockFocused(editorStateWithSelectionOnAtomic)).toEqual(true);
      });
    });

    describe('Test getSelectedBlocks function', () => {
      const editorWithSelectedBlocks = setEditorStateSelection(editorState, {
        anchorKey: '1u5r4',
        anchorOffset: 0,
        focusKey: 'bsrvp',
        focusOffset: 0,
      });

      it('should return the first block for editor state without selection', () => {
        const selectedBlocks = getSelectedBlocks(editorState);
        const tree = renderer.create(<div>{JSON.stringify(selectedBlocks)}</div>).toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should return array with the selected blocks', () => {
        const selectedBlocks = getSelectedBlocks(editorWithSelectedBlocks);
        const tree = renderer.create(<div>{JSON.stringify(selectedBlocks)}</div>).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
