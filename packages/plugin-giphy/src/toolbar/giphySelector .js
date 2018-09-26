import React, { Component } from 'react';
import { SEARCH_TYPE, giphyApiClient, PAGE_SIZE, WAIT_INTERVAL } from '../constants';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/giphy-api.scss';
import MDSpinner from 'react-md-spinner';

class GiphySelector extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;
    this.state = {
      url: componentData.src || '',
      isLoaded: false,
      hasMoreItems: true,
      gifs: [],
      page: 0,
      didFail: false
    };
  }

  getGifs = (searchTag, page) => {
    if (searchTag) {
      giphyApiClient
        .search(SEARCH_TYPE, { q: searchTag, offset: page * PAGE_SIZE, limit: PAGE_SIZE })
        .then(response => {
          if (page > 1) {
            this.setState({ gifs: this.state.gifs.concat(response.data), hasMoreItems: true, page: this.state.page + 1, didFail: false });
          } else {
            this.setState({
              gifs: response.data, hasMoreItems: true, page: this.state.page + 1, didFail: false
            });
          }
        }).catch(() => {
          this.setState({ didFail: true, hasMoreItems: false });
        });
    } else {
      giphyApiClient
        .trending(SEARCH_TYPE, { limit: 100 })
        .then(response => {
          this.setState({ gifs: response.data, hasMoreItems: false, didFail: false });
        }).catch(() => {
          this.setState({ didFail: true, hasMoreItems: false });
        });
    }
  };

  getMoreGifs = () => {
    const searchTag = this.props.searchTag;
    this.getGifs(searchTag, this.state.page);
  };

  onClick = gif => {
    const gifObj = {
      originalUrl: gif.images.original.gif_url,
      stillUrl: gif.images.original_still.gif_url,
      height: parseInt(gif.images.original.height),
      width: parseInt(gif.images.original.width)
    };
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
    if (!this.state.didFail) {
      if (this.timer !== null) {
        clearTimeout(this.timer);
      } else {
        this.getGifs(nextProps.searchTag);
      }
      this.timer = setTimeout(() => this.getGifs(nextProps.searchTag), WAIT_INTERVAL);
    }
  }

  componentDidMount() {
    this.timer = null;
  }

  render() {
    const { t } = this.props;
    const loader = <div className={styles.spinner}> <MDSpinner singleColor="#000000" /></div>;
    const trending = (!this.props.searchTag) ? t('GiphyPlugin_Trending') : null;
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.trending}>{trending}</div>
          <div className={styles.powerdByGiphy}>Powerd by giphy</div>
        </div>
        <div className={styles.infinite_scroll_container}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.getMoreGifs.bind(this)}
            hasMore={this.state.hasMoreItems}
            loader={(!this.state.didFail) ? loader : null}
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
        {(this.state.didFail) ? <div className={styles.error_msg}> {t('GiphyPlugin_ApiErrorMsg')}</div> : null}
      </div>
    );
  }
}

GiphySelector.propTypes = {
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  searchTag: PropTypes.string,
  gifs: PropTypes.array,
  onCloseRequested: PropTypes.func,
  onConfirm: PropTypes.func,
  t: PropTypes.func
};

export default GiphySelector;
