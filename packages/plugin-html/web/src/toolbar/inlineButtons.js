import { translate } from 'react-i18next';
import {
  BUTTONS,
  SizeSmallLeftIcon,
  SizeSmallCenterIcon,
  SizeSmallRightIcon,
} from 'wix-rich-content-editor-common';
import { EditIcon } from '../icons';
import { MAX_ALIGNMENT_WIDTH, SRC_TYPE_HTML, SRC_TYPE_URL } from '../constants';
import EditPanel from './HtmlEditPanel';

const getAlignmentButtonPropsFn = getEditorBounds => ({ componentData }) => {
  const editorBounds = getEditorBounds();
  const maxAlignmentWidth = editorBounds ? editorBounds.width - 1 : MAX_ALIGNMENT_WIDTH;
  return {
    disabled: (componentData?.config?.width || 0) > maxAlignmentWidth,
  };
};

const TOOLTIP_TEXT_BY_SRC_TYPE = {
  [SRC_TYPE_HTML]: 'HtmlPlugin_EditHtml_Tooltip',
  [SRC_TYPE_URL]: 'HtmlPlugin_EditUrl_Tooltip',
};

/**
 * createInlineButtons
 */
export default ({ settings = {}, getEditorBounds }) => {
  const icons = settings?.toolbar?.icons || {};
  return [
    {
      type: BUTTONS.INLINE_PANEL,
      keyName: 'edit',
      panelContent: translate(null)(EditPanel),
      icon: icons.edit || EditIcon,
      mapComponentDataToButtonProps: ({ src, srcType }) => ({
        tooltipTextKey: src ? TOOLTIP_TEXT_BY_SRC_TYPE[srcType] : 'HtmlPlugin_EditEmpty_Tooltip',
      }),
    },
    { type: BUTTONS.SEPARATOR, keyName: 'separator1' },
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
