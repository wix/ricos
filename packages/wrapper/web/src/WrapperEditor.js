import React from 'react';
import EngineWrapper from './EngineWrapper';
import themeStrategyProvider from './ThemeStrategy';
import pluginsStrategyProvider from './PluginsStrategy';
import PropTypes from 'prop-types';

export default function WrapperEditor({ strategies = [], theme, palette, plugins, children }) {
  strategies.push(themeStrategyProvider({ theme, palette }));
  strategies.push(pluginsStrategyProvider({ plugins }));
  return <EngineWrapper strategies={strategies}>{children}</EngineWrapper>;
}
WrapperEditor.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  palette: PropTypes.array,
  plugins: PropTypes.arrayOf(PropTypes.object),
  strategies: PropTypes.array, //TODO should be more explicit: array of functions that return function with inner props as param,
  //and deliver the result of strategy implementation
};
//export default React.forwardRef((props, ref) => <WrapperEditor {...props} forwardRef={ref} />);
