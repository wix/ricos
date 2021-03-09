import {
  ImageData,
  ImageConfig_ImageSize,
  ImageConfig_ImageAlignment,
  RichContent,
  Node_Type,
  ParagraphData,
  Common_TextAlignment,
  TextData,
  Decoration_Type,
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
    const actual = builder.addImage(imageData, { nodes: [] });
    expect(actual).toEqual(expected);
  });
  it('should add a paragraph with text to content', () => {
    const generateKey = () => 'foo';
    const builder = new RicosContentBuilder(generateKey);
    const paragraphData: ParagraphData = {
      textAlignment: Common_TextAlignment.RIGHT,
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
    const actual = builder.addParagraph('test paragraph', paragraphData, { nodes: [] });
    expect(actual).toEqual(expected);
  });

  it('should add a paragraph with TextData to content', () => {
    const generateKey = () => 'foo';
    const builder = new RicosContentBuilder(generateKey);
    const paragraphData: ParagraphData = {
      textAlignment: Common_TextAlignment.RIGHT,
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
                decorations: [{ type: Decoration_Type.BOLD }],
              },
              nodes: [],
            },
          ],
        },
      ],
    };
    const actual = builder.addParagraph(
      { text: 'test paragraph', decorations: [{ type: Decoration_Type.BOLD }] } as TextData,
      paragraphData,
      { nodes: [] }
    );
    expect(actual).toEqual(expected);
  });
});
