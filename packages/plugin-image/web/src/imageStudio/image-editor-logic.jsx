import { getImageStudioPackage } from './image-studio-opener-loader';

async function setupImageEditor(imageEditorWixSettings, rootElementId, fileName, onSave, onClose) {
  const {
    MediaImageStudio,
    MediaImageStudioEvents,
    MediaImageStudioMode,
  } = await getImageStudioPackage();
  const mediaImageStudio = new MediaImageStudio({
    ...(await Promise.resolve(imageEditorWixSettings)),
    appendTo: document.querySelector(`[id=${rootElementId}]`),
  });
  const imageDataSubscription = mediaImageStudio.once(
    MediaImageStudioEvents.ImageData,
    imageData => {
      const file = blobToFile(imageData, fileName);
      onSave(file);
    }
  );

  mediaImageStudio.once(MediaImageStudioEvents.Close, () => {
    imageDataSubscription.remove();
    mediaImageStudio.kill();
    onClose();
  });

  mediaImageStudio.show({
    mode: MediaImageStudioMode.Transform,
    fileId: fileName,
  });
}

function blobToFile(blob, fileName) {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
}

export { setupImageEditor };
