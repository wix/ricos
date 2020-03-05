import React, { Children, Suspense } from 'react';
import PropTypes from 'prop-types';
import { modalStyles } from './themeStrategy/defaults';

class EngineWrapper extends React.Component {
  fullScreenOnExpand = (entityIndex, innerIndex = 0) => {
    //galleries have an innerIndex (i.e. second image will have innerIndex=1)
    this.setState({
      expendModeIsOpen: true,
      expandModeIndex: this.expandModeData.imageMap[entityIndex] + innerIndex,
    });
  };

  render() {
    const isSSR = () => typeof window === 'undefined';
    const { strategies = [], children = {}, ModalComp, modalState = {}, isEditor } = this.props;
    const modifiedProps = strategies.reduce((props, strategyFunction) => {
      const result = strategyFunction(props);
      return { ...props, ...result };
    }, children.props);
    const { helpers = {}, theme, locale = 'en', ModalsMap } = modifiedProps;
    const { onRequestClose } = modalState.modalProps || {};
    if (ModalComp) {
      helpers.openModal = this.onModalOpen;
      helpers.closeModal = this.onModalClose;
      modifiedProps.helpers = helpers;
    }
    //viewer needs onExpand helper + Fullscreen
    let Fullscreen = () => '';
    if (!isEditor) {
      helpers.onExpand = this.fullScreenOnExpand;
      Fullscreen = React.lazy(() => import('wix-rich-content-fullscreen'));
    }
    return (
      <React.Fragment>
        {Children.only(React.cloneElement(children, modifiedProps))}
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
        {!isEditor && !isSSR() && (
          <Suspense>
            <Fullscreen />
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
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  children: PropTypes.object,
  ModalComp: PropTypes.object,
  isEditor: PropTypes.bool,
  modalState: PropTypes.shape({
    modalProps: PropTypes.object,
    showModal: PropTypes.bool,
  }),
};
export default EngineWrapper;
