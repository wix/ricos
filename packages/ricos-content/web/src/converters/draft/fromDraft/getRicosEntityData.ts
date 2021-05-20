import { pickBy, identity } from 'lodash';
/* eslint-disable fp/no-delete */
import { TextStyle, NodeStyle } from 'ricos-schema';
import { RicosEntityMap, RicosContentBlock } from '../../..';
import { TO_RICOS_DATA_FIELD, TO_RICOS_PLUGIN_TYPE } from '../consts';
import { convertBlockDataToRicos } from './convertRicosPluginData';

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

export const getTextStyle = (blockData?: RicosContentBlock['data']): TextStyle => {
  const { textAlignment, dynamicStyles } = blockData || {};
  const { 'line-height': lineHeight, 'padding-top': paddingTop, 'padding-bottom': paddingBottom } =
    dynamicStyles || {};
  return { textAlignment: textAlignment?.toUpperCase(), lineHeight, paddingTop, paddingBottom };
};

export const getNodeStyle = (blockData?: RicosContentBlock['data']): NodeStyle | undefined => {
  const { dynamicStyles } = blockData || {};
  const { 'padding-top': paddingTop, 'padding-bottom': paddingBottom, backgroundColor } =
    dynamicStyles || {};
  const style = pickBy({ paddingTop, paddingBottom, backgroundColor }, identity);
  const hasStyle = Object.values(style).length > 0;
  return hasStyle ? style : undefined;
};
