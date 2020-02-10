import React, { Children } from 'react';
import { RichContentEditorModal } from 'wix-rich-content-editor';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { modalStyles } from './defaults';
//import { pluginsStrategy } from './PluginsStrategy';
import { themeStrategy } from './ThemeStrategy';

const defaultStrategies = [themeStrategy];
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
    const { strategies = [], openModal, closeModal, children, settings, ...rest } = this.props;
    const combinedProps = { settings, ...rest, ...(children.props || {}) };
    const modifiedProps = defaultStrategies
      .concat(strategies)
      .reduce((props, stratFunc) => Object.assign(props, stratFunc(combinedProps)), combinedProps);
    const { helpers = {}, theme, locale, ModalsMap, onChange, editorState } = modifiedProps;
    const { onRequestClose } = this.state.modalProps || {};
    if (openModal) helpers.openModal = data => this.onModalOpen(data) && openModal(data);
    if (closeModal) helpers.closeModal = () => this.onModalClose() && closeModal();
    if (helpers !== {}) modifiedProps.helpers = helpers;
    if (onChange)
      modifiedProps.onChange = editorState =>
        onChange(editorState) && this.handleChange(editorState);
    modifiedProps.editorState = editorState || this.state.editorState;
    return (
      <React.Fragment>
        {Children.only(React.cloneElement(children, modifiedProps))}
        {/* <RichContentEditor {...modifiedProps} ref={forwardRef} /> */}
        {this.state.modalProps && (
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
SimplifiedRCE.propTypes = {
  strategies: PropTypes.array,
  settings: PropTypes.shape({
    plugins: PropTypes.arrayOf(PropTypes.object),
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  onRequestModalClose: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  children: PropTypes.object,
  //forwardRef: PropTypes.any,
};
export default SimplifiedRCE;
//export default React.forwardRef((props, ref) => <SimplifiedRCE {...props} forwardRef={ref} />);
