/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, CSSProperties, FocusEvent } from 'react';
import classNames from 'classnames';
import Editor from 'draft-js-plugins-editor';
import { get, includes, debounce, cloneDeep } from 'lodash';
import Measure, { BoundingRect, ContentRect } from 'react-measure';
import createEditorToolbars from './Toolbars/createEditorToolbars';
import createPlugins from './createPlugins';
import { createKeyBindingFn, initPluginKeyBindings } from './keyBindings';
import handleKeyCommand from './handleKeyCommand';
import handleReturnCommand from './handleReturnCommand';
import handlePastedText from './handlePastedText';
import blockStyleFn from './blockStyleFn';
import { combineStyleFns } from './combineStyleFns';
import { getStaticTextToolbarId } from './Toolbars/toolbar-id';
import {
  EditorState,
  TOOLBARS,
  getBlockInfo,
  getFocusedBlockKey,
  createCalcContentDiff,
  getPostContentSummary,
  getBlockType,
  COMMANDS,
  MODIFIERS,
  getEntities,
} from 'wix-rich-content-editor-common';
import { convertFromRaw, convertToRaw } from '../../lib/editorStateConversion';
import { ContentBlock, EntityInstance, EditorProps as DraftEditorProps } from 'draft-js';
import { createUploadStartBIData, createUploadEndBIData } from './utils/mediaUploadBI';
import { HEADINGS_DROPDOWN_TYPE, DEFAULT_HEADINGS, DEFAULT_TITLE_HEADINGS } from 'ricos-content';
import { isContentChanged } from '../is-content-changed';
import {
  AccessibilityListener,
  normalizeInitialState,
  getLangDir,
  Version,
  HTML_TYPE,
  GlobalContext,
  RicosContent,
  RichContentTheme,
  Helpers,
  TranslationFunction,
  CreatePluginFunction,
  RicosEntity,
  OnErrorFunction,
  NormalizeConfig,
  ModalStyles,
  LegacyEditorPluginConfig,
  BICallbacks,
  AnchorTarget,
  RelValue,
  EditorContextType,
  PluginButton,
  TextButtonMapping,
  ToolbarButtonProps,
  TextToolbarType,
  simplePubsub,
  Pubsub,
  GetEditorState,
  SetEditorState,
  TextDirection,
} from 'wix-rich-content-common';
import styles from '../../statics/styles/rich-content-editor.scss';
import draftStyles from '../../statics/styles/draft.rtlignore.scss';
import 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import InnerRCE from './InnerRCE';
import { deprecateHelpers } from 'wix-rich-content-common/libs/deprecateHelpers';
import InnerModal from './InnerModal';
import { registerCopySource } from 'draftjs-conductor';
import preventWixFocusRingAccessibility from './preventWixFocusRingAccessibility';
import { ErrorToast } from './Components';

type PartialDraftEditorProps = Pick<
  Partial<DraftEditorProps>,
  | 'tabIndex'
  | 'placeholder'
  | 'stripPastedStyles'
  | 'autoCapitalize'
  | 'autoComplete'
  | 'autoCorrect'
  | 'ariaActiveDescendantID'
  | 'ariaAutoComplete'
  | 'ariaControls'
  | 'ariaDescribedBy'
  | 'ariaExpanded'
  | 'ariaLabel'
  | 'ariaMultiline'
  | 'onBlur'
  | 'onFocus'
  | 'textAlignment'
  | 'handleBeforeInput'
  | 'handlePastedText'
  | 'readOnly'
> &
  // defaultProps
  Pick<Required<DraftEditorProps>, 'spellCheck' | 'customStyleFn'>;

type ToolbarsToIgnore = (
  | 'InlineTextToolbar'
  | 'InlineToolbar'
  | 'SideToolbar'
  | 'FooterToolbar'
  | 'MobileToolbar'
  | 'StaticTextToolbar'
  | 'StaticToolbar'
)[];

