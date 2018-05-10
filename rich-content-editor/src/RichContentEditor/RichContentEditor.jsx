import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, convertFromRaw, RichUtils, Modifier } from '@wix/draft-js';
import Editor from 'draft-js-plugins-editor';
import isUndefined from 'lodash/isUndefined';
import get from 'lodash/get';
import includes from 'lodash/includes';
import { translate } from 'react-i18next';
import { baseUtils } from 'photography-client-lib/dist/src/utils/baseUtils';
import createEditorToolbars from './Toolbars';
import { getStaticTextToolbarId } from './Toolbars/toolbar-id';
import createPlugins from './createPlugins';
import { keyBindingFn, COMMANDS } from './keyBindings';
import { MODALS, hasLinksInSelection, removeLinksInSelection, getModalStyles } from 'wix-rich-content-common';
import normalizeInitialState from './normalizeInitialState';
import styles from '~/Styles/rich-content-editor.scss';
import draftStyles from '~/Styles/draft.scss';
import 'wix-rich-content-common/dist/styles.css';

class RichContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: this.getInitialEditorState(),
      readOnly: props.readOnly || false,
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
      hideFooterToolbar,
      sideToolbarOffset,
      theme: theme || {},
      getEditorState: () => this.state.editorState,
      setEditorState: editorState => this.setState({ editorState }),
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
    const { editorState, initialState } = this.props;
    if (editorState) {
      return editorState;
    }
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
    if (!isUndefined(nextProps.readOnly) && this.props.readOnly !== nextProps.readOnly) {
      this.setState({ readOnly: nextProps.readOnly });
    }
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

  openLinkModal() {
    const { helpers, isMobile, anchorTarget, relValue, t, theme } = this.props;
    const modalStyles = getModalStyles({ fullScreen: false });
    if (helpers && helpers.openModal) {
      const modalProps = { helpers, modalStyles, isMobile, getEditorState: () => this.state.editorState,
        setEditorState: editorState => this.setState({ editorState }), t, theme, anchorTarget,
        relValue, modalName: MODALS.MOBILE_TEXT_LINK_MODAL, hidePopup: helpers.closeModal };
      helpers.openModal(modalProps);
    }
  }

  // TODO: get rid of this ASAP!
  // Currently, there's no way to get a static toolbar ref without consumer interference
  findFocusableChildForElement(id) {
    const element = document.getElementById(id);
    return element && element.querySelector('*[tabindex="0"]');
  }

  handleKeyCommand = (command, editorState) => {
    let newState, contentState;
    switch (command) {
      case COMMANDS.LINK:
        if (hasLinksInSelection(editorState)) {
          newState = removeLinksInSelection(editorState);
        } else {
          this.openLinkModal();
        }
        break;
      case COMMANDS.ALIGN_RIGHT:
      case COMMANDS.ALIGN_LEFT:
      case COMMANDS.ALIGN_CENTER:
      case COMMANDS.JUSTIFY:
        contentState = Modifier.mergeBlockData(editorState.getCurrentContent(), editorState.getSelection(), { textAlignment: command });
        newState = EditorState.push(editorState, contentState, 'change-block-data');
        break;
      case COMMANDS.TITLE:
      case COMMANDS.SUBTITLE:
      case COMMANDS.NUMBERED_LIST:
      case COMMANDS.BULLET_LIST:
      case COMMANDS.BLOCKQUOTE:
      case COMMANDS.CODE:
        newState = RichUtils.toggleBlockType(editorState, command);
        break;
      case COMMANDS.TAB:
        if (this.getToolbars().TextToolbar) {
          const staticToolbarButton = this.findFocusableChildForElement(`${getStaticTextToolbarId(this.refId)}`);
          staticToolbarButton && staticToolbarButton.focus();
        }
        break;
      default:
        newState = RichUtils.handleKeyCommand(editorState, command);
        break;
    }

    if (newState) {
      this.updateEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  blockStyleFn = contentBlock => {
    const { type, data: { textAlignment } } = contentBlock.toJS();
    const classList = [];
    const { theme } = this.state;

    switch (type) {
      case 'blockquote':
        classList.push(styles.quote);
        classList.push(theme.quote);
        break;
      case 'header-one':
        classList.push(styles.headerOne);
        classList.push(theme.headerOne);
        break;
      case 'header-two':
        classList.push(styles.headerTwo);
        classList.push(theme.headerTwo);
        break;
      case 'header-three':
        classList.push(styles.headerThree);
        classList.push(theme.headerThree);
        break;
      case 'indent':
        classList.push(styles.indent);
        classList.push(theme.indent);
        break;
      case 'ordered-list-item':
        classList.push(styles.orderedList);
        classList.push(theme.orderedList);
        break;
      case 'unordered-list-item':
        classList.push(styles.unorderedList);
        classList.push(theme.unorderedList);
        break;
      case 'atomic':
        classList.push(styles.atomic);
        classList.push(theme.atomic);
        break;
      case 'code-block':
        classList.push(styles.codeBlock);
        classList.push(theme.codeBlock);
        break;
      default:
        classList.push(styles.text);
        classList.push(theme.text);
    }
    if (type !== 'atomic') {
      classList.push(styles[textAlignment]);
      classList.push(theme[textAlignment]);
    }
    return classNames(...classList);
  };

  getEditorState = () => this.state.editorState;

  updateEditorState = editorState => {
    this.setState({ editorState });
    this.props.onChange && this.props.onChange(editorState);
  };

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  setEditor = ref => this.editor = get(ref, 'editor', ref);

  renderToolbars = () => {
    if (!this.state.readOnly) {
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
    if (!this.state.readOnly) {
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
    const { helpers, placeholder, editorKey } = this.props;
    const { editorState, readOnly } = this.state;
    return (
      <Editor
        ref={this.setEditor}
        editorState={editorState}
        onChange={this.updateEditorState}
        plugins={this.plugins}
        blockStyleFn={this.blockStyleFn}
        handleKeyCommand={this.handleKeyCommand}
        placeholder={placeholder || ''}
        readOnly={!!readOnly}
        helpers={helpers}
        spellCheck
        editorKey={editorKey}
        keyBindingFn={keyBindingFn}
      />
    );
  };

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
          {this.renderEditor()}
          {this.renderToolbars()}
          {this.renderInlineModals()}
        </div>
      </div>
    );
  }
}

RichContentEditor.propTypes = {
  editorState: PropTypes.object,
  initialState: PropTypes.object,
  theme: PropTypes.object,
  onChange: PropTypes.func,
  isMobile: PropTypes.bool,
  readOnly: PropTypes.bool,
  helpers: PropTypes.object,
  placeholder: PropTypes.string,
  t: PropTypes.func,
  sideToolbarOffset: PropTypes.object,
  hideFooterToolbar: PropTypes.bool,
  textButtons: PropTypes.arrayOf(PropTypes.string),
  textToolbarType: PropTypes.oneOf(['inline', 'static']),
  plugins: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])),
  config: PropTypes.object,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  editorKey: PropTypes.string,
  style: PropTypes.object
};

export default translate(null, { withRef: true })(RichContentEditor);
