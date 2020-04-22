import { omit } from 'lodash';
export const butKey = obj => omit(obj, 'key');
export const but = (obj, keys) => omit(obj, keys);
