---
id: extract_media
title: Extract Media
sidebar_label: Extract Media
---

## Extracted Data

The media extraction API allows to retrieve media info from the content, in the following formats:

### Image info

property | info
-------- | ----
imageUrl | the absolute URL for the original size image
imageHeight | image height in pixels
imageWidth | image width in pixels
imageAlt | image alt, if set by the user
imageCaption | image caption, if set by the user

### Video info

property | info
-------- | ----
videoThumbnailUrl | A thumbnail image relevant to the video
videoContentUrl | Actual bytes of the video file

## Usage

```js

import { extractMedia } from 'ricos-content/libs/extract-media';
...
const mediaItems = extractMedia(draftContent);

```

## Availability

ricos-content v8.37.0 and higher
