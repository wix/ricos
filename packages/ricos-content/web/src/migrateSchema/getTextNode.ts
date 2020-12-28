/* eslint-disable no-console, fp/no-loops, no-case-declarations */
import { RicosContentBlock, RicosEntityRange, RicosInlineStyleRange, RicosEntityMap } from '..';
import { RicosNode, RicosDecoration } from 'ricos-schema';
import { NodeType } from './consts';

import { isEmpty, inRange } from 'lodash';
import { getEntity } from './getEntity';
import { genKey } from 'draft-js';

type Range = RicosInlineStyleRange | RicosEntityRange;
type RangeData = Pick<RicosInlineStyleRange, 'style'> | Pick<RicosEntityRange, 'key'>;

const posIsInRange = (pos: number, range?: Range): boolean =>
  !!range && inRange(pos, range.offset, range.offset + range.length);

export const getTextNodes = (
  block: RicosContentBlock,
  entityMap: RicosEntityMap,
  keyMapping: Record<string, string>
): RicosNode[] => {
  const createTextNode = ({
    text,
    blockData,
    rangeData,
  }: {
    text: string;
    blockData: RicosContentBlock['data'];
    rangeData?: RangeData;
  }): RicosNode => {
    const textNode: RicosNode = {
      key: genKey(),
      type: NodeType.Text,
      nodes: [],
      ricosText: {
        text,
        decorations: [],
      },
    };

    const decorations: RicosDecoration[] = [];
    if (blockData && !isEmpty(blockData)) {
      if (blockData.textAlignment) {
        decorations.push({
          type: 'ricos-alignment',
          ricosAlignment: { direction: blockData.textAlignment },
        });
      }
    }
    if (rangeData && !isEmpty(rangeData)) {
      decorations.push(getDecoration(rangeData));
    }
    if (!isEmpty(decorations) && textNode.ricosText) {
      textNode.ricosText.decorations = decorations;
    }

    return textNode;
  };

  const getDecoration = (rangeData: RangeData): RicosDecoration => {
    if ('key' in rangeData) {
      // rangeData is an entity range
      return getEntity(rangeData.key, entityMap, keyMapping);
    } else if ('style' in rangeData) {
      // rangeData is an inline style range
      let decoration: RicosDecoration;
      try {
        const styleObj = JSON.parse(rangeData.style);
        const type = Object.keys(styleObj)[0];
        const value = Object.values<string>(styleObj)[0];
        decoration = { type };
        if (type === 'FG') {
          decoration.ricosColor = { foreground: value };
        }
        if (type === 'BG') {
          decoration.ricosColor = { background: value };
        }
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

  const { text, inlineStyleRanges, entityRanges, data: blockData } = block;
  const ranges: Range[] = [...inlineStyleRanges, ...entityRanges].sort(
    (a, b) => b.offset - a.offset
  );
  const getRange = () => ranges.pop();
  let textNode: RicosNode | null = null;
  const textNodes: RicosNode[] = [];
  let currentPos = 0;
  let currentRange: Range | undefined = getRange();
  while (currentPos < text.length) {
    if (currentRange && posIsInRange(currentPos, currentRange)) {
      const { length, ...rangeData } = currentRange;
      if (textNode) {
        textNode.ricosText?.decorations?.push(getDecoration(rangeData));
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
      const end = currentRange?.offset || text.length;
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
