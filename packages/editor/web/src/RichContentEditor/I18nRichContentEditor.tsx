import React, { Component } from 'react';
import { withI18n, ToolbarType } from 'wix-rich-content-common';
import englishResources from 'wix-rich-content-common/dist/statics/locale/messages_en.json';
import RichContentEditor, { RichContentEditorProps } from './RichContentEditor';

export default class I18nRichContentEditor extends Component<Partial<RichContentEditorProps>> {
  editor: RichContentEditor;
  WrappedEditor;
  static displayName = 'RichContentEditor';
  constructor(props) {
    super(props);
    this.WrappedEditor = withI18n<RichContentEditor, Partial<RichContentEditorProps>>(
      RichContentEditor,
      englishResources
    );
  }
  setEditorRef = editor => (this.editor = editor ? editor.getWrappedInstance() : undefined);

  getToolbars = () => this.editor.getToolbars();

  getToolbarProps = (type: ToolbarType) => this.editor.getToolbarProps(type);

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  publish = (postId: string) => this.editor.publish(postId); //async

  render() {
    return <this.WrappedEditor {...this.props} ref={this.setEditorRef} />;
  }
}
