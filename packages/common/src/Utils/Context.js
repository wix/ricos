import React from 'react';
import PropTypes from 'prop-types';

const ReactContext = React.createContext();

const Provider = ({
  children,
  theme,
  t,
  locale,
  anchorTarget,
  relValue,
  helpers,
  config,
  isMobile,
  setEditorState,
}) => (
  <ReactContext.Provider
    value={{ theme, t, locale, anchorTarget, relValue, helpers, config, isMobile, setEditorState }}
  >
    {children}
  </ReactContext.Provider>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
  t: PropTypes.func,
  locale: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  helpers: PropTypes.object,
  config: PropTypes.object,
  isMobile: PropTypes.bool,
  setEditorState: PropTypes.func,
};

const Consumer = ({ children }) => <ReactContext.Consumer>{children}</ReactContext.Consumer>;

Consumer.propTypes = {
  children: PropTypes.func.isRequired,
};

export default {
  type: ReactContext,
  Provider,
  Consumer,
};
