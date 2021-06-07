/* eslint-disable @typescript-eslint/no-explicit-any */
import { toProseMirror } from './toProseMirror/toProseMirror';
import { fromProseMirror } from './fromProseMirror/fromProseMirror';
import { DraftContent } from '../..';
import { convertBlockDataToRicos, convertNodeDataToDraft, fromDraft, toDraft } from '../draft';
import { JSONContent } from '@tiptap/core';
import { Node_Type } from 'ricos-schema';

export const draftToProseMirror = (draftContent: DraftContent): JSONContent =>
  toProseMirror(fromDraft(draftContent));

export const draftBlockDataToProseMirror = (
  blockType: string,
  draftBlockData: Record<string, any>
): Record<string, any> => toProseMirror(convertBlockDataToRicos(blockType, draftBlockData));

export const proseMirrorToDraft = (proseContent: JSONContent): DraftContent =>
  toDraft(fromProseMirror(proseContent));

export const proseMirrorNodeDataToDraft = (
  nodeType: Node_Type,
  nodeData: Record<string, any>
): Record<string, any> => convertNodeDataToDraft(nodeType, fromProseMirror(nodeData));

export { toProseMirror, fromProseMirror };
