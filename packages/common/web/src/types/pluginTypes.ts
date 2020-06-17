interface PluginMapping {
  component: ReactComponentType;
  classNameStrategies?: {
    size?: ClassNameStrategy;
    alignment?: ClassNameStrategy;
    textWrap?: ClassNameStrategy;
    container?: ClassNameStrategy;
  };
  elementType?: 'inline' | 'block';
}

type PluginTypeMapper = () => { [type: string]: PluginMapping };
