import { RichContent, ImageData } from 'ricos-schema';
import { compare } from '../../../../comparision/compare';
import migrationContent from '../../../../../statics/json/migratedFixtures/migration-content.json';
import draftMigrationContent from '../../../../../../../../e2e/tests/fixtures/migration-content.json';
import migrationContentProse from './migrationContentProse.json';
import { draftBlockDataToProseMirror, draftToProseMirror, toProseMirror } from '../..';
import { getImageBlockData, getImageNode } from '../../utils';
import { IMAGE_TYPE } from '../../../..';

describe('convert to ProseMirror', () => {
  describe('from RichContent', () => {
    const content = RichContent.fromJSON(migrationContent);
    const imageNode = getImageNode(content);

    it('should convert content', () => {
      const proseDocument = toProseMirror(content);
      expect(compare(proseDocument, migrationContentProse, { ignoredKeys: ['key'] })).toEqual({});
    });
    it('should convert node', () => {
      const proseNode = toProseMirror(imageNode);
      expect(
        compare(proseNode, getImageNode(migrationContentProse), { ignoredKeys: ['key'] })
      ).toEqual({});
    });
    it('should convert node data', () => {
      const nodeData = toProseMirror(imageNode.imageData as ImageData);
      expect(
        compare(nodeData, getImageNode(migrationContentProse).attrs, {
          ignoredKeys: ['key'],
        })
      ).toEqual({});
    });
  });
  describe('from Draft', () => {
    it('should convert content', () => {
      const proseDocument = draftToProseMirror(draftMigrationContent);
      expect(compare(proseDocument, migrationContentProse, { ignoredKeys: ['key'] })).toEqual({});
    });
    it('should convert node data', () => {
      const imageData = getImageBlockData(draftMigrationContent);
      const proseData = draftBlockDataToProseMirror(IMAGE_TYPE, imageData);
      expect(
        compare(proseData, getImageNode(migrationContentProse).attrs, { ignoredKeys: ['key'] })
      ).toEqual({});
    });
  });
});
