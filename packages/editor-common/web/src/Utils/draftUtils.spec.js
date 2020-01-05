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
  getTextAlignment,
  setTextAlignment,
  getAnchorBlockData,
  isAtomicBlockFocused,
  replaceWithEmptyBlock,
  deleteBlock,
  getSelectedBlocks,
} from './draftUtils';
import { normalizeInitialState } from 'wix-rich-content-common';
import { convertFromRaw, createWithContent } from 'wix-rich-content-editor';

/* eslint-disable max-len*/
describe('Test draftUtils functions', () => {
  const getStateFromObject = obj => {
    const anchorTarget = '_top';
    const relValue = 'noreferrer';
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
    describe('Test insertLinkInPosition function', () => {
      const contentStateObj = convertToRaw(editorStateWithLink.getCurrentContent());
      const blockWithLink = contentStateObj.blocks[0];

      it('should add entityRanges to the relevant blocks', () => {
        expect(blockWithLink.key).toEqual('50k2j');
        expect(blockWithLink.entityRanges.length).toEqual(1);
      });
      it('should add inlineStyleRanges to the relevant blocks', () => {
        expect(blockWithLink.inlineStyleRanges.length).toEqual(1);
      });
      it('should add link entity to entity map', () => {
        expect(contentStateObj.entityMap[0].type).toEqual('LINK');
      });
    });

    describe('Test insertLinkAtCurrentSelection function', () => {
      const editorStateWithLink = insertLinkAtCurrentSelection(editorStateWithSelection, linkData);
      const newContentState = editorStateWithLink.getCurrentContent();

      it('should add entityRanges to the blocks in the selection', () => {
        expect(convertToRaw(newContentState).blocks[0].entityRanges.length).toEqual(1);
      });
      it('should add link entity to entity map', () => {
        expect(convertToRaw(newContentState).entityMap[0].type).toEqual('LINK');
      });
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

    describe('Test getLinkDataInSelection function', () => {
      const selectionLinkData = getLinkDataInSelection(editorStateWithSelectionOnLink);
      const linkDataFields = { url: 'url', target: 'anchorTarget' };
      const selectionLinkDataFields = ['url', 'target'];

      selectionLinkDataFields.forEach(field => {
        it(`should return the link ${field} data for the link in the selectio`, () => {
          expect(selectionLinkData[field]).toEqual(linkData[linkDataFields[field]]);
        });
      });
      it(`should return noopener rel if the link is without nofollow`, () => {
        expect(selectionLinkData.rel).toEqual('noopener');
      });

      it(`should return empty object for selectio without link`, () => {
        expect(getLinkDataInSelection(editorState)).toEqual({});
      });
    });

    describe('Test removeLinksInSelection function', () => {
      it('should remove link in selection', () => {
        expect(hasLinksInSelection(removeLinksInSelection(editorStateWithSelectionOnLink))).toEqual(
          false
        );
      });
      const contentStatewithoutLinkInSelection = removeLinksInSelection(
        editorStateWithLink
      ).getCurrentContent();
      it('should not remove links outside the selection', () => {
        expect(
          hasLinksInBlock(
            contentStatewithoutLinkInSelection.getBlockForKey('50k2j'),
            contentStatewithoutLinkInSelection
          )
        ).toEqual(true);
      });
    });

    describe('Test draftUtils Alignment functions', () => {
      const { editorState } = getStateFromObject(mockAlignmentEditorState);
      const editorStateWithSelection = getEditorStateWithSelectionAt(editorState, '50k2j');
      describe('Test getTextAlignment function', () => {
        const alignmentsMap = ['left', 'right', 'center', 'justify'];
        const blockKeysAlignmentMap = ['civd5', 'bmg0d', 'ehr1q', 'e2imv'];
        it('should return left as default for text without alignment', () => {
          expect(getTextAlignment(getEditorStateWithSelectionAt(editorState, '50k2j'))).toEqual(
            'left'
          );
        });
        alignmentsMap.forEach((alignment, index) => {
          it(`should return ${alignment} for text with ${alignment} alignment`, () => {
            expect(
              getTextAlignment(
                getEditorStateWithSelectionAt(editorState, blockKeysAlignmentMap[index])
              )
            ).toEqual(alignment);
          });
        });
      });
      describe('Test setTextAlignment function', () => {
        it('should set the new alignment', () => {
          expect(getTextAlignment(setTextAlignment(editorStateWithSelection, 'right'))).toEqual(
            'right'
          );
        });
      });
      describe('Test getAnchorBlockData function', () => {
        describe('Test setTextAlignment function', () => {
          it('should return the data relevant to where the user began the selection', () => {
            expect(getAnchorBlockData(editorStateWithSelection)).toEqual({ textAlignment: 'left' });
          });
        });
      });
    });
    describe('Test draftUtils Blocks functions', () => {
      const { editorState } = getStateFromObject(mockGifEditorState);
      const editorStateWithSelectionOnAtomic = getEditorStateWithSelectionAt(editorState, '1u5r4');
      const editorStateWithSelectionOnNotAtomic = getEditorStateWithSelectionAt(
        editorState,
        '8s1v3'
      );
      describe('Test isAtomicBlockFocused function', () => {
        it('should return false for no focus on atomic block', () => {
          expect(isAtomicBlockFocused(editorStateWithSelectionOnNotAtomic)).toEqual(false);
        });
        it('should return true for focus on atomic block', () => {
          expect(isAtomicBlockFocused(editorStateWithSelectionOnAtomic)).toEqual(true);
        });
      });
      describe('Test replaceWithEmptyBlock function', () => {
        const editorStateWithoutGif = replaceWithEmptyBlock(
          editorStateWithSelectionOnAtomic,
          '1u5r4'
        );
        const contentStateWithEmptyBlock = convertToRaw(editorStateWithoutGif.getCurrentContent());
        const resetBlockFields = [
          'text',
          'type',
          'depth',
          'inlineStyleRanges',
          'entityRanges',
          'data',
        ];
        const emptyBlockVal = ['', 'unstyled', 0, [], [], {}];
        resetBlockFields.map((field, index) => {
          return it(`should reset ${field} block field`, () => {
            expect(contentStateWithEmptyBlock.blocks[1][field]).toEqual(emptyBlockVal[index]);
          });
        });
      });
      describe('Test deleteBlock function', () => {
        const editorWithDeletedBlock = deleteBlock(editorState, '1u5r4');
        const contentStateWithDeletedBlock = editorWithDeletedBlock.getCurrentContent();

        it('should remove the specified block', () => {
          expect(contentStateWithDeletedBlock.getBlockForKey('1u5r4')).toEqual(undefined);
        });
        it('should not remove blocks rathe then the specified block', () => {
          expect(!!contentStateWithDeletedBlock.getBlockForKey('8s1v3')).toEqual(true);
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
          expect(getSelectedBlocks(editorState)[0].key).toEqual('8s1v3');
        });
        it('should return array with the selected blocks', () => {
          expect(getSelectedBlocks(editorWithSelectedBlocks).length).toEqual(2);
        });
      });
    });
  });
});
