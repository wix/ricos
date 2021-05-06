import {
  TableEventsName,
  TableBiCallbacksParams,
  TableEventsParamsMappers,
} from './tableBiCallbacksTypes';

export type GenericEventsName = 'addPluginLink';
export type EventName = TableEventsName | GenericEventsName;
export type PluginEventParams = TableBiCallbacksParams;

export interface PluginsActionGenericParams {
  version: string;
  plugin_id: string;
}
interface AddPluginLinkParams extends PluginsActionGenericParams {
  category: string;
  link?: string;
  nofollow?: boolean;
  newTab?: string;
  anchor?: string;
}

export interface GenericParamsMappers {
  addPluginLink: AddPluginLinkParams;
}

interface EventsParamsMappers extends TableEventsParamsMappers, GenericParamsMappers {}

export type OnPluginAction = <K extends keyof EventsParamsMappers>(
  eventName: K,
  params: EventsParamsMappers[K]
) => void;
