import { getImageStudioPackage } from './image-studio-opener-loader';
import { ExtendedBlob } from './image-editor';
import { ImageEditorWixSettings } from '../types';

async function setupImageEditor(
  imageEditorWixSettings: ImageEditorWixSettings,
  rootElementId: string,
  fileName: string,
  onSave: (file: ExtendedBlob) => void,
  onClose: () => void
) {
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

function blobToFile(blob: ExtendedBlob, fileName: string) {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
}

export { setupImageEditor };
