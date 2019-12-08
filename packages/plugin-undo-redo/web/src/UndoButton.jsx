import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import undoIcon from './icons/UndoIcon';

class UndoButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.any,
    setEditorState: PropTypes.func,
    isMobile: PropTypes.bool,
    className: PropTypes.string,
    pubsub: PropTypes.object,
    config: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

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
    const { isMobile, theme = {}, children, className, config } = this.props;
    const combinedClassName = classNames(theme.undo, className);
    const icon = config?.toolbar?.icons?.Undo || undoIcon();

    return (
      <button
        disabled={editorState ? editorState.getUndoStack().isEmpty() : true}
        onClick={this.onClick}
        className={combinedClassName}
      >
        {isMobile && icon}
        {children}
      </button>
    );
  }
}
export default UndoButton;
