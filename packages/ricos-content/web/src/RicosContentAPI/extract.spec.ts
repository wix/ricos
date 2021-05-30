import { extract } from './extract';
import { RichContent } from 'ricos-schema';
import rawContent from '../../../../../e2e/tests/fixtures/text-blocks-new.json';

describe('Content extract', () => {
  it('should extract all the content text', () => {
    const text = extract(RichContent.fromJSON(rawContent))
      .map(({ textData, key }) => ({ key, textData: textData || { text: '', decorations: [] } }))
      .map(({ textData, key }) => ({ key, text: textData.text }))
      .get();
    console.dir(text); // eslint-disable-line no-console
  });
});
