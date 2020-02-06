import React, { Children } from 'react';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import { pluginsStrategyViewer } from './PluginsStrategyViewer';
import { themeStrategy } from './ThemeStrategy';
import PropTypes from 'prop-types';

const defaultStrategies = [pluginsStrategyViewer, themeStrategy];

class SimplifiedRCV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editorState: createEmpty(),
    };
  }

  render() {
    const { strategies = [], settings, children, ...rest } = this.props;
    const combinedProps = { settings, ...rest, ...(children.props || {}) };
    const modifiedProps = defaultStrategies
      .concat(strategies)
      .reduce((props, stratFunc) => Object.assign(props, stratFunc(combinedProps)), combinedProps);
    return Children.only(React.cloneElement(children, modifiedProps));
    //return <RichContentViewer {...modifiedProps} />;
  }
}

SimplifiedRCV.propTypes = {
  forwardRef: PropTypes.any,
  strategies: PropTypes.array,
  settings: PropTypes.shape({
    plugins: PropTypes.arrayOf(PropTypes.object),
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  children: PropTypes.any,
};
export default SimplifiedRCV;
