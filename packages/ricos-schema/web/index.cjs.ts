import { RicosContent, google } from './generated/ricos-content.cjs';

export const {
  create,
  encode,
  encodeDelimited,
  decode,
  decodeDelimited,
  verify,
  fromObject,
  toObject,
} = RicosContent;

export type Timestamp = google.protobuf.Timestamp;

// eslint-disable-next-line no-duplicate-imports
export * from './generated/ricos-content.cjs';
