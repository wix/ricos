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
- `viewer`
  - [#256](https://github.com/wix-incubator/rich-content/pull/256) convertToHTML

<hr/>

## 2.0.3 (Feb 10, 2019)

### :rocket: New Feature
- `viewer`
  - [#246](https://github.com/wix-incubator/rich-content/pull/246) fix headers inside of lists to be semantically correct 
- `headersMarkdown`
  - [#246](https://github.com/wix-incubator/rich-content/pull/246) whoo hoo :) new plugin for headers markdown 

### :bug: Bug Fix
- `image`
  - [#250](https://github.com/wix-incubator/rich-content/pull/250) reduce default preload size to 300px

### :house: Internal
- `general`
  - [b9a6f13](https://github.com/wix-incubator/rich-content/commit/b9a6f1354ab3cd00afd226f9aab777dfab4676cb) force publish all modules with each release

<hr/>

## 2.0.2 (Feb 7, 2019)

### :bug: Bug Fix

- `html`
  - [#248](https://github.com/wix-incubator/rich-content/pull/248) use 'auto' width on mobile
- `image`
  - [#249](https://github.com/wix-incubator/rich-content/pull/249) original size support for mobile cuts off full size images
- `viewer`
  - [#249](https://github.com/wix-incubator/rich-content/pull/249) original size support for mobile cuts off full size images

<hr/>

## 2.0.1 (Feb 4, 2019)
### :bug: Bug Fix
- `general`
  - [#242](https://github.com/wix-incubator/rich-content/pull/242) move error boundary from img/video plugins to atomic block wrapper
  - [#ca4c5da](https://github.com/wix-incubator/rich-content/commit/ca4c5dad0b4f817ff46dcb1b55702cf9bfeb4523) fixed babel-jest error
- `viewer`
  - [#244](https://github.com/wix-incubator/rich-content/pull/244) wrap atomic blocks with links instead of positioning a sibling

<hr/>

## 2.0.0 (Jan 28, 2019)

_NOTE:_ From this version onwards all modules will have the same version number, no more independent versioning.

### :boom: Breaking Change

- `common`
  - [#235](https://github.com/wix-incubator/rich-content/pull/235) add dropdown support in link panel. Breaking changes in all link panel users: `plugin-link`, `plugin-image` and `plugin-gallery`

### :rocket: New Feature

- `giphy`
  - [#236](https://github.com/wix-incubator/rich-content/pull/236) Add extra customization options to giphy plugin

### :bug: Bug Fix

- `video`
  - [#238](https://github.com/wix-incubator/rich-content/pull/238) Vimeo - urls not prefixed with http[s] didn't work
- `viewer`
  - [708c9a8](https://github.com/wix-incubator/rich-content/commit/708c9a843ce8a48841ef98c13ac211524acf3fb7) render empty container div when there is no content
  - [#240](https://github.com/wix-incubator/rich-content/pull/240) add componentDidCatch, render null for img or video plugins instead of crashing

### :house: Internal

- `general`
  - [#239](https://github.com/wix-incubator/rich-content/pull/239) prettier formatter
- `common`
  - [c6b143d](https://github.com/wix-incubator/rich-content/commit/c6b143dc792b3d9c6f7892bf24db1818bc7f4cd9) validate plugin schema only in development

<hr/>

## Video Plugin 1.6.0 (Jan 20, 2019)

### :rocket: New Feature

[#234](https://github.com/wix-incubator/rich-content/pull/234) thumbnail support - if you are using relative URLs this requires changes

<hr/>

## Image Plugin 1.5.12 (Jan 20, 2019)

### :bug: Bug Fix

- [#233](https://github.com/wix-incubator/rich-content/pull/233) PNG images are loaded as JPG in preload, losing transparency and showing black background

<hr/>

## HTML Plugin 1.5.20 (Jan 16, 2019)

### :bug: Bug Fix

- [#232](https://github.com/wix-incubator/rich-content/pull/232) first time iframe onload is fired before React.render(), so it will not refresh

<hr/>

## Rich Content 1.7.11 (Jan 16, 2019)

### :rocket: New Feature

- `video`
  - [#231](https://github.com/wix-incubator/rich-content/pull/231) import video with either url or pathname

<hr/>

## 1.7.10 (Jan 14, 2019)

### :rocket: New Feature

- `image`
  - [#20](https://github.com/wix-incubator/rich-content-plugins-wix/pull/20) original size in mobile

### :bug: Bug Fix

- `video`
  - [#227](https://github.com/wix-incubator/rich-content/pull/227) themable header + text input design
- `viewer`
  - [6f5e95b](https://github.com/wix-incubator/rich-content/commit/6f5e95b22a8c85972c82b73f795fc9fb4db81a8e) fixed centering of blocks

<hr/>

## 1.7.9 (Jan 8, 2019)

### :bug: Bug Fix

- `editor`
  - [70dae20](https://github.com/wix-incubator/rich-content/commit/70dae20c7f47a7a58fc309d7e2cde8dc5e51a4ce) text block styles toggle detaults to 'unstyled'
- `viewer`
  - [ddc2ec4](https://github.com/wix-incubator/rich-content/commit/ddc2ec4063e22b60d336321683b849915555a8ab) fixed check for empty text blocks

<hr/>

## 1.7.8 (Jan 7, 2019)

### :bug: Bug Fix

- `common`
  - [#220](https://github.com/wix-incubator/rich-content/pull/220) atomic block removal
- `giphy`
  - [#221](https://github.com/wix-incubator/rich-content/pull/221) style issues
- `viewer`
  - [#222](https://github.com/wix-incubator/rich-content/pull/222) block augmentation no longer mutates
  - [1200130](https://github.com/wix-incubator/rich-content/commit/12001307b1c6ba0153ae2b748b816a3b7da34ea0) render empty blocks as `<div>` tags
- `hashtag`
  - [#224](https://github.com/wix-incubator/rich-content/pull/224) prevent hashtag links in code-blocks

<hr/>

## 1.7.7 (Jan 3, 2019)

### :bug: Bug Fix

- `viewer`
  - [#218](https://github.com/wix-incubator/rich-content/pull/218) Fixed justified text alignment.
- `examples`
  - [#215](https://github.com/wix-incubator/rich-content/pull/215) Re-enable document scrolling after closing a modal when cliking outside + Prevent flyOut modals from jumping up when opening

<hr/>

## 1.7.6 (Dec 27, 2018)

### :rocket: New Feature

- `common`, `editor` & `viewer`
  - [#205](https://github.com/wix-incubator/rich-content/pull/205) block headers
- `link`
  - [#212](https://github.com/wix-incubator/rich-content/pull/212) optional auto link

### :bug: Bug Fix

- `viewer`
  - [#214](https://github.com/wix-incubator/rich-content/pull/214) soft new line at end of block

### :house: Internal

- `general`
  - [#213](https://github.com/wix-incubator/rich-content/pull/213) upgrade node version (8 -> 10)

<hr/>

## 1.7.5 (Dec 17, 2018)

### :bug: Bug Fix

- `viewer`
  - [#203](https://github.com/wix-incubator/rich-content/pull/203) add `text` class for text blocks
- `giphy`
  - [#192](https://github.com/wix-incubator/rich-content/pull/192) removing container styles of giphy to keep original width to height ratio
- `video`
  - [#194](https://github.com/wix-incubator/rich-content/pull/194) handle input selection focus and removed border radius on iphone
- `soundcloud`
  - [#195](https://github.com/wix-incubator/rich-content/pull/195) handle input selection focus on iphone and source url optimisations
  - [#206](https://github.com/wix-incubator/rich-content/pull/206) replacing insert button icon to a squared one (19\*19)
- `mentions`
  - [#204](https://github.com/wix-incubator/rich-content/pull/204) viewer

<hr/>

## 1.7.4 (Nov 15, 2018)

### :bug: Bug Fix

- `common`
  - [a40574b8](https://github.com/wix-incubator/rich-content/commit/a40574b8d551e40dd8d1c27b3f7b1f7bc6f05057) decreased mobile plugin add button font size

## 1.7.3 (Nov 13, 2018)

### :bug: Bug Fix

- `giphy`
  - [#191](https://github.com/wix-incubator/rich-content/pull/191) using img tag (self closing) for viewer istead of gifplayer (as its not using a void img element tag)

<hr/>

## 1.7.2 (Nov 11, 2018)

### :bug: Bug Fix

- `general`
  - [#187](https://github.com/wix-incubator/rich-content/pull/187) title and subtitle keyboard shortcuts are remapped to inline-headers + data normalization now contains block-level headers conversion to inline-style headers
- `soundcloud`
  - [#188](https://github.com/wix-incubator/rich-content/pull/188) Fix soundcloud regix url validator to include mobile urls + Save & Cancel Button font padding fixes on mobile
- `video`
  - [#190](https://github.com/wix-incubator/rich-content/pull/190) Text input error icon padding fix + Text input shadow fix on safari

<hr/>

## 1.7.1 (Nov 7, 2018)

### :rocket: New Feature

- `custom video upload extension`
  - [#170](https://github.com/wix-incubator/rich-content/pull/170) `plugin-video` extension added to upload custom videos
- `common`
  - [#179](https://github.com/wix-incubator/rich-content/pull/179) `mapStoreDataToButtonProps` API exposed (to be used in toolbar button structures)
  - [#179](https://github.com/wix-incubator/rich-content/pull/179) `width` and `height` props added to the plugin config
- `html`
  - [#179](https://github.com/wix-incubator/rich-content/pull/179) `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, and `maxHeight` values can be provided via settings. See [PluginCustomization](./docs/PluginCustomization.md) doc for reference

### :bug: Bug Fix

- `html`
  - [#179](https://github.com/wix-incubator/rich-content/pull/179) html component maximum width is limited by the editor width rather set hard-coded

### :book: Documentation

- [PluginCustomization](./docs/PluginCustomization.md) doc added

<hr/>

## 1.7.0 (Oct 31, 2018)

### :boom: Breaking Change

- `viewer`
  - [#176](https://github.com/wix-incubator/rich-content/pull/176) RichContentViewer `isRtl` prop replaced with `textDirection` prop (accepted values are `'rtl'`, `'ltr'`)

### :rocket: New Feature

- `viewer`
  - [#176](https://github.com/wix-incubator/rich-content/pull/176) text direction applied to blocks accordingly to the text symbols

### :bug: Bug Fix

- `editor`
  - [#171](https://github.com/wix-incubator/rich-content/pull/171) SEO demand: render list item content wrapped in `<p>` tags
- `viewer`
  - [#171](https://github.com/wix-incubator/rich-content/pull/171) SEO demand: render list item content wrapped in `<p>` tags
  - [#175](https://github.com/wix-incubator/rich-content/pull/175) plugin rendering: redundant whitespaces removed
- `link`
  - [#175](https://github.com/wix-incubator/rich-content/pull/175) `LinkParseStrategy` omits parsed range if it matches an entity range (link duplicates issue)

<hr/>

## 1.6.10 (Oct 24, 2018)

### :house: Internal

- `general`
  - `package-lock.json` files are not ignored

<hr/>

## 1.6.9 (Oct 24, 2018)

### :rocket: New Feature

- `giphy`
  - [#161](https://github.com/wix-incubator/rich-content/pull/161) `plugin-giphy` implemented

<hr/>

## 1.6.8 (Oct 18, 2018)

### :bug: Bug Fix

- `soundcloud`
  - fix cropped message in mobile view

### :house: Internal

- `general`
  - draft-js version updated to 0.10.272

<hr/>

## 1.6.7 (Oct 18, 2018)

### :rocket: New Feature

- `common`
  - [#159](https://github.com/wix-incubator/rich-content/pull/159) `modalDecorations` API is added to `openModal`, `InlineButtons`, `InsertButtons` APIs. Check [documentation](./docs/plugin-development-guidelines/ModalDialogs.md) for more details
- `link`
  - [#158](https://github.com/wix-incubator/rich-content/pull/158) customize link behaviour by declaring `onClick` handler in link plugin config

### :bug: Bug Fix

- `viewer`
  - [#152](https://github.com/wix-incubator/rich-content/issues/152) empty blocks are not cleaned up
- `common`
  - `modalStylesFn` API added to `InlineButtons` structure for dynamic styling support

### :book: Documentation

- [#159](https://github.com/wix-incubator/rich-content/pull/159) [Modal Dialogs](./docs/plugin-development-guidelines/ModalDialogs.md) doc added

<hr/>

## 1.6.6 (Oct 15, 2018)

### :rocket: New Feature

- `common`
  - [#154](https://github.com/wix-incubator/rich-content/pull/154) `modalStylesFn` API added to `InsertButtons` structure for dynamic styling support
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

<hr/>

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

<hr/>

## 1.6.4 (Oct 2, 2018)

### :bug: Bug Fix

- `viewer`
  - [#144](https://github.com/wix-incubator/rich-content/pull/144) added theme support for `List`
  - [#145](https://github.com/wix-incubator/rich-content/pull/145) pass `isMobile` prop to plugins
  - [#146](https://github.com/wix-incubator/rich-content/pull/146) fix: empty `List` items are not rendered

<hr/>

## 1.6.3 (Sep 27, 2018)

### :rocket: New Feature

- `soundcloud`
  - [#92](https://github.com/wix-incubator/rich-content/pull/92) `plugin-sound-cloud` implemented

### :bug: Bug Fix

- `html`
  - [#141](https://github.com/wix-incubator/rich-content/pull/141) width and height component data is now applied on HTML viewer component

<hr/>

## 1.6.2 (Sep 25, 2018)

### :rocket: New Feature

- `general`
  - [#142](https://github.com/wix-incubator/rich-content/pull/142) RCE `config.getToolbarSettings` API now allows to customize the plugin functionality toolbars. Check [documentation](https://github.com/wix-incubator/rich-content/blob/master/docs/ToolbarCustomization.md) for more details
  - [#143](https://github.com/wix-incubator/rich-content/pull/143) RCE `config.getToolbarSettings` API now allows to customize the toolbar display mode. Check [documentation](https://github.com/wix-incubator/rich-content/blob/master/docs/ToolbarCustomization.md) for more details

### :book: Documentation

- [#143](https://github.com/wix-incubator/rich-content/pull/143) [Toolbar Customization](https://github.com/wix-incubator/rich-content/blob/master/docs/ToolbarCustomization.md) updated
- [Theming Guidelines](https://github.com/wix-incubator/rich-content/blob/master/docs/plugin-development-guidelines/Theming.md) added

<hr/>

## 1.6.1 (Sep 13, 2018)

### :rocket: New Feature

- `viewer`

  - [#134](https://github.com/wix-incubator/rich-content/pull/134) `RichContentViewer` accepts `config` prop for plugin configuration

- `examples`
  - [#134](https://github.com/wix-incubator/rich-content/pull/134) [viewer-ssr](https://github.com/wix-incubator/rich-content/tree/master/examples/viewer-ssr) example added

### :bug: Bug Fix

- `viewer`
  - [#134](https://github.com/wix-incubator/rich-content/pull/134) block rendering and text alignment fixed

<hr/>

## 1.6.0 (Sep 7, 2018)

### :boom: Breaking Change

- `general`
  - [#128](https://github.com/wix-incubator/rich-content/pull/128) `image` and `gallery` plugins are moved to a [separate repository](https://github.com/wix-incubator/rich-content-plugins-wix) since they have Wix private dependencies

<hr/>

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

<hr/>

## 1.5.2-alpha.0 (Sep 5, 2018)

### :rocket: New Feature

- `soundcloud`
  - [#92](https://github.com/wix-incubator/rich-content/pull/92) `plugin-sound-cloud` implemented

<hr/>

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

<hr/>

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

<hr/>

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

<hr/>

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

<hr/>

## 1.3.4 (Aug 20, 2018)

### :bug: Bug Fix

- `general`
  - Theme supports empty css classes
- `editor`
  - Firefox text editing
  - Close alignment dropdown when clicked outside
- `image`
  - Transition between `preLoad` and `hiRes` images

### :house: Internal

- `general`
  - Seperate bundle for viewer portions of plugins

<hr/>

## 1.3.3 (Aug 19, 2018)

### :bug: Bug Fix

- `image`
  - preload image URL supports SSR

<hr/>

## 1.3.2 (Aug 19, 2018)

### :bug: Bug Fix

- `editor`
  - lack of `config` prop no longer crashes
- `video`
  - prevent content overflow in mobile

<hr/>

## 1.3.1 (Aug 16, 2018)

### :bug: Bug Fix

- `editor`
  - Toolbar settings functionality
  - CSS is extracted from TextButton
  - Moved padding from wrapper div to toolbar margin
- `image`
  - Check if mounted before assuming error in image src

<hr/>

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

<hr/>

## 1.2.14 (Aug 8, 2018)

### :rocket: New Feature

- `general`
  - `react-tooltip`-based tooltips are not cut off anymore
  - Mobile static and inline toolbars are scrollbable and arrowless

### :bug: Bug Fix

- `plugin-video`
  - Overlay and Player z-index issues

<hr/>

## 1.2.13 (Aug 7, 2018)

### :bug: Bug Fix

- `editor`
  - `TextAlignmentButton` works as standalone button
  - Filter plugin and add plugin buttons from toolbar structure

<hr/>

## 1.2.12 (Aug 7, 2018)

### :rocket: New Feature

- `editor`
  - [#77](https://github.com/wix-incubator/rich-content/pull/77) `alwaysShowSideToolbar` prop forces side toolbar to be displayed regardless of plugins

### :bug: Bug Fix

- `editor`
  - `mergeButtonList` no longer mutates original button list
  - inline toolbar respects `textButtons` array order and platform

<hr/>

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

<hr/>

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

<hr/>

## 1.2.9 (Aug 2, 2018)

### :house: Internal

- `general`
  - [#75](https://github.com/wix-incubator/rich-content/pull/75) Added commonjs bundle

<hr/>

## 1.2.8 (Aug 2, 2018)

### :rocket: New Feature

- `editor`
  - Decoupled mobile add button from mobile toolbar
- `plugin-code-block`
  - [#72](https://github.com/wix-incubator/rich-content/pull/72) Changed insert button position in toolbar + allow position configuration

### :house: Internal

- `general`
  - [#71](https://github.com/wix-incubator/rich-content/pull/71) Bundled with rollup

<hr/>

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
    <hr/>

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

<hr/>

## 1.2.5 (Jul 23, 2018)

### :boom: Breaking Change

- `editor`
  - [#58](https://github.com/wix-incubator/rich-content/pull/58) Default `locale` is `'en'`, English texts are imported statically
    Set the `locale` and `localeResource` props to use another language
