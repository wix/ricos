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
    minWidth: 20,
    theme: context.theme,
    isMobile: context.isMobile,
  });

  const listPlugin = createListPlugin({ olRegex: /1\./, allowNestedLists: false });

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

  const ricosPlugins = (plugins || []).map(createPlugin => createPlugin(wixPluginConfig));

  const { buttons, textButtons, styleFns, pluginButtonProps } = ricosPlugins.reduce(
    (
      { buttons, textButtons, styleFns, pluginButtonProps },
      {
        InsertPluginButtons = [],
        TextButtonMapper = () => [],
        customStyleFn,
        insertButtonProps = [],
        pubsub,
      }
    ) => {
      return {
        buttons: [...buttons, ...InsertPluginButtons],
        textButtons: [...textButtons, ...TextButtonMapper(pubsub)], // eslint-disable-line
        styleFns: [...styleFns, customStyleFn],
        pluginButtonProps: [...pluginButtonProps, ...insertButtonProps],
      };
    },
    {
      buttons: [],
      textButtons: [],
      styleFns: [],
      pluginButtonProps: [],
    }
  );

  const pluginInstances = [resizePlugin, focusPlugin, dndPlugin, listPlugin, ...ricosPlugins];

  return {
    pluginInstances,
    buttons,
    textButtons,
    styleFns,
    pluginButtonProps,
  };
};

export default createPlugins;
