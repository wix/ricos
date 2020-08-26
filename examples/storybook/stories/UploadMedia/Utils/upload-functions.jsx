import { getVideoToUpload } from '../../../../main/shared/utils/fileUploadUtil';
import { testImages, testWixVideos } from '../../../../main/shared/utils/mock';

const errors = [
  { key: 0 },
  { key: 1, args: { maxLimit: 150 } },
  { key: 5 },
  { msg: 'This is a custom error message' },
];

export const getMediaUploadErrorFunctions = () => {
  const handleFileUpload = (files, updateEntity) => {
    const mockImageIndex = Math.floor(Math.random() * testImages.length);
    const testItem = testImages[mockImageIndex];
    const data = {
      id: testItem.photoId,
      original_file_name: files && files[0] ? files[0].name : testItem.url,
      file_name: testItem.url,
      width: testItem.metadata.width,
      height: testItem.metadata.height,
    };
    const error = errors[Math.floor(Math.random() * errors.length)];
    setTimeout(() => {
      updateEntity({ data, error });
    }, 2000);
  };

  const handleVideoUpload = (file, updateEntity, removeEntity) => {
    const mockVideoIndex = Math.floor(Math.random() * testWixVideos.length);
    const testVideo = testWixVideos[mockVideoIndex];
    const videoToUpload = getVideoToUpload(testVideo.url, testVideo.metadata.posters[0].url);
    const error = errors[Math.floor(Math.random() * errors.length)];
    setTimeout(() => {
      updateEntity({ data: videoToUpload, error });
    }, 2000);
  };

  return { handleFileUpload, handleVideoUpload };
};
