import React, { Component, Fragment, ElementType, FunctionComponent } from 'react';
import { RicosEngine, shouldRenderChild } from 'ricos-common';
import { RichContentEditor } from 'wix-rich-content-editor';
import { createDataConverter } from './editorUtils';
import ReactDOM from 'react-dom';
import { EditorState } from 'draft-js';
import RicosModal from './modals/RicosModal';
import './styles.css';
import { RicosEditorProps, EditorDataInstance, RichContentChild } from './index';

interface State {
  StaticToolbar?: ElementType;
}

export class RicosEditor extends Component<RicosEditorProps, State> {
  editor: RichContentEditor;
  dataInstance: EditorDataInstance;

  constructor(props: RicosEditorProps) {
    super(props);
    this.dataInstance = createDataConverter(props.onChange);
    this.state = {};
  }

  componentDidMount() {
    if (this.editor) {
      const { MobileToolbar, TextToolbar } = this.editor.getToolbars();
      this.setState({ StaticToolbar: MobileToolbar || TextToolbar });
    }
  }

  onChange = (childOnChange?: (editorState: EditorState) => void) => (editorState: EditorState) => {
    this.dataInstance.refresh(editorState);
    childOnChange?.(editorState);
  };

  getToolbarProps = () => this.editor.getToolbarProps();

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  getToolbars = () => this.editor.getToolbars();

  getContent = (postId?: string, forPublish?: boolean) => {
    const { getContentState } = this.dataInstance;
    if (postId && forPublish) {
      this.editor.publish(postId); //async
    }
    return getContentState();
  };

  render() {
    const { children, toolbarSettings, draftEditorSettings = {}, ...props } = this.props;
    const { StaticToolbar } = this.state;

    const supportedDraftEditorSettings = Object.entries(draftEditorSettings).map(
      ([k, v]) =>
        [
          'autoCapitalize',
          'autoComplete',
          'autoCorrect',
          'spellCheck',
          'stripPastedStyles',
          'handleBeforeInput',
          'handlePastedText',
          'handleReturn',
        ].includes(k) && v
    );

    const child: RichContentChild =
      children && shouldRenderChild('RichContentEditor', children) ? (
        children
      ) : (
        <RichContentEditor />
      );

    return (
      <Fragment>
        <StaticToolbarPortal
          StaticToolbar={StaticToolbar}
          textToolbarContainer={toolbarSettings?.textToolbarContainer}
        />
        <RicosEngine
          RicosModal={RicosModal}
          isViewer={false}
          key={'editor'}
          toolbarSettings={toolbarSettings}
          {...props}
        >
          {React.cloneElement(child, {
            onChange: this.onChange(child.props.onChange),
            ref: ref => (this.editor = ref),
            editorKey: 'editor',
            ...supportedDraftEditorSettings,
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
