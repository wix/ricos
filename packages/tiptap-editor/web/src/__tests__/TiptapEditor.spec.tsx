import React from 'react';
import { render } from '@testing-library/react';
import { initTiptapEditor } from '../TiptapEditor';
import { Editor, JSONContent } from '@tiptap/react';
import supportedPluginsContent from './supportedPluginsContent.json';
import { tiptapToDraft } from 'ricos-content/lib/converters';

let editor: Editor | null = null;

jest.mock('@tiptap/react', () => {
  const { Editor, ...tiptapReact } = jest.requireActual<any>('@tiptap/react');
  return {
    ...tiptapReact,
    Editor(options) {
      editor = new Editor(options);
      return editor;
    },
  };
});

describe('tiptap editor', () => {
  it('should not change content', async () => {
    const TiptapEditor = initTiptapEditor({ initialContent: supportedPluginsContent }).Editor;
    render(<TiptapEditor />);
    const newContent = editor?.getJSON();
    const draftContent = tiptapToDraft(newContent as JSONContent);
    expect(draftContent).toEqual(supportedPluginsContent);
  });
});
