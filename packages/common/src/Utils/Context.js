import React from 'react';
import PropTypes from 'prop-types';

const RichContentContext = React.createContext();
const { Provider, Consumer } = RichContentContext;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({
    setEditorState: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    theme: PropTypes.object,
    locale: PropTypes.string,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    helpers: PropTypes.object,
    config: PropTypes.object,
    isMobile: PropTypes.bool,
  }),
};

Consumer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default {
  type: RichContentContext,
  Provider,
  Consumer,
};
