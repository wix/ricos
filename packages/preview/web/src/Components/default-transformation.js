import ContentStateTransformation from '../RuleEngine/ContentStateTransformation';

export const defaultTransformation = new ContentStateTransformation({
  _if: metadata => metadata.text.plain().length > 0,
  _then: (metadata, preview) =>
    preview.plain(metadata.text.plain()[0].join('')).readMore({ lines: 3 }),
})
  .rule({
    _if: metadata => metadata.media.images().length > 0 && metadata.media.images().length < 5,
    _then: (metadata, preview) =>
      preview.image({ mediaInfo: metadata.media.images()[0] }).seeFullPost(),
  })
  .rule({
    _if: metadata => metadata.media.images().length >= 5,
    _then: (metadata, preview) =>
      preview
        .gallery({
          mediaInfo: metadata.media.images().slice(0, 4),
          overrides: {
            styles: {
              galleryLayout: 2,
              galleryMargin: 0,
              oneRow: false,
              cubeRatio: 1,
              cubeImages: true,
              isVertical: false,
              imageMargin: 10,
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
              gotStyleParams: true,
              numberOfImagesPerRow: 2,
            },
          },
        })
        .imageCounter({ counter: metadata.media.images().length - 4 }),
  });
