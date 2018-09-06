import PropTypes from 'prop-types';
import React, { Component } from 'react';
//import classNames from 'classnames';
import { mergeStyles, TextInput } from 'wix-rich-content-common';
import styles from '../../statics/styles/giphy-api-input-modal.scss';
import Picker from 'react-giphy-component'
//import InfiniteScroll from 'react-infinite-scroller';
//import { SEARCH_TYPE, GIPHY_API_KEY } from '../constants';

export default class GiphyApiInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { componentData } = this.props;
    this.state = {
      searchText: '',
      gifs: [],
      url: componentData.src || '',
      isLoaded: false
    };
  }

  // getGifs = searchText => {
  //   const client = gphApiClient(GIPHY_API_KEY);
  //   client
  //     .search(SEARCH_TYPE, { q: searchText })
  //     .then(response => {
  //       this.setState({ gifs: response.data, isLoaded: true });
  //       //return response.data;
  //     });

  // };
  log(gif) {
    console.log(gif);
    const url = gif.original.url;
    const { componentData, helpers, pubsub, onConfirm } = this.props;
    if (onConfirm) {
      onConfirm({ ...componentData, src: url });
    } else {
      pubsub.update('componentData', { src: url });
    }

    if (helpers ) {
     helpers.openModal(data => pubsub.update('componentData', { metadata: { ...data } }));
      console.log(helpers);
    }

    this.onCloseRequested();
  }

  componentDidMount() {
    //this.getGifs('dogs');
  }

  onChange = e => {
    //const { url } = this.state.url;
    this.setState({ searchText: e.target.value });
    //this.getGifs(this.state.searchText);
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

  onClick = () => {
    // read div's url and store it into component data url
  };

  render() {
    //const { url } = this.state.url;
    const { styles } = this;
    //const gifs = this.state.gifs;
    //const { t } = this.props;
    //console.log(gifs);
    return (

      <div className={styles.container} data-hook="giphyUploadModal">
        {/* <div className={styles.giphyUrlInputModal_textInput}>
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
        </div> */}
        <Picker onSelected={this.log.bind(this)} />
        { /* Map the gifs into divs with onClick event */}
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
