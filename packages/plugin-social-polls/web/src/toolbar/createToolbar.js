import {
  BUTTONS,
  BUTTON_TYPES,
  TOOLBARS,
  INSERT_PLUGIN_BUTTONS,
  getModalStyles,
  DECORATION_MODE,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
} from 'wix-rich-content-plugin-commons';

import { TABS } from '../components/settings';
import { DEFAULT_COMPONENT_DATA } from '../constants';
import { InsertPluginIcon } from '../assets/icons';
import { Modals } from '../modals';
import { PollPresetSelector, Arrow } from '../components/settings/preset-selector';

export const MobileFullScreenCustomStyle = Object.freeze({
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
});

export const DesktopFlyOutModalStyles = {
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    width: '450px',
    maxWidth: '450px',
    boxSizing: 'border-box',
    height: '220px',
    overflow: 'visible',
    border: '1px solid #ccc',
    padding: '20px 25px 25px 25px',
    display: 'block',
    borderRadius: '2px',
    position: 'absolute',
    margin: '0 0 0 20px',
    zIndex: 6,
  },
};

const modalStyles = {
  customStyles: {
    overlay: {
      backgroundColor: 'transparent',
      zIndex: 10,
    },
    content: {
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
    },
  },
};

const externalToolbarStyles = {
  content: {
    width: '450px',
    boxSizing: 'border-box',
    height: '220px',
    overflow: 'visible',
    display: 'block',
  },
};

export function createToolbar({ isMobile, settings, t }) {
  const buttonProps = {
    type: BUTTON_TYPES.MODAL,
    name: INSERT_PLUGIN_BUTTONS.POLLS,
    tooltip: t('Poll_InsertPoll_Tooltip'),
    getIcon: () => InsertPluginIcon,
    componentData: { ...DEFAULT_COMPONENT_DATA, ...{ ...settings, getSiteMembers: undefined } }, //Temporary fix until refactor of settings & componentData usage
    modalElement: decorateComponentWithProps(PollPresetSelector),
  };

  const modalStylesByToolbar = {
    [TOOLBARS.FOOTER]:
      isMobile &&
      getModalStyles({ customStyles: MobileFullScreenCustomStyle, fullScreen: true, isMobile }),
    [TOOLBARS.INSERT_PLUGIN]: isMobile
      ? getModalStyles({
          customStyles: MobileFullScreenCustomStyle,
          fullScreen: true,
          isMobile,
        })
      : getModalStyles({ customStyles: externalToolbarStyles, fullScreen: false, isMobile }),
  };

  return {
    InlineButtons: [
      ...(isMobile
        ? [
            {
              keyName: 'edit',
              type: BUTTONS.EXTERNAL_MODAL,
              modalName: Modals.POLL_SETTINGS,
              children: t('Poll_Mobile_Editor_Toolbar_Edit'),
              modalStyles: getModalStyles(modalStyles),
              t,
              activeTab: TABS.EDIT,
              mobile: true,
            },

            {
              keyName: 'customize',
              type: BUTTONS.EXTERNAL_MODAL,
              modalName: Modals.POLL_SETTINGS,
              children: t('Poll_Mobile_Editor_Toolbar_Customize'),
              modalStyles: getModalStyles(modalStyles),
              t,
              activeTab: TABS.DESIGN,
              mobile: true,
            },
          ]
        : [
            {
              keyName: 'layout',
              type: BUTTONS.EXTERNAL_MODAL,
              modalName: Modals.POLL_SETTINGS,
              children: t('Poll_PollSettings_Tab_Layout_TabName'),
              modalStyles: getModalStyles(modalStyles),
              t,
              tooltipTextKey: 'Poll_PollSettings_Common_Header',
              activeTab: TABS.LAYOUT,
              mobile: false,
            },

            { keyName: 'separator', mobile: false, type: BUTTONS.SEPARATOR },

            {
              keyName: 'design',
              type: BUTTONS.EXTERNAL_MODAL,
              modalName: Modals.POLL_SETTINGS,
              children: t('Poll_PollSettings_Tab_Design_TabName'),
              modalStyles: getModalStyles(modalStyles),
              t,
              tooltipTextKey: 'Poll_PollSettings_Common_Header',
              activeTab: TABS.DESIGN,
              mobile: false,
            },

            { keyName: 'separator', mobile: false, type: BUTTONS.SEPARATOR },

            {
              keyName: 'settings',
              type: BUTTONS.EXTERNAL_MODAL,
              modalName: Modals.POLL_SETTINGS,
              children: t('Poll_PollSettings_Tab_Settings_TabName'),
              modalStyles: getModalStyles(modalStyles),
              t,
              tooltipTextKey: 'Poll_FormatToolbar_Settings_Tooltip',
              activeTab: TABS.SETTINGS,
              mobile: false,
            },
          ]),

      { keyName: 'separator', mobile: true, type: BUTTONS.SEPARATOR },

      { keyName: 'delete', mobile: true, type: BUTTONS.DELETE },
    ],
    InsertButtons: [
      {
        ...buttonProps,
        toolbars: [TOOLBARS.FOOTER],
        modalStyles: modalStylesByToolbar[TOOLBARS.FOOTER],
        modalStylesFn: ({ buttonRef }) => {
          return getBottomToolbarModalStyles(buttonRef, {
            customStyles: DesktopFlyOutModalStyles,
            centered: true,
            isMobile,
          });
        },
        modalDecorations: [
          {
            decorationMode: DECORATION_MODE.APPEND,
            decorator: Arrow,
          },
        ],
      },
      {
        ...buttonProps,
        toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE],
        modalStyles: modalStylesByToolbar[TOOLBARS.INSERT_PLUGIN],
      },
    ],
    name: 'poll',
  };
}
