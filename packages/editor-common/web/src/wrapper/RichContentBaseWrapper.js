import React, { Children } from 'react';
import themeStrategy from '../ThemeStrategy';
import pluginsStrategy from '../PluginsStrategy';

const defaultStrategies = {
  theme: themeStrategy,
  plugins: pluginsStrategy,
};

export default function RichContentBaseWrapper({ strategies = {}, children, ...rest }) {
  const finalStrategies = { ...defaultStrategies, ...strategies };
  const modifiedProps = Object.values(finalStrategies).reduce(
    (props, stratFunc) => Object.assign(props, stratFunc(rest)),
    rest
  );
  return Children.only(React.cloneElement(children, modifiedProps));
}
