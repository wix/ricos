import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
//import { pluginsStrategyViewer } from './PluginsStrategyViewer';
//import { themeStrategy } from './ThemeStrategy';
import PropTypes from 'prop-types';

// const defaultStrategies = [pluginsStrategyViewer, themeStrategy];

class SimplifiedRCV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editorState: createEmpty(),
    };
  }

  render() {
    const { strategies = [], forwardRef, ...rest } = this.props;
    const modifiedProps = [] //defaultStrategies
      .concat(strategies)
      .reduce((props, stratFunc) => Object.assign(props, stratFunc(rest)), rest);
    return <RichContentViewer {...modifiedProps} ref={forwardRef} />;
  }
}

SimplifiedRCV.propTypes = {
  forwardRef: PropTypes.any,
  strategies: PropTypes.array,
  settings: PropTypes.shape({
    plugins: PropTypes.arrayOf(PropTypes.object),
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
};
export default React.forwardRef((props, ref) => <SimplifiedRCV {...props} forwardRef={ref} />);
