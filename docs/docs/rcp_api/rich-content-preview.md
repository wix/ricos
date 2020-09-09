---
id: RichContentPreviewAPI
title: rich-content-preview
sidebar_label: Rich Content Preview
---

## Introduction

The Preview project comes to meet the requirement for a brief content preview; similar concept could be found in social media applications.

## Architecture

The core idea is to transform the content state and to display it within `RichContentViewer`. This transformation is a product of content state metadata and a set of rules defined by the consumer. This section discusses the main logic elements required to perform such a transformation.

### Content State Analyzer

The content state analyzer retrives content metadata containing the info regarding the data rather draft block and entity structure.

For example, the metadata could provide the following details:
- number of images and videos
- length of text (in total and per block)
- lists and code-blocks consisting of multiple sequential blocks are retrieved as a whole

### Content State Builder

The content state builder provides a way to create a preview content state using the retrieved metadata. The preview state then can be rendered by `RichContentViewer`.

### Rule Engine

The rule engine provides a way to define transformation rules and to apply them on a given `ContentState` according to the metadata.

#### Transformation Rule

The transformation rule consists of condition and transform action.

Example:

```js

  if: metadata => metadata.images.length >= 4
  then: (metadata, preview) => preview.gallery({
      items: metadata.images.slice(0, 4),
      config: { layout: 'grid', imageWidth: 40 }
  })

```

### Preview Interactions

The preview interactons allow to expand hidden content. The `rich-content` repo introduces 3 predefined intertactions. The Content State Builder exposes methods to add interactions to the preview state, and the `RichContentViewer` renders the interacton components.

#### 'Read More'

