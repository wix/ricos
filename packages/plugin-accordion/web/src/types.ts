const ACCORDION_TYPE = 'wix-rich-content-plugin-accordion';
export { Store } from 'wix-rich-content-common';
import { ContentState } from 'wix-rich-content-editor-common';

export interface Pair {
  key: number;
  title: ContentState;
  content: ContentState;
}

export interface ComponentData {
  config: { expandState: string; iconStyle: string; direction: string; expandOnlyOne: boolean };
  pairs: Pair[];
}

export interface PairState {
  isExpanded: boolean;
}

export { ACCORDION_TYPE, ContentState };
