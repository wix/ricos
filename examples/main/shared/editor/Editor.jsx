import React, { PureComponent } from 'react';
import { RichContentEditor, RichContentEditorModal } from 'wix-rich-content-editor';
import {
  FooterToolbar,
  StickyFormattingToolbar,
  FloatingFormattingToolbar,
} from 'wix-rich-content-toolbars';
import * as PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { testVideos } from '../utils/mock';
import * as Plugins from './EditorPlugins';
import ModalsMap from './ModalsMap';
import theme from '../theme/theme'; // must import after custom styles
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import 'wix-rich-content-toolbars/dist/styles.min.css';
import { mockImageUploadFunc, mockImageNativeUploadFunc } from '../utils/fileUploadUtil';
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
    const additionalConfig = {
      [GALLERY_TYPE]: { scrollingElement: scrollingElementFn },
      ...(testAppConfig.pluginsConfig || {}),
    };

    const pluginsConfig = Plugins.getConfig(additionalConfig, props.shouldNativeUpload);

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
    this.setImageUploadHelper();
  }

  componentDidMount() {
    ReactModal.setAppElement('body');
    this.setEditorToolbars(this.editor);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.staticToolbar !== this.props.staticToolbar) {
      this.setEditorToolbars(this.editor);
    }
    if (prevProps.shouldMultiSelectImages !== this.props.shouldMultiSelectImages) {
      shouldMultiSelectImages = this.props.shouldMultiSelectImages;
    }
    if (prevProps.shouldNativeUpload !== this.props.shouldNativeUpload) {
      this.toggleFileUploadMechanism();
    }
  }

  toggleFileUploadMechanism = () => {
    this.setImageUploadHelper();
    this.config = Plugins.toggleNativeUploadConfig(this.config, this.props.shouldNativeUpload);
  };

  setImageUploadHelper = () => {
    const { shouldNativeUpload } = this.props;
    if (shouldNativeUpload) {
      this.helpers.onFilesChange = mockImageNativeUploadFunc;
      delete this.helpers.handleFileSelection;
    } else {
      this.helpers.handleFileSelection = mockImageUploadFunc;
      delete this.helpers.onFilesChange;
    }
  };

  setEditorToolbars = () => {};

  renderFooterToolbar = () => {
    if (!this.editor) {
      return null;
    }
    const {
      buttons,
      context: { theme, locale, isMobile },
    } = this.editor.getToolbarProps(TOOLBARS.FOOTER);
    return <FooterToolbar theme={theme} buttons={buttons} locale={locale} isMobile={isMobile} />;
  };

  renderFormattingToolbar = () => {
    if (!this.editor) {
      return null;
    }

    const isStaticToolbar = this.props.staticToolbar && !this.props.isMobile;
    const {
      context: { theme, isMobile, locale, getEditorState },
      buttons,
      pubsub,
    } = this.editor.getToolbarProps(isStaticToolbar ? TOOLBARS.STATIC : TOOLBARS.INLINE);

    const Toolbar = isStaticToolbar ? StickyFormattingToolbar : FloatingFormattingToolbar;

    return (
      <Toolbar
        theme={theme}
        buttons={buttons}
        locale={locale}
        isMobile={isMobile}
        pubsub={pubsub}
        getEditorState={getEditorState}
      />
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
    return (
      <div style={{ height: '100%' }}>
        {this.renderExternalToolbar()}
        <div className="editor">
          <div className="toolbar-wrapper">{this.renderFormattingToolbar()}</div>
          <RichContentEditor
            ref={editor => (this.editor = editor)}
            placeholder={'Add some text!'}
            onChange={onChange}
            helpers={this.helpers}
            plugins={this.plugins}
            config={this.config}
            editorKey="random-editorKey-ssr"
            setEditorToolbars={this.setEditorToolbars}
            {...editorProps}
          />
          <div className="toolbar-wrapper">{this.renderFooterToolbar()}</div>
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
  shouldNativeUpload: PropTypes.bool,
};
