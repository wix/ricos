import React, { Suspense, Children, Component, Fragment, ReactElement } from 'react';
import { modalStyles } from './themeStrategy/defaults';
import { RichContentProps } from './RichContentWrapperTypes';

interface Props {
  children: ReactElement;
  ModalsMap: ModalsMap;
  theme: object;
  locale: string;
}

interface State {
  EditorModal?: any;
  showModal: boolean;
  modalProps?: any;
  modalStyles?: any;
  modalContent?: any;
}

export default class ModalRenderer extends Component<Props, State> {
  childProps: RichContentProps;

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
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
      import(/* webpackChunkName: "rce-EditorModal"  */ `./EditorModal`)
    );
    this.setState({ EditorModal });
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
    const { EditorModal, showModal, modalProps } = this.state;
    const { children, ModalsMap, locale, theme } = this.props;

    return (
      <Fragment>
        {Children.only(React.cloneElement(children, this.childProps))}
        {EditorModal && (
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
