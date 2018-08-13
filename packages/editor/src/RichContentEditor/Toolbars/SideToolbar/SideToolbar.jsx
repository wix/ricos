import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DraftOffsetKey from '@wix/draft-js/lib/DraftOffsetKey';
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
    isMobile: PropTypes.bool
  };

  state = {
    position: {
      transform: 'scale(0)',
    },
  };

  componentDidMount() {
    this.props.pubsub.subscribe('editorState', this.onEditorStateChange);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('editorState', this.onEditorStateChange);
  }

  onEditorStateChange = editorState => {
    const { visibilityFn } = this.props;

    let isVisible = false;
    if (visibilityFn) {
      isVisible = visibilityFn(editorState);
    }

    if (!isVisible) {
      this.setState({
        position: {
          transform: 'scale(0)',
        },
      });
      return;
    }

    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());

    // TODO verify that always a key-0-0 exists
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
    setTimeout(() => {
      const { isMobile } = this.props;
      const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
      if (node) {
        const top = node.getBoundingClientRect().top;
        const parentTop = node.offsetParent.getBoundingClientRect().top;
        const { offset } = this.props;
        this.setState({
          position: {
            top: top - parentTop + offset.y,
            [!isMobile ? 'left' : 'right']: offset.x,
            transform: `scale(${isMobile ? 0.76 : 1})`, //mobile plus is smaller
            transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
          },
        });
      }
    });
  };

  render() {
    const { theme, pubsub } = this.props;
    const { wrapperStyles } = theme || {};
    const wrapperClassNames = classNames(Styles.sideToolbarWrapper, wrapperStyles && wrapperStyles.sideToolbarWrapper);
    return (
      <div className={wrapperClassNames} style={this.state.position}>
        {this.props.structure.map((Component, index) => (
          <Component
            key={index}
            getEditorState={pubsub.get('getEditorState')}
            setEditorState={pubsub.get('setEditorState')}
            theme={theme}
          />
        ))}
      </div>
    );
  }
}
