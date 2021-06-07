import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'wix-rich-content-editor-common';
import { Version } from 'wix-rich-content-common';
import TextButton from '../TextButton';

export default ({ blockTypes, Icons, InactiveIcon = null, tooltipTextKey }) =>
  class TextBlockStyleButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      helpers: PropTypes.object,
      isVisible: PropTypes.bool,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
    };

    constructor(props) {
      super(props);
      this.state = {
        blockTypeIndex: undefined,
      };
    }

    get activeBlockType() {
      const { blockTypeIndex } = this.state;
      return blockTypeIndex !== undefined ? blockTypes[blockTypeIndex] : 'unstyled';
    }

    get selectionBlockType() {
      const { getEditorState } = this.props;
      if (!getEditorState) {
        return false;
      }

      const editorState = getEditorState();
      return editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())
        .getType();
    }

    get Icon() {
      const { blockTypeIndex } = this.state;
      if (blockTypeIndex !== undefined) {
        return Icons[blockTypeIndex];
      } else {
        return InactiveIcon ? InactiveIcon : Icons[0];
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.isVisible === false && nextProps.isVisible === true) {
        const { selectionBlockType } = this;
        const blockTypeFoundIndex = blockTypes.findIndex(b => b === selectionBlockType);
        const blockTypeIndex = blockTypeFoundIndex > -1 ? blockTypeFoundIndex : undefined;
        this.setState({ blockTypeIndex });
      }
    }

    nextBlockTypeIndex = () => {
      const blockType = this.activeBlockType;
      let nextBlockTypeIndex = 0;
      if (blockType) {
        const blockTypeIndex = blockTypes.findIndex(t => t === blockType);
        if (blockTypeIndex + 1 < blockTypes.length) {
          nextBlockTypeIndex = blockTypeIndex + 1;
        } else {
          nextBlockTypeIndex = -1;
        }
      }
      return nextBlockTypeIndex > -1 ? nextBlockTypeIndex : undefined;
    };

    setBlockStyle = event => {
      event.preventDefault();
      const { getEditorState, setEditorState, helpers } = this.props;
      const blockTypeIndex = this.nextBlockTypeIndex();
      this.setState({ blockTypeIndex }, () => {
        const blockType = this.activeBlockType;
        const isAddEvent = blockType !== 'unstyled';
        isAddEvent && helpers?.onPluginAdd?.(blockType, 'FormattingToolbar');
        setEditorState(RichUtils.toggleBlockType(getEditorState(), blockType));
        isAddEvent && helpers?.onPluginAddSuccess?.(blockType, 'FormattingToolbar');
      });
    };

    blockTypeIsActive = () => {
      const { blockType } = this;
      return typeof blockType !== 'undefined' && blockType === this.activeBlockType;
    };

    render() {
      const { Icon } = this;
      const { theme, helpers, isMobile, t, tabIndex } = this.props;
      const tooltipText = t(tooltipTextKey);
      const textForHooks = tooltipText.replace(/\s+/, '');
      const dataHookText = `textBlockStyleButton_${textForHooks}`;
      const onClick = event => {
        helpers?.onToolbarButtonClick?.({
          buttonName: textForHooks,
          version: Version.currentVersion,
        });
        this.setBlockStyle(event);
      };

      return (
        <TextButton
          icon={Icon}
          theme={theme}
          isMobile={isMobile}
          isActive={this.blockTypeIsActive}
          onClick={onClick}
          tooltipText={tooltipText}
          dataHook={dataHookText}
          tabIndex={tabIndex}
        />
      );
    }
  };
