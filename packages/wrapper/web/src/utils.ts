import { InitialState } from './RichContentWrapperTypes';

/* eslint-disable no-console */
export const assert = (predicate, message) => console.assert(predicate, message);
export const emptyState: InitialState = { blocks: [], entityMap: {} };
