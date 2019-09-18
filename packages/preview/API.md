# API

## getContentStateMetadata

The metadata is derived from ContentState and exposes its details:

```js

const metadata = getContentStateMetdata(contentState);

```

These details are categorized by content type rather actual ContentState structure.

### ContentStateMetdata.text

The `ContentStateMetdata.text` exposes all the textual content.

### ContentStateMetdata.text.array

The `ContentStateMetdata.text` exposes all the textual content a string array.

#### ContentStateMetdata.text.plain

The `ContentStateMetdata.text.plain` exposes the textual content extracted from `unstyled` blocks.

##### ContentStateMetdata.text.plain.array

The `ContentStateMetdata.text.plain.array` exposes the textual content extracted from the `unstyled` blocks as a string array.

##### ContentStateMetdata.text.ol

The `ContentStateMetdata.text.ol` exposes the textual content extracted from ordered list blocks.

###### ContentStateMetdata.text.ol.array

The `ContentStateMetdata.text.ol` exposes the textual content extracted from the ordered list blocks as a string array.

##### ContentStateMetdata.text.ul

The `ContentStateMetdata.text.ul` exposes the textual content extracted from unordered list blocks.

###### ContentStateMetdata.text.ul.array

The `ContentStateMetdata.text.ul.array` exposes the textual content extracted from the unordered list blocks as a string array.

#### ContentStateMetdata.text.quotes

The `ContentStateMetdata.text.quotes` exposes the textual content extracted from `blockquote` blocks.

##### ContentStateMetdata.text.quotes.array

The `ContentStateMetdata.text.quotes.array` exposes the textual content extracted from the `blockquote` blocks as a string array.

#### ContentStateMetdata.text.code

The `ContentStateMetdata.text.code` exposes the textual content extracted from `code-block` blocks.

##### ContentStateMetdata.text.code.array

The `ContentStateMetdata.text.code.array` exposes the textual content extracted from the `code-block` blocks as a string array.

#### ContentStateMetdata.text.h2/h3/h4/h5/h6

The `ContentStateMetdata.text.h2/h3/h4/h5/h6` exposes the textual content extracted from heading blocks.

##### ContentStateMetdata.text.h2/h3/h4/h5/h6.array

The `ContentStateMetdata.text.h2/h3/h4/h5/h6.array` exposes the textual content extracted from the heading blocks as a string array.

## ContentStateMetdata.media

The `ContentStateMetdata.media` exposes all the media-related entities.

### ContentStateMetdata.media.images

The `ContentStateMetdata.media.images` exposes the data extracted from `image` / `gallery` / `giphy` entities.

### ContentStateMetdata.media.videos

The `ContentStateMetdata.media.videos` exposes the data extracted from `video` / `sound-cloud` / `youtube` entities.

### ContentStateMetdata.media.files

The `ContentStateMetdata.media.files` exposes the data extracted from `file-upload` entities.

### ContentStateMetdata.media.maps

The `ContentStateMetdata.media.maps` exposes the data extracted from `google-map` entities.

## ContentStateBuilder

The `ContentStateBuilder` exposes API for ContentState generation, based on the Builder design pattern.

### `with-` methods

The `with-` methods allow to add an entity to the constructed ContentState. E.g. `withImage` method allows to add an image. The `with-` methods could be chained:

```js

const previewState = new ContentStateBuilder(initialState)
                          .withImage({ data: {...}, config: {...} })
                          .withGallery({ items: [...], styles: {...} })
                          .withText({ text: '...' });

```
