import UUT from './ContentStateBuilder';
import { contentState as expected } from '../tests/contentState';
import { butKey, but } from '../tests/test-utils.js';

/* eslint-disable max-len*/
describe('content state text builder', () => {
  it('should add a single plain text block', () => {
    const contentState = new UUT().plain('the first block plain text').get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[0]));
  });

  it('should add multiple plain text blocks from array', () => {
    const contentState = new UUT().plain(['the first block plain text', '']).get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[0]));
    expect(butKey(contentState.blocks[1])).toEqual(butKey(expected.blocks[1]));
  });

  it('should add multiple plain text blocks by chaining', () => {
    const contentState = new UUT()
      .plain('the first block plain text')
      .plain('')
      .get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[0]));
    expect(butKey(contentState.blocks[1])).toEqual(butKey(expected.blocks[1]));
  });

  it('should correctly merge custom block config with the default one', () => {
    const config = {
      inlineStyleRanges: [
        {
          offset: 0,
          length: 5,
          style: 'BOLD',
        },
        {
          offset: 6,
          length: 4,
          style: 'ITALIC',
        },
        {
          offset: 11,
          length: 4,
          style: 'UNDERLINE',
        },
        {
          offset: 16,
          length: 6,
          style: 'color4',
        },
      ],
    };

    const contentState = new UUT().plain('plain text with inline styles', config).get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[5]));
  });

  it('should add an ordered list to the content', () => {
    const contentState = new UUT()
      .ol(['ordered list item 1', 'ordered list item 2', 'ordered list item 3'])
      .get();

    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[17]));
    expect(butKey(contentState.blocks[1])).toEqual(butKey(expected.blocks[18]));
    expect(butKey(contentState.blocks[2])).toEqual(butKey(expected.blocks[19]));
  });

  it('should add an unordered list to the content', () => {
    const contentState = new UUT()
      .ul(['unordered list item 1', 'unordered list item 2', 'unordered list item 3'])
      .get();

    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[23]));
    expect(butKey(contentState.blocks[1])).toEqual(butKey(expected.blocks[24]));
    expect(butKey(contentState.blocks[2])).toEqual(butKey(expected.blocks[25]));
  });

  it('should add a code block to the content', () => {
    const contentState = new UUT().code(['const codeBlock = this;']).get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[34]));
  });

  it('should add a quote to the content', () => {
    const quote =
      'Listen, Jerry, I don’t want to overstep my bounds or  anything. It’s your house. It’s your world. You’re a real Julius Caesar,  but I’ll tell you some, tell you how-how I feel about school, Jerry.  It’s a waste of time, a bunch of people running around, bumping into  each other. G-guy up front says, “two plus two.” The people in the back  say, “four.” Then the bell rings, and they give you a carton of milk and  a piece of paper that says you can take a dump or something. I mean,  it’s—it’s not a place for smart people, Jerry, and I know that’s not a  popular opinion, but it’s my two cents on the issue.';
    const contentState = new UUT().quote(quote).get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[35]));
  });

  it('should add headings to the content', () => {
    Object.entries({
      h1: 'heading1',
      h2: 'heading2',
      h3: 'heading3',
      h4: 'heading4',
      h5: 'heading5',
      h6: 'heading6',
    }).forEach(([method, text], idx) => {
      const contentState = new UUT()[method](text).get();
      expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[36 + idx]));
    });
  });
});

