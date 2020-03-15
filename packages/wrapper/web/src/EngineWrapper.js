import React, { Children, Suspense } from 'react';
import PropTypes from 'prop-types';
import { modalStyles } from './themeStrategy/defaults';

class EngineWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.modifiedProps = {};
    this.state = {
      isAsyncStrategiesDone: false,
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

  updateModifiedProps = strategies =>
    (this.modifiedProps = {
      ...this.modifiedProps,
      ...this.runStrategies(strategies),
    });

  runStrategies = strategies =>
    strategies.reduce(
      (props, strategyFunction) => {
        const result = strategyFunction(props);
        return { ...props, ...result };
      },
      {
        ...this.props.children.props,
      }
    );

  componentDidMount() {
    const { editor, withModal = true, asyncStrategies } = this.props;
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
    Promise.all(asyncStrategies).then(strategies => {
      this.updateModifiedProps(strategies);
      this.setState({ isAsyncStrategiesDone: true });
    });
    this.setState({ EditorModal, Fullscreen });
  }

  render() {
    const { strategies = [], children = {}, withModal = true, editor } = this.props;
    this.updateModifiedProps(strategies);

    const { helpers = {}, theme, locale = 'en', ModalsMap, onChange } = this.modifiedProps;
    const { onRequestClose } = this.state.modalProps || {};

    //viewer needs onExpand helper + Fullscreen
    helpers.onExpand = this.onExpand;

    //Editor Modal
    if (editor && withModal) {
      helpers.openModal = this.onModalOpen;
      helpers.closeModal = this.onModalClose;
    }
    this.modifiedProps.onChange = editorState => {
      onChange?.(editorState);
      this.handleChange(editorState);
    };

    this.modifiedProps.helpers = helpers;

    const {
      expandModeData,
      expandModeIndex,
      expandModeIsOpen,
      disabled,
      EditorModal,
      Fullscreen,
      isAsyncStrategiesDone,
    } = this.state;
    if (!isAsyncStrategiesDone) return <div />;
    return (
      <React.Fragment>
        <div id="#wrapper_viewer_modal" />
        {Children.only(React.cloneElement(children, { ...this.modifiedProps, disabled }))}
        {EditorModal && (
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
        {Fullscreen && (
          <Suspense fallback={<div />}>
            <Fullscreen
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
  strategies: PropTypes.arrayOf(PropTypes.func),
  asyncStrategies: PropTypes.array,
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
