/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichContentEditor from './RichContentEditor';
import styles from '../../statics/styles/rich-content-editor.scss';
import 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import { convertToRaw } from '../../lib/editorStateConversion';
import { cloneDeep } from 'lodash';
import { EditorState, TOOLBARS } from 'wix-rich-content-editor-common';

class InnerRCE extends PureComponent {
  constructor(props) {
    super(props);
    const { innerRCERenderedIn, config, editorState } = props;
    this.config = this.removeAnchorFromLink(cloneDeep(config));
    this.plugins = config[innerRCERenderedIn].innerRCEPlugins;
    this.state = {
      editorState,
    };
  }

  removeAnchorFromLink = config => {
    if (config?.LINK?.linkTypes?.anchor) {
      config.LINK.linkTypes.anchor = false;
    }
    return config;
  };

  static getDerivedStateFromProps(props, state) {
    const propsContentState = convertToRaw(props.editorState.getCurrentContent());
    const stateContentState = convertToRaw(state.editorState.getCurrentContent());
    if (JSON.stringify(propsContentState) !== JSON.stringify(stateContentState)) {
      return { editorState: props.editorState };
    } else {
      return null;
    }
  }

  saveInnerRCE = editorState => {
    this.setState({ editorState });
    const newContentState = convertToRaw(editorState.getCurrentContent());
    this.props.onChange(newContentState);
  };

  onFocus = e => {
    e.stopPropagation();
    this.props.setEditorToolbars(this.ref);
    this.props.setInPluginEditingMode(true);
  };

  getToolbars = () => {
    const { MobileToolbar, TextToolbar } = this.ref.getToolbars();
    return { MobileToolbar, TextToolbar };
  };

  getToolbarProps = (type = TOOLBARS.INSERT_PLUGIN) => {
    const { buttons, context, pubsub } = this.ref.getToolbarProps(type);
    return { buttons, context, pubsub };
  };

  selectAllContent = () => {
    const { editorState } = this.state;
    const currentContent = this.state.editorState.getCurrentContent();
    const selection = this.state.editorState.getSelection().merge({
      anchorKey: currentContent.getFirstBlock().getKey(),
      anchorOffset: 0,

      focusOffset: currentContent.getLastBlock().getText().length,
      focusKey: currentContent.getLastBlock().getKey(),
    });
    this.setState({ editorState: EditorState.acceptSelection(editorState, selection) });
  };

  focus = () => this.ref.focus();

  setRef = ref => (this.ref = ref);

  render() {
    const { theme, isMobile, additionalProps = {}, readOnly, ...rest } = this.props;
    const { editorState } = this.state;
    return (
      <div
        data-id="inner-rce"
        onFocus={this.onFocus}
        className={classNames(styles.editor, theme.editor)}
      >
        <RichContentEditor
          {...rest} // {...rest} need to be before editorState, onChange, plugins
          ref={this.setRef}
          editorState={editorState}
          onChange={this.saveInnerRCE}
          plugins={this.plugins}
          config={this.config}
          isMobile={isMobile}
          toolbarsToIgnore={['FooterToolbar', 'SideToolbar', 'InlineTextToolbar']}
          isInnerRCE
          editorKey="inner-rce"
          readOnly={readOnly}
          {...additionalProps}
        />
      </div>
    );
  }
}

InnerRCE.propTypes = {
  editorState: PropTypes.object,
  innerRCEPlugins: PropTypes.array,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  onChange: PropTypes.func,
  plugins: PropTypes.array,
  innerRCERenderedIn: PropTypes.string,
  config: PropTypes.object,
  additionalProps: PropTypes.object,
  readOnly: PropTypes.bool,
  setEditorToolbars: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
};

export default InnerRCE;
