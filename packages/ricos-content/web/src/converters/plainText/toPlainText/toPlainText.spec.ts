import complexContent from '../../../../../../../e2e/tests/fixtures/migration-content.json';
import { PLAIN_TEXT } from './complexPlainText';
import { toPlainText } from './toPlainText';

describe('convert to plain text', () => {
  it('should convert complex content', async () => {
    const plainText = await toPlainText(complexContent);
    expect(plainText).toEqual(PLAIN_TEXT);
  });
});
