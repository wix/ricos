import { Node_Type, RichContent, Node, Common_TextAlignment } from 'ricos-schema';
import { genKey } from '../migrateSchema/generateRandomKey';
import { Version } from '../version';
import { createTimestamp } from '../migrateSchema/createTimestamp';

export const fromPlainText = (text: string): RichContent => {
  const paragraphs = text.split('\n').map(
    (paragraph: string): Node => ({
      type: Node_Type.PARAGRAPH,
      key: genKey(),
      nodes: paragraph
        ? [
            {
              type: Node_Type.TEXT,
              key: genKey(),
              nodes: [],
              textData: {
                text: paragraph,
                decorations: [],
              },
            },
          ]
        : [],
      paragraphData: {
        textAlignment: Common_TextAlignment.LEFT,
      },
    })
  );

  const content: RichContent = {
    nodes: paragraphs,
    metadata: {
      createdVersion: Version.currentVersion,
      updatedVersion: Version.currentVersion,
      updatedDate: createTimestamp(),
    },
  };

  return RichContent.toJSON(RichContent.fromJSON(content)) as RichContent;
};
