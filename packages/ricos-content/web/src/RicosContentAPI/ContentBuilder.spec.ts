import {
  ImageData,
  ImageConfig_ImageSize,
  ImageConfig_ImageAlignment,
  RichContent,
  Node_Type,
} from 'ricos-schema';
import { RicosContentBuilder } from './ContentBuilder';

describe('RicosContentBuilder', () => {
  it('should add image node to content', () => {
    const generateKey = () => 'foo';
    const builder = new RicosContentBuilder(generateKey);
    const imageData: ImageData = {
      config: {
        size: ImageConfig_ImageSize.SMALL,
        alignment: ImageConfig_ImageAlignment.CENTER,
      },
    };
    const expected: RichContent = {
      nodes: [
        {
          type: Node_Type.IMAGE,
          imageData,
          nodes: [],
          key: 'foo',
        },
      ],
    };
    const actual = builder.addImage(imageData);
    expect(actual).toEqual(expected);
  });
});
