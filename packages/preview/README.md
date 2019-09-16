# rich-content-preview design doc

## Introduction

The Preview component comes to meet the requirement for a brief content preview; similar concept could be extracted from various social media applications.

## Architecture

The core idea is to transform the content state and to display it within `RichContentViewer`. This transformation is a product of content state metadata and a set of rules defined by the consumer. This section discusses the main logic elements required to perform such a transformation.

### `ContentStateAnalyzer`

The `ContentStateAnalyzer` retrives `ContentState` metadata:

- number of images/videos
- length of text in lines (in total and per block)
- text block types (lists, quotes, code, etc)
- links? (remote website preview)

### `RuleEngine`

The `RuleEngine` provides a way to define `TransformationRules` and to apply them on a given `ContentState` according to the metadata.

#### `TransformationRule`

The `TransformationRule` consists of condition and transform action.

Example:

```js
  content => content.images.length >= 4 -->
    preview.addBlock({
      type: 'gallery',
      content: content.images.slice(0, 4),
      config: { layout: 'grid', imageWidth: 40 },
      interactions: {
        type: 'imageCounter',
        ...
      }
    })
```

### Preview Components

The preview rendered as regular content, by the RichContentViewer. In addition, there are interacton components that allow to expand hidden content, open media in FullScreen mode, etc.

#### `PreviewIneractions`

##### Textual 'Read More' link

The [react-lines-ellipsis](https://github.com/xiaody/react-lines-ellipsis) npm package provides the required functionality `#poc_needed`. It should be integrated into the `RichContentViewer` blocks rendering and applied accordingly to block data.

Possible block data structure:

```js
{
  decoration: 'text-ellipsis',
  config: {
    lines: 3,
    text: 'Read More',
    ellipsis: '...',
  }
}

```

This integration requires to add the block decoration support to `RichContentViewer`.

##### Media 'See Full Post' link

##### Image Counter

##### Expand mode integration

#### Preview Component


## API

### ContentStateMetadata

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

#### ContentStateMetdata.text.quotes[index]

The `ContentStateMetdata.text.quotes[index]` exposes the textual content extracted from a single `block-quote` block (access by index).

#### ContentStateMetdata.text.quotes

The `ContentStateMetdata.text.quotes` exposes the textual content extracted from `block-quote` blocks.

#### ContentStateMetdata.text.quotes[index]

The `ContentStateMetdata.text.quotes[index]` exposes the textual content extracted from a single `block-quote` block (access by index).

#### ContentStateMetdata.text.codeBlocks

The `ContentStateMetdata.text.codeBlocks` exposes the textual content extracted from `code-block` blocks.

##### ContentStateMetdata.text.codeBlocks[index]

The `ContentStateMetdata.text.codeBlocks[index]` exposes the textual content extracted from a single `code-block` block (access by index).

### ContentStateMetdata.media

The `ContentStateMetdata.media` exposes all the media-related entities.

#### ContentStateMetdata.media.images

The `ContentStateMetdata.media.images` exposes the data extracted from `image` / `gallery` / `giphy` entities.

##### ContentStateMetdata.media.images[index]

The `ContentStateMetdata.media.images[index]` exposes a single data entry extracted from `image` / `gallery` / `giphy` entities (access by index).

#### ContentStateMetdata.media.videos

The `ContentStateMetdata.media.videos` exposes the data extracted from `video` / `sound-cloud` / `youtube` entities.

##### ContentStateMetdata.media.videos[index]

The `ContentStateMetdata.media.videos[index]` exposes a single data entry extracted from `video` / `sound-cloud` / `youtube` entities (access by index).

#### ContentStateMetdata.media.files

The `ContentStateMetdata.media.files` exposes the data extracted from `file-upload` entities.

##### ContentStateMetdata.media.files[index]

The `ContentStateMetdata.media.files[index]` exposes a single data entry extracted from `file-upload` entities (access by index).

#### ContentStateMetdata.media.maps

The `ContentStateMetdata.media.maps` exposes the data extracted from `google-map` entities.

##### ContentStateMetdata.media.maps[index]

The `ContentStateMetdata.media.maps[index]` exposes a single data entry extracted from `google-map` entities (access by index).

### ContentStateBuilder

The `ContentStateBuilder` exposes API for ContentState generation, based on the Builder design pattern.

#### `with-` methods

The `with-` methods allow to add an entity to the constructed ContentState. E.g. `withImage` method allows to add an image. The `with-` methods could be chained: 

```js

const previewState = new ContentStateBuilder(initialState)
                          .withImage({ data: {...}, config: {...} })
                          .withGallery({ items: [...], styles: {...} })
                          .withText({ text: '...' });

```


