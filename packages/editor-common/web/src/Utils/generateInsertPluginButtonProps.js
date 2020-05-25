import { createBlock } from './draftUtils.js';
import { EditorState } from '@wix/draft-js';
import { BUTTON_TYPES } from 'wix-rich-content-editor-common';
const galleryType = 'wix-draft-plugin-gallery';

export function generateInsertPluginButtonProps({
  blockType,
  button,
  helpers,
  pubsub,
  commonPubsub,
  settings,
  t,
  isMobile,
  pluginDefaults,
  getEditorState,
  setEditorState,
  hidePopup,
  theme,
  toolbarName,
}) {
  function onPluginAdd(name) {
    return helpers?.onPluginAdd?.(blockType, name || toolbarName);
  }

  function addBlock(data) {
    const { newBlock, newSelection, newEditorState } = createPluginBlock(
      getEditorState(),
      data,
      blockType
    );
    setTimeout(() => {
      window.getSelection().removeAllRanges();
      setEditorState(EditorState.forceSelection(newEditorState, newSelection));
    });
    return { newBlock, newSelection, newEditorState };
  }

  function addCustomBlock(buttonData) {
    buttonData.addBlockHandler?.(getEditorState());
  }

  function createPluginBlock(editorState, data, type) {
    onPluginAdd();
    hidePopup?.();
    return createBlock(editorState, data, type);
  }

  function createBlocksFromFiles(files, data, type, updateEntity) {
    let editorState = getEditorState();
    let selection;
    files.forEach(file => {
      const { newBlock, newSelection, newEditorState } = createPluginBlock(editorState, data, type);
      editorState = newEditorState;
      selection = selection || newSelection;
      updateEntity(newBlock.getKey(), file);
    });

    return { newEditorState: editorState, newSelection: selection };
  }

  function onClick(event) {
    event.preventDefault();
    switch (button.type) {
      case BUTTON_TYPES.FILE:
        toggleFileSelection();
        break;
      case BUTTON_TYPES.CUSTOM_BLOCK:
        onPluginAdd(name);
        addCustomBlock(button);
        break;
      default:
        addBlock(button.componentData || {});
        break;
    }
  }

  function shouldCreateGallery(files) {
    return (
      blockType === galleryType ||
      (pluginDefaults[galleryType] && settings.createGalleryForMultipleImages && files.length > 1)
    );
  }

  function handleFileChange(files, updateEntity) {
    if (files.length > 0) {
      const galleryData = pluginDefaults[galleryType];
      const { newEditorState, newSelection } = shouldCreateGallery(files)
        ? createBlocksFromFiles([files], galleryData, galleryType, updateEntity)
        : createBlocksFromFiles(files, button.componentData, blockType, updateEntity);
      setEditorState(EditorState.forceSelection(newEditorState, newSelection));
    }
  }

  function onChange(files) {
    return handleFileChange(files, (blockKey, file) => {
      const state = { userSelectedFiles: { files: Array.isArray(file) ? file : [file] } };
      commonPubsub.set('initialState_' + blockKey, state);
    });
  }

  function handleExternalFileChanged(data, error) {
    if (data) {
      const handleFilesAdded = shouldCreateGallery(data.data)
        ? blockKey => commonPubsub.getBlockHandler('galleryHandleFilesAdded', blockKey)
        : blockKey => pubsub.getBlockHandler('handleFilesAdded', blockKey);
      handleFileChange(data.data, (blockKey, file) =>
        setTimeout(() => handleFilesAdded(blockKey)({ data: file, error }))
      );
    }
  }

  const onConfirm = obj => {
    const data = addBlock(obj);
    return data;
  };

  function toggleFileSelection() {
    if (settings?.handleFileSelection) {
      settings.handleFileSelection(handleExternalFileChanged);
    } else if (helpers?.handleFileSelection) {
      const multiple = !!button.multi;
      helpers.handleFileSelection(
        undefined,
        multiple,
        handleExternalFileChanged,
        undefined,
        button.componentData
      );
    }
  }

  function isFileInput() {
    return (
      button.type === BUTTON_TYPES.FILE &&
      !settings.handleFileSelection &&
      !helpers.handleFileSelection
    );
  }

  function getButtonType() {
    if (isFileInput()) {
      return BUTTON_TYPES.FILE;
    }
    return button.type === BUTTON_TYPES.MODAL ? BUTTON_TYPES.MODAL : BUTTON_TYPES.BUTTON;
  }

  function getPropsByButtonType(type) {
    return {
      [BUTTON_TYPES.FILE]: { onChange, accept: settings.accept, multiple: button.multi },
      [BUTTON_TYPES.MODAL]: {
        modalElement: button.modalElement,
        modalDecorations: button.modalDecorations,
        modalName: button.modalName,
        onConfirm,
        modalStyles: button.modalStyles,
        modalStylesFn: button.modalStylesFn,
      },
      [BUTTON_TYPES.BUTTON]: { onClick },
    }[type];
  }

  const mappedProps =
    button.mapStoreDataToButtonProps?.({
      getEditorState,
      setEditorState,
      helpers,
      pubsub,
      commonPubsub,
      settings,
      t,
      isMobile,
      pluginDefaults,
      hidePopup,
      theme,
      toolbarName,
    }) || {};

  return {
    name: button.name,
    getIcon: () => button.Icon,
    tooltip: button.tooltipText,
    dataHook: `${button.name}${isFileInput() ? '_file_input' : ''}`,
    label: t(button.name),
    buttonType: getButtonType(),
    ...getPropsByButtonType(getButtonType()),
    ...mappedProps,
  };
}
