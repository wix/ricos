import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  mergeStyles,
  TextInput,
  Button,
  isVideoUrl,
  ErrorIcon,
  isValidUrl,
} from 'wix-rich-content-common';
import styles from '../../statics/styles/search-input.scss';
import { SearchIcon, SearchCancelIcon } from './../icons';
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
      showTooltip: false,
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
    if (isValidUrl(e.target.value)) {
      this.setState({ buttonText: t('YoutubePlugin_AddButton_Text'), invalidYoutubeURL: false });
      if (!isVideoUrl(e.target.value)) {
        this.setState({ invalidYoutubeURL: true });
      }
    } else {
      this.setState({ buttonText: t('YoutubePlugin_SearchButton_Text'), invalidYoutubeURL: false });
    }
  };

  onSubmit = () => {
    const { textInputValue } = this.state;
    if (isValidUrl(textInputValue)) {
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
  onCancelClicked = () => {
    this.setState({ textInputValue: '', invalidYoutubeURL: false });
  };
  handleHover = () => {
    this.setState({ showTooltip: true });
  };
  handleHoverOff = () => {
    this.setState({ showTooltip: false });
  };

  // TODO: align with common tooltips
  renderTooptip = () => {
    return (
      <div className={this.styles.youtube_tooltip_container}>
        <div className={this.styles.youtube_tooltip}>
          {this.props.t('YoutubePlugin_Url_ErrorTooltip')}
        </div>
        <div className={this.styles.youtube_arrow_down} />
      </div>
    );
  };
  render() {
    const { t, isMobile } = this.props;
    const { invalidYoutubeURL, textInputValue, showTooltip } = this.state;
    const textInputStyles = invalidYoutubeURL && {
      borderColor: '#f64d43',
      paddingLeft: 32 + 'px',
    };
    return (
      <div className={this.styles.youtube_search_input_container}>
        {!isMobile && showTooltip && this.renderTooptip()}
        {textInputValue && (
          <div
            onKeyPress={this.handleOnKeyPressed}
            onClick={this.onCancelClicked}
            className={this.styles.youtube_cancel_search_icon}
            role="button"
            tabIndex={-1}
          >
            <SearchCancelIcon />
          </div>
        )}
        {!invalidYoutubeURL ? (
          <SearchIcon className={this.styles.youtube_search_icon_container} />
        ) : (
          <ErrorIcon
            onMouseEnter={this.handleHover}
            onMouseLeave={this.handleHoverOff}
            width={18}
            height={18}
            className={this.styles.youtube_error_icon_container}
          />
        )}
        <form
          action="#"
          onSubmit={e => {
            e.preventDefault();
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
            value={textInputValue}
            style={{ ...textInputStyles }}
            theme={this.styles}
          />
          {!isMobile && (
            <Button
              ariaProps={{ disabled: invalidYoutubeURL }}
              onClick={this.onSearchClicked}
              theme={this.styles}
              type="primary"
            >
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
  isMobile: PropTypes.bool.isRequired,
};

export default SearchInputComponent;
