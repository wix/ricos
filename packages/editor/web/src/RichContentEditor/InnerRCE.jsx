/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichContentEditor from './RichContentEditor';
import styles from '../../statics/styles/rich-content-editor.scss';
import 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import { __convertToRawWithoutVersion } from '../../lib/editorStateConversion';
import { LINK_PREVIEW_TYPE } from 'wix-rich-content-common';
import { cloneDeep } from 'lodash';

class InnerRCE extends Component {
  constructor(props) {
    super(props);
    const { innerRCERenderedIn, config, editorState } = props;
    this.config = this.cleanConfig(cloneDeep(config));
    this.plugins = config[innerRCERenderedIn].innerRCEPlugins;
    this.state = {
      editorState,
    };
  }

  cleanConfig = config => {
    let clearConfig = config;
    clearConfig = this.removeAnchorFromLink(clearConfig);
    clearConfig = this.removeLinkPreview(clearConfig);
    return clearConfig;
  };

  removeLinkPreview = config => {
    if (config?.[LINK_PREVIEW_TYPE]) {
      config[LINK_PREVIEW_TYPE] = undefined;
    }
    return config;
  };

  removeAnchorFromLink = config => {
    if (config?.LINK?.linkTypes?.anchor) {
      config.LINK.linkTypes.anchor = false;
    }
    return config;
  };

  static getDerivedStateFromProps(props, state) {
    const propsContentState = __convertToRawWithoutVersion(props.editorState.getCurrentContent());
    const stateContentState = __convertToRawWithoutVersion(state.editorState.getCurrentContent());
    if (JSON.stringify(propsContentState) !== JSON.stringify(stateContentState)) {
      return { editorState: props.editorState };
    } else {
      return null;
    }
  }

  saveInnerRCE = editorState => {
    this.setState({ editorState });
    const newContentState = __convertToRawWithoutVersion(editorState.getCurrentContent());
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

  focus = () => this.ref.focus();

  setRef = ref => (this.ref = ref);

  onBackspaceAtBeginningOfContent = editorState => {
    const { onBackspaceAtBeginningOfContent } = this.props;

    if (onBackspaceAtBeginningOfContent) {
      const selection = editorState.getSelection();
      const startKey = selection.getStartKey();
      const contentState = editorState.getCurrentContent();
      const isCollapsed = selection.isCollapsed();
      const firstBlock = contentState.getBlocksAsArray()[0];
      const isFirstBlock = firstBlock.getKey() === startKey;
      const isBeginingOfBlock = selection.getAnchorOffset() === 0;
      const isUnstyledBlock = firstBlock.getType() === 'unstyled';

      if (isCollapsed && isFirstBlock && isBeginingOfBlock && isUnstyledBlock) {
        onBackspaceAtBeginningOfContent();
      }
    }
  };

  render() {
    const { theme, isMobile, direction, additionalProps, readOnly, ...rest } = this.props;
    const { editorState } = this.state;
    return (
      <div
        data-id="inner-rce"
        onFocus={this.onFocus}
        className={classNames(styles.editor, theme.editor, 'inner-rce')}
      >
        <RichContentEditor
          {...rest} // {...rest} need to be before editorState, onChange, plugins
          ref={this.setRef}
          editorState={editorState}
          onChange={this.saveInnerRCE}
          plugins={this.plugins}
          config={this.config}
          isMobile={isMobile}
          toolbarsToIgnore={['FooterToolbar', 'SideToolbar']}
          isInnerRCE
          editorKey="inner-rce"
          readOnly={readOnly}
          onBackspace={this.onBackspaceAtBeginningOfContent}
          direction={direction}
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
  onBackspaceAtBeginningOfContent: PropTypes.func,
  readOnly: PropTypes.bool,
  setEditorToolbars: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  direction: PropTypes.string,
};

export default InnerRCE;
