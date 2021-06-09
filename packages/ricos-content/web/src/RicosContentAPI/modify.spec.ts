import { modify } from './modify';
import { Node_Type, RichContent } from 'ricos-schema';
import rawContent from '../../tests/modifyFixtures/images-dividers.json';
import rawContentAltText from '../../tests/modifyFixtures/images-dividers-with-alt-text.json';
import rawContentDoubleDividers from '../../tests/modifyFixtures/images-dividers2x.json';

describe('Content modify', () => {
  it('Should add alt text for images', () => {
    const content = RichContent.fromJSON(rawContent);
    const expected = RichContent.fromJSON(rawContentAltText);

    const actual = modify(content)
      .filter(n => n.type === Node_Type.IMAGE)
      .set(n => ({
        ...n,
        imageData: {
          ...n.imageData,
          altText: n.imageData?.altText || 'Custom alt text',
        },
      }));

    expect(actual).toStrictEqual(expected);
  });

  it('Should duplicate all dividers', () => {
    const content = RichContent.fromJSON(rawContent);
    const expected = RichContent.fromJSON(rawContentDoubleDividers);

    const actual = modify(content)
      .filter(({ type }) => type === Node_Type.DIVIDER)
      .set(n => [n, n]);

    expect(actual).toEqual(expected);
  });
});
