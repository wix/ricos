import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ToolbarContainer.scss';

class ToolbarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolbarPosition: {},
    };
  }

  componentDidMount() {
    this.setState({ toolbarPosition: this.getToolbarPosition() });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.toolbarPosition !== this.props.toolbarPosition) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ toolbarPosition: this.getToolbarPosition() });
    }
  }

  setToolbarContainerRef = ref => (this.toolbarContainerRef = ref);

  getToolbarPosition = () => {
    const { toolbarPosition } = this.props;
    const {
      x,
      y,
      offsetLeftInsideContainer,
      containerWidth = 0,
      extraTopOffset,
      extraLeftOffset = 0,
    } = toolbarPosition || {};
    if (this.toolbarContainerRef) {
      const top = y ? `${y - extraTopOffset}px` : null;
      const toolbarWidth = this.toolbarContainerRef.offsetWidth;
      if (offsetLeftInsideContainer + toolbarWidth < containerWidth) {
        return { top, left: x - extraLeftOffset };
      } else {
        return { top, right: 0 };
      }
    }
  };

  render() {
    const { children } = this.props;
    const { toolbarPosition } = this.state;
    return (
      <div
        ref={this.setToolbarContainerRef}
        className={styles.container}
        style={{
          ...toolbarPosition,
        }}
      >
        {children}
      </div>
    );
  }
}

ToolbarContainer.propTypes = {
  toolbarPosition: PropTypes.object,
  children: PropTypes.any,
};

export default ToolbarContainer;
