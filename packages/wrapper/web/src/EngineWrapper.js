import React, { Children, Suspense } from 'react';
import PropTypes from 'prop-types';
import { modalStyles } from './themeStrategy/defaults';

class EngineWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      showModal: false,
      EditorModal: undefined,
      Fullscreen: undefined,
    };
    if (props.editor) {
      import(
        // eslint-disable-next-line max-len
        /* webpackChunkName: "rce-editorStateConversion"  */ `wix-rich-content-editor/dist/lib/editorStateConversion.js`
      ).then(module => this.setState({ editorState: module.createEmpty() }));
    }
    this.emptyInitialState = { entityMap: {} };
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

  onExpand = (entityIndex, innerIndex = 0) => {
    //galleries have an innerIndex (i.e. second image will have innerIndex=1)
    this.setState({
      //Viewer state
      expandModeIsOpen: true,
      expandModeIndex: this.state.expandModeData?.imageMap[entityIndex] + innerIndex,
    });
  };

  setExpandModeData = expandModeData => {
    this.setState({ expandModeData });
  };

  componentDidMount() {
    const { editor, withModal = true } = this.props;
    const shouldRenderEditorModal = editor && withModal;
    const shouldRenderFullscreen = !editor && withModal;
    let EditorModal, Fullscreen;
    if (shouldRenderEditorModal)
      EditorModal =
        withModal === true
          ? React.lazy(() => import(/* webpackChunkName: "rce-EditorModal"  */ `./EditorModal.js`))
          : withModal;
    if (shouldRenderFullscreen) {
      Fullscreen =
        withModal === true
          ? React.lazy(() => import(/* webpackChunkName: "rce-ViewerModal"  */ './ViewerModal'))
          : withModal;
    }
    this.setState({ EditorModal, Fullscreen });
  }

  render() {
    const { strategies = [], children = {}, withModal = true, editor } = this.props;
    const modifiedProps = strategies.reduce(
      (props, strategyFunction) => {
        const result = strategyFunction(props);
        return { ...props, ...result };
      },
      { ...children.props }
    );
    const { helpers = {}, theme, locale = 'en', ModalsMap, onChange } = modifiedProps;
    const { onRequestClose } = this.state.modalProps || {};

    //viewer needs onExpand helper + Fullscreen
    helpers.onExpand = this.onExpand;

    //Editor Modal
    if (editor && withModal) {
      helpers.openModal = this.onModalOpen;
      helpers.closeModal = this.onModalClose;
    }
    modifiedProps.onChange = editorState => {
      onChange?.(editorState);
      this.handleChange(editorState);
    };

    modifiedProps.helpers = helpers;

    const {
      expandModeData,
      expandModeIndex,
      expandModeIsOpen,
      disabled,
      EditorModal,
      Fullscreen,
    } = this.state;
    return (
      <React.Fragment>
        <div id="#engine_wrapper" />
        {Children.only(React.cloneElement(children, { ...modifiedProps, disabled }))}
        {EditorModal && (
          <Suspense fallback={<div />}>
            <EditorModal
              dataHook={'WrapperEditorModal'}
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
        {Fullscreen && (
          <Suspense fallback={<div />}>
            <Fullscreen
              dataHook={'WrapperFullScreen'}
              initialState={children.props.initialState || this.emptyInitialState}
              isOpen={expandModeIsOpen}
              images={expandModeData?.images || []}
              onClose={() => this.setState({ expandModeIsOpen: false })}
              index={expandModeIndex}
              setExpandModeData={this.setExpandModeData}
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
  withModal: PropTypes.oneOf([PropTypes.bool, PropTypes.object]),
};
export default EngineWrapper;
