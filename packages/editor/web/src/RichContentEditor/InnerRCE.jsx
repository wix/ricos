/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichContentEditor from './RichContentEditor';
import styles from '../../statics/styles/rich-content-editor.scss';
import draftDefaultStyles from 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import { LINK_PREVIEW_TYPE, TABLE_TYPE } from 'wix-rich-content-common';
import { cloneDeep } from 'lodash';
import {
  isCursorAtStartOfContent,
  selectAllContent,
  isAllContentSelected,
} from 'wix-rich-content-editor-common';
import ClickOutside from 'react-click-outsider';

class InnerRCE extends PureComponent {
  constructor(props) {
    super(props);
    const { innerRCERenderedIn, config, editing } = props;
    this.config = this.cleanConfig(cloneDeep(config));
    this.plugins = config[innerRCERenderedIn].innerRCEPlugins;
    this.state = {
      showToolbars: editing || false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.innerRCERenderedIn === 'table' &&
      prevProps.editing === false &&
      prevProps.editing !== this.props.editing
    ) {
      this.handleAtomicPluginsBorders(true);
    }
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

  onChange = editorState => {
    this.props.onChange(editorState);
    this.editorHeight = this.editorWrapper.offsetHeight;
  };

  getToolbars = () => {
    const { MobileToolbar, TextToolbar } = this.ref.getToolbars();
    return { MobileToolbar, TextToolbar };
  };

  getToolbarProps = type => {
    const { buttons, context, pubsub } = this.ref.getToolbarProps(type);
    return { buttons, context, pubsub };
  };

  selectAllContent = forceSelection => {
    const { editorState } = this.props;
    if (!isAllContentSelected(editorState)) {
      const newEditorState = selectAllContent(editorState, forceSelection);
      this.props.onChange(newEditorState);
    }
  };

  focus = () => this.ref.focus();

  setRef = ref => (this.ref = ref);

  setEditorWrapper = ref => (this.editorWrapper = ref);

  onBackspaceAtBeginningOfContent = editorState => {
    const { onBackspaceAtBeginningOfContent } = this.props;

    if (onBackspaceAtBeginningOfContent) {
      const contentState = editorState.getCurrentContent();
      const isUnstyledBlock = contentState.getBlocksAsArray()[0].getType() === 'unstyled';

      if (isCursorAtStartOfContent(editorState) && isUnstyledBlock) {
        onBackspaceAtBeginningOfContent();
      }
    }
  };

  onFocus = e => {
    e.stopPropagation();
    this.ref && this.props.setEditorToolbars(this.ref);
    this.props.setInPluginEditingMode(true);
    if (!this.state.showToolbars) {
      this.setState({ showToolbars: true });
    }
  };

  onClickOutside = e => {
    if (
      this.state.showToolbars &&
      this.editorWrapper &&
      e.target &&
      !e.target.closest('[data-id=rich-content-editor-modal]') &&
      !e.target.closest('[class=ReactModalPortal]') &&
      !this.editorWrapper.contains(e.target) &&
      !e.target.closest('[data-hook=table-plugin-cell]')
    ) {
      this.setState({ showToolbars: false });
    }
  };

  handleAtomicPluginsBorders = enterEditing => {
    const { editing = true } = this.props;
    const { showToolbars } = this.state;
    const hideBorder = !showToolbars || !editing;
    if (this.editorWrapper) {
      const atomicBlocksNodeList = this.editorWrapper.querySelectorAll('[data-focus]');
      const atomicBlocks = Array.apply(null, atomicBlocksNodeList);
      atomicBlocks.forEach(block => {
        const blockDataFocus = enterEditing ? 'true' : block.getAttribute('data-focus');
        block.setAttribute('data-focus', hideBorder ? 'false' : blockDataFocus);
        block.style.boxShadow = hideBorder ? 'none' : '';
      });
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
      editing = true,
      innerRCERenderedIn,
      tablePluginMenu,
      ...rest
    } = this.props;
    const { showToolbars } = this.state;
    this.handleAtomicPluginsBorders();
    const renderedInTable = innerRCERenderedIn === TABLE_TYPE;
    if (renderedInTable && isMobile) {
      toolbarsToIgnore.push('SideToolbar');
    }
    return (
      <ClickOutside onClickOutside={this.onClickOutside}>
        <div
          data-id="inner-rce"
          onFocus={this.onFocus}
          className={classNames(
            styles.editor,
            theme.editor,
            renderedInTable && styles.renderedInTable,
            renderedInTable && draftDefaultStyles.renderedInTable,
            'inner-rce'
          )}
          ref={this.setEditorWrapper}
        >
          <RichContentEditor
            {...rest} // {...rest} need to be before editorState, onChange, plugins
            ref={this.setRef}
            editorState={editorState}
            onChange={this.onChange}
            plugins={this.plugins}
            config={this.config}
            isMobile={isMobile}
            toolbarsToIgnore={['FooterToolbar', ...toolbarsToIgnore]}
            showToolbars={editing && showToolbars}
            isInnerRCE
            innerRCERenderedIn={innerRCERenderedIn}
            editorKey="inner-rce"
            readOnly={readOnly}
            onBackspace={this.onBackspaceAtBeginningOfContent}
            direction={direction}
            tablePluginMenu={tablePluginMenu}
            {...additionalProps}
          />
        </div>
      </ClickOutside>
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
  toolbarsToIgnore: PropTypes.array,
  editing: PropTypes.bool,
  tablePluginMenu: PropTypes.bool,
};

export default InnerRCE;
