import React, { PureComponent } from 'react';
import { RichContentEditor, RichContentEditorModal } from 'wix-rich-content-editor';
import * as PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { testVideos } from '../utils/mock';
import * as Plugins from './EditorPlugins';
import ModalsMap from './ModalsMap';
import theme from '../theme/theme'; // must import after custom styles
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import { mockImageUploadFunc } from '../utils/fileUploadUtil';
import { TOOLBARS } from 'wix-rich-content-editor-common';

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
const relValue = 'noopener';
let shouldMultiSelectImages = false;

export default class Editor extends PureComponent {
  state = {};
  constructor(props) {
    super(props);
    // ReactModal.setAppElement('#root');
    this.initEditorProps();
    const { scrollingElementFn, testAppConfig = {} } = props;
    const { toolbarConfig } = testAppConfig;
    const additionalConfig = {
      [GALLERY_TYPE]: { scrollingElement: scrollingElementFn },
      ...(testAppConfig.pluginsConfig || {}),
    };

    const pluginsConfig = Plugins.getConfig(additionalConfig);

    if (toolbarConfig) {
      const getToolbarSettings = toolbarConfig.addPluginMenuConfig
        ? () => [
            { name: 'SIDE', addPluginMenuConfig: toolbarConfig.addPluginMenuConfig },
            { name: 'MOBILE', addPluginMenuConfig: toolbarConfig.addPluginMenuConfig },
          ]
        : () => [];
      pluginsConfig.getToolbarSettings = getToolbarSettings;
    }

    this.plugins = testAppConfig.plugins
      ? testAppConfig.plugins.map(plugin => Plugins.editorPluginsMap[plugin]).flat()
      : Plugins.editorPlugins;
    this.config = pluginsConfig;
  }

  initEditorProps() {
    this.helpers = {
      //these are for testing purposes only
      onPluginAdd: async (plugin_id, entry_point, version) =>
        console.log('biPluginAdd', plugin_id, entry_point, version),
      onPluginDelete: async (plugin_id, version) =>
        console.log('biPluginDelete', plugin_id, version),
      onPluginChange: async (plugin_id, changeObj, version) =>
        console.log('biPluginChange', plugin_id, changeObj, version),
      onPublish: async (postId, pluginsCount, pluginsDetails, version) =>
        console.log('biOnPublish', postId, pluginsCount, pluginsDetails, version),
      //
      // onFilesChange: (files, updateEntity) => mockUpload(files, updateEntity),
      handleFileSelection: mockImageUploadFunc,
      onVideoSelected: (url, updateEntity) => {
        //todo should be moved to videoConfig (breaking change)
        const mockTimout = isNaN(this.props.mockImageIndex) ? null : 1;
        setTimeout(() => {
          const mockVideoIndex =
            this.props.mockImageIndex || Math.floor(Math.random() * testVideos.length);
          const testVideo = testVideos[mockVideoIndex];
          updateEntity(testVideo);
        }, mockTimout || 500);
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
    if (prevProps.shouldMultiSelectImages !== this.props.shouldMultiSelectImages) {
      shouldMultiSelectImages = this.props.shouldMultiSelectImages;
    }
  }

  setEditorToolbars = () => {
    const { MobileToolbar, TextToolbar } = this.editor.getToolbars();
    this.setState({ MobileToolbar, TextToolbar });
  };

  renderToolbarWithButtons = ({ buttons }) => {
    const { externalToolbar: ExternalToolbar } = this.props;
    return (
      <div className="toolbar">
        <ExternalToolbar buttons={buttons} />
      </div>
    );
  };

  renderExternalToolbar() {
    const { externalToolbar: ExternalToolbar } = this.props;
    if (ExternalToolbar && this.editor) {
      return (
        <div className="toolbar">
          <ExternalToolbar {...this.editor.getToolbarProps(TOOLBARS.FORMATTING)} theme={theme} />
        </div>
      );
    }
    return null;
  }

  render() {
    const modalStyles = {
      content: {
        ...(this.state.modalStyles || modalStyleDefaults).content,
        ...theme.modalTheme.content,
      },
      overlay: {
        ...(this.state.modalStyles || modalStyleDefaults).overlay,
        ...theme.modalTheme.overlay,
      },
    };
    const {
      staticToolbar,
      isMobile,
      editorState,
      initialState,
      locale,
      localeResource,
      onChange,
    } = this.props;
    const { MobileToolbar, TextToolbar } = this.state;
    const textToolbarType = staticToolbar && !isMobile ? 'static' : null;
    const { onRequestClose } = this.state.modalProps || {};

    const editorProps = {
      anchorTarget,
      relValue,
      locale,
      localeResource,
      theme,
      textToolbarType,
      isMobile,
      initialState,
      editorState,
    };
    const TopToolbar = MobileToolbar || TextToolbar;
    return (
      <div style={{ height: '100%' }}>
        {this.renderExternalToolbar()}
        <div className="editor">
          {TopToolbar && (
            <div className="toolbar-wrapper">
              <TopToolbar />
            </div>
          )}
          <RichContentEditor
            placeholder={'Add some text!'}
            ref={editor => (this.editor = editor)}
            onChange={onChange}
            helpers={this.helpers}
            plugins={this.plugins}
            // config={Plugins.getConfig(additionalConfig)}
            config={this.config}
            editorKey="random-editorKey-ssr"
            {...editorProps}
          />
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="External Modal Example"
            style={modalStyles}
            role="dialog"
            onRequestClose={onRequestClose || this.helpers.closeModal}
          >
            <RichContentEditorModal
              modalsMap={ModalsMap}
              locale={this.props.locale}
              {...this.state.modalProps}
            />
          </ReactModal>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  onChange: PropTypes.func,
  editorState: PropTypes.object,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  staticToolbar: PropTypes.bool,
  locale: PropTypes.string,
  localeResource: PropTypes.object,
  externalToolbar: PropTypes.node,
};
