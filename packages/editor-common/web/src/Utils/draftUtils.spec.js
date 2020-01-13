import mockLinkEditorState from '../../../../../e2e/tests/fixtures/headers.json';
import mockAlignmentEditorState from '../../../../../e2e/tests/fixtures/text-alignment.json';
import mockGifEditorState from '../../../../../e2e/tests/fixtures/gif.json';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
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
  getTextAlignment,
} from './draftUtils';

const getContentAsObject = editorState => convertToRaw(editorState.getCurrentContent());
const getEditorStateFromJson = json => EditorState.createWithContent(convertFromRaw(json));
const setEditorStateSelection = (editorState, selection) => {
  const newSelection = editorState.getSelection().merge(selection);
  return EditorState.forceSelection(editorState, newSelection);
};
const getEditorStateWithSelectionAt = (editorState, blockKey) => {
  return setEditorStateSelection(editorState, {
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: 1,
  });
};
const linkData = {
  url: 'www.google.com',
  targetBlank: true,
  nofollow: false,
  anchorTarget: '_blank',
  relValue: 'nofollow',
};
const BLOCK_KEY1 = '50k2j';
const BLOCK_KEY2 = '1u5r4';
const BLOCK_KEY3 = 'd4hhc';
const BLOCK_KEY4 = '8s1v3';
const BLOCK_KEY5 = 'bsrvp';

const selection1 = {
  anchorKey: BLOCK_KEY1,
  anchorOffset: 0,
  focusKey: BLOCK_KEY1,
  focusOffset: 7,
};

const selection2 = {
  anchorKey: BLOCK_KEY2,
  anchorOffset: 0,
  focusKey: BLOCK_KEY5,
  focusOffset: 0,
};

describe('Test draftUtils functions', () => {
  describe('Test draftUtils Links functions', () => {
    const editorState = getEditorStateFromJson(mockLinkEditorState);

    it('Test insertLinkInPosition function', () => {
      const editorStateWithLink = insertLinkInPosition(editorState, BLOCK_KEY1, 0, 7, linkData);
      const contentStateObj = getContentAsObject(editorStateWithLink);
      expect(contentStateObj).toMatchSnapshot();
    });

    it('Test insertLinkAtCurrentSelection function', () => {
      const editorStateWithSelection = setEditorStateSelection(editorState, selection1);
      const editorStateWithLink = insertLinkAtCurrentSelection(editorStateWithSelection, linkData);
      const contentStateObj = getContentAsObject(editorStateWithLink);
      expect(contentStateObj).toMatchSnapshot();
    });

    describe('Test hasLinksInBlock function', () => {
      const editorStateWithLink = insertLinkInPosition(editorState, BLOCK_KEY1, 0, 7, linkData);
      const contentState = editorStateWithLink.getCurrentContent();
      it('should return true on block with link', () => {
        expect(hasLinksInBlock(contentState.getBlockForKey(BLOCK_KEY1), contentState)).toEqual(
          true
        );
      });
      it('should return false on block without link', () => {
        expect(hasLinksInBlock(contentState.getBlockForKey(BLOCK_KEY3), contentState)).toEqual(
          false
        );
      });
    });

    const selection = editorState.getSelection().merge(selection1);
    const editorStateWithLink = insertLinkInPosition(editorState, BLOCK_KEY1, 0, 7, linkData);
    const editorStateWithSelectionOnLink = setEditorStateSelection(editorStateWithLink, selection);

    describe('Test hasLinksInSelection function', () => {
      const editorStateWithoutLinks = EditorState.forceSelection(editorState, selection);

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
      expect(selectionLinkData).toMatchSnapshot();
    });

    describe('Test removeLinksInSelection function', () => {
      it('should remove link in selection', () => {
        const newEditorState = removeLinksInSelection(editorStateWithSelectionOnLink);
        const contentStateObj = getContentAsObject(newEditorState);
        expect(contentStateObj).toMatchSnapshot();
      });
      it('should not remove links outside the selection', () => {
        const newEditorState = removeLinksInSelection(editorStateWithLink);
        const contentStateObj = getContentAsObject(newEditorState);
        expect(contentStateObj).toMatchSnapshot();
      });
    });
  });

  describe('Test draftUtils Alignment functions', () => {
    const editorState = getEditorStateFromJson(mockAlignmentEditorState);
    const editorStateWithSelection = getEditorStateWithSelectionAt(editorState, BLOCK_KEY1);
    it('Test getTextAlignment function', () => {
      expect(getTextAlignment(editorState)).toEqual('left');
    });
    it('Test setTextAlignment function', () => {
      const newEditorState = setTextAlignment(editorStateWithSelection, 'right');
      const contentStateObj = getContentAsObject(newEditorState);
      expect(contentStateObj).toMatchSnapshot();
    });
    it('Test getAnchorBlockData function', () => {
      const anchorBlockData = getAnchorBlockData(editorStateWithSelection);
      expect(anchorBlockData).toMatchSnapshot();
    });
  });

  describe('Test draftUtils Blocks functions', () => {
    const editorState = getEditorStateFromJson(mockGifEditorState);
    const editorStateWithSelectionOnAtomic = getEditorStateWithSelectionAt(editorState, BLOCK_KEY2);
    const editorStateWithSelectionOnNotAtomic = getEditorStateWithSelectionAt(
      editorState,
      BLOCK_KEY4
    );

    it('Test replaceWithEmptyBlock function', () => {
      const newEditorState = replaceWithEmptyBlock(editorStateWithSelectionOnAtomic, BLOCK_KEY2);
      const contentStateObj = getContentAsObject(newEditorState);
      expect(contentStateObj).toMatchSnapshot();
    });

    it('Test deleteBlock function', () => {
      const newEditorState = deleteBlock(editorState, BLOCK_KEY2);
      const contentStateObj = getContentAsObject(newEditorState);
      expect(contentStateObj).toMatchSnapshot();
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
      const editorWithSelectedBlocks = setEditorStateSelection(editorState, selection2);

      it('should return the block that belongs to the cursor', () => {
        const selectedBlocks = getSelectedBlocks(editorState);
        expect(selectedBlocks).toMatchSnapshot();
      });
      it('should return array with the selected blocks', () => {
        const selectedBlocks = getSelectedBlocks(editorWithSelectedBlocks);
        expect(selectedBlocks).toMatchSnapshot();
      });
    });
  });
});
