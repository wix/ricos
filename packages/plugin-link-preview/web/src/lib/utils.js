import { DEFAULTS, AUTO_GENERATED_LINK_PREVIEW_PROVIDER } from '../consts';
import { LINK_PREVIEW_TYPE } from '../types';
import { SelectionState, EditorState, Modifier, RichUtils } from 'draft-js';
import {
  getBlockAtStartOfSelection,
  replaceWithEmptyBlock,
  insertLinkInPosition,
  createBlock,
  deleteBlockText,
} from 'wix-rich-content-editor-common';

export const addLinkPreview = async (editorState, config, blockKey, url) => {
  const settings = config[LINK_PREVIEW_TYPE];
  const { fetchData } = settings;
  const { setEditorState } = config;
  const linkPreviewData = await fetchData(url);
  const { thumbnail_url, title, description, html, provider_url, provider_name } = linkPreviewData;
  const embedLink = provider_name !== AUTO_GENERATED_LINK_PREVIEW_PROVIDER && html;
  if (embedLink || shouldAddLinkPreview(title, thumbnail_url)) {
    const withoutLinkBlock = deleteBlockText(editorState, blockKey);
    const { size, alignment } = { ...DEFAULTS, ...(settings || {}) };
    const data = {
      config: { size, alignment, link: { url, ...DEFAULTS.link }, width: embedLink && 350 },
      thumbnail_url,
      title,
      description,
      html: embedLink,
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

const shouldAddLinkPreview = (title, thumbnail_url) => {
  if (title && thumbnail_url) {
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
  const contentState = Modifier.insertText(
    newState.getCurrentContent(),
    newState.getSelection(),
    url
  );
  // reread block after insertText
  currentBlock = contentState.getBlockForKey(currentBlock.key);
  const nextBlock = contentState.getBlockAfter(currentBlock.key);
  newState = EditorState.push(newState, contentState, 'change-block-type');

  const editorStateWithLink = changePlainTextUrlToLinkUrl(newState, blockKey, url);
  const newLineSelection = new SelectionState({
    anchorKey: nextBlock.key,
    anchorOffset: 0,
    focusKey: nextBlock.key,
    focusOffset: 0,
  });

  return EditorState.forceSelection(editorStateWithLink, newLineSelection);
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
