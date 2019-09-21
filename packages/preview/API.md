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
The image data object structure is:

```js

{
  url: string,
  width: integer,
  height: integer,
  thumbnail?: string,
  link?: {
      url: string,
      target: string,
      rel: string,
  },
  metadata?: {
      alt: string,
      caption: string,
  }
}

```

The properties marked with `?` are optional and relevant only for some of the image entities.

### ContentStateMetdata.media.videos

The `ContentStateMetdata.media.videos` exposes the data extracted from `video` / `sound-cloud` / `youtube` entities.


The video data object structure is:

```js

{
  url: string,
  width: integer,
  height: integer,
}

```

### ContentStateMetdata.media.files

The `ContentStateMetdata.media.files` exposes the data extracted from `file-upload` entities.

The file object structure:

```js

{
  name: string,
  fileType: string,
  url: string,
}

```

### ContentStateMetdata.media.maps

The `ContentStateMetdata.media.maps` exposes the data extracted from `google-map` entities. The map data structure is similar to `mapSettings` object structure (found in the map entity data).

## ContentStateBuilder

The `ContentStateBuilder` exposes API for ContentState generation, based on the Builder design pattern.

### Content generation methods

The basic `ContentStateBuilder` methods allow to add content elements to the constructed ContentState. The methods named after the content type being added, e.g. is `image` method allows to add an image, and `plain` method adds plain text. The methods could be chained:

```js

const previewState = new ContentStateBuilder(initialState)
                          .image(imageData, config)
                          .gallery(items, config)
                          .plain(text);

```

#### ContentStateBuilder.plain(text, config)

The `ContentStateBuilder.plain` method appends an `unstyled` block with given `text`. If the `text` param is a string array, then it will append block for each string. The optional `config` is merged to the block data.

#### ContentStateBuilder.ul(text, config)

The `ContentStateBuilder.ul` method appends an `unordered-list-item` block with given `text`. If the `text` param is a string array, then it will append block for each string. The optional `config` is merged to the block data.

#### ContentStateBuilder.ol(text, config)

The `ContentStateBuilder.ol` method appends an `ordered-list-item` block with given `text`. If the `text` param is a string array, then it will append block for each string. The optional `config` is merged to the block data.

#### ContentStateBuilder.code(text, config)

The `ContentStateBuilder.code` method appends a `code-block` block with given `text`. If the `text` param is a string array, then it will append block for each string. The optional `config` is merged to the block data.

#### ContentStateBuilder.quote(text, config)

The `ContentStateBuilder.quote` method appends a `blockquote` block with given `text`. If the `text` param is a string array, then it will append block for each string. The optional `config` is merged to the block data.

#### ContentStateBuilder.h2/h3/h4/h5/h6(text, config)

The `ContentStateBuilder.h2/h3/h4/h5/h6` methods append a header block with given `text`. If the `text` param is a string array, then it will append block for each string. The optional `config` is merged to the block data.

#### ContentStateBuilder.image(data, config)

The `ContentStateBuilder.image` method appends an `atomic` block to the `blocks` and a `wix-draft-plugin-image` entity to the `entityMap`. The optional `config` is merged with the entity config.
The `data` param is expected to be an image data object returned by `ContentStateMetdata.media.images` method. 
