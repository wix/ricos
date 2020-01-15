import { composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeDecoration from './Decorators/Resize';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import { simplePubsub } from 'wix-rich-content-editor-common';
import createHandleDrop from './handleDrop';

const createPlugins = ({
  plugins,
  config,
  helpers,
  theme,
  t,
  isMobile,
  anchorTarget,
  relValue,
  getEditorState,
  setEditorState,
  getEditorBounds,
}) => {
  const focusPlugin = createFocusPlugin();
  const resizePlugin = createResizeDecoration({
    horizontal: 'absolute',
    minWidth: 350,
  });

  const dndPlugin = createBlockDndPlugin();
  const handleDrop = dndPlugin.handleDrop;
  dndPlugin.handleDrop = createHandleDrop(handleDrop);

  const wixPluginsDecorators = composeDecorators(
    dndPlugin.decorator,
    resizePlugin.decorator,
    focusPlugin.decorator
  );

  const pluginDefaults = {};

  const wixPluginConfig = {
    decorator: wixPluginsDecorators,
    helpers,
    theme,
    t,
    isMobile,
    anchorTarget,
    relValue,
    getEditorState,
    setEditorState,
    getEditorBounds,
    commonPubsub: simplePubsub(),
    pluginDefaults,
    ...config,
  };

  const wixPlugins = (plugins || []).map(createPlugin => createPlugin(wixPluginConfig));

  let pluginButtons = [];
  let pluginTextButtons = [];
  let pluginStyleFns = [];
  wixPlugins.forEach(wixPlugin => {
    pluginButtons = [...pluginButtons, ...(wixPlugin.InsertPluginButtons || [])];
    /* eslint-disable new-cap */
    pluginTextButtons = [
      ...pluginTextButtons,
      ...(wixPlugin.TextButtonMapper ? [wixPlugin.TextButtonMapper(wixPlugin.pubsub)] : []),
    ];
    /* eslint-enable new-cap */
    pluginStyleFns = [
      ...pluginStyleFns,
      ...(wixPlugin.customStyleFn ? [wixPlugin.customStyleFn] : []),
    ];
  });

  const pluginInstances = [resizePlugin, focusPlugin, dndPlugin, ...wixPlugins];

  return {
    pluginInstances,
    pluginButtons,
    pluginTextButtons,
    pluginStyleFns,
  };
};

export default createPlugins;
