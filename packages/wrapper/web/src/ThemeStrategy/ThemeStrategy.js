import RceTheme from './RceTheme';
import { StyleSheet as Aphrodite } from 'aphrodite';
import { theme as defaultTheme } from '../defaults';

export default function themeStrategy({ settings = {}, ...rest }) {
  const { theme = {}, palette } = settings;
  const customizedTheme = rest?.theme || {};
  if (typeof theme === 'string') {
    const rceTheme = new RceTheme(theme, palette);

    const { StyleSheet, css } = Aphrodite.extend([
      {
        selectorHandler: (selector, baseSelector, generateSubtreeStyles) => {
          const nestedTags = [];
          const selectors = selector.split(',');
          selectors.forEach((subselector, key) => {
            if (selector[0] === '&') {
              const tag = key === 0 ? subselector.slice(1) : subselector;
              const nestedTag = generateSubtreeStyles(
                `${baseSelector} ${tag}`.replace(/ +(?= )/g, '')
              );
              nestedTags.push(nestedTag);
            }
          });
          // eslint-disable-next-line no-console
          console.log(nestedTags.length && nestedTags.flat());
          return nestedTags.length ? nestedTags.flat() : null;
        },
      },
    ]);
    const styles = StyleSheet.create(rceTheme.getStylesObject());
    // eslint-disable-next-line no-console
    console.log({ styles });
    // const themeObj = {};
    // Object.keys(styles).forEach(k => {
    //   themeObj[k] = css(styles[k]);
    // });
    // console.log(themeObj);
    // console.log('css(styles.globals)', css(styles.editor));

    const themeObj = Object.entries(styles).reduce((prev, curr) => {
      return { ...prev, [curr[0]]: css(curr[1]) };
    }, {});
    // eslint-disable-next-line no-console
    console.log({ themeObj });

    return { theme: { ...defaultTheme, ...themeObj, ...customizedTheme } };
  }
  return { theme: { ...defaultTheme, ...theme } };
}
