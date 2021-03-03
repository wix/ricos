/* eslint-disable fp/no-delete */
import { RicosEntityMap, RicosContentBlock } from '../../..';
import { TO_RICOS_DATA_FIELD, TO_RICOS_PLUGIN_TYPE } from '../consts';
import { convertBlockDataToRicos, keysToCamelCase } from './convertRicosPluginData';

export const getEntity = (key: string | number, entityMap: RicosEntityMap) => {
  const { type, data } = entityMap[key];
  const dataFieldName = TO_RICOS_DATA_FIELD[type];
  if (dataFieldName === undefined) {
    // eslint-disable-next-line no-console
    console.error(`ERROR! Unknown entity type "${type}"!`);
    process.exit(1);
  }

  return { type: TO_RICOS_PLUGIN_TYPE[type], [dataFieldName]: convertBlockDataToRicos(type, data) };
};

export const parseBlockData = (blockData?: RicosContentBlock['data']) => {
  const { textAlignment, dynamicStyles } = blockData || {};
  return Object.assign(
    {},
    textAlignment !== undefined ? { textAlignment: textAlignment.toUpperCase() } : undefined,
    dynamicStyles !== undefined
      ? {
          dynamicStyles: keysToCamelCase(dynamicStyles),
        }
      : undefined
  );
};
