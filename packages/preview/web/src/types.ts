import { TextBlockWithEntities } from './ContentStateAnalyzer/types';
import ContentStateBuilder from './ContentStateBuilder/ContentStateBuilder';

export interface PreviewRule {
  _if: (metadata: PreviewMetadata) => boolean;
  _then: (metadata: PreviewMetadata, preview: ContentStateBuilder) => ContentStateBuilder;
}

export interface PreviewMedia {
  singleMediaItems: unknown[];
  galleryItems: unknown[];
  totalCount: number;
}

export interface ExposedBlocks {
  h1: TextBlockWithEntities[];
  h2: TextBlockWithEntities[];
  h3: TextBlockWithEntities[];
  h4: TextBlockWithEntities[];
  h5: TextBlockWithEntities[];
  h6: TextBlockWithEntities[];
  quote: TextBlockWithEntities[];
}

export interface ExposedGroupBlocks {
  plain: TextBlockWithEntities[];
  code: TextBlockWithEntities[];
  ol: TextBlockWithEntities[];
  ul: TextBlockWithEntities[];
}

export interface PreviewMetadata {
  allText: unknown[];
  textFragments: unknown[];
  media: PreviewMedia;
  images: unknown[];
  videos: unknown[];
  files: unknown[];
  maps: unknown[];
  links: unknown[];
  nonMediaPluginsCount: number;
  blocks: ExposedBlocks;
  groupedBlocks: ExposedGroupBlocks;
}
