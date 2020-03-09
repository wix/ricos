import React, { Children, Suspense } from 'react';
import PropTypes from 'prop-types';
import { modalStyles } from '../themeStrategy/defaults';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';

const isSSR = () => typeof window === 'undefined';
const dummy = ''; //crucial for dynamic import at it's current version
class EngineWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
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
    this.props.onModalOpen?.(data);
  };

  onModalClose = () => {
    this.setState({
      showModal: false,
      modalProps: null,
      modalStyles: null,
      modalContent: null,
    });
    this.props.onModalClose?.();
  };

  handleChange = editorState => {
    this.setState({ editorState });
  };

  fullScreenOnExpand = (entityIndex, innerIndex = 0) => {
    //galleries have an innerIndex (i.e. second image will have innerIndex=1)
    this.setState({
      //Viewer state
      expendModeIsOpen: true,
      expandModeIndex: this.expandModeData?.imageMap[entityIndex] + innerIndex,
    });
  };

  render() {
    const {
      strategies = [],
      children = {},
      withModal = true,
      editor,
      onModalOpen,
      onModalClose,
    } = this.props;
    const modifiedProps = strategies.reduce((props, strategyFunction) => {
      const result = strategyFunction(props);
      return { ...props, ...result };
    }, children.props);
    const { helpers = {}, theme, locale = 'en', ModalsMap, onChange } = modifiedProps;
    const { onRequestClose } = this.state.modalProps || {};
    //Editor Modal
    let EditorModal = '';
    const shouldRenderEditorModal = editor && withModal;
    if (shouldRenderEditorModal) {
      helpers.openModal = onModalOpen;
      helpers.closeModal = onModalClose;
      EditorModal = React.lazy(() =>
        withModal === true ? import(`./EditorModal${dummy}`) : withModal
      );
    }
    //viewer needs onExpand helper + Fullscreen
    helpers.onExpand = this.fullScreenOnExpand;
    const shouldRenderFullscreen = !editor && !isSSR() && withModal;
    const Fullscreen = React.lazy(() =>
      shouldRenderFullscreen ? import(`wix-rich-content-fullscreen${dummy}`) : ''
    );
    if (shouldRenderFullscreen && !this.expandModeData) {
      import(`wix-rich-content-fullscreen/src/lib/getImagesData${dummy}`).then(getImagesData => {
        this.expandModeData = getImagesData.default(children.props.initialState);
      });
    }
    if (onChange)
      modifiedProps.onChange = editorState => {
        onChange(editorState);
        this.handleChange(editorState);
      };
    modifiedProps.helpers = helpers;
    modifiedProps.onChange = this.onChange;

    const { expandModeIndex, expendModeIsOpen, disabled } = this.state;
    return (
      <React.Fragment>
        {Children.only(React.cloneElement(children, { ...modifiedProps, disabled }))}
        {shouldRenderEditorModal && (
          <Suspense fallback={<div />}>
            <EditorModal
              isOpen={this.state.showModal}
              contentLabel="External Modal Example"
              style={modalStyles(this.state, theme)}
              role="dialog"
              onRequestClose={onRequestClose || helpers.closeModal}
              modalsMap={ModalsMap}
              locale={locale}
              {...this.state.modalProps}
            />
          </Suspense>
        )}
        {shouldRenderFullscreen && (
          <Suspense fallback={<div />}>
            <Fullscreen
              isOpen={expendModeIsOpen}
              images={this.expandModeData?.images || []}
              onClose={() => this.setState({ expendModeIsOpen: false })}
              index={expandModeIndex}
            />
          </Suspense>
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
  onModalOpen: PropTypes.func,
  onModalClose: PropTypes.func,
  children: PropTypes.object,
  editor: PropTypes.bool,
  withModal: PropTypes.bool,
};
export default EngineWrapper;
