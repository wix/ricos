/* eslint-disable no-unused-vars */
import {
  RICOS_DIVIDER_TYPE,
  RICOS_GIPHY_TYPE,
  RICOS_HTML_TYPE,
  RICOS_GALLERY_TYPE,
  RICOS_POLL_TYPE,
  RICOS_VIDEO_TYPE,
  RICOS_FILE_TYPE,
  RICOS_IMAGE_TYPE,
  RICOS_LINK_TYPE,
  RICOS_MENTION_TYPE,
} from 'ricos-content';
import {
  DividerData,
  DividerData_DividerType,
  GiphyData,
  HTMLData,
  GalleryData,
  PollData,
  VideoData,
  FileData,
  ImageData,
  ImageConfig_ImageAlignment,
  LinkData,
  Node_Type,
  Decoration_Type,
  MentionData,
} from 'ricos-schema';

export const content = {
  blocks: [
    {
      key: 'o12',
      text: 'asdasdsa',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
  VERSION: '8.17.11',
};

export const blockKey = 'o12';

export const selection = {
  anchorKey: blockKey,
  focusKey: blockKey,
  anchorOffset: 0,
  focusOffset: 8,
};

export const selectionCollapsed = {
  anchorKey: blockKey,
  focusKey: blockKey,
  anchorOffset: 3,
  focusOffset: 3,
};

export const endOfSelection = {
  anchorKey: blockKey,
  focusKey: blockKey,
  anchorOffset: 8,
  focusOffset: 8,
};

export const mentionSelection = {
  anchorKey: blockKey,
  focusKey: blockKey,
  anchorOffset: 10,
  focusOffset: 10,
};

const divider = {
  type: RICOS_DIVIDER_TYPE,
  nodeType: Node_Type.DIVIDER,
  data: DividerData.fromJSON({
    type: DividerData_DividerType.DOUBLE,
  }),
  updatedData: DividerData.fromJSON({
    type: DividerData_DividerType.DASHED,
  }),
  expectedData: {
    type: 'double',
    config: { size: 'large', alignment: 'center', textWrap: 'nowrap' },
  },
  expectedUpdatedData: {
    type: 'dashed',
    config: { size: 'large', alignment: 'center', textWrap: 'nowrap' },
  },
};

const giphy = {
  type: RICOS_GIPHY_TYPE,
  nodeType: Node_Type.GIPHY,
  data: GiphyData.fromJSON({
    gif: {
      originalUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy.gif',
      originalMp4: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy.mp4',
      stillUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy_s.gif',
      downsizedUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy.gif',
      downsizedStillUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy_s.gif',
      downsizedSmallMp4: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy-downsized-small.mp4',
      height: 500,
      width: 500,
    },
  }),
  updatedData: GiphyData.fromJSON({
    gif: {
      originalUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy.gif',
      originalMp4: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy.mp4',
      stillUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy_s.gif',
      downsizedUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy.gif',
      downsizedStillUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy_s.gif',
      downsizedSmallMp4: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy-downsized-small.mp4',
      height: 300,
      width: 300,
    },
  }),
  expectedData: {
    config: {
      alignment: 'center',
      size: 'content',
    },
    configViewer: {
      sizes: {
        desktop: 'original',
        mobile: 'original',
      },
    },
    gif: {
      downsizedSmallMp4: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy-downsized-small.mp4',
      downsizedStillUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy_s.gif',
      downsizedUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy.gif',
      height: 500,
      originalMp4: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy.mp4',
      originalUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy.gif',
      stillUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy_s.gif',
      width: 500,
    },
  },
  expectedUpdatedData: {
    config: {
      alignment: 'center',
      size: 'content',
    },
    configViewer: {
      sizes: {
        desktop: 'original',
        mobile: 'original',
      },
    },
    gif: {
      downsizedSmallMp4: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy-downsized-small.mp4',
      downsizedStillUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy_s.gif',
      downsizedUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy.gif',
      height: 300,
      originalMp4: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy.mp4',
      originalUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy.gif',
      stillUrl: 'https://media2.giphy.com/media/wZcio4ufvvdde/giphy_s.gif',
      width: 300,
    },
  },
};

const html = {
  type: RICOS_HTML_TYPE,
  nodeType: Node_Type.HTML,
  data: HTMLData.fromJSON({ src: 'www.wix.com', srcType: 'url' }),
  updatedData: HTMLData.fromJSON({ src: 'www.sport5.co.il' }),
  expectedData: {
    config: {
      alignment: 'center',
      height: 550,
      width: 0,
    },
    src: 'www.wix.com',
    srcType: 'url',
  },
  expectedUpdatedData: {
    config: {
      alignment: 'center',
      height: 550,
      width: 0,
    },
    src: 'www.sport5.co.il',
    srcType: 'url',
  },
};

const gallery = {
  type: RICOS_GALLERY_TYPE,
  nodeType: Node_Type.HTML,
  data: GalleryData.fromJSON({
    items: [
      {
        metadata: {
          type: 'image',
          height: 3497,
          width: 5000,
        },
        itemId: 'be4312f031f9850a825b2064b9c92d72',
        url: '8bb438_a3a11b05e3f54f77ba1c04dfba22c99c.jpg',
      },
      {
        metadata: {
          type: 'image',
          height: 3733,
          width: 5600,
        },
        itemId: '682b2132c2697fb0e467e21977beeaa2',
        url: '8bb438_f89f7e8aac574a0f962437d4f369b37a.jpg',
      },
      {
        metadata: {
          type: 'image',
          height: 3727,
          width: 5600,
        },
        itemId: '0ee95e519c2e1274c30f56e3c098ec86',
        url: '8bb438_a132b18dea524d48a68a37f0075fcc1e.jpg',
      },
    ],
  }),
  updatedData: GalleryData.fromJSON({
    items: [
      {
        metadata: {
          type: 'image',
          height: 3727,
          width: 5600,
        },
        itemId: '0ee95e519c2e1274c30f56e3c098ec86',
        url: '8bb438_a132b18dea524d48a68a37f0075fcc1e.jpg',
      },
    ],
  }),
  expectedData: {
    config: {
      alignment: 'center',
      disableExpand: false,
      layout: 'small',
      size: 'content',
      spacing: 0,
    },
    items: [
      {
        itemId: 'be4312f031f9850a825b2064b9c92d72',
        metadata: {
          height: 3497,
          type: 'image',
          width: 5000,
        },
        url: '8bb438_a3a11b05e3f54f77ba1c04dfba22c99c.jpg',
      },
      {
        itemId: '682b2132c2697fb0e467e21977beeaa2',
        metadata: {
          height: 3733,
          type: 'image',
          width: 5600,
        },
        url: '8bb438_f89f7e8aac574a0f962437d4f369b37a.jpg',
      },
      {
        itemId: '0ee95e519c2e1274c30f56e3c098ec86',
        metadata: {
          height: 3727,
          type: 'image',
          width: 5600,
        },
        url: '8bb438_a132b18dea524d48a68a37f0075fcc1e.jpg',
      },
    ],
    styles: {
      allowDownload: false,
      allowHover: true,
      allowSocial: false,
      cubeRatio: 1,
      cubeType: 'fill',
      enableInfiniteScroll: true,
      fullscreen: false,
      galleryLayout: 2,
      galleryMargin: 0,
      gallerySizePx: 300,
      gallerySizeType: 'px',
      galleryThumbnailsAlignment: 'bottom',
      gotStyleParams: true,
      gridStyle: 1,
      imageMargin: 20,
      isVertical: false,
      itemClick: 'link',
      loveButton: false,
      mobileSwipeAnimation: 'NO_EFFECT',
      oneRow: false,
      showArrows: false,
      showVideoPlayButton: true,
      thumbnailSize: 120,
      thumbnailSpacings: 0,
      titlePlacement: 'SHOW_ON_HOVER',
      videoPlay: 'onClick',
    },
  },
  expectedUpdatedData: {
    config: {
      alignment: 'center',
      disableExpand: false,
      layout: 'small',
      size: 'content',
      spacing: 0,
    },
    items: [
      {
        itemId: '0ee95e519c2e1274c30f56e3c098ec86',
        metadata: {
          height: 3727,
          type: 'image',
          width: 5600,
        },
        url: '8bb438_a132b18dea524d48a68a37f0075fcc1e.jpg',
      },
    ],
    styles: {
      allowDownload: false,
      allowHover: true,
      allowSocial: false,
      cubeRatio: 1,
      cubeType: 'fill',
      enableInfiniteScroll: true,
      fullscreen: false,
      galleryLayout: 2,
      galleryMargin: 0,
      gallerySizePx: 300,
      gallerySizeType: 'px',
      galleryThumbnailsAlignment: 'bottom',
      gotStyleParams: true,
      gridStyle: 1,
      imageMargin: 20,
      isVertical: false,
      itemClick: 'link',
      loveButton: false,
      mobileSwipeAnimation: 'NO_EFFECT',
      oneRow: false,
      showArrows: false,
      showVideoPlayButton: true,
      thumbnailSize: 120,
      thumbnailSpacings: 0,
      titlePlacement: 'SHOW_ON_HOVER',
      videoPlay: 'onClick',
    },
  },
};

// TODO: check about expected data
const poll = {
  type: RICOS_POLL_TYPE,
  nodeType: Node_Type.POLL,
  data: PollData.fromJSON({
    config: { enableVoteRole: true },
    poll: {},
    design: {},
    layout: {},
  }),
  updatedData: PollData.fromJSON({
    config: { enableVoteRole: false },
    poll: {},
    design: {},
    layout: {},
  }),
  expectedData: {},
  expectedUpdatedData: {},
};

// TODO: check about expected data
const video = {
  type: RICOS_VIDEO_TYPE,
  nodeType: Node_Type.VIDEO,
  data: VideoData.fromJSON({
    url: 'https://www.youtube.com/watch?v=2iDTAGKkixE&ab_channel=QueenClub',
  }),
  updatedData: VideoData.fromJSON({
    url: 'https://www.youtube.com/watch?v=tIA_vrBDC1g&ab_channel=BoyceAvenue',
  }),
  expectedData: {},
  expectedUpdatedData: {},
};

const file = {
  type: RICOS_FILE_TYPE,
  nodeType: Node_Type.FILE,
  data: FileData.fromJSON({
    url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
    name: 'File sample',
    config: {
      size: 'small',
      alignment: 'left',
    },
  }),
  updatedData: FileData.fromJSON({
    url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
    name: 'Updated file sample',
    config: {
      size: 'content',
      alignment: 'right',
    },
  }),
  expectedData: {
    url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
    name: 'File sample',
    config: {
      size: 'small',
      alignment: 'left',
    },
    configViewer: {
      downloadTarget: '_blank',
    },
  },
  expectedUpdatedData: {
    url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
    name: 'Updated file sample',
    config: {
      size: 'content',
      alignment: 'right',
    },
    configViewer: {
      downloadTarget: '_blank',
    },
  },
};

const image = {
  type: RICOS_IMAGE_TYPE,
  nodeType: Node_Type.IMAGE,
  data: ImageData.fromJSON({
    src: {
      id: '8b72558253b2502b401bb46e5599f22a',
      originalFileName: '8bb438_1b73a6b067b24175bd087e86613bd00c.jpg',
      fileName: '8bb438_1b73a6b067b24175bd087e86613bd00c.jpg',
      width: 1920,
      height: 1000,
    },
  }),
  updatedData: ImageData.fromJSON({
    config: { alignment: ImageConfig_ImageAlignment.LEFT },
    src: {
      id: '2f64886b1998251a4a5e47d25fff5ffa',
      originalFileName: '8bb438_92b217c36c98400a82e5c59bf131d957.jpg',
      fileName: '8bb438_92b217c36c98400a82e5c59bf131d957.jpg',
      width: 1600,
      height: 1068,
    },
  }),
  expectedData: {
    config: {
      alignment: 'center',
      disableExpand: false,
      showDescription: true,
      showTitle: true,
      size: 'content',
    },
    src: {
      file_name: '8bb438_1b73a6b067b24175bd087e86613bd00c.jpg',
      height: 1000,
      id: '8b72558253b2502b401bb46e5599f22a',
      original_file_name: '8bb438_1b73a6b067b24175bd087e86613bd00c.jpg',
      width: 1920,
    },
  },
  expectedUpdatedData: {
    config: {
      alignment: 'left',
      disableExpand: false,
      showDescription: true,
      showTitle: true,
      size: 'content',
    },
    src: {
      file_name: '8bb438_92b217c36c98400a82e5c59bf131d957.jpg',
      height: 1068,
      id: '2f64886b1998251a4a5e47d25fff5ffa',
      original_file_name: '8bb438_92b217c36c98400a82e5c59bf131d957.jpg',
      width: 1600,
    },
  },
};

const link = {
  type: RICOS_LINK_TYPE,
  decorationType: Decoration_Type.LINK,
  data: LinkData.fromJSON({ url: 'www.wix.com' }),
  updatedData: LinkData.fromJSON({ url: 'www.sport5.co.il', rel: 'nofollow' }),
  expectedData: {
    url: 'www.wix.com',
    rel: 'noopener',
    target: '_self',
  },
  expectedUpdatedData: {
    url: 'www.sport5.co.il',
    rel: 'nofollow',
    target: '_self',
  },
};

const mention = {
  type: RICOS_MENTION_TYPE,
  decorationType: Decoration_Type.MENTION,
  data: { mention: MentionData.fromJSON({ name: 'aviv', slug: 'blabla' }), trigger: '@' },
  updatedData: {
    mention: MentionData.fromJSON({ name: 'chen', slug: 'blibla' }),
    trigger: '@',
  },
  expectedData: {
    mention: {
      name: 'aviv',
      slug: 'blabla',
    },
  },
  expectedUpdatedData: {
    mention: {
      name: 'chen',
      slug: 'blibla',
    },
  },
};

export const pluginsTestConfig = {
  divider,
  giphy,
  html,
  gallery,
  // poll,
  // video,
  file,
  image,
};

export const decorationsTestConfig = { link, mention };
