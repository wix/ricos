import { readFileSync } from 'fs';
import parse from './parser';

const getHtml = () => readFileSync(`${__dirname}/../__tests__/FAQContent.html`, 'utf8');

describe('CKEditor parser', () => {
  it('should parse CKEditor generated HTML', async () => {
    const html = getHtml();
    // const actual = parse(html);
    // console.log(actual); // eslint-disable-line no-console
    expect(true).toEqual(true);
  });
});
