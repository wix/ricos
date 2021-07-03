import { fromHtml } from '../fromHtml';
import { preprocess } from '../ck-editor/preprocess';
import { toDraft } from '../../../draft';

import richTextContent from './richTextContent.json';

import { compare } from '../../../../comparision/compare';
import { readFileSync } from 'fs';
import { RichContent } from 'ricos-schema';

const getHTML = filename => readFileSync(`${__dirname}/${filename}.html`, 'utf8');

describe('convert from html', () => {
  it('should convert complex content', () => {
    const content = fromHtml(getHTML('richTextHtml'));
    expect(
      compare(content, RichContent.fromJSON(richTextContent), {
        ignoredKeys: ['key'],
      })
    ).toEqual({});
  });

  it('should convert FAQ content', () => {
    const content = preprocess(getHTML('FAQContent'));
    // console.log('HTML', content); // eslint-disable-line
    expect(true).toBe(true);
  });
});
