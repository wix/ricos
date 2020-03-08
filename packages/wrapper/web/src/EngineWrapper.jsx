import React, { Children, Suspense } from 'react';
import PropTypes from 'prop-types';
import { modalStyles } from './themeStrategy/defaults';

const isSSR = () => typeof window === 'undefined';
class EngineWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
  }

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
      ModalComp,
      modalState = {},
      withFullscreen = true,
      isEditor,
      onModalOpen,
      onModalClose,
    } = this.props;
    const modifiedProps = strategies.reduce((props, strategyFunction) => {
      const result = strategyFunction(props);
      return { ...props, ...result };
    }, children.props);
    const { helpers = {}, theme, locale = 'en', ModalsMap, editorState } = modifiedProps;
    const { onRequestClose } = modalState.modalProps || {};
    if (ModalComp) {
      helpers.openModal = onModalOpen;
      helpers.closeModal = onModalClose;
    }
    //viewer needs onExpand helper + Fullscreen
    let Fullscreen = () => '';
    helpers.onExpand = this.fullScreenOnExpand;
    if (!isEditor && !isSSR() && withFullscreen) {
      Fullscreen = React.lazy(() => import('wix-rich-content-fullscreen'));
      if (!this.expandModeData) {
        import('wix-rich-content-fullscreen/src/lib/getImagesData').then(getImagesData => {
          this.expandModeData = getImagesData.default(editorState);
        });
      }
    }
    modifiedProps.helpers = helpers;

    const { expandModeIndex, expendModeIsOpen, disabled } = this.state;
    return (
      <React.Fragment>
        {Children.only(React.cloneElement(children, { ...modifiedProps, disabled }))}
        {ModalComp && (
          <ModalComp
            isOpen={modalState.showModal}
            contentLabel="External Modal Example"
            style={modalStyles(modalState, theme)}
            role="dialog"
            onRequestClose={onRequestClose || helpers.closeModal}
            modalsMap={ModalsMap}
            locale={locale}
            {...modalState.modalProps}
          />
        )}
        {!isEditor && !isSSR() && withFullscreen && (
          <Suspense fallback={<div />}>
            <Fullscreen
              isOpen={expendModeIsOpen}
              images={this.expandModeData?.expandModeData.images || []}
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
  ModalComp: PropTypes.func,
  isEditor: PropTypes.bool,
  withFullscreen: PropTypes.bool,
  modalState: PropTypes.shape({
    modalProps: PropTypes.object,
    showModal: PropTypes.bool,
  }),
};
export default EngineWrapper;
