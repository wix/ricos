import React from 'react';
import Loader from '../Components/Loader';
import { MediaItemErrorMsg } from 'wix-rich-content-ui-components';

export default function MediaPluginOverlay(props) {
  const { isLoading, error, t, isOverlayLoader } = props;
  return isOverlayLoader ? (
    <>
      {isLoading && <Loader type={'medium'} />}
      {error && <MediaItemErrorMsg error={error} t={t} />}
    </>
  ) : null;
}
