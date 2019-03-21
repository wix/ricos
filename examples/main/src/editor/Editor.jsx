import React, { PureComponent } from 'react';
import { RichContentEditor, RichContentEditorModal } from 'wix-rich-content-editor';
import * as PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { testImages, testVideos } from './mock';
import * as Plugins from './EditorPlugins';
import ModalsMap from './ModalsMap';
import theme from '../theme/theme'; // must import after custom styles


const modalStyleDefaults = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const anchorTarget = '_blank';
const relValue = 'nofollow';

export default class Editor extends PureComponent {
  state = {};
  constructor(props) {
    super(props);
    this.initEditorProps();
  }

  initEditorProps() {
    const mockUpload = (files, updateEntity) => {
      //mock upload
      const testItem = testImages[Math.floor(Math.random() * testImages.length)];
      const data = {
        id: testItem.photoId,
        original_file_name: files && files[0] ? files[0].name : testItem.url,
        file_name: testItem.url,
        width: testItem.metadata.width,
        height: testItem.metadata.height,
      };
      setTimeout(() => {
        updateEntity({ data, files });
        console.log('consumer uploaded', data);
      }, 500);
    };
    this.helpers = {
      onFilesChange: (files, updateEntity) => mockUpload(files, updateEntity),
      // handleFileSelection: (index, multiple, updateEntity, removeEntity) => {
      //   const count = multiple ? [1,2,3] : [1];
      //   const data = [];
      //   count.forEach(_ => {
      //     const testItem = testImages[Math.floor(Math.random() * testImages.length)];
      //     data.push({
      //       id: testItem.photoId,
      //       original_file_name: testItem.url,
      //       file_name: testItem.url,
      //       width: testItem.metadata.width,
      //       height: testItem.metadata.height,
      //     });
      //   })
      //   setTimeout(() => { updateEntity({ data }) }, 500);
      // },
      onVideoSelected: (url, updateEntity) => {
        setTimeout(() => {
          const testVideo = testVideos[Math.floor(Math.random() * testVideos.length)];
          updateEntity(testVideo);
        }, 500);
      },
      openModal: data => {
        const { modalStyles, ...modalProps } = data;
        try {
          document.documentElement.style.height = '100%';
          document.documentElement.style.position = 'relative';
        } catch (e) {
          console.warn('Cannot change document styles', e);
        }
        this.setState({
          showModal: true,
          modalProps,
          modalStyles,
        });
      },
      closeModal: () => {
        try {
          document.documentElement.style.height = 'initial';
          document.documentElement.style.position = 'initial';
        } catch (e) {
          console.warn('Cannot change document styles', e);
        }
        this.setState({
          showModal: false,
          modalProps: null,
          modalStyles: null,
          modalContent: null,
        });
      },
    };
  }

  componentDidMount() {
    ReactModal.setAppElement('body');
    this.setEditorToolbars();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.staticToolbar !== this.props.staticToolbar) {
      this.setEditorToolbars();
    }
  }

  setEditorToolbars = () => {
    const { MobileToolbar, TextToolbar } = this.editor.getToolbars();
    this.setState({ MobileToolbar, TextToolbar });
  };

  render() {
    const modalStyles = {
      content: Object.assign(
        {},
        (this.state.modalStyles || modalStyleDefaults).content,
        theme.modalTheme.content
      ),
      overlay: Object.assign(
        {},
        (this.state.modalStyles || modalStyleDefaults).overlay,
        theme.modalTheme.overlay
      ),
    };
    const { MobileToolbar, TextToolbar } = this.state;
    const textToolbarType = this.props.staticToolbar && !this.props.isMobile ? 'static' : null;
    return (
      <div className={'editor'}>
        {MobileToolbar && <MobileToolbar />}
        {TextToolbar && <TextToolbar />}
        <RichContentEditor
          ref={editor => (this.editor = editor)}
          onChange={this.props.onChange}
          helpers={this.helpers}
          plugins={Plugins.editorPlugins}
          config={Plugins.config}
          editorState={this.props.editorState}
          // initialState={this.state.initialState}
          readOnly={this.props.readOnly}
          isMobile={this.props.isMobile}
          textToolbarType={textToolbarType}
          theme={theme}
          editorKey={'random-editorKey-ssr'}
          anchorTarget={anchorTarget}
          relValue={relValue}
        />
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="External Modal Example"
          style={modalStyles}
          role="dialog"
          onRequestClose={this.helpers.closeModal}
        >
          {this.state.showModal && (
            <RichContentEditorModal modalsMap={ModalsMap} {...this.state.modalProps} />
          )}
        </ReactModal>
      </div>
    );
  }
}

Editor.propTypes = {
  onChange: PropTypes.func,
  editorState: PropTypes.object,
  readOnly: PropTypes.bool,
  isMobile: PropTypes.bool,
  staticToolbar: PropTypes.bool,
};
