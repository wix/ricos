import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, convertFromRaw } from '@wix/draft-js';
import Editor from 'draft-js-plugins-editor';
import get from 'lodash/get';
import includes from 'lodash/includes';
import { translate } from 'react-i18next';
import { baseUtils } from 'photography-client-lib/dist/src/utils/baseUtils';
import createEditorToolbars from './Toolbars';
import createPlugins from './createPlugins';
import { keyBindingFn } from './keyBindings';
import handleKeyCommand from './handleKeyCommand';
import blockStyleFn from './blockStyleFn';
import { EditorModals, AccessibilityListener, getModalStyles, normalizeInitialState } from 'wix-rich-content-common';
import styles from '~/Styles/rich-content-editor.scss';
import draftStyles from '~/Styles/draft.scss';
import 'wix-rich-content-common/dist/wix-rich-content-common.css';

class RichContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme || {}
    };
    this.refId = Math.floor(Math.random() * 9999);
    this.initPlugins();
  }

  initPlugins() {
    const {
      helpers,
      plugins,
      config,
      isMobile,
      anchorTarget,
      relValue,
      t,
    } = this.props;
    const { theme } = this.state;
    const { pluginInstances, pluginButtons } = createPlugins({ plugins, config, helpers, theme, t, isMobile, anchorTarget, relValue });
    this.initEditorToolbars(pluginButtons);
    this.plugins = [...pluginInstances, ...Object.values(this.toolbars)];
  }

  initEditorToolbars(pluginButtons) {
    const {
      helpers,
      anchorTarget,
      relValue,
      hideFooterToolbar,
      sideToolbarOffset,
      textButtons,
      textToolbarType,
      textAlignment,
      isMobile,
      t,
    } = this.props;
    const { theme } = this.state;
    const buttons = { textButtons, pluginButtons };

    this.toolbars = createEditorToolbars({
      buttons,
      helpers,
      anchorTarget,
      relValue,
      isMobile,
      textToolbarType,
      textAlignment,
      hideFooterToolbar,
      sideToolbarOffset,
      theme: theme || {},
      getEditorState: () => this.getEditorState(),
      setEditorState: editorState => this.updateEditorState(editorState),
      t,
      refId: this.refId
    });
  }

  getToolbars = () => (
    {
      MobileToolbar: this.toolbars.mobile ? this.toolbars.mobile.Toolbar : null,
      TextToolbar: this.props.textToolbarType === 'static' ? this.toolbars.textStatic.Toolbar : null
    }
  )

  getInitialEditorState() {
    const { initialState } = this.props;
    if (initialState) {
      const rawContentState = normalizeInitialState(initialState);
      return EditorState.createWithContent(
        convertFromRaw(rawContentState)
      );
    } else {
      const emptyContentState = convertFromRaw({ //this is needed for ssr. Otherwise the key will be generated randomly on both server and client.
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
    if (this.props.theme !== nextProps.theme) {
      this.setState({ theme: nextProps.theme });
    }
    if (this.props.textToolbarType !== nextProps.textToolbarType) {
      this.setState({ textToolbarType: nextProps.textToolbarType });
    }
  }

  openLinkModal() {
    const { helpers, isMobile, anchorTarget, relValue, t, theme } = this.props;
    const modalStyles = getModalStyles({ fullScreen: false });
    if (helpers && helpers.openModal) {
      const modalProps = { helpers, modalStyles, isMobile, getEditorState: () => this.getEditorState(),
        setEditorState: editorState => this.updateEditorState(editorState), t, theme, anchorTarget,
        relValue, modalName: EditorModals.MOBILE_TEXT_LINK_MODAL, hidePopup: helpers.closeModal };
      helpers.openModal(modalProps);
    }
  }

  // TODO: get rid of this ASAP!
  // Currently, there's no way to get a static toolbar ref without consumer interference
  findFocusableChildForElement(id) {
    const element = document.getElementById(id);
    return element && element.querySelector('*[tabindex="0"]');
  }

  getEditorState = () => this.props.editorState || this.getInitialEditorState();

  updateEditorState = editorState => this.props.onChange(editorState);

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  setEditor = ref => this.editor = get(ref, 'editor', ref);

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
            return <Modal key={`k${index}m${modalIndex}`}/>;
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
    } = this.props;
    const { theme } = this.state;
    const editorState = this.getEditorState();
    return (
      <Editor
        ref={this.setEditor}
        editorState={editorState}
        onChange={this.updateEditorState}
        handleBeforeInput={handleBeforeInput}
        handlePastedText={handlePastedText}
        plugins={this.plugins}
        blockStyleFn={blockStyleFn(theme)}
        handleKeyCommand={handleKeyCommand(this.updateEditorState)}
        editorKey={editorKey}
        keyBindingFn={keyBindingFn}
        helpers={helpers}
        tabIndex={tabIndex}
        placeholder={placeholder || ''}
        readOnly={!!readOnly}
        spellCheck={spellCheck || true}
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

  renderAccessibilityListener = () => <AccessibilityListener isMobile={this.props.isMobile}/>;

  render() {
    const { isMobile } = this.props;
    const { theme } = this.state;
    const isAndroid = isMobile && !baseUtils.isiOS();
    const wrapperClassName = classNames(
      draftStyles.wrapper,
      styles.wrapper,
      theme.wrapper,
      {
        [styles.desktop]: !isMobile,
        [theme.desktop]: !isMobile && theme && theme.desktop,
        [styles.android]: isAndroid,
        [theme.android]: isAndroid
      }
    );
    return (
      <div style={this.props.style} className={wrapperClassName}>
        <div className={classNames(styles.editor, theme.editor)}>
          {this.renderAccessibilityListener()}
          {this.renderEditor()}
          {this.renderToolbars()}
          {this.renderInlineModals()}
        </div>
      </div>
    );
  }
}

RichContentEditor.propTypes = {
  editorKey: PropTypes.string,
  editorState: PropTypes.object.isRequired,
  initialState: PropTypes.object,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
  t: PropTypes.func,
  sideToolbarOffset: PropTypes.object,
  hideFooterToolbar: PropTypes.bool,
  textButtons: PropTypes.arrayOf(PropTypes.string),
  textToolbarType: PropTypes.oneOf(['inline', 'static']),
  plugins: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])),
  config: PropTypes.object,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
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
};

export default translate(null, { withRef: true })(RichContentEditor);
