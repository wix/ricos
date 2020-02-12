import RceTheme from './RceTheme';
import { StyleSheet as Aphrodite } from 'aphrodite';
import { theme as defaultTheme } from '../defaults';

const createThemeStrategy = (themeObj = {}) => (innerProps = {}) => {
  const { theme = {} } = innerProps;
  return { theme: { ...themeObj, ...theme } };
};

// Note: themeGenerators should include the editor/viewer generators, common generator, ..
export default function themeStrategyProvider({ theme = {}, palette = {}, themeGenerators = [] }) {
  if (typeof theme === 'string') {
    const rceTheme = new RceTheme(theme, palette, themeGenerators);
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
    //console.log({ styles });
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

    return createThemeStrategy({ ...defaultTheme, ...themeObj });
  }
  return createThemeStrategy({ ...defaultTheme, ...theme });
}
