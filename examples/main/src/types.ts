import { PluginType, RichContentTheme } from 'wix-rich-content-common';

export type OnVisibilityChanged = (sectionName: string, isVisible: boolean) => void;

export interface SectionSettings {
  name: string;
  active?: any;
  getActive?: any;
  itemsType?: string;
  action: (item?: any, value?: any) => void;
  items?: string[];
}

export interface AddPluginMenuConfig {
  showSearch: boolean;
  splitToSections: boolean;
}

export interface FooterToolbarConfig {
  morePluginsMenu?: {
    splitToSections: boolean;
    showSearch: boolean;
  };
  pluginsToDisplayInToolbar?: string[];
}

export interface TestAppConfig {
  plugins?: string[];
  toolbarConfig?: {
    addPluginMenuConfig?: AddPluginMenuConfig;
    footerToolbarConfig?: FooterToolbarConfig;
  };
  pluginsConfig?: Record<PluginType, Record<string, string>>;
  consumer?: string;
  applyOuterStyle?: boolean;
  theme?: {
    paletteType?: 'light' | 'dark';
    skipCssOverride?: boolean;
    useCustomStyles?: boolean;
    fallbackColor?: string;
    disableContainer?: boolean;
    contentBgColor?: boolean;
  };
  showDefaultPreview?: boolean;
  isNativeUpload?: boolean;
}
