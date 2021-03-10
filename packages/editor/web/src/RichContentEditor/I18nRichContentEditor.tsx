import React, { Component } from 'react';
import { withI18n, ToolbarType } from 'wix-rich-content-common';
import englishResources from 'wix-rich-content-common/dist/statics/locale/messages_en.json';
import RichContentEditor, { RichContentEditorProps } from './RichContentEditor';

const WrappedEditor = withI18n<typeof RichContentEditor, Partial<RichContentEditorProps>>(
  RichContentEditor,
  englishResources
);

export default class I18nRichContentEditor extends Component<Partial<RichContentEditorProps>> {
  editor: RichContentEditor;
  static displayName = 'RichContentEditor';

  setEditorRef = editor => (this.editor = editor ? editor.getWrappedInstance() : undefined);

  getToolbars = () => this.editor.getToolbars();

  getToolbarProps = (type: ToolbarType) => this.editor.getToolbarProps(type);

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  // TODO: remove postId param once the getContent(postId) API is completely deprecated
  // TODO: remove in v9
  publish = (postId?: string) => this.editor.publish(postId); //async

  render() {
    return <WrappedEditor {...this.props} ref={this.setEditorRef} />;
  }
}
