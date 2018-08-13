declare type ElementType = "inline" | "block";

declare type PluginMapping = {
  component: Component,
  classNameStrategies?: {
    size?: Function,
    alignment?: Function,
    textWrap?: Function,
    container?: Function
  },
  elementType?: ElementType
};

declare type PluginTypeMapper = () => { [type: string]: PluginMapping };
