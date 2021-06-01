import { Node_Type, RichContent } from 'ricos-schema';
import migrationContent from '../../../../../statics/json/migratedFixtures/migration-content.json';
import migrationContentProse from '../../toProseMirror/__tests__/migrationContentProse.json';
import draftMigrationContent from '../../../../../../../../e2e/tests/fixtures/migration-content.json';
import {
  toProseMirror,
  fromProseMirror,
  proseMirrorToDraft,
  proseMirrorNodeDataToDraft,
} from '../..';
import { getImageBlockData, getImageNode } from '../../utils';
import { compare } from '../../../..';
import { JSONContent } from '@tiptap/core';

describe('convert from ProseMirror', () => {
  describe('to RichContent', () => {
    const content = RichContent.fromJSON(migrationContent);
    it('should convert content', () => {
      const richContent = fromProseMirror(toProseMirror(content));
      expect(richContent).toEqual(migrationContent);
    });
    it('should convert node', () => {
      const imageNode = getImageNode(content);
      const richContent = fromProseMirror(toProseMirror(imageNode));
      expect(richContent).toEqual(imageNode);
    });
    it('should convert node data', () => {
      const imageNode = getImageNode(content);
      const richContent = fromProseMirror(
        toProseMirror(imageNode).attrs as Record<string, unknown>
      );
      expect(richContent).toEqual(imageNode.imageData);
    });
  });
  describe('to Draft', () => {
    it('should convert content', () => {
      const draftContent = proseMirrorToDraft(migrationContentProse);
      expect(compare(draftContent, draftMigrationContent, { ignoredKeys: ['key'] })).toEqual({});
    });
    it('should convert node data', () => {
      const imageNode = getImageNode(migrationContentProse);
      const imageData = proseMirrorNodeDataToDraft(Node_Type.IMAGE, imageNode.attrs as JSONContent);
      expect(
        compare(imageData, getImageBlockData(draftMigrationContent), {
          ignoredKeys: ['key', 'src'],
        })
      ).toEqual({});
    });
  });
});
