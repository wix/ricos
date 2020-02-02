import React from 'react';
import PropTypes from 'prop-types';
import createFocusTrap from 'focus-trap';

const checkedProps = ['active', 'paused', 'tag', 'focusTrapOptions', '_createFocusTrap'];

export default class FocusTrap extends React.Component {
  componentDidMount() {
    this.focusTrap = this.props._createFocusTrap(this.node, this.props.focusTrapOptions);
    if (!this.node.firstElementChild.hasAttribute('nofocus')) {
      if (this.props.active) {
        this.focusTrap.activate();
      }
      if (this.props.paused) {
        this.focusTrap.pause();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active && !this.props.active) {
      this.focusTrap.deactivate();
    } else if (!prevProps.active && this.props.active) {
      this.focusTrap.activate();
    }

    if (prevProps.paused && !this.props.paused) {
      this.focusTrap.unpause();
    } else if (!prevProps.paused && this.props.paused) {
      this.focusTrap.pause();
    }
  }

  componentWillUnmount() {
    this.focusTrap.deactivate();
  }

  setNode = el => (this.node = el);

  render() {
    const elementProps = Object.keys(this.props)
      .filter(
        prop =>
          Object.prototype.hasOwnProperty.call(this.props, prop) && !checkedProps.includes(prop)
      )
      .reduce((resultProps, prop) => ({ ...resultProps, [prop]: this.props[prop] }), {
        ref: this.setNode,
      });

    return React.createElement(this.props.tag, elementProps, this.props.children);
  }
}

FocusTrap.propTypes = {
  active: PropTypes.bool,
  tag: PropTypes.string,
  paused: PropTypes.bool,
  focusTrapOptions: PropTypes.object,
  _createFocusTrap: PropTypes.func.isRequired,
  children: PropTypes.node,
};

FocusTrap.defaultProps = {
  active: true,
  tag: 'div',
  paused: false,
  focusTrapOptions: {},
  _createFocusTrap: createFocusTrap,
};
