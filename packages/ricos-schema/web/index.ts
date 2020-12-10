import { RicosContent } from './generated/ricos-content';

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

export * from './generated/ricos_schema';
