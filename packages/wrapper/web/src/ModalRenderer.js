import React, { Suspense, Children, Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { modalStyles } from './themeStrategy/defaults';

export default class ModalRenderer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    ModalsMap: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    locale: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      EditorModal: () => undefined,
      isReady: false,
    };
    this.childProps = {
      ...props.children.props,
      helpers: {
        ...props.children.props.helpers,
        openModal: this.openModal,
        closeModal: this.closeModal,
      },
    };
  }

  componentDidMount() {
    const EditorModal = React.lazy(() =>
      import(/* webpackChunkName: "rce-EditorModal"  */ `./EditorModal.js`)
    );
    this.setState({ EditorModal, isReady: true });
  }

  openModal = data => {
    const { modalStyles, ...modalProps } = data;
    this.setState({
      showModal: true,
      modalProps,
      modalStyles,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      modalProps: null,
      modalStyles: null,
      modalContent: null,
    });
  };

  render() {
    const { EditorModal, showModal, modalProps, isReady } = this.state;
    const { children, ModalsMap, locale, theme } = this.props;

    return (
      <Fragment>
        {Children.only(React.cloneElement(children, this.childProps))}
        {isReady && (
          <Suspense fallback={<div />}>
            <EditorModal
              dataHook={'WrapperEditorModal'}
              isOpen={showModal}
              style={modalStyles(this.state, theme)}
              role="dialog"
              onRequestClose={modalProps?.onRequestClose || this.closeModal}
              modalsMap={ModalsMap}
              locale={locale}
              {...modalProps}
            />
          </Suspense>
        )}
      </Fragment>
    );
  }
}
