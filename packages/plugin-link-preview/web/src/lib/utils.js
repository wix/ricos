import { DEFAULTS } from '../consts';
import { LINK_PREVIEW_TYPE } from '../types';
import { SelectionState, EditorState, Modifier, RichUtils } from 'draft-js';
import {
  getCurrentBlock,
  replaceWithEmptyBlock,
  insertLinkInPosition,
  createBlock,
  deleteBlock,
} from 'wix-rich-content-editor-common';
import { isValidImgSrc } from 'wix-rich-content-common';

export const addLinkPreview = (editorState, config, blockKey, url) => {
  const settings = config[LINK_PREVIEW_TYPE];
  const { fetchData } = settings;
  const { setEditorState } = config;
  return fetchData(url).then(linkPreviewData => {
    shouldAddLinkPreview(linkPreviewData).then(shouldAddLinkPreview => {
      if (shouldAddLinkPreview /*|| html*/) {
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
    });
  });
};

const shouldAddLinkPreview = linkPreviewData => {
  const { title, thumbnail_url /*,html*/ } = linkPreviewData;
  if (thumbnail_url && title) {
    return isValidImgSrc(thumbnail_url);
  }
  return new Promise(resolve => resolve(false));
};

export const convertLinkPreviewToLink = editorState => {
  // preserve url
  let currentBlock = getCurrentBlock(editorState);
  const blockKey = currentBlock.key;
  const entityKey = currentBlock.getEntityAt(0);
  const entityData = editorState
    .getCurrentContent()
    .getEntity(entityKey)
    ?.getData();
  const url = entityData?.config?.link?.url;

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
  // change the url from plain text to a link
  const editorStateWithLink = insertLinkInPosition(
    EditorState.push(newState, newState.getCurrentContent(), 'change-block-type'),
    blockKey,
    0,
    url.length,
    {
      url,
    }
  );
  EditorState.push(
    editorStateWithLink,
    editorStateWithLink.getCurrentContent(),
    'change-block-type'
  );
  return EditorState.forceSelection(editorStateWithLink, editorStateWithLink.getSelection());
};
