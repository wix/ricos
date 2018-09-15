import React, { Component } from 'react';
import { SEARCH_TYPE, giphyApiClient } from '../constants';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/giphy-api.scss';
import Loader from 'react-loader-spinner';

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
        .search(SEARCH_TYPE, { q: searchTag, offset: page })
        .then(response => {
          if (page > 1) {
            this.setState({ gifs: this.state.gifs.concat(response.data), hasMoreItems: true, page: this.state.page + 26 });
          } else {
            this.setState({
              gifs: response.data, hasMoreItems: true, page: this.state.page + 26
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
  }

  onClick = gif => {
    const url = gif.images.original.gif_url;
    const { componentData, helpers, pubsub, onConfirm, onCloseRequested } = this.props;
    if (onConfirm) {
      onConfirm({ ...componentData, src: url });
    } else {
      pubsub.update('componentData', { src: url });
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
    const loader = <Loader type="Oval" color="#d3d3d3" height="30" width="30" />;

    return (
      <div style={{ height: '490px', overflow: 'auto' }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.getMoreGifs.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={loader}
          useWindow={false}
        >
          {this.state.gifs.map((gif, i) => {
            return (
              <div
                key={JSON.stringify(gif.id) + i}
                role="button"
                tabIndex="0"
                className={styles.gif_player}
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
  onConfirm: PropTypes.func,
};


export default GiphyApi;
