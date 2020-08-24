# Changelog

> **Tags:**
>
> - 💥 [Breaking Change]
> - 🚀️ [New Feature]
> - 🐛 [Bug Fix]
> - 📖 [Documentation]
> - 🏠 [Internal]

## [Unreleased]

<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>

### 🏠 Internal
- `file-upload`
  - [#1411](https://github.com/wix-incubator/rich-content/pull/1411) errors saved in component data and error code support

</details>
<hr/>

## 7.16.14 (Aug 23, 2020)
### :bug: Bug Fix
- `ricos-editor`
  - [#1471](https://github.com/wix-incubator/rich-content/pull/1471/) missing height in ricos editor wrapping div
- `editor-common`
  - [#1473](https://github.com/wix-incubator/rich-content/pull/1473) fix RadioGroup button


## 7.16.12 (Aug 20, 2020)
### :bug: Bug Fix
- `ricos-editor`
  - [#1470](https://github.com/wix-incubator/rich-content/pull/1470/) multiple editors support (react-modal bug fix)

## 7.16.11 (Aug 20, 2020)
### :bug: Bug Fix
- `image`
  - [#1467](https://github.com/wix-incubator/rich-content/pull/1467) image caption aligned correctly in rtl
- `fullscreen`
  - [##1468](https://github.com/wix-incubator/rich-content/pull/#1468) add pro gallery css to fullscreen css
  - [##1432](https://github.com/wix-incubator/rich-content/pull/#1468) fix resolution on mobile

## 7.16.10 (Aug 19, 2020)
### :bug: Bug Fix
- `editor`
  - [#1466](https://github.com/wix-incubator/rich-content/pull/1466) default formatting toolbars change - remove first divider

## 7.16.9 (Aug 18, 2020)
### :bug: Bug Fix
- `editor`
  - [#1463](https://github.com/wix-incubator/rich-content/pull/1463) external formatting toolbar: preserve selection on inline style change
  - fixtate 'draftjs-conductor' version due to broken es5
- `file-upload`
  - [#1465](https://github.com/wix-incubator/rich-content/pull/1465) remove dependency of file type, long extension clipping and otherIcon themeing fix


## 7.16.8 (Aug 18, 2020)
### :bug: Bug Fix
- `file-upload`
  - [#1459](https://github.com/wix-incubator/rich-content/pull/1459) fix icon colors and theme wiring, replace full width with best fit

## 7.16.6 (Aug 16, 2020)
### :rocket: New Feature
- `common`
  - [#1452](https://github.com/wix-incubator/rich-content/pull/1452) debugging info reported to console if `debug` query param added
### :bug: Bug Fix
- `editor`
  - [#1454](https://github.com/wix-incubator/rich-content/pull/1454) RichContentEditor: draft `handleBeforeInput` params passed to `props.handleBeforeInput`
- `editor-common`
  - [#1448](https://github.com/wix-incubator/rich-content/pull/1448) colorPicker reset to default and + button (regression from 7.16.3, PR#1428)
- `ricos-editor`
  - [#1456](https://github.com/wix-incubator/rich-content/pull/1456) modal `removeChild` issue
- `editor`
  - [#1453](https://github.com/wix-incubator/rich-content/pull/1453) fix list theming editor & viewer



## 7.16.4 (Aug 13, 2020)
### :rocket: New Feature
- `editor`
  - [#1370](https://github.com/wix-incubator/rich-content/pull/1370) external toolbar API updated
- `ricos-editor`
  - [#1417](https://github.com/wix-incubator/rich-content/pull/1417) `onBusyChange` notifies when editor is handling upload in media plugins
- `video`
  - [#1424](https://github.com/wix-incubator/rich-content/pull/1424) validate input url (#1424)
- `image` `gallery`
  - [#1431](https://github.com/wix-incubator/rich-content/pull/1431) `disableExpand` config allows disabling expand mode
- `ricos-driver`
  - [#1423](https://github.com/wix-incubator/rich-content/pull/1423) Isolated package for exporting selectors
- `file-upload`
  - [#1411](https://github.com/wix-incubator/rich-content/pull/1411) upload error displays with a tooltip
### :bug: Bug Fix
- `general`
  - [#1428](https://github.com/wix-incubator/rich-content/pull/1428) add preventDefault to toolbars
- `preview`
  - [#1419](https://github.com/wix-incubator/rich-content/pull/1419) fixed image counter + display `seeFullPost` only if 1 < imgCount < 5
  - [#1425](https://github.com/wix-incubator/rich-content/pull/1425) `onPreviewExpand` callback to determine if content was expanded (full-view)
- `ricos-editor`
  - [#1447](https://github.com/wix-incubator/rich-content/pull/1447) `onChange` is called only when content changes

## 7.16.3 (Aug 4, 2020)
### :bug: Bug Fix
- `general`
  - [#1413](https://github.com/wix-incubator/rich-content/pull/1413) improve performance - mainly disable the rendering of toolbars when they are not needed
  - [#1413](https://github.com/wix-incubator/rich-content/pull/1413) fix many react warnings for keys  

## 7.16.2 (Aug 4, 2020)
### :bug: Bug Fix
- `general`
  - [#1420](https://github.com/wix-incubator/rich-content/pull/1420) added lib entry points to to babel transpilation
- `common`
  - [#1415](https://github.com/wix-incubator/rich-content/pull/1415) tooltip setstate on an unmounted component and ssr hydration fixed
- `editor`
  - [#1410](https://github.com/wix-incubator/rich-content/pull/1410) fix space deletes atomic block by disabling keyboard inputs on atomic blocks
  - [#1381](https://github.com/wix-incubator/rich-content/pull/1381) fix blur editor on esc click

## 7.16.1 (Aug 2, 2020)
### :bug: Bug Fix
- `plugin-link`
  - [#1409](https://github.com/wix-incubator/rich-content/pull/1409) link viewer without onClick from settings
- `plugin-link`
  - [#1402](https://github.com/wix-incubator/rich-content/pull/1402) anchor - config changes, ricos documentation, schema fix

## 7.16.0 (Jul 30, 2020)
### :rocket: New Feature
- `gallery`
  - [#1373](https://github.com/wix-incubator/rich-content/pull/1373) gallery plugin upload error handling
- `file-upload`
  - [#1138](https://github.com/wix-incubator/rich-content/pull/1138) plugin design overhaul
- `text-selection-toolbar`
  - [#1397](https://github.com/wix-incubator/rich-content/pull/1397) text selection toolbar & tweet button
  
## 7.15.4 (Jul 29, 2020)
### :bug: Bug Fix
- `image`
  - [#1399](https://github.com/wix-incubator/rich-content/pull/1399) link in image viewer
- `viewer`
  - [#1395](https://github.com/wix-incubator/rich-content/pull/1395) remove react-dom/server from viewer dependencies (reduce bundle size)
  - [#1404](https://github.com/wix-incubator/rich-content/pull/1404) change viewer justify css
- `ricos-editor`
  - [#1405](https://github.com/wix-incubator/rich-content/pull/1405) OpenModal crash when no modalStyles sent (giphy modal bug)
- `adsense`
  - [#1403](https://github.com/wix-incubator/rich-content/pull/1403) Edit Panel UI
- `general`
  - [#1400](https://github.com/wix-incubator/rich-content/pull/1400) missing type definitions for viewer and lib entrypoints

## 7.15.3 (Jul 28, 2020)
### :bug: Bug Fix
- `ricos`
  - [#1391](https://github.com/wix-incubator/rich-content/pull/1391) provides the correct translations given a locale
  - [#1384](https://github.com/wix-incubator/rich-content/pull/1384) mentions - type difference for editor/viewer

### :rocket: New Feature
- `spoiler`
  - [#1194](https://github.com/wix-incubator/rich-content/pull/1194) Spoiler plugin for text

## 7.15.1 (Jul 27, 2020)
### :bug: Bug Fix
- `plugin-link`
  - [#1393](https://github.com/wix-incubator/rich-content/pull/1393) fix position of anchors dropdown filter 

## 7.15.0 (Jul 27, 2020)
### :rocket: New Feature
- `plugin-link`
  - [#1142](https://github.com/wix-incubator/rich-content/pull/1142) anchors

## 7.14.0 (Jul 26, 2020)
### :rocket: New Feature
- `editor-common`
  - [#1382](https://github.com/wix-incubator/rich-content/pull/1382) dynamic position for plugin/inline toolbar on mobile
### :bug: Bug Fix
- `general`
  - [#1345](https://github.com/wix-incubator/rich-content/pull/1345) fix tooltip for multiple editor/viewer
- `editor`
  - [#1379](https://github.com/wix-incubator/rich-content/pull/1379) prevent wix focus-ring (formatting toolbar corruption)
  - [#1388](https://github.com/wix-incubator/rich-content/pull/1388) add shortcut handling for cmd+shift+j instead of draft-js inline styling handling
- `list`
  - [#1377](https://github.com/wix-incubator/rich-content/pull/1377) lists position next to atomic blocks with alignment
- `ricos`
  - [#1378](https://github.com/wix-incubator/rich-content/pull/1378) fixed modal theme of multiple instances
  - [#1383](https://github.com/wix-incubator/rich-content/pull/1383) modification of [#1378](https://github.com/wix-incubator/rich-content/pull/1378) to apply to ricos only
- `image`
  - [#1386](https://github.com/wix-incubator/rich-content/pull/1386) image accessibility - when image selected, enter or space click open fullscreen
- `editor-common`
  - [#1382](https://github.com/wix-incubator/rich-content/pull/1382) resizeObserver undefined error fixed
  - [#1385](https://github.com/wix-incubator/rich-content/pull/1385) added CharacterMetadata & BlockMap to exposed draft-js types

## 7.13.2 (Jul 23, 2020)
### 🐛 Bug Fix
- `editor`
  - [#1379](https://github.com/wix-incubator/rich-content/pull/1379) prevent wix focus-ring (formatting toolbar corruption)
- `fullscreen`
  - [#1380](https://github.com/wix-incubator/rich-content/pull/1380) incorrect url for small images leading to blurry display + unit tests

## 7.13.1 (Jul 22, 2020)

### 🚀️ New Feature

- `ricos-common`
  - [#1371](https://github.com/wix-incubator/rich-content/pull/1371) completed missing props in Ricos API from rich-content API

### 🐛 Bug Fix

- `ricos`
  - [#1375](https://github.com/wix-incubator/rich-content/pull/1375) theme fix for multiple instances of RicosEditor / RicosViewer
- `editor-common`
  - [#1340](https://github.com/wix-incubator/rich-content/pull/1340) plugin toolbar fixed position after resize

## 7.13.0 (Jul 20, 2020)

### 🚀️ New Feature

- `preview`
  - [#1356](https://github.com/wix-incubator/rich-content/pull/1356) support video in gallery
  - [#1369](https://github.com/wix-incubator/rich-content/pull/1369) preview content examples in storybook
- `storybook`
  - [#1369](https://github.com/wix-incubator/rich-content/pull/1369) preview content examples
- `giphy`
  - [#1358](https://github.com/wix-incubator/rich-content/pull/1358) gif preview modal empty state
- `ricos-viewer`
  - [#1249](https://github.com/wix-incubator/rich-content/pull/1249) preview strategy

### 🐛 Bug Fix

- `gallery`
  - [#1362](https://github.com/wix-incubator/rich-content/pull/1362) fix rtl
- `preview`
  - [#1361](https://github.com/wix-incubator/rich-content/pull/1361) readMore - removed automatic scroll to top page
  - [#1366](https://github.com/wix-incubator/rich-content/pull/1366) support multiple vids, gifs & wix media
- `gallery`
  - [#1366](https://github.com/wix-incubator/rich-content/pull/1366) support multiple vids, gifs & wix media
- `editor`
  - [#1364](https://github.com/wix-incubator/rich-content/pull/1364) lists plugin: remove buggy conversion from - or * chars to list

## 7.12.3 (Jul 15, 2020)

### 🐛 Bug Fix

- `fullscreen`
  - [#1359](https://github.com/wix-incubator/rich-content/pull/1359) fix when direction=RTL
- `editor-common`
  - [#1343](https://github.com/wix-incubator/rich-content/pull/1343) draftUtils.ts - fixed getEntities types
  - [#1352](https://github.com/wix-incubator/rich-content/pull/1352) insertPlugins modals theme prop was broken (videoPlugin in particular)
- `viewer`
  - [#1352](https://github.com/wix-incubator/rich-content/pull/1352) anchors fix: exclude inline plugins

## 7.12.2 (Jul 13, 2020)

### 🐛 Bug Fix

- `preview`
  - [#1341](https://github.com/wix-incubator/rich-content/pull/1341) inlineStyles - corrected offset of readMore
- `ricos-editor`
  - [#1348](https://github.com/wix-incubator/rich-content/pull/1348) bump zIndex to 20000 (to overcome wix site styles)

## 7.12.1 (Jul 13, 2020)

### 🐛 Bug Fix

- `editor`
  - [#1327](https://github.com/wix-incubator/rich-content/pull/1327) fix alignment toolbar scrollbars in windows
  - [#1328](https://github.com/wix-incubator/rich-content/pull/1328) external toolbar API: multiple editors / multiple toolbars support
  - [#1308](https://github.com/wix-incubator/rich-content/pull/1308) theme - default font reverted to Helvetica
- `preview`
  - [#1248](https://github.com/wix-incubator/rich-content/pull/1248) fix multi-block calculation (3 lines bug)
- `viewer`
  - [#1308](https://github.com/wix-incubator/rich-content/pull/1308) theme - default font reverted to Helvetica
  - [#1342](https://github.com/wix-incubator/rich-content/pull/1342) breaks when there is a link in a list (regression from 7.11.0)
- `gallery`
  - [#1322](https://github.com/wix-incubator/rich-content/pull/1322) gallery image title font size is fixed to 14px
  - [#1334](https://github.com/wix-incubator/rich-content/pull/1334) render SSR when in SEO view mode
- `general`
  - [#1336](https://github.com/wix-incubator/rich-content/pull/1336) solved type definition issues caused by JS files

## 7.12.0 (Jul 8, 2020)

### 🚀️ New Feature

- `viewer`
  - [#1265](https://github.com/wix-incubator/rich-content/pull/1265) paywall seo support

### 🐛 Bug Fix

- `common`
  - [#1310](https://github.com/wix-incubator/rich-content/pull/1310) long numbered list appears broken
- `viewer`
  - [#1318](https://github.com/wix-incubator/rich-content/pull/1318) add rtl-ignore comments
- `image`
  - [#1321](https://github.com/wix-incubator/rich-content/pull/1321) link-redirect text in image settings
- `ricos`
  - [#1301](https://github.com/wix-incubator/rich-content/pull/1301) themeStrategy manages instance state with closure
- `ricos-viewer`
  - [#1300](https://github.com/wix-incubator/rich-content/pull/1300) missing imported styles
- `ricos-editor`
  - [#1300](https://github.com/wix-incubator/rich-content/pull/1300) missing imported styles
  - [#1296](https://github.com/wix-incubator/rich-content/pull/1296) Editor Modal z-index increase
  - [#1303](https://github.com/wix-incubator/rich-content/pull/1303) actionColor fix for "more+" button
  - [#1304](https://github.com/wix-incubator/rich-content/pull/1304) textColor fix for plugin (+) button
  - [#1305](https://github.com/wix-incubator/rich-content/pull/1305) theme - toolbar white on white
  - [#1306](https://github.com/wix-incubator/rich-content/pull/1306) theme - codeblock wiring
  - [#1307](https://github.com/wix-incubator/rich-content/pull/1307) theme - mentions

### 🏠 Internal

- `plugins-bundle-analyzer`
  - [#1302](https://github.com/wix-incubator/rich-content/pull/1302) converted analyzer to typescript

## 7.11.0 (Jun 30, 2020)

### 🚀️ New Feature

- `polls` *alpha*
  - [#1290](https://github.com/wix-incubator/rich-content/pull/1290) add plugin
- `text-selection-toolbar`
  - [#1233](https://github.com/wix-incubator/rich-content/pull/1233) toolbar fixes, twitter design and remove viewer id
- `viewer`
  - [#1282](https://github.com/wix-incubator/rich-content/pull/1282) Ad placeholder - support block type

### 🐛 Bug Fix

- `text-color`
  - [#1279](https://github.com/wix-incubator/rich-content/pull/1279) text & highlight color in mobile
- `image`
  - [#1277](https://github.com/wix-incubator/rich-content/pull/1277) image with link in initial state
- `viewer`
  - [#1285](https://github.com/wix-incubator/rich-content/pull/1285) text alignment with punctuation

### 🏠 Internal

- `common`
  - [#1288](https://github.com/wix-incubator/rich-content/pull/1288) add changes for polls
- `editor-common`
  - [#1287](https://github.com/wix-incubator/rich-content/pull/1287) add changes for polls
- `test-env`
  - [#1286](https://github.com/wix-incubator/rich-content/pull/1286) update setSelection for Editor and Viewer

## 7.10.8 (Jun 28, 2020)

### 🐛 Bug Fix

- `video`
  - [#1267](https://github.com/wix-incubator/rich-content/pull/1267) Trim URL input
- `gallery`
  - [#1273](https://github.com/wix-incubator/rich-content/pull/1273) gallery opens on correct image in rtl
- `mentions`
  - [#1275](https://github.com/wix-incubator/rich-content/pull/1275) `onMentionClick` callback is called on viewer
- `common`
  - [#1274](https://github.com/wix-incubator/rich-content/pull/1274) viewer text direction

### 🏠 Internal

- `general`
  - [#1256](https://github.com/wix-incubator/rich-content/pull/1256) migrated from flow types to TypeScrip
- `editor-common`
  - [#1278](https://github.com/wix-incubator/rich-content/pull/1278) support decoratorTrigger for composition mode

## 7.10.7 (Jun 21, 2020)

### 🚀️ New Feature

- `adsense`
  - [#1179](https://github.com/wix-incubator/rich-content/pull/1179) add adsense plugin

### 🐛 Bug Fix

- `link-toolbar`
  - [#1238](https://github.com/wix-incubator/rich-content/pull/1238) hover on url behavior
- `gallery`
  - [#1227](https://github.com/wix-incubator/rich-content/pull/1227) gallery cursor is pointer when items are clickable
  - [#1225](https://github.com/wix-incubator/rich-content/pull/1225) accepts only supported filetypes
- `image`
  - [#1241](https://github.com/wix-incubator/rich-content/pull/1241) insert link to image will not close the toolbar
- `editor`
  - [#1243](https://github.com/wix-incubator/rich-content/pull/1243) when pasting text with hyperlinks, spaces deleted
  - [#1252](https://github.com/wix-incubator/rich-content/pull/1252) blur editor on esc keypress
- `ricos`
  - [#1257](https://github.com/wix-incubator/rich-content/pull/1257) fix side toolbar's plus button alignment
- `editor` `viewer`
  - [#1242](https://github.com/wix-incubator/rich-content/pull/1242) support normalize config with removeInvalidInlinePlugins

### 🏠 Internal

- `general`
  - [#1244](https://github.com/wix-incubator/rich-content/pull/1244) support TypeScript in all packages
- `image`
  - [#1264](https://github.com/wix-incubator/rich-content/pull/1264) loader for oneApp - 'loading' in component data

## 7.10.6 (Jun 14, 2020)

### 🚀️ New Feature

- `ricos`
  - [#1214](https://github.com/wix-incubator/rich-content/pull/1214) Modal API

### 🐛 Bug Fix

- `ricos`
  - [#1229](https://github.com/wix-incubator/rich-content/pull/1229) fix(rollup): reduce bundlesize on legacy child support
- `common`
  - [#1186](https://github.com/wix-incubator/rich-content/pull/1186) block alignment with indentation
- `editor`
  - [#1190](https://github.com/wix-incubator/rich-content/pull/1190) handle pasted text on atomic blocks keeps their entities

### 🏠 Internal

- `test-env`
  - [#1216](https://github.com/wix-incubator/rich-content/pull/1216) complete ricos coverage of e2e tests
- `ricos-viewer`
  - [#1239](https://github.com/wix-incubator/rich-content/pull/1239) functionality common to editor and viewer was moved to new package `ricos-common`

## 7.10.5 (Jun 9, 2020)

### 🐛 Bug Fix

- `gallery`
  - [#1224](https://github.com/wix-incubator/rich-content/pull/1224) bump pro gallery version to 1.10.21

## 7.10.4 (Jun 8, 2020)

### 🐛 Bug Fix

- `gallery`
  - [#1221](https://github.com/wix-incubator/rich-content/pull/1221) some layouts missing css. Regression from 7.9.1

## 7.10.3 (Jun 7, 2020)

### 🐛 Bug Fix

- `common`
  - [#1181](https://github.com/wix-incubator/rich-content/pull/1181) lists alignment
- `gallery`
  - [#1217](https://github.com/wix-incubator/rich-content/pull/1217) some layouts missing css. Regression from 7.9.1

### 🏠 Internal

- `ricos`
  - [#1182](https://github.com/wix-incubator/rich-content/pull/1182) UnitTest: child props must be equal both as wrapper and non-wrapper
  - [#1121](https://github.com/wix-incubator/rich-content/pull/1121) fix JSS big warning in the console (classnames not found)
- `test-env`
  - [#1210](https://github.com/wix-incubator/rich-content/pull/1210) ricos coverage of `rendering.e2e` and `renderingSsr.e2e`

## 7.10.2 (Jun 4, 2020)

fix bad release in 7.10.1

## 7.10.1 (Jun 4, 2020)

### 🚀️ New Feature

- `editor-common`
  - [#1147](https://github.com/wix-incubator/rich-content/pull/1147) error message with icon
- `video`
  - [#1175](https://github.com/wix-incubator/rich-content/pull/1175) new design to video overlay in editor

### 🐛 Bug Fix

- `headings`
  - [#1199](https://github.com/wix-incubator/rich-content/pull/1199) change the tooltip of heading's button
- `gallery`
  - [#1168](https://github.com/wix-incubator/rich-content/pull/1168) bump pro gallery version to 1.10.17
  - [#1206](https://github.com/wix-incubator/rich-content/pull/1206) bump pro gallery version to 1.10.19
- `ricos-viewer`
  - [#1197](https://github.com/wix-incubator/rich-content/pull/1197) mobile not working with static text toolbar
- `image`
  - [#1136](https://github.com/wix-incubator/rich-content/pull/1136) loader for oneApp

### 🏠 Internal

- `test-env`
  - [#1195](https://github.com/wix-incubator/rich-content/pull/1195) ricos coverage of `plugin-link-preview` and `plugin-html`

## 7.9.1 (Jun 2, 2020)

### 🐛 Bug Fix

- `fullscreen`
  - [#1189](https://github.com/wix-incubator/rich-content/pull/1189) image not centered when wrapped in rtl

## 7.9.0 (Jun 2, 2020)

### 🚀️ New Feature

- `general`
  - [#1143](https://github.com/wix-incubator/rich-content/pull/1143) Dynamic import to 'react-color'
  - [#1158](https://github.com/wix-incubator/rich-content/pull/1158) Dynamic import to 'react-window' and DownShift

### 🐛 Bug Fix

- `video`
  - [#1185](https://github.com/wix-incubator/rich-content/pull/1185) close button in video selection modal on mobile
- `image plugin`
  - [#1148](https://github.com/wix-incubator/rich-content/pull/1148) resize Image: change the manual minimum size of an image to 20px
- `ricos-viewer`
  - [#1149](https://github.com/wix-incubator/rich-content/pull/1149) doesnt add internal ricos modal if child has modal
- `gallery`
  - [#1151](https://github.com/wix-incubator/rich-content/pull/1151) item id had '.' in it. It's not handled well in the gallery
  - [#1167](https://github.com/wix-incubator/rich-content/pull/1167) styles fix for chrome 83
- `video`
  - [#1134](https://github.com/wix-incubator/rich-content/pull/1134) onVideoSelected didn't update data correctly
- `file-upload`
  - [#1087](https://github.com/wix-incubator/rich-content/pull/1087) multiple files upload
- `html-plugin`
  - [#1169](https://github.com/wix-incubator/rich-content/pull/1169) website url

### 🏠 Internal

- `storybook`
  - [#1176](https://github.com/wix-incubator/rich-content/pull/1176) isMobile automatic determination
- `ricos`
  - [#1172](https://github.com/wix-incubator/rich-content/pull/1172) ThemeStrategy throws error when Palette is given with missing colors
- `test-env`
  - [#1183](https://github.com/wix-incubator/rich-content/pull/1183) ricos coverage of file-upload + rename from wrapper
  - [#1188](https://github.com/wix-incubator/rich-content/pull/1188) fix link-preview `enableEmbed` on RicosTestApp

## 7.8.0 (May 25, 2020)

### 🚀️ New Feature

- `headings`
  - [#901](https://github.com/wix-incubator/rich-content/pull/901) adding plugin headings with dropdown option

### 🐛 Bug Fix

- `ricos-viewer`
  - [#1132](https://github.com/wix-incubator/rich-content/pull/1132) enable palettes in theme API
- `editor`
  - [#1137](https://github.com/wix-incubator/rich-content/pull/1137) 'Enter' click preserves alignment style

### 🏠 Internal

- `editor-common`
  - [1054](https://github.com/wix-incubator/rich-content/pull/1054) refactor calculateDiff

## 7.7.1 (May 21, 2020)

### 🐛 Bug Fix

- `file`
  - [#1129](https://github.com/wix-incubator/rich-content/pull/1129) file block not showing

## 7.7.0 (May 20, 2020)

### 🚀️ New Feature

- `editor` `viewer`
  - [#1091](https://github.com/wix-incubator/rich-content/pull/1091) add iframeSandboxDomain prop for iframe security
- `editor`
  - [#1041](https://github.com/wix-incubator/rich-content/pull/1041) shift+tab click deletes tab character ('\t')
  - [#1065](https://github.com/wix-incubator/rich-content/pull/1065) backspace click at start of block decrease indentation
  - [#1084](https://github.com/wix-incubator/rich-content/pull/1084) external toolbar API added
- `wrapper`
  - [#1003](https://github.com/wix-incubator/rich-content/pull/1003) RichContentWrapper was split into RicosEditor & RicosViewer
  - [#1115](https://github.com/wix-incubator/rich-content/pull/1115) Improved RicosEditor API of getContent + onChange
- `viewer`
  - [#1093](https://github.com/wix-incubator/rich-content/pull/1093) viewerAction callback in helpers is now supported, triggered on image expand (gallery & viewer)
  - [#1116](https://github.com/wix-incubator/rich-content/pull/1116) renamed onViewerAction to onAction + order of arguments

### 🐛 Bug Fix

- `wrapper` `viewer`
  - [#1101](https://github.com/wix-incubator/rich-content/pull/1101) fix hashtag decorator in viewer
- `plugins`
  - [#1084](https://github.com/wix-incubator/rich-content/pull/1084) svg icon id conflicts fixed
- `giphy`
  - [#1110](https://github.com/wix-incubator/rich-content/pull/1110) giphy toolbar not showing after giphy is added
- `link-preview`
  - [#1048](https://github.com/wix-incubator/rich-content/pull/1048) fix enable link preview and link embed by default
- `file-upload`
  - [#1082](https://github.com/wix-incubator/rich-content/pull/1082) error handling fix
- `common`
  - [#1092](https://github.com/wix-incubator/rich-content/pull/1092) text indentation not showing in rtl
- `toolbars`
  - [#1125](https://github.com/wix-incubator/rich-content/pull/1125) atomic toolbars position in mobile
- `html plugin`
  - [#1126](https://github.com/wix-incubator/rich-content/pull/1126) fix html iframe src height and remove html initial state

### 🏠 Internal

- `exampleApp`
  - [0f849222](https://github.com/wix-incubator/rich-content/commit/0f849222) fix translations
  - [#1113](https://github.com/wix-incubator/rich-content/pull/1113) fix: Tooltips don't render in the correct translations
- `storybook`
  - [#1003](https://github.com/wix-incubator/rich-content/pull/1003) story for wrapper handling of static text toolbar
  - [#1084](https://github.com/wix-incubator/rich-content/pull/1084) external plugin sidebar added
- `storybook`
  - [#1084](https://github.com/wix-incubator/rich-content/pull/1084) initial intent example added
- `editor`
  - [#1078](https://github.com/wix-incubator/rich-content/pull/1078) insert buttons at the beginning of the inline toolbar
- `editor` `viewer`
  - [#1090](https://github.com/wix-incubator/rich-content/pull/1090) support normalize config with {disableInlineImages: false/true}
- `general`
  - [#1122](https://github.com/wix-incubator/rich-content/pull/1122) Adding github action that updates the baselineBundleSizes after merge

## 7.6.1 (May 11, 2020)

### 🐛 Bug Fix

- `editor-common`
  - [#1046](https://github.com/wix-incubator/rich-content/pull/1046) cursor jumps to start of editor on close modal
- `editor`
  - [#1059](https://github.com/wix-incubator/rich-content/pull/1059) fix getToolbarSettings Api to work

### 🏠 Internal

- `wrapper`
  - [#993](https://github.com/wix-incubator/rich-content/pull/993) remove `!important` usage + deep merge jss styles
  - [#1031](https://github.com/wix-incubator/rich-content/pull/1031) fixed build warning - "punycode" library

## 7.6.0 (May 5, 2020)

### 🚀️ New Feature

- `indent`
  - [#898](https://github.com/wix-incubator/rich-content/pull/898) text indentation
- `viewer`
  - [#1005](https://github.com/wix-incubator/rich-content/pull/1005) add viewMode SEO to ProGallery

### 🐛 Bug Fix

- `social-modals`
  - [#1037](https://github.com/wix-incubator/rich-content/pull/1037) disable text input autocomplete
- `vertical embed`
  - [#1036](https://github.com/wix-incubator/rich-content/pull/1036) dropdown for search opens automatically when typing text for search
- `gallery`
  - [#1020](https://github.com/wix-incubator/rich-content/pull/1020) gallery accepts window as scrollingElement

## 7.5.0 (May 5, 2020)

### 🚀️ New Feature

- `button`
  - [#958](https://github.com/wix-incubator/rich-content/pull/958) action button plugin - button with onClick callback
- `plugin menu`
  - [#739](https://github.com/wix-incubator/rich-content/pull/739) new plugin menu (side menu) with much better UX/UI for many plugins

### 🐛 Bug Fix

- `video`
  - [#1004](https://github.com/wix-incubator/rich-content/pull/1004) fix external video metadata
- `editor`
  - [#941](https://github.com/wix-incubator/rich-content/pull/941) add tooltips for settings panels
- `preview`
  - [#999](https://github.com/wix-incubator/rich-content/pull/999) giphy metadata is handled correctly by image and gallery data mergers
- `gallery`
  - [#1006](https://github.com/wix-incubator/rich-content/pull/1006) expand icon appears only on hovered image

### 🏠 Internal

- `wrapper`
  - [#980](https://github.com/wix-incubator/rich-content/pull/980) createEmpty import
  - [#983](https://github.com/wix-incubator/rich-content/pull/983) fix custom inlineStyleMappers (viewer)
- `general`
  - [#982](https://github.com/wix-incubator/rich-content/pull/982) `npm run watch` fixed to work concurrently with `flow` + `npm run e2e:debug` fixed to wait on serve ready
- `storybook`
  - [#958](https://github.com/wix-incubator/rich-content/pull/958) Buttons story added (Action & Link buttons)

## 7.4.6 (May 3, 2020)

### 🐛 Bug Fix

- `editor-common`
  - [#994](https://github.com/wix-incubator/rich-content/pull/994) cursor doesn't disappear when adding plugin
- `gallery`
  - [#990](https://github.com/wix-incubator/rich-content/pull/990) height not updating when changing width

### 🏠 Internal

- `wrapper`
  - [#980](https://github.com/wix-incubator/rich-content/pull/980) createEmpty import
- `general`
  - [#965](https://github.com/wix-incubator/rich-content/pull/965) fix: gitPRComment overrides the content of the PR comment
  - [#985](https://github.com/wix-incubator/rich-content/pull/985) enable publishing with custom npm tag
  - [#988](https://github.com/wix-incubator/rich-content/pull/988) Adding 'build:analyze:viewer' and 'build:analyze:editor' scripts instead of 'build:analyze' script

## 7.4.5 (Apr 28, 2020)

### 🚀️ New Feature

- `image` `video`
  - [#972](https://github.com/wix-incubator/rich-content/pull/972) handle upload error - show message on block

### 🐛 Bug Fix

- `editor`
  - [#951](https://github.com/wix-incubator/rich-content/pull/951) fix: tooltip opacity
  - [#957](https://github.com/wix-incubator/rich-content/pull/957) fix: command+ctrl+j creates code block on mac
- `map`
  - [#959](https://github.com/wix-incubator/rich-content/pull/959) modal settings fixed (convention) & made compatible with wrapper palette colors
- `emoji`
  - [#973](https://github.com/wix-incubator/rich-content/pull/973) was using old editor and editor-common dependencies
- `video`
  - [#974](https://github.com/wix-incubator/rich-content/pull/960) video file upload not working when block isn't selected
- `gallery`
  - [#963](https://github.com/wix-incubator/rich-content/pull/963) fix:Gallery doesn't show more then 3 images on load

### 🏠 Internal

- `editor`
  - [#936](https://github.com/wix-incubator/rich-content/pull/936) arrangement of inline toolbar buttons
- `wrapper`
  - [#956](https://github.com/wix-incubator/rich-content/pull/956) bi getData will now contain `forPublish` argument
  - [#966](https://github.com/wix-incubator/rich-content/pull/966) passing RCE/RCV to wrapper is no longer required
  - [#975](https://github.com/wix-incubator/rich-content/pull/975) ssr fix - render suspense after mount
  - [#977](https://github.com/wix-incubator/rich-content/pull/977) wrapper exports its type declarations
- `preview`
  - [#962](https://github.com/wix-incubator/rich-content/pull/962) interactions improved; read-more displays html

## 7.3.5 (Apr 21, 2020)

### 🐛 Bug Fix

- `plugin-emoji`
  - [#948](https://github.com/wix-incubator/rich-content/pull/948) es5 `const` in react-icons node module. Extract the needed icons and removed the dependency on 'react-icons'
- `map`
  - [#939](https://github.com/wix-incubator/rich-content/pull/939) Map Settings: dynamic style replaced with theme
- `editor`
  - [#917](https://github.com/wix-incubator/rich-content/pull/917) add tooltips for drop down buttons

### 🏠 Internal

- `general`
  - [#927](https://github.com/wix-incubator/rich-content/pull/927) Adding GitHub action that compares and fails if one of the current bundle sizes grows more then 5KB

## 7.3.4 (Apr 21, 2020)

### 🏠 Internal

- `editor`
  - [#912](https://github.com/wix-incubator/rich-content/pull/912) publish api
- `wrapper`
  - [#912](https://github.com/wix-incubator/rich-content/pull/912) onChange handle inside wrapper
- `editor-common`
  - [#912](https://github.com/wix-incubator/rich-content/pull/912) getPostContentSummary updated

### 🐛 Bug Fix

- `code-block`
  - [#943](https://github.com/wix-incubator/rich-content/pull/943) Adding code block with backward direction of selection
- `giphy`
  - [#945](https://github.com/wix-incubator/rich-content/pull/945) Restore auto-focus after add giphy

### 🏠 Internal

- `wrapper`
  - [#931](https://github.com/wix-incubator/rich-content/pull/931) added internal static toolbar support

## 7.3.3 (Apr 20, 2020)

### 🐛 Bug Fix

- `viewer`
  - [#929](https://github.com/wix-incubator/rich-content/pull/929) fix: empty lists viewer issues

### 🚀️ New Feature

- `viewer`
  - [#908](https://github.com/wix-incubator/rich-content/pull/908) Support Viewer predefined anchors

### 🏠 Internal

- `vertical-embed`
  - [#728](https://github.com/wix-incubator/rich-content/pull/728) Vertical Embed Plugin - alpha verison
- `wrapper`
  - [#935](https://github.com/wix-incubator/rich-content/pull/935) back-office theme will appear as default theme for now

## 7.3.2 (Apr 16, 2020)

### 🐛 Bug Fix

- `link-preview`
  - [#924](https://github.com/wix-incubator/rich-content/pull/924) disable link preview/embed when entered inside a list

## 7.3.1 (Apr 15, 2020)

### 🐛 Bug Fix

- `editor-common`
  - [#913](https://github.com/wix-incubator/rich-content/pull/913) onChange - calculateDiff is debounced, for better performance
- `viewer`
  - [#923](https://github.com/wix-incubator/rich-content/pull/923) fix: inline styles in lists breaking viewer

### 🏠 Internal

- `wrapper`
  - [#919](https://github.com/wix-incubator/rich-content/pull/919) added internal mobile support
  - [#920](https://github.com/wix-incubator/rich-content/pull/920) refactor: `FullscreenRenderer.tsx`, `ModalRenderer.tsx`
  - [#918](https://github.com/wix-incubator/rich-content/pull/918)
    - viewer is now re-rendered for new initialState prop (fix)
- `storybook`
  - [#918](https://github.com/wix-incubator/rich-content/pull/918)
    - hotfix (`editor` prop replaced with `isEditor`)
    - live example app (viewer + editor side by side)
    - live example app in palettes page

## 7.3.0 (Apr 13, 2020)

### 🚀️ New Feature

- `list`
  - [#815](https://github.com/wix-incubator/rich-content/pull/815) nested lists
- `editor`
  - [#906](https://github.com/wix-incubator/rich-content/pull/906) editor supports entering tab character ('\t') by clicking on tab
- `theme + wrapper: gallery, plugins & modals`
  - [#828](https://github.com/wix-incubator/rich-content/pull/828) style update related to a lot of components + wrapper compatibility.

### 🐛 Bug Fix

- `preview`
  - [#903](https://github.com/wix-incubator/rich-content/pull/903) gallery fixed; resize flapping fixed
- `gallery`
  - [#909](https://github.com/wix-incubator/rich-content/pull/909) gallery size
- `editor`
  - [#914](https://github.com/wix-incubator/rich-content/pull/914) updating tooltips keys

### 🏠 Internal

- `wrapper`
  - [#907](https://github.com/wix-incubator/rich-content/pull/907) converted `wix-rich-content-wrapper` to typescript

## 7.2.0 (Apr 8, 2020)

### 🚀️ New Feature

- `link`
  - [#750](https://github.com/wix-incubator/rich-content/pull/750) link toolbar

### 🐛 Bug Fix

- `gallery`
  - [#879](https://github.com/wix-incubator/rich-content/pull/879) gallery size - regression from #879
  - [#872](https://github.com/wix-incubator/rich-content/pull/872) fix: gallery sliders css in mozilla firefox
- `plugins`
  - [#778](https://github.com/wix-incubator/rich-content/pull/880) fix focus on plugins insert buttons click
- `link`
  - [#904](https://github.com/wix-incubator/rich-content/pull/904) fix saving data of "target" and "rel" link(the checkboxes in Link Panel)
  - [#902](https://github.com/wix-incubator/rich-content/pull/902) mobile - cancel in link panel changed the cursor
- 'editor'
  - [#894](https://github.com/wix-incubator/rich-content/pull/894) text position after enter & disable paste text with style CODE

### 🏠 Internal

- `storybook`
  - [#891](https://github.com/wix-incubator/rich-content/pull/891) fixed textHighlightPlugin color (intro.js)
- `general`
  - [#905](https://github.com/wix-incubator/rich-content/pull/905) refactor - remove getConfigByFormFactor.js

## 7.1.5 (Apr 4, 2020)

### 🐛 Bug Fix

- `gallery`
  - [#879](https://github.com/wix-incubator/rich-content/pull/879) blurry pictures & not rendering
  - [#877](https://github.com/wix-incubator/rich-content/pull/877) fix gallery plugin blurry pictures
- `link-preview`
  - [#871](https://github.com/wix-incubator/rich-content/pull/871) maxwidth
- `general`
  - [#889](https://github.com/wix-incubator/rich-content/pull/889) fix all plugins max-width for inline size

### 🏠 Internal

- `general`
  - [#878](https://github.com/wix-incubator/rich-content/pull/878) added git comment to pr's containing surge-examples url's

## 7.1.4 (Apr 2, 2020)

### 🚀️ New Feature

- `html`
  - [#868](https://github.com/wix-incubator/rich-content/pull/868) save on click outside in html plugin
- `embed`
  - [#689](https://github.com/wix-incubator/rich-content/pull/689) embed for supported links

### 🐛 Bug Fix

- `editor-common`
  - [#547](https://github.com/wix-incubator/rich-content/pull/547) accessibility issue fixed: focus on hidden elements when tab-clicking
  - [#873](https://github.com/wix-incubator/rich-content/pull/873) fix: ctrl/command support in win/osx
- `viewer`
  - [#867](https://github.com/wix-incubator/rich-content/pull/867) contextual props are passed to interactions

### 🏠 Internal

- `emoji`
  - [#870](https://github.com/wix-incubator/rich-content/pull/870) reduce the bundle size of plugin emoji

## 7.1.3 (Mar 30, 2020)

### 🐛 Bug Fix

- `general`
  - [#843](https://github.com/wix-incubator/rich-content/pull/843) fix: mouse up event on overlay triggered the closing the modals
- `editor`
  - [#862](https://github.com/wix-incubator/rich-content/pull/862) fix inline resize reset on reload of editor
- `image`
  - [#853](https://github.com/wix-incubator/rich-content/pull/853) Image Original Size for images of width 350px and above

### 🏠 Internal

- `examples`
  - [#850](https://github.com/wix-incubator/rich-content/pull/850) fix performance
  - [#850](https://github.com/wix-incubator/rich-content/pull/850) save content to local storage
- `wrapper`
  - [#852](https://github.com/wix-incubator/rich-content/pull/852) strategies create configs & not functions
- `viewer`
  - [#861](https://github.com/wix-incubator/rich-content/pull/#861) text direction util improved; tests added
  - [#846](https://github.com/wix-incubator/rich-content/pull/846) switch to forked redraft (`wix-redraft`)
- `e2e`
  - [#860](https://github.com/wix-incubator/rich-content/pull/860) Images original size test

## 7.1.2 (Mar 25, 2020)

### 🚀️ New Feature

- `html`
  - [#826](https://github.com/wix-incubator/rich-content/pull/826) initial state for html plugin
- `gallery`
  - [#833](https://github.com/wix-incubator/rich-content/pull/833) elipsis for too long image titles

### 🏠 Internal

- `gallery`
  - [#833](https://github.com/wix-incubator/rich-content/pull/833) using alt property instead of title for altText fixes mobile titles

### 🐛 Bug Fix

- `link-preview`
  - [#841](https://github.com/wix-incubator/rich-content/pull/841) link preview fixes
- `fullscreen`
  - [#842](https://github.com/wix-incubator/rich-content/pull/842) itemId for legacy image type

## 7.1.1 (Mar 25, 2020)

### 🏠 Internal

- `wrapper`
  - jss dependencies as external to resolve cjs issue

## 7.1.0 (Mar 25, 2020)

### 🚀️ New Feature

- `code-block`
  - [#827](https://github.com/wix-incubator/rich-content/pull/827) selection starts in the block
- `link-preview`
  - [#653](https://github.com/wix-incubator/rich-content/pull/653) add link preview

### 🐛 Bug Fix

- `text-color`
  - [#805](https://github.com/wix-incubator/rich-content/pull/805) adding a text color/highlight works on mobile
- `plugins`
  - [#778](https://github.com/wix-incubator/rich-content/pull/778) fix sizeFullWidth
- `common`
  - [#814](https://github.com/wix-incubator/rich-content/pull/814) fix: adding support for H4, H5, H6
- `viewer`
  - [#832](https://github.com/wix-incubator/rich-content/pull/832) fix emoji in rtl
- `editor`
  - [d486af87](https://github.com/wix-incubator/rich-content/commit/d486af87) fix plain text paste
  - [#790](https://github.com/wix-incubator/rich-content/pull/790) convertToRaw - block.data converted correctly, Fixes line spacing
  - [#820](https://github.com/wix-incubator/rich-content/pull/820) remove custom getBlockRenderMap.js (mobile fix)
- `fullscreen`
  - [#830](https://github.com/wix-incubator/rich-content/pull/830) expand button always appears on hover
- `editor-common`
  - [#829](https://github.com/wix-incubator/rich-content/pull/829) replace draft-js w/ @wix/draft-js

### 🏠 Internal

- `general`
  - [#720](https://github.com/wix-incubator/rich-content/pull/720) mobile example app styles issues
  - [#835](https://github.com/wix-incubator/rich-content/pull/835) 'fullwidth' fixed in example on ipad
- `wrapper`
  - [#817](https://github.com/wix-incubator/rich-content/pull/817) bugfix: removed override of props
  - [#810](https://github.com/wix-incubator/rich-content/pull/810) added palettes & fixed toolbarButton color
  - [#818](https://github.com/wix-incubator/rich-content/pull/818) bugfix: inlineStyleMappers - removed empty typeMappers + improved storybook example
  - [#819](https://github.com/wix-incubator/rich-content/pull/819) improve: replaced "aphrodite" with "jss"
  - [#822](https://github.com/wix-incubator/rich-content/pull/822) ssr fix - render suspense only after component is imported
  - [#816](https://github.com/wix-incubator/rich-content/pull/816) wrapper theme: gallery settings modal
- `e2e`
  - [#795](https://github.com/wix-incubator/rich-content/pull/795) new images-sizes fixture
  - [#759](https://github.com/wix-incubator/rich-content/pull/759) adding tests for emoji plugin (in rtl and plugins tests)

## 7.0.2 (Mar 20, 2020)

### 🏠 Internal

- `wrapper`
  - [#804](https://github.com/wix-incubator/rich-content/pull/804) engine-wrapper refactored
  - [#806](https://github.com/wix-incubator/rich-content/pull/806) locale dynamic import
  - [#807](https://github.com/wix-incubator/rich-content/pull/807) include common styles in styles.min.css
  - [#709](https://github.com/wix-incubator/rich-content/pull/709) support inlineStyleMappers
- `editor-common`
  - `convertFromHTML` exposed for Forum usage

## 7.0.1 (Mar 18, 2020)

### 🏠 Internal

- `editor`
  - [#801](https://github.com/wix-incubator/rich-content/pull/801) `editorStateConversion.js` consume `draft-js` directly to prevent bundle bloat of lib

## 7.0.0 (Mar 17, 2020)

### 💥 Breaking Change

- `editor`
  - [#752](https://github.com/wix-incubator/rich-content/pull/752) Move draft-js to dependency from peerDependency [Migration Detials](https://github.com/wix-incubator/rich-content/wiki/RCE-V.7-Migration-Guide)

### 🚀️ New Feature

- `fullscreen`
  - [#776](https://github.com/wix-incubator/rich-content/pull/776) fullscreen closes on Esc key press

### 🐛 Bug Fix

- `gallery`
  - [#775](https://github.com/wix-incubator/rich-content/pull/775) adding videos to gallery

