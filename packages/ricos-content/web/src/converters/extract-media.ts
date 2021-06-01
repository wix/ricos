import { RichContent } from 'ricos-schema';
import { DraftContent, isDraftContent } from '../types/contentTypes';
import { fromDraft } from './draft/fromDraft/fromDraft';
import { getImageSrc } from '../imageUtils';
import { extract } from '../RicosContentAPI/extract';

const gifToSeoVideo = entityData => {
  const { mp4: videoContentUrl, thumbnail: videoThumbnailUrl } = entityData;
  return { videoThumbnailUrl, videoContentUrl, videoName: '' };
};

const mapImageData = (content: RichContent) =>
  extract(content.nodes)
    .map(({ imageData }) => imageData || {})
    .map(({ altText, caption, image = {} }) => ({
      imageAlt: altText || '',
      imageCaption: caption || '',
      imageHeight: image.height || 0,
      imageWidth: image.width || 0,
      imageUrl: image.src?.url || '',
    }))
    .map(data => ({
      ...data,
      imageUrl: getImageSrc({ file_name: data.imageUrl }, undefined, {
        imageType: 'highRes',
        requiredQuality: 90,
        requiredHeight: data.imageHeight,
        requiredWidth: data.imageWidth,
      }),
    }))
    .get();

const mapVideoData = (content: RichContent) =>
  extract(content.nodes)
    .map(({ videoData }) => videoData || {})
    .map(({ video = {}, thumbnail = {} }) => ({
      videoContentUrl: video.src?.url || '',
      videoThumbnailUrl: thumbnail.src?.url || '',
    }))
    .map(data => ({
      videoThumbnailUrl: data.videoThumbnailUrl.startsWith('media/')
        ? `https://static.wixstatic.com/${data.videoThumbnailUrl}`
        : data.videoThumbnailUrl,
      videoContentUrl: data.videoContentUrl.startsWith('video/')
        ? `https://video.wixstatic.com/${data.videoContentUrl}`
        : data.videoContentUrl,
    }))
    .get();

const mapGifToVideoData = (content: RichContent) =>
  extract(content.nodes)
    .map(({ giphyData }) => giphyData?.gif || {})
    .map(({ originalMp4 = '', stillUrl = '' }) => ({
      videoThumbnailUrl: stillUrl,
      videoContentUrl: originalMp4,
    }));

export const extractMedia = (content: RichContent | DraftContent) => {
  const richContent = isDraftContent(content) ? fromDraft(content) : content;
};
