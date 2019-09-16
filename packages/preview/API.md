# API

## ContentStateMetadata

The metadata is derived from ContentState and exposes its details:

```js

const metadata = new ContentStateMetdata(contentState);

```

These details are categorized by content type rather native ContentState structure.

### ContentStateMetdata.text

The `ContentStateMetdata.text` exposes all the textual content.

#### ContentStateMetdata.text.plain

The `ContentStateMetdata.text.plain` exposes the textual content extracted from `unstyled` blocks.

##### ContentStateMetdata.text.plain[index]

The `ContentStateMetdata.text.plain[index]` exposes the textual content extracted from a single `unstyled` block (access by index).

#### ContentStateMetdata.text.lists

The `ContentStateMetdata.text.lists` exposes the textual content extracted from list blocks.

##### ContentStateMetdata.text.lists.ordered

The `ContentStateMetdata.text.lists.ordered` exposes the textual content extracted from ordered list blocks.

###### ContentStateMetdata.text.lists.ordered[index]

The `ContentStateMetdata.text.lists.ordered` exposes the textual content extracted from a single ordered list block (access by index).

##### ContentStateMetdata.text.lists.unordered

The `ContentStateMetdata.text.lists.unordered` exposes the textual content extracted from unordered list blocks.

###### ContentStateMetdata.text.lists.unordered[index]

The `ContentStateMetdata.text.lists.unordered[index]` exposes the textual content extracted from a single unordered list block (access by index).

#### ContentStateMetdata.text.quotes

The `ContentStateMetdata.text.quotes` exposes the textual content extracted from `block-quote` blocks.

##### ContentStateMetdata.text.quotes[index]

The `ContentStateMetdata.text.quotes[index]` exposes the textual content extracted from a single `block-quote` block (access by index).

#### ContentStateMetdata.text.codeBlocks

The `ContentStateMetdata.text.codeBlocks` exposes the textual content extracted from `code-block` blocks.

##### ContentStateMetdata.text.codeBlocks[index]

The `ContentStateMetdata.text.codeBlocks[index]` exposes the textual content extracted from a single `code-block` block (access by index).

## ContentStateMetdata.media

The `ContentStateMetdata.media` exposes all the media-related entities.

### ContentStateMetdata.media.images

The `ContentStateMetdata.media.images` exposes the data extracted from `image` / `gallery` / `giphy` entities.

#### ContentStateMetdata.media.images[index]

The `ContentStateMetdata.media.images[index]` exposes a single data entry extracted from `image` / `gallery` / `giphy` entities (access by index).

### ContentStateMetdata.media.videos

The `ContentStateMetdata.media.videos` exposes the data extracted from `video` / `sound-cloud` / `youtube` entities.

#### ContentStateMetdata.media.videos[index]

The `ContentStateMetdata.media.videos[index]` exposes a single data entry extracted from `video` / `sound-cloud` / `youtube` entities (access by index).

### ContentStateMetdata.media.files

The `ContentStateMetdata.media.files` exposes the data extracted from `file-upload` entities.

#### ContentStateMetdata.media.files[index]

The `ContentStateMetdata.media.files[index]` exposes a single data entry extracted from `file-upload` entities (access by index).

### ContentStateMetdata.media.maps

The `ContentStateMetdata.media.maps` exposes the data extracted from `google-map` entities.

#### ContentStateMetdata.media.maps[index]

The `ContentStateMetdata.media.maps[index]` exposes a single data entry extracted from `google-map` entities (access by index).

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
