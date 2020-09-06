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
}
