import React, { Suspense, Children, Component, Fragment, ReactElement } from 'react';
import { modalStyles } from './themeStrategy/defaults';
import {
  RichContentProps,
  InitialState,
  EditorState,
  EditorDataInstance,
} from './RichContentWrapperTypes';
import { RichContentEditor } from 'wix-rich-content-editor';
import { convertToRaw } from 'wix-rich-content-editor-common';
import { debounce } from 'lodash';
import { emptyState } from './utils';

interface Props {
  children: ReactElement;
  ModalsMap: ModalsMap;
  theme: object;
  locale: string;
  isMobile?: boolean;
  onChange?: RichContentProps['onChange'];
}

interface State {
  EditorModal?: any;
  showModal: boolean;
  modalProps?: any;
  modalStyles?: any;
  modalContent?: any;
  MobileToolbar?: React.ElementType;
}

export default class ModalRenderer extends Component<Props, State> {
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
    this.dataInstance = this.createDataConverter(emptyState);
  }

  createDataConverter = (initialState: InitialState): EditorDataInstance => {
    let currState = initialState;
    return {
      getContentState: () => currState,
      refresh: debounce(editorState => {
        currState = convertToRaw(editorState.getCurrentContent());
      }, 200),
    };
  };

  componentDidMount() {
    const EditorModal = React.lazy(() =>
      import(/* webpackChunkName: "rce-EditorModal"  */ `./EditorModal`)
    );
    const { isMobile } = this.props;
    if (isMobile) {
      const { MobileToolbar } = this.editor.getToolbars();
      this.setState({ MobileToolbar });
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
    const { onChange } = this.props;
    this.dataInstance.refresh(editorState);
    onChange?.(editorState);
  };

  getToolbars = () => this.editor.getToolbars();
  focus = () => this.editor.focus();
  blur = () => this.editor.blur();
  getData = (postId: string) => {
    this.editor.publish(postId); //async
    return {
      getContent: this.dataInstance.getContentState(),
    };
  };

  render() {
    const { EditorModal, showModal, modalProps, MobileToolbar } = this.state;
    const { children, ModalsMap, locale, theme } = this.props;
    const onChange = this.onChange;

    return (
      <Fragment>
        {MobileToolbar && <MobileToolbar />}
        {Children.only(
          React.cloneElement(children, {
            ...this.childProps,
            onChange,
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
