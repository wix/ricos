import { OrderedSet } from 'immutable';

const rgbToHex = rgbString => {
  const sep = rgbString.indexOf(',') > -1 ? ',' : ' ';
  const rgb = rgbString
    .substr(4)
    .split(')')[0]
    .split(sep);

  let r = Number(rgb[0]).toString(16),
    g = Number(rgb[1]).toString(16),
    b = Number(rgb[2]).toString(16);

  if (r.length === 1) r = '0' + r;
  if (g.length === 1) g = '0' + g;
  if (b.length === 1) b = '0' + b;

  return '#' + r + g + b;
};

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
    // if (nodeName === 'img') {
    //   return createEntity('wix-draft-plugin-image', 'IMMUTABLE', {
    //     src: node.src,
    //   });
    // }
    if (nodeName === 'figure') {
      const atomicType = node.firstElementChild.firstElementChild.dataset.hook;
      if (atomicType?.includes('divider-')) {
        return createEntity('wix-draft-plugin-divider', 'IMMUTABLE', {
          type: atomicType.substring(8),
        });
      }
      // if (atomicType.includes('imageViewer')) {
      //   console.log({ node });
      //   return createEntity('wix-draft-plugin-image', 'IMMUTABLE', {
      //     src: node.src,
      //   });
      // }
    }
    return null;
  },
  htmlToBlock: nodeName => {
    if (nodeName === 'figure') {
      return 'atomic';
    }

    return null;
  },
};
