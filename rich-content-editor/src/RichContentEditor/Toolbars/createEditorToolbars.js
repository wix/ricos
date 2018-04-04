import { baseUtils } from 'photography-client-lib/dist/src/utils/baseUtils';
import { createSideToolbar } from './SideToolbar';
import { createMobileToolbar, createFooterToolbar, createStaticTextToolbar } from './StaticToolbar';
import { createInlineTextToolbar } from './InlineToolbar';
import { simplePubsub, getToolbarTheme } from '~/Utils';

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
    t
  } = config;
  const { pluginButtons, textButtons } = buttons;
  const pubsub = simplePubsub();
  const shouldCreateTextToolbar = !isMobile || baseUtils.isiOS();

  const toolbars = {
    side: createSideToolbar({
      buttons: pluginButtons,
      offset: sideToolbarOffset,
      theme: { ...getToolbarTheme(theme, 'side'), ...theme },
      pubsub,
      isMobile
    }),
  };

  if (shouldCreateTextToolbar) {
    toolbars.textInline = createInlineTextToolbar({
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
      buttons: pluginButtons,
      theme: { ...getToolbarTheme(theme, 'footer'), ...theme },
    });
  } else {
    toolbars.mobile = createMobileToolbar({
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
