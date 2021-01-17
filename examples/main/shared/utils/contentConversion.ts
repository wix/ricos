import { fromDraft, toDraft } from 'ricos-content/libs/migrateSchema';
import { RicosContent } from 'ricos-schema';
import { RicosContent as RicosDraftContent } from 'wix-rich-content-common';

export const convertToDraft = (content: RicosContent | RicosDraftContent) =>
  'doc' in content ? toDraft(content) : content;

export const convertFromDraft = (content: RicosContent | RicosDraftContent) =>
  'blocks' in content ? fromDraft(content) : content;
