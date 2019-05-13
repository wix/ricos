import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/navbar.scss';

class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }
  onKeyPress = e => {
    if (e.keyCode === 27) {
      this.props.onBackClicked();
    }
  };

  onBackArrowClicked = () => {
    this.props.onBackClicked();
  };
  render() {
    return (
      <div className={this.styles.navbar_container}>
        <div
          role="button"
          tabIndex={0}
          onKeyPress={this.onKeyPress}
          onClick={this.onBackArrowClicked}
          className={this.styles.back_arrow_container}
        >
          <div className={this.styles.back_arrow_button} />
        </div>
        <div className={this.styles.navbar_title}>Choose an image</div>
      </div>
    );
  }
}

Navbar.propTypes = {
  theme: PropTypes.object.isRequired,
  onBackClicked: PropTypes.func.isRequired,
};

export default Navbar;