describe('content state media builder', () => {
  it('should add an image to the content', () => {
    const contentState = new UUT()
      .image({
        mediaInfo: {
          url: '8bb438_c1089eafb4ab405ba328b528e3ecc63e.jpg',
          height: 1920,
          width: 1920,
          link: { rel: 'nofollow', target: '_blank', url: 'images.com' },
          metadata: { alt: 'alt text', caption: 'image caption' },
        },
        config: {
          showDescription: true,
          showTitle: true,
          size: 'inline',
          alignment: 'center',
        },
      })
      .get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[2]));
    expect(contentState.entityMap[0]).toEqual(
      but(expected.entityMap[0], ['data.src.id', 'data.src.original_file_name'])
    );
  });

  it('should add a gallery to the content', () => {
    const contentState = new UUT()
      .gallery({
        mediaInfo: [
          {
            height: 2800,
            type: 'image',
            url: '8bb438_e78b371c75ce42de8719dccfc97298a4.jpg',
            width: 4200,
          },
          {
            height: 1280,
            type: 'image',
            url: '8bb438_281af3d3281f4584a5a864c6c60f3a00.jpg',
            width: 1920,
          },
          {
            height: 1081,
            type: 'image',
            url: '8bb438_0795e40ac4db438a8a723ea98dbeda10.jpg',
            width: 1621,
          },
        ],
        config: {
          alignment: 'center',
          layout: 'small',
          size: 'content',
          spacing: 0,
        },
      })
      .get();

    expect(contentState.entityMap[0]).toEqual(expected.entityMap[1]);
  });

  it('should add a video to the content', () => {
    const contentState = new UUT()
      .video({
        mediaInfo: {
          url: 'http://mirrors.standaloneinstaller.com/video-sample/jellyfish-25-mbps-hd-hevc.mp4',
          isCustom: true,
        },
        config: {
          size: 'content',
          alignment: 'center',
        },
      })
      .get();
    expect(contentState.entityMap[0]).toEqual(but(expected.entityMap[3], 'data.metadata'));
  });

  it('should add a giphy to the content', () => {
    const contentState = new UUT()
      .giphy({
        mediaInfo: {
          height: 270,
          thumbnail: 'https://media3.giphy.com/media/uL0lBBzFn98eQ/giphy_s.gif',
          type: 'image',
          url: 'https://media3.giphy.com/media/uL0lBBzFn98eQ/giphy.gif',
          width: 360,
        },
      })
      .get();
    expect(contentState.entityMap[0]).toEqual(expected.entityMap[8]);
  });

  it('should add a file to the content', () => {
    const contentState = new UUT()
      .file({
        mediaInfo: {
          fileType: 'jpg',
          name: '[95438] 811 х 1187..jpg',
          type: 'file',
          url: '',
        },
      })
      .get();
    expect(contentState.entityMap[0]).toEqual(expected.entityMap[6]);
  });

  it('should add a map to the content', () => {
    const contentState = new UUT()
      .map({
        mediaInfo: {
          address: 'Wix HQ, Nemal Tel Aviv Street, Tel Aviv-Yafo, Israel',
          locationDisplayName: 'Wix HQ, Nemal Tel Aviv Street, Tel Aviv-Yafo, Israel',
          lat: 32.097235,
          lng: 34.77427,
          zoom: 18,
          mode: 'roadmap',
          isMarkerShown: true,
          isZoomControlShown: true,
          isStreetViewControlShown: true,
          isDraggingAllowed: true,
        },
      })
      .get();
    expect(contentState.entityMap[0]).toEqual(expected.entityMap[5]);
  });
});

describe('content state interactions', () => {
  it('should chain content methods with readMore interaction', () => {
    const contentState = new UUT()
      .plain('the first block plain text')
      .readMore({ lines: 5 })
      .plain('')
      .get();
    const expectedBlockWithReadMoreSettings = {
      ...expected.blocks[0],
      data: {
        interactions: [
          {
            type: 'READ_MORE',
            settings: { lines: 5 },
          },
        ],
      },
    };

    expect(butKey(contentState.blocks[0])).toEqual(butKey(expectedBlockWithReadMoreSettings));
    expect(butKey(contentState.blocks[1])).toEqual(butKey(expected.blocks[1]));
  });

  it('should chain content methods with seeFullPost interaction', () => {
    const contentState = new UUT()
      .plain('the first block plain text')
      .seeFullPost({ label: 'See full post' })
      .plain('')
      .get();
    const expectedBlockWithSeeFullPostSettings = {
      ...expected.blocks[0],
      data: {
        interactions: [
          {
            type: 'SEE_FULL_CONTENT',
            settings: { label: 'See full post' },
          },
        ],
      },
    };

    expect(butKey(contentState.blocks[0])).toEqual(butKey(expectedBlockWithSeeFullPostSettings));
    expect(butKey(contentState.blocks[1])).toEqual(butKey(expected.blocks[1]));
  });

  it('should chain content methods with imageCounter interaction', () => {
    const contentState = new UUT()
      .image({
        mediaInfo: {
          url: '8bb438_c1089eafb4ab405ba328b528e3ecc63e.jpg',
          height: 1920,
          width: 1920,
          link: { rel: 'nofollow', target: '_blank', url: 'images.com' },
          metadata: { alt: 'alt text', caption: 'image caption' },
        },
        config: {
          showDescription: true,
          showTitle: true,
          size: 'inline',
          alignment: 'center',
        },
      })
      .imageCounter({ counter: 5 })
      .plain('')
      .get();
    const expectedEntityWithImageCounterSettings = {
      ...expected.entityMap[0],
      data: {
        ...expected.entityMap[0].data,
        interactions: [
          {
            type: 'IMAGE_COUNTER',
            settings: { counter: 5 },
          },
        ],
      },
    };

    expect(contentState.entityMap[0]).toEqual(
      but(expectedEntityWithImageCounterSettings, ['data.src.id', 'data.src.original_file_name'])
    );
  });
});
// eslint-enable max-len
