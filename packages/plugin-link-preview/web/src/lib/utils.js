import { DEFAULTS } from '../consts';
import { LINK_PREVIEW_TYPE } from '../types';
import { SelectionState, EditorState, Modifier, RichUtils } from 'draft-js';
import {
  getBlockAtStartOfSelection,
  replaceWithEmptyBlock,
  insertLinkInPosition,
  createBlock,
  deleteBlock,
} from 'wix-rich-content-editor-common';

export const addLinkPreview = async (editorState, config, blockKey, url) => {
  const settings = config[LINK_PREVIEW_TYPE];
  const { fetchData } = settings;
  const { setEditorState } = config;
  const linkPreviewData = await fetchData(url);
  if (shouldAddLinkPreview(linkPreviewData)) {
    const withoutLinkBlock = deleteBlock(editorState, blockKey);
    const { size, alignment } = { ...DEFAULTS, ...(settings || {}) };
    const { thumbnail_url, title, description, html, provider_url } = linkPreviewData;
    const data = {
      config: { size, alignment, link: { url } },
      thumbnail_url,
      title,
      description,
      html,
      provider_url,
    };
    const { newEditorState } = createBlock(withoutLinkBlock, data, LINK_PREVIEW_TYPE);
    setEditorState(RichUtils.insertSoftNewline(newEditorState));
  }
};

const isValidImgSrc = url => {
  return new Promise(resolve => {
    const image = document.createElement('img');
    image.src = url;
    image.onload = () => {
      resolve(true);
    };
    image.onerror = () => {
      resolve(false);
    };
  });
};

const shouldAddLinkPreview = linkPreviewData => {
  const { title, thumbnail_url } = linkPreviewData;
  if (thumbnail_url && title) {
    return isValidImgSrc(thumbnail_url);
  }
  return new Promise(resolve => resolve(false));
};

export const convertLinkPreviewToLink = editorState => {
  // preserve url
  const currentBlock = getBlockAtStartOfSelection(editorState);
  const blockKey = currentBlock.key;
  const url = getLinkPreviewUrl(editorState, currentBlock);

  // replace preview block with text block containing url
  const newState = replaceWithEmptyBlock(editorState, blockKey);
  const contentState = Modifier.insertText(
    newState.getCurrentContent(),
    newState.getSelection(),
    url
  );

  const editorStateWithLink = changePlainTextUrlToLinkUrl(contentState, blockKey, url);

  EditorState.push(
    editorStateWithLink,
    editorStateWithLink.getCurrentContent(),
    'change-block-type'
  );
  return EditorState.forceSelection(editorStateWithLink, editorStateWithLink.getSelection());
};

const getLinkPreviewUrl = (editorState, block) => {
  const entityKey = block.getEntityAt(0);
  const entityData = editorState
    .getCurrentContent()
    .getEntity(entityKey)
    ?.getData();
  return entityData?.config?.link?.url;
};

const deleteEmptyBlockAfterPreview = (contentState, blockKey) => {
  const block = contentState.getBlockForKey(blockKey);
  const nextBlock = contentState.getBlockAfter(blockKey);

  const selectionRange = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: block.text.length,
    focusKey: nextBlock.key,
    focusOffset: 1,
  });
  let newState = contentState;
  if (nextBlock && nextBlock.text.length === 0) {
    newState = Modifier.removeRange(contentState, selectionRange, 'forward');
  }
  return EditorState.push(newState, newState, 'change-block-type');
};

const changePlainTextUrlToLinkUrl = (contentState, url, blockKey) => {
  const editorState = deleteEmptyBlockAfterPreview(contentState, blockKey);
  return insertLinkInPosition(
    EditorState.push(editorState, editorState.getCurrentContent(), 'change-block-type'),
    blockKey,
    0,
    url.length,
    {
      url,
    }
  );
};
