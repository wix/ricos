import { toHtml } from '../toHtml';
import richTextContent from '../../fromHtml/__tests__/richTextContent.json';
import complexContent from '../../../../../statics/json/migratedFixtures/migration-content.json';
import { readFileSync } from 'fs';
import { RichContent } from 'ricos-schema';

const htmlContent = readFileSync(`${__dirname}/richContentHtml.html`, 'utf8');
const complexContentHtml = readFileSync(`${__dirname}/complexContentHtml.html`, 'utf8');

describe('convert to html', () => {
  it('should convert basic content', () => {
    const html = toHtml(RichContent.fromJSON(richTextContent));
    expect(html).toEqual(htmlContent);
  });
  it('should convert complex content', () => {
    const html = toHtml(RichContent.fromJSON(complexContent));
    expect(html).toEqual(complexContentHtml);
  });
});
