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

export const defaultTransformation = new ContentStateTransformation({
  _if: metadata => metadata.allText.length > 0,
  _then: (metadata, preview) => {
    const showToggle = metadata.galleryItems.length === 0;
    return preview.plain(metadata.textFragments[0]).readMore({ lines: 3, showToggle });
  },
})
  .rule({
    _if: metadata => metadata.galleryItems.length === 1,
    _then: (metadata, preview) => {
      const mediaInfo = metadata.galleryItems[0];
      const type = mediaInfo.type;
      return preview[type]({ mediaInfo });
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
