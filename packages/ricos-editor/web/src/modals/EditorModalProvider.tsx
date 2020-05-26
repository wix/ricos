import React, { Children, Component, Fragment, ReactElement, Suspense } from 'react';

const modalStyleDefaults = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const modalStyles = (state, theme) => {
  return {
    content: Object.assign(
      {},
      (state.modalStyles || modalStyleDefaults).content,
      theme.modalTheme.content
    ),
    overlay: Object.assign(
      {},
      (state.modalStyles || modalStyleDefaults).overlay,
      theme.modalTheme.overlay
    ),
  };
};

interface Props {
  children: ReactElement;
  ModalsMap: ModalsMap;
  theme: object;
  locale: string;
}

interface State {
  showModal: boolean;
  modalProps?: any;
  modalStyles?: any;
  modalContent?: any;
  EditorModal?: any;
}

export default class EditorModalProvider extends Component<Props, State> {
  childProps: RichContentProps;

  constructor(props: Props) {
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
      import(/* webpackChunkName: "RicosEditorModal"  */ './EditorModal')
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
        {Children.only(React.cloneElement(children, { ...this.childProps }))}
        {EditorModal && (
          <Suspense fallback={<div />}>
            <EditorModal
              dataHook={'RicosEditorModal'}
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
