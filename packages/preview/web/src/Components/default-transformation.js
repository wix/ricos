import ContentStateTransformation from '../RuleEngine/ContentStateTransformation';

export const defaultTransformation = new ContentStateTransformation({
  _if: metadata => metadata.allText.length > 0,
  _then: (metadata, preview) => {
    return preview.plain(metadata.textFragments[0]).readMore({ lines: 3 });
  },
})
  .rule({
    _if: metadata => metadata.galleryItems.length > 0 && metadata.galleryItems.length < 5,
    _then: (metadata, preview) => preview.image({ mediaInfo: metadata.images[0] }).seeFullPost(),
  })
  .rule({
    _if: metadata => metadata.galleryItems.length >= 5,
    _then: (metadata, preview) =>
      preview
        .gallery({
          mediaInfo: metadata.galleryItems.slice(0, 4),
          overrides: {
            styles: {
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
              showVideoPlayButton: true,
              videoPlay: 'auto',
              numberOfImagesPerRow: 2,
            },
          },
        })
        .imageCounter({ counter: metadata.images.length - 4 }),
  });
