import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { DISPLAY_MODE, DraftOffsetKey } from 'wix-rich-content-editor-common';
import Styles from '../../../../statics/styles/side-toolbar-wrapper.scss';

export default class SideToolbar extends Component {
  static propTypes = {
    pubsub: PropTypes.object.isRequired,
    structure: PropTypes.array.isRequired,
    offset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    theme: PropTypes.object.isRequired,
    visibilityFn: PropTypes.func,
    isMobile: PropTypes.bool,
    displayOptions: PropTypes.shape({
      displayMode: PropTypes.string,
    }),
    toolbarDecorationFn: PropTypes.func,
  };

  static defaultProps = {
    displayOptions: {
      displayMode: DISPLAY_MODE.NORMAL,
    },
    visibilityFn: () => false,
    toolbarDecorationFn: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      position: {
        transform: 'scale(0)',
      },
    };
    this.ToolbarDecoration = props.toolbarDecorationFn();
  }

  componentDidMount() {
    this.props.pubsub.subscribe('editorState', this.onEditorStateChange);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('editorState', this.onEditorStateChange);
  }

  onEditorStateChange = debounce(editorState => {
    const { visibilityFn } = this.props;

    const isVisible = visibilityFn(editorState);
    const wasVisible = this.state.isVisible;

    if (!isVisible) {
      if (wasVisible) {
        this.setState({
          isVisible: false,
          position: {
            transform: 'scale(0)',
          },
        });
      }
      return;
    }

    this.setState({ isVisible });

    const { displayOptions, offset, isMobile } = this.props;
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());

    // TODO verify that always a key-0-0 exists
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
    setTimeout(() => {
      if (displayOptions.displayMode === DISPLAY_MODE.NORMAL) {
        const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
        if (node) {
          const top = node.getBoundingClientRect().top;
          const parentTop = node.offsetParent.getBoundingClientRect().top;
          this.setState({
            position: {
              top: top - parentTop + offset.y,
              ...(isMobile ? { right: offset.x } : { left: offset.x, right: offset.x }),
              transform: `scale(${isMobile ? 0.76 : 1})`, //mobile plus is smaller
              transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
            },
          });
        }
      } else if (displayOptions.displayMode === DISPLAY_MODE.FLOATING) {
        this.setState({
          position: {
            top: offset.y,
            left: offset.x,
            right: offset.x,
            transform: `scale(${isMobile ? 0.76 : 1})`, //mobile plus is smaller
            transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
            position: 'absolute',
          },
        });
      }
    });
  }, 40);

  renderToolbarContent() {
    const { theme, pubsub } = this.props;
    return this.props.structure.map((Component, index) => (
      <Component
        key={index}
        getEditorState={pubsub.get('getEditorState')}
        setEditorState={pubsub.get('setEditorState')}
        theme={theme}
      />
    ));
  }

  render() {
    //checking false since undefined is not good
    if (this.state.isVisible === false) {
      return null;
    }
    const { theme } = this.props;
    const { wrapperStyles } = theme || {};

    const props = {
      className: classNames(
        Styles.sideToolbarWrapper,
        wrapperStyles && wrapperStyles.sideToolbarWrapper
      ),
      style: this.state.position,
    };

    if (this.ToolbarDecoration) {
      const { ToolbarDecoration } = this;
      return <ToolbarDecoration {...props}>{this.renderToolbarContent()}</ToolbarDecoration>;
    }

    return <div {...props}>{this.renderToolbarContent()}</div>;
  }
}
