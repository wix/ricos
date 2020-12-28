/* eslint-disable no-console, fp/no-loops, no-case-declarations */
import { RicosContentBlock, RicosEntityMap } from '..';
import { RicosNode, RicosDecoration } from 'ricos-schema';
import { NodeType } from './consts';

import { isEmpty } from 'lodash';
import { getEntity } from './getEntity';
import { genKey } from 'draft-js';

type KeyType = string | number;
type StyleType = string;

export const getTextNodes = (
  block: RicosContentBlock,
  entityMap: RicosEntityMap,
  keyMapping: Record<string, string>
): RicosNode[] => {
  const createTextNode = ({
    text,
    blockData,
    styles = [],
    keys = [],
  }: {
    text: string;
    blockData: RicosContentBlock['data'];
    styles: StyleType[];
    keys: KeyType[];
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

    let decorations: RicosDecoration[] = [];

    if (blockData && !isEmpty(blockData) && blockData.textAlignment) {
      decorations.push({
        type: 'ricos-alignment',
        ricosAlignment: { direction: blockData.textAlignment },
      });
    }

    const keysDecorations = keys.map(key => getEntity(key, entityMap, keyMapping));
    const stylesDecorations = styles.map(style => getDecoration(style));
    decorations = [...decorations, ...keysDecorations, ...stylesDecorations];

    if (!isEmpty(decorations) && textNode.ricosText) {
      textNode.ricosText.decorations = decorations;
    }

    return textNode;
  };

  const getDecoration = (style: StyleType): RicosDecoration => {
    let decoration: RicosDecoration;
    try {
      const styleObj = JSON.parse(style);
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
        type: style.toLowerCase(),
      };
    }
    return decoration;
  };

  const { text, inlineStyleRanges, entityRanges, data: blockData } = block;
  if (text.length === 0) {
    return [];
  }
  const rangeMap = {};
  [...inlineStyleRanges, ...entityRanges].forEach(({ offset, length, ...props }) => {
    rangeMap[offset] = [...(rangeMap[offset] || []), { action: 'start', ...props }];
    rangeMap[offset + length] = [...(rangeMap[offset + length] || []), { action: 'end', ...props }];
  });

  const textNodes: RicosNode[] = [];

  let styles: StyleType[] = [];
  let keys: KeyType[] = [];
  if (!rangeMap[0]) {
    rangeMap[0] = [];
  }

  const numbers = Object.keys(rangeMap).map(Number);

  numbers.forEach((point, i) => {
    if (numbers[i] < text.length - 1) {
      rangeMap[point].forEach(({ action, key, style }) => {
        if (action === 'start') {
          if (key) {
            keys.push(key);
          } else if (style) {
            styles.push(style);
          }
        } else if (key) {
          keys = keys.filter(s => s !== key);
        } else if (style) {
          styles = styles.filter(s => s !== style);
        }
      });

      textNodes.push(
        createTextNode({
          text: text.slice(numbers[i], numbers[i + 1]),
          blockData,
          styles,
          keys,
        })
      );
    }
  });

  return textNodes;
};
