/* eslint-disable no-console, fp/no-loops, no-case-declarations */
import {
  RicosContentBlock,
  RicosEntityMap,
  RicosEntityRange,
  EMOJI_TYPE,
  RICOS_COLOR_TYPE,
} from '..';
import { RicosNode, RicosDecoration } from 'ricos-schema';
import { NodeType, TO_RICOS_DECORATION_TYPE } from './consts';

import { isEmpty } from 'lodash';
import { getEntity } from './getEntity';
import { genKey } from 'draft-js';

type KeyType = string | number;
type StyleType = string;

const removeEmojiEntities = (
  entityRanges: RicosEntityRange[],
  entityMap: RicosEntityMap
): RicosEntityRange[] =>
  entityRanges.filter(range => !['EMOJI_TYPE', EMOJI_TYPE].includes(entityMap[range.key].type));

export const getTextNodes = (
  block: RicosContentBlock,
  entityMap: RicosEntityMap,
  keyMapping: Record<string, string>
): RicosNode[] => {
  const createTextNode = ({
    text,
    styles = [],
    keys = [],
  }: {
    text: string;
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
      if (type === 'FG' || type === 'BG') {
        decoration.type = RICOS_COLOR_TYPE;
        decoration.ricosColor = { [type === 'FG' ? 'foreground' : 'background']: value };
      }
    } catch {
      decoration = {
        type: TO_RICOS_DECORATION_TYPE[style],
      };
    }
    return decoration;
  };

  const { text, inlineStyleRanges, entityRanges } = block;
  if (text.length === 0) {
    return [];
  }
  const rangeMap = {};
  [...inlineStyleRanges, ...removeEmojiEntities(entityRanges, entityMap)].forEach(
    ({ offset, length, ...props }) => {
      rangeMap[offset] = [...(rangeMap[offset] || []), { action: 'start', ...props }];
      rangeMap[offset + length] = [
        ...(rangeMap[offset + length] || []),
        { action: 'end', ...props },
      ];
    }
  );

  const textNodes: RicosNode[] = [];

  let styles: StyleType[] = [];
  let keys: KeyType[] = [];
  if (!rangeMap[0]) {
    rangeMap[0] = [];
  }

  const numbers = Object.keys(rangeMap).map(Number);

  numbers.forEach((point, i) => {
    if (numbers[i] < text.length) {
      rangeMap[point].forEach(({ action, key, style }) => {
        if (action === 'start') {
          if (style) {
            styles.push(style);
          } else {
            keys.push(key);
          }
        } else if (style) {
          styles = styles.filter(s => s !== style);
        } else {
          keys = keys.filter(s => s !== key);
        }
      });

      textNodes.push(
        createTextNode({
          text: text.slice(numbers[i], numbers[i + 1]),
          styles,
          keys,
        })
      );
    }
  });

  return textNodes;
};
