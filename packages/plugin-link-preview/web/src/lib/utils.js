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
  const { thumbnail_url, title, description, html, provider_url } = linkPreviewData;
  if (shouldAddLinkPreview(title, thumbnail_url, html)) {
    const withoutLinkBlock = deleteBlock(editorState, blockKey);
    const { size, alignment } = { ...DEFAULTS, ...(settings || {}) };
    const data = {
      config: { size, alignment, link: { url } },
      thumbnail_url,
      title,
      description,
      html: isValidHtml(html) && html,
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

const isValidHtml = html => html && html.substring(0, 12) !== '<div>{"url":';

const shouldAddLinkPreview = (title, thumbnail_url, html) => {
  if (isValidHtml(html)) {
    return true;
  } else if (title && thumbnail_url) {
    return isValidImgSrc(thumbnail_url);
  }
  return false;
};

export const convertLinkPreviewToLink = editorState => {
  // preserve url
  let currentBlock = getBlockAtStartOfSelection(editorState);
  const blockKey = currentBlock.key;
  const url = getLinkPreviewUrl(editorState, currentBlock);

  // replace preview block with text block containing url
  let newState = replaceWithEmptyBlock(editorState, currentBlock.key);
  let contentState = Modifier.insertText(
    newState.getCurrentContent(),
    newState.getSelection(),
    url
  );
  // reread block after insertText
  currentBlock = contentState.getBlockForKey(currentBlock.key);
  const nextBlock = contentState.getBlockAfter(currentBlock.key);
  // delte empty block after preview
  const selectionRange = new SelectionState({
    anchorKey: currentBlock.key,
    anchorOffset: currentBlock.text.length,
    focusKey: nextBlock.key,
    focusOffset: 1,
  });
  if (nextBlock && nextBlock.text.length === 0) {
    contentState = Modifier.removeRange(contentState, selectionRange, 'forward');
  }
  newState = EditorState.push(newState, contentState, 'change-block-type');

  const editorStateWithLink = changePlainTextUrlToLinkUrl(newState, blockKey, url);

  return EditorState.forceSelection(editorStateWithLink, selectionRange);
};

const getLinkPreviewUrl = (editorState, block) => {
  const entityKey = block.getEntityAt(0);
  const entityData = editorState
    .getCurrentContent()
    .getEntity(entityKey)
    ?.getData();
  return entityData?.config?.link?.url;
};

const changePlainTextUrlToLinkUrl = (editorState, blockKey, url) => {
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
