import React from 'react';
import GenWrp from './GenWrp';
import themeStrategyProvider from './ThemeStrategy';
import PropTypes from 'prop-types';

export default function OSWrapEditor({ strategies = [], theme, palette, children }) {
  strategies.push(themeStrategyProvider({ theme, palette }));
  return <GenWrp strategies={strategies}>{children}</GenWrp>;
}
OSWrapEditor.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.string,
  palette: PropTypes.array,
  strategies: PropTypes.array, //TODO should be more explicit: array of functions that return function with inner props as param,
  //and deliver the result of strategy implementation
};
//export default React.forwardRef((props, ref) => <OSWrapEditor {...props} forwardRef={ref} />);
