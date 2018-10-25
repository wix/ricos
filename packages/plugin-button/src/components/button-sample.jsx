import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/button-sample.scss';

class ButtonSample extends PureComponent {

  render() {
    return (
      <button style={this.props.style} className={styles.button_sample}>
        Click Me!
      </button>
    );
  }
}

ButtonSample.propTypes = {
  style: PropTypes.object
};

export default ButtonSample;
