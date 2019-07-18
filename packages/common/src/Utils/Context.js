import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

const RichContentContext = React.createContext({
  theme: {},
  anchorTarget: '',
  relValue: '',
  config: {},
  t: noop,
  setEditorState: noop,
  locale: 'en',
  helpers: {},
});
const { Provider, Consumer } = RichContentContext;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({
    t: PropTypes.func,
    setEditorState: PropTypes.func,
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
