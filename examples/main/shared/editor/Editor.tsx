import React, { ElementType, PureComponent } from 'react';
import {
  RichContentEditor,
  RichContentEditorModal,
  RichContentEditorProps,
} from 'wix-rich-content-editor';
import { RicosEditor, RicosEditorType } from 'ricos-editor';
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
  RicosContent as RicosDraftContent,
  TextToolbarType,
} from 'wix-rich-content-common';
import { TestAppConfig } from '../../src/types';
import { RicosContent } from 'ricos-schema';
import { convertFromDraft, convertToDraft } from '../utils/contentConversion';

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
  onRicosChange?: (content: RicosDraftContent | RicosContent) => void;
  editorState?: RichContentEditorProps['editorState'];
  theme?: RichContentEditorProps['theme'];
  isMobile?: boolean;
  staticToolbar?: boolean;
  locale?: string;
  localeResource?: Record<string, string>;
  externalToolbar?: ElementType;
  shouldNativeUpload?: boolean;
  scrollingElementFn?: any;
  testAppConfig?: TestAppConfig;
  mockImageIndex?: number;
  shouldMultiSelectImages?: boolean;
  shouldMockUpload?: boolean;
  content?: RicosContent | RicosDraftContent;
  shouldUseRicos?: boolean;
  shouldUseRicosContent?: boolean;
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
  editor: RichContentEditor | RicosEditorType;

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
  }

  initEditorProps() {
    this.helpers = {
      //these are for testing purposes only
      onPluginAdd: async (plugin_id, entry_point, version) =>
        console.log('biPluginAdd', plugin_id, entry_point, version),
      onPluginAddSuccess: async (plugin_id, entry_point, version) =>
        console.log('biPluginAddSuccess', plugin_id, entry_point, version),
      onPluginDelete: async (plugin_id, version) =>
        console.log('biPluginDelete', plugin_id, version),
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
    if (prevProps.shouldUseRicosContent !== this.props.shouldUseRicosContent) {
      if (this.props.shouldUseRicosContent) {
        this.props.onRicosChange(convertFromDraft(this.props.content));
      } else {
        this.props.onRicosChange(convertToDraft(this.props.content));
      }
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
    const { MobileToolbar, TextToolbar } = ref.getToolbars();
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
      content,
      locale,
      localeResource,
      onChange,
      onRicosChange,
      shouldUseRicos,
    } = this.props;
    const { MobileToolbar, TextToolbar } = this.state;
    const textToolbarType: TextToolbarType = staticToolbar && !isMobile ? 'static' : null;
    const { onRequestClose } = this.state.modalProps || {};

    const editorProps = {
      anchorTarget,
      relValue,
      locale,
      localeResource,
      theme,
      textToolbarType,
      isMobile,
      initialState: convertToDraft(content),
      editorState,
    };
    const TopToolbar = MobileToolbar || TextToolbar;
    return (
      <div style={{ height: '100%' }}>
        {this.renderExternalToolbar()}
        {shouldUseRicos ? (
          <div className="editor">
            <RicosEditor
              onRicosContentChange={onRicosChange}
              content={content}
              injectedContent={content}
              linkSettings={{ anchorTarget, relValue }}
              locale={locale}
              cssOverride={theme}
              toolbarSettings={{ useStaticTextToolbar: textToolbarType === 'static' }}
              isMobile={isMobile}
              placeholder={'Add some text!'}
              ref={ref => (this.editor = ref)}
            >
              <RichContentEditor
                helpers={this.helpers}
                plugins={this.plugins}
                config={this.config}
              />
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
              config={this.config}
              editorKey="random-editorKey-ssr"
              setEditorToolbars={this.setEditorToolbars}
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
        )}
      </div>
    );
  }
}
