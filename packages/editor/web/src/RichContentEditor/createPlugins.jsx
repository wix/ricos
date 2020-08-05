import { composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeDecoration from './Decorators/Resize';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createHandleDrop from './handleDrop';
import createListPlugin from 'draft-js-list-plugin';
import { SPOILER_TYPE } from 'wix-rich-content-common';

const createPlugins = ({ plugins, context, commonPubsub }) => {
  const focusPlugin = createFocusPlugin();
  const resizePlugin = createResizeDecoration({
    horizontal: 'absolute',
    minWidth: 20,
    theme: context.theme,
    isMobile: context.isMobile,
  });

  const listPlugin = createListPlugin({ olRegex: /1\./, allowNestedLists: false, ulChars: [] });

  const dndPlugin = createBlockDndPlugin();
  const handleDrop = dndPlugin.handleDrop;
  dndPlugin.handleDrop = createHandleDrop(handleDrop);

  const wixPluginsDecorators = composeDecorators(
    dndPlugin.decorator,
    resizePlugin.decorator,
    focusPlugin.decorator
  );

  const pluginDefaults = {};

  const spoilerPlugin = plugins?.find(plugin => plugin.spoilerEditorWrapper);
  const spoilerEditorWrapper = spoilerPlugin?.spoilerEditorWrapper;

  const wixPluginConfig = {
    decorator: wixPluginsDecorators,
    spoilerWrapper: spoilerEditorWrapper?.(context),
    commonPubsub,
    pluginDefaults,
    ...context,
    ...context.config,
  };

  if (spoilerPlugin) {
    const supportedPlugins = wixPluginConfig[SPOILER_TYPE]?.supportedPlugins;
    if (supportedPlugins) {
      supportedPlugins.forEach(plugin => (wixPluginConfig[plugin].spoiler = true));
    } else if (supportedPlugins === undefined) {
      Object.keys(context.config)
        .filter(element => element.includes('plugin'))
        .forEach(plugin => (wixPluginConfig[plugin].spoiler = true));
    }
  }

  const wixPlugins = (plugins || []).map(createPlugin => createPlugin(wixPluginConfig));

  let pluginButtons = [];
  let externalizedButtonProps = [];
  let pluginTextButtons = [];
  let pluginStyleFns = [];
  wixPlugins.forEach(wixPlugin => {
    const InsertPluginButtons = wixPlugin.InsertPluginButtons?.map(insertPluginButton => ({
      ...insertPluginButton,
      blockType: wixPlugin.blockType,
      key: insertPluginButton.name,
    }));
    externalizedButtonProps = [
      ...externalizedButtonProps,
      ...(wixPlugin.externalizedButtonProps || []),
    ];
    pluginButtons = [...pluginButtons, ...(InsertPluginButtons || [])];
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
    externalizedButtonProps,
  };
};

export default createPlugins;
