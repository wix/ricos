import { contentState } from './tests/contentState.js';
import uut from './ContentStateMetadata';

describe('content state text metadata', () => {
  const metadata = uut(contentState);

  it('should return all the text', () => {
    /*eslint-disable*/
    expect(metadata.text()).toEqual(`the first block plain textplain text with\nsoft new lineplain text with inline stylesplain text aligned to rightplain text with linkטקסט בעבריתпо-русскиordered list item 1ordered list item 2ordered list item 3unordered list item 1unordered list item 2unordered list item 3Long text block: Rick and Morty is a fascinating show. Boiled down to its most fundamental roots, it’s simply a well-plotted, zany, sci-fi comedy. Still, its impact on viewers can’t be overstated, both for fans who see it as a philosophical reference point (and for those who use it as an excuse monstrous behavior). What about this seemingly innocent Adult Swim cartoon drives people so wild? Brilliant writing and content are a big part of it. Even the most innocuous moment can mean the world on Rick and Morty, giving the series a wildcard edge that sets it apart from the rest modern television. No one has partnered fart jokes with careful looks into the human soul like Dan Harmon and Justin Roiland and their toxic love letter to the human heart. Lost? Watch Rick and Morty. But if you’re curious about the best moments from the cartoon that launched a million catchphrases, you are in luck. Here are the best Rick and Morty quotes. For longtime fans, consider it a chance to revisit the best moments from the series (and a good reminder of just how much Rick garbles his lines). For new fans, it’s a taste of what you’ve been missing. As for folks who have tried but never found a connection with the show, we hear The Good Place is on Netflix and is worth your time. Let’s get started.const codeBlock = this;Listen, Jerry, I don’t want to overstep my bounds or  anything. It’s your house. It’s your world. You’re a real Julius Caesar,  but I’ll tell you some, tell you how-how I feel about school, Jerry.  It’s a waste of time, a bunch of people running around, bumping into  each other. G-guy up front says, “two plus two.” The people in the back  say, “four.” Then the bell rings, and they give you a carton of milk and  a piece of paper that says you can take a dump or something. I mean,  it’s—it’s not a place for smart people, Jerry, and I know that’s not a  popular opinion, but it’s my two cents on the issue.heading2heading3heading4heading5heading6block that contains a #hashtag@Test One mentionblock with line spacing 3`);
  });

  it('should return all the text as array', () => {
    expect(metadata.text.array()).toEqual([
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
    expect(metadata.text.plain()).toEqual('the first block plain textplain text with\nsoft new lineplain text with inline stylesplain text aligned to rightplain text with linkטקסט בעבריתпо-русскиLong text block: Rick and Morty is a fascinating show. Boiled down to its most fundamental roots, it’s simply a well-plotted, zany, sci-fi comedy. Still, its impact on viewers can’t be overstated, both for fans who see it as a philosophical reference point (and for those who use it as an excuse monstrous behavior). What about this seemingly innocent Adult Swim cartoon drives people so wild? Brilliant writing and content are a big part of it. Even the most innocuous moment can mean the world on Rick and Morty, giving the series a wildcard edge that sets it apart from the rest modern television. No one has partnered fart jokes with careful looks into the human soul like Dan Harmon and Justin Roiland and their toxic love letter to the human heart. Lost? Watch Rick and Morty. But if you’re curious about the best moments from the cartoon that launched a million catchphrases, you are in luck. Here are the best Rick and Morty quotes. For longtime fans, consider it a chance to revisit the best moments from the series (and a good reminder of just how much Rick garbles his lines). For new fans, it’s a taste of what you’ve been missing. As for folks who have tried but never found a connection with the show, we hear The Good Place is on Netflix and is worth your time. Let’s get started.block that contains a #hashtag@Test One mentionblock with line spacing 3');
  });

  it('should return the plain text as array', () => {
    expect(metadata.text.plain.array()).toEqual([
      'the first block plain text',
      'plain text with\nsoft new line',
      'plain text with inline styles',
      'plain text aligned to right',
      'plain text with link',
      'טקסט בעברית',
      'по-русски',
      'Long text block: Rick and Morty is a fascinating show. Boiled down to its most fundamental roots, it’s simply a well-plotted, zany, sci-fi comedy. Still, its impact on viewers can’t be overstated, both for fans who see it as a philosophical reference point (and for those who use it as an excuse monstrous behavior). What about this seemingly innocent Adult Swim cartoon drives people so wild? Brilliant writing and content are a big part of it. Even the most innocuous moment can mean the world on Rick and Morty, giving the series a wildcard edge that sets it apart from the rest modern television. No one has partnered fart jokes with careful looks into the human soul like Dan Harmon and Justin Roiland and their toxic love letter to the human heart. Lost? Watch Rick and Morty. But if you’re curious about the best moments from the cartoon that launched a million catchphrases, you are in luck. Here are the best Rick and Morty quotes. For longtime fans, consider it a chance to revisit the best moments from the series (and a good reminder of just how much Rick garbles his lines). For new fans, it’s a taste of what you’ve been missing. As for folks who have tried but never found a connection with the show, we hear The Good Place is on Netflix and is worth your time. Let’s get started.',
      'block that contains a #hashtag',
      '@Test One mention',
      'block with line spacing 3',
    ]);
  });

  it('should return the headers text', () => {
    expect(metadata.text.h2()).toEqual('heading2');
    expect(metadata.text.h3()).toEqual('heading3');
    expect(metadata.text.h4()).toEqual('heading4');
    expect(metadata.text.h5()).toEqual('heading5');
    expect(metadata.text.h6()).toEqual('heading6');
  });

  it('should return the headers text arrays', () => {
    expect(metadata.text.h2.array()).toEqual(['heading2']);
    expect(metadata.text.h3.array()).toEqual(['heading3']);
    expect(metadata.text.h4.array()).toEqual(['heading4']);
    expect(metadata.text.h5.array()).toEqual(['heading5']);
    expect(metadata.text.h6.array()).toEqual(['heading6']);
  });


  it('should return the code-block text', () => {
    expect(metadata.text.code()).toEqual(['const codeBlock = this;']);
  });

  it('should return the code-block text array', () => {
    expect(metadata.text.code.array()).toEqual([['const codeBlock = this;']]);
  });

  it('should return the quote text', () => {
    expect(metadata.text.quote()).toEqual('Listen, Jerry, I don’t want to overstep my bounds or  anything. It’s your house. It’s your world. You’re a real Julius Caesar,  but I’ll tell you some, tell you how-how I feel about school, Jerry.  It’s a waste of time, a bunch of people running around, bumping into  each other. G-guy up front says, “two plus two.” The people in the back  say, “four.” Then the bell rings, and they give you a carton of milk and  a piece of paper that says you can take a dump or something. I mean,  it’s—it’s not a place for smart people, Jerry, and I know that’s not a  popular opinion, but it’s my two cents on the issue.');
  });


  it('should return the quote text array', () => {
    expect(metadata.text.quote.array()).toEqual(['Listen, Jerry, I don’t want to overstep my bounds or  anything. It’s your house. It’s your world. You’re a real Julius Caesar,  but I’ll tell you some, tell you how-how I feel about school, Jerry.  It’s a waste of time, a bunch of people running around, bumping into  each other. G-guy up front says, “two plus two.” The people in the back  say, “four.” Then the bell rings, and they give you a carton of milk and  a piece of paper that says you can take a dump or something. I mean,  it’s—it’s not a place for smart people, Jerry, and I know that’s not a  popular opinion, but it’s my two cents on the issue.']);
  });

  it('should return ordered list texts', () => {
    expect(metadata.text.ol()).toEqual(['ordered list item 1ordered list item 2ordered list item 3']);
  });
  

  it('should return ordered list text arrays', () => {
    expect(metadata.text.ol.array()).toEqual([['ordered list item 1', 'ordered list item 2', 'ordered list item 3']]);
  });


  it('should return unordered list texts', () => {
    expect(metadata.text.ul()).toEqual(['unordered list item 1unordered list item 2unordered list item 3']);
  });
  

  it('should return unordered list text arrays', () => {
    expect(metadata.text.ul.array()).toEqual([['unordered list item 1', 'unordered list item 2', 'unordered list item 3']]);
  });
  
});

/*eslint-enable*/
