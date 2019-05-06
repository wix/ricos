import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, convertFromRaw } from '@wix/draft-js';
import Editor from 'draft-js-plugins-editor';
import get from 'lodash/get';
import merge from 'lodash/merge';
import includes from 'lodash/includes';
import Measure from 'react-measure';
import { translate } from 'react-i18next';
import createEditorToolbars from './Toolbars';
import createPlugins from './createPlugins';
import { keyBindingFn, initPluginKeyBindings } from './keyBindings';
import handleKeyCommand from './handleKeyCommand';
import handleReturnCommand from './handleReturnCommand';
import blockStyleFn from './blockStyleFn';
import getBlockRenderMap from './getBlockRenderMap';
import { combineStyleFns } from './combineStyleFns';
import { getStaticTextToolbarId } from './Toolbars/toolbar-id';
import {
  AccessibilityListener,
  normalizeInitialState,
  TooltipHost,
  TOOLBARS,
  Context,
} from 'wix-rich-content-common';
import styles from '../../statics/styles/rich-content-editor.scss';
import draftStyles from '../../statics/styles/draft.scss';

class RichContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: this.getInitialEditorState(),
      theme: props.theme || {},
    };
    this.refId = Math.floor(Math.random() * 9999);

    props.config.uiSettings = merge(
      {
        blankTargetToggleVisibilityFn: anchorTarget => anchorTarget !== '_blank',
        nofollowRelToggleVisibilityFn: relValue => relValue !== 'nofollow',
      },
      props.config.uiSettings || {}
    );

    this.initContext();
    this.initPlugins();
  }

  getEditorState = () => this.state.editorState;

  setEditorState = editorState => this.setState({ editorState });

  initContext = () => {
    const { theme, t, locale, anchorTarget, relValue, helpers, config, isMobile } = this.props;
    this.contextualData = {
      theme,
      t,
      locale,
      anchorTarget,
      relValue,
      helpers,
      config,
      isMobile,
      setEditorState: this.setEditorState,
    };
  };

  initPlugins() {
    const {
      helpers,
      plugins,
      config,
      isMobile,
      anchorTarget,
      relValue,
      t,
      customStyleFn,
    } = this.props;

    const { theme } = this.state;
    const {
      pluginInstances,
      pluginButtons,
      pluginTextButtons,
      pubsubs,
      pluginStyleFns,
    } = createPlugins({
      plugins,
      config,
      helpers,
      theme,
      t,
      isMobile,
      anchorTarget,
      relValue,
      getEditorState: this.getEditorState,
      setEditorState: this.setEditorState,
    });
    this.initEditorToolbars(pluginButtons, pluginTextButtons);
    this.pluginKeyBindings = initPluginKeyBindings(pluginTextButtons);
    this.plugins = [...pluginInstances, ...Object.values(this.toolbars)];
    this.subscriberPubsubs = pubsubs || [];
    this.customStyleFn = combineStyleFns([...pluginStyleFns, customStyleFn]);
  }

  initEditorToolbars(pluginButtons, pluginTextButtons) {
    const {
      helpers,
      anchorTarget,
      relValue,
      textToolbarType,
      isMobile,
      t,
      config = {},
      textAlignment,
    } = this.props;
    const { theme } = this.state;
    const buttons = { pluginButtons, pluginTextButtons };

    this.toolbars = createEditorToolbars({
      buttons,
      helpers,
      anchorTarget,
      relValue,
      isMobile,
      textToolbarType,
      textAlignment,
      theme: theme || {},
      getEditorState: this.getEditorState,
      setEditorState: this.setEditorState,
      t,
      refId: this.refId,
      getToolbarSettings: config.getToolbarSettings,
      uiSettings: config.uiSettings,
      config,
    });
  }

  getToolbars = () => ({
    MobileToolbar: this.toolbars[TOOLBARS.MOBILE] ? this.toolbars[TOOLBARS.MOBILE].Toolbar : null,
    TextToolbar:
      this.props.textToolbarType === 'static' ? this.toolbars[TOOLBARS.STATIC].Toolbar : null,
  });

  getInitialEditorState() {
    const { editorState, initialState, anchorTarget, relValue } = this.props;
    if (editorState) {
      return editorState;
    }
    if (initialState) {
      const rawContentState = normalizeInitialState(initialState, { anchorTarget, relValue });
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
  }

  // TODO: get rid of this ASAP!
  // Currently, there's no way to get a static toolbar ref without consumer interference
  findFocusableChildForElement(id) {
    const element = document.getElementById(id);
    return element && element.querySelector('*[tabindex="0"]');
  }

  updateEditorState = editorState => {
    this.setEditorState(editorState);
    this.props.onChange && this.props.onChange(editorState);
  };

  getCustomCommandHandlers = () => ({
    commands: [
      ...this.pluginKeyBindings.commands,
      {
        command: 'tab',
        modifiers: [],
        key: 'Tab',
      },
    ],
    commandHanders: {
      ...this.pluginKeyBindings.commandHandlers,
      tab: () => {
        if (this.getToolbars().TextToolbar) {
          const staticToolbarButton = this.findFocusableChildForElement(
            `${getStaticTextToolbarId(this.refId)}`
          );
          staticToolbarButton && staticToolbarButton.focus();
        } else {
          this.editor.blur();
        }
      },
    },
  });

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  setEditor = ref => (this.editor = get(ref, 'editor', ref));

  updateBounds = editorBounds => {
    this.subscriberPubsubs.forEach(pubsub => pubsub.set('editorBounds', editorBounds));
  };

  renderToolbars = () => {
    if (!this.props.readOnly) {
      const toolbarsToIgnore = [
        'MobileToolbar',
        'StaticTextToolbar',
        this.props.textToolbarType === 'static' ? 'InlineTextToolbar' : '',
      ];
      //eslint-disable-next-line array-callback-return
      const toolbars = this.plugins.map((plugin, index) => {
        const Toolbar = plugin.Toolbar || plugin.InlineToolbar || plugin.SideToolbar;
        if (Toolbar) {
          if (includes(toolbarsToIgnore, plugin.name)) {
            return null;
          }
          return <Toolbar key={`k${index}`} />;
        }
      });
      return toolbars;
    }
  };

  renderInlineModals = () => {
    if (!this.props.readOnly) {
      //eslint-disable-next-line array-callback-return
      const modals = this.plugins.map((plugin, index) => {
        if (plugin.InlineModals && plugin.InlineModals.length > 0) {
          return plugin.InlineModals.map((Modal, modalIndex) => {
            return <Modal key={`k${index}m${modalIndex}`} />;
          });
        }
      });
      return modals;
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
      readOnly,
      handleBeforeInput,
      handlePastedText,
      handleReturn,
    } = this.props;
    const { editorState, theme } = this.state;
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
        handleBeforeInput={handleBeforeInput}
        handlePastedText={handlePastedText}
        plugins={this.plugins}
        blockStyleFn={blockStyleFn(theme, this.styleToClass)}
        blockRenderMap={getBlockRenderMap(theme)}
        handleKeyCommand={handleKeyCommand(
          this.updateEditorState,
          this.getCustomCommandHandlers().commandHanders
        )}
        editorKey={editorKey}
        keyBindingFn={keyBindingFn(this.getCustomCommandHandlers().commands || [])}
        customStyleFn={this.customStyleFn}
        helpers={helpers}
        tabIndex={tabIndex}
        placeholder={placeholder || ''}
        readOnly={!!readOnly}
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

  renderAccessibilityListener = () => <AccessibilityListener />;

  renderTooltipHost = () => <TooltipHost />;

  styleToClass = ([key, val]) => `rich_content_${key}-${val.toString().replace('.', '_')}`;

  renderStyleTag = () => {
    const styleToCss = ([key, val]) => `${key}: ${val};`;
    const blocks = this.getEditorState()
      .getCurrentContent()
      .getBlockMap();
    const styles = {};
    blocks.forEach(block => {
      const { dynamicStyles = {} } = block.get('data').toJS();
      Object.entries(dynamicStyles).forEach(
        style => (styles[this.styleToClass(style)] = styleToCss(style))
      );
    });
    const css = Object.entries(styles).reduce(
      (cssString, [className, css]) => `${cssString} .${className} {${css}}`,
      ''
    );
    return <style id="dynamicStyles">{css}</style>;
  };

  render() {
    const { isMobile } = this.props;
    const { theme } = this.state;
    const wrapperClassName = classNames(draftStyles.wrapper, styles.wrapper, theme.wrapper, {
      [styles.desktop]: !isMobile,
      [theme.desktop]: !isMobile && theme && theme.desktop,
    });
    return (
      <Context.Provider value={this.contextualData}>
        <Measure bounds onResize={({ bounds }) => this.updateBounds(bounds)}>
          {({ measureRef }) => (
            <div style={this.props.style} ref={measureRef} className={wrapperClassName}>
              {this.renderStyleTag()}
              <div className={classNames(styles.editor, theme.editor)}>
                {this.renderAccessibilityListener()}
                {this.renderEditor()}
                {this.renderToolbars()}
                {this.renderInlineModals()}
                {this.renderTooltipHost()}
              </div>
            </div>
          )}
        </Measure>
      </Context.Provider>
    );
  }
}

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
  readOnly: PropTypes.bool,
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
  locale: PropTypes.string,
};

RichContentEditor.defaultProps = {
  config: {},
  spellCheck: true,
  customStyleFn: () => ({}),
};

export default translate(null, { withRef: true })(RichContentEditor);
