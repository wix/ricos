import { RichContent } from 'ricos-schema';
import complexContent from '../../draft/fromDraft/migratedFixtures/migration-content.json';
import { PLAIN_TEXT } from './complexPlainText';
import { toPlainText } from './toPlainText';

describe('convert to plain text', () => {
  it('should convert complex content', async () => {
    const plainText = await toPlainText(complexContent as RichContent);
    expect(plainText).toEqual(PLAIN_TEXT);
  });

  it('should convert complex content with delimiter', async () => {
    const plainText = await toPlainText(complexContent as RichContent, { delimiter: ' ' });
    expect(plainText).toEqual(PLAIN_TEXT.replace(/\n/g, ' '));
  });
});
