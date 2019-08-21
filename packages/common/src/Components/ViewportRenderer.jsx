import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InView } from 'react-intersection-observer';
import Context from '../Utils/Context';
import classnames from 'classnames';
import { isSSR } from '../Utils/ssrUtils';
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

  render() {
    const {
      children,
      placeholderStyle,
      placeholderClass,
      containerStyle,
      containerClass,
    } = this.props;
    const { theme } = this.context;
    this.styles = this.styles || mergeStyles({ styles, theme });

    if (isSSR() || typeof window.IntersectionObserver === 'undefined') {
      return children;
    }

    return (
      <InView triggerOnce>
        {({ inView, ref }) =>
          inView ? (
            <div ref={ref} style={containerStyle} className={containerClass}>
              {children}
            </div>
          ) : (
            <div
              ref={ref}
              className={classnames(this.styles.placeholder, placeholderClass)}
              style={placeholderStyle}
            />
          )
        }
      </InView>
    );
  }
}

ViewportRenderer.contextType = Context.type;

export default ViewportRenderer;
