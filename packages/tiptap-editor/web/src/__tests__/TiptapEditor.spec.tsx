import React from 'react';
import { render, configure, RenderResult } from '@testing-library/react';
import { initTiptapEditor } from '../TiptapEditor';
import { Editor, JSONContent, useEditor } from '@tiptap/react';
import supportedPluginsContent from './supportedPluginsContent.json';
import {
  draftToTiptap,
  fromDraft,
  fromTiptap,
  tiptapToDraft,
  toDraft,
} from 'ricos-content/lib/converters';

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
    console.log(supportedPluginsContent?.blocks[4]);
    console.log(fromDraft(supportedPluginsContent)?.nodes?.[4]);
    console.log(toDraft(fromDraft(supportedPluginsContent))?.blocks?.[4]);
    console.log(draftToTiptap(supportedPluginsContent)?.content?.[4]);
    const TiptapEditor = initTiptapEditor({ initialContent: supportedPluginsContent }).Editor;
    render(<TiptapEditor />);
    const newContent = editor?.getJSON();
    console.log(newContent?.content[4]);
    const draftContent = tiptapToDraft(newContent as JSONContent);
    console.log(draftContent?.blocks[4]);
    expect(draftContent).toEqual(supportedPluginsContent);
  });
});
