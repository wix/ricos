/* eslint-disable no-console, fp/no-loops, no-case-declarations */
import { RicosContentBlock, RicosEntityRange, RicosInlineStyleRange, RicosEntityMap } from '..';
import { isEmpty, inRange } from 'lodash';
import { Node } from './types';
import { getEntity } from './getEntity';

type Range = RicosInlineStyleRange | RicosEntityRange;
type RangeData = Pick<RicosInlineStyleRange, 'style'> | Pick<RicosEntityRange, 'key'>;

const posIsInRange = (pos: number, range?: Range): boolean =>
  !!range && inRange(pos, range.offset, range.offset + range.length);

export const getTextNodes = (block: RicosContentBlock, entityMap: RicosEntityMap): Node[] => {
  const getDecoration = (rangeData: RangeData): Node => {
    if ('key' in rangeData) {
      // rangeData is an entity range
      return getEntity(rangeData.key, entityMap);
    } else if ('style' in rangeData) {
      // rangeData is an inline style range
      let decoration: Node;
      try {
        const styleObj = JSON.parse(rangeData.style);
        decoration = {
          type: Object.keys(styleObj)[0],
          data: {
            value: Object.values(styleObj)[0],
          },
        };
      } catch {
        decoration = {
          type: rangeData.style.toLowerCase(),
        };
      }
      return decoration;
    } else {
      return rangeData;
    }
  };

  const createTextNode = ({
    text,
    blockData,
    rangeData,
  }: {
    text: string;
    blockData: RicosContentBlock['data'];
    rangeData?: RangeData;
  }): Node => {
    const textNode: Node = {
      type: 'text',
      data: {
        text,
      },
    };

    const decorations: Node[] = [];
    if (blockData && !isEmpty(blockData)) {
      decorations.push(blockData);
    }
    if (rangeData && !isEmpty(rangeData)) {
      decorations.push(getDecoration(rangeData));
    }
    if (!isEmpty(decorations)) {
      textNode.data.decorations = decorations;
    }

    return textNode;
  };

  const { text, inlineStyleRanges, entityRanges, data: blockData } = block;
  const ranges: Range[] = [...inlineStyleRanges, ...entityRanges].sort(
    (a, b) => b.offset - a.offset
  );
  const getRange = () => ranges.pop();
  let textNode: Node | null = null;
  const textNodes: Node[] = [];
  let currentPos = 0;
  let currentRange: Range | undefined = getRange();
  while (currentPos < text.length) {
    if (currentRange && posIsInRange(currentPos, currentRange)) {
      const { length, ...rangeData } = currentRange || {};
      if (textNode) {
        textNode.data.decorations.push(getDecoration(rangeData));
      } else {
        textNode = createTextNode({
          text: text.substr(currentPos, length),
          blockData,
          rangeData,
        });
      }
      currentRange = getRange();
      if (!posIsInRange(currentPos, currentRange)) {
        textNodes.push(textNode);
        currentPos += length || 0;
        textNode = null;
      }
    } else {
      const end = text.length;
      textNodes.push(
        createTextNode({
          text: text.substring(currentPos, end),
          blockData,
        })
      );
      currentPos = end;
    }
  }
  return textNodes;
};
