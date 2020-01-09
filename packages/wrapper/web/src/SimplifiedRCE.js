import React from 'react';
import { RichContentEditor, RichContentEditorModal } from 'wix-rich-content-editor';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { modalStyles } from './defaults';

class SimplifiedRCE extends React.Component {
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
    const { strategies = [], openModal, closeModal, forwardRef, ...rest } = this.props;
    const modifiedProps = strategies.reduce(
      (props, stratFunc) => Object.assign(props, stratFunc(rest)),
      rest
    );
    const { helpers = {}, theme, locale, ModalsMap, initialState, onChange } = modifiedProps;
    const { onRequestClose } = this.state.modalProps || {};
    const { editorState } = this.state;
    helpers.openModal = data => this.onModalOpen(data) && openModal?.(data);
    helpers.closeModal = () => this.onModalClose() && closeModal?.();
    modifiedProps.helpers = helpers;
    modifiedProps.initialState = initialState || createEmpty();
    modifiedProps.onChange = editorState =>
      onChange?.(editorState) && this.handleChange(editorState);
    modifiedProps.editorState = editorState;
    return (
      <React.Fragment>
        <RichContentEditor {...modifiedProps} ref={forwardRef} />
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
SimplifiedRCE.propTypes = {
  strategies: PropTypes.array,
  settings: PropTypes.shape({
    plugins: PropTypes.arrayOf(PropTypes.object),
    theme: PropTypes.object,
  }),
  onRequestModalClose: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  children: PropTypes.object,
  forwardRef: PropTypes.any,
};
export default React.forwardRef((props, ref) => <SimplifiedRCE {...props} forwardRef={ref} />);
