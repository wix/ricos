import { PluginsActionGenericParams } from './pluginsBiCallbacksTypes';

interface TablePluginAddColumnRowParams extends PluginsActionGenericParams {
  category: string;
  location: string;
  source: string;
}

interface TablePluginDeleteColumnRowParams extends PluginsActionGenericParams {
  category: string;
}

interface TablePluginClickOnContextMenuParams extends PluginsActionGenericParams {
  category: string;
}

interface TablePluginClickActionFromOptionMenuParams extends PluginsActionGenericParams {
  category: string;
  actionName: string;
}

export type TableEventsName =
  | 'tablePluginAddColumnRow'
  | 'tablePluginDeleteColumnRow'
  | 'tablePluginClickOnOptionMenu'
  | 'tablePluginClickActionFromOptionMenu';
export interface TableEventsParamsMappers {
  tablePluginAddColumnRow: TablePluginAddColumnRowParams;
  tablePluginDeleteColumnRow: TablePluginDeleteColumnRowParams;
  tablePluginClickOnOptionMenu: TablePluginClickOnContextMenuParams;
  tablePluginClickActionFromOptionMenu: TablePluginClickActionFromOptionMenuParams;
}
