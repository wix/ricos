import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import InfiniteScroll from 'react-infinite-scroller';
import MDSpinner from 'react-md-spinner';
import { Scrollbars } from 'react-custom-scrollbars';
import { SEARCH_TYPE, PAGE_SIZE, WAIT_INTERVAL } from '../constants';
import { PoweredByGiphy } from '../icons';
import GiphyEmptyState from './giphyEmptyState';
import styles from '../../statics/styles/giphy-selecter.scss';

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
      didFail: false,
    };
    this.styles = mergeStyles({ styles, theme: this.props.theme });
    const gphApiClient = require('giphy-js-sdk-core');
    this.giphySdkCore = gphApiClient(this.props.giphySdkApiKey);
  }

  getGifs = (searchTag, page) => {
    if (searchTag) {
      this.giphySdkCore
        .search(SEARCH_TYPE, { q: searchTag, offset: page * PAGE_SIZE, limit: PAGE_SIZE })
        .then(response => {
          if (page > 1) {
            this.setState({
              gifs: this.state.gifs.concat(response.data),
              hasMoreItems: true,
              page: this.state.page + 1,
              didFail: false,
            });
          } else {
            this.setState({
              gifs: response.data,
              hasMoreItems: true,
              page: this.state.page + 1,
              didFail: false,
            });
          }
        })
        .catch(() => {
          this.setState({ didFail: true, hasMoreItems: false });
        });
    } else {
      this.giphySdkCore
        .trending(SEARCH_TYPE, { limit: 100 })
        .then(response => {
          if (!searchTag) {
            this.setState({ gifs: response.data, hasMoreItems: false, didFail: false });
          }
        })
        .catch(() => {
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
      originalUrl: gif.images.original.url,
      originalMp4: gif.images.original.mp4,
      stillUrl: gif.images.original_still.url,
      downsizedUrl: gif.images.downsized.url,
      downsizedStillUrl: gif.images.downsized_still.url,
      downsizedSmallMp4: gif.images.downsized_small.mp4,
      height: parseInt(gif.images.original.height),
      width: parseInt(gif.images.original.width),
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
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => this.getGifs(nextProps.searchTag), WAIT_INTERVAL);
  }

  componentDidMount() {
    this.timer = null;
  }

  render() {
    const { styles } = this;
    const { t, searchTag } = this.props;
    const { gifs, hasMoreItems, didFail } = this.state;
    const loader = (
      <div className={styles[`giphy_selecter_spinner_${gifs.length ? 'more' : 'empty_modal'}`]}>
        <MDSpinner borderSize={1.5} singleColor="#000000" />
      </div>
    );
    return (
      <div>
        <div className={styles.giphy_selecter_infinite_scroll_container}>
          {!gifs.length && searchTag ? (
            <GiphyEmptyState t={t} />
          ) : (
            <Scrollbars
              renderThumbVertical={() => <div className={styles.giphy_selecter_scrollbarThumb} />}
              className={styles.giphy_selecter_customize_scrollbar_container}
            >
              <InfiniteScroll
                pageStart={0}
                loadMore={this.getMoreGifs.bind(this)}
                hasMore={hasMoreItems}
                loader={!this.state.didFail ? loader : null}
                useWindow={false}
                className={styles.giphy_selecter_infinite_scroll}
              >
                {gifs.map((gif, i) => {
                  return (
                    <div
                      key={i}
                      role="button"
                      tabIndex="0"
                      className={styles.giphy_selecter_gif_img_container}
                      onKeyPress={this.handleKeyPress}
                      onClick={() => this.onClick(gif)}
                    >
                      <img
                        className={styles.giphy_selecter_gif_img}
                        src={gif.images.fixed_width_downsampled.url}
                        alt={'gif'}
                      />
                    </div>
                  );
                })}
              </InfiniteScroll>
            </Scrollbars>
          )}
        </div>
        <div className={styles.giphy_selecter_container}>
          <PoweredByGiphy className={styles.giphy_selecter_powerdByGiphy} />
        </div>
        {didFail && !gifs.length ? (
          <div className={styles.giphy_selecter_error_msg}> {t('GiphyPlugin_ApiErrorMsg')}</div>
        ) : null}
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
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  giphySdkApiKey: PropTypes.string.isRequired,
};

export default GiphySelector;
