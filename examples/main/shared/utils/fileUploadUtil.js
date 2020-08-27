import { testImages, testWixVideos } from './mock';

export const mockImageNativeUploadFunc = (files, updateEntity) => {
  const mockImageIndex = Math.floor(Math.random() * testImages.length);
  const testItem = testImages[mockImageIndex];
  const data = {
    id: testItem.photoId,
    original_file_name: files && files[0] ? files[0].name : testItem.url,
    file_name: testItem.url,
    width: testItem.metadata.width,
    height: testItem.metadata.height,
  };
  setTimeout(() => {
    updateEntity({ data, files });
    console.log('consumer uploaded', data);
  }, 5000);
};

export const mockImageUploadFunc = (index, multiple, updateEntity, removeEntity, componentData) => {
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
  const error = { key: 0 };
  setTimeout(() => {
    updateEntity({ data, error });
  }, 500);
};

export const mockFileNativeUploadFunc = (file, updateEntity) => {
  const name = file.name;
  const filenameParts = name.split('.');
  const type = filenameParts[filenameParts.length - 1];

  const data = {
    name,
    type,
    url: '',
  };
  setTimeout(() => updateEntity({ data }), 5000);
};

export const mockFileUploadFunc = updateEntity => {
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
  setTimeout(() => updateEntity({ data }), 500);
};

export const mockCustomVideoUploadFunc = (updateEntity, removeEntity) => {
  console.log('consumer wants to upload custom video');
  const videoToUpload = getVideoToUpload(
    '11062b_a552731f40854d16a91627687fb8d1a6',
    '11062b_a552731f40854d16a91627687fb8d1a6f000.jpg'
  );
  setTimeout(() => {
    updateEntity({ data: videoToUpload });
    console.log('consumer uploaded ', videoToUpload);
  }, 500);
};

export const mockVideoNativeUploadFunc = (file, updateEntity, removeEntity) => {
  console.log('consumer wants to upload custom video', file);
  const mockVideoIndex = Math.floor(Math.random() * testWixVideos.length);
  const testVideo = testWixVideos[mockVideoIndex];
  const videoToUpload = getVideoToUpload(testVideo.url, testVideo.metadata.posters[0].url);
  setTimeout(() => {
    updateEntity({ data: videoToUpload });
    console.log('consumer uploaded ', videoToUpload);
  }, 5000);
};

export const getVideoToUpload = (url, thumbnailUrl) => {
  const videoWithAbsoluteUrl = {
    url:
      'https://video.wixstatic.com/video/11062b_a552731f40854d16a91627687fb8d1a6/1080p/mp4/file.mp4',
  };
  const videoWithRelativeUrl = {
    pathname: `video/${url}/1080p/mp4/file.mp4`,
    thumbnail: {
      pathname: `media/${thumbnailUrl}`,
      height: 1080,
      width: 1920,
    },
  };
  // You can provide either absolute or relative URL.
  // If relative URL is provided, a function 'getVideoUrl' will be invoked to form a full URL.
  return videoWithRelativeUrl;
};
