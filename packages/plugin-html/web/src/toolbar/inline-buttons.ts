import { translate } from 'react-i18next';
import {
  BUTTONS,
  SizeSmallLeftIcon,
  SizeSmallCenterIcon,
  SizeSmallRightIcon,
} from 'wix-rich-content-plugin-commons';
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
} from '../defaults';
import EditPanel from './HtmlEditPanel';
import { CreateInlineButtons, GetEditorBounds } from 'wix-rich-content-common';
import { HtmlPluginEditorConfig } from '../types';

const getAlignmentButtonPropsFn = getEditorBounds => ({ componentData }) => {
  const editorBounds = getEditorBounds?.();
  const maxAlignmentWidth = editorBounds ? editorBounds.width - 1 : MAX_ALIGNMENT_WIDTH;
  return {
    disabled: (componentData?.config?.width || 0) > maxAlignmentWidth,
  };
};

const TOOLTIP_TEXT_BY_SRC_TYPE = {
  [SRC_TYPE_HTML]: 'HtmlPlugin_EditHtml_Tooltip',
  [SRC_TYPE_URL]: 'HtmlPlugin_EditUrl_Tooltip',
};

const createInlineButtons: CreateInlineButtons = ({
  settings = {},
  getEditorBounds,
}: {
  settings: HtmlPluginEditorConfig;
  getEditorBounds: GetEditorBounds;
}) => {
  const {
    maxWidth,
    minWidth = MIN_WIDTH,
    maxHeight = MAX_HEIGHT,
    minHeight = MIN_HEIGHT,
  } = settings;
  const icons = settings?.toolbar?.icons || {};
  return [
    {
      type: BUTTONS.INLINE_PANEL,
      keyName: 'edit',
      panelContent: translate()(EditPanel),
      icon: icons.edit || EditIcon,
      mapComponentDataToButtonProps: ({ src, srcType }: { src: string; srcType: string }) => ({
        tooltipTextKey: src ? TOOLTIP_TEXT_BY_SRC_TYPE[srcType] : 'HtmlPlugin_EditEmpty_Tooltip',
      }),
    },
    { type: BUTTONS.SEPARATOR, keyName: 'separator1' },
    {
      type: BUTTONS.WIDTH,
      getEditorBounds,
      keyName: 'width',
      min: minWidth,
      mapStoreDataToPanelProps: () => {
        const bounds = getEditorBounds();
        if (bounds && bounds.width) {
          return { max: maxWidth ? Math.min(maxWidth, bounds.width) : bounds.width };
        } else {
          return { max: maxWidth || MAX_WIDTH };
        }
      },
    },
    {
      type: BUTTONS.HEIGHT,
      keyName: 'height',
      min: minHeight,
      max: maxHeight,
      inputMax: MAX_HEIGHT_INPUT,
    },
    { type: BUTTONS.SEPARATOR, keyName: 'separator2' },
    {
      type: BUTTONS.TEXT_ALIGN_LEFT,
      keyName: 'alignLeft',
      icon: icons.alignLeft || SizeSmallLeftIcon,
      mapStoreDataToButtonProps: getAlignmentButtonPropsFn(getEditorBounds),
    },
    {
      type: BUTTONS.TEXT_ALIGN_CENTER,
      keyName: 'alignCenter',
      icon: icons.alignCenter || SizeSmallCenterIcon,
    },
    {
      type: BUTTONS.TEXT_ALIGN_RIGHT,
      keyName: 'alignRight',
      icon: icons.alignRight || SizeSmallRightIcon,
      mapStoreDataToButtonProps: getAlignmentButtonPropsFn(getEditorBounds),
    },
    { type: BUTTONS.SEPARATOR, keyName: 'separator3' },
    { type: BUTTONS.DELETE, keyName: 'delete', mobile: true },
  ];
};

export default createInlineButtons;
