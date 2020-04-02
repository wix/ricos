import { composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeDecoration from './Decorators/Resize';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import { simplePubsub } from 'wix-rich-content-editor-common';
import createHandleDrop from './handleDrop';
import createListPlugin from 'draft-js-list-plugin';

const createPlugins = ({ plugins, context }) => {
  const focusPlugin = createFocusPlugin();
  const resizePlugin = createResizeDecoration({
    horizontal: 'absolute',
    minWidth: 350,
    theme: context.theme,
    isMobile: context.isMobile,
  });

  const listPlugin = createListPlugin({ olRegex: /1\./ });

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
    commonPubsub: simplePubsub(),
    pluginDefaults,
    ...context,
    ...context.config,
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

  const pluginInstances = [resizePlugin, focusPlugin, dndPlugin, listPlugin, ...wixPlugins];

  return {
    pluginInstances,
    pluginButtons,
    pluginTextButtons,
    pluginStyleFns,
  };
};

export default createPlugins;
