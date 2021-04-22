import { setupContentAPI } from './ContentAPI';
import {
  ImageData,
  PluginContainerData_Width_Type,
  PluginContainerData_Alignment,
  RichContent,
  Node_Type,
  ParagraphData,
  TextStyle_TextAlignment,
  Decoration_Type,
} from 'ricos-schema';

describe('Ricos Content API', () => {
  it('should add image node to content', () => {
    const generateKey = () => 'foo';
    const api = setupContentAPI({ generateKey });
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

  it('should update paragraph text', () => {
    const generateKey = () => 'foo';
    const api = setupContentAPI({ generateKey });
    const paragraphData: ParagraphData = {
      textStyle: {
        textAlignment: TextStyle_TextAlignment.RIGHT,
      },
    };
    const content: RichContent = {
      nodes: [
        {
          type: Node_Type.PARAGRAPH,
          key: 'foo',
          paragraphData,
          nodes: [
            {
              key: 'boo',
              type: Node_Type.TEXT,
              textData: {
                text: 'test paragraph',
                decorations: [
                  {
                    type: Decoration_Type.BOLD,
                  },
                ],
              },
              nodes: [],
            },
          ],
        },
      ],
    };

    const expected = {
      nodes: [
        {
          type: Node_Type.PARAGRAPH,
          key: 'foo',
          paragraphData,
          nodes: [
            {
              key: 'foo', // nested node keys are not preserved atm
              type: Node_Type.TEXT,
              textData: {
                text: 'updated text',
                decorations: [{ type: Decoration_Type.ITALIC }],
              },
              nodes: [],
            },
          ],
        },
      ],
    };

    const actual = api.updateParagraph({
      text: { text: 'updated text', decorations: [{ type: Decoration_Type.ITALIC }] },
      key: 'foo',
      content,
    });
    expect(actual).toEqual(expected);
  });

  it('should add a paragraph with text to content', () => {
    const generateKey = () => 'foo';
    const api = setupContentAPI({ generateKey });
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

  it('should toggle heading to paragraph node', () => {
    const generateKey = () => 'foo';
    const api = setupContentAPI({ generateKey });
    const paragraphData: ParagraphData = {
      textStyle: {
        textAlignment: TextStyle_TextAlignment.RIGHT,
      },
    };
    const content: RichContent = {
      nodes: [
        {
          type: Node_Type.PARAGRAPH,
          key: 'baz',
          paragraphData,
          nodes: [
            {
              key: 'boo',
              type: Node_Type.TEXT,
              textData: {
                text: 'text content',
                decorations: [
                  {
                    type: Decoration_Type.BOLD,
                  },
                ],
              },
              nodes: [],
            },
          ],
        },
      ],
    };

    const expected = {
      nodes: [
        {
          type: Node_Type.HEADING,
          key: 'baz',
          headingData: {
            level: 2,
            textStyle: { textAlignment: TextStyle_TextAlignment.RIGHT },
          },
          nodes: [
            {
              key: 'boo',
              type: Node_Type.TEXT,
              textData: {
                text: 'text content',
                decorations: [{ type: Decoration_Type.BOLD }],
              },
              nodes: [],
            },
          ],
        },
      ],
    };

    const actual = api.toggleHeading({
      key: 'baz',
      data: { level: 2, textStyle: { textAlignment: TextStyle_TextAlignment.RIGHT } },
      content,
    });
    expect(actual).toEqual(expected);
  });

  it('should extract all images from content', () => {
    const generateKey = () => 'foo';
    const api = setupContentAPI({ generateKey });
    const imageData: ImageData = {
      containerData: {
        width: { type: PluginContainerData_Width_Type.SMALL },
        alignment: PluginContainerData_Alignment.CENTER,
      },
    };
    const content: RichContent = {
      nodes: [
        {
          type: Node_Type.IMAGE,
          imageData,
          nodes: [],
          key: 'foo',
        },
      ],
    };

    const expected = {
      foo: imageData,
    };

    const actual = api.getImages(content);

    expect(actual).toEqual(expected);
  });
});
