/* eslint-disable react/prop-types */
import React, {
  Suspense,
  Children,
  Component,
  Fragment,
  ReactElement,
  ElementType,
  FunctionComponent,
} from 'react';
import { modalStyles } from './themeStrategy/defaults';
import { RichContentEditor } from 'wix-rich-content-editor';
import { createDataConverter } from './utils';
import { EditorState } from 'draft-js';
import ReactDOM from 'react-dom';

interface Props {
  children: ReactElement;
  ModalsMap: ModalsMap;
  theme: object;
  locale: string;
  isMobile?: boolean;
  onChange?: RichContentProps['onChange'];
  textToolbarType?: TextToolbarType;
  textToolbarContainer?: HTMLElement;
}

interface State {
  EditorModal?: any;
  showModal: boolean;
  modalProps?: any;
  modalStyles?: any;
  modalContent?: any;
  MobileToolbar?: ElementType;
  TextToolbar?: ElementType;
}

export default class ModalDialogProvider extends Component<Props, State> {
  childProps: RichContentProps;
  editor: typeof RichContentEditor;
  dataInstance: EditorDataInstance;

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
    this.dataInstance = createDataConverter();
  }

  componentDidMount() {
    const EditorModal = React.lazy(() =>
      import(/* webpackChunkName: "rce-EditorModal"  */ `./EditorModal`)
    );
    if (this.editor) {
      const { MobileToolbar, TextToolbar } = this.editor.getToolbars();
      this.setState({ MobileToolbar, TextToolbar, EditorModal });
    }
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

  onChange = (editorState: EditorState) => {
    this.dataInstance.refresh(editorState);
    this.props.onChange?.(editorState);
  };

  getToolbars = () => this.editor.getToolbars();
  focus = () => this.editor.focus();
  blur = () => this.editor.blur();
  getData = (postId?: string, forPublish?: boolean) => {
    const { getContentState } = this.dataInstance;
    if (postId && forPublish) {
      this.editor.publish(postId); //async
    }
    return {
      getContentState,
    };
  };

  render() {
    const { EditorModal, showModal, modalProps, MobileToolbar, TextToolbar } = this.state;
    const {
      children,
      ModalsMap,
      locale,
      theme,
      isMobile,
      textToolbarType,
      textToolbarContainer,
    } = this.props;

    const StaticToolbar = MobileToolbar || TextToolbar;

    return (
      <Fragment>
        <StaticToolbarPortal
          StaticToolbar={StaticToolbar}
          textToolbarContainer={textToolbarContainer}
        />
        {Children.only(
          React.cloneElement(children, {
            ...this.childProps,
            onChange: this.onChange,
            ref: ref => (this.editor = ref),
          })
        )}
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

const StaticToolbarPortal: FunctionComponent<{
  StaticToolbar?: ElementType;
  textToolbarContainer?: HTMLElement;
}> = ({ StaticToolbar, textToolbarContainer }) => {
  if (!StaticToolbar) return null;

  if (textToolbarContainer) {
    return ReactDOM.createPortal(<StaticToolbar />, textToolbarContainer);
  }
  return <StaticToolbar />;
};
