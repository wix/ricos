/* eslint-disable camelcase */
const GALLERY_LAYOUTS = Object.freeze({
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
});

const HORIZONTAL_LAYOUTS = Object.freeze([
  GALLERY_LAYOUTS.THUMBNAIL,
  GALLERY_LAYOUTS.SLIDER,
  GALLERY_LAYOUTS.SLIDESHOW,
  GALLERY_LAYOUTS.COLUMN,
  GALLERY_LAYOUTS.FULLSIZE,
]);

export const sampleItems = [1, 2, 3].map(i => {
  return {
    metadata: {
      height: 10,
      width: 10,
    },
    orderIndex: i,
    itemId: 'sampleItem-' + i,
    url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAA1JREFUCB1jePv27X8ACVkDxyMHIvwAAAAASUVORK5CYII=', //eslint-disable-line
  };
});

export const DEFAULTS = Object.freeze({
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
    showVideoPlayButton: true,
    videoPlay: 'onClick',
  },
  config: {
    alignment: 'center',
    size: 'content',
    layout: 'small',
    spacing: 0,
    disableExpand: false,
  },
});

export const imageItem = (img, itemId) => {
  return {
    metadata: {
      type: 'image',
      height: img.height,
      width: img.width,
    },
    itemId,
    url: img.src,
  };
};

export const isHorizontalLayout = ({ galleryLayout }) =>
  HORIZONTAL_LAYOUTS.indexOf(galleryLayout) > -1;

export const THEME = (colors, utils) => {
  const actionColor = utils.adaptForeground(colors.actionColor);
  return {
    //gallery-items-sortable.scss
    sortableContainer: {
      '& $itemContainer$itemContainerSelected': {
        boxShadow: `0 0 0 3px ${actionColor}`,
      },
    },
    itemContainer: {},
    itemContainerSelected: {},

    //image-ratio-selector.scss
    imageRatioSelector_tile: {
      '& $imageRatioSelector_ratioButton$imageRatioSelector_ratioButton_selected': {
        backgroundColor: actionColor,
      },
    },
    imageRatioSelector_ratioButton: {},
    imageRatioSelector_ratioButton_selected: {},

    //layout-selector.scss
    layoutsSelector_icon_selected: {
      color: actionColor,
    },

    //thumbnail-placement-selector.rtlignore.scss
    thumbnailPlacementSelector_icon_selected: {
      color: actionColor,
    },
  };
};
