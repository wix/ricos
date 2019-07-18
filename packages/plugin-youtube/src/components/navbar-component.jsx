import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import { AddIcon } from './../icons';
import styles from '../../statics/styles/navbar-component.scss';

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      disable: true,
    };
  }

  onAddButtonClicked = () => {
    const { selectedVideoUrl } = this.props;
    this.props.onAddClicked(selectedVideoUrl);
  };

  onBackArrowClicked = () => {
    this.props.onBackClicked();
  };

  onKeyPress = e => {
    if (e.keyCode === 27) {
      this.props.onBackClicked();
    }
  };

  render() {
    const { selectedVideoUrl, isTextBoxFocused, t } = this.props;
    const disableAadd = !selectedVideoUrl || isTextBoxFocused;
    return (
      <div className={this.styles.youtube_navbar_container}>
        <div
          role="button"
          tabIndex={0}
          onKeyPress={this.onKeyPress}
          onClick={this.onBackArrowClicked}
          className={this.styles.youtube_back_arrow_container}
        >
          <div className={this.styles.youtube_back_arrow_button} />
        </div>
        <div className={this.styles.youtube_navbar_title}>{t('YoutubePlugin_navbar_title')}</div>
        <div
          role="button"
          tabIndex={0}
          onKeyPress={this.onKeyPress}
          onClick={!disableAadd && this.onAddButtonClicked}
          style={{ opacity: disableAadd ? '0.6' : '1' }}
          disabled={disableAadd}
          className={this.styles.youtube_add_button_container}
        >
          <AddIcon className={this.styles.youtube_add_icon_container} />
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}

NavbarComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  selectedVideoUrl: PropTypes.string,
  onAddClicked: PropTypes.func.isRequired,
  onBackClicked: PropTypes.func.isRequired,
  isTextBoxFocused: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default NavbarComponent;
