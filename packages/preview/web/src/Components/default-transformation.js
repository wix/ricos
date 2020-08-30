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

const showReadMore = ({ galleryItems, textFragments }) =>
  textFragments.length === 1 && galleryItems.length < 2;

const showFullPost = ({ galleryItems, textFragments, nonMediaPluginsCount }) =>
  (textFragments.length > 1 && galleryItems.length === 0) || nonMediaPluginsCount > 0;

export const defaultTransformation = new ContentStateTransformation({
  _if: metadata => metadata.allText.length > 0,
  _then: (metadata, preview) => {
    const { textFragments, nonMediaPluginsCount, galleryItems } = metadata;
    const showToggle =
      showReadMore(metadata) && !showFullPost(metadata) && nonMediaPluginsCount === 0;
    const previewToDisplay = preview.plain(textFragments[0]).readMore({ lines: 3, showToggle });
    if (
      showReadMore(metadata) &&
      showFullPost(metadata) &&
      !(galleryItems.length > 0 && nonMediaPluginsCount > 0)
    )
      return previewToDisplay.seeFullPost();
    return previewToDisplay;
  },
})
  .rule({
    _if: metadata => metadata.galleryItems.length === 1,
    _then: (metadata, preview) => {
      const mediaInfo = metadata.galleryItems[0];
      const type = mediaInfo.type;
      const previewToDisplay = preview[type]({ mediaInfo });
      if (showFullPost(metadata) || metadata.textFragments.length > 1)
        return previewToDisplay.seeFullPost();
      return previewToDisplay;
    },
  })
  .rule({
    _if: metadata => metadata.galleryItems.length > 1 && metadata.galleryItems.length <= 4,
    _then: (metadata, preview) =>
      preview
        .gallery({
          mediaInfo: metadata.galleryItems.slice(0, 4),
          overrides: {
            styles: galleryStyle,
          },
        })
        .seeFullPost(),
  })
  .rule({
    _if: metadata => metadata.galleryItems.length > 4,
    _then: (metadata, preview) =>
      preview
        .gallery({
          mediaInfo: metadata.galleryItems.slice(0, 4),
          overrides: {
            styles: galleryStyle,
          },
        })
        .imageCounter({ counter: metadata.galleryItems.length - 4 }),
  });
