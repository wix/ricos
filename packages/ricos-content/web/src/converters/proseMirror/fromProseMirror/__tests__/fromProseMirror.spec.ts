import { RichContent } from 'ricos-schema';
import migrationContent from '../../../../../statics/json/migratedFixtures/migration-content.json';
import { toProseMirror } from '../../toProseMirror/toProseMirror';
import { fromProseMirror } from '../fromProseMirror';

describe('convert from ProseMirror', () => {
  it('should convert content', () => {
    const content = fromProseMirror(toProseMirror(RichContent.fromJSON(migrationContent)));
    expect(content).toEqual(migrationContent);
  });
});
