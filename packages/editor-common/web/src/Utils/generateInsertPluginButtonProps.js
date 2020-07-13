import { createBlock } from './draftUtils.js';
import { EditorState } from '@wix/draft-js';
import { BUTTON_TYPES } from '../consts';
const galleryType = 'wix-draft-plugin-gallery';

export function generateInsertPluginButtonProps({
  blockType,
  button,
  helpers,
  pubsub,
  commonPubsub,
  settings,
  t,
  theme,
  isMobile,
  pluginDefaults,
  getEditorState,
  setEditorState,
  toolbarName,
  pluginMenuButtonRef,
  closePluginMenu,
}) {
  function onPluginAdd() {
    // TODO: check BI meaning of the toolbarName => button.name change
    return helpers?.onPluginAdd?.(blockType, button.name);
  }

  function addBlock(data) {
    const { newBlock, newSelection, newEditorState } = createPluginBlock(
      getEditorState(),
      data,
      blockType
    );
    setEditorState(EditorState.forceSelection(newEditorState, newSelection));
    return { newBlock, newSelection, newEditorState };
  }

  function addCustomBlock(buttonData) {
    buttonData.addBlockHandler?.(getEditorState());
  }

  function createPluginBlock(editorState, data, type) {
    onPluginAdd();
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
      case 'file':
        toggleFileSelection();
        break;
      case 'modal':
        toggleButtonModal(event);
        break;
      case 'custom-block':
        onPluginAdd();
        addCustomBlock(button);
        break;
      case BUTTON_TYPES.BUTTON:
        if (button.onClick) {
          button.onClick(event);
        } else {
          addBlock(button.componentData || {});
        }
        break;
      default:
        addBlock(button.componentData || {});
        break;
    }
    closePluginMenu?.();
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

  function handleExternalFileChanged({ data, error }) {
    if (data) {
      const handleFilesAdded = shouldCreateGallery(data)
        ? blockKey => commonPubsub.getBlockHandler('galleryHandleFilesAdded', blockKey)
        : blockKey => pubsub.getBlockHandler('handleFilesAdded', blockKey);
      handleFileChange(data, (blockKey, file) =>
        setTimeout(() => handleFilesAdded(blockKey)({ data: file, error }))
      );
    }
  }

  function toggleButtonModal(event) {
    document.activeElement?.blur(); // fixes focus/selction after giphy is inserted
    if (helpers && helpers.openModal) {
      let modalStyles = {};
      if (button.modalStyles) {
        modalStyles = button.modalStyles;
        // relies on button ref
      } else if (button.modalStylesFn) {
        modalStyles = button.modalStylesFn({
          buttonRef: pluginMenuButtonRef || event.target,
          pubsub,
          toolbarName,
        });
      }

      let addedBlockKey;

      helpers.openModal({
        modalName: button.modalName,
        modalElement: button.modalElement,
        modalDecorations: button.modalDecorations,
        buttonRef: event.target,
        modalStyles,
        theme,
        componentData: button.componentData,
        onConfirm: obj => {
          const data = addBlock(obj);
          addedBlockKey = data.newBlock;
          return data;
        },
        pubsub,
        helpers,
        t,
        isMobile,
        blockKey: addedBlockKey,
      });
    }
  }

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
    return isFileInput() ? BUTTON_TYPES.FILE : BUTTON_TYPES.BUTTON;
  }

  function getPropsByButtonType(type) {
    return {
      [BUTTON_TYPES.FILE]: { onChange, accept: settings.accept, multiple: button.multi },
      [BUTTON_TYPES.BUTTON]: { onClick },
    }[type];
  }

  return {
    name: button.name,
    getIcon: button.getIcon,
    tooltip: button.tooltip,
    dataHook: `${button.name}${isFileInput() ? '_file_input' : ''}`,
    getLabel: () => t(button.name),
    isDisabled: button.isDisabled || (() => false),
    isActive: button.isActive || (() => false),
    type: getButtonType(),
    toolbars: button.toolbars,
    ...getPropsByButtonType(getButtonType()),
  };
}
