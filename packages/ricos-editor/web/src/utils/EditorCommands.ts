/* eslint-disable no-unused-vars */
import {
  RICOS_DIVIDER_TYPE,
  RICOS_FILE_TYPE,
  RICOS_VIDEO_TYPE,
  RICOS_POLL_TYPE,
  RICOS_GIPHY_TYPE,
  RICOS_HTML_TYPE,
} from 'ricos-content';
import { rich_content } from 'ricos-schema';

// TODO: add test to more plugins

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

const divider = {
  type: RICOS_DIVIDER_TYPE,
  data: rich_content.DividerData.create({
    type: rich_content.DividerData.DividerType.DOUBLE,
  }),
  updatedData: rich_content.DividerData.create({
    type: rich_content.DividerData.DividerType.DASHED,
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

const file = {
  type: RICOS_FILE_TYPE,
  data: rich_content.FileData.create({
    url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
    name: 'File sample',
    config: {
      size: rich_content.FileConfig.FileSize.SMALL,
      alignment: rich_content.FileConfig.FileAlignment.LEFT,
    },
  }),
  updatedData: rich_content.FileData.create({
    url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
    name: 'Updated file sample',
    config: {
      size: rich_content.FileConfig.FileSize.CONTENT,
      alignment: rich_content.FileConfig.FileAlignment.RIGHT,
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

// TODO: check about expected data
const video = {
  type: RICOS_VIDEO_TYPE,
  data: rich_content.VideoData.create({
    url: 'https://www.youtube.com/watch?v=2iDTAGKkixE&ab_channel=QueenClub',
  }),
  updatedData: rich_content.VideoData.create({
    url: 'https://www.youtube.com/watch?v=tIA_vrBDC1g&ab_channel=BoyceAvenue',
  }),
  expectedData: {},
  expectedUpdatedData: {},
};

// TODO: check about expected data
const poll = {
  type: RICOS_POLL_TYPE,
  data: rich_content.PollData.create({
    config: { enableVoteRole: true },
    poll: {},
    design: {},
    layout: {},
  }),
  updatedData: rich_content.PollData.create({
    config: { enableVoteRole: false },
    poll: {},
    design: {},
    layout: {},
  }),
  expectedData: {},
  expectedUpdatedData: {},
};

const giphy = {
  type: RICOS_GIPHY_TYPE,
  data: rich_content.GiphyData.create({
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
  updatedData: rich_content.GiphyData.create({
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
  data: rich_content.HTMLData.create({ src: 'www.wix.com', srcType: 'url' }),
  updatedData: rich_content.HTMLData.create({ src: 'www.sport5.co.il' }),
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

export const pluginsTestConfig = {
  divider,
  file,
  // video,
  // poll,
  giphy,
  html,
};
