export type NormalizeConfig = {
  anchorTarget?: string;
  relValue?: string;
  disableInlineImages?: boolean;
  removeInvalidInlinePlugins?: boolean;
};

export interface ComponentData {
  config?: {
    alignment?: string;
    size?: string;
    url?: string;
    textWrap?: string;
    width?: number | string;
  };
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NormalizationProcessor<T> = (processed: T, ...args: any[]) => T;

export * from './contentTypes';
