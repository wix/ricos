import { RichContent } from 'ricos-schema';
import migrationContent from '../../../../../statics/json/migratedFixtures/migration-content.json';
import migrationContentProse from './migrationContentProse.json';
import { toProseMirror } from '../toProseMirror';

describe('convert to ProseMirror', () => {
  it('should convert content', () => {
    const proseDocument = toProseMirror(RichContent.fromJSON(migrationContent));
    expect(proseDocument).toEqual(migrationContentProse);
  });
});
