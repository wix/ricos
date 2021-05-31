import { extract } from './extract';
import { RichContent, Node_Type } from 'ricos-schema';
import rawContent from '../../../../../e2e/tests/fixtures/text-blocks-new.json';

describe('Content extract', () => {
  it('should extract the bullet list texts', () => {
    const actual = extract(RichContent.fromJSON(rawContent).nodes)
      .filter(({ type }) => type === Node_Type.BULLET_LIST)
      .chain(n => extract(n).map(({ textData }) => textData?.text || ''))
      .map(extractor => extractor.get());

    const expected = [
      [
        // eslint-disable-next-line max-len
        'Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.',
        'Override the digital divide with additional clickthroughs from DevOps.',
      ],
    ];
    expect(actual).toStrictEqual(expected);
  });
});
