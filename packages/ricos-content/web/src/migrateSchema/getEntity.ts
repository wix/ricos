import { RicosEntityMap } from '..';
import { Node } from './types';

export const getEntity = (key: string | number, entityMap: RicosEntityMap): Node => {
  const { type, data } = entityMap[key];
  return { type, data };
};
