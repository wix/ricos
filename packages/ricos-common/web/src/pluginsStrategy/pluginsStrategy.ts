import { ComponentType } from 'react';
import { merge, pick } from 'lodash'; // TODO: get rid of buggy merge
import { fold, struct } from 'fp-ts/Monoid';
import { last } from 'fp-ts/Semigroup';
import { getMonoid as arrayMonoid, map } from 'fp-ts/Array';
import { getMonoid as recordMonoid } from 'fp-ts/Record';
import { pipe } from 'fp-ts/function';
import {
  AvailableExperiments,
  CreatePluginFunction,
  DraftContent,
  EditorPlugin,
  InlineStyleMapper as InlineStyleMapping,
  PluginTypeMapper,
  ThemeData,
  ViewerPlugin,
} from 'wix-rich-content-common';
import { RCEPluginProps, RCVPluginProps, BasePlugin } from './pluginTypes';
import { RicosCssOverride, RichContentProps } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
type InlineStyleMapper = () => InlineStyleMapping;

const recordMergeM = <T>() => recordMonoid<string, T>(last<T>());
const rcvPropM = struct<RCVPluginProps>({
  config: recordMergeM<any>(),
  decorators: arrayMonoid<any>(),
  typeMappers: arrayMonoid<PluginTypeMapper>(),
  inlineStyleMappers: arrayMonoid<InlineStyleMapper>(),
});
const rcePropM = struct<RCEPluginProps>({
  config: recordMergeM<any>(),
  plugins: arrayMonoid<CreatePluginFunction>(),
  ModalsMap: recordMergeM<ComponentType>(),
  createPluginsDataMap: recordMergeM<any>(),
});

const extractChildRCVPluginProps = (
  { config = {}, typeMappers = [], decorators = [], inlineStyleMappers = [], theme = {} }: any,
  content?: DraftContent
): RCVPluginProps => ({
  config,
  typeMappers,
  decorators: decorators.map(decorator => decorator(theme, config)),
  inlineStyleMappers: content ? inlineStyleMappers.map(mapper => mapper(config, content)) : [],
});

const extractChildRCEPluginProps = (childProps: any): RCEPluginProps => ({
  ...rcePropM.empty,
  ...pick(childProps, ['config', 'ModalsMap', 'plugins', 'createPluginsDataMap']),
});

const toRCEPluginProps = (plugin: EditorPlugin): RCEPluginProps => ({
  config: { [plugin.type]: plugin.config },
  plugins: plugin.createPlugin ? [plugin.createPlugin] : [],
  ModalsMap: plugin.ModalsMap ?? {},
  createPluginsDataMap: { [plugin.type]: plugin.createPluginData },
});

const toRCVPluginProps = (cssOverride: RicosCssOverride, content?: DraftContent) => (
  plugin: ViewerPlugin
): RCVPluginProps => ({
  config: { [plugin.type]: plugin.config },
  typeMappers: plugin.typeMapper ? [plugin.typeMapper] : [],
  decorators: plugin.decorator ? [plugin.decorator(cssOverride, plugin.config)] : [],
  inlineStyleMappers:
    plugin.inlineStyleMapper && content ? [plugin.inlineStyleMapper(plugin.config, content)] : [],
});

const mergeWithChildProps = (childPluginProps, themeData) => pluginProps =>
  merge(pluginProps, childPluginProps, { config: { themeData } });

export default function pluginsStrategy({
  themeData,
  isViewer,
  plugins = [],
  childProps,
  cssOverride,
  content,
  experiments, // eslint-disable-line
}: {
  themeData: ThemeData;
  isViewer: boolean;
  plugins: BasePlugin[];
  childProps: RichContentProps;
  cssOverride: RicosCssOverride;
  content?: DraftContent;
  experiments?: AvailableExperiments;
}): RCEPluginProps | RCVPluginProps {
  return isViewer
    ? pipe(
        plugins as ViewerPlugin[],
        map(toRCVPluginProps(cssOverride, content)),
        fold(rcvPropM),
        mergeWithChildProps(extractChildRCVPluginProps(childProps, content), themeData)
      )
    : pipe(
        plugins as EditorPlugin[],
        map(toRCEPluginProps),
        fold(rcePropM),
        mergeWithChildProps(extractChildRCEPluginProps(childProps), themeData)
      );
}
