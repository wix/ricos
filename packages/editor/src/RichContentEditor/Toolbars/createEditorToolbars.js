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
    t,
    refId
  } = config;
  const { pluginButtons, textButtons } = buttons;
  const pubsub = simplePubsub();
  const shouldCreateTextToolbar = !isMobile || baseUtils.isiOS();

  const toolbars = {
    side: createSideToolbar({
      refId,
      buttons: pluginButtons,
      offset: sideToolbarOffset,
      theme: { ...getToolbarTheme(theme, 'side'), ...theme },
      pubsub,
      isMobile
    }),
  };

  if (shouldCreateTextToolbar) {
    toolbars.textInline = createInlineTextToolbar({
      refId,
      buttons: textButtons,
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

  if (!isMobile && !hideFooterToolbar) {
    toolbars.footer = createFooterToolbar({
      refId,
      buttons: pluginButtons,
      theme: { ...getToolbarTheme(theme, 'footer'), ...theme },
    });
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
