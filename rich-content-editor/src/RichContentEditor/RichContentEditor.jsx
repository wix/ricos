import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, convertFromRaw } from '@wix/draft-js';
import Editor from 'draft-js-plugins-editor';
import isUndefined from 'lodash/isUndefined';
import get from 'lodash/get';
import includes from 'lodash/includes';
import { translate } from 'react-i18next';
import { baseUtils } from 'photography-client-lib/dist/src/utils/baseUtils';
import createEditorToolbars from './Toolbars';
import createPlugins from './Plugins';
import { normalizeInitialState } from '~/Utils';
import styles from '~/Styles/rich-content-editor.scss';
import draftStyles from '~/Styles/draft.scss';

class RichContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: this.getInitialEditorState(),
      readOnly: props.readOnly || false,
      theme: props.theme || {}
    };
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
      return EditorState.createWithContent(
        convertFromRaw(normalizeInitialState(initialState))
      );
    } else {
      return EditorState.createEmpty();
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
    const { helpers, placeholder } = this.props;
    const { editorState, readOnly } = this.state;
    return (
      <Editor
        ref={this.setEditor}
        editorState={editorState}
        onChange={this.updateEditorState}
        plugins={this.plugins}
        blockStyleFn={this.blockStyleFn}
        placeholder={placeholder || ''}
        readOnly={!!readOnly}
        helpers={helpers}
        spellCheck
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
  plugins: PropTypes.arrayOf(PropTypes.string),
  config: PropTypes.object,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  style: PropTypes.object
};

export default translate(null, { withRef: true })(RichContentEditor);
