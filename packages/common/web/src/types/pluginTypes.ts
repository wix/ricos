interface PluginMapping {
  component: ReactComponentType;
  classNameStrategies?: {
    size?: ClassNameStrategy;
    alignment?: ClassNameStrategy;
    textWrap?: ClassNameStrategy;
    container?: ContainerClassNameStrategy;
  };
  elementType?: 'inline' | 'block';
}

type PluginTypeMapper = () => { [type: string]: PluginMapping };
