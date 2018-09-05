import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { mergeStyles, TextInput, CloseIcon } from 'wix-rich-content-common';
import styles from '../../statics/styles/giphy-api-input-modal.scss';

export default class GiphyApiInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { componentData } = this.props;
    this.state = {
      searchText: '',
      gifs: [],
      url: componentData.src || '',
    };
  }

  getGifs = (searchText) => {
    //send request and store gifs in state 
  }

  onChange = () => {
    const { url } = this.state.url;

    //update the serachText & call getGifs
    this.onCloseRequested();
    this.setState({ submitted: true });
  };

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onChange();
    }
    if (e.charCode === 27) {
      this.onCloseRequested();
    }
  };

  onClick= () => {
    // read div's url and store it into component data url
  }

  render() {
    const { url, submitted } = this.state;
    const { theme, doneLabel, cancelLabel, t } = this.props;
    const { styles } = this;

    return (
      <div className={styles.container} data-hook="giphyUploadModal">
        <div className={styles.giphyUrlInputModal_textInput}>
          <TextInput
            inputRef={ref => {
              this.input = ref;
            }}
            type="url"
            onKeyPress={this.handleKeyPress}
            onChange={this.onChange}
            value={url}
            placeholder={t('GiphyUploadModal_Input_Placeholder')}
            theme={styles}
            data-hook="giphyUploadModalInput"
          />
        </div>
        {/* Map the gifs into divs with onClick event */}
      </div>
    );
  }
}

GiphyApiInputModal.propTypes = {
  onChange: PropTypes.func,
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  url: PropTypes.string,
  searchText: PropTypes.string,
  gifs: PropTypes.array,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
};
