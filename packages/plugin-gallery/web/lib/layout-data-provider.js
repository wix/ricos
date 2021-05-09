const layouts = [
  {
    showArrows: false,
    isVertical: true,
    oneRow: false,
    galleryType: 'Columns',
    imageMargin: 5,
    gallerySizePx: '300',
    allowHover: true,
  }, // Collage
  {
    showArrows: false,
    numberOfImagesPerRow: 0,
    imageMargin: 5,
    gallerySizePx: '300',
    gridStyle: 0,
    allowHover: true,
  }, // Masonry
  {
    showArrows: false,
    imageResize: false,
    galleryImageRatio: 2,
    numberOfImagesPerRow: 3,
    imageMargin: 5,
    cubeType: 'fill',
    cubeRatio: 1,
    isVertical: true,
    oneRow: false,
    allowHover: true,
  }, // Grid
  {
    showArrows: true,
    arrowsSize: 23,
    galleryThumbnailsAlignment: 'bottom',
    floatingImages: 0,
    thumbnailSpacings: 2.5,
    thumbnailSize: 120,
    allowHover: true,
  }, // Thumbnails
  {
    showArrows: true,
    arrowsSize: 23,
    imageMargin: 5,
    cubeType: 'fit',
    cubeRatio: '16/9',
    allowHover: true,
  }, // Slider
  {
    showArrows: true,
    arrowsSize: 23,
    cubeType: 'fit',
    floatingImages: 0,
    slideshowInfoSize: 0,
    allowHover: true,
  }, // Slideshow
  {
    showArrows: false,
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
    imageMargin: 5,
    allowHover: true,
  }, // Panorama
  {
    showArrows: true,
    arrowsSize: 23,
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
    imageMargin: 5,
    allowHover: true,
  }, // Columns
  // Unused layouts - check for support.
  {}, // Magic
  {
    showArrows: true,
    arrowsSize: 23,
    cubeType: 'fit',
    floatingImages: 0,
    slideshowInfoSize: 0,
    allowHover: true,
  }, // Fullsize
  {}, // Bricks
  {}, // Mix
  {}, // Alternate
];

export default layouts;
