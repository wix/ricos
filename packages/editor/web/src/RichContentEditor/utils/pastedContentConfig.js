import { OrderedSet } from 'immutable';
import rgbToHex from './rgbToHex';

export default {
  htmlToStyle: (nodeName, node, currentStyle) => {
    if (nodeName === 'span') {
      const styles = [];
      node.style.color && styles.push(`{"FG":"${rgbToHex(node.style.color)}"}`);
      node.style.backgroundColor && styles.push(`{"BG":"${rgbToHex(node.style.backgroundColor)}"}`);
      node.style.fontWeight > 500 && styles.push('BOLD');
      return OrderedSet.of(...styles).merge(currentStyle);
    } else {
      const styles = [];
      return OrderedSet.of(...styles).merge(currentStyle);
    }
  },
  htmlToEntity: (nodeName, node, createEntity) => {
    if (nodeName === 'a') {
      return createEntity('LINK', 'MUTABLE', {
        url: node.href,
        target: '_blank',
        rel: 'noopener',
      });
    }
    // if (nodeName === 'figure') {
    //   const atomicType = node.firstElementChild.firstElementChild.dataset.hook;
    //   if (atomicType?.includes('divider-')) {
    //     return createEntity('wix-draft-plugin-divider', 'IMMUTABLE', {
    //       type: atomicType.substring(8),
    //     });
    //   }
    // }
    return null;
  },
  // htmlToBlock: nodeName => {
  //   if (nodeName === 'figure') {
  //     return 'atomic';
  //   }
  //   return null;
  // },
};
