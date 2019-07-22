import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';
import Context from '../Utils/Context';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/placeholder.scss';

class ViewportRenderer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    placeholderStyle: PropTypes.object,
    alwaysRenderChildren: PropTypes.bool,
  };

  static defaultProps = {
    placeholderStyle: {},
    alwaysRenderChildren: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      shouldRenderChildren: props.alwaysRenderChildren,
    };
  }

  onEnterViewport = () => {
    if (this.props.alwaysRenderChildren) {
      return;
    }
    this.setState({
      shouldRenderChildren: true,
    });
  };

  onLeaveViewport = () => {
    if (this.props.alwaysRenderChildren) {
      return;
    }
    this.setState({
      shouldRenderChildren: false,
    });
  };
  render() {
    const { shouldRenderChildren } = this.state;
    const { children, placeholderStyle } = this.props;
    const { theme } = this.context;
    this.styles = this.styles || mergeStyles({ styles, theme });
    return (
      <Waypoint onEnter={this.onEnterViewport} onLeave={this.onLeaveViewport}>
        {shouldRenderChildren ? (
          <div>{children}</div>
        ) : (
          <div className={this.styles.placeholder} style={placeholderStyle} />
        )}
      </Waypoint>
    );
  }
}

ViewportRenderer.contextType = Context.type;

export default ViewportRenderer;
