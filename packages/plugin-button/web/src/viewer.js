import { typeMapper } from './typeMapper';
import { BUTTON_TYPE } from './constants';
export { typeMapper as buttonTypeMapper, BUTTON_TYPE };

const buttonViewer = {
  config: {},
  type: BUTTON_TYPE,
  typeMapper,
  decorator: {},
};

export default buttonViewer;
