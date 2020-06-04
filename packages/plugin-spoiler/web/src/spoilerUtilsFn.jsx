export const customStyleFn = styles =>
  styles.toArray().reduce(cssStyle => {
    return {
      ...cssStyle,
      ...{
        filter: 'blur(4px)',
        display: 'inline',
      },
    };
  }, {});

export const styleFnFilter = () => {
  return styles => {
    const _styles = styles.filter(style => style === 'SPOILER');
    return customStyleFn(_styles);
  };
};
