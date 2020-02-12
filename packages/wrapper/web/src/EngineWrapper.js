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
    const { strategies = [], modalSupport = true, children = {} } = this.props;
    const modifiedProps = strategies.reduce((props, strategyFunction) => {
      const result = strategyFunction(children.props);
      return { ...props, ...result };
    }, children.props);
    const { helpers = {}, theme, locale, ModalsMap, onChange } = modifiedProps;
    const { onRequestClose } = this.state.modalProps || {};
    if (modalSupport) {
      helpers.openModal = this.onModalOpen;
      helpers.closeModal = this.onModalClose;
    }
    if (onChange)
      modifiedProps.onChange = editorState => {
        onChange(editorState);
        this.handleChange(editorState);
      };
    return (
      <React.Fragment>
        {Children.only(React.cloneElement(children, modifiedProps))}
        {modalSupport && (
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
        )}
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
  modalSupport: PropTypes.bool,
};
export default EngineWrapper;
