/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichContentEditor from './RichContentEditor';
import styles from '../../statics/styles/rich-content-editor.scss';
import 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import { LINK_PREVIEW_TYPE } from 'wix-rich-content-common';
import { cloneDeep } from 'lodash';
import { EditorState, TOOLBARS } from 'wix-rich-content-editor-common';

class InnerRCE extends PureComponent {
  constructor(props) {
    super(props);
    const { innerRCERenderedIn, config } = props;
    this.config = this.cleanConfig(cloneDeep(config));
    this.plugins = config[innerRCERenderedIn].innerRCEPlugins;
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

  saveInnerRCE = editorState => {
    if (this.props.setIsCollapsed) {
      const selection = editorState.getSelection();
      const isCollapsed = selection.isCollapsed();
      this.props.setIsCollapsed(isCollapsed);
    }
    this.props.onChange(editorState);
    this.editorHeight = this.editorWrapper.offsetHeight;
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

  selectAllContent = forceSelection => {
    const { editorState } = this.props;
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection().merge({
      anchorKey: currentContent.getFirstBlock().getKey(),
      anchorOffset: 0,

      focusOffset: currentContent.getLastBlock().getText().length,
      focusKey: currentContent.getLastBlock().getKey(),
    });
    const newEditorState = forceSelection
      ? EditorState.forceSelection(editorState, selection)
      : EditorState.acceptSelection(editorState, selection);
    this.props.onChange(newEditorState);
  };

  focus = () => this.ref.focus();

  setRef = ref => (this.ref = ref);

  setEditorWrapper = ref => (this.editorWrapper = ref);

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
    const {
      theme,
      isMobile,
      additionalProps = {},
      readOnly,
      direction,
      toolbarsToIgnore = [],
      editorState,
      ...rest
    } = this.props;
    return (
      <div
        data-id="inner-rce"
        onFocus={this.onFocus}
        className={classNames(styles.editor, theme.editor, 'inner-rce')}
        ref={this.setEditorWrapper}
      >
        <RichContentEditor
          {...rest} // {...rest} need to be before editorState, onChange, plugins
          ref={this.setRef}
          editorState={editorState}
          onChange={this.saveInnerRCE}
          plugins={this.plugins}
          config={this.config}
          isMobile={isMobile}
          toolbarsToIgnore={['FooterToolbar', 'SideToolbar', ...toolbarsToIgnore]}
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
  setIsCollapsed: PropTypes.func,
  direction: PropTypes.string,
  toolbarsToIgnore: PropTypes.array,
};

export default InnerRCE;
