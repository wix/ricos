import React from 'react';
import { Page } from '../../Components/StoryParts';

import { ErrorBlocksRemovalApp } from '../Utils';

const ErrorToastStory = () => {
  return (
    <Page title="Error Toasts">
      <p>
        Try uploading media in the editor to see how error toasts and error on blocks are displayed.
      </p>
      <p>In this example a random error would show from the following pool:</p>
      <ul>
        <li> custom error message </li>
        <li> file size too big </li>
        <li> file storage exceeded, link to upgrade </li>
        <li> general error message: file was not uploaded </li>
      </ul>
      <p>
        While editing, an error toast would raise for 4 seconds indicating what went wrong, an error
        would also appear on the block.
      </p>
      <p>
        When clicking "View" the getContent method is called which removes blocks with errors and
        Ricos Viewer would open with the new content.
      </p>

      <ErrorBlocksRemovalApp />
    </Page>
  );
};

export default ErrorToastStory;
