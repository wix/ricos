import React from 'react';
import PropTypes from 'prop-types';
import { MediaUploadErrorKey } from 'wix-rich-content-common';
import { Trans } from 'react-i18next';
import Toast from './Toast';

const errorMap = {
  [MediaUploadErrorKey.GENERIC]: 'UploadFile_Error_Generic_Toast',
  [MediaUploadErrorKey.QUOTA_STORAGE_VISITOR]: 'UploadFile_Error_StorageExceeded_Visitor',
  [MediaUploadErrorKey.QUOTA_STORAGE_OWNER]: 'UploadFile_Error_StorageExceeded_SiteOwner',
  [MediaUploadErrorKey.QUOTA_VIDEO_VISITOR]: 'UploadVideo_Error_StorageExceeded_Visitor',
  [MediaUploadErrorKey.QUOTA_VIDEO_OWNER]: 'UploadVideo_Error_StorageExceeded_SiteOwner',
  [MediaUploadErrorKey.SIZE_LIMIT]: 'UploadFile_Error_Size_Toast',
  [MediaUploadErrorKey.QUOTA_SINGLE_VIDEO_OWNER]: 'UploadVideo_Error_Video_Duration_SiteOwner',
  [MediaUploadErrorKey.MIME_TYPE_MISMATCH]: 'UploadFile_Error_Mimetype_Mismatch',
  [MediaUploadErrorKey.QUOTA_SINGLE_VIDEO_VISITOR]: 'UploadVideo_Error_Video_Duration_Visitor',
  [MediaUploadErrorKey.WMP_ERROR_GENERAL]: 'UploadFile_Error_WMP_General',
  [MediaUploadErrorKey.INVALID_SESSION]: 'UploadFile_Error_General_Logged_Out',
  [MediaUploadErrorKey.SESSION_EXPIRED]: 'UploadFile_Error_General_Logged_Out',
  [MediaUploadErrorKey.MISSING_WIX_SESSION]: 'UploadFile_Error_General_Logged_Out',
  [MediaUploadErrorKey.INCORRECT_FILE_INFO]: 'UploadFile_Error_Corrupt_File',
  [MediaUploadErrorKey.CORRUPT_FILE]: 'UploadFile_Error_Corrupt_File',
  [MediaUploadErrorKey.UNSUPPORTED_EXTENSION]: 'UploadFile_Error_Unsupported_Extension',
  [MediaUploadErrorKey.MISSING_HEADER]: 'UploadFile_Error_Corrupt_File',
  [MediaUploadErrorKey.FORMAT_CHUNK_MISSING]: 'UploadFile_Error_Corrupt_File',
  [MediaUploadErrorKey.EXT_FILE_AUTHORIZATION]: 'UploadFile_Error_External_File_Authorizaion',
  [MediaUploadErrorKey.EXT_FILE_FORBBIDEN]: 'UploadFile_Error_External_File_Authorizaion',
  [MediaUploadErrorKey.IMAGE_FORMAT]: 'UploadImage_Error_Unsupported_Image_Format',
  [MediaUploadErrorKey.CORRUPT_IMAGE]: 'UploadImage_Error_Corrupted_Image',
  [MediaUploadErrorKey.IMAGE_DIMENSIONS_EXCEEDED]: 'UploadImage_Error_Image_Dimensions_Exceeded',
  [MediaUploadErrorKey.MP4_STEREO_FORMAT]: 'UploadAudio_Error_Unsupported_Stereo_Format',
  [MediaUploadErrorKey.WAV_STEREO_FORMAT]: 'UploadAudio_Error_Unsupported_Stereo_Format',
  [MediaUploadErrorKey.WMA_BITRATE]: 'UploadAudio_Error_Unsupported_Bit_Rate',
  [MediaUploadErrorKey.WMA_BITRATE_LOSSY]: 'UploadAudio_Error_Unsupported_Bit_Rate',
  [MediaUploadErrorKey.MP4_BITRATE]: 'UploadAudio_Error_Unsupported_Bit_Rate',
  [MediaUploadErrorKey.MP3_UNSUPPORTED_STEREO]: 'UploadAudio_Error_MP3_Unsupported_Stereo_Format',
  [MediaUploadErrorKey.MP3_UNSUPPORTED_FORMAT]: 'UploadAudio_Error_MP3_Unsupported_Format',
  [MediaUploadErrorKey.WAV_SAMPLE_RATE]: 'UploadAudio_Error_Unsupported_Sample_Rate',
  [MediaUploadErrorKey.AAC_UNSUPPORTED_FORMAT]: 'UploadAudio_Error_aac_Unsupported_Format',
  [MediaUploadErrorKey.WAV_UNSUPPORTED_FORMAT]: 'UploadAudio_Error_wav_Unsupported_Format',
  [MediaUploadErrorKey.WAV_SAMPLE_SIZE]: 'UploadAudio_Error_Unsupported_Sample_Size',
  [MediaUploadErrorKey.WAV_CHUNK_SIZE]: 'UploadFile_Error_Corrupt_File',
  [MediaUploadErrorKey.AUDIO_CODEC]: 'UploadAudio_Error_Unsupported_Audio_Codec',
  [MediaUploadErrorKey.EMPTY_FILE]: 'UploadFile_Error_Empty_File',
  [MediaUploadErrorKey.MP4_UNSUPPORTED_FORMAT]: 'UploadAudio_Error_MP4_Unsupported_Format',
  [MediaUploadErrorKey.MP4_SAMPLE_RATE]: 'UploadVideo_Error_Unsupported_Sample_Rate',
  [MediaUploadErrorKey.VIDEO_BITRATE]: 'UploadVideo_Error_Unsupported_Bit_Rate',
  [MediaUploadErrorKey.VIDEO_DURATION_MISMATCH]: 'UploadVideo_Error_Video_Audio_Duration_Mismatch',
  [MediaUploadErrorKey.VIDEO_CODEC]: 'UploadVideo_Error_Unsupported_Video_Codec',
};

export default function ErrorMessage(props) {
  const { error, errorCount, ...rest } = props;
  const translationKey =
    errorCount > 1 ? 'UploadFile_Error_Generic_Toast_Multiple' : errorMap[error.key];
  const upgradeUrl = error.args?.upgradeUrl;

  const errorMsg = translationKey ? (
    <Trans i18nKey={translationKey} values={{ ...error.args, errors: errorCount }}>
      {error.msg}
      {upgradeUrl && (
        <a href={upgradeUrl} target="_blank" rel="noreferrer">
          {' '}
        </a>
      )}
    </Trans>
  ) : (
    error.msg
  );
  return <Toast message={errorMsg} isError {...rest} />;
}

ErrorMessage.propTypes = {
  error: PropTypes.object,
  errorCount: PropTypes.number,
};
