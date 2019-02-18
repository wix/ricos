import { composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';

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
}) => {
  const focusPlugin = createFocusPlugin();
  const dndPlugin = createBlockDndPlugin();

  const wixPluginsDecorators = composeDecorators(focusPlugin.decorator, dndPlugin.decorator);
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
    ...config,
  };
  const wixPlugins = (plugins || []).map(createPlugin => createPlugin(wixPluginConfig));

  let pluginButtons = [];
  let pluginTextButtons = [];
  let pubsubs = [];
  wixPlugins.forEach(wixPlugin => {
    pluginButtons = [...pluginButtons, ...(wixPlugin.InsertPluginButtons || [])];
    /* eslint-disable new-cap */
    pluginTextButtons = [
      ...pluginTextButtons,
      ...(wixPlugin.TextButtonMapper ? [wixPlugin.TextButtonMapper()] : []),
    ];
    /* eslint-enable new-cap */
    pubsubs = [...pubsubs, ...(wixPlugin.pubsub ? [wixPlugin.pubsub] : [])];
  });

  const pluginInstances = [focusPlugin, dndPlugin, ...wixPlugins];

  return {
    pluginInstances,
    pluginButtons,
    pluginTextButtons,
    pubsubs,
  };
};

export default createPlugins;
