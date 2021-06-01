import { RichContent, ImageData } from 'ricos-schema';
import { compare } from '../../../../comparision/compare';
import migrationContent from '../../../../../statics/json/migratedFixtures/migration-content.json';
import migrationContentProse from './migrationContentProse.json';
import { toProseMirror } from '../toProseMirror';
import { getImageNode } from '../../utils';

describe('convert to ProseMirror', () => {
  it('should convert content', () => {
    const proseDocument = toProseMirror(RichContent.fromJSON(migrationContent));
    expect(compare(proseDocument, migrationContentProse, { ignoredKeys: ['key'] })).toEqual({});
  });
  it('should convert node', () => {
    const imageNode = getImageNode(RichContent.fromJSON(migrationContent));
    const proseNode = toProseMirror(imageNode);
    expect(
      compare(proseNode, getImageNode(migrationContentProse), { ignoredKeys: ['key'] })
    ).toEqual({});
  });
  it('should convert node data', () => {
    const imageNode = getImageNode(RichContent.fromJSON(migrationContent));
    const nodeData = toProseMirror(imageNode.imageData as ImageData);
    expect(
      compare(nodeData, getImageNode(migrationContentProse).attrs, {
        ignoredKeys: ['key'],
      })
    ).toEqual({});
  });
});
