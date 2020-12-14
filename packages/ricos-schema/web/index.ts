import { RicosContentMessage } from './generated/ricos-content';

export const {
  create,
  encode,
  encodeDelimited,
  decode,
  decodeDelimited,
  verify,
  fromObject,
  toObject,
} = RicosContentMessage;

// eslint-disable-next-line no-duplicate-imports
export * from './generated/ricos-content';
