import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Observer from 'react-intersection-observer';
import Context from '../Utils/Context';
import classnames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/placeholder.scss';

class ViewportRenderer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    placeholderStyle: PropTypes.object,
    placeholderClass: PropTypes.string,
    containerStyle: PropTypes.object,
    containerClass: PropTypes.string,
    alwaysRenderChildren: PropTypes.bool,
  };

  static defaultProps = {
    placeholderStyle: {},
    containerStyle: {},
    alwaysRenderChildren: false,
    placeholderClass: '',
    containerClass: '',
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
    const {
      children,
      placeholderStyle,
      placeholderClass,
      containerStyle,
      containerClass,
    } = this.props;
    const { theme } = this.context;
    this.styles = this.styles || mergeStyles({ styles, theme });

    // return <div style={containerStyle}>{children}</div>
    return (
      <Observer onChange={inView => (inView ? this.onEnterViewport() : this.onLeaveViewport())}>
        {shouldRenderChildren ? (
          <div style={containerStyle} className={containerClass}>
            {children}
          </div>
        ) : (
          <div
            className={classnames(this.styles.placeholder, placeholderClass)}
            style={placeholderStyle}
          />
        )}
      </Observer>
    );
  }
}

ViewportRenderer.contextType = Context.type;

export default ViewportRenderer;