The `Read More` interacton relies on [react-lines-ellipsis](https://github.com/xiaody/react-lines-ellipsis) package. It displays required number of lines appended by an ellipsis. Although the package is capable to handle the HTML content, this feature is experimental. The current interacton is limited to work with plain text only. Mouse click expands the full post.

#### 'See Full Post'

The `See Full Post` displays a text label over an overlay. Mouse click expands the full post.

#### Image Counter

The `Image Counter` renders hidden image counter. By default, the counter label placed above the last visible image element. The image elements are selected by `role='img'` attribute.

## APIs

### getContentStateMetadata

The metadata is derived from ContentState and exposes its details:

```js
const metadata = getContentStateMetadata(contentState);
```

These details are categorized by content type rather actual ContentState structure.

#### ContentStateMetadata.allText

The `ContentStateMetadata.allText` exposes all the textual content a string array.

#### ContentStateMetadata.groupedBlocks

##### .plain

The `plain` exposes the textual content extracted from the `unstyled` blocks as a string array.

##### .ol

The `ol` exposes the textual content extracted from the ordered list blocks as a string array.

##### .ul

The `ul` exposes the textual content extracted from the unordered list blocks as a string array.

##### .code

The `code` exposes the textual content extracted from the `code-block` blocks as a string array.

#### ContentStateMetadata.blocks

##### .quote

The `quotes` exposes the textual content extracted from the `blockquote` blocks as a string array.

##### .h1/h2/h3/h4/h5/h6

The `h1/h2/h3/h4/h5/h6` exposes the textual content extracted from the heading blocks as a string array.

#### ContentStateMetadata.images

The `ContentStateMetadata.images` exposes the data extracted from `image` / `gallery` / `giphy` entities.
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

#### ContentStateMetadata.videos

The `ContentStateMetadata.videos` exposes the data extracted from `video` / `sound-cloud` / `youtube` entities.

The video data object structure is:

```js

{
  url: string,
  width: integer,
  height: integer,
}

```

#### ContentStateMetadata.files

The `ContentStateMetadata.files` exposes the data extracted from `file-upload` entities.

The file object structure:

```js

{
  name: string,
  fileType: string,
  url: string,
}

```

#### ContentStateMetadata.maps

The `ContentStateMetadata.maps` exposes the data extracted from `google-map` entities. The map data structure is similar to `mapSettings` object structure (found in the map entity data).

### ContentStateBuilder

The `ContentStateBuilder` exposes API for ContentState generation, based on the Builder design pattern.

#### Content generation methods

The basic `ContentStateBuilder` methods allow to add content elements to the constructed ContentState. The methods named after the content type being added, e.g. is `image` method allows to add an image, and `plain` method adds plain text. The methods could be chained:

```js
const previewState = new ContentStateBuilder(initialState)
  .image(imageData, config)
  .gallery(items, config)
  .plain(text);
```

##### ContentStateBuilder.plain(text, config)

The `ContentStateBuilder.plain` method appends an `unstyled` block with given `text`. If the `text` param is a string array, then it will append block for each string. The optional `config` is merged to the block data.

##### ContentStateBuilder.ul(text, config)

The `ContentStateBuilder.ul` method appends an `unordered-list-item` block with given `text`. If the `text` param is a string array, then it will append block for each string. The optional `config` is merged to the block data.

##### ContentStateBuilder.ol(text, config)

The `ContentStateBuilder.ol` method appends an `ordered-list-item` block with given `text`. If the `text` param is a string array, then it will append block for each string. The optional `config` is merged to the block data.

##### ContentStateBuilder.code(text, config)

The `ContentStateBuilder.code` method appends a `code-block` block with given `text`. If the `text` param is a string array, then it will append block for each string. The optional `config` is merged to the block data.

##### ContentStateBuilder.quote(text, config)

The `ContentStateBuilder.quote` method appends a `blockquote` block with given `text`. If the `text` param is a string array, then it will append block for each string. The optional `config` is merged to the block data.

##### ContentStateBuilder.h1/h2/h3/h4/h5/h6(text, config)

The `ContentStateBuilder.h1/h2/h3/h4/h5/h6` methods append a header block with given `text`. If the `text` param is a string array, then it will append block for each string. The optional `config` is merged to the block data.

##### ContentStateBuilder.image({ mediaInfo, config, overrides })

The `ContentStateBuilder.image` method appends an `atomic` block to the `blocks` and a `wix-draft-plugin-image` entity to the `entityMap`. The optional params `config` and `overrides` are merged with the `entity.data.config` and `entity.data`, respectively.
The `mediaInfo` param is expected to be an image data object returned by [ContentStateMetadata.images](./rich-content-preview.md#contentstatemetadataimages) method.

##### ContentStateBuilder.giphy({ mediaInfo, config, overrides })

The `ContentStateBuilder.giphy` method appends an `atomic` block to the `blocks` and a `wix-draft-plugin-giphy` entity to the `entityMap`. The optional params `config` and `overrides` are merged with the `entity.data.config` and `entity.data`, respectively.
The `mediaInfo` param is expected to be an image data object returned by [ContentStateMetadata.images](./rich-content-preview.md#contentstatemetadataimages) method.

##### ContentStateBuilder.gallery({ mediaInfo, config, overrides })

The `ContentStateBuilder.gallery` method appends an `atomic` block to the `blocks` and a `wix-draft-plugin-gallery` entity to the `entityMap`. The optional params `config` and `overrides` are merged with the `entity.data.config` and `entity.data`, respectively.
The `items` param is expected to be an array of image data objects returned by [ContentStateMetadata.images](./rich-content-preview.md#contentstatemetadataimages) method.

##### ContentStateBuilder.video({ mediaInfo, config, overrides })

The `ContentStateBuilder.video` method appends an `atomic` block to the `blocks` and a `wix-draft-plugin-video` entity to the `entityMap`. The optional params `config` and `overrides` are merged with the `entity.data.config` and `entity.data`, respectively.
The `mediaInfo` param is expected to be a video data object returned by [ContentStateMetadata.videos](./rich-content-preview.md#contentstatemetadatavideos) method.

##### ContentStateBuilder.soundCloud({ mediaInfo, config, overrides })

The `ContentStateBuilder.soundCloud` method appends an `atomic` block to the `blocks` and a `wix-draft-plugin-sound-cloud` entity to the `entityMap`. The optional params `config` and `overrides` are merged with the `entity.data.config` and `entity.data`, respectively.
The `mediaInfo` param is expected to be a video data object returned by [ContentStateMetadata.videos](./rich-content-preview.md#contentstatemetadatavideos) method.

##### ContentStateBuilder.file({ mediaInfo, config, overrides })

The `ContentStateBuilder.file` method appends an `atomic` block to the `blocks` and a `wix-draft-plugin-file-upload` entity to the `entityMap`. The optional params `config` and `overrides` are merged with the `entity.data.config` and `entity.data`, respectively.
The `mediaInfo` param is expected to be a file data object returned by [ContentStateMetadata.files](./rich-content-preview.md#contentstatemetadatafiles) method.

##### ContentStateBuilder.map({ mediaInfo, config, overrides })

The `ContentStateBuilder.map` method appends an `atomic` block to the `blocks` and a `wix-draft-plugin-map` entity to the `entityMap`. The optional params `config` and `overrides` are merged with the `entity.data.config` and `entity.data`, respectively.
The `mediaInfo` parameter is expected to be a map data object returned by [ContentStateMetadata.maps](./rich-content-preview.md#contentstatemetadatamaps) method.

## ContentStateTransformation

The `ContentStateTransformation` represents a rule to be applied on content state in order to achieve the desired preview state:

```js
const transformation = new ContentStateTransformation({ _if, _then, initialPreviewState });
const previewState = transformation.apply(contentState);
```

In the code fragment above, the `_if` and `_then` arguments are functions following the convention:

```js
_if = ContentStateMetadata => boolean;

_then = (ContentStateMetadata, ContentStateBuilder) => ContentStateBuilder;
```

The optional argument `initialPreviewState` allows to pass an initial preview state.

The following fragment demonstrates the "if content images > 3 => add a gallery with 3 items" rule definition:

```js
const transformation = new ContentStateTransformation({
  _if: metadata => metadata.images.length > 3,
  _then: (metadata, preview) =>
    preview.gallery({
      mediaInfo: metadata.images.slice(0, 3),
    }),
});
const preview = transformation.apply(contentState);
```

The `rule` method allows to chain multiple rules. They will be applied one after another:

```js

const transformation = new ContentStateTransformation({ _if: ..., _then: ... })
  .rule({ _if: ..., _then: ... })
  .rule({ _if: ..., _then: ... });

```

### Content Interactions

The content interaction indicate that the preview content is collapsed, and provide a way to expand it. Content interactions work at the block level. Every interaction consists of the following elements:

- _ContentStateBuilder API_ allows a consumer to add an interaction to the preview state and configure it. These APIs can be chained just like any other ContentStateBuilder method:

  ```js

    builder.plain('some looong text').readMore({ lines: 5 }).image({ mediaInfo: {...} })

  ```

  In this example, the `readMore` interaction is being applied to the previous `plain` block.

- _block data interactions array_ contains configuration data for all the interactions applied to the block
- _UI component_ defines the appearance of the interaction element

#### Predefined Interactions

##### ReadMore

The `ReadMore` component comes to display a portion of a long text, appending it an ellipsis symbol (`...`) and label (by default, those are '… read more').
The ContentStateBuilder exposes `readMore` API that accepts configuration object:

```js

  {
    lines: number,
    label: string,
    onClick: function,
    text: string,
  }
```

The `text` field allows to specify the text to be displayed. By default, the text is taken from the wrapped children.
The `onClick` field is common for all the interactions. It defines the ineraction click behavior, by intercepting the expansion click.

##### SeeFullPost

The `SeeFullPost` interaction adds an overlay containing a link-like label (by default, it says `See Full Post`). The click on label expands the full content. The settings object:

```js
  {
    label: string,
    overlayStyle: object,
    labelStyle: object,
    onClick: function,
  }

```

The `ContentStateBuilder` exposes `seeFullPost` method that applies the interaction on the previous block data.

##### ImageCounter

The `ImageCounter` serves as a counter of media entities in collapsed content. The configuration object structure:

```js

  {
    counter: number,
    formatLabel: number => string,
    imageSelector: Array<image> => Array<image>,
    style: object,
    onClick: function,
  }

```

The `counter` field is self-explanatory, the `formatLabel` defines the format of the label. The default implementation is:

```js

  counter => `+ ${ counter }`

```

The `imageSelector` function selects images that should be decorated by the counter label, among the images found within `ImageCounter` children. By default, last image is selected.

The `ContentStateBuilder` exposes `imageCounter` method that applies the interaction on previous block data.

#### RichContentViewer Integration

RichContentViewer `config` prop now allows to pass the preview related configuration, by adding the following entry:

```js

  config: {
    PREVIEW: {
      contentInteractionMappers: [ () => Component, ... ],
      onPreviewExpand: function,
    }
  }

```

The `contentInteractionMappers` field allows to pass the interactions as a function array, similar to the `typeMappers` and `inlineStyleMappers`. The `preview` package exports the `interactionMap` API containing three predefined interactions mentioned in previous section.

The `onPreviewExpand` handler determines the behavior on content expansion. The `RichContentPreview` component wraps the `RichContentViewer` while providing the default `PREVIEW` configuration, interacton map, and default transformation rule:

```js

const defaultTransformation = new ContentStateTransformation({
  _if: metadata => metadata.groupedBlocks.plain.length > 0,
  _then: (metadata, preview) =>
    preview.plain(metadata.groupedBlocks.plain[0].join('')).readMore({ lines: 3 }),
})
  .rule({
    _if: metadata => metadata.images.length > 0 && metadata.images.length < 5,
    _then: (metadata, preview) =>
      preview.image({ mediaInfo: metadata.images[0] }).seeFullPost(),
  })
  .rule({
    _if: metadata => metadata.images.length >= 5,
    _then: (metadata, preview) =>
      preview
        .gallery({
          mediaInfo: metadata.images.slice(0, 4),
          overrides: {
            styles: {
              galleryLayout: 2,
              ...
            },
          },
        })
        .imageCounter({ counter: metadata.images.length - 4 }),
  });
```

The default rule displays 3 lines of plain text, and a single image appended by 'See Full Post' label, if the ContentState contains less than 5 images; otherwise, it displays a gallery grid of 4 images with image counter.

#### Custom Interactions

TBD
