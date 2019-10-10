import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import styles from '../../statics/styles/image-counter.scss';

class ImageCounter extends PureComponent {
  static propTypes = {
    formatLabel: PropTypes.func,
    children: PropTypes.node.isRequired,
    counter: PropTypes.number.isRequired,
    onPreviewExpand: PropTypes.func.isRequired,
    style: PropTypes.object,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    formatLabel: counter => `+ ${counter}`,
    onClick: () => {},
  };

  onClick = e => {
    const { onClick, onPreviewExpand } = this.props;
    e.preventDefault();
    onClick();
    onPreviewExpand();
  };

  render() {
    const { formatLabel, children, counter } = this.props;
    const label = formatLabel(counter);
    /* eslint-disable */
    return (
      <div>
        {label}
        {children}
      </div>
    );
  }
}

export default ImageCounter;
