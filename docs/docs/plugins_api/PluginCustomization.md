---
id: PluginCustomization
title: Plugin Customization
sidebar_label: Plugin Customization
---

## Motivation

As it turns out, various `RichContentEditor` consumers have different customization needs. On other hand, it is important to keep the public API clean, while providing the desired customability. In order to meet these requirements, the `RichContentEditor` exposes `config` object prop.

This document focuses on plugin customization capabilities.

## Plugin Types as `config` Keys

Every plugin exports a constant value that defines its type. The convention is to name the type according to the _`pluginName_TYPE`_ pattern. The type is actually a plugin identifier, so it has to be unique.

The type serves multiple purposes. It is used to map the [entities](https://draftjs.org/docs/advanced-topics-entities) to proper plugin components both in `RichContentEditor` and `RichContentViewer`. Another plugin type application is `config` keys.

Every plugin expects to find its custom settings within the `config[pluginName_TYPE]` field. The expected value is an object containing specific settings that vary for every plugin. The following sections provide a list of plugin settings. As usual, the list is a subject to change.

## Plugin Settings

### Common Settings

These settings are common to all the plugins and handled at the **base** plugin level.

#### `width` and `height`

The `width` and `height` are expected to be integers. They serve as **initial** plugin component dimensions in pixels, if there are no `width` and `height` fields defined in `componentData.config` for that specific plugin entity.

#### `toolbar`

The `toolbar` setting refers to the plugin functionality toolbar, it is an object which may consist of the following keys:

| setting key | description                                                                                 | default value | is required? | editor/viewer config |
| ----------- | ------------------------------------------------------------------------------------------- | ------------- | ------------ | -------------------- |
| `hidden`    | an array of toolbar button `keynames` to be removed from toolbar                            | none          | No           | editor               |
| `icons`     | an object of toolbar button `keynames` to custom icons map: `{ delete: MyCustomTrashIcon }` | none          | No           | editor               |

Currently, it exposes a field `hidden` which is expected to be an array of toolbar button `keynames` to be removed from toolbar and a field `icons` which is expected to be an object of button icons to replace the existing icons.

#### `defaultData`

The `defaultData` setting enables consumers to set the default data for a plugin when it is inserted into the editor.  It is an object with the same fields as the plugins entity data.

### Button Plugin Settings

| setting key       | description                                                   | default value | is required? | editor/viewer config |
| ----------------- | ------------------------------------------------------------- | ------------- | ------------ | -------------------- |
| `activeButton`    | The index of the chosen preset button design                  | 0             | No           | both                 |
| `borderRadius`    | The border radius in pixels                                   | 0             | No           | both                 |
| `borderWidth`     | The border width in pixels                                    | 0             | No           | both                 |
| `buttonText`      | The button label                                              | `Click Me`    | No           | both                 |
| `url`             | The URL that should be redirected when clicking on the button | none          | Yes          | both                 |
| `rel`             | The relationship between the current URL and the linked URL   | `nofollow`    | Yes          | both                 |
| `target`          | Specifies where to open URL in new tab or in current tab      | `_blank`      | Yes          | both                 |
| `textColor`       | The color of button text in Hex.                              | `#FEFDFD`     | No           | both                 |
| `borderColor`     | The color of button border in Hex.                            | `#0161FF`     | No           | both                 |
| `backgroundColor` | The color of button background in Hex.                        | `#0161FF`     | No           | both                 |

### HTML Plugin Settings

| setting key     | description                                                                                                | default value | is required? | editor/viewer config |
| --------------- | ---------------------------------------------------------------------------------------------------------- | ------------- | ------------ | -------------------- |
| `htmlIframeSrc` | `src` attribute of the HTML `iframe` when the plugin is used in `source mode`                              | none          | Yes          | both                 |
| `maxWidth`      | the maximum component width in pixels. **note:** this value is dynamicaly limited by the editor boundaries | 940           | No           | both                 |
| `minWidth`      | the minimum component width in pixels                                                                      | 35            | No           | both                 |
| `maxHeight`     | the maximum component height in pixels                                                                     | 1200          | No           | both                 |
| `minHeight`     | the minimum component height in pixels                                                                     | 35            | No           | both                 |
| `width`         | the initial component width in pixels                                                                      | 740           | No           | both                 |
| `height`        | the initial component height in pixels                                                                     | 242           | No           | both                 |
| `siteDomain`    | the site domain in order for adsense to work                                                               | none          | No           | both                 |
| `exposeButtons` | controls what buttons will be exposed to open HTML modal                                                   | ['html']      | No           | editor               |


### Hashtag Plugin Settings

| setting key  | description                                                                                                        | default value | is required? | editor/viewer config |
| ------------ | ------------------------------------------------------------------------------------------------------------------ | ------------- | ------------ | -------------------- |
| `createHref` | converter function that converts the Hashtag `#text` to URL. if provided, the hashtags will behave as anchor links | none          | No           | both                 |
| `onClick`    | optional Hashtag click handler                                                                                     | none          | No           | both                 |

### Link Plugin Settings

| setting key | description                 | default value | is required? | editor/viewer config |
| ----------- | --------------------------- | ------------- | ------------ | -------------------- |
| `onClick`   | optional Link click handler | none          | No           | both                 |
| `preview` | Link Preview settings | none | No | both |

The Link Preview Plugin is implemented within the Link Plugin, and is activated once the Link Plugin Settings object contains `preview` field. The `preview` object structure as follows:

```js

  {
    getMetadataUrl: (query: string) => string,
    token: string,
    format: string,
  }

```

The `getMetadataUrl` should provide a Website metadata service endpoint URL for a given query URL. The `token` is a security token appended  to request headers (`Authorization` header). The `format`  is the expected response format. Currently the only supported format is 'oembed'.

### Mentions Plugin Settings

| setting key                  | description                                                                                | default value | is required? | editor/viewer config |
| ---------------------------- | ------------------------------------------------------------------------------------------ | ------------- | ------------ | -------------------- |
| `getMentions`                | function that retrieves a list of suggestions according to provided search query parameter | none          | Yes          | both                 |
| `onMentionClick`             | optional Mention click handler                                                             | none          | No           | both                 |
| `getMentionLink`             | given the mention return link for it                                                       | none          | Yes          | both                 |
| `visibleItemsBeforeOverflow` | boolean how many items should be visible before overflowing                                | none          | No           | editor               |

### Giphy Plugin Settings

| setting key             | description                                                                    | default value                                          | is required? | editor/viewer config |
| ----------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------ | -------------------- |
| `giphySdkApiKey`        | [Giphy Developer API key](https://developers.giphy.com/dashboard/?create=true) | none                                                   | Yes          | both                 |
| `componentDataDefaults` | Default component data                                                         | `{ config: { size: 'content', alignment: 'center' } }` | No           | editor               |
| `insertToolbars`        | Which toolbars to add insert button to                                         | `[TOOLBARS.FOOTER]`                                    | No           | editor               |

### Image Plugin Settings

| setting key             | description                                                                    | default value                                          | is required? | editor/viewer config |
| ----------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------ | -------------------- |
| `onExpand`              | called when the user expands an image                                          | none                                                   | No           | viewer               |

### Gallery Plugin Settings

| setting key             | description                                                                    | default value                                          | is required? | editor/viewer config |
| ----------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------ | -------------------- |
| `onExpand`              | called when the user expands an item                                           | none                                                   | No           | viewer               |


### Text Color Plugin

| setting key               | description                                                                            | default value                                | is required? | editor/viewer config |
| ------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------- | ------------ | -------------------- |
| `colorScheme`             | custom-style to hex-color map: `{ color1: { color: '#fff', index: 0 }, ... }`          | none (DEFAULT_PALETTE is used by default)    | No           | editor               |
| `styleSelectionPredicate` | a function that tells the plugin which inline styles are relevant: `string => boolean` | `style => isHexColor(style)`                 | No           | both                 |
| `customStyleFn` (1)       | a function that converts an inline-style to CSS style: `DraftInlineStyle => object`    | DEFAULT_STYLE_FN_DRAFT                       | No           | editor               |
| `customStyleFn` (2)       | a function that converts an inline-style to CSS style: `string => object`              | DEFAULT_STYLE_FN                             | No           | viewer               |
| `selectionColor`          | selected color indicator (`string`)                                                    | `#000`                                       | No           | editor               |
| `onColorAdded`            | a handler called when a custom color is added                                          | none                                         | Yes          | editor               |
| `getUserColors`           | a function that returns user-defined custom colors                                     | none                                         | Yes          | editor               |
| `onCustomPickerToggle`    | a handler called when the Add Color button is clicked [see **Note** below for details] | modal `CustomColorPickerDialog` is displayed | No           | editor               |
| `onCustomColorPicked`     | a handler called when a custom color is picked by hue/saturation controls              | noop                                         | No           | editor               |

**Note:** `onCustomPickerToggle` API is intended to be used when there is a need to display the `CustomColorPicker` outside the modal dialog, e.g. as a Settings panel element. The API is called with the following parameters:
- `onCustomColorPicked`(color) -- should be called when a custom color is picked by hue/saturation controls of the `CustomColorPicker`. Usually it should be wired to the `CustomColorPicker`'s _`onChange`_ prop
- `onCustomColorUpdate`(color) -- should be called when user decides to apply the selected color (e.g. `CustomColorPickerDialog` Update button)
- `onCustomColorCancel`(color) -- should be called when user decides to cancel the custom color selection (e.g. `CustomColorPickerDialog` Cancel button)
- all the `ColorPicker` props (`t`, `isMobile`, `theme`, ...etc)

**Note**: `selectionColor` prop is deprecated, please override the `.colorPicker_button_selected::after` class `border-color` rule (theme).

#### Text Color Inline Style Mapper
The `RichContentViewer` exposes the `inlineStyleMappers` prop. The mapper purpose is to provide a mapping `inlineStyle => Component`, that is used by the `RichContentViewer`. The prop value is expected to be an array of functions of the following signature:

```js

() => {
  style1: {children, { key }} => <Component1 .../>,
  style2: {children, { key }} => <Component2 .../>,
  ...
}

```

Specifically, the `textColorInlineStyleMapper` API accepts two parameters -- `config` and `raw` (aka ContentState), and returns the mapper array. The custom inline styles are picked from the `raw` according to the `styleSelectionPredicate`, and the style conversion is performed by the `customStyleFn` (2). Both APIs should be provided by the consumer within `config` object.

## References and Examples

Both [editor-example](../examples/main/shared/editor/EditorPlugins.jsx) and [viewer-example](../examples/main/shared/viewer/ViewerPlugins.jsx) apps demonstrate the plugin customization capabilities.
