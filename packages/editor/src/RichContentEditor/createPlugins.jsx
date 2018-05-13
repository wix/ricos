import { composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';

const createPlugins = ({ plugins, config, helpers, theme, t, isMobile, anchorTarget, relValue }) => {
  const focusPlugin = createFocusPlugin();
  const dndPlugin = createBlockDndPlugin();

  const wixPluginsDecorators = composeDecorators(focusPlugin.decorator, dndPlugin.decorator);
  const wixPluginConfig = { decorator: wixPluginsDecorators, helpers, theme, t, isMobile, anchorTarget, relValue, ...config };
  const wixPlugins = (plugins || []).map(createPlugin => createPlugin(wixPluginConfig));

  const pluginButtons = [];
  wixPlugins.forEach(wixPlugin => {
    wixPlugin.InsertPluginButtons && wixPlugin.InsertPluginButtons.forEach(insertPluginButton => {
      pluginButtons.push(insertPluginButton);
    });
  });

  const pluginInstances = [
    focusPlugin,
    dndPlugin,
    ...wixPlugins,
  ];

  return {
    pluginInstances,
    pluginButtons
  };
};

export default createPlugins;
