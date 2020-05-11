import { createBlock } from './draftUtils.js';
import { EditorState } from '@wix/draft-js';

const galleryType = 'wix-draft-plugin-gallery';

/* createInsertPluginButtonProps */
export default ({
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
}) => {
  const onPluginAdd = name => helpers?.onPluginAdd?.(blockType, name || toolbarName);

  const addBlock = data => {
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
  };

  const addCustomBlock = buttonData => {
    buttonData.addBlockHandler?.(getEditorState());
  };

  const createPluginBlock = (editorState, data, type) => {
    onPluginAdd();
    hidePopup?.();
    return createBlock(editorState, data, type);
  };

  const createBlocksFromFiles = (files, data, type, updateEntity) => {
    let editorState = getEditorState();
    let selection;
    files.forEach(file => {
      const { newBlock, newSelection, newEditorState } = createPluginBlock(editorState, data, type);
      editorState = newEditorState;
      selection = selection || newSelection;
      updateEntity(newBlock.getKey(), file);
    });

    return { newEditorState: editorState, newSelection: selection };
  };

  const onClick = function(event) {
    event.preventDefault();
    switch (button.type) {
      case 'file':
        toggleFileSelection();
        break;
      case 'modal':
        toggleButtonModal(event);
        break;
      case 'custom-block':
        onPluginAdd(name);
        addCustomBlock(button);
        break;
      default:
        addBlock(button.componentData || {});
        break;
    }
  };

  const shouldCreateGallery = files =>
    blockType === galleryType ||
    (pluginDefaults[galleryType] && settings.createGalleryForMultipleImages && files.length > 1);

  const handleFileChange = (files, updateEntity) => {
    if (files.length > 0) {
      const galleryData = pluginDefaults[galleryType];
      const { newEditorState, newSelection } = shouldCreateGallery(files)
        ? createBlocksFromFiles([files], galleryData, galleryType, updateEntity)
        : createBlocksFromFiles(files, button.componentData, blockType, updateEntity);
      setEditorState(EditorState.forceSelection(newEditorState, newSelection));
    }
  };

  const onChange = function(files) {
    return handleFileChange(files, (blockKey, file) => {
      const state = { userSelectedFiles: { files: Array.isArray(file) ? file : [file] } };
      commonPubsub.set('initialState_' + blockKey, state);
    });
  };

  const handleExternalFileChanged = (data, error) => {
    if (data) {
      const handleFilesAdded = shouldCreateGallery(data.data)
        ? blockKey => commonPubsub.getBlockHandler('galleryHandleFilesAdded', blockKey)
        : blockKey => pubsub.getBlockHandler('handleFilesAdded', blockKey);
      handleFileChange(data.data, (blockKey, file) =>
        setTimeout(() => handleFilesAdded(blockKey)({ data: file, error }))
      );
    }
  };

  const toggleButtonModal = event => {
    if (helpers && helpers.openModal) {
      let modalStyles = {};
      if (button.modalStyles) {
        modalStyles = button.modalStyles;
        // relies on button ref
      } else if (button.modalStylesFn) {
        modalStyles = button.modalStylesFn({ buttonRef: event.target, pubsub });
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
  };

  const toggleFileSelection = () => {
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
  };

  const isFileInput = () =>
    button.type === 'file' && !settings.handleFileSelection && !helpers.handleFileSelection;

  return {
    icon: button.Icon,
    tooltip: button.tooltipText,
    label: t(button.name),
    buttonType: isFileInput() ? 'file' : 'button',
    ...(isFileInput()
      ? { onChange, accept: settings.accept, multiple: button.multi }
      : { onClick }),
  };
};
