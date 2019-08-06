import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/modal-arrow.scss';

class Arrow extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles } = this;
    const { buttonRef } = this.props;
    const { top } = buttonRef.getBoundingClientRect();

    return (
      <div>
        <div className={styles[`unsplash_modal_arrow_${top > 357 ? 'down' : 'up'}`]} />
      </div>
    );
  }
}

Arrow.propTypes = {
  buttonRef: PropTypes.object,
  theme: PropTypes.object.isRequired,
};
export default Arrow;
