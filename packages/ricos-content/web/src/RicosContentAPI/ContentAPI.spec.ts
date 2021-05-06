import { setupContentBuilder } from './RicosContentBuilder';
import {
  ImageData,
  PluginContainerData_Width_Type,
  PluginContainerData_Alignment,
  RichContent,
  Node_Type,
  ParagraphData,
  TextStyle_TextAlignment,
} from 'ricos-schema';

describe('Ricos Content Builder', () => {
  it('should add image node to content', () => {
    const generateKey = () => 'foo';
    const api = setupContentBuilder(generateKey);
    const imageData: ImageData = {
      containerData: {
        width: { type: PluginContainerData_Width_Type.SMALL },
        alignment: PluginContainerData_Alignment.CENTER,
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
    const actual = api.addImage({ data: imageData, content: { nodes: [] } });
    expect(actual).toEqual(expected);
  });

  it('should add a paragraph with text to content', () => {
    const generateKey = () => 'foo';
    const api = setupContentBuilder(generateKey);
    const paragraphData: ParagraphData = {
      textStyle: {
        textAlignment: TextStyle_TextAlignment.RIGHT,
      },
    };
    const expected: RichContent = {
      nodes: [
        {
          type: Node_Type.PARAGRAPH,
          key: 'foo',
          paragraphData,
          nodes: [
            {
              key: 'foo',
              type: Node_Type.TEXT,
              textData: {
                text: 'test paragraph',
                decorations: [],
              },
              nodes: [],
            },
          ],
        },
      ],
    };
    const actual = api.addParagraph({
      text: 'test paragraph',
      data: paragraphData,
      content: { nodes: [] },
    });
    expect(actual).toEqual(expected);
  });
});
