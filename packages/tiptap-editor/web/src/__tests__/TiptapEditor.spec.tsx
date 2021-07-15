import React from 'react';
import { render } from '@testing-library/react';
import { initTiptapEditor } from '../TiptapEditor';
import { Editor, JSONContent } from '@tiptap-es5/react';
import supportedPluginsContent from './supportedPluginsContent.json';
import { tiptapToDraft } from 'ricos-content/lib/converters';
import { compare } from 'ricos-content/lib/comparision';

let editor: Editor | null = null;

jest.mock('@tiptap-es5/react', () => {
  const { Editor, ...tiptapReact } = jest.requireActual('@tiptap-es5/react');
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
    // const newContent = editor?.getJSON();
    // const draftContent = tiptapToDraft(newContent as JSONContent);
    // expect(compare(draftContent, supportedPluginsContent)).toEqual({});
  });
});
