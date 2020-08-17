/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Editor from 'draft-js-plugins-editor';
import { get, includes, debounce } from 'lodash';
import Measure from 'react-measure';
import createEditorToolbars from './Toolbars';
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
  convertFromRaw,
  convertToRaw,
  TOOLBARS,
  getBlockInfo,
  getFocusedBlockKey,
  createCalcContentDiff,
  getPostContentSummary,
  getBlockType,
  COMMANDS,
  MODIFIERS,
  simplePubsub,
} from 'wix-rich-content-editor-common';

import {
  AccessibilityListener,
  normalizeInitialState,
  getLangDir,
  Version,
  HTML_TYPE,
  GlobalContext,
} from 'wix-rich-content-common';
import styles from '../../statics/styles/rich-content-editor.scss';
import draftStyles from '../../statics/styles/draft.rtlignore.scss';
import 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import InnerRCEModal from './InnerRCEModal';
import { deprecateHelpers } from 'wix-rich-content-common/dist/lib/deprecateHelpers.cjs.js';
import InnerModal from './InnerModal';
import { registerCopySource } from 'draftjs-conductor';
import preventWixFocusRingAccessibility from './preventWixFocusRingAccessibility';

class RichContentEditor extends Component {
  static getDerivedStateFromError(error) {
    return { error };
  }

  constructor(props) {
    super(props);
    this.state = {
      editorState: this.getInitialEditorState(),
      editorBounds: {},
      innerModal: null,
      toolbarsToIgnore: [],
    };
    this.refId = Math.floor(Math.random() * 9999);
    const {
      config: { uiSettings = {} },
    } = props;
    uiSettings.blankTargetToggleVisibilityFn =
      uiSettings.blankTargetToggleVisibilityFn || (anchorTarget => anchorTarget !== '_blank');
    uiSettings.nofollowRelToggleVisibilityFn =
      uiSettings.nofollowRelToggleVisibilityFn || (relValue => relValue !== 'nofollow');

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
    preventWixFocusRingAccessibility();
    this.reportDebuggingInfo();
  }

