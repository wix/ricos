import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  mergeStyles,
  TextInput,
  Button,
  isVideoUrl,
  WixUtils,
  getUrlMatches,
} from 'wix-rich-content-common';
import styles from '../../statics/styles/search-input.scss';
class SearchInputComponent extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: this.props.theme });
    const { t } = this.props;
    this.state = {
      textInputValue: '',
      searchTerm: '',
      selectedVideoUrl: this.props.selectedVideoUrl,
      buttonText: t('YoutubePlugin_SearchButton_Text'),
      invalidYoutubeURL: false,
    };
  }

  onFocus = () => {
    this.props.onSearchTextBoxFocused(true);
  };

  onBlur = () => {
    this.props.onSearchTextBoxBlured(false);
  };

  onTextInputChanged = e => {
    const { t } = this.props;
    this.setState({ textInputValue: e.target.value });
    if (getUrlMatches(e.target.value)) {
      this.setState({ buttonText: t('YoutubePlugin_AddButton_Text'), invalidYoutubeURL: false });
    } else {
      this.setState({ buttonText: t('YoutubePlugin_SearchButton_Text') });
    }
  };

  onSubmit = () => {
    const { textInputValue } = this.state;
    if (getUrlMatches(textInputValue)) {
      if (isVideoUrl(textInputValue)) {
        this.setState({ searchTerm: textInputValue, invalidYoutubeURL: false });
        this.props.onSearchButtonClicked(textInputValue);
      } else {
        this.setState({ invalidYoutubeURL: true });
      }
    } else {
      this.setState({ searchTerm: textInputValue, invalidYoutubeURL: false });
      this.props.onSearchButtonClicked(textInputValue);
    }
  };

  onSearchClicked = () => {
    this.onSubmit();
  };

  handleOnKeyPressed = e => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  };

  render() {
    const { t } = this.props;
    return (
      <div className={styles.search_input_container}>
        <form
          action="#"
          onSubmit={() => {
            return false;
          }}
        >
          <TextInput
            type="search"
            onChange={this.onTextInputChanged.bind(this)}
            onKeyPress={this.handleOnKeyPressed}
            placeholder={t('YoutubePlugin_Search_Textbox_Placeholder')}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            theme={this.styles}
            error={this.state.invalidYoutubeURL && t('YoutubePlugin_Url_ErrorTooltip')}
          />
          {!WixUtils.isMobile() && (
            <Button onClick={this.onSearchClicked} theme={this.styles} type="secondary">
              {this.state.buttonText}
            </Button>
          )}
        </form>
      </div>
    );
  }
}

SearchInputComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  selectedVideoUrl: PropTypes.string,
  onSearchButtonClicked: PropTypes.func,
  onKeyPress: PropTypes.func,
  t: PropTypes.func.isRequired,
  onSearchTextBoxFocused: PropTypes.func,
  onSearchTextBoxBlured: PropTypes.func,
};

export default SearchInputComponent;
