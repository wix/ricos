import UUT from './ContentStateBuilder';
import { contentState as expected } from '../tests/contentState';
import { butKey, but } from '../tests/test-utils.js';

/* eslint-disable max-len*/
describe('content state text builder', () => {
  it('should add a single plain text block', () => {
    const contentState = new UUT()
      .plain({
        block: expected.blocks[0],
        entities: [],
      })
      .get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[0]));
  });

  it('should add multiple plain text blocks from array', () => {
    const contentState = new UUT()
      .plain([
        {
          block: expected.blocks[0],
          entities: [],
        },
        {
          block: expected.blocks[1],
          entities: [],
        },
      ])
      .get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[0]));
    expect(butKey(contentState.blocks[1])).toEqual(butKey(expected.blocks[1]));
  });

  it('should add multiple plain text blocks by chaining', () => {
    const contentState = new UUT()
      .plain({
        block: expected.blocks[0],
        entities: [],
      })
      .plain({
        block: expected.blocks[1],
        entities: [],
      })
      .get();
    expect(butKey(contentState.blocks[0])).toEqual(butKey(expected.blocks[0]));
    expect(butKey(contentState.blocks[1])).toEqual(butKey(expected.blocks[1]));
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
    expect(contentState.entityMap[0]).toEqual(expected.entityMap[11]);
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

  it('should add a link preview to the content', () => {
    const contentState = new UUT().linkPreview({ mediaInfo: { url: 'wix.com' } }).get();
    expect(contentState.entityMap[0]).toEqual({
      type: 'wix-draft-plugin-link-preview',
      mutability: 'IMMUTABLE',
      data: {
        config: {
          alignment: 'center',
          link: {
            url: 'wix.com',
          },
          size: 'content',
        },
      },
    });
  });
});

describe('content state interactions', () => {
  it('should chain content methods with readMore interaction', () => {
    const contentState = new UUT()
      .plain({
        block: expected.blocks[0],
        entities: [],
      })
      .readMore({ lines: 5 })
      .plain({
        block: expected.blocks[1],
        entities: [],
      })
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
      .plain({
        block: expected.blocks[0],
        entities: [],
      })
      .seeFullPost({ label: 'See full post' })
      .plain({
        block: expected.blocks[1],
        entities: [],
      })
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
      .plain({
        block: expected.blocks[1],
        entities: [],
      })
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