  componentWillMount() {
    this.updateBounds = editorBounds => {
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
        'wix-rich-content-common/dist/lib/debugging-info.cjs.js'
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

  handleBlockFocus(editorState) {
    const focusedBlockKey = getFocusedBlockKey(editorState);
    if (focusedBlockKey !== this.focusedBlockKey) {
      this.focusedBlockKey = focusedBlockKey;
      this.onChangedFocusedBlock(focusedBlockKey);
    }
  }

  deprecateSiteDomain = () => {
    const { config, siteDomain } = this.props;
    if (config[HTML_TYPE] && siteDomain) {
      config[HTML_TYPE].siteDomain = siteDomain;
    }
  };

  onChangedFocusedBlock = blockKey => {
    const { onAtomicBlockFocus } = this.props;
    if (onAtomicBlockFocus) {
      if (blockKey) {
        const { type, entityData: data } = getBlockInfo(this.getEditorState(), blockKey);
        onAtomicBlockFocus({ blockKey, type, data });
      }
      onAtomicBlockFocus({});
    }
  };

  getEditorState = () => {
    return this.state.editorState;
  };

  setEditorState = editorState => this.setState({ editorState });

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
        onPluginAdd: (...args) => helpers.onPluginAdd?.(...args, Version.currentVersion),
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
      renderInnerRCEModal: this.renderInnerRCEModal,
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
  }

  initEditorToolbars(pluginButtons, pluginTextButtons, pluginButtonProps) {
    const { textAlignment } = this.props;
    const buttons = { pluginButtons, pluginTextButtons };

    this.toolbars = createEditorToolbars({
      buttons,
      textAlignment,
      refId: this.refId,
      context: this.contextualData,
      pluginButtonProps,
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
            entityRanges: [],
          },
        ],
      });
      return EditorState.createWithContent(emptyContentState);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editorState !== nextProps.editorState) {
      this.setState({ editorState: nextProps.editorState });
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
  findFocusableChildForElement(id) {
    const element = document.getElementById(id);
    return element && element.querySelector('*[tabindex="0"]');
  }

  createContentMutationEvents = (initialEditorState, version) => {
    const calculate = createCalcContentDiff(initialEditorState);
    return (newState, { onPluginDelete } = {}) =>
      calculate(newState, {
        shouldCalculate: !!onPluginDelete,
        onCallbacks: ({ pluginsDeleted }) => {
          pluginsDeleted.forEach(type => {
            onPluginDelete?.(type, version);
          });
        },
      });
  };

  updateEditorState = editorState => {
    this.setState({ editorState }, () => {
      this.handleCallbacks(this.state.editorState, this.props.helpers);
      this.props.onChange?.(this.state.editorState);
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

  handlePastedText = (text, html, editorState) => {
    if (this.props.handlePastedText) {
      return this.props.handlePastedText(text, html, editorState);
    }

    const resultEditorState = handlePastedText(text, html, editorState);
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

  publish = async postId => {
    if (!this.props.helpers?.onPublish) {
      return;
    }
    const { pluginsCount, pluginsDetails } = getPostContentSummary(this.state.editorState);
    this.props.helpers.onPublish(postId, pluginsCount, pluginsDetails, Version.currentVersion);
  };

  setEditor = ref => (this.editor = get(ref, 'editor', ref));

  inPluginEditingMode = false;

  setInPluginEditingMode = shouldEnable => {
    // As explained in https://github.com/facebook/draft-js/blob/585af35c3a8c31fefb64bc884d4001faa96544d3/src/component/handlers/DraftEditorModes.js#L14
    const mode = shouldEnable ? 'render' : 'edit';
    this.editor.setMode(mode);
    this.inPluginEditingMode = shouldEnable;
    if (shouldEnable) {
      this.setState({ toolbarsToIgnore: ['SideToolbar'] });
    } else {
      this.setState({ toolbarsToIgnore: [] });
    }
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

  handleBeforeInput = (chars, editorState, timestamp) => {
    this.props.handleBeforeInput?.(chars, editorState, timestamp);

    const blockType = getBlockType(this.state.editorState);
    if (blockType === 'atomic') {
      // fixes space click on atomic blocks deletion bug.
      // in general, disables any input click on atomic blocks
      return 'handled';
    }
  };

  renderEditor = () => {
    const {
      helpers,
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
        blockStyleFn={blockStyleFn(theme, this.styleToClass)}
        handleKeyCommand={handleKeyCommand(
          this.updateEditorState,
          this.getCustomCommandHandlers().commandHanders,
          getBlockType(editorState)
        )}
        editorKey={editorKey}
        keyBindingFn={createKeyBindingFn(this.getCustomCommandHandlers().commands || [])}
        customStyleFn={this.customStyleFn}
        helpers={helpers}
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
      />
    );
  };

  renderInnerRCEModal = (innerContentState, callback, renderedIn) => {
    const innerRCEEditorState = EditorState.createWithContent(convertFromRaw(innerContentState));
    return (
      <InnerRCEModal
        innerRCEcb={callback}
        innerRCEEditorState={innerRCEEditorState}
        theme={this.contextualData.theme}
        innerRCERenderedIn={renderedIn}
        setInPluginEditingMode={this.setInPluginEditingMode}
        {...this.props}
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
      const { dynamicStyles = {} } = block.get('data').toJS();
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

  onResize = debounce(({ bounds }) => this.updateBounds(bounds), 100);

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

  onFocus = () => {
    const { isInnerRCE } = this.props;
    if (!isInnerRCE && this.inPluginEditingMode) {
      this.setInPluginEditingMode(false);
      this.editor.focus();
    }
  };

  render() {
    const { onError, locale } = this.props;
    const { innerModal } = this.state;
    try {
      if (this.state.error) {
        onError(this.state.error);
        return null;
      }
      const { isMobile, t } = this.props;
      const { theme } = this.contextualData;
      const wrapperClassName = classNames(draftStyles.wrapper, styles.wrapper, theme.wrapper, {
        [styles.desktop]: !isMobile,
        [theme.desktop]: !isMobile && theme && theme.desktop,
      });
      return (
        <GlobalContext.Provider value={{ isMobile, t }}>
          <Measure bounds onResize={this.onResize}>
            {({ measureRef }) => (
              <div
                onFocus={this.onFocus}
                tabIndex="1"
                style={this.props.style}
                ref={measureRef}
                className={wrapperClassName}
                dir={getLangDir(this.props.locale)}
              >
                {this.renderStyleTag()}
                <div className={classNames(styles.editor, theme.editor)}>
                  {this.renderAccessibilityListener()}
                  {this.renderEditor()}
                  {this.renderToolbars()}
                  {this.renderInlineModals()}
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

RichContentEditor.publish = async (postId, editorState = {}, callBack = () => true) => {
  const postSummary = getPostContentSummary(editorState);
  callBack({ postId, ...postSummary });
};

RichContentEditor.propTypes = {
  editorKey: PropTypes.string,
  editorState: PropTypes.object,
  initialState: PropTypes.object,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
  t: PropTypes.func,
  textToolbarType: PropTypes.oneOf(['inline', 'static']),
  plugins: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])),
  config: PropTypes.object,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  tabIndex: PropTypes.number,
  placeholder: PropTypes.string,
  spellCheck: PropTypes.bool,
  stripPastedStyles: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  autoComplete: PropTypes.string,
  autoCorrect: PropTypes.string,
  ariaActiveDescendantID: PropTypes.string,
  ariaAutoComplete: PropTypes.string,
  ariaControls: PropTypes.string,
  ariaDescribedBy: PropTypes.string,
  ariaExpanded: PropTypes.bool,
  ariaLabel: PropTypes.string,
  ariaMultiline: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  textAlignment: PropTypes.oneOf(['left', 'right', 'center']),
  handleBeforeInput: PropTypes.func,
  handlePastedText: PropTypes.func,
  handleReturn: PropTypes.func,
  customStyleFn: PropTypes.func,
  locale: PropTypes.string.isRequired,
  shouldRenderOptimizedImages: PropTypes.bool,
  onAtomicBlockFocus: PropTypes.func,
  siteDomain: PropTypes.string,
  iframeSandboxDomain: PropTypes.string,
  onError: PropTypes.func,
  toolbarsToIgnore: PropTypes.array,
  normalize: PropTypes.shape({
    disableInlineImages: PropTypes.bool,
    removeInvalidInlinePlugins: PropTypes.bool,
  }),
  isInnerRCE: PropTypes.bool,
};

RichContentEditor.defaultProps = {
  config: {},
  spellCheck: true,
  customStyleFn: () => ({}),
  locale: 'en',
  onError: err => {
    throw err;
  },
  normalize: {},
};

export default RichContentEditor;
