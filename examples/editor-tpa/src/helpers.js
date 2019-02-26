export const onFilesChange = (files, updateEntity) => {
  let nextPhoto = 0;
  console.log('[consumer] files changed!', files);
  //mock upload
  const data = [
    {
      original_file_name: 'a27d24_e1ac8887d0e04dd5b98fb4c263af1180~mv2_d_4915_3277_s_4_2.jpg',
      file_name: 'a27d24_e1ac8887d0e04dd5b98fb4c263af1180~mv2_d_4915_3277_s_4_2.jpg',
      width: 4915,
      height: 3277,
    },
    {
      original_file_name: '8bb438_b2d862605f684658926e6ee05e954880.jpg',
      file_name: '8bb438_b2d862605f684658926e6ee05e954880.jpg',
      width: 1920,
      height: 1080,
    },
  ];
  setTimeout(() => updateEntity({ data: data[nextPhoto++ % 2] }), 4500);
};

export const openExternalModal = modalProps => {
  window.Wix.openModal(window.document.location.origin + '/modal.html', 500, 500, () =>
    console.log('closing')
  );
  window.Wix.PubSub.subscribe('externalModal', event => {
    if (event.origin !== window.Wix.Utils.getCompId()) {
      console.log('externalModal in main app', event);
      if ((event.data.value = 'modal_loaded')) {
        const modal = this._getModalPointer();
        if (modal) {
          console.log('Found modal pointer');
          modal.showModal(modalProps);
        }
        // window.Wix.PubSub.publish("externalModal", { value: "editorState", editorState: this.editor.getEditorState() }, true);
      }
    }
    //process the event which has the following format :
    // {
    //      name:eventName,
    //      data: eventData,
    //      origin: compId
    // }
  });
  // },
  // selectFiles: () => {
  //   helpers.onFilesChange(files, ({ data, error }) => {
  //     const { setData } = this.props.blockProps;
  //     this.props.componentData.item = data ;
  //     setData(this.props.componentData);
  //     this.resetLoadingState(error);
  //   });
};

export const handleFileSelection = () => {
  // window.console.error('Opening wix media modal');
};
