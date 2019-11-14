import { composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeDecoration from './Decorators/Resize';
import { draftPluginNames } from '../consts.js';

const createPlugins = ({
  plugins,
  config,
  helpers,
  theme,
  t,
  isMobile,
  anchorTarget,
  relValue,
  onAtomicBlockFocus,
  getEditorState,
  setEditorState,
  getEditorBounds,
}) => {
  const focusPlugin = createFocusPlugin();
  const resizePlugin = createResizeDecoration({
    horizontal: 'absolute',
    minWidth: 350,
  });

  const draftPlugins = plugins?.filter(plugin => draftPluginNames.includes(plugin.name));

  const dndPlugin = draftPlugins?.find(plugin => plugin.name === 'createBlockDndPlugin')?.();

  const wixPluginsDecorators = [resizePlugin.decorator, focusPlugin.decorator];
  const pluginInstances = [resizePlugin, focusPlugin];

  if (dndPlugin) {
    wixPluginsDecorators.push(dndPlugin.decorator);
    pluginInstances.push(dndPlugin);
  }

  const wixPluginConfig = {
    decorator: composeDecorators(...wixPluginsDecorators),
    helpers,
    theme,
    t,
    isMobile,
    anchorTarget,
    relValue,
    onAtomicBlockFocus,
    getEditorState,
    setEditorState,
    getEditorBounds,
    ...config,
  };

  const wixPlugins = (plugins || [])
    ?.filter(plugin => !draftPluginNames.includes(plugin.name))
    .map(createPlugin => createPlugin(wixPluginConfig));

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

  pluginInstances.push(...wixPlugins);

  return {
    pluginInstances,
    pluginButtons,
    pluginTextButtons,
    pubsubs,
    pluginStyleFns,
  };
};

export default createPlugins;
