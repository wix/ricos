import React, { Children } from 'react';
import { RichContentEditorModal } from 'wix-rich-content-editor';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { modalStyles } from './defaults';

class EngineWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editorState: createEmpty(),
    };
  }

  onModalOpen = data => {
    const { modalStyles, ...modalProps } = data;
    this.setState({
      showModal: true,
      modalProps,
      modalStyles,
    });
  };

  onModalClose = () =>
    this.setState({
      showModal: false,
      modalProps: null,
      modalStyles: null,
      modalContent: null,
    });

  handleChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const { strategies = [], openModal, closeModal, children = {} } = this.props;
    const modifiedProps = strategies.reduce((props, strategyFunction) => {
      const result = strategyFunction(children.props);
      return { ...props, ...result };
    }, children.props);
    const { helpers = {}, theme, locale, ModalsMap, onChange } = modifiedProps;
    const { onRequestClose } = this.state.modalProps || {};
    helpers.openModal = data => this.onModalOpen(data) && openModal?.(data);
    helpers.closeModal = () => this.onModalClose() && closeModal?.();
    if (helpers !== {}) modifiedProps.helpers = helpers;
    if (onChange)
      modifiedProps.onChange = editorState => {
        onChange(editorState);
        this.handleChange(editorState);
      };
    return (
      <React.Fragment>
        {Children.only(React.cloneElement(children, modifiedProps))}
        {/* <RichContentEditor {...modifiedProps} ref={forwardRef} /> */}
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="External Modal Example"
          style={modalStyles(this.state, theme)}
          role="dialog"
          onRequestClose={onRequestClose || helpers.closeModal}
        >
          <RichContentEditorModal
            modalsMap={ModalsMap}
            locale={locale}
            {...this.state.modalProps}
          />
        </ReactModal>
      </React.Fragment>
    );
  }
}
EngineWrapper.propTypes = {
  strategies: PropTypes.array,
  plugins: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onRequestModalClose: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  children: PropTypes.object,
  forwardRef: PropTypes.any,
};
export default EngineWrapper;
//export default React.forwardRef((props, ref) => <EngineWrapper {...props} forwardRef={ref} />);
