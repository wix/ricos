import getDisplayName from './getDisplayName';

export default function createHocName(hocComponentName, WrappedComponent) {
  return `${hocComponentName}(${getDisplayName(WrappedComponent)})`;
}
