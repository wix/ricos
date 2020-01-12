import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import redoIcon from './icons/RedoIcon';
import { InlineToolbarButton } from 'wix-rich-content-editor-common';

class RedoButton extends Component {
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
    this.props.setEditorState(EditorState.redo(this.state.editorState));
  };

  render() {
    const { editorState } = this.state;
    const { isMobile, theme = {}, children, className, config, tabIndex, t } = this.props;
    const combinedClassName = classNames(theme.redo, className);
    const icon = config?.toolbar?.icons?.Redo || redoIcon();

    return isMobile ? (
      <InlineToolbarButton
        disabled={editorState ? editorState.getRedoStack().isEmpty() : true}
        onClick={this.onClick}
        isActive={false}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('undoButton_Tooltip')}
        dataHook={'undoButton'}
        tabIndex={tabIndex}
        icon={redoIcon}
      >
        {children}
      </InlineToolbarButton>
    ) : (
      <button
        disabled={editorState ? editorState.getRedoStack().isEmpty() : true}
        onClick={this.onClick}
        className={combinedClassName}
      >
        {isMobile && icon}
        {children}
      </button>
    );
  }
}
export default RedoButton;
