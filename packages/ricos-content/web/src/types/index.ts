export type NormalizeConfig = {
  anchorTarget?: string;
  relValue?: string;
  disableInlineImages?: boolean;
  removeInvalidInlinePlugins?: boolean;
};

export interface ComponentData {
  config?: { alignment?: string; size?: string; url?: string; textWrap?: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src?: any;
  srcType?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

export type LinkRange = {
  text: string;
  index: number;
  lastIndex: number;
};

export * from './contentTypes';
