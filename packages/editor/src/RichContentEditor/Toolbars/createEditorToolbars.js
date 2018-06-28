import { baseUtils } from 'photography-client-lib/dist/src/utils/baseUtils';
import { createSideToolbar } from './SideToolbar';
import { createMobileToolbar, createFooterToolbar, createStaticTextToolbar } from './StaticToolbar';
import { createInlineTextToolbar } from './InlineToolbar';
import { simplePubsub, getToolbarTheme } from 'wix-rich-content-common';

const createEditorToolbars = config => {
  const {
    buttons,
    anchorTarget,
    relValue,
    // textToolbarType,
    hideFooterToolbar,
    sideToolbarOffset,
    helpers,
    isMobile,
    theme,
    getEditorState,
    setEditorState,
    textAlignment,
    t,
    refId
  } = config;
  const { pluginButtons, textButtons } = buttons;
  const sideToolbarPluginButtons = pluginButtons && pluginButtons
    .filter(({ originalConfig }) => originalConfig.addToSideToolbar !== false)
    .map(({ component }) => component);
  const footerToolbarPluginButtons = pluginButtons && pluginButtons
    .filter(({ originalConfig }) => originalConfig.addToFooterToolbar !== false)
    .map(({ component }) => component);
  const pubsub = simplePubsub();
  const shouldCreateSidePluginToolbar = pluginButtons && sideToolbarPluginButtons.length;
  const shouldCreateFooterPluginToolbar = pluginButtons && footerToolbarPluginButtons.length;
  const shouldCreateTextToolbar = !isMobile || baseUtils.isiOS();

  const toolbars = {};
  if (shouldCreateSidePluginToolbar) {
    toolbars.side = createSideToolbar({
      refId,
      buttons: sideToolbarPluginButtons,
      offset: sideToolbarOffset,
      theme: { ...getToolbarTheme(theme, 'side'), ...theme },
      pubsub,
      isMobile
    });
  }

  if (shouldCreateTextToolbar) {
    toolbars.textInline = createInlineTextToolbar({
      refId,
      buttons: textButtons,
      defaultTextAlignment: textAlignment,
      theme: { ...getToolbarTheme(theme, 'inline'), ...theme },
      anchorTarget,
      relValue,
      pubsub,
      isMobile,
      helpers,
      t,
    });
    toolbars.textStatic = createStaticTextToolbar({
      refId,
      buttons: textButtons,
      theme: { ...getToolbarTheme(theme, 'text'), ...theme },
      anchorTarget,
      relValue,
      pubsub,
      isMobile,
      helpers,
      t,
    });
  }

  if (!isMobile) {
    if (shouldCreateFooterPluginToolbar && !hideFooterToolbar) {
      toolbars.footer = createFooterToolbar({
        refId,
        buttons: footerToolbarPluginButtons,
        theme: { ...getToolbarTheme(theme, 'footer'), ...theme },
      });
    }
  } else {
    toolbars.mobile = createMobileToolbar({
      refId,
      anchorTarget,
      relValue,
      buttons,
      helpers,
      pubsub,
      getEditorState,
      setEditorState,
      t,
      theme: { ...getToolbarTheme(theme, 'mobile'), ...theme },
    });
  }

  return toolbars;
};

export default createEditorToolbars;
