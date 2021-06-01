import { RichContent } from 'ricos-schema';
import migrationContent from '../../../../../statics/json/migratedFixtures/migration-content.json';
import { toProseMirror } from '../../toProseMirror/toProseMirror';
import { getImageNode } from '../../utils';
import { fromProseMirror } from '../fromProseMirror';

describe('convert from ProseMirror', () => {
  it('should convert content', () => {
    const content = fromProseMirror(toProseMirror(RichContent.fromJSON(migrationContent)));
    expect(content).toEqual(migrationContent);
  });
  it('should convert node', () => {
    const imageNode = getImageNode(RichContent.fromJSON(migrationContent));
    const content = fromProseMirror(toProseMirror(imageNode));
    expect(content).toEqual(imageNode);
  });
  it('should convert node data', () => {
    const imageNode = getImageNode(RichContent.fromJSON(migrationContent));
    const content = fromProseMirror(toProseMirror(imageNode).attrs as Record<string, unknown>);
    expect(content).toEqual(imageNode.imageData);
  });
});
