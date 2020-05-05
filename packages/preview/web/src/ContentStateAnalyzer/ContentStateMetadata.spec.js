import { contentState } from '../tests/contentState.js';
import uut from './ContentStateMetadata';

const metadata = uut(contentState);
/*eslint-disable max-len*/
describe('content state text metadata', () => {
  it('should return all the text', () => {
    expect(metadata.allText).toEqual([
      {
        block: {
          key: '1l5jh',
          text: 'the first block plain text',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: '7ppa3',
          text: 'plain text with\nsoft new line',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: '5umtr',
          text: 'plain text with inline styles',
          type: 'unstyled',
          depth: 0,
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
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: '9jho5',
          text: 'plain text aligned to right',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {
            textAlignment: 'right',
          },
        },
        entities: {},
      },
      {
        block: {
          key: 'a7p3q',
          text: 'plain text with link',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 16,
              length: 4,
              style: 'UNDERLINE',
            },
          ],
          entityRanges: [
            {
              offset: 16,
              length: 4,
              key: '_2',
            },
          ],
          data: {},
        },
        entities: {
          _2: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'reddit.com',
              target: '_blank',
              rel: 'nofollow',
            },
          },
        },
      },
      {
        block: {
          key: '6f866',
          text: 'טקסט בעברית',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: 'lg4h',
          text: 'по-русски',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: '8k5qh',
          text: 'ordered list item 1',
          type: 'ordered-list-item',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: 'dhjjv',
          text: 'ordered list item 2',
          type: 'ordered-list-item',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: 'eqfkh',
          text: 'ordered list item 3',
          type: 'ordered-list-item',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: '5tksk',
          text: 'unordered list item 1',
          type: 'unordered-list-item',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: '8tui7',
          text: 'unordered list item 2',
          type: 'unordered-list-item',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: 'co42v',
          text: 'unordered list item 3',
          type: 'unordered-list-item',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: 'hccp',
          text:
            'Long text block: Rick and Morty is a fascinating show. Boiled down to its most fundamental roots, it’s simply a well-plotted, zany, sci-fi comedy. Still, its impact on viewers can’t be overstated, both for fans who see it as a philosophical reference point (and for those who use it as an excuse monstrous behavior). What about this seemingly innocent Adult Swim cartoon drives people so wild? Brilliant writing and content are a big part of it. Even the most innocuous moment can mean the world on Rick and Morty, giving the series a wildcard edge that sets it apart from the rest modern television. No one has partnered fart jokes with careful looks into the human soul like Dan Harmon and Justin Roiland and their toxic love letter to the human heart. Lost? Watch Rick and Morty. But if you’re curious about the best moments from the cartoon that launched a million catchphrases, you are in luck. Here are the best Rick and Morty quotes. For longtime fans, consider it a chance to revisit the best moments from the series (and a good reminder of just how much Rick garbles his lines). For new fans, it’s a taste of what you’ve been missing. As for folks who have tried but never found a connection with the show, we hear The Good Place is on Netflix and is worth your time. Let’s get started.',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: 'd03nm',
          text: 'const codeBlock = this;',
          type: 'code-block',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: 'fv24h',
          text:
            'Listen, Jerry, I don’t want to overstep my bounds or  anything. It’s your house. It’s your world. You’re a real Julius Caesar,  but I’ll tell you some, tell you how-how I feel about school, Jerry.  It’s a waste of time, a bunch of people running around, bumping into  each other. G-guy up front says, “two plus two.” The people in the back  say, “four.” Then the bell rings, and they give you a carton of milk and  a piece of paper that says you can take a dump or something. I mean,  it’s—it’s not a place for smart people, Jerry, and I know that’s not a  popular opinion, but it’s my two cents on the issue.',
          type: 'blockquote',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: 'abcd123',
          text: 'heading1',
          type: 'header-one',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: 'jbdi',
          text: 'heading2',
          type: 'header-two',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: '43okj',
          text: 'heading3',
          type: 'header-three',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: '6i6e6',
          text: 'heading4',
          type: 'header-four',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: '4sgqv',
          text: 'heading5',
          type: 'header-five',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: 'f7sum',
          text: 'heading6',
          type: 'header-six',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: 'cppg8',
          text: 'block that contains a #hashtag',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
      {
        block: {
          key: 'c1ucv',
          text: '@Test One mention',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [
            {
              offset: 0,
              length: 9,
              key: '_7',
            },
          ],
          data: {},
        },
        entities: {
          _7: {
            type: 'mention',
            mutability: 'SEGMENTED',
            data: {
              mention: {
                name: 'Test One',
                slug: 'testone',
              },
            },
          },
        },
      },
      {
        block: {
          key: '3cvh3',
          text: 'block with line spacing 3',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {
            dynamicStyles: {
              'line-height': '3',
              'padding-top': '2px',
              'padding-bottom': '3px',
            },
          },
        },
        entities: {},
      },
      {
        block: {
          key: '5r3j6',
          text: 'block with link.com',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 11,
              length: 8,
              style: 'UNDERLINE',
            },
          ],
          entityRanges: [
            {
              offset: 11,
              length: 8,
              key: '_8',
            },
          ],
          data: {
            dynamicStyles: {
              'line-height': '3',
              'padding-top': '2px',
              'padding-bottom': '3px',
            },
          },
        },
        entities: {
          _8: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'link.com',
              target: '_self',
              rel: 'noopener',
            },
          },
        },
      },
      {
        block: {
          key: 'b1md3',
          text: 'block with more links',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 11,
              length: 4,
              style: 'UNDERLINE',
            },
            {
              offset: 16,
              length: 5,
              style: 'UNDERLINE',
            },
          ],
          entityRanges: [
            {
              offset: 11,
              length: 4,
              key: '_9',
            },
            {
              offset: 16,
              length: 5,
              key: '_10',
            },
          ],
          data: {
            dynamicStyles: {
              'line-height': '3',
              'padding-top': '2px',
              'padding-bottom': '3px',
            },
          },
        },
        entities: {
          _9: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'more.com',
              target: '_blank',
              rel: 'noopener',
            },
          },
          _10: {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
              url: 'links.com',
              target: '_blank',
              rel: 'noopener',
            },
          },
        },
      },
    ]);
  });

  it('should return the plain text', () => {
    expect(metadata.plain).toEqual([
      [
        {
          block: {
            key: '1l5jh',
            text: 'the first block plain text',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
      ],
      [
        {
          block: {
            key: '7ppa3',
            text: 'plain text with\nsoft new line',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
        {
          block: {
            key: '5umtr',
            text: 'plain text with inline styles',
            type: 'unstyled',
            depth: 0,
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
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
      ],
      [
        {
          block: {
            key: '9jho5',
            text: 'plain text aligned to right',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {
              textAlignment: 'right',
            },
          },
          entities: {},
        },
        {
          block: {
            key: 'a7p3q',
            text: 'plain text with link',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 16,
                length: 4,
                style: 'UNDERLINE',
              },
            ],
            entityRanges: [
              {
                offset: 16,
                length: 4,
                key: '_2',
              },
            ],
            data: {},
          },
          entities: {
            _2: {
              type: 'LINK',
              mutability: 'MUTABLE',
              data: {
                url: 'reddit.com',
                target: '_blank',
                rel: 'nofollow',
              },
            },
          },
        },
        {
          block: {
            key: '6f866',
            text: 'טקסט בעברית',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
        {
          block: {
            key: 'lg4h',
            text: 'по-русски',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
      ],
      [
        {
          block: {
            key: 'hccp',
            text:
              'Long text block: Rick and Morty is a fascinating show. Boiled down to its most fundamental roots, it’s simply a well-plotted, zany, sci-fi comedy. Still, its impact on viewers can’t be overstated, both for fans who see it as a philosophical reference point (and for those who use it as an excuse monstrous behavior). What about this seemingly innocent Adult Swim cartoon drives people so wild? Brilliant writing and content are a big part of it. Even the most innocuous moment can mean the world on Rick and Morty, giving the series a wildcard edge that sets it apart from the rest modern television. No one has partnered fart jokes with careful looks into the human soul like Dan Harmon and Justin Roiland and their toxic love letter to the human heart. Lost? Watch Rick and Morty. But if you’re curious about the best moments from the cartoon that launched a million catchphrases, you are in luck. Here are the best Rick and Morty quotes. For longtime fans, consider it a chance to revisit the best moments from the series (and a good reminder of just how much Rick garbles his lines). For new fans, it’s a taste of what you’ve been missing. As for folks who have tried but never found a connection with the show, we hear The Good Place is on Netflix and is worth your time. Let’s get started.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
      ],
      [
        {
          block: {
            key: 'cppg8',
            text: 'block that contains a #hashtag',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
        {
          block: {
            key: 'c1ucv',
            text: '@Test One mention',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [
              {
                offset: 0,
                length: 9,
                key: '_7',
              },
            ],
            data: {},
          },
          entities: {
            _7: {
              type: 'mention',
              mutability: 'SEGMENTED',
              data: {
                mention: {
                  name: 'Test One',
                  slug: 'testone',
                },
              },
            },
          },
        },
        {
          block: {
            key: '3cvh3',
            text: 'block with line spacing 3',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {
              dynamicStyles: {
                'line-height': '3',
                'padding-top': '2px',
                'padding-bottom': '3px',
              },
            },
          },
          entities: {},
        },
        {
          block: {
            key: '5r3j6',
            text: 'block with link.com',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 11,
                length: 8,
                style: 'UNDERLINE',
              },
            ],
            entityRanges: [
              {
                offset: 11,
                length: 8,
                key: '_8',
              },
            ],
            data: {
              dynamicStyles: {
                'line-height': '3',
                'padding-top': '2px',
                'padding-bottom': '3px',
              },
            },
          },
          entities: {
            _8: {
              type: 'LINK',
              mutability: 'MUTABLE',
              data: {
                url: 'link.com',
                target: '_self',
                rel: 'noopener',
              },
            },
          },
        },
        {
          block: {
            key: 'b1md3',
            text: 'block with more links',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 11,
                length: 4,
                style: 'UNDERLINE',
              },
              {
                offset: 16,
                length: 5,
                style: 'UNDERLINE',
              },
            ],
            entityRanges: [
              {
                offset: 11,
                length: 4,
                key: '_9',
              },
              {
                offset: 16,
                length: 5,
                key: '_10',
              },
            ],
            data: {
              dynamicStyles: {
                'line-height': '3',
                'padding-top': '2px',
                'padding-bottom': '3px',
              },
            },
          },
          entities: {
            _9: {
              type: 'LINK',
              mutability: 'MUTABLE',
              data: {
                url: 'more.com',
                target: '_blank',
                rel: 'noopener',
              },
            },
            _10: {
              type: 'LINK',
              mutability: 'MUTABLE',
              data: {
                url: 'links.com',
                target: '_blank',
                rel: 'noopener',
              },
            },
          },
        },
      ],
    ]);
  });

  it('should return the headers text', () => {
    expect(metadata.h2).toEqual([
      {
        block: {
          key: 'jbdi',
          text: 'heading2',
          type: 'header-two',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
    ]);
    expect(metadata.h3).toEqual([
      {
        block: {
          key: '43okj',
          text: 'heading3',
          type: 'header-three',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
    ]);
    expect(metadata.h4).toEqual([
      {
        block: {
          key: '6i6e6',
          text: 'heading4',
          type: 'header-four',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
    ]);
    expect(metadata.h5).toEqual([
      {
        block: {
          key: '4sgqv',
          text: 'heading5',
          type: 'header-five',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
    ]);
    expect(metadata.h6).toEqual([
      {
        block: {
          key: 'f7sum',
          text: 'heading6',
          type: 'header-six',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
    ]);
  });

  it('should return the code-block text', () => {
    expect(metadata.code).toEqual([
      [
        {
          block: {
            key: 'd03nm',
            text: 'const codeBlock = this;',
            type: 'code-block',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
      ],
    ]);
  });

  it('should return the quote text', () => {
    expect(metadata.quote).toEqual([
      {
        block: {
          key: 'fv24h',
          text:
            'Listen, Jerry, I don’t want to overstep my bounds or  anything. It’s your house. It’s your world. You’re a real Julius Caesar,  but I’ll tell you some, tell you how-how I feel about school, Jerry.  It’s a waste of time, a bunch of people running around, bumping into  each other. G-guy up front says, “two plus two.” The people in the back  say, “four.” Then the bell rings, and they give you a carton of milk and  a piece of paper that says you can take a dump or something. I mean,  it’s—it’s not a place for smart people, Jerry, and I know that’s not a  popular opinion, but it’s my two cents on the issue.',
          type: 'blockquote',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        entities: {},
      },
    ]);
  });

  it('should return ordered list text', () => {
    expect(metadata.ol).toEqual([
      [
        {
          block: {
            key: '8k5qh',
            text: 'ordered list item 1',
            type: 'ordered-list-item',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
        {
          block: {
            key: 'dhjjv',
            text: 'ordered list item 2',
            type: 'ordered-list-item',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
        {
          block: {
            key: 'eqfkh',
            text: 'ordered list item 3',
            type: 'ordered-list-item',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
      ],
    ]);
  });

  it('should return unordered list text', () => {
    expect(metadata.ul).toEqual([
      [
        {
          block: {
            key: '5tksk',
            text: 'unordered list item 1',
            type: 'unordered-list-item',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
        {
          block: {
            key: '8tui7',
            text: 'unordered list item 2',
            type: 'unordered-list-item',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
        {
          block: {
            key: 'co42v',
            text: 'unordered list item 3',
            type: 'unordered-list-item',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
          entities: {},
        },
      ],
    ]);
  });
});
/*eslint-enable*/
describe('content state media metadata', () => {
  const mediaData = [
    {
      height: 1920,
      type: 'image',
      url: '8bb438_c1089eafb4ab405ba328b528e3ecc63e.jpg',
      width: 1920,
      link: { rel: 'nofollow', target: '_blank', url: 'images.com' },
      metadata: { alt: 'alt text', caption: 'image caption' },
    },
    {
      height: 2800,
      type: 'image',
      url: '8bb438_e78b371c75ce42de8719dccfc97298a4.jpg',
      id: '8bb438_e78b371c75ce42de8719dccfc97298a4.jpg',
      width: 4200,
    },
    {
      height: 1280,
      type: 'image',
      url: '8bb438_281af3d3281f4584a5a864c6c60f3a00.jpg',
      id: '8bb438_281af3d3281f4584a5a864c6c60f3a00.jpg',
      width: 1920,
    },
    {
      height: 1081,
      type: 'image',
      url: '8bb438_0795e40ac4db438a8a723ea98dbeda10.jpg',
      id: '8bb438_0795e40ac4db438a8a723ea98dbeda10.jpg',
      width: 1621,
    },
    {
      type: 'video',
      isCustom: true,
      url: 'http://mirrors.standaloneinstaller.com/video-sample/jellyfish-25-mbps-hd-hevc.mp4',
    },
    {
      mapSettings: {
        address: 'Wix HQ, Nemal Tel Aviv Street, Tel Aviv-Yafo, Israel',
        isDraggingAllowed: true,
        isMarkerShown: true,
        isStreetViewControlShown: true,
        isZoomControlShown: true,
        lat: 32.097235,
        lng: 34.77427,
        locationDisplayName: 'Wix HQ, Nemal Tel Aviv Street, Tel Aviv-Yafo, Israel',
        mode: 'roadmap',
        zoom: 18,
      },
      type: 'map',
    },
    { fileType: 'jpg', name: '[95438] 811 х 1187..jpg', type: 'file', url: '' },
    {
      height: 270,
      thumbnail: 'https://media3.giphy.com/media/uL0lBBzFn98eQ/giphy_s.gif',
      type: 'image/gif',
      source: 'static',
      url: 'https://media3.giphy.com/media/uL0lBBzFn98eQ/giphy.gif',
      width: 360,
    },
    {
      type: 'link',
      url: 'reddit.com',
    },
    {
      type: 'link',
      url: 'link.com',
    },
    {
      type: 'link',
      url: 'more.com',
    },
    {
      type: 'link',
      url: 'links.com',
    },
  ];

  it('should return all the image data', () => {
    expect(metadata.images).toEqual(mediaData.filter(({ type }) => type.includes('image')));
  });

  it('should return all the video data', () => {
    expect(metadata.videos).toEqual(mediaData.filter(({ type }) => type === 'video'));
  });

  it('should return all the file-upload data', () => {
    expect(metadata.files).toEqual(mediaData.filter(({ type }) => type === 'file'));
  });

  it('should return all the maps data', () => {
    expect(metadata.maps).toEqual(mediaData.filter(({ type }) => type === 'map'));
  });

  it('should return all the links data', () => {
    expect(metadata.links).toEqual(mediaData.filter(({ type }) => type === 'link'));
  });
});
