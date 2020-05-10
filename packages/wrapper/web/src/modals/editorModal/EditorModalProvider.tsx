import React, { Children, Component, Fragment, ReactElement } from 'react';
import { modalStyles } from '../../themeStrategy/defaults';
import EditorModal from './EditorModal';

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
    const { showModal, modalProps } = this.state;
    const { children, ModalsMap, locale, theme } = this.props;

    return (
      <Fragment>
        {Children.only(React.cloneElement(children, { ...this.childProps }))}
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
      </Fragment>
    );
  }
}
