import get from 'lodash/get';
import { translate } from 'react-i18next';
import {
  BUTTONS,
  SizeSmallLeftIcon,
  SizeSmallCenterIcon,
  SizeSmallRightIcon,
} from 'wix-rich-content-common';
import { EditIcon } from '../icons';
import {
  MAX_ALIGNMENT_WIDTH,
  MIN_WIDTH,
  MAX_WIDTH,
  MIN_HEIGHT,
  MAX_HEIGHT,
  MAX_HEIGHT_INPUT,
  SRC_TYPE_HTML,
  SRC_TYPE_URL,
} from '../constants';
import EditPanel from './HtmlEditPanel';

const getAlignmentButtonProps = componentData => ({ disabled: get(componentData, 'config.width', 0) > MAX_ALIGNMENT_WIDTH });
const TOOLTIP_TEXT_BY_SRC_TYPE = {
  [SRC_TYPE_HTML]: 'HtmlPlugin_EditHtml_Tooltip',
  [SRC_TYPE_URL]: 'HtmlPlugin_EditUrl_Tooltip',
};
export default () => {
  return [
    {
      type: BUTTONS.INLINE_PANEL,
      keyName: 'edit',
      panelContent: translate(null)(EditPanel),
      icon: EditIcon,
      mapComponentDataToButtonProps: ({ src, srcType }) =>
        ({ tooltipTextKey: src ? TOOLTIP_TEXT_BY_SRC_TYPE[srcType] : 'HtmlPlugin_EditEmpty_Tooltip' }),
    },
    { type: BUTTONS.SEPARATOR, keyName: 'separator1' },
    { type: BUTTONS.WIDTH, keyName: 'width', min: MIN_WIDTH, max: MAX_WIDTH },
    { type: BUTTONS.HEIGHT, keyName: 'height', min: MIN_HEIGHT, max: MAX_HEIGHT, inputMax: MAX_HEIGHT_INPUT },
    { type: BUTTONS.SEPARATOR, keyName: 'separator2' },
    {
      type: BUTTONS.ALIGNMENT_LEFT,
      keyName: 'alignLeft',
      icon: SizeSmallLeftIcon,
      mapComponentDataToButtonProps: getAlignmentButtonProps,
    },
    {
      type: BUTTONS.ALIGNMENT_CENTER,
      keyName: 'alignCenter',
      icon: SizeSmallCenterIcon,
    },
    {
      type: BUTTONS.ALIGNMENT_RIGHT,
      keyName: 'alignRight',
      icon: SizeSmallRightIcon,
      mapComponentDataToButtonProps: getAlignmentButtonProps,
    },
    { type: BUTTONS.SEPARATOR, keyName: 'separator3' },
    { type: BUTTONS.DELETE, keyName: 'delete', mobile: true },
  ];
};
