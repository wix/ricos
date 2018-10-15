# Changelog

> **Tags:**
>
> - :boom: [Breaking Change]
> - :rocket: [New Feature]
> - :bug: [Bug Fix]
> - :book: [Documentation]
> - :house: [Internal]

## [Unreleased]

### :rocket: New Feature

- `common`:
  - [#154](https://github.com/wix-incubator/rich-content/pull/154) `modalStylesFn` API added to `InsertButtons` structure for dynamic style support
  - [#154](https://github.com/wix-incubator/rich-content/pull/154) `inline` property added to `getModalStyles` util (transparent overlay)

### :bug: Bug Fix

- `emoji`
  - [#154](https://github.com/wix-incubator/rich-content/pull/154) `SelectButton` hard-coded styles are overridable by theme
- `mentions`
  - [#148](https://github.com/wix-incubator/rich-content/pull/148) add option `repositionSuggestions` to support better suggestions popup positioning in iframe
- `soundcloud`
  - [#156](https://github.com/wix-incubator/rich-content/pull/156) adjusted soundcloud modal layout in mobile view
- `viewer`
  - [#153](https://github.com/wix-incubator/rich-content/pull/153) fix: `header-one` is not rendered
  - [#152](https://github.com/wix-incubator/rich-content/issues/152) white-space render is fixed
  - [#157](https://github.com/wix-incubator/rich-content/pull/157) add RTL support

<br/>

## 1.6.5 (Oct 3, 2018)

### :rocket: New Feature

- `general`
  - [#149](https://github.com/wix-incubator/rich-content/pull/149) RCE `config.getToolbarSettings` API now allows to provide decoration component for toolbar containers. Check [documentation](https://github.com/wix-incubator/rich-content/blob/master/docs/ToolbarCustomization.md) for more details
- `editor`
  - [#151](https://github.com/wix-incubator/rich-content/pull/151) RCE `handleReturn` prop exposed. Check [documentation](./docs/RichContentEditorApi.md) for more details

### :bug: Bug Fix

- `common`
  - `BaseComponent` supplies `blockKey` when subscribing for block

### :book: Documentation

- [RichContentEditor API](./docs/RichContentEditorApi.md) doc added

<br/>

## 1.6.4 (Oct 2, 2018)

### :bug: Bug Fix

- `viewer`
  - [#144](https://github.com/wix-incubator/rich-content/pull/144) added theme support for `List`
  - [#145](https://github.com/wix-incubator/rich-content/pull/145) pass `isMobile` prop to plugins
  - [#146](https://github.com/wix-incubator/rich-content/pull/146) fix: empty `List` items are not rendered

<br/>

## 1.6.3 (Sep 27, 2018)

### :rocket: New Feature

- `soundcloud`
  - [#92](https://github.com/wix-incubator/rich-content/pull/92) `plugin-sound-cloud` implemented


### :bug: Bug Fix

- `html`
  - [#141](https://github.com/wix-incubator/rich-content/pull/141) width and height component data is now applied on HTML viewer component

<br/>

## 1.6.2 (Sep 25, 2018)

### :rocket: New Feature

- `general`
  - [#142](https://github.com/wix-incubator/rich-content/pull/142) RCE `config.getToolbarSettings` API now allows to customize the plugin functionality toolbars. Check [documentation](https://github.com/wix-incubator/rich-content/blob/master/docs/ToolbarCustomization.md) for more details
  - [#143](https://github.com/wix-incubator/rich-content/pull/143) RCE `config.getToolbarSettings` API now allows to customize the toolbar display mode. Check [documentation](https://github.com/wix-incubator/rich-content/blob/master/docs/ToolbarCustomization.md) for more details

### :book: Documentation

- [#143](https://github.com/wix-incubator/rich-content/pull/143) [Toolbar Customization](https://github.com/wix-incubator/rich-content/blob/master/docs/ToolbarCustomization.md) updated
- [Theming Guidelines](https://github.com/wix-incubator/rich-content/blob/master/docs/plugin-development-guidelines/Theming.md) added

<br/>

## 1.6.1 (Sep 13, 2018)

### :rocket: New Feature

- `viewer`
  - [#134](https://github.com/wix-incubator/rich-content/pull/134) `RichContentViewer` accepts `config` prop for plugin configuration

- `examples`
  - [#134](https://github.com/wix-incubator/rich-content/pull/134) [viewer-ssr](https://github.com/wix-incubator/rich-content/tree/master/examples/viewer-ssr) example added

### :bug: Bug Fix

- `viewer`
  - [#134](https://github.com/wix-incubator/rich-content/pull/134) block rendering and text alignment fixed

<br/>

## 1.6.0 (Sep 7, 2018)

### :boom: Breaking Change

- `general`
  - [#128](https://github.com/wix-incubator/rich-content/pull/128) `image` and `gallery` plugins are moved to a [separate repository](https://github.com/wix-incubator/rich-content-plugins-wix) since they have Wix private dependencies

<br/>

## 1.5.2 (Sep 5, 2018)

~~### :rocket: New Feature~~

~~- `soundcloud`~~

  ~~- [#92](https://github.com/wix-incubator/rich-content/pull/92) `plugin-sound-cloud` implemented~~

### :bug: Bug Fix

- `image`
  - [#125](https://github.com/wix-incubator/rich-content/pull/125) image component links now are handled individually
- `viewer`
  - SSR support improved [WIP]
  - `RichContentViewer`: default props prevent crash

<br/>

## 1.5.2-alpha.0 (Sep 5, 2018)

### :rocket: New Feature

- `soundcloud`
  - [#92](https://github.com/wix-incubator/rich-content/pull/92) `plugin-sound-cloud` implemented

<br/>

## 1.5.1 (Sep 3, 2018)

### :bug: Bug Fix

- `gallery`
  - `gallery-image-settings`: image replacement fixed
  - `gallery-image-settings`: delete, replace, navigation icons fixed
  - `gallery-image-settings`: mobile icons fixed
  - `gallery-image-settings`: footer is accessible

### :house: Internal

- `general`
  - markdown support infra added
  - markdown lint errors fixed

<br/>

## 1.5.0 (Aug 28, 2018)

### :boom: Breaking Change

- `general`
  - [#116](https://github.com/wix-incubator/rich-content/pull/116) `config` plugin-specific section keys are standardized -- now the plugin types should be used as keys. Check [example](https://github.com/wix-incubator/rich-content/blob/master/examples/editor/src/PluginsConfig.js) for reference
- `code-block`
  - [#113](https://github.com/wix-incubator/rich-content/pull/113) `config.codeBlock.position` property is obsolete; use `config.getToolbarSettings` to override plugin text button settings

### :bug: Bug Fix

- `common`
  - [#115](https://github.com/wix-incubator/rich-content/pull/1153) `Tooltip` performance: `rebuild` is called only if `shouldRebuildOnUpdate` returns true
- `editor`
  - Text justify no longer stretches the last line of text
- `gallery`
  - [#120](https://github.com/wix-incubator/rich-content/pull/120) file handlers register with block key in order to target the correct plugin instance
- `image`
  - [#120](https://github.com/wix-incubator/rich-content/pull/120) file handlers register with block key in order to target the correct plugin instance
  - String `src` is acceptable and passes validation

### :book: Documentation

- [UI Settings](https://github.com/wix-incubator/rich-content/blob/master/docs/UiSettings.md) added

### :house: Internal

- `general`
  - [#111](https://github.com/wix-incubator/rich-content/pull/111) auto deploy to `surge.sh`

<br/>

## 1.4.0 (Aug 22, 2018)

### :boom: Breaking Change

- `editor`
  - `RichContentEditor`'s `textButtons` prop removed

### :rocket: New Feature

- `editor`
  - RCE `config.getToolbarSettings` API now allows to customize the plugin text buttons. Check [documentation](https://github.com/wix-incubator/rich-content/blob/master/docs/ToolbarCustomization.md) for more details

### :bug: Bug Fix

- `common`
  - [#109](https://github.com/wix-incubator/rich-content/pull/109) Normalize text for atomic blocks

### :book: Documentation

- [Toolbar Customization](https://github.com/wix-incubator/rich-content/blob/master/docs/ToolbarCustomization.md) updated

<br/>

## 1.3.5 (Aug 22, 2018)

### :bug: Bug Fix

- `common`
  - [#104](https://github.com/wix-incubator/rich-content/pull/104) Add block after file change `initialState` is set
- `editor`
  - [#103](https://github.com/wix-incubator/rich-content/pull/103) Close link panel on click outside

### :house: Internal

- `general`
  - [#105](https://github.com/wix-incubator/rich-content/pull/105) Require `@wix/draft-js@0.10.163` fixed version peer dependecy
- `examples`
  - [#101](https://github.com/wix-incubator/rich-content/pull/101) `npm run bootstrap` links all the modules to the examples

<br/>

## 1.3.4 (Aug 20, 2018)

### :bug: Bug Fix

- `general`
  - Theme supports empty css classes
- `editor`
  - Firefox text editing
  - Close alignment dropdown when clicke d outside
- `image`
  - Transition between `preLoad` and `hiRes` images

### :house: Internal

- `general`
  - Seperate bundle for viewer portions of plugins

<br/>

## 1.3.3 (Aug 19, 2018)

### :bug: Bug Fix

- `image`
  - preload image URL supports SSR

<br/>

## 1.3.2 (Aug 19, 2018)

### :bug: Bug Fix

- `editor`
  - lack of `config` prop no longer crashes
- `video`
  - prevent content overflow in mobile

<br/>

## 1.3.1 (Aug 16, 2018)

### :bug: Bug Fix

- `editor`
  - Toolbar settings functionality
  - CSS is extracted from TextButton
  - Moved padding from wrapper div to toolbar margin
- `image`
  - Check if mounted before assuming error in image src

<br/>

## 1.3.0 (Aug 14, 2018)

### :boom: Breaking Change

- `editor`
  - `RichContentEditor`'s `alwaysShowSideToolbar`, `sideToolbarOffset`, `hideFooterToolbar` props removed
- `general`
  - `InsertButtons` API: `addToSideToolbar` property removed; `toolbars` property is required

### :rocket: New Feature

- `editor`
  - RCE `config.getToolbarSettings` API allows to customize toolbar instantiation, visibility, offset point, and buttons. Check [documentation](https://github.com/wix-incubator/rich-content/blob/master/docs/ToolbarCustomization.md) for more details

### :bug: Bug Fix

- `plugin-gallery`
  - Add Media and Replace button UI and functionality
  - Image Settings header is clickable

### :house: Internal

- `general`
  - Published to public npm registry

### :book: Documentation

- [Toolbar Customization](https://github.com/wix-incubator/rich-content/blob/master/docs/ToolbarCustomization.md) added

<br/>

## 1.2.14 (Aug 8, 2018)

### :rocket: New Feature

- `general`
  - `react-tooltip`-based tooltips are not cut off anymore
  - Mobile static and inline toolbars are scrollbable and arrowless

### :bug: Bug Fix

- `plugin-video`
  - Overlay and Player z-index issues

<br />

## 1.2.13 (Aug 7, 2018)

### :bug: Bug Fix

- `editor`
  - `TextAlignmentButton` works as standalone button
  - Filter plugin and add plugin buttons from toolbar structure

<br />

## 1.2.12 (Aug 7, 2018)

### :rocket: New Feature

- `editor`
  - [#77](https://github.com/wix-incubator/rich-content/pull/77) `alwaysShowSideToolbar` prop forces side toolbar to be displayed regardless of plugins

### :bug: Bug Fix

- `editor`
  - `mergeButtonList` no longer mutates original button list
  - inline toolbar respects `textButtons` array order and platform

<br />

## 1.2.11 (Aug 7, 2018)

### :rocket: New Feature

- `general`
  - [#78](https://github.com/wix-incubator/rich-content/pull/78) `handleFileSelection` helper is passed `componentData` as param
  - allow responsive toolbars to scroll beyond 2 pages
  - fixed plugin inline buttons & inline dropdown button alignment

### :bug: Bug Fix

- `general`
  - `postcss` no londer renames @rules such as @keyframes
- `editor`
  - mobile toolbar respects `textButtons` array order

<br />

## 1.2.10 (Aug 6, 2018)

### :bug: Bug Fix

- `common`
  - [#70](https://github.com/wix-incubator/rich-content/issues/70) use `button.componentData` to be consistent with `InlineButtons`
- `plugin-image`
  - update editorState as well as componentData on upload
- `plugin-gallery`
  - update editorState as well as componentData on upload
  - invoke `stateFromProps` only when a change has occured

### :house: Internal

- `general`
  - [#82](https://github.com/wix-incubator/rich-content/pull/82) Transpile using rollup

<br />

## 1.2.9 (Aug 2, 2018)

### :house: Internal

- `general`
  - [#75](https://github.com/wix-incubator/rich-content/pull/75) Added commonjs bundle

<br />

## 1.2.8 (Aug 2, 2018)

### :rocket: New Feature

- `editor`
  - Decoupled mobile add button from mobile toolbar
- `plugin-code-block`
  - [#72](https://github.com/wix-incubator/rich-content/pull/72) Changed insert button position in toolbar + allow position configuration

### :house: Internal

- `general`
  - [#71](https://github.com/wix-incubator/rich-content/pull/71) Bundled with rollup

<br />

## 1.2.7 (Jul 30, 2018)

### :rocket: New Feature

- `plugin-code-block` added

### :bug: Bug Fix

- `common`
  - plugin toolbar vertical position
- `plugin-link`
  - default target value now affects the links
- `plugin-image`
  - retina no longer blurry
    <br />

## 1.2.6 (Jul 26, 2018)

### :rocket: New Feature

- `editor`
  - `editorBounds` added to pubsub
  - Width is dynamic, no longer restricted to `740px`
- `plugin-divider`
  - Set width using `%` instead of `px`

### :bug: Bug Fix

- `editor`
  - [#61](https://github.com/wix-incubator/rich-content/pull/61) aligned `AddPluginModal` with new data structure
  - Typo in `StaticToolbar` theme merging
- `common`
  - `BaseToolbar` uses `Measure` in order to be responsive
- `plugin-emoji`
  - Fixed responsive toolbar trigerring

### :house: Internal

- `plugin-gallery`
  - Locked `pro-gallery-renderer` and `image-client-api` versions

<br />

## 1.2.5 (Jul 23, 2018)

### :boom: Breaking Change

- `editor`
  - [#58](https://github.com/wix-incubator/rich-content/pull/58) Default `locale` is `'en'`, English texts are imported statically
    Set the `locale` and `localeResource` props to use another language
