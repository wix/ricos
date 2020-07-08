import React, { Component } from 'react';
import { withI18n } from 'wix-rich-content-common';
import englishResources from 'wix-rich-content-common/dist/statics/locale/messages_en.json';
import RichContentEditor from './RichContentEditor';

const WrappedEditor = withI18n(RichContentEditor, englishResources);

export default class I18nRichContentEditor extends Component {
  setEditorRef = editor => (this.editor = editor ? editor.getWrappedInstance() : undefined);

  getToolbars = () => this.editor.getToolbars();

  getToolbarProps = () => this.editor.getToolbarProps();

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  publish = postId => this.editor.publish(postId); //async

  render() {
    return <WrappedEditor {...this.props} ref={this.setEditorRef} />;
  }
}

I18nRichContentEditor.displayName = 'RichContentEditor';