export interface RichContentEditorProps extends PartialDraftEditorProps {
  /** This is a legacy API, chagnes should be made also in the new Ricos Editor API **/
  editorKey?: string;
  editorState?: EditorState;
  initialState?: RicosContent;
  theme?: RichContentTheme;
  isMobile?: boolean;
  helpers?: Helpers;
  t: TranslationFunction;
  textToolbarType?: TextToolbarType;
  plugins: CreatePluginFunction[];
  config: LegacyEditorPluginConfig;
  anchorTarget?: AnchorTarget;
  relValue?: RelValue;
  style?: CSSProperties;
  locale: string;
  shouldRenderOptimizedImages?: boolean;
  onChange?(
    editorState: EditorState,
    contentTraits?: { isEmpty: boolean; isContentChanged: boolean }
  ): void;
  onAtomicBlockFocus?(params: {
    blockKey?: string;
    type?: string;
    data?: RicosEntity['data'];
  }): void;
  siteDomain?: string;
  iframeSandboxDomain?: string;
  onError: OnErrorFunction;
  toolbarsToIgnore?: ToolbarsToIgnore;
  showToolbars?: boolean;
  normalize: NormalizeConfig;
  isInnerRCE?: boolean;
  innerRCERenderedIn?: string;
  direction?: TextDirection;
  onBackspace?(editorState: EditorState): void;
  setEditorToolbars?(ref: RichContentEditor): void;
  handleReturn?: (
    updateEditorStateCallback: (editorState: EditorState) => void
  ) => DraftEditorProps['handleReturn'];
  tablePluginMenu?: boolean;
  callOnChangeOnNewEditorState?: boolean;
  localeResource?: Record<string, string>;
  /** This is a legacy API, chagnes should be made also in the new Ricos Editor API **/
}

interface State {
  editorState: EditorState;
  editorBounds?: BoundingRect;
  innerModal: { modalProps: Record<string, unknown>; modalStyles?: ModalStyles } | null;
  toolbarsToIgnore: ToolbarsToIgnore;
  theme?: RichContentTheme;
  textToolbarType?: TextToolbarType;
  error?: string;
}

