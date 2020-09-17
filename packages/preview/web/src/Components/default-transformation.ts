import ContentStateTransformation from '../RuleEngine/ContentStateTransformation';

const galleryStyle = {
  galleryLayout: 2,
  gallerySizeType: 'px',
  gallerySizePx: 300,
  galleryMargin: 0,
  oneRow: false,
  cubeRatio: 1,
  galleryThumbnailsAlignment: 'bottom',
  isVertical: false,
  imageMargin: 20,
  thumbnailSpacings: 0,
  cubeType: 'fill',
  enableInfiniteScroll: true,
  titlePlacement: 'SHOW_ON_HOVER',
  allowHover: false,
  itemClick: 'link',
  fullscreen: false,
  showArrows: false,
  gridStyle: 1,
  loveButton: false,
  allowSocial: false,
  allowDownload: false,
  mobileSwipeAnimation: 'NO_EFFECT',
  thumbnailSize: 120,
  gotStyleParams: true,
  showVideoPlayButton: false,
  videoPlay: 'auto',
  numberOfImagesPerRow: 2,
};

const showReadMore = ({ media: { singleMediaItems } }) => singleMediaItems.length < 2;

const showFullPost = ({ media: { singleMediaItems }, textFragments, nonMediaPluginsCount }) =>
  (textFragments.length > 1 && singleMediaItems.length === 0) || nonMediaPluginsCount > 0;

export const defaultTransformation = new ContentStateTransformation({
  _if: metadata => metadata.allText.length > 0,
  _then: (metadata, preview) => {
    const {
      textFragments,
      nonMediaPluginsCount,
      media: { singleMediaItems, galleryItems },
    } = metadata;
    const showToggle =
      showReadMore(metadata) &&
      !showFullPost(metadata) &&
      nonMediaPluginsCount === 0 &&
      textFragments.length === 1;
    const previewToDisplay = preview.plain(textFragments[0]).readMore({ lines: 3, showToggle });
    if (
      (showReadMore(metadata) &&
        showFullPost(metadata) &&
        !(singleMediaItems.length > 0 && nonMediaPluginsCount > 0)) ||
      (singleMediaItems.length === 0 && galleryItems.length > 0)
    )
      return previewToDisplay.seeFullPost();
    return previewToDisplay;
  },
})
  .rule({
    _if: metadata => metadata.media.singleMediaItems.length === 1,
    _then: (metadata, preview) => {
      const {
        media: { galleryItems, singleMediaItems },
      } = metadata;
      const mediaInfo = singleMediaItems[0];
      const previewToDisplay = preview[mediaInfo.type]({ mediaInfo });
      if (showFullPost(metadata) || metadata.textFragments.length > 1 || galleryItems.length > 0)
        return previewToDisplay.seeFullPost();
      return previewToDisplay;
    },
  })
  .rule({
    _if: metadata =>
      metadata.media.singleMediaItems.length > 1 && metadata.media.singleMediaItems.length <= 4,
    _then: ({ media: { galleryItems, singleMediaItems, totalCount } }, preview) => {
      const gallery = preview
        .gallery({
          mediaInfo: singleMediaItems.slice(0, 4),
          config: {
            size: 'small',
          },
          overrides: {
            styles: galleryStyle,
          },
        })
        .seeFullPost();
      if (galleryItems.length > 0)
        return gallery.imageCounter({ counter: totalCount - singleMediaItems.length });
      return gallery;
    },
  })
  .rule({
    _if: metadata => metadata.media.singleMediaItems.length > 4,
    _then: ({ media: { singleMediaItems, totalCount } }, preview) =>
      preview
        .gallery({
          mediaInfo: singleMediaItems.slice(0, 4),
          config: {
            size: 'small',
          },
          overrides: {
            styles: galleryStyle,
          },
        })
        .imageCounter({ counter: totalCount - 4 })
        .seeFullPost(),
  });
