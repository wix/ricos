export interface PreviewMetadata {
  allText: unknown[];
  textFragments: unknown[];
  galleryItems: unknown[];
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
