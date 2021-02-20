import getDisplayName from './getDisplayName';
import { ComponentType } from 'react';

export default function createHocName(hocComponentName: string, WrappedComponent: ComponentType) {
  return `${hocComponentName}(${getDisplayName(WrappedComponent)})`;
}
