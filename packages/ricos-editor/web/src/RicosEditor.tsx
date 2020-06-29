/* eslint-disable react/prop-types */
import React, { Component, Fragment, ElementType } from 'react';
import { RicosEngine } from 'ricos-viewer';
import { RichContentEditor } from 'wix-rich-content-editor';
import { StickyFormattingToolbar } from 'wix-rich-content-toolbars';
import { createDataConverter } from './editorUtils';
import { shouldRenderChild } from 'ricos-viewer/dist/lib/utils.cjs.js';
import { EditorState } from 'draft-js';
import './styles.css';

interface State {
  engineKey: string;
}

export class RicosEditor extends Component<RicosEditorProps, State> {
  editor: typeof RichContentEditor;
  dataInstance: EditorDataInstance;

  constructor(props: RicosEditorProps) {
    super(props);
    this.dataInstance = createDataConverter(props.onChange);
    this.state = { engineKey: 'editor_en' };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      console.log(`locale change in ricos`, nextProps.locale);
      this.setState({ engineKey: `editor_${nextProps.locale}` });
    }
  }

  renderFormattingToolbar = ({ buttons, context, pubsub }) => {
    const { theme, isMobile, locale, getEditorState } = context;
    return (
      <StickyFormattingToolbar
        theme={theme}
        buttons={buttons}
        locale={locale}
        isMobile={isMobile}
        pubsub={pubsub}
        getEditorState={getEditorState}
      />
    );
  };

  onChange = (childOnChange?: (editorState: EditorState) => void) => (editorState: EditorState) => {
    this.dataInstance.refresh(editorState);
    childOnChange?.(editorState);
  };

  onToolbarButtonsReady = Toolbar => this.editor.onToolbarButtonsReady(Toolbar);

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
    const { children, toolbarSettings, ...props } = this.props;
    const child: RichContentChild =
      children && shouldRenderChild('RichContentEditor', children) ? (
        children
      ) : (
        <RichContentEditor />
      );

    return (
      <Fragment>
        {this.editor?.onToolbarButtonsReady(this.renderFormattingToolbar)}
        <RicosEngine
          isViewer={false}
          key={this.state.engineKey}
          {...props}
          toolbarSettings={toolbarSettings}
        >
          {React.cloneElement(child, {
            onChange: this.onChange(child.props.onChange),
            ref: ref => (this.editor = ref),
            editorKey: 'editor',
          })}
        </RicosEngine>
      </Fragment>
    );
  }
}
