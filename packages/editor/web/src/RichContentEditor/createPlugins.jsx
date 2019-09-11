import { composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeDecoration from './Decorators/Resize';
// import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';

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
  // const dndPlugin = createBlockDndPlugin();

  const wixPluginsDecorators = composeDecorators(resizePlugin.decorator, focusPlugin.decorator);

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
    ...config,
  };
  const wixPlugins = (plugins || []).map(createPlugin => createPlugin(wixPluginConfig));

  let pluginButtons = [];
  let pluginTextButtons = [];
  let pubsubs = [];
  let pluginStyleFns = [];
  wixPlugins.forEach(wixPlugin => {
    pluginButtons = [...pluginButtons, ...(wixPlugin.InsertPluginButtons || [])];
    /* eslint-disable new-cap */
    pluginTextButtons = [
      ...pluginTextButtons,
      ...(wixPlugin.TextButtonMapper ? [wixPlugin.TextButtonMapper()] : []),
    ];
    /* eslint-enable new-cap */
    pubsubs = [...pubsubs, ...(wixPlugin.pubsub ? [wixPlugin.pubsub] : [])];
    pluginStyleFns = [
      ...pluginStyleFns,
      ...(wixPlugin.customStyleFn ? [wixPlugin.customStyleFn] : []),
    ];
  });

  const pluginInstances = [focusPlugin, resizePlugin, ...wixPlugins];

  return {
    pluginInstances,
    pluginButtons,
    pluginTextButtons,
    pubsubs,
    pluginStyleFns,
  };
};

export default createPlugins;
