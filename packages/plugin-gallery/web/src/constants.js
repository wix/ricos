const GALLERY_LAYOUTS = {
  EMPTY: -1,
  COLLAGE: 0,
  MASONRY: 1,
  GRID: 2,
  THUMBNAIL: 3,
  SLIDER: 4,
  SLIDESHOW: 5,
  PANORAMA: 6,
  COLUMN: 7,
  MAGIC: 8,
  FULLSIZE: 9,
  BRICKS: 10,
  MIX: 11,
  ALTERNATE: 12,
};

const HORIZONTAL_LAYOUTS = [
  GALLERY_LAYOUTS.THUMBNAIL,
  GALLERY_LAYOUTS.SLIDER,
  GALLERY_LAYOUTS.SLIDESHOW,
  GALLERY_LAYOUTS.COLUMN,
  GALLERY_LAYOUTS.FULLSIZE,
];

export const getDefault = () => ({
  items: [],
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
  },
  config: {
    alignment: 'center',
    size: 'content',
    layout: 'small',
    spacing: 0,
  },
});

export const isHorizontalLayout = ({ galleryLayout }) =>
  HORIZONTAL_LAYOUTS.indexOf(galleryLayout) > -1;
