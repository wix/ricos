export interface Rule {
  _if: (metadata: PreviewMetadata) => boolean;
  _then: (metadata: PreviewMetadata, preview: Preview) => void;
}

export interface Media {
  singleMediaItems: unknown[];
  galleryItems: unknown[];
  totalCount: number;
}

export interface PreviewMetadata {
  allText: unknown[];
  textFragments: unknown[];
  media: Media;
  images: unknown[];
  videos: unknown[];
  files: unknown[];
  maps: unknown[];
  links: unknown[];
  nonMediaPluginsCount: number;
}

export interface Preview {
  gallery: (info: unknown) => unknown;
}
