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
    //For Accordion, might changed
    expandState?: string;
    direction?: string;
    expandOnlyOne?: boolean;
    //For Link, might changed
    linkTypes?: { anchor: boolean };
    //For Video, might changed
    toolbar?: { hidden: never[] };
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
