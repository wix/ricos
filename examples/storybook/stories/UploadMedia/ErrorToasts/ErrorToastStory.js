import React from 'react';
import { Page } from '../../Components/StoryParts';

import { ErrorBlocksRemovalApp } from '../Utils';

const ErrorToastStory = () => {
  return (
    <Page title="Error Toasts">
      <p>
        Try uploading media in the editor to see how error toasts and error on blocks are displayed.
      </p>
      <p>In this example, a random error from the pool below would show</p>
      <ul>
        <li> File size too big </li>
        <li> File storage exceeded the limit (UoU)</li>
        <li> File storage exceeded the limit, link to upgrade (for users)</li>
        <li> General error message: File was not uploaded </li>
        <li> Custom error message </li>
      </ul>
      <p>
        While editing, an error toast would raise for 4 seconds indicating what went wrong, an error
        would also appear on the block.
      </p>
      <p>
        On Ricos Viewer (click "View"), blocks with errors will be filtered out. This is done by
        calling the getContent method of Ricos Editor which returns the cleaned content.
      </p>

      <ErrorBlocksRemovalApp />
    </Page>
  );
};

export default ErrorToastStory;
