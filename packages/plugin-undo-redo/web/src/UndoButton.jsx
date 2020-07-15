import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import undoIcon from './icons/UndoIcon.svg';
import { InlineToolbarButton, EditorState } from 'wix-rich-content-editor-common';

class UndoButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.any,
    setEditorState: PropTypes.func,
    isMobile: PropTypes.bool,
    className: PropTypes.string,
    pubsub: PropTypes.object,
    config: PropTypes.object,
    tabIndex: PropTypes.number,
    t: PropTypes.func,
  };

  state = {};

  componentDidMount() {
    this.props.pubsub.subscribe('editorState', this.onEditorStateChange);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('editorState', this.onEditorStateChange);
  }

  onEditorStateChange = editorState => {
    this.setState({ editorState });
  };

  onClick = event => {
    event.stopPropagation();
    this.props.setEditorState(EditorState.undo(this.state.editorState));
  };

  render() {
    const { editorState } = this.state;
    const { isMobile, theme = {}, children, className, config, tabIndex, t } = this.props;
    const combinedClassName = classNames(theme.undo, className);
    const icon = config?.toolbar?.icons?.Undo || undoIcon;
    const disabled = editorState?.getUndoStack()?.isEmpty() || !editorState;

    if (isMobile)
      return (
        <InlineToolbarButton
          disabled={disabled}
          onClick={this.onClick}
          isActive={false}
          theme={theme}
          isMobile={isMobile}
          tooltipText={t('undoButton_Tooltip')}
          dataHook={'undoButton'}
          tabIndex={tabIndex}
          icon={icon}
        >
          {children}
        </InlineToolbarButton>
      );
    else
      return (
        <button
          tabIndex={tabIndex}
          disabled={disabled}
          onClick={this.onClick}
          className={combinedClassName}
        >
          {children}
        </button>
      );
  }
}
export default UndoButton;
