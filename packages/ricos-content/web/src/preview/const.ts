export const METHOD_BLOCK_MAP = {
  h1: 'header-one',
  h2: 'header-two',
  h3: 'header-three',
  h4: 'header-four',
  h5: 'header-five',
  h6: 'header-six',
  quote: 'blockquote',
}

export const METHOD_GROUPED_BLOCK_MAP = {
  plain: 'unstyled',
  code: 'code-block',
  ol: 'ordered-list-item',
  ul: 'unordered-list-item',
}

export const METHOD_PLUGIN_DATA_MAP = {
  image: {
    type: 'wix-draft-plugin-image',
    mutability: 'IMMUTABLE',
    data: {
      config: {
        alignment: 'center',
        size: 'content',
        showTitle: false,
        showDescription: false,
      },
    },
  },
  video: {
    type: 'wix-draft-plugin-video',
    mutability: 'IMMUTABLE',
    data: {
      config: {
        size: 'content',
        alignment: 'center',
      },
    },
  },
  gallery: {
    type: 'wix-draft-plugin-gallery',
    mutability: 'IMMUTABLE',
    data: {
      config: {
        alignment: 'center',
        size: 'content',
        layout: 'small',
        spacing: 0,
      },
      styles: {
        galleryLayout: 2,
        gallerySizeType: 'px',
        gallerySizePx: 300,
        galleryMargin: 0,
        oneRow: false,
        cubeRatio: 1,
        galleryThumbnailsAlignment: 'bottom',
        isVertical: true,
        numberOfImagesPerRow: 3,
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
        cubeImages: true,
        groupSize: 1,
        groupTypes: '1',
        hasThumbnails: false,
        enableScroll: true,
        isGrid: true,
        isSlider: false,
        isColumns: false,
        isSlideshow: false,
        cropOnlyFill: false,
        smartCrop: false,
        imageResize: false,
        galleryImageRatio: 2,
        galleryType: 'Columns',
        minItemSize: 50,
        videoPlay: 'auto',
      },
    },
  },
  soundCloud: {
    type: 'wix-draft-plugin-sound-cloud',
    mutability: 'IMMUTABLE',
    data: {
      config: {
        size: 'content',
        alignment: 'center',
      },
    },
  },
  giphy: {
    type: 'wix-draft-plugin-giphy',
    mutability: 'IMMUTABLE',
    data: {
      config: {
        size: 'content',
        alignment: 'center',
      },
    },
  },
  map: {
    type: 'wix-draft-plugin-map',
    mutability: 'IMMUTABLE',
    data: {
      config: {
        size: 'content',
        alignment: 'center',
        width: 400,
        height: 400,
      },
    },
  },
  file: {
    type: 'wix-draft-plugin-file-upload',
    mutability: 'IMMUTABLE',
    data: {
      config: {
        alignment: 'left',
        size: 'small',
      },
    },
  },
  divider: {
    type: 'wix-draft-plugin-divider',
    mutability: 'IMMUTABLE',
    data: {
      type: 'single',
      config: {
        size: 'large',
        alignment: 'center',
        textWrap: 'nowrap',
      },
    },
  },
  link: {
    type: 'LINK',
    mutability: 'IMMUTABLE',
    data: {
      config: {},
    },
  },
  linkPreview: {
    type: 'wix-draft-plugin-link-preview',
    mutability: 'IMMUTABLE',
    data: {
      config: {
        size: 'content',
        alignment: 'center',
      },
    },
  },
});

export const INTERACTIONS = {
  READ_MORE: 'READ_MORE',
  IMAGE_COUNTER: 'IMAGE_COUNTER',
  SEE_FULL_CONTENT: 'SEE_FULL_CONTENT',
});

export const type = 'PREVIEW';