class RichContentEditor extends Component<RichContentEditorProps, State> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialEditorState: {
    entities: EntityInstance[];
    blocks: ContentBlock[];
  };
  refId: number;
  commonPubsub: Pubsub;
  handleCallbacks: (newState: EditorState, biCallbacks?: BICallbacks) => void | undefined;
  contextualData: EditorContextType;
  editor: Editor & { setMode: (mode: 'render' | 'edit') => void };
  editorWrapper: Element;
  copySource: { unregister(): void };
  updateBounds: (editorBounds?: BoundingRect) => void;
  plugins;
  focusedBlockKey: string;
  pluginKeyBindings;
  customStyleFn: DraftEditorProps['customStyleFn'];
  toolbars;
  innerRCECustomStyleFn;

  static defaultProps: Partial<RichContentEditorProps> = {
    config: {},
    spellCheck: true,
    customStyleFn: () => ({}),
    locale: 'en',
    onError: err => {
      throw err;
    },
    normalize: {},
    plugins: [],
  };

  static publish = async (
    postId: number,
    editorState: EditorState,
    callBack: (...args) => boolean = () => true
  ) => {
    const postSummary = getPostContentSummary(editorState || {});
    callBack({ postId, ...postSummary });
  };

  static getDerivedStateFromError(error: string) {
    return { error };
  }

  constructor(props: RichContentEditorProps) {
    super(props);
    const initialEditorState = this.getInitialEditorState();
    const initialContentState = initialEditorState.getCurrentContent();
    this.initialEditorState = {
      entities: getEntities(initialEditorState),
      blocks: initialContentState.getBlocksAsArray(),
    };
    this.state = {
      editorState: initialEditorState,
      innerModal: null,
      toolbarsToIgnore: [],
    };
    this.refId = Math.floor(Math.random() * 9999);

    this.commonPubsub = simplePubsub();
    this.handleCallbacks = this.createContentMutationEvents(
      this.state.editorState,
      Version.currentVersion
    );
    this.deprecateSiteDomain();
    this.initContext();
    this.initPlugins();
  }

  componentDidUpdate() {
    this.handleBlockFocus(this.state.editorState);
  }

  componentDidMount() {
    this.copySource = registerCopySource(this.editor);
    preventWixFocusRingAccessibility(this.editorWrapper);
    this.reportDebuggingInfo();
    this.props.helpers?.onOpenEditorSuccess?.(Version.currentVersion);
  }

  componentWillMount() {
    this.updateBounds = (editorBounds?: BoundingRect) => {
      this.setState({ editorBounds });
    };
  }

  componentWillUnmount() {
    this.updateBounds = () => '';
    if (this.copySource) {
      this.copySource.unregister();
    }
  }

  reportDebuggingInfo() {
    if (typeof window === 'undefined') {
      return;
    }
    if (/debug/i.test(window.location.search) && !window.__RICOS_INFO__) {
      import(
        /* webpackChunkName: debugging-info */
        'wix-rich-content-common/libs/debugging-info'
      ).then(({ reportDebuggingInfo }) => {
        reportDebuggingInfo({
          version: Version.currentVersion,
          reporter: 'Rich Content Editor',
          plugins: this.plugins.reduce(
            (list, { blockType }) => (blockType ? [...list, blockType] : list),
            []
          ),
          getContent: () => convertToRaw(this.getEditorState().getCurrentContent()),
          getConfig: () => this.props.config,
        });
      });
    }
  }

  handleBlockFocus(editorState: EditorState) {
    const focusedBlockKey = getFocusedBlockKey(editorState);
    if (focusedBlockKey && focusedBlockKey !== this.focusedBlockKey) {
      this.focusedBlockKey = focusedBlockKey;
      this.onChangedFocusedBlock(focusedBlockKey);
    }
  }

  deprecateSiteDomain = () => {
    const { config, siteDomain } = this.props;
    if (config[HTML_TYPE] && siteDomain) {
      config[HTML_TYPE] = { ...config[HTML_TYPE], siteDomain };
    }
  };

  onChangedFocusedBlock = (blockKey: string) => {
    const { onAtomicBlockFocus } = this.props;
    if (onAtomicBlockFocus) {
      if (blockKey) {
        const { type, entityData: data } = getBlockInfo(this.getEditorState(), blockKey);
        onAtomicBlockFocus({ blockKey, type, data });
      }
      onAtomicBlockFocus({});
    }
  };

  getEditorState: GetEditorState = () => this.state.editorState;

  setEditorState: SetEditorState = (editorState: EditorState) => this.setState({ editorState });

  initContext = () => {
    const {
      theme,
      t,
      locale,
      anchorTarget,
      relValue,
      helpers = {},
      config,
      isMobile = false,
      shouldRenderOptimizedImages,
      siteDomain,
      iframeSandboxDomain,
      innerRCERenderedIn,
    } = this.props;

    this.fixHelpers(helpers);

    this.contextualData = {
      theme: theme || {},
      t,
      locale,
      anchorTarget,
      relValue,
      helpers: {
        ...helpers,
        onPluginAdd: (pluginId: string, entryPoint: string) =>
          helpers.onPluginAdd?.(pluginId, entryPoint, Version.currentVersion),
        onMediaUploadStart: (...args) => {
          const {
            correlationId,
            pluginId,
            fileSize,
            mediaType,
            timeStamp,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
          } = createUploadStartBIData(...args);
          helpers.onMediaUploadStart?.(
            correlationId,
            pluginId,
            fileSize,
            mediaType,
            Version.currentVersion
          );
          return { correlationId, pluginId, fileSize, mediaType, timeStamp };
        },
        onMediaUploadEnd: (...args) => {
          const {
            correlationId,
            pluginId,
            duration,
            fileSize,
            mediaType,
            isSuccess,
            errorType,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
          } = createUploadEndBIData(...args);
          helpers.onMediaUploadEnd?.(
            correlationId,
            pluginId,
            duration,
            fileSize,
            mediaType,
            isSuccess,
            errorType,
            Version.currentVersion
          );
        },
        onPluginAddSuccess: (pluginId: string, entryPoint: string) =>
          helpers.onPluginAddSuccess?.(pluginId, entryPoint, Version.currentVersion),
      },
      config,
      isMobile,
      setEditorState: editorState => {
        this.commonPubsub.get('setEditorState')?.(editorState);
      },
      getEditorState: this.getEditorState,
      getEditorBounds: this.getEditorBounds,
      languageDir: getLangDir(locale),
      shouldRenderOptimizedImages,
      siteDomain,
      iframeSandboxDomain,
      setInPluginEditingMode: this.setInPluginEditingMode,
      getInPluginEditingMode: this.getInPluginEditingMode,
      innerModal: { openInnerModal: this.openInnerModal, closeInnerModal: this.closeInnerModal },
      renderInnerRCE: this.renderInnerRCE,
      innerRCERenderedIn,
    };
  };

  getEditorBounds = () => this.state.editorBounds;

  initPlugins() {
    const { plugins, customStyleFn } = this.props;

    const {
      pluginInstances,
      pluginButtons,
      pluginTextButtons,
      pluginStyleFns,
      externalizedButtonProps,
    } = createPlugins({
      plugins,
      context: this.contextualData,
      commonPubsub: this.commonPubsub,
    });

    this.initEditorToolbars(pluginButtons, pluginTextButtons, externalizedButtonProps);
    this.pluginKeyBindings = initPluginKeyBindings(pluginTextButtons);
    this.plugins = [...pluginInstances, ...Object.values(this.toolbars)];
    this.customStyleFn = combineStyleFns([...pluginStyleFns, customStyleFn]);
    this.innerRCECustomStyleFn = combineStyleFns([...pluginStyleFns, customStyleFn]);
  }

  initEditorToolbars(
    pluginButtons: PluginButton[],
    pluginTextButtons: TextButtonMapping[],
    pluginButtonProps: ToolbarButtonProps[]
  ) {
    const { textAlignment, isInnerRCE, tablePluginMenu } = this.props;
    const buttons = { pluginButtons, pluginTextButtons };

    this.toolbars = createEditorToolbars({
      buttons,
      textAlignment,
      refId: this.refId,
      context: this.contextualData,
      pluginButtonProps,
      isInnerRCE,
      tablePluginMenu,
    });
  }

  getToolbars = () => ({
    MobileToolbar: this.toolbars[TOOLBARS.MOBILE] ? this.toolbars[TOOLBARS.MOBILE].Toolbar : null,
    TextToolbar:
      this.props.textToolbarType === 'static' ? this.toolbars[TOOLBARS.STATIC].Toolbar : null,
  });

  getInitialEditorState() {
    const {
      editorState,
      initialState,
      anchorTarget,
      relValue,
      normalize: { disableInlineImages = false, removeInvalidInlinePlugins = false },
    } = this.props;
    if (editorState) {
      return editorState;
    }
    if (initialState) {
      const rawContentState = normalizeInitialState(initialState, {
        anchorTarget,
        relValue,
        disableInlineImages,
        removeInvalidInlinePlugins,
      });
      return EditorState.createWithContent(convertFromRaw(rawContentState));
    } else {
      const emptyContentState = convertFromRaw({
        //this is needed for ssr. Otherwise the key will be generated randomly on both server and client.
        entityMap: {},
        blocks: [
          {
            text: '',
            key: 'foo',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
          },
        ],
      });
      return EditorState.createWithContent(emptyContentState);
    }
  }

  forceRender = () => {
    const { editorState } = this.state;
    this.setState({ editorState: cloneDeep(editorState) });
  };

  componentWillReceiveProps(nextProps: RichContentEditorProps) {
    if (this.props.direction !== nextProps.direction) {
      this.forceRender();
    }
    // TODO: new editor state should become initialContentState?
    if (nextProps.editorState && this.props.editorState !== nextProps.editorState) {
      if (this.props.callOnChangeOnNewEditorState) {
        this.updateEditorState(nextProps.editorState);
      } else {
        this.setState({ editorState: nextProps.editorState });
      }
    }
    if (this.props.theme !== nextProps.theme) {
      this.setState({ theme: nextProps.theme });
    }
    if (this.props.textToolbarType !== nextProps.textToolbarType) {
      this.setState({ textToolbarType: nextProps.textToolbarType });
    }
    this.fixHelpers(nextProps.helpers);
  }

  fixHelpers(helpers) {
    if (helpers?.onFilesChange) {
      // console.warn('helpers.onFilesChange is deprecated. Use helpers.handleFileUpload');
      helpers.handleFileUpload = helpers.onFilesChange;
      // eslint-disable-next-line fp/no-delete
      delete helpers.onFilesChange;
    }
    deprecateHelpers(helpers, this.props.config);
  }

  // TODO: get rid of this ASAP!
  // Currently, there's no way to get a static toolbar ref without consumer interference
  findFocusableChildForElement(id: string): HTMLElement | null {
    const element = document.getElementById(id);
    return element && element.querySelector('*[tabindex="0"]');
  }

  createContentMutationEvents = (initialEditorState: EditorState, version: string) => {
    const calculate = createCalcContentDiff(initialEditorState);
    return (newState: EditorState, { onPluginDelete }: BICallbacks = {}) =>
      calculate(newState, {
        shouldCalculate: !!onPluginDelete,
        onCallbacks: ({ pluginsDeleted = [] }) => {
          pluginsDeleted.forEach(type => onPluginDelete?.(type, version));
        },
      });
  };

  updateEditorState = (editorState: EditorState) => {
    this.setState({ editorState }, () => {
      this.handleCallbacks(this.state.editorState, this.props.helpers);
      // console.time('traits');
      const contentTraits = {
        isEmpty: !editorState.getCurrentContent().hasText(),
        isContentChanged: isContentChanged(editorState, this.initialEditorState),
      };
      // console.timeEnd('traits');
      this.props.onChange?.(this.state.editorState, contentTraits);
    });
  };

  handleTabCommand = () => {
    if (this.getToolbars().TextToolbar) {
      const staticToolbarButton = this.findFocusableChildForElement(
        `${getStaticTextToolbarId(this.refId)}`
      );
      staticToolbarButton && staticToolbarButton.focus();
    } else {
      this.editor.blur();
    }
  };

  getHeadings = config => {
    const { [HEADINGS_DROPDOWN_TYPE]: headingsPluginSettings } = config;

    const customHeadings = headingsPluginSettings
      ? headingsPluginSettings?.customHeadings || DEFAULT_HEADINGS
      : DEFAULT_TITLE_HEADINGS;

    return customHeadings;
  };

  handlePastedText: DraftEditorProps['handlePastedText'] = (text, html, editorState) => {
    if (this.props.handlePastedText) {
      const handled = this.props.handlePastedText(text, html, editorState);
      if (handled !== 'not-handled') {
        return handled;
      }
    }

    const { config, isInnerRCE } = this.props;
    const resultEditorState = handlePastedText(
      text,
      html,
      editorState,
      isInnerRCE,
      this.getHeadings(config)
    );
    this.updateEditorState(resultEditorState);

    return 'handled';
  };

  handleEscCommand = (_, event) => {
    this.blur();
    event?.preventDefault();
  };

  getCustomCommandHandlers = () => ({
    commands: [
      ...this.pluginKeyBindings.commands,
      {
        command: COMMANDS.TAB,
        modifiers: [],
        key: 'Tab',
      },
      {
        command: COMMANDS.SHIFT_TAB,
        modifiers: [MODIFIERS.SHIFT],
        key: 'Tab',
      },
      {
        command: COMMANDS.ESC,
        modifiers: [],
        key: 'Escape',
      },
    ],
    commandHanders: {
      ...this.pluginKeyBindings.commandHandlers,
      tab: this.handleTabCommand,
      shiftTab: this.handleTabCommand,
      esc: this.handleEscCommand,
    },
  });

  focus = () => setTimeout(this.editor.focus);

  blur = () => this.editor.blur();

  getToolbarProps = (type = TOOLBARS.INSERT_PLUGIN) => ({
    buttons: this.toolbars[type],
    context: this.contextualData,
    pubsub: this.commonPubsub,
  });

  // TODO: remove deprecated postId once getContent(postId) is removed (9.0.0)
  publish = async (postId?: string) => {
    if (!this.props.helpers?.onPublish) {
      return;
    }
    const { pluginsCount, pluginsDetails } = getPostContentSummary(this.state.editorState) || {};
    this.props.helpers.onPublish(postId, pluginsCount, pluginsDetails, Version.currentVersion);
  };

  setEditor = (ref: Editor) => (this.editor = get(ref, 'editor', ref));

  inPluginEditingMode = false;

  setInPluginEditingMode = (shouldEnable: boolean) => {
    // As explained in https://github.com/facebook/draft-js/blob/585af35c3a8c31fefb64bc884d4001faa96544d3/src/component/handlers/DraftEditorModes.js#L14
    const mode = shouldEnable ? 'render' : 'edit';
    this.editor.setMode(mode);
    this.inPluginEditingMode = shouldEnable;
    const toolbarsToIgnore: ToolbarsToIgnore = shouldEnable ? ['SideToolbar'] : [];
    this.setState({ toolbarsToIgnore });
  };

  getInPluginEditingMode = () => this.inPluginEditingMode;

  renderToolbars = () => {
    const { toolbarsToIgnore: toolbarsToIgnoreFromProps = [] } = this.props;
    const { toolbarsToIgnore: toolbarsToIgnoreFromState = [] } = this.state;
    const toolbarsToIgnore = [
      'MobileToolbar',
      'StaticTextToolbar',
      this.props.textToolbarType === 'static' ? 'InlineTextToolbar' : '',
      ...toolbarsToIgnoreFromProps,
      ...toolbarsToIgnoreFromState,
    ];
    //eslint-disable-next-line array-callback-return
    const toolbars = this.plugins.map((plugin, index) => {
      const Toolbar =
        plugin.Toolbar || plugin.InlinePluginToolbar || plugin.InlineToolbar || plugin.SideToolbar;
      if (Toolbar) {
        if (includes(toolbarsToIgnore, plugin.name)) {
          return null;
        }
        return (
          <Toolbar
            key={`k${index}`}
            hide={this.state.innerModal && plugin.name !== 'FooterToolbar'}
            forceDisabled={
              plugin.name === 'FooterToolbar' && !this.props.isInnerRCE && this.inPluginEditingMode
            }
          />
        );
      }
    });
    return toolbars;
  };

  renderInlineModals = () => {
    //eslint-disable-next-line array-callback-return
    const modals = this.plugins.map((plugin, index) => {
      if (plugin.InlineModals && plugin.InlineModals.length > 0) {
        return plugin.InlineModals.map((Modal, modalIndex) => {
          return <Modal key={`k${index}m${modalIndex}`} />;
        });
      }
    });
    return modals;
  };

  handleBeforeInput: DraftEditorProps['handleBeforeInput'] = (chars, editorState, timestamp) => {
    let handled = this.props.handleBeforeInput?.(chars, editorState, timestamp);

    const blockType = getBlockType(this.state.editorState);
    if (blockType === 'atomic') {
      // fixes space click on atomic blocks deletion bug.
      // in general, disables any input click on atomic blocks
      handled = 'handled';
    }
    return handled || 'not-handled';
  };

  renderEditor = () => {
    const {
      editorKey,
      tabIndex,
      placeholder,
      spellCheck,
      stripPastedStyles,
      autoCapitalize,
      autoComplete,
      autoCorrect,
      ariaActiveDescendantID,
      ariaAutoComplete,
      ariaControls,
      ariaDescribedBy,
      ariaExpanded,
      ariaLabel,
      ariaMultiline,
      onBlur,
      onFocus,
      textAlignment,
      handleReturn,
      readOnly,
      onBackspace,
      innerRCERenderedIn,
    } = this.props;
    const { editorState } = this.state;
    const { theme } = this.contextualData;

    return (
      <Editor
        ref={this.setEditor}
        handleReturn={
          handleReturn
            ? handleReturn(this.updateEditorState)
            : handleReturnCommand(this.updateEditorState)
        }
        editorState={editorState}
        onChange={this.updateEditorState}
        handleBeforeInput={this.handleBeforeInput}
        handlePastedText={this.handlePastedText}
        plugins={this.plugins}
        blockStyleFn={blockStyleFn(theme, this.styleToClass, textAlignment)}
        handleKeyCommand={handleKeyCommand(
          this.updateEditorState,
          this.getCustomCommandHandlers().commandHanders,
          getBlockType(editorState),
          onBackspace,
          innerRCERenderedIn
        )}
        editorKey={editorKey}
        keyBindingFn={createKeyBindingFn(this.getCustomCommandHandlers().commands || [])}
        customStyleFn={this.customStyleFn}
        tabIndex={tabIndex}
        placeholder={placeholder || ''}
        spellCheck={spellCheck}
        stripPastedStyles={stripPastedStyles}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        ariaActiveDescendantID={ariaActiveDescendantID}
        ariaAutoComplete={ariaAutoComplete}
        ariaControls={ariaControls}
        ariaDescribedBy={ariaDescribedBy}
        ariaExpanded={ariaExpanded}
        ariaLabel={ariaLabel}
        ariaMultiline={ariaMultiline}
        onBlur={onBlur}
        onFocus={onFocus}
        textAlignment={textAlignment}
        readOnly={readOnly}
      />
    );
  };

  renderInnerRCE = ({
    editorState,
    setRef,
    onChange,
    renderedIn,
    onBackspaceAtBeginningOfContent,
    direction,
    additionalProps,
    toolbarsToIgnore,
    tablePluginMenu,
  }) => {
    return (
      <InnerRCE
        {...this.props}
        ref={setRef}
        onChange={onChange}
        editorState={editorState}
        theme={this.contextualData.theme}
        innerRCERenderedIn={renderedIn}
        setInPluginEditingMode={this.setInPluginEditingMode}
        onBackspaceAtBeginningOfContent={onBackspaceAtBeginningOfContent}
        direction={direction}
        additionalProps={additionalProps}
        setEditorToolbars={this.props.setEditorToolbars}
        toolbarsToIgnore={toolbarsToIgnore}
        tablePluginMenu={tablePluginMenu}
      />
    );
  };

  renderAccessibilityListener = () => (
    <AccessibilityListener isMobile={this.contextualData.isMobile} />
  );

  styleToClass = ([key, val]) => `rich_content_${key}-${val.toString().replace('.', '_')}`;

  renderStyleTag = (editorState = this.getEditorState()) => {
    const styleToCss = ([key, val]) => `${key}: ${val};`;
    const blocks = editorState.getCurrentContent().getBlockMap();
    const styles = {};
    blocks.forEach(block => {
      const { dynamicStyles = {} } = block?.get('data').toJS();
      Object.entries(dynamicStyles).forEach(
        style => (styles[this.styleToClass(style)] = styleToCss(style))
      );
    });
    const css = Object.entries(styles).reduce(
      (cssString, [className, css]) => `${cssString}[dir] .${className} {${css}}`,
      ''
    );
    return <style id="dynamicStyles">{css}</style>;
  };

  onResize = debounce(({ bounds }: ContentRect) => this.updateBounds(bounds), 100);

  openInnerModal = data => {
    const { modalStyles, ...modalProps } = data;
    this.setState({
      innerModal: {
        modalProps,
        modalStyles,
      },
    });
  };

  closeInnerModal = () => {
    this.setState({
      innerModal: null,
    });
  };

  renderErrorToast = () => {
    return <ErrorToast commonPubsub={this.commonPubsub} />;
  };

  onFocus = (e: FocusEvent) => {
    if (this.inPluginEditingMode) {
      if (e.target && !e.target.closest('[data-id=inner-rce], .rich-content-editor-theme_atomic')) {
        this.setInPluginEditingMode(false);
        this.props.setEditorToolbars?.(this);
      }
    }
  };

  disableFocusInSelection = (editorState: EditorState) => {
    const selection = editorState.getSelection().merge({ hasFocus: false });
    const newEditorState = EditorState.set(editorState, {
      selection,
    });
    this.updateEditorState(newEditorState);
  };

  onBlur = e => {
    const { editorState } = this.state;
    const { isInnerRCE } = this.props;
    if (!isInnerRCE && !this.inPluginEditingMode) {
      if (e.relatedTarget && e.relatedTarget.closest('[data-id=inner-rce]')) {
        this.setInPluginEditingMode(true);
      }
    }
    if (isInnerRCE && editorState.isInCompositionMode()) {
      this.disableFocusInSelection(editorState);
    }
  };

  setEditorWrapper = ref => ref && (this.editorWrapper = ref);

  render() {
    const { onError, locale, direction, showToolbars = true } = this.props;
    const { innerModal } = this.state;
    try {
      if (this.state.error) {
        onError(this.state.error);
        return null;
      }
      const { isMobile = false, t } = this.props;
      const { theme } = this.contextualData;
      const themeDesktopStyle = theme.desktop
        ? { [theme.desktop]: !isMobile && theme && theme.desktop }
        : {};
      const wrapperClassName = classNames(draftStyles.wrapper, styles.wrapper, theme.wrapper, {
        [styles.desktop]: !isMobile,
        ...themeDesktopStyle,
      });
      return (
        <GlobalContext.Provider value={{ isMobile, t }}>
          <Measure bounds onResize={this.onResize}>
            {({ measureRef }) => (
              <div
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                style={this.props.style}
                ref={measureRef}
                className={wrapperClassName}
                dir={direction || getLangDir(this.props.locale)}
                data-id={'rce'}
              >
                {this.renderStyleTag()}
                <div
                  ref={this.setEditorWrapper}
                  className={classNames(styles.editor, theme.editor)}
                >
                  {this.renderAccessibilityListener()}
                  {this.renderEditor()}
                  {showToolbars && this.renderToolbars()}
                  {this.renderInlineModals()}
                  {this.renderErrorToast()}
                  <InnerModal
                    theme={theme}
                    locale={locale}
                    innerModal={innerModal}
                    closeInnerModal={this.closeInnerModal}
                  />
                </div>
              </div>
            )}
          </Measure>
        </GlobalContext.Provider>
      );
    } catch (err) {
      onError(err);
      return null;
    }
  }
}

export default RichContentEditor;

declare global {
  interface Window {
    __RICOS_INFO__: { getContent; getConfig };
  }
}
