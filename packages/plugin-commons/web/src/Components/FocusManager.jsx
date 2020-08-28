import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from './FocusTrapReact';

class FocusManager extends Component {
  static propTypes = {
    focusTrapOptions: PropTypes.object,
    children: PropTypes.node,
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    isMobile: false,
    focusTrapOptions: {
      clickOutsideDeactivates: true,
    },
  };

  constructor(props) {
    super(props);
    this.id = `fm_${Math.floor(Math.random() * 9999)}`;
    this.onActivate = this.onActivate.bind(this);
    this.onDeactivate = this.onDeactivate.bind(this);
  }

  onActivate() {}

  onDeactivate() {}

  render() {
    const { children, focusTrapOptions, isMobile, ...rest } = this.props;
    const options = {
      ...focusTrapOptions,
      onActivate: this.onActivate,
      onDeactivate: this.onDeactivate,
      clickOutsideDeactivates: true,
    };
    if (isMobile) {
      return <Fragment {...rest}>{children}</Fragment>;
    } else {
      return (
        <FocusTrap focusTrapOptions={options} {...rest}>
          {children}
        </FocusTrap>
      );
    }
  }
}

export default FocusManager;
