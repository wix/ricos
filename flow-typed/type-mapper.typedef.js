/*::
declare type ElementType = "inline" | "block";

declare type PluginMapping = {
  component: Component,
  classNameStrategies?: {
    size?: ClassNameStrategy,
    alignment?: ClassNameStrategy,
    textWrap?: ClassNameStrategy,
    container?: ClassNameStrategy
  },
  elementType?: ElementType
};

declare type PluginTypeMapper = () => { [type: string]: PluginMapping };
*/
