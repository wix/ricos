import { getVideoToUpload } from '../../../../main/shared/utils/fileUploadUtil';
import { testImages, testWixVideos } from '../../../../main/shared/utils/mock';

const errors = [
  { key: 0 },
  { key: 1, args: { maxLimit: 150 } },
  { key: 5, args: { upgradeUrl: 'https://www.wix.com/' } },
  { msg: 'This is a custom error message' },
];

export const getMediaUploadErrorFunctions = () => {
  const handleImageUpload = (index, multiple, updateEntity, removeEntity, componentData) => {
    const shouldMultiSelectImages = false;
    const count = componentData.items || shouldMultiSelectImages ? [1, 2, 3] : [1];
    const data = [];
    count.forEach(_ => {
      const testItem = testImages[Math.floor(Math.random() * testImages.length)];
      data.push({
        id: testItem.photoId,
        original_file_name: testItem.url,
        file_name: testItem.url,
        width: testItem.metadata.width,
        height: testItem.metadata.height,
      });
    });
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

  const handleFileUpload = updateEntity => {
    const multiple = false;
    const count = multiple ? [1, 2, 3] : [1];
    const data = [];
    const filenames = ['image.jpg', 'document.pdf', 'music.mp3'];
    count.forEach(_ => {
      const name = filenames[Math.floor(Math.random() * filenames.length)];
      let type;
      if (name && name.includes('.')) {
        type = name.split('.').pop();
      }
      data.push({
        name,
        type,
        url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
        size: 150000,
      });
    });
    const error = errors[Math.floor(Math.random() * errors.length)];
    setTimeout(() => updateEntity({ data, error }), 500);
  };

  return { handleFileUpload, handleVideoUpload, handleImageUpload };
};
