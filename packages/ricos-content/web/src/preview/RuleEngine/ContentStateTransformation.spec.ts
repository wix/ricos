import { contentState } from '../tests/contentState';
import UUT from './ContentStateTransformation';
// import { butKey } from '../tests/test-utils';
/* eslint-disable max-len */
describe('Content State Transformation', () => {
  const expectedEntity = {
    data: {
      config: { alignment: 'center', layout: 'small', size: 'content', spacing: 0 },
      items: [
        {
          metadata: { height: 2800, width: 4200 },
          url: '8bb438_e78b371c75ce42de8719dccfc97298a4.jpg',
          itemId: '8bb438_e78b371c75ce42de8719dccfc97298a4.jpg',
        },
        {
          metadata: { height: 1280, width: 1920 },
          url: '8bb438_281af3d3281f4584a5a864c6c60f3a00.jpg',
          itemId: '8bb438_281af3d3281f4584a5a864c6c60f3a00.jpg',
        },
        {
          metadata: { height: 1081, width: 1621 },
          url: '8bb438_0795e40ac4db438a8a723ea98dbeda10.jpg',
          itemId: '8bb438_0795e40ac4db438a8a723ea98dbeda10.jpg',
        },
      ],
      styles: {
        allowDownload: false,
        allowHover: false,
        allowSocial: false,
        cropOnlyFill: false,
        cubeImages: true,
        cubeRatio: 1,
        cubeType: 'fill',
        enableInfiniteScroll: true,
        enableScroll: true,
        fullscreen: false,
        galleryImageRatio: 2,
        galleryLayout: 2,
        galleryMargin: 0,
        gallerySizePx: 300,
        gallerySizeType: 'px',
        galleryThumbnailsAlignment: 'bottom',
        galleryType: 'Columns',
        gotStyleParams: true,
        gridStyle: 1,
        groupSize: 1,
        groupTypes: '1',
        hasThumbnails: false,
        imageMargin: 20,
        imageResize: false,
        isColumns: false,
        isGrid: true,
        isSlider: false,
        isSlideshow: false,
        isVertical: true,
        itemClick: 'link',
        loveButton: false,
        minItemSize: 50,
        mobileSwipeAnimation: 'NO_EFFECT',
        numberOfImagesPerRow: 3,
        oneRow: false,
        showArrows: false,
        smartCrop: false,
        thumbnailSize: 120,
        thumbnailSpacings: 0,
        titlePlacement: 'SHOW_ON_HOVER',
        videoPlay: 'auto',
      },
    },
    mutability: 'IMMUTABLE',
    type: 'wix-draft-plugin-gallery',
  };
  // const expectedBlock = {
  //   text: 'the first block plain text',
  //   type: 'unstyled',
  //   depth: 0,
  //   inlineStyleRanges: [],
  //   entityRanges: [],
  //   data: {},
  // };

  it('should apply the rule "if media.galleryItems > 2 => add a gallery with 3 item" on given content state', () => {
    const transformer = new UUT({
      _if: metadata => metadata.media.galleryItems.length > 2,
      _then: (metadata, preview) =>
        preview.gallery({
          mediaInfo: metadata.media.galleryItems.slice(0, 3),
        }),
    });
    const preview = transformer.apply(contentState);
    expect(preview.entityMap[0]).toEqual(expectedEntity);
  });

  // it('should run chained rules', () => {
  //   const transformer = new UUT({
  //     _if: metadata => metadata.images.length > 3,
  //     _then: (metadata, preview) =>
  //       preview.gallery({
  //         mediaInfo: metadata.images.slice(0, 3),
  //       }),
  //   }).rule({
  //     _if: metadata => metadata.plain.length > 0,
  //     _then: (metadata, preview) => preview.plain(metadata.plain[0]),
  //   });
  //   const preview = transformer.apply(contentState);
  //   expect(butKey(preview.blocks[1])).toEqual(butKey(expectedBlock));
  //   expect(preview.entityMap[0]).toEqual(expectedEntity);
  // });
});
