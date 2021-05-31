import { cloneDeep } from 'lodash';
import { modify } from './modify';
import { Node_Type, RichContent } from 'ricos-schema';
import rawContent from '../../statics/json/migratedFixtures/migration-content.json';

describe('Content modify', () => {
  it('Should add alt text for images', () => {
    const content = RichContent.fromJSON(rawContent);
    const expected = cloneDeep(content);
    expected.nodes.forEach(node => {
      if (node.type === Node_Type.IMAGE) {
        node.imageData = {
          ...node.imageData,
          altText: node.imageData?.altText || 'Custom alt text',
        };
      }
    });

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
    expect(actual).not.toEqual(content);
  });
});
