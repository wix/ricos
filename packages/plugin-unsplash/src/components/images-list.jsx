/* eslint-disable no-undef */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Unsplash from 'unsplash-js';
import InfiniteScroll from 'react-infinite-scroller';
import Gallery from 'react-photo-gallery';
import { Scrollbars } from 'react-custom-scrollbars';
import MDSpinner from 'react-md-spinner';
import { mergeStyles } from 'wix-rich-content-common';
import SelectedImage from './selected-image';
import styles from '../../statics/styles/images-list.scss';

class ImagesList extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.unsplash = new Unsplash({
      applicationId: props.applicationId || null,
      secret: props.secretKey || null,
    });
    this.state = {
      items: [],
      url: '',
      isLoaded: false,
      hasMoreItems: true,
      images: [],
      page: 0,
      didFail: false,
    };
    this.scrollbarRef = '';
    this.selectPhoto = this.selectPhoto.bind(this);
  }

  componentWillReceiveProps = nextProps => {
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }

    const { searchTerm } = this.state;
    if (searchTerm !== nextProps.searchTerm) {
      this.scrollbarRef && this.scrollbarRef.scrollTop(0);
    }

    this.timer = setTimeout(() => {
      this.searchUnsplash(nextProps.searchTerm);
      this.setState({ searchTerm: nextProps.searchTerm });
    }, 300);
  };

  selectPhoto = (event, image) => {
    this.onClick(image);
  };

  onClick = image => {
    const { componentData, helpers, pubsub, onConfirm } = this.props;
    const imageObj = {
      ...componentData.image,
      originalUrl: image.photo.full,
      height: parseInt(image.photo.height),
      width: parseInt(image.photo.width),
      username: image.photo.username,
    };
    if (onConfirm) {
      onConfirm({ ...componentData, image: imageObj });
    } else {
      pubsub.update('componentData', { image: imageObj });
    }

    if (helpers) {
      helpers.openModal(data => pubsub.update('componentData', { metadata: { ...data } }));
    }

    helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 27) {
      this.onClick();
    }
  };

  componentDidMount = () => {
    this.timer = null;
    this.searchUnsplash(this.props.searchTerm);
    this.setState({ searchTerm: this.props.searchTerm });
  };

  searchUnsplash(term, page) {
    const { applicationId, secretKey } = this.props;
    if (!applicationId || !secretKey) {
      this.setState({ didFail: true });
    } else if (term) {
      this.unsplash.search
        .photos(term, page)
        .then(Response => Response.json())
        .then(responseData => {
          if (page > 1) {
            this.setState({
              items: this.state.items.concat(responseData.results),
              hasMoreItems: true,
              page: this.state.page + 1,
              didFail: false,
            });
          } else {
            this.setState({
              items: responseData.results,
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
      this.unsplash.photos
        .listPhotos(0, 45, 'popular')
        .then(Response => Response.json())
        .then(responseData => {
          this.setState({
            items: responseData,
            hasMoreItems: false,
            page: 0,
            didFail: false,
          });
        });
    }
  }

  getMoreImages = () => {
    this.searchUnsplash(this.props.searchTerm, this.state.page);
  };

  render() {
    const { isMobile, t } = this.props;
    const { items } = this.state;
    const loader = (
      <MDSpinner
        singleColor="#000"
        size={isMobile ? 25 : 18}
        borderSize={2}
        className={this.styles.unsplash_spinner_container}
        style={{ marginLeft: isMobile ? 'calc(50% - 15px)' : 'calc(50% - 20px)' }}
      />
    );
    const photos = [];
    items.map(image => {
      return photos.push({
        src: image.urls.thumb,
        full: image.urls.full,
        width: image.width,
        height: image.height,
        username:
          image.user.first_name + ' ' + (image.user.last_name === null ? '' : image.user.last_name),
        theme: this.props.theme,
        isMobile,
      });
    });
    return (
      <div className={this.styles.unsplash_items_list_container}>
        {!this.state.didFail ? (
          <Scrollbars
            ref={ref => {
              this.scrollbarRef = ref;
            }}
            renderThumbVertical={() => <div className={this.styles.unsplash_scrollbar_thumb} />}
            autoHide
          >
            <InfiniteScroll
              pageStart={0}
              loadMore={this.getMoreImages.bind(this)}
              hasMore={this.state.hasMoreItems}
              loader={!this.state.didFail ? loader : null}
              useWindow={false}
              threshold={3}
              className={this.styles.unsplash_InfiniteScroll_container}
            >
              <Gallery
                photos={photos}
                onClick={this.selectPhoto}
                renderImage={SelectedImage}
                columns={3}
              />
            </InfiniteScroll>
          </Scrollbars>
        ) : (
          <div className={styles.unsplash_selecter_error_msg}>
            {t('UnsplashPlugin_ApiErrorMsg')}
          </div>
        )}
      </div>
    );
  }
}

ImagesList.propTypes = {
  theme: PropTypes.object.isRequired,
  searchTerm: PropTypes.string,
  componentData: PropTypes.object,
  helpers: PropTypes.object,
  pubsub: PropTypes.object,
  onConfirm: PropTypes.any,
  t: PropTypes.func,
  isMobile: PropTypes.bool.isRequired,
  applicationId: PropTypes.string.isRequired,
  secretKey: PropTypes.string.isRequired,
};

export default ImagesList;
