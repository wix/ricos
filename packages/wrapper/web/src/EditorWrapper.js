import React from 'react';
import EngineWrapper from './EngineWrapper';
import themeStrategyProvider from './ThemeStrategy';
import pluginsStrategyProvider from './PluginsStrategy';
import PropTypes from 'prop-types';

export default function EditorWrapper({ strategies = [], theme, palette, plugins = [], children }) {
  const themeGenerators = plugins.map(plug => plug.themeGenerator);
  strategies.push(themeStrategyProvider({ theme, palette, themeGenerators }));
  strategies.push(pluginsStrategyProvider({ plugins }));
  return <EngineWrapper strategies={strategies}>{children}</EngineWrapper>;
}
EditorWrapper.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  palette: PropTypes.array,
  plugins: PropTypes.arrayOf(PropTypes.object),
  strategies: PropTypes.array,
  //TODO should be more explicit: array of functions that return function with inner props as param,
  //and deliver the result of strategy implementation
};
//export default React.forwardRef((props, ref) => <EditorWrapper {...props} forwardRef={ref} />);
