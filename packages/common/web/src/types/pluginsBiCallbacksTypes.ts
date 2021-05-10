import { TableEventsName, TableEventsParamsMappers } from './tableBiCallbacksTypes';

export type GenericEventsName =
  | 'addPluginLink'
  | 'settingsModalOpenedForPlugin'
  | 'settingsModalClosedForPlugin';
export type EventName = TableEventsName | GenericEventsName;

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

interface SettingsModalParams extends PluginsActionGenericParams {
  settingSessionId: string;
}

export interface GenericParamsMappers {
  addPluginLink: AddPluginLinkParams;
  settingsModalOpenedForPlugin: SettingsModalParams;
  settingsModalClosedForPlugin: SettingsModalParams;
}

interface EventsParamsMappers extends TableEventsParamsMappers, GenericParamsMappers {}

export type OnPluginAction = <K extends keyof EventsParamsMappers>(
  eventName: K,
  params: EventsParamsMappers[K]
) => void;
