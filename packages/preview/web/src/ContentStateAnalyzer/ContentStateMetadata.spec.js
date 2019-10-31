import { contentState } from '../tests/contentState.js';
import uut from './ContentStateMetadata';

const metadata = uut(contentState);
/*eslint-disable max-len*/
describe('content state text metadata', () => {
  it('should return all the text', () => {
    expect(metadata.text()).toEqual([
      'the first block plain text',
      'plain text with\nsoft new line',
      'plain text with inline styles',
      'plain text aligned to right',
      'plain text with link',
      'טקסט בעברית',
      'по-русски',
      'ordered list item 1',
      'ordered list item 2',
      'ordered list item 3',
      'unordered list item 1',
      'unordered list item 2',
      'unordered list item 3',
      'Long text block: Rick and Morty is a fascinating show. Boiled down to its most fundamental roots, it’s simply a well-plotted, zany, sci-fi comedy. Still, its impact on viewers can’t be overstated, both for fans who see it as a philosophical reference point (and for those who use it as an excuse monstrous behavior). What about this seemingly innocent Adult Swim cartoon drives people so wild? Brilliant writing and content are a big part of it. Even the most innocuous moment can mean the world on Rick and Morty, giving the series a wildcard edge that sets it apart from the rest modern television. No one has partnered fart jokes with careful looks into the human soul like Dan Harmon and Justin Roiland and their toxic love letter to the human heart. Lost? Watch Rick and Morty. But if you’re curious about the best moments from the cartoon that launched a million catchphrases, you are in luck. Here are the best Rick and Morty quotes. For longtime fans, consider it a chance to revisit the best moments from the series (and a good reminder of just how much Rick garbles his lines). For new fans, it’s a taste of what you’ve been missing. As for folks who have tried but never found a connection with the show, we hear The Good Place is on Netflix and is worth your time. Let’s get started.',
      'const codeBlock = this;',
      'Listen, Jerry, I don’t want to overstep my bounds or  anything. It’s your house. It’s your world. You’re a real Julius Caesar,  but I’ll tell you some, tell you how-how I feel about school, Jerry.  It’s a waste of time, a bunch of people running around, bumping into  each other. G-guy up front says, “two plus two.” The people in the back  say, “four.” Then the bell rings, and they give you a carton of milk and  a piece of paper that says you can take a dump or something. I mean,  it’s—it’s not a place for smart people, Jerry, and I know that’s not a  popular opinion, but it’s my two cents on the issue.',
      'heading1',
      'heading2',
      'heading3',
      'heading4',
      'heading5',
      'heading6',
      'block that contains a #hashtag',
      '@Test One mention',
      'block with line spacing 3',
    ]);
  });

  it('should return the plain text', () => {
    expect(metadata.text.plain()).toEqual([
      ['the first block plain text'],
      ['plain text with\nsoft new line', 'plain text with inline styles'],
      ['plain text aligned to right', 'plain text with link', 'טקסט בעברית', 'по-русски'],
      [
        'Long text block: Rick and Morty is a fascinating show. Boiled down to its most fundamental roots, it’s simply a well-plotted, zany, sci-fi comedy. Still, its impact on viewers can’t be overstated, both for fans who see it as a philosophical reference point (and for those who use it as an excuse monstrous behavior). What about this seemingly innocent Adult Swim cartoon drives people so wild? Brilliant writing and content are a big part of it. Even the most innocuous moment can mean the world on Rick and Morty, giving the series a wildcard edge that sets it apart from the rest modern television. No one has partnered fart jokes with careful looks into the human soul like Dan Harmon and Justin Roiland and their toxic love letter to the human heart. Lost? Watch Rick and Morty. But if you’re curious about the best moments from the cartoon that launched a million catchphrases, you are in luck. Here are the best Rick and Morty quotes. For longtime fans, consider it a chance to revisit the best moments from the series (and a good reminder of just how much Rick garbles his lines). For new fans, it’s a taste of what you’ve been missing. As for folks who have tried but never found a connection with the show, we hear The Good Place is on Netflix and is worth your time. Let’s get started.',
      ],
      ['block that contains a #hashtag', '@Test One mention', 'block with line spacing 3'],
    ]);
  });

  it('should return the headers text', () => {
    expect(metadata.text.h2()).toEqual(['heading2']);
    expect(metadata.text.h3()).toEqual(['heading3']);
    expect(metadata.text.h4()).toEqual(['heading4']);
    expect(metadata.text.h5()).toEqual(['heading5']);
    expect(metadata.text.h6()).toEqual(['heading6']);
  });

  it('should return the code-block text', () => {
    expect(metadata.text.code()).toEqual([['const codeBlock = this;']]);
  });

  it('should return the quote text', () => {
    expect(metadata.text.quote()).toEqual([
      'Listen, Jerry, I don’t want to overstep my bounds or  anything. It’s your house. It’s your world. You’re a real Julius Caesar,  but I’ll tell you some, tell you how-how I feel about school, Jerry.  It’s a waste of time, a bunch of people running around, bumping into  each other. G-guy up front says, “two plus two.” The people in the back  say, “four.” Then the bell rings, and they give you a carton of milk and  a piece of paper that says you can take a dump or something. I mean,  it’s—it’s not a place for smart people, Jerry, and I know that’s not a  popular opinion, but it’s my two cents on the issue.',
    ]);
  });

  it('should return ordered list text', () => {
    expect(metadata.text.ol()).toEqual([
      ['ordered list item 1', 'ordered list item 2', 'ordered list item 3'],
    ]);
  });

  it('should return unordered list text', () => {
    expect(metadata.text.ul()).toEqual([
      ['unordered list item 1', 'unordered list item 2', 'unordered list item 3'],
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
      type: 'image',
      url: 'https://media3.giphy.com/media/uL0lBBzFn98eQ/giphy.gif',
      width: 360,
    },
  ];

  it('should return all the media data', () => {
    expect(metadata.media()).toEqual(mediaData);
  });

  it('should return all the image data', () => {
    expect(metadata.media.images()).toEqual(mediaData.filter(({ type }) => type === 'image'));
  });

  it('should return all the video data', () => {
    expect(metadata.media.videos()).toEqual(mediaData.filter(({ type }) => type === 'video'));
  });

  it('should return all the file-upload data', () => {
    expect(metadata.media.files()).toEqual(mediaData.filter(({ type }) => type === 'file'));
  });

  it('should return all the maps data', () => {
    expect(metadata.media.maps()).toEqual(mediaData.filter(({ type }) => type === 'map'));
  });
});
