import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import MDSpinner from 'react-md-spinner';
import Scrollbars from 'react-custom-scrollbars';
import { mergeStyles, isVideoUrl } from 'wix-rich-content-common';
import VideoComponent from './video-component';
import { YOUTUBE_URL, YOUTUBE_V3_API_LINK } from '../constants';
import styles from '../../statics/styles/video-list.scss';

class VideoListComponent extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.scrollbarRef = '';
    this.state = {
      videos: [],
      searchTerm: this.props.searchTerm,
      nextPageToken: '',
      loading: false,
      apiError: false,
      hasMore: true,
    };
  }

  componentDidMount = () => {
    if (this.props.googleYoutubeApiKey) {
      this.searchYoutube('', '');
    } else {
      this.setState({ loading: false, apiError: true, hasMore: true });
    }
  };

  componentDidCatch = () => {
    this.setState({ loading: false, apiError: true, hasMore: true });
  };

  componentWillReceiveProps = nextProp => {
    const { searchTerm } = this.state;
    if (searchTerm !== nextProp.searchTerm) {
      this.setState({ searchTerm: nextProp.searchTerm });
      this.scrollbarRef && this.scrollbarRef.scrollTop(0);
      this.searchYoutube(nextProp.searchTerm, '');
    }
  };

  onVideoClicked = url => {
    this.setState({ clickedVideoUrl: url });
    this.props.onItemClickedHandler(url);
  };

  loadMore = () => {
    const { searchTerm, nextPageToken } = this.state;
    if (nextPageToken && nextPageToken.length > 0) {
      setTimeout(() => {
        this.searchYoutube(searchTerm, nextPageToken);
      }, 1000);
    } else {
      return;
    }
  };

  renderResultNotFoundErrorMessage = () => {
    const { t, isMobile } = this.props;
    return (
      <div className={this.styles.youtube_video_list_error_message_container}>
        {isMobile ? (
          <div>
            <div> {t('YoutubePlugin_NoResult_ErrorMessage_1')}</div>
            <div> {t('YoutubePlugin_NoResult_ErrorMessage_2')}</div>
          </div>
        ) : (
          t('YoutubePlugin_NoResult_ErrorMessage')
        )}
      </div>
    );
  };

  searchYoutube = (term, isNextPage) => {
    const { searchTerm } = this.state;
    if (!isVideoUrl(term)) {
      !isNextPage && this.setState({ loading: true });
      let pageToken = '';
      if (isNextPage) {
        pageToken = 'pageToken=' + this.state.nextPageToken + '&';
      }

      const url = term
        ? YOUTUBE_V3_API_LINK +
          'search?part=snippet&' +
          pageToken +
          'maxResults=50&order=viewCount&q=' +
          term +
          '&type=video&videoDefinition=high&key=' +
          this.props.googleYoutubeApiKey
        : YOUTUBE_V3_API_LINK +
          'videos?part=snippet&' +
          pageToken +
          'chart=mostPopular&maxResults=50&pageToken=CDIQAA&key=' +
          this.props.googleYoutubeApiKey;
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(res => {
          const newVideos = res.items;
          let { videos } = this.state;
          videos =
            isNextPage && term === searchTerm ? [...this.state.videos, ...newVideos] : newVideos;
          this.setState({
            loading: false,
            videos,
            hasMore: true,
            nextPageToken: res.nextPageToken,
          });
          if (typeof res.nextPageToken !== 'undefined') {
            this.setState({
              hasMore: true,
              nextPageToken: res.nextPageToken,
            });
          } else {
            this.setState({
              hasMore: false,
              nextPageToken: '',
            });
          }
        })
        .catch(() => {
          setTimeout(() => {
            this.setState({ loading: false, apiError: true, hasMore: true });
          }, 1000);
        });
    }
  };

  render() {
    const { isMobile, isTextBoxFocused, searchTerm } = this.props;
    const { videos, nextPageToken, loading, apiError } = this.state;
    const noReslut = !!(videos.length === 0 && !loading);
    const hasMore = !!(nextPageToken && videos.length % 50 === 0 && searchTerm);
    const videoItems =
      videos &&
      videos.map((video, index) => {
        let videoObj = {
          publisherName: video.snippet.channelTitle,
          publishedDate: video.snippet.publishedAt,
          videoTitle: video.snippet.title,
          thumbnail: video.snippet.thumbnails.default.url,
        };
        let isClicked = false;
        if (!video.id.videoId) {
          videoObj = {
            ...videoObj,
            videoId: video.id,
          };
        } else {
          videoObj = {
            ...videoObj,
            videoId: video.id.videoId,
          };
        }
        if (YOUTUBE_URL + videoObj.videoId === this.state.clickedVideoUrl && !isTextBoxFocused) {
          isClicked = true;
        }
        return (
          <VideoComponent
            videoObj={videoObj}
            onVideoClicked={this.onVideoClicked.bind(this)}
            key={index}
            isClicked={isClicked}
            isMobile={isMobile}
            {...this.props}
          />
        );
      });
    return (
      <div>
        {apiError ? (
          this.renderResultNotFoundErrorMessage()
        ) : noReslut ? (
          this.renderResultNotFoundErrorMessage()
        ) : (
          <Scrollbars
            ref={ref => {
              this.scrollbarRef = ref;
            }}
            style={{
              height: isMobile ? 'calc(100vh - 121px)' : '277px',
              paddingRight: '0px',
              marginTop: '17px',
            }}
            renderThumbVertical={() => <div className={styles.scrollbar_thumb} />}
          >
            {/* TODO: common loader (UX) */}
            {loading ? (
              <MDSpinner
                singleColor="#000"
                size={isMobile ? 38 : 18}
                borderSize={2}
                className={this.styles.youtube_video_list_spinner_container}
              />
            ) : (
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadMore}
                hasMore={hasMore}
                loader={
                  <MDSpinner
                    singleColor="#000"
                    size={isMobile ? 38 : 18}
                    borderSize={2}
                    className={this.styles.youtube_video_list_spinner_container}
                    style={{ marginLeft: 'calc(50% - 20px)' }}
                  />
                }
                useWindow={false}
                threshold={3}
                className={this.styles.youtube_video_list_InfiniteScroll_container}
              >
                {videoItems}
              </InfiniteScroll>
            )}
          </Scrollbars>
        )}
      </div>
    );
  }
}

VideoListComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  onItemClickedHandler: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  isTextBoxFocused: PropTypes.bool,
  searchTerm: PropTypes.string.isRequired,
  t: PropTypes.func,
  googleYoutubeApiKey: PropTypes.string.isRequired,
};

export default VideoListComponent;
