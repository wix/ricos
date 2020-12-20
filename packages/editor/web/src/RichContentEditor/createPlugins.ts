import { EditorPlugin, composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'forked-draft-js-focus-plugin';
import createResizeDecoration from './Decorators/Resize';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createHandleDrop from './handleDrop';
import createExternalToolbarPlugin from './externalToolbarPlugin';
import createListPlugin from 'draft-js-list-plugin';
import { EditorProps, DraftDecorator } from 'draft-js';
import {
  CreatePluginFunction,
  CreatePluginConfig,
  EditorContextType,
  Pubsub,
  PluginsDecorator,
  ToolbarButtonProps,
  TextButtonMapping,
  PluginButton,
} from 'wix-rich-content-common';
import { SPOILER_TYPE } from 'ricos-content';

const enableSpoilerInConfig = (context, wixPluginConfig, spoilerWrapper) => {
  wixPluginConfig.spoilerWrapper = spoilerWrapper(context);
  const supportedPlugins = wixPluginConfig[SPOILER_TYPE]?.supportedPlugins;
  if (supportedPlugins) {
    supportedPlugins.forEach(plugin => (wixPluginConfig[plugin].spoiler = true));
  } else if (supportedPlugins === undefined) {
    Object.keys(context.config)
      .filter(key => key.includes('plugin'))
      .forEach(pluginType => {
        if (wixPluginConfig[pluginType]) {
          wixPluginConfig[pluginType].spoiler = true;
        }
      });
  }
};

const createPlugins = ({
  plugins,
  context,
  commonPubsub,
}: {
  plugins?: CreatePluginFunction[];
  context: EditorContextType;
  commonPubsub: Pubsub;
}): {
  pluginInstances: (
    | (EditorPlugin & { decorator?: DraftDecorator })
    | ReturnType<CreatePluginFunction>
  )[];
  pluginButtons: PluginButton[];
  pluginTextButtons: TextButtonMapping[];
  pluginStyleFns: EditorProps['customStyleFn'][];
  externalizedButtonProps: ToolbarButtonProps[];
} => {
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

  const pluginsDecorators = (composeDecorators(
    dndPlugin.decorator,
    resizePlugin.decorator,
    focusPlugin.decorator
    // due to incorrect type definition of composeDecorators
  ) as unknown) as PluginsDecorator;

  const externalToolbarPlugin = createExternalToolbarPlugin(commonPubsub);

  const pluginDefaults = {};

  const pluginConfig: CreatePluginConfig = {
    decorator: pluginsDecorators,
    commonPubsub,
    pluginDefaults,
    ...context,
    ...context.config,
  };

  const spoilerWrapper = context.config[SPOILER_TYPE]?.SpoilerEditorWrapper;
  if (spoilerWrapper) {
    enableSpoilerInConfig(context, pluginConfig, spoilerWrapper);
  }

  const ricosPlugins = (plugins || []).map(createPlugin => createPlugin(pluginConfig));

  const { buttons, textButtons, styleFns, pluginButtonProps } = ricosPlugins.reduce(
    (
      { buttons, textButtons, styleFns, pluginButtonProps },
      {
        InsertPluginButtons = [],
        TextButtonMapper = () => ({}),
        customStyleFn,
        insertButtonProps = [],
        pubsub,
      },
      index
    ) => {
      console.log(ricosPlugins[index]);
      return {
        buttons: [...buttons, ...InsertPluginButtons],
        textButtons: { ...textButtons, ...TextButtonMapper(pubsub) }, // eslint-disable-line
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

  const pluginInstances = [
    resizePlugin,
    focusPlugin,
    dndPlugin,
    listPlugin,
    externalToolbarPlugin,
    ...ricosPlugins,
  ];

  return {
    pluginInstances,
    buttons,
    textButtons,
    styleFns,
    pluginButtonProps,
  };
};

export default createPlugins;
