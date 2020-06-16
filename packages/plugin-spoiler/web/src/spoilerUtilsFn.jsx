import { SPOILER_TYPE } from './types';

export const customStyleFn = styles =>
  styles.toArray().reduce(cssStyle => {
    return {
      ...cssStyle,
      filter: 'blur(0.25em)',
      display: 'inline',
    };
  }, {});

export const styleFnFilter = () => {
  return styles => {
    const _styles = styles.filter(style => style === SPOILER_TYPE);
    return customStyleFn(_styles);
  };
};
