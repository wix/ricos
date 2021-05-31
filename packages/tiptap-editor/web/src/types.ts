import { Node as ProseMirrorNode } from 'prosemirror-model';

export interface PluginProps {
  context: {
    isMobile: boolean;
    theme: string;
  };
  componentData: unknown;
  node: ProseMirrorNode;
  editorCommands: unknown;
}
