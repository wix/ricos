import React, { Component } from 'react';
import { SEARCH_TYPE, giphyApiClient, PAGE_SIZE } from '../constants';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/giphy-api.scss';
import MDSpinner from 'react-md-spinner';

class GiphyApi extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;
    this.state = {
      url: componentData.src || '',
      isLoaded: false,
      hasMoreItems: true,
      gifs: [],
      page: 0
    };
  }

  getGifs = (searchTag, page) => {
    if (searchTag) {
      giphyApiClient
        .search(SEARCH_TYPE, { q: searchTag, offset: page * PAGE_SIZE, limit: PAGE_SIZE })
        .then(response => {
          if (page > 1) {
            this.setState({ gifs: this.state.gifs.concat(response.data), hasMoreItems: true, page: this.state.page + 1 });
          } else {
            this.setState({
              gifs: response.data, hasMoreItems: true, page: this.state.page + 1
            });
          }
        });
    } else {
      giphyApiClient
        .trending(SEARCH_TYPE, { limit: 100 })
        .then(response => {
          this.setState({ gifs: response.data, hasMoreItems: false });
        });
    }
  };

  getMoreGifs = () => {
    const searchTag = this.props.searchTag;
    this.getGifs(searchTag, this.state.page);
  };

  onClick = gif => {
    const gifObj = gif.images.original;
    const { componentData, helpers, pubsub, onConfirm, onCloseRequested } = this.props;
    if (onConfirm) {
      onConfirm({ ...componentData, gif: gifObj });
    } else {
      pubsub.update('componentData', { gif: gifObj });
    }

    if (helpers) {
      helpers.openModal(data => pubsub.update('componentData', { metadata: { ...data } }));
    }

    onCloseRequested();
  };

  handleKeyPress = e => {
    if (e.charCode === 27) {
      this.onClick();
    }
  };

  componentWillReceiveProps(nextProps) {
    this.getGifs(nextProps.searchTag, 0);
  }

  render() {
    const loader = <div className={styles.spinner}> <MDSpinner singleColor="#000000" /></div>;
    const trending = (!this.props.searchTag) ? 'Trending' : null;
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.trending}>{trending}</div>
          <div className={styles.powerdByGiphy}>Powerd by giphy</div>
        </div>
        <InfiniteScroll
          className={styles.infinite_scroll}
          pageStart={0}
          loadMore={this.getMoreGifs.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={loader}
          useWindow={false}
        >
          {this.state.gifs.map((gif, i) => {
            return (
              <div
                key={gif.id.toString() + i}
                role="button"
                tabIndex="0"
                className={styles.gif_img}
                onKeyPress={this.handleKeyPress}
                onClick={() => this.onClick(gif)}
              >
                <img src={gif.images.fixed_width_downsampled.gif_url} alt={'gif'} />
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    );
  }
}

GiphyApi.propTypes = {
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  searchTag: PropTypes.string,
  gifs: PropTypes.array,
  onCloseRequested: PropTypes.func,
  onConfirm: PropTypes.func
};

export default GiphyApi;
