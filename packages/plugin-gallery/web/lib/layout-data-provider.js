const layouts = [
  {
    showArrows: false,
    cubeImages: false,
    groupSize: 3,
    groupTypes: '1,2h,2v,3t,3b,3l,3r',
    fixedColumns: 0,
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
    enableScroll: true,
    isGrid: false,
    isSlider: false,
    isColumns: false,
    isSlideshow: false,
    isVertical: true,
    cropOnlyFill: false,
    oneRow: false,
    galleryType: 'Columns',
    imageMargin: 5,
    gallerySizePx: '300',
  }, // Collage
  {
    showArrows: false,
    cubeImages: false,
    groupSize: 1,
    groupTypes: '1',
    fixedColumns: 0,
    numberOfImagesPerRow: 0,
    imageMargin: 5,
    gallerySizePx: '300',
    gridStyle: 0,
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
    enableScroll: true,
    isGrid: false,
    isSlider: false,
    isColumns: false,
    isSlideshow: false,
    cropOnlyFill: false,
    oneRow: false,
  }, // Masonry
  {
    showArrows: false,
    cubeImages: true,
    smartCrop: false,
    imageResize: false,
    galleryImageRatio: 2,
    numberOfImagesPerRow: 3,
    imageMargin: 5,
    cubeType: 'fill',
    cubeRatio: 1,
    isVertical: true,
    galleryType: 'Columns',
    groupSize: 1,
    groupTypes: '1',
    fixedColumns: undefined,
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
    enableScroll: true,
    cropOnlyFill: false,
    isSlider: false,
    isColumns: false,
    isGrid: true,
    isSlideshow: false,
    minItemSize: 50,
    oneRow: false,
  }, // Grid
  {
    showArrows: true,
    arrowsSize: 23,
    cubeImages: true,
    smartCrop: false,
    cubeType: 'fill',
    cubeRatio: 1,
    isVertical: false,
    galleryType: 'Strips',
    groupSize: 1,
    groupTypes: '1',
    oneRow: true,
    hasThumbnails: true,
    galleryThumbnailsAlignment: 'bottom',
    enableScroll: false,
    isGrid: false,
    isSlider: false,
    isColumns: false,
    isSlideshow: false,
    cropOnlyFill: false,
    floatingImages: 0,
    thumbnailSpacings: 5,
    thumbnailSize: 120,
    galleryMargin: 0,
  }, // Thumbnails
  {
    showArrows: true,
    arrowsSize: 23,
    cubeImages: true,
    smartCrop: false,
    isVertical: false,
    galleryType: 'Strips',
    groupSize: 1,
    groupTypes: '1',
    oneRow: true,
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
    enableScroll: true,
    isGrid: false,
    isSlider: true,
    isColumns: false,
    isSlideshow: false,
    cropOnlyFill: true,
    imageMargin: 5,
    cubeType: 'fit',
    cubeRatio: '16/9',
  }, // Slider
  {
    showArrows: true,
    arrowsSize: 23,
    cubeImages: true,
    smartCrop: false,
    cubeRatio: 1,
    cubeType: 'fit',
    isVertical: false,
    galleryType: 'Strips',
    groupSize: 1,
    groupTypes: '1',
    fixedColumns: 1,
    oneRow: true,
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
    enableScroll: false,
    isGrid: false,
    isColumns: false,
    isSlider: false,
    isSlideshow: true,
    cropOnlyFill: false,
    floatingImages: 0,
    galleryMargin: 0,
    imageMargin: 0,
    slideShowInfoSize: 0,
  }, // Slideshow
  {
    showArrows: false,
    cubeImages: false,
    isVertical: true,
    galleryType: 'Columns',
    groupSize: 1,
    groupTypes: '1',
    oneRow: false,
    fixedColumns: 1,
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
    enableScroll: true,
    isGrid: false,
    isColumns: false,
    isSlider: false,
    isSlideshow: false,
    cropOnlyFill: false,
    imageMargin: 5,
  }, // Panorama
  {
    showArrows: true,
    arrowsSize: 23,
    cubeImages: true,
    smartCrop: false,
    cubeType: 'fill',
    cubeRatio: 0.35,
    isVertical: false,
    galleryType: 'Strips',
    groupSize: 1,
    groupTypes: '1',
    fixedColumns: 0,
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
    oneRow: true,
    enableScroll: true,
    isGrid: false,
    isColumns: true,
    isSlider: false,
    isSlideshow: false,
    cropOnlyFill: false,
    imageMargin: 5,
  }, // Columns
  {}, //magic layout ???
  {
    showArrows: true,
    cubeImages: true,
    smartCrop: false,
    cubeType: 'fill',
    cubeRatio: 1,
    isVertical: false,
    galleryType: 'Strips',
    groupSize: 1,
    groupTypes: '1',
    oneRow: true,
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
    enableScroll: false,
    isGrid: false,
    isSlider: false,
    isColumns: false,
    isSlideshow: false,
    cropOnlyFill: false,
    floatingImages: 0,
    galleryMargin: 0,
    imageMargin: 0,
  }, // Fullsize
];

export default layouts;
