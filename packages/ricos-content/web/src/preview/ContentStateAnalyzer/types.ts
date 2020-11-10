import { RicosContent, RicosContentBlock, RicosEntity } from '../../types/contentTypes';

export type BlockFilter = (block: RicosContentBlock) => boolean;
export type BlockTypeFilter = (type: RicosContentBlock['type']) => boolean;

export interface TextBlockWithEntities {
  block: RicosContentBlock;
  entities: Record<string, RicosEntity>;
}

export interface SequentialBlockArrays {
  list: RicosContent['blocks'][];
  lastItemIndex: number;
}

export interface PluginData {
  mediaInfo?: RicosEntity['data'];
  config?: Record<string, unknown>;
  overrides?: Record<string, unknown>;
}
