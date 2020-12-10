import { RicosContent as RicosContentToolset } from './generated/ricos-content';

export const {
  create,
  encode,
  encodeDelimited,
  decode,
  decodeDelimited,
  verify,
  fromObject,
  toObject,
} = RicosContentToolset;

export * from './generated/ricos_schema';
