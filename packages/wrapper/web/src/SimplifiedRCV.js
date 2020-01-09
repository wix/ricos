import React from 'react';
import { RichContentViewer } from 'wix-rich-content-editor';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import { pluginsStrategyViewer } from './PluginsStrategyViewer';
import PropTypes from 'prop-types';

const defaultStrategies = [pluginsStrategyViewer];

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
    const modifiedProps = defaultStrategies
      .concat(strategies)
      .reduce((props, stratFunc) => Object.assign(props, stratFunc(rest)), rest);
    // const { helpers = {}, theme, locale, ModalsMap, initialState, onChange } = modifiedProps;
    // const { onRequestClose } = this.state.modalProps || {};
    // const { editorState } = this.state;
    // helpers.openModal = data => this.onModalOpen(data) && openModal?.(data);
    // helpers.closeModal = () => this.onModalClose() && closeModal?.();
    // modifiedProps.helpers = helpers;
    // modifiedProps.initialState = initialState || createEmpty();
    // modifiedProps.onChange = editorState =>
    //   onChange?.(editorState) && this.handleChange(editorState);
    // modifiedProps.editorState = editorState;
    return (
      <React.Fragment>
        <RichContentViewer {...modifiedProps} ref={forwardRef} />=
      </React.Fragment>
    );
  }
}

SimplifiedRCV.propTypes = {
  forwardRef: PropTypes.any,
  strategies: PropTypes.array,
};
export default React.forwardRef((props, ref) => <SimplifiedRCV {...props} forwardRef={ref} />);
