---
id: media_handling
title: Media handling
sidebar_label: Media handling
---

Some parts of the API are very confusing, but will be consolidated with the wrapping API that will come with native & MM file uploading implementation out of the box, so stay tuned.

In the meantime:
To sum it up the recommended plugin configuration for uploading via browser file selector is

```
{
    helpers: {
	  handleFileUpload: imageUploadHandler
	},
    config: {
      [VIDEO_TYPE]: {
        handleFileUpload: videoUploadHandler,
      },
      [FILE_UPLOAD_TYPE]: {
        onFileSelected: fileUploadHandler,
      },
    },
  };
```

And the recommended config for uploading via custom file selector is
```
  {
    helpers: {
	  handleFileSelection: imageSelectionHandler
	},
    config: {
      [VIDEO_TYPE]: {
        handleFilSelection: videoSelectionHandler,
      },
      [FILE_UPLOAD_TYPE]: {
        handleFileSelection: fileSelectionHandler,
      },
    },
  };
```

Image and gallery plugins are both handled with a single function.
Supplying a handleFileSelection function will override the plugin's native file selector handler (e.g. for images - handleFileSelection overrides onFilesChange).

Please refer to Editor.js and EditorPlugins.js for examples.
