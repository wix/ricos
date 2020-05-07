/* eslint-disable react/prop-types */
import React, { Component, Fragment, ElementType, FunctionComponent } from 'react';
import RicosEngine from './RicosEngine';
import { RichContentEditor } from 'wix-rich-content-editor';
import { createDataConverter } from './editorUtils';
import { shouldRenderChild } from './utils';
import ReactDOM from 'react-dom';
import { EditorState } from 'draft-js';
import ModalDialogProvider from './ModalDialogProvider';

interface State {
  StaticToolbar?: ElementType;
}

export class RicosEditor extends Component<RicosEditorProps, State> {
  editor: typeof RichContentEditor;
  dataInstance: EditorDataInstance;

  constructor(props) {
    super(props);
    this.dataInstance = createDataConverter();
    this.state = {};
  }

  componentDidMount() {
    if (this.editor) {
      const { MobileToolbar, TextToolbar } = this.editor.getToolbars();
      this.setState({ StaticToolbar: MobileToolbar || TextToolbar });
    }
  }

  onChange = (childOnChange?: OnChangeFunction) => (editorState: EditorState) => {
    this.dataInstance.refresh(editorState);
    childOnChange?.(editorState);
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
    const { children, textToolbarContainer, ...props } = this.props;
    const { StaticToolbar } = this.state;

    const child: RichContentChild =
      children && shouldRenderChild('RichContentEditor', children) ? (
        children
      ) : (
        <RichContentEditor />
      );

    const { openModal, closeModal } = child.props;
    const modalityProvider = !closeModal && !openModal ? ModalDialogProvider : Fragment;

    return (
      <Fragment>
        <StaticToolbarPortal
          StaticToolbar={StaticToolbar}
          textToolbarContainer={textToolbarContainer}
        />
        <RicosEngine isViewer={false} key={'editor'} {...props} modalityProvider={modalityProvider}>
          {React.cloneElement(child, {
            onChange: this.onChange(child.props.onChange),
            ref: ref => (this.editor = ref),
          })}
        </RicosEngine>
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
