# Plugin Customization

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

The `toolbar` setting refers to plugin functionality toolbar. Currently, it exposes a single field `hidden` which is expected to be an array of toolbar button `keynames` to be removed from toolbar.

### HTML Plugin Settings

| setting key | description | default value | is required? |
|-------------|-------------|---------------|--------------|
| `htmlIframeSrc` | `src` attribute of the HTML `iframe` when the plugin is used in `source mode` | none | Yes |
| `maxWidth` | the maximum component width in pixels. **note:** this value is dynamicaly limited by the editor boundaries | 940 | No
| `minWidth` | the minimum component width in pixels | 35 | No
| `maxHeight` | the maximum component height in pixels | 1200 | No
| `minHeight` | the minimum component height in pixels | 35 | No
| `width` | the initial component width in pixels | 740 | No
| `height` | the initial component height in pixels | 242 | No

### Hashtag Plugin Settings

| setting key | description | default value | is required? |
|-------------|-------------|---------------|--------------|
| `createHref` | converter function that converts the Hashtag `#text` to URL. if provided, the hashtags will behave as anchor links | none | No |
| `onClick` | optional Hashtag click handler | none | No

### Link Plugin Settings

| setting key | description | default value | is required? |
|-------------|-------------|---------------|--------------|
| `onClick` | optional Link click handler | none | No

### Mentions Plugin Settings

| setting key | description | default value | is required? |
|-------------|-------------|---------------|--------------|
| `getMentions` | function that retrieves a list of suggestions according to provided search query parameter  | none | Yes
| `onMentionClick` | optional Mention click handler | none | No

### Giphy Plugin Settings

| setting key | description | default value | is required? |
|-------------|-------------|---------------|--------------|
| `giphySdkApiKey` | [Giphy Developer API key](https://developers.giphy.com/dashboard/?create=true) | none | 
Yes
| `componentDataDefaults` | Default component data | `{ config: { size: 'content', alignment: 'center' } }` | No
| `insertToolbars` | Which toolbars to add insert button to | `[TOOLBARS.FOOTER]` | No

## References and Examples

Both [editor-example](../examples/editor/src/PluginsConfig.js) and [viewer-example](../examples/viewer/src/App.jsx) apps demonstrate the plugin customization capabilities.
