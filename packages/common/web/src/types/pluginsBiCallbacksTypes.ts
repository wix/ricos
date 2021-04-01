import {
  TableEventsName,
  TableBiCallbacksParams,
  TableEventsParamsMappers,
} from './tableBiCallbacksTypes';

export type EventName = TableEventsName;
export type PluginEventParams = TableBiCallbacksParams;

export interface PluginsActionGenericParams {
  version: string;
  plugin_id: string;
}

interface EventsParamsMappers extends TableEventsParamsMappers {}

export type OnPluginAction = <K extends keyof EventsParamsMappers>(
  eventName: K,
  params: EventsParamsMappers[K]
) => void;
