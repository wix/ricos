import { DEFAULTS } from '../src/defaults';
import { LINK_PREVIEW_TYPE } from '../src/types';
import {
  getBlockAtStartOfSelection,
  replaceWithEmptyBlock,
  insertLinkInPosition,
  createBlock,
  deleteBlockText,
  SelectionState,
  EditorState,
  Modifier,
  RichUtils,
} from 'wix-rich-content-editor-common';
import { CreatePluginConfig } from 'wix-rich-content-common';

const addLinkPreview = async (
  editorState: EditorState,
  config: CreatePluginConfig,
  blockKey: string,
  url: string
) => {
  const fixedUrl = url.split('\u21b5').join(''); //remove {enter} char
  const settings = config[LINK_PREVIEW_TYPE] || {};
  const { fetchData, enableEmbed = true, enableLinkPreview = true } = settings;
  const { setEditorState } = config;
  const linkPreviewData = await fetchData(fixedUrl);
  const { thumbnail_url, title, description, html, provider_url } = linkPreviewData;
  if (
    shouldAddEmbed(html, enableEmbed, fixedUrl) ||
    shouldAddLinkPreview(title, thumbnail_url, enableLinkPreview)
  ) {
    const withoutLinkBlock = deleteBlockText(editorState, blockKey);
    const currentConfig = { ...DEFAULTS, ...settings }.config;
    const data = {
      config: {
        ...currentConfig,
        link: { url: fixedUrl, ...currentConfig.link },
        width: html && 350,
      },
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

const isValidImgSrc = (url: string) => {
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

const shouldAddLinkPreview = (title: string, thumbnail_url: string, enableLinkPreview: boolean) => {
  if (enableLinkPreview && title && thumbnail_url) {
    return isValidImgSrc(thumbnail_url);
  }
  return false;
};

const shouldAddEmbed = (html, enableEmbed: boolean, url: string) => {
  if (Array.isArray(enableEmbed)) {
    return (
      enableEmbed.filter(whiteListType => url.toLowerCase().includes(whiteListType.toLowerCase()))
        .length > 0
    );
  }
  return html && enableEmbed;
};

export const convertLinkPreviewToLink = (editorState: EditorState) => {
  // preserve url
  let currentBlock = getBlockAtStartOfSelection(editorState);
  const blockKey = currentBlock.getKey();
  const url = getLinkPreviewUrl(editorState, currentBlock);

  // replace preview block with text block containing url
  let newState = replaceWithEmptyBlock(editorState, currentBlock.getKey());
  const contentState = Modifier.insertText(
    newState.getCurrentContent(),
    newState.getSelection(),
    url
  );
  // reread block after insertText
  currentBlock = contentState.getBlockForKey(currentBlock.getKey());
  const nextBlock = contentState.getBlockAfter(currentBlock.getKey());
  newState = EditorState.push(newState, contentState, 'change-block-type');

  const editorStateWithLink = changePlainTextUrlToLinkUrl(newState, blockKey, url);
  const newLineSelection = new SelectionState({
    anchorKey: nextBlock.getKey(),
    anchorOffset: 0,
    focusKey: nextBlock.getKey(),
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

export { LINK_PREVIEW_TYPE, addLinkPreview };
