import { merge } from 'lodash';

export const createAbstractPanelSetter = <T>(obj: T, setter: (obj: T) => void) => (
  newObj: Partial<T>
) => setter(merge({ ...obj }, newObj));
