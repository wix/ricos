import React, { useState } from 'react';
import { RicosEditor } from 'ricos-editor';
import { RichContentEditor } from 'wix-rich-content-editor';
import { RichContentEditorBox, Section, Page } from '../Components/StoryParts';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import { pluginVideo } from 'wix-rich-content-plugin-video';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload';
import MobileDetect from 'mobile-detect';
import {
  mockFileNativeUploadFunc,
  mockImageNativeUploadFunc,
  mockVideoNativeUploadFunc,
} from '../../../main/shared/utils/fileUploadUtil';
import ActionButton from '../Components/ActionButton';

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const plugins = [
  pluginImage(),
  pluginVideo({
    handleFileUpload: mockVideoNativeUploadFunc,
    getVideoUrl: src => `https://video.wixstatic.com/${src.pathname}`,
  }),
  pluginFileUpload({
    accept: '*',
    onFileSelected: mockFileNativeUploadFunc,
  }),
  pluginGallery(),
];

export default () => {
  const isMobile = mobileDetect.mobile() !== null;
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const onBusyChange = isUploading => setButtonDisabled(isUploading);

  return (
    <Page title="Ricos Media">
      <Section type={Section.Types.COMPARISON}>
        <RichContentEditorBox>
          <RicosEditor isMobile={isMobile} plugins={plugins} onBusyChange={onBusyChange}>
            <RichContentEditor helpers={{ handleFileUpload: mockImageNativeUploadFunc }} />
          </RicosEditor>
          <ActionButton
            text={'Publish'}
            tooltipText={isButtonDisabled && 'Uploading files'}
            onClick={() => alert('Published')}
            isDisabled={isButtonDisabled}
          />
        </RichContentEditorBox>
      </Section>
    </Page>
  );
};
