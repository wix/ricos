# rich-content-preview design doc

## Introduction

The Preview component comes to meet the requirement for a brief content preview; similar concept could be found in various social media applications.

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



