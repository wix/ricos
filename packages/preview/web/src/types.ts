import { TextBlockWithEntities } from './ContentStateAnalyzer/types';
import ContentStateBuilder from './ContentStateBuilder/ContentStateBuilder';

export interface PreviewRule {
  _if: (metadata: PreviewMetadata) => boolean;
  _then: (metadata: PreviewMetadata, preview: ContentStateBuilder) => ContentStateBuilder;
}

export interface PreviewEntityData extends Record<string, unknown> {
  type: string;
}

export interface PreviewMedia {
  singleMediaItems: PreviewEntityData[];
  galleryItems: PreviewEntityData[];
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

export interface PreviewMetadata extends ExposedBlocks, ExposedGroupBlocks {
  allText: unknown[];
  textFragments: unknown[];
  media: PreviewMedia;
  images: unknown[];
  videos: unknown[];
  files: unknown[];
  maps: unknown[];
  links: unknown[];
  nonMediaPluginsCount: number;
}
