import { TOOLBARS, DISPLAY_MODE } from 'wix-rich-content-common';
import { createSideToolbar } from './SideToolbar';
import { createMobileToolbar, createFooterToolbar, createStaticTextToolbar } from './StaticToolbar';
import { createInlineTextToolbar } from './InlineToolbar';

const defaultInlineToolbarVisibilityFn = editorState => {
  const selection = editorState.getSelection();
  return !selection.isCollapsed() && selection.getHasFocus();
};

const defaultSideToolbarVisibilityFn = editorState => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();
  const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
  const type = currentBlock.getType();
  return type !== 'atomic' && type !== 'code-block';
};

const defaultDisplayOptions = {
  desktop: { displayMode: DISPLAY_MODE.NORMAL },
  mobile: {
    ios: { displayMode: DISPLAY_MODE.NORMAL },
    android: { displayMode: DISPLAY_MODE.NORMAL },
  },
};

const defaultToolbarDecorationFn = {
  desktop: () => null,
  mobile: {
    ios: () => null,
    android: () => null,
  },
};

const defaultOffset = {
  desktop: { x: 0, y: 0 },
  mobile: {
    ios: { x: 0, y: 0 },
    android: { x: 0, y: 0 },
  },
};

const defaultTextPluginButtons = {
  desktop: {},
  mobile: {
    ios: {},
    android: {},
  },
};

export const getDefaultToolbarSettings = ({ pluginButtons, textButtons, pluginTextButtons }) => {
  return [
    {
      name: TOOLBARS.SIDE,
      shouldCreate: () => {
        const shouldCreate =
          pluginButtons.filter(({ buttonSettings }) =>
            buttonSettings.toolbars.includes(TOOLBARS.SIDE)
          ).length > 0;
        return {
          desktop: shouldCreate,
          mobile: {
            ios: shouldCreate,
            android: shouldCreate,
          },
        };
      },
      getPositionOffset: () => ({
        desktop: { x: -40, y: 0 },
        mobile: {
          ios: { x: 0, y: 0 },
          android: { x: 0, y: 0 },
        },
      }),
      getDisplayOptions: () => defaultDisplayOptions,
      getToolbarDecorationFn: () => defaultToolbarDecorationFn,
      getButtons: () => {
        const buttons = pluginButtons
          .filter(({ buttonSettings }) => buttonSettings.toolbars.includes(TOOLBARS.SIDE))
          .map(({ component }) => component);
        return {
          desktop: buttons,
          mobile: {
            ios: buttons,
            android: buttons,
          },
        };
      },
      getTextPluginButtons: () => defaultTextPluginButtons,
      getVisibilityFn: () => ({
        desktop: defaultSideToolbarVisibilityFn,
        mobile: {
          ios: defaultSideToolbarVisibilityFn,
          android: defaultSideToolbarVisibilityFn,
        },
      }),
      getInstance: createSideToolbar,
    },
    {
      name: TOOLBARS.MOBILE,
      shouldCreate: () => ({
        desktop: false,
        mobile: {
          ios: true,
          android: true,
        },
      }),
      getPositionOffset: () => defaultOffset,
      getDisplayOptions: () => defaultDisplayOptions,
      getToolbarDecorationFn: () => defaultToolbarDecorationFn,
      getButtons: () => {
        return {
          desktop: [],
          mobile: {
            ios: textButtons.mobile,
            android: textButtons.mobile,
          },
        };
      },
      getTextPluginButtons: () => ({
        desktop: [],
        mobile: {
          ios: pluginTextButtons.mobile,
          android: pluginTextButtons.mobile,
        },
      }),
      getVisibilityFn: () => ({
        desktop: () => false,
        mobile: {
          ios: () => true,
          android: () => true,
        },
      }),
      getInstance: createMobileToolbar,
    },
    {
      name: TOOLBARS.FOOTER,
      shouldCreate: () => ({
        desktop:
          pluginButtons.filter(({ buttonSettings }) =>
            buttonSettings.toolbars.includes(TOOLBARS.FOOTER)
          ).length > 0,
        mobile: {
          ios: false,
          android: false,
        },
      }),
      getPositionOffset: () => defaultOffset,
      getDisplayOptions: () => defaultDisplayOptions,
      getToolbarDecorationFn: () => defaultToolbarDecorationFn,
      getButtons: () => {
        const buttons = pluginButtons
          .filter(({ buttonSettings }) => buttonSettings.toolbars.includes(TOOLBARS.FOOTER))
          .map(({ component }) => component);
        return {
          desktop: buttons,
          mobile: {
            ios: [],
            android: [],
          },
        };
      },
      getTextPluginButtons: () => defaultTextPluginButtons,
      getVisibilityFn: () => ({
        desktop: () => true,
        mobile: {
          ios: () => false,
          android: () => false,
        },
      }),
      getInstance: createFooterToolbar,
    },
    {
      name: TOOLBARS.STATIC,
      shouldCreate: () => ({
        desktop: true,
        mobile: {
          ios: true,
          android: false,
        },
      }),
      getPositionOffset: () => defaultOffset,
      getDisplayOptions: () => defaultDisplayOptions,
      getToolbarDecorationFn: () => defaultToolbarDecorationFn,
      getButtons: () => ({
        desktop: textButtons.desktop,
        mobile: {
          ios: [],
          android: [],
        },
      }),
      getTextPluginButtons: () => ({
        desktop: pluginTextButtons.desktop,
        mobile: {
          ios: {},
          android: {},
        },
      }),
      getVisibilityFn: () => ({
        desktop: () => true,
        mobile: {
          ios: () => true,
          android: () => false,
        },
      }),
      getInstance: createStaticTextToolbar,
    },
    {
      name: TOOLBARS.INLINE,
      shouldCreate: () => ({
        desktop: true,
        mobile: {
          ios: false,
          android: false,
        },
      }),
      getPositionOffset: () => defaultOffset,
      getDisplayOptions: () => defaultDisplayOptions,
      getToolbarDecorationFn: () => defaultToolbarDecorationFn,
      getButtons: () => ({
        desktop: textButtons.desktop,
        mobile: {
          ios: textButtons.mobile,
          android: [],
        },
      }),
      getTextPluginButtons: () => ({
        desktop: pluginTextButtons.desktop,
        mobile: {
          ios: pluginTextButtons.mobile,
          android: {},
        },
      }),
      getVisibilityFn: () => ({
        desktop: defaultInlineToolbarVisibilityFn,
        mobile: {
          ios: defaultInlineToolbarVisibilityFn,
          android: defaultInlineToolbarVisibilityFn,
        },
      }),
      getInstance: createInlineTextToolbar,
    },
  ];
};
