import React, { ElementType, PureComponent } from 'react';
import {
  RichContentEditor,
  RichContentEditorModal,
  RichContentEditorProps,
} from 'wix-rich-content-editor';
import ReactModal from 'react-modal';
import { testVideos } from '../utils/mock';
import * as Plugins from './EditorPlugins';
import ModalsMap from './ModalsMap';
import theme from '../theme/theme'; // must import after custom styles
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import { mockImageUploadFunc, mockImageNativeUploadFunc } from '../utils/fileUploadUtil';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import {
  ModalStyles,
  DraftContent,
  TextToolbarType,
  AvailableExperiments,
  EventName,
  PluginEventParams,
  OnPluginAction,
} from 'wix-rich-content-common';
import { TestAppConfig } from '../../src/types';
import { RicosEditor, RicosEditorProps } from 'ricos-editor';

const modalStyleDefaults: ModalStyles = {
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

interface ExampleEditorProps {
  onChange?: RichContentEditorProps['onChange'];
  editorState?: RichContentEditorProps['editorState'];
  theme?: RichContentEditorProps['theme'];
  isMobile?: boolean;
  staticToolbar?: boolean;
  externalToolbarToShow: TOOLBARS;
  locale?: string;
  localeResource?: Record<string, string>;
  externalToolbar?: ElementType;
  shouldNativeUpload?: boolean;
  scrollingElementFn?: any;
  testAppConfig?: TestAppConfig;
  mockImageIndex?: number;
  shouldMultiSelectImages?: boolean;
  shouldMockUpload?: boolean;
  shouldUseNewContent?: boolean;
  initialState?: DraftContent;
  contentState?: DraftContent;
  injectedContent?: DraftContent;
  onRicosEditorChange?: RicosEditorProps['onChange'];
  experiments?: AvailableExperiments;
}

interface ExampleEditorState {
  showModal?: boolean;
  modalProps?: any;
  modalStyles?: ModalStyles;
  MobileToolbar?: ElementType;
  TextToolbar?: ElementType;
}
export default class Editor extends PureComponent<ExampleEditorProps, ExampleEditorState> {
  state: ExampleEditorState = {};
  plugins: RichContentEditorProps['plugins'];
  config: RichContentEditorProps['config'];
  helpers: RichContentEditorProps['helpers'];
  editor: RichContentEditor;
  ricosPlugins: RicosEditorProps['plugins'];

  constructor(props: ExampleEditorProps) {
    super(props);
    // ReactModal.setAppElement('#root');
    this.initEditorProps();
    const { scrollingElementFn, testAppConfig = {} } = props;
    const { toolbarConfig } = testAppConfig;
    const additionalConfig = {
      [GALLERY_TYPE]: { scrollingElement: scrollingElementFn },
      ...(testAppConfig.pluginsConfig || {}),
    };

    const pluginsConfig = Plugins.getConfig(additionalConfig, props.shouldNativeUpload);

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
    this.ricosPlugins = Object.entries(Plugins.ricosEditorPlugins).map(([pluginType, plugin]) =>
      pluginType in pluginsConfig ? plugin(pluginsConfig[pluginType]) : plugin()
    );
  }

  initEditorProps() {
    const onPluginAction: OnPluginAction = async (
      eventName: EventName,
      params: PluginEventParams
    ) => console.log(eventName, params);
    this.helpers = {
      //these are for testing purposes only
      onPluginAdd: async (plugin_id, entry_point, version) =>
        console.log('biPluginAdd', plugin_id, entry_point, version),
      onPluginAddStep: async params => console.log('onPluginAddStep', params),
      onPluginAddSuccess: async (plugin_id, entry_point, params, version) =>
        console.log('biPluginAddSuccess', plugin_id, entry_point, params, version),
      onPluginDelete: async params => console.log('biPluginDelete', params),
      onPluginChange: async (plugin_id, changeObj, version) =>
        console.log('biPluginChange', plugin_id, changeObj, version),
      onPublish: async (postId, pluginsCount, pluginsDetails, version) =>
        console.log('biOnPublish', postId, pluginsCount, pluginsDetails, version),
      onOpenEditorSuccess: async version => console.log('onOpenEditorSuccess', version),
      //
      // handleFileUpload: mockImageNativeUploadFunc,
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
        });
      },
      onPluginAction,
    };
    this.setImageUploadHelper();
  }

  componentDidMount() {
    ReactModal.setAppElement('body');
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
      this.helpers.handleFileUpload = mockImageNativeUploadFunc;
      delete this.helpers.handleFileSelection;
    } else {
      this.helpers.handleFileSelection = mockImageUploadFunc;
      delete this.helpers.handleFileUpload;
    }
  };

  setEditorToolbars = ref => {
    if (ref) {
      const { MobileToolbar, TextToolbar } = ref.getToolbars();
      this.setState({ MobileToolbar, TextToolbar });
    }
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
    const { externalToolbar: ExternalToolbar, externalToolbarToShow } = this.props;
    if (ExternalToolbar && this.editor) {
      return (
        <div className="toolbar">
          <ExternalToolbar {...this.editor.getToolbarProps(externalToolbarToShow)} theme={theme} />
        </div>
      );
    }
    return null;
  }

  setEditorRef = ref => {
    this.editor = ref;
    this.setEditorToolbars(ref);
  };

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
      shouldUseNewContent,
      contentState,
      injectedContent,
      onRicosEditorChange,
      experiments,
    } = this.props;
    const { MobileToolbar, TextToolbar } = this.state;
    const textToolbarType: TextToolbarType = staticToolbar && !isMobile ? 'static' : null;
    const { onRequestClose } = this.state.modalProps || {};
    const { openModal, closeModal, ...helpersWithoutModal } = this.helpers;

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
        {shouldUseNewContent ? (
          <div className="editor">
            <RicosEditor
              onChange={onRicosEditorChange}
              content={contentState}
              injectedContent={injectedContent}
              linkSettings={{ anchorTarget, relValue }}
              locale={locale}
              cssOverride={theme}
              toolbarSettings={{
                useStaticTextToolbar: textToolbarType === 'static',
                getToolbarSettings: this.config.getToolbarSettings,
              }}
              isMobile={isMobile}
              placeholder={'Add some text!'}
              plugins={this.ricosPlugins}
              linkPanelSettings={this.config.uiSettings.linkPanel}
              _rcProps={{ experiments }}
            >
              <RichContentEditor helpers={helpersWithoutModal} />
            </RicosEditor>
          </div>
        ) : (
          <div className="editor">
            {TopToolbar && (
              <div className="toolbar-wrapper">
                <TopToolbar />
              </div>
            )}
            <RichContentEditor
              placeholder={'Add some text!'}
              ref={this.setEditorRef}
              onChange={onChange}
              helpers={this.helpers}
              plugins={this.plugins}
              // config={Plugins.getConfig(additionalConfig)}
              config={this.config}
              editorKey="random-editorKey-ssr"
              setEditorToolbars={this.setEditorToolbars}
              experiments={experiments}
              {...editorProps}
            />
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="External Modal Example"
              style={modalStyles}
              role="dialog"
              onRequestClose={onRequestClose || this.helpers.closeModal}
              shouldFocusAfterRender={false}
              shouldReturnFocusAfterClose={false}
            >
              <RichContentEditorModal
                modalsMap={ModalsMap}
                locale={this.props.locale}
                {...this.state.modalProps}
              />
            </ReactModal>
          </div>
        )}
      </div>
    );
  }
}
