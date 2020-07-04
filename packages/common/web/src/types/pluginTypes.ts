import { ComponentType } from 'react';
import { ClassNameStrategy, ContainerClassNameStrategy } from './index';

interface PluginMapping {
  component: ComponentType;
  classNameStrategies?: {
    size?: ClassNameStrategy;
    alignment?: ClassNameStrategy;
    textWrap?: ClassNameStrategy;
    container?: ContainerClassNameStrategy;
  };
  elementType?: 'inline' | 'block';
}

export type PluginTypeMapper = () => { [type: string]: PluginMapping };
