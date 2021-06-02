import { curry, identity } from 'lodash/fp';
import { GalleryItem, RichContent } from 'ricos-schema';
import { DraftContent, isDraftContent } from '../types/contentTypes';
import { fromDraft } from './draft/fromDraft/fromDraft';
import { getImageSrc } from '../imageUtils';
import { extract } from '../RicosContentAPI/extract';

type ImageSeoData = {
  imageUrl: string;
  imageHeight: number;
  imageWidth: number;
  imageCaption?: string;
  imageAlt?: string;
};

type VideoSeoData = {
  videoContentUrl: string;
  videoThumbnailUrl: string;
};

const imageUrlToSrc = (data: ImageSeoData): ImageSeoData => ({
  ...data,
  imageUrl: getImageSrc({ file_name: data.imageUrl }, undefined, {
    imageType: 'highRes',
    requiredQuality: 90,
    requiredHeight: data.imageHeight,
    requiredWidth: data.imageWidth,
  }),
});

const videoUrlsToAbsolutePaths = (data: VideoSeoData): VideoSeoData => ({
  videoThumbnailUrl: data.videoThumbnailUrl.startsWith('media/')
    ? `https://static.wixstatic.com/${data.videoThumbnailUrl}`
    : data.videoThumbnailUrl,
  videoContentUrl: data.videoContentUrl.startsWith('video/')
    ? `https://video.wixstatic.com/${data.videoContentUrl}`
    : data.videoContentUrl,
});

const mapImageData = (content: RichContent) =>
  extract(content.nodes)
    .map(({ imageData }) => imageData || {})
    .map(
      ({ altText, caption, image = {} }): ImageSeoData => ({
        imageAlt: altText || '',
        imageCaption: caption || '',
        imageHeight: image.height || 0,
        imageWidth: image.width || 0,
        imageUrl: image.src?.url || '',
      })
    )
    .map(imageUrlToSrc)
    .get();

const mapVideoData = (content: RichContent) =>
  extract(content.nodes)
    .map(({ videoData }) => videoData || {})
    .map(
      ({ video = {}, thumbnail = {} }): VideoSeoData => ({
        videoContentUrl: video.src?.url || '',
        videoThumbnailUrl: thumbnail.src?.url || '',
      })
    )
    .map(videoUrlsToAbsolutePaths)
    .get();

const mapGifToVideoData = (content: RichContent) =>
  extract(content.nodes)
    .map(({ giphyData }) => ({
      videoThumbnailUrl: giphyData?.gif?.stillUrl || '',
      videoContentUrl: giphyData?.gif?.originalMp4 || '',
    }))
    .get();

const mapGalleriesToSeoData = curry(
  <T>(
    mapper: (item: GalleryItem) => T,
    filter: (item: GalleryItem) => boolean,
    content: RichContent
  ) =>
    extract(content.nodes)
      .map(({ galleryData }) => galleryData?.items || [])
      .map(items => items.filter(filter).map(mapper))
      .get()
      .flatMap<T, T>(identity)
);

const galleryImageMapper = (item: GalleryItem): ImageSeoData =>
  imageUrlToSrc({
    imageUrl: item.url || '',
    imageWidth: item.metadata?.width || 0,
    imageHeight: item.metadata?.height || 0,
    imageCaption: item.metadata?.title || '',
    imageAlt: '', // TODO: alt is missing in schema
  });

const galleryImageFilter = (item: GalleryItem) =>
  !!item.metadata && (item.metadata.type === 'image' || !item.metadata.type);

const galeryVideoFilter = (item: GalleryItem) => item.metadata?.type === 'video';

const galleryVideoMapper = (item: GalleryItem): VideoSeoData =>
  videoUrlsToAbsolutePaths({
    videoContentUrl: item.url || '',
    videoThumbnailUrl: '', // TODO: thumbnail is missing in schema
  });

export const extractMedia = (content: RichContent | DraftContent) => {
  const richContent = isDraftContent(content) ? fromDraft(content) : content;

  return [
    mapImageData,
    mapGalleriesToSeoData(galleryImageMapper, galleryImageFilter) as (
      content: RichContent
    ) => ImageSeoData[],
    mapVideoData,
    mapGifToVideoData,
    mapGalleriesToSeoData(galleryVideoMapper, galeryVideoFilter) as (
      content: RichContent
    ) => VideoSeoData[],
  ].reduce((data, fn) => [...data, ...fn(richContent)], []);
};
