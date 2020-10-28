# Changelog

> **Tags:**
>
> - :boom: Breaking Change
> - :rocket: New Feature
> - :bug: Bug Fix
> - :book: Documentation
> - :house: Internal

## [Unreleased]

<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>


</details>
<hr/>

## 8.3.0 (Oct 28, 2020)
### :rocket: New Feature
- `ricos-editor`
  - [#1637](https://github.com/wix-incubator/rich-content/pull/1637) added `shouldRemoveErrorBlocks` option to `getContent` defaults to `true`

## 8.2.1 (Oct 28, 2020)
### :rocket: New Feature
- `vertical-embed`
  - [#1684](https://github.com/wix-incubator/rich-content/pull/1684) add slimLayout setting
### :bug: Bug Fix
- `editor`
  - [#1693](https://github.com/wix-incubator/rich-content/pull/1693) onMediaUploadEnd arguments fix
  - [#1688](https://github.com/wix-incubator/rich-content/pull/1688) link preview is disabled in inner-rce
### 🏠 Internal
- `templates`
  - [#1643](https://github.com/wix-incubator/rich-content/pull/1643) converted to TS and moved from scripts to packages folder
- `general`
  - [#1643](https://github.com/wix-incubator/rich-content/pull/1643) converted RichContentEditor, RichContentViewer and many plugin and utility files to TS
  - [#1695](https://github.com/wix-incubator/rich-content/pull/1695) update webpack-merge "merge" function consumption
- `gallery`
  - [#1698](https://github.com/wix-incubator/rich-content/pull/1698) bump pro gallery version to 2.2.8

## 8.2.0 (Oct 23, 2020)
### :rocket: New Feature
- `quote`
  - [#1683](https://github.com/wix-incubator/rich-content/pull/1683) aligned quote - quote's position is based on alignment (with support for blog's theme)
### :bug: Bug Fix
- `giphy`
  - [#1690](https://github.com/wix-incubator/rich-content/pull/1690) a11y improved in popup
- `emoji`
  - [#1690](https://github.com/wix-incubator/rich-content/pull/1690) a11y improved in popup
- `plugin-link`
  - [#1666](https://github.com/wix-incubator/rich-content/pull/1666) anchor - scroll location on sites with fixed headers
- `accordion`
  - [#1687](https://github.com/wix-incubator/rich-content/pull/1687) fix "getIn" error (draftjs bug)
### :book: Documentation
- `emoji`
  - [#1633](https://github.com/wix-incubator/rich-content/pull/1633) Emoji Plugin Docs

### :house: Internal
- `e2e-tests`
  - [#1681](https://github.com/wix-incubator/rich-content/pull/1681) Consumers themes(only Blog for now) added to RicosTestApp

## 8.1.4 (Oct 20, 2020)
### :rocket: New Feature
- `ricos-editor`
  - [#1674](https://github.com/wix-incubator/rich-content/pull/1674) support `container` in ModalSettings


## 8.1.3 (Oct 19, 2020)
### :rocket: New Feature
- `vertical embed`
  - [#1585](https://github.com/wix-incubator/rich-content/pull/1585) vertical embed modal ui

### :house: Internal
- `gallery`
  - [#1664](https://github.com/wix-incubator/rich-content/pull/1664) bump pro gallery version to 2.2.0
- `docs`
  - [#1645](https://github.com/wix-incubator/rich-content/pull/1645) upgrade to v8
  - [#1655](https://github.com/wix-incubator/rich-content/pull/1655) google api key security issue
- `quote`
  - [#1667](https://github.com/wix-incubator/rich-content/pull/1667) revert of #1602:  aligned quote - quote's position is based on alignment (theme breaking change)

### :bug: Bug Fix
- `editor-common`
  - [#1650](https://github.com/wix-incubator/rich-content/pull/1650) fix modals text color issue on dark theme
- `ricos-editor`
  - [#1669](https://github.com/wix-incubator/rich-content/pull/1669) fix inline toolbar plugins with modal in inner-rce

### :book: Documentation
- `text-color`
  - [#1654](https://github.com/wix-incubator/rich-content/pull/1654) Text Color and Highlight Plugins Docs
- `code-block`
  - [#1640](https://github.com/wix-incubator/rich-content/pull/1640) Code Block Plugin Docs
- `button`
  - [#1656](https://github.com/wix-incubator/rich-content/pull/1656) Buttons Plugin Docs


## 8.1.1 (Oct 16, 2020)
### :house: Internal
- `gallery`
  - [#1649](https://github.com/wix-incubator/rich-content/pull/1649) bump pro gallery version to 2.1.4

### :book: Documentation
- `map`
  - [#1638](https://github.com/wix-incubator/rich-content/pull/1638) Map Plugin Docs
- `hashtag`
  - [#1929fd3](https://github.com/wix-incubator/rich-content/commit/1929fd3) Hashtag Plugin Docs
- `image`
  - [#a8dc79c](https://github.com/wix-incubator/rich-content/commit/a8dc79c) Image Plugin Docs
- `video`
  - [#a8dc79c](https://github.com/wix-incubator/rich-content/commit/a8dc79c) Video Plugin Docs

## 8.1.0 (Oct 15, 2020)
### :rocket: New Feature
- `quote`
  - [#1602](https://github.com/wix-incubator/rich-content/pull/1602) aligned quote - quote's position is based on alignment

### :bug: Bug Fix
- `list`
  - [#1632](https://github.com/wix-incubator/rich-content/pull/1632) centered lists
- `accordion`
  - [#1629](https://github.com/wix-incubator/rich-content/pull/1629) bug fixes

### :house: Internal
- `accordion`
  - [#1596](https://github.com/wix-incubator/rich-content/pull/1596) bundle size reduced

### :book: Documentation
- `gallery`
  - [#1641](https://github.com/wix-incubator/rich-content/pull/1641) Gallery Plugin Docs
- `divider`
  - [#1634](https://github.com/wix-incubator/rich-content/pull/1634) Divider Plugin Docs
- `file-upload`
  - [#1644](https://github.com/wix-incubator/rich-content/pull/1644) File Upload Plugin Docs

## 8.0.1 (Oct 14, 2020)
### :rocket: New Feature
- `general`
  - [#1630](https://github.com/wix-incubator/rich-content/pull/1630) theme updates:
    - default font is now `HelveticaNeue`, replacing `Helvetica` and `Avenir` instances
    - tooltips background is no longer transparent (100% black)
    - toolbars `hover` color is now 6% transparent dark (instead of 6% transparent action-color)
- `ricos-editor`
  - [#1627](https://github.com/wix-incubator/rich-content/pull/1627) added `ricos-editor-modal` class to the editor modal
- `ricos-content`
  - [#1622](https://github.com/wix-incubator/rich-content/pull/1622) `isContentStateEmpty` util
- `quote`
  - [#1602](https://github.com/wix-incubator/rich-content/pull/1602) aligned quote - quote's position is based on alignment

### :bug: Bug Fix
- `general`
  - [#1630](https://github.com/wix-incubator/rich-content/pull/1630) theme fixes:
    - color picker - border circling the picked color was mispositioned
    - plugin toolbar - several menu buttons height was different, creating a misalignment
- `storybook`
  - [#1630](https://github.com/wix-incubator/rich-content/pull/1630) fixed total bold font in RicosTheme page
- `accordion`
  - [#1631](https://github.com/wix-incubator/rich-content/pull/1631) buttons wiring

### :house: Internal
- `general`
  - [#1586](https://github.com/wix-incubator/rich-content/pull/1586) media upload and errors BI callbacks `onMediaUploadStart` and `onMediaUploadEnd` support
- `exampleApp`
  - [#1630](https://github.com/wix-incubator/rich-content/pull/1630) changed theme color of plugin toolbar hover
- `polls`
  - [#1628](https://github.com/wix-incubator/rich-content/pull/1628) bundle size reduced

## 8.0.0 TSLA5000 (Oct 12, 2020)
[Migration guide](https://wix-incubator.github.io/rich-content/docs/ricos/migrations/v7-to-v8)
### :rocket: New Feature
- `editor`
  - [#1561](https://github.com/wix-incubator/rich-content/pull/1561) new design implementation (plugins toolbar & inline toolbar) - active background & hover background
  - [#1561](https://github.com/wix-incubator/rich-content/pull/1561) mobile's static-toolbar new design implementation
  - [#1614](https://github.com/wix-incubator/rich-content/pull/1614) +more button color change
- `mentions`
  - [#1561](https://github.com/wix-incubator/rich-content/pull/1561) new design implementation
- `ricos-theme`
  - [#1561](https://github.com/wix-incubator/rich-content/pull/1561) 3-Colors Palette Object is now supported
- `ricos-common`
  - [#1608](https://github.com/wix-incubator/rich-content/pull/1608) eliminate `createTheme` necessity from theme prop
- `link-preview`
  - [#1614](https://github.com/wix-incubator/rich-content/pull/1614) `hover` color change
- `vertical-embed`
  - [#1614](https://github.com/wix-incubator/rich-content/pull/1614) pluginMenu's svg colors' fix when hovering

### :house: Internal
- `ricos-theme`
  - [#1561](https://github.com/wix-incubator/rich-content/pull/1561) themeStrategy: JSS is replaced with CSS-Vars, improving bundle size
- `ricos-common`
  - [#1608](https://github.com/wix-incubator/rich-content/pull/1608) merge `ricos-theme` into `ricos-common`
- `e2e`
  - [#1601](https://github.com/wix-incubator/rich-content/pull/1601) media tests fixes

### :bug: Bug Fix
- `gallery`
  - [#1601](https://github.com/wix-incubator/rich-content/pull/1601) correct image is displayed on horizontal layouts
- `editor`
  - [#1623](https://github.com/wix-incubator/rich-content/pull/1623) toast link font styles
- `accordion`
  - [#1595](https://github.com/wix-incubator/rich-content/pull/1595) Firefox bugs & css fixes

## 7.21.4 (Oct 8, 2020)
### :rocket: New Feature
- `video`
  - [#1621](https://github.com/wix-incubator/rich-content/pull/1621) add `disableDownload` option

## 7.21.3 (Oct 7, 2020)
### :bug: Bug Fix
- `link-toolbar`
  - [#1615](https://github.com/wix-incubator/rich-content/pull/1615) fix visibility (available to open from keyboard)
### :book: Documentation
- `giphy`
  - [#1613](https://github.com/wix-incubator/rich-content/pull/1613) Giphy Plugin Docs

## 7.21.2 (Oct 5, 2020)
### :rocket: New Feature
- `editor`
  - [#1535](https://github.com/wix-incubator/rich-content/pull/1535) BI - `onPluginAddSuccess` - a new content mutation event, triggered when a plugin is successfully added.
- `common`
  - [#1597](https://github.com/wix-incubator/rich-content/pull/1597) getTextDirection is exported as lib

### :bug: Bug Fix
- `viewer`
  - [#1582](https://github.com/wix-incubator/rich-content/pull/1582) the helpers prop was undefined, breaking BI callbacks
- `plugin-link`
  - [#1580](https://github.com/wix-incubator/rich-content/pull/1580) link panel width in safari
- `ricos-editor`
  - [#1570](https://github.com/wix-incubator/rich-content/pull/1570) removed condition restricting onChange to only be triggered when ContentState changes
- `editor`
  - [#1594](https://github.com/wix-incubator/rich-content/pull/1594) toast styles fix - line breaks and z-index above all

### :house: Internal
- `e2e`
  - [#1583](https://github.com/wix-incubator/rich-content/pull/1583) new: theming coverage
  - [#1570](https://github.com/wix-incubator/rich-content/pull/1570) RicosTestApp uses the ricos API onChange function
- `general`
  - [#1581](https://github.com/wix-incubator/rich-content/pull/1581) removed tsconfig files in packages

## 7.21.1 (Sep 29, 2020)
### :house: Internal
- `inner-rce`
  - [#1579](https://github.com/wix-incubator/rich-content/pull/1579) create new contentState without version
- `accordion` *alpha*
  - [#4bcd4c57](https://github.com/wix-incubator/rich-content/commit/4bcd4c57) publish accordion to npm

## 7.21.0 (Sep 29, 2020)
### :rocket: New Feature
- `accordion` *alpha*
  - [#1416](https://github.com/wix-incubator/rich-content/pull/1416) Accordion plugin
- `editor`
  - [#1418](https://github.com/wix-incubator/rich-content/pull/1418) error toast appears when uploading media fails
  
### :bug: Bug Fix
- `fullscreen`
  - [#1563](https://github.com/wix-incubator/rich-content/pull/1563) fix wix ad covering fullscreen buttons
- `html-embed`
  - [#1554](https://github.com/wix-incubator/rich-content/pull/1554) fixes embedded iframes width to be 100% fixed
### :house: Internal
- `ricos-content`
  - [#1573](https://github.com/wix-incubator/rich-content/pull/1573) [#1574](https://github.com/wix-incubator/rich-content/pull/1574) types: noImplicitAny applied
- `editor`
  - [#1556](https://github.com/wix-incubator/rich-content/pull/1556) fix editorStateConversion import size
  - [#1418](https://github.com/wix-incubator/rich-content/pull/1418) `Toast` and `ErrorToast` components
- `plugin-commons`
  - [#1566](https://github.com/wix-incubator/rich-content/pull/1566) move rtl/ltr icons from polls to plugin-commons package
- `general`
  - [#1559](https://github.com/wix-incubator/rich-content/pull/1559) converted to yarn workspaces
- `vertical embed`
  - [#1552](https://github.com/wix-incubator/rich-content/pull/1552) send locale to verticalsApi

## 7.20.4 (Sep 21, 2020)
### :bug: Bug Fix
- `ricos-content`
  - align versions mismatch

## 7.20.3 (Sep 21, 2020)
### :bug: Bug Fix
- `viewer`
  - [#1557](https://github.com/wix-incubator/rich-content/pull/1557) fix viewer justify css for safari and firefox
- `preview`
  - [#1562](https://github.com/wix-incubator/rich-content/pull/1562) readMore display edgecase fix + gallery responsiveness
- `ricos-theme`
  - [#1558](https://github.com/wix-incubator/rich-content/pull/1558) inlineToolbar style fixes:
    - fixed buttons active state design
    - fixed heading button position (vertical alignment)
    - better specified ExternalToolbar's style as it was side-affected by the changes
- `rollup`
  - [#1564](https://github.com/wix-incubator/rich-content/pull/1564) Externalize react-player
### :house: Internal
- `e2e`
  - [#1555](https://github.com/wix-incubator/rich-content/pull/1555) stabalise flaky gallery tests
- `general`
  - [#1556](https://github.com/wix-incubator/rich-content/pull/1556) converted rollup to typescript

## 7.20.2 (Sep 16, 2020)
### :rocket: New Feature
- `storybook`
  - [#1495](https://github.com/wix-incubator/rich-content/pull/1495) added preview's default rules display under the `Preview` -> `Rules` page.
- `preview`
  - [#1495](https://github.com/wix-incubator/rich-content/pull/1495) API Changes:
    - `previewSettings()` (ricos export) was renamed to `createPreview()` to match ricos convention (similar to `createTheme()`)
    - `PreviewSettings` interface was renamed to `PreviewConfig` to better represent its meaning
    - `ellipsis` param in `ReadMore` is no longer overridable, as it is now implemented with `-webkit-line-clam` which doesn't support it
### :bug: Bug Fix
- `ricos-theme`
  - [#1550](https://github.com/wix-incubator/rich-content/pull/1550) fixes:
    - plugin menu color fix
    - resize handles color fix
    - brightness threshold to activate fallback color - raised
  - [#1558](https://github.com/wix-incubator/rich-content/pull/1558) inlineToolbar style fixes:
    - fixed buttons active state design
    - fixed heading button position (vertical alignment)
    - better specified ExternalToolbar's style as it was side-affected by the changes
### :house: Internal
- `preview`
  - [#1495](https://github.com/wix-incubator/rich-content/pull/1495) converted from JS to TS. Also:
    - removed comments
    - removed redundant code from `Preview.jsx`
- `text-selection-toolbar`
  - [#1412](https://github.com/wix-incubator/rich-content/pull/1412) text selection toolbar example in storybook
- `storybook`
  - [#1412](https://github.com/wix-incubator/rich-content/pull/1412) text selection toolbar example
- `ricos-theme`
  - [#1550](https://github.com/wix-incubator/rich-content/pull/1550) removed unused-by-design colors from palette (secondary, color4, color7)
- `gallery`
  - [#1511](https://github.com/wix-incubator/rich-content/pull/1511) bump pg version to 2.1.29

## 7.19.3 (Sep 13, 2020)
### :bug: Bug Fix
- `ricos-editor`
  - [#1542](https://github.com/wix-incubator/rich-content/pull/1542) fixed appearance of inlineToolbarButtons to the new design
  - [#1548](https://github.com/wix-incubator/rich-content/pull/1548) accept only valid draft-js props in `draftEditorSettings`
### :rocket: New Feature
- `ricos-content`
  - [#1527](https://github.com/wix-incubator/rich-content/pull/1527) Platform agnostic package for handling Ricos content
### :house: Internal
- `general`
  - [#1544](https://github.com/wix-incubator/rich-content/pull/1544) one-line index files removed
- `exampleApp`
  - [#1541](https://github.com/wix-incubator/rich-content/pull/1541) file upload native\media manager toggle in gear icon
  - [#1537](https://github.com/wix-incubator/rich-content/pull/1537) bi callback `onViewerAction` outputs to console.log
### :book: Documentation
- [#1546](https://github.com/wix-incubator/rich-content/pull/1546) external toolbar customization docs

## 7.19.2 (Sep 9, 2020)
### :bug: Bug Fix
- `editor-common`
  - [#1539](https://github.com/wix-incubator/rich-content/pull/1539) moved EditorEvents back to editor-common

## 7.19.1 (Sep 8, 2020)
### :house: Internal
- `general`
  - [#1536](https://github.com/wix-incubator/rich-content/pull/1536) renamed onAction BI callback to onViewerAction

## 7.19.0 (Sep 8, 2020)
### :rocket: New Feature
- `ricos-theme`
  - [#1500](https://github.com/wix-incubator/rich-content/pull/1500) extracting ricos theme to dedicated package, to allow opt-in (bundlesize concern)
- `plugin-commons`
  - [#1498](https://github.com/wix-incubator/rich-content/pull/1498) plugin related stuff moved from `editor-common` to a separate package
### :bug: Bug Fix
- `viewer`
  - [#1487](https://github.com/wix-incubator/rich-content/pull/1487) fix viewer justify css for safari and firefox
- `plugin-commons`
  - [#1526](https://github.com/wix-incubator/rich-content/pull/1526) UrlInputModal theme/style override workaround
- `editor`
  - [#1519](https://github.com/wix-incubator/rich-content/pull/1519) external toolbars: inline style toggling fixed
  - [#1520](https://github.com/wix-incubator/rich-content/pull/1520) inner modal theme
- `plugin-link`
  - [#1521](https://github.com/wix-incubator/rich-content/pull/1521) fix basic link panel wiring
  - [#1531](https://github.com/wix-incubator/rich-content/pull/1531) fix linkColor not shown on initial render (SSR)
- `preview`
  - [#1523](https://github.com/wix-incubator/rich-content/pull/1523) readMore hashtags & mentions callbacks functionality
  - [#1524](https://github.com/wix-incubator/rich-content/pull/1524) text fragments edge case
- `ricos-viewer`
  - [#1522](https://github.com/wix-incubator/rich-content/pull/1522) incorrect gallery image index in fullscreen
- `emoji-plugin`
  - [#1510](https://github.com/wix-incubator/rich-content/pull/1510) emoji preview modal anchor bug fix
### :house: Internal
- `e2e`
  - [#1509](https://github.com/wix-incubator/rich-content/pull/1509) test html plugin change url
- `ricos-theme`
  - [#1515](https://github.com/wix-incubator/rich-content/pull/1515) bundle size improved by removing unused JSS plugins
- `general`
  - [#1525](https://github.com/wix-incubator/rich-content/pull/1525) typed theme functions for all plugins
  - [#1528](https://github.com/wix-incubator/rich-content/pull/1528) fixed `npm run watch` command for several packages
- `storybook`
  - [#1533](https://github.com/wix-incubator/rich-content/pull/1533) ricos theme's palette examples are more realistic

## 7.18.3 (Sep 3, 2020)
### :bug: Bug Fix
- `ricos-editor`
  - [#1508](https://github.com/wix-incubator/rich-content/pull/1508) child (RCE) props were never updated

## 7.18.2 (Sep 3, 2020)
### :bug: Bug Fix
- `all`
  - [#1505](https://github.com/wix-incubator/rich-content/pull/1505) restore last rule semicolon in rtl directivies in all packages dist/styles.min.css

## 7.18.1 (Sep 2, 2020)
### :bug: Bug Fix
- `preview`
  - [#1507](https://github.com/wix-incubator/rich-content/pull/1507) readMore wasn't shown when gallery-plugin was the only plugin in the content
- `editor-common`
  - [#7a2902dd](https://github.com/wix-incubator/rich-content/commit/7a2902dd) fix error on ResizeObserver when inlineToolbar's getVisibilityFn = () => false

## 7.18.0 (Sep 2, 2020)
### :rocket: New Feature
- `gallery`
  - [#1406](https://github.com/wix-incubator/rich-content/pull/1406) override default plugin dataConfig object from config
- `preview`
  - [#1502](https://github.com/wix-incubator/rich-content/pull/1502) allow gallery size modification

### :bug: Bug Fix
- `ricos-viewer`
  - [#1501](https://github.com/wix-incubator/rich-content/pull/1501) fullscreen mobile awareness
- `common`
  - [#1504](https://github.com/wix-incubator/rich-content/pull/1504) fix: lists alignment in rtl

## 7.17.1 (Sep 1, 2020)
### :bug: Bug Fix
- `editor-common`
  - [#1503](https://github.com/wix-incubator/rich-content/pull/1503) @wix/draft-js@0.0.10 -- bugfix for Chrome 85

## 7.17.0 (Sep 1, 2020)
### :rocket: New Feature
- `fullscreen`
  - [#1154](https://github.com/wix-incubator/rich-content/pull/1154) exapnd mode with titles and fullscreen compatability, major design changes and responsiveness, `isMobile` prop support
- `gallery`
  - [#1483](https://github.com/wix-incubator/rich-content/pull/1483) upload error in gallery settings display with tooltip
### :bug: Bug Fix
- `video`
  - [#1490](https://github.com/wix-incubator/rich-content/pull/1490) pixel perfect ratio. Fixes blog automation.  
- `preview`
  - [#1499](https://github.com/wix-incubator/rich-content/pull/1499) fix flaky e2e tests
  - [#1482](https://github.com/wix-incubator/rich-content/pull/1482) ReadMore click expands the full content
  - [#1485](https://github.com/wix-incubator/rich-content/pull/1485) fix readmore visibility when there are multiple text fragments
  - [#1492](https://github.com/wix-incubator/rich-content/pull/1492) edge case of 1 image + {x} plugins prevented display of "read more" label
- `plugins`
  - [#1481](https://github.com/wix-incubator/rich-content/pull/1481) line-spacing & text-color: external toolbar dropdown styles fixed
- `ricos-editor`
  - [#1450](https://github.com/wix-incubator/rich-content/pull/1450) getContentPromise - add flush option to fix mobile composition mode
- `modals empty state`
  - [#1493](https://github.com/wix-incubator/rich-content/pull/1493) fix giphy's and side menu's empty state ui.  
### :house: Internal
- `e2e`
  - [#1479](https://github.com/wix-incubator/rich-content/pull/1479) test html plugin choose url option
- `file-upload`
  - [#1411](https://github.com/wix-incubator/rich-content/pull/1411) errors saved in component data
  
## 7.16.15 (Aug 24, 2020)
### :rocket: New Feature
- `image`
  - [#1408](https://github.com/wix-incubator/rich-content/pull/1408) upload error displays in image settings
### :bug: Bug Fix
- `preview`
  - [#1426](https://github.com/wix-incubator/rich-content/pull/1426) Read More label at the bottom, label toggling for Read More
- `ricos-editor`
  - [#1476](https://github.com/wix-incubator/rich-content/pull/1476) onChange is called when upload starts/ends
  - [#1478](https://github.com/wix-incubator/rich-content/pull/1478) removed div element wrapping RCE affecting styling
### :house: Internal
- `general`
  - [#1408](https://github.com/wix-incubator/rich-content/pull/1408) media upload errors saved and handled from component data

## 7.16.14 (Aug 23, 2020)
### :bug: Bug Fix
- `ricos-editor`
  - [#1471](https://github.com/wix-incubator/rich-content/pull/1471) missing height in ricos editor wrapping div
- `editor-common`
  - [#1473](https://github.com/wix-incubator/rich-content/pull/1473) fix RadioGroup not working in html plugin


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
### :bug: Bug Fix
- `editor`
  - [#1379](https://github.com/wix-incubator/rich-content/pull/1379) prevent wix focus-ring (formatting toolbar corruption)
- `fullscreen`
  - [#1380](https://github.com/wix-incubator/rich-content/pull/1380) incorrect url for small images leading to blurry display + unit tests

## 7.13.1 (Jul 22, 2020)

### :rocket: New Feature

- `ricos-common`
  - [#1371](https://github.com/wix-incubator/rich-content/pull/1371) completed missing props in Ricos API from rich-content API

### :bug: Bug Fix

- `ricos`
  - [#1375](https://github.com/wix-incubator/rich-content/pull/1375) theme fix for multiple instances of RicosEditor / RicosViewer
- `editor-common`
  - [#1340](https://github.com/wix-incubator/rich-content/pull/1340) plugin toolbar fixed position after resize

## 7.13.0 (Jul 20, 2020)

### :rocket: New Feature

- `preview`
  - [#1356](https://github.com/wix-incubator/rich-content/pull/1356) support video in gallery
  - [#1369](https://github.com/wix-incubator/rich-content/pull/1369) preview content examples in storybook
- `storybook`
  - [#1369](https://github.com/wix-incubator/rich-content/pull/1369) preview content examples
- `giphy`
  - [#1358](https://github.com/wix-incubator/rich-content/pull/1358) gif preview modal empty state
- `ricos-viewer`
  - [#1249](https://github.com/wix-incubator/rich-content/pull/1249) preview strategy

### :bug: Bug Fix

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

### :bug: Bug Fix

- `fullscreen`
  - [#1359](https://github.com/wix-incubator/rich-content/pull/1359) fix when direction=RTL
- `editor-common`
  - [#1343](https://github.com/wix-incubator/rich-content/pull/1343) draftUtils.ts - fixed getEntities types
  - [#1352](https://github.com/wix-incubator/rich-content/pull/1352) insertPlugins modals theme prop was broken (videoPlugin in particular)
- `viewer`
  - [#1352](https://github.com/wix-incubator/rich-content/pull/1352) anchors fix: exclude inline plugins

## 7.12.2 (Jul 13, 2020)

### :bug: Bug Fix

- `preview`
  - [#1341](https://github.com/wix-incubator/rich-content/pull/1341) inlineStyles - corrected offset of readMore
- `ricos-editor`
  - [#1348](https://github.com/wix-incubator/rich-content/pull/1348) bump zIndex to 20000 (to overcome wix site styles)

## 7.12.1 (Jul 13, 2020)

### :bug: Bug Fix

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

### :rocket: New Feature

- `viewer`
  - [#1265](https://github.com/wix-incubator/rich-content/pull/1265) paywall seo support

### :bug: Bug Fix

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

### :house: Internal

- `plugins-bundle-analyzer`
  - [#1302](https://github.com/wix-incubator/rich-content/pull/1302) converted analyzer to typescript

## 7.11.0 (Jun 30, 2020)

### :rocket: New Feature

- `polls` *alpha*
  - [#1290](https://github.com/wix-incubator/rich-content/pull/1290) add plugin
- `text-selection-toolbar`
  - [#1233](https://github.com/wix-incubator/rich-content/pull/1233) toolbar fixes, twitter design and remove viewer id
- `viewer`
  - [#1282](https://github.com/wix-incubator/rich-content/pull/1282) Ad placeholder - support block type

### :bug: Bug Fix

- `text-color`
  - [#1279](https://github.com/wix-incubator/rich-content/pull/1279) text & highlight color in mobile
- `image`
  - [#1277](https://github.com/wix-incubator/rich-content/pull/1277) image with link in initial state
- `viewer`
  - [#1285](https://github.com/wix-incubator/rich-content/pull/1285) text alignment with punctuation

### :house: Internal

- `common`
  - [#1288](https://github.com/wix-incubator/rich-content/pull/1288) add changes for polls
- `editor-common`
  - [#1287](https://github.com/wix-incubator/rich-content/pull/1287) add changes for polls
- `test-env`
  - [#1286](https://github.com/wix-incubator/rich-content/pull/1286) update setSelection for Editor and Viewer

## 7.10.8 (Jun 28, 2020)

### :bug: Bug Fix

- `video`
  - [#1267](https://github.com/wix-incubator/rich-content/pull/1267) Trim URL input
- `gallery`
  - [#1273](https://github.com/wix-incubator/rich-content/pull/1273) gallery opens on correct image in rtl
- `mentions`
  - [#1275](https://github.com/wix-incubator/rich-content/pull/1275) `onMentionClick` callback is called on viewer
- `common`
  - [#1274](https://github.com/wix-incubator/rich-content/pull/1274) viewer text direction

### :house: Internal

- `general`
  - [#1256](https://github.com/wix-incubator/rich-content/pull/1256) migrated from flow types to TypeScrip
- `editor-common`
  - [#1278](https://github.com/wix-incubator/rich-content/pull/1278) support decoratorTrigger for composition mode

## 7.10.7 (Jun 21, 2020)

### :rocket: New Feature

- `adsense`
  - [#1179](https://github.com/wix-incubator/rich-content/pull/1179) add adsense plugin

### :bug: Bug Fix

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

### :house: Internal

- `general`
  - [#1244](https://github.com/wix-incubator/rich-content/pull/1244) support TypeScript in all packages
- `image`
  - [#1264](https://github.com/wix-incubator/rich-content/pull/1264) loader for oneApp - 'loading' in component data

## 7.10.6 (Jun 14, 2020)

### :rocket: New Feature

- `ricos`
  - [#1214](https://github.com/wix-incubator/rich-content/pull/1214) Modal API

### :bug: Bug Fix

- `ricos`
  - [#1229](https://github.com/wix-incubator/rich-content/pull/1229) fix(rollup): reduce bundlesize on legacy child support
- `common`
  - [#1186](https://github.com/wix-incubator/rich-content/pull/1186) block alignment with indentation
- `editor`
  - [#1190](https://github.com/wix-incubator/rich-content/pull/1190) handle pasted text on atomic blocks keeps their entities

### :house: Internal

- `test-env`
  - [#1216](https://github.com/wix-incubator/rich-content/pull/1216) complete ricos coverage of e2e tests
- `ricos-viewer`
  - [#1239](https://github.com/wix-incubator/rich-content/pull/1239) functionality common to editor and viewer was moved to new package `ricos-common`

## 7.10.5 (Jun 9, 2020)

### :bug: Bug Fix
- `gallery`
  - [#1224](https://github.com/wix-incubator/rich-content/pull/1224) bump pro gallery version to 1.10.21

## 7.10.4 (Jun 8, 2020)

### :bug: Bug Fix

- `gallery`
  - [#1221](https://github.com/wix-incubator/rich-content/pull/1221) some layouts missing css. Regression from 7.9.1

## 7.10.3 (Jun 7, 2020)

### :bug: Bug Fix

- `common`
  - [#1181](https://github.com/wix-incubator/rich-content/pull/1181) lists alignment
- `gallery`
  - [#1217](https://github.com/wix-incubator/rich-content/pull/1217) some layouts missing css. Regression from 7.9.1

### :house: Internal

- `ricos`
  - [#1182](https://github.com/wix-incubator/rich-content/pull/1182) UnitTest: child props must be equal both as wrapper and non-wrapper
  - [#1121](https://github.com/wix-incubator/rich-content/pull/1121) fix JSS big warning in the console (classnames not found)
- `test-env`
  - [#1210](https://github.com/wix-incubator/rich-content/pull/1210) ricos coverage of `rendering.e2e` and `renderingSsr.e2e`

## 7.10.2 (Jun 4, 2020)

fix bad release in 7.10.1

## 7.10.1 (Jun 4, 2020)

### :rocket: New Feature

- `editor-common`
  - [#1147](https://github.com/wix-incubator/rich-content/pull/1147) error message with icon
- `video`
  - [#1175](https://github.com/wix-incubator/rich-content/pull/1175) new design to video overlay in editor

### :bug: Bug Fix

- `headings`
  - [#1199](https://github.com/wix-incubator/rich-content/pull/1199) change the tooltip of heading's button
- `gallery`
  - [#1168](https://github.com/wix-incubator/rich-content/pull/1168) bump pro gallery version to 1.10.17
  - [#1206](https://github.com/wix-incubator/rich-content/pull/1206) bump pro gallery version to 1.10.19
- `ricos-viewer`
  - [#1197](https://github.com/wix-incubator/rich-content/pull/1197) mobile not working with static text toolbar
- `image`
  - [#1136](https://github.com/wix-incubator/rich-content/pull/1136) loader for oneApp

### :house: Internal

- `test-env`
  - [#1195](https://github.com/wix-incubator/rich-content/pull/1195) ricos coverage of `plugin-link-preview` and `plugin-html`

## 7.9.1 (Jun 2, 2020)

### :bug: Bug Fix

- `fullscreen`
  - [#1189](https://github.com/wix-incubator/rich-content/pull/1189) image not centered when wrapped in rtl

## 7.9.0 (Jun 2, 2020)

### :rocket: New Feature

- `general`
  - [#1143](https://github.com/wix-incubator/rich-content/pull/1143) Dynamic import to 'react-color'
  - [#1158](https://github.com/wix-incubator/rich-content/pull/1158) Dynamic import to 'react-window' and DownShift

### :bug: Bug Fix

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

### :house: Internal

- `storybook`
  - [#1176](https://github.com/wix-incubator/rich-content/pull/1176) isMobile automatic determination
- `ricos`
  - [#1172](https://github.com/wix-incubator/rich-content/pull/1172) ThemeStrategy throws error when Palette is given with missing colors
- `test-env`
  - [#1183](https://github.com/wix-incubator/rich-content/pull/1183) ricos coverage of file-upload + rename from wrapper
  - [#1188](https://github.com/wix-incubator/rich-content/pull/1188) fix link-preview `enableEmbed` on RicosTestApp

## 7.8.0 (May 25, 2020)

### :rocket: New Feature

- `headings`
  - [#901](https://github.com/wix-incubator/rich-content/pull/901) adding plugin headings with dropdown option

### :bug: Bug Fix

- `ricos-viewer`
  - [#1132](https://github.com/wix-incubator/rich-content/pull/1132) enable palettes in theme API
- `editor`
  - [#1137](https://github.com/wix-incubator/rich-content/pull/1137) 'Enter' click preserves alignment style

### :house: Internal

- `editor-common`
  - [1054](https://github.com/wix-incubator/rich-content/pull/1054) refactor calculateDiff

## 7.7.1 (May 21, 2020)

### :bug: Bug Fix

- `file`
  - [#1129](https://github.com/wix-incubator/rich-content/pull/1129) file block not showing

## 7.7.0 (May 20, 2020)

### :rocket: New Feature

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

### :bug: Bug Fix

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

### :house: Internal

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

### :bug: Bug Fix

- `editor-common`
  - [#1046](https://github.com/wix-incubator/rich-content/pull/1046) cursor jumps to start of editor on close modal
- `editor`
  - [#1059](https://github.com/wix-incubator/rich-content/pull/1059) fix getToolbarSettings Api to work

### :house: Internal

- `wrapper`
  - [#993](https://github.com/wix-incubator/rich-content/pull/993) remove `!important` usage + deep merge jss styles
  - [#1031](https://github.com/wix-incubator/rich-content/pull/1031) fixed build warning - "punycode" library

## 7.6.0 (May 5, 2020)

### :rocket: New Feature

- `indent`
  - [#898](https://github.com/wix-incubator/rich-content/pull/898) text indentation
- `viewer`
  - [#1005](https://github.com/wix-incubator/rich-content/pull/1005) add viewMode SEO to ProGallery

### :bug: Bug Fix

- `social-modals`
  - [#1037](https://github.com/wix-incubator/rich-content/pull/1037) disable text input autocomplete
- `vertical embed`
  - [#1036](https://github.com/wix-incubator/rich-content/pull/1036) dropdown for search opens automatically when typing text for search
- `gallery`
  - [#1020](https://github.com/wix-incubator/rich-content/pull/1020) gallery accepts window as scrollingElement

## 7.5.0 (May 5, 2020)

### :rocket: New Feature

- `button`
  - [#958](https://github.com/wix-incubator/rich-content/pull/958) action button plugin - button with onClick callback
- `plugin menu`
  - [#739](https://github.com/wix-incubator/rich-content/pull/739) new plugin menu (side menu) with much better UX/UI for many plugins

### :bug: Bug Fix

- `video`
  - [#1004](https://github.com/wix-incubator/rich-content/pull/1004) fix external video metadata
- `editor`
  - [#941](https://github.com/wix-incubator/rich-content/pull/941) add tooltips for settings panels
- `preview`
  - [#999](https://github.com/wix-incubator/rich-content/pull/999) giphy metadata is handled correctly by image and gallery data mergers
- `gallery`
  - [#1006](https://github.com/wix-incubator/rich-content/pull/1006) expand icon appears only on hovered image

### :house: Internal

- `wrapper`
  - [#980](https://github.com/wix-incubator/rich-content/pull/980) createEmpty import
  - [#983](https://github.com/wix-incubator/rich-content/pull/983) fix custom inlineStyleMappers (viewer)
- `general`
  - [#982](https://github.com/wix-incubator/rich-content/pull/982) `npm run watch` fixed to work concurrently with `flow` + `npm run e2e:debug` fixed to wait on serve ready
- `storybook`
  - [#958](https://github.com/wix-incubator/rich-content/pull/958) Buttons story added (Action & Link buttons)

## 7.4.6 (May 3, 2020)

### :bug: Bug Fix

- `editor-common`
  - [#994](https://github.com/wix-incubator/rich-content/pull/994) cursor doesn't disappear when adding plugin
- `gallery`
  - [#990](https://github.com/wix-incubator/rich-content/pull/990) height not updating when changing width

### :house: Internal

- `wrapper`
  - [#980](https://github.com/wix-incubator/rich-content/pull/980) createEmpty import
- `general`
  - [#965](https://github.com/wix-incubator/rich-content/pull/965) fix: gitPRComment overrides the content of the PR comment
  - [#985](https://github.com/wix-incubator/rich-content/pull/985) enable publishing with custom npm tag
  - [#988](https://github.com/wix-incubator/rich-content/pull/988) Adding 'build:analyze:viewer' and 'build:analyze:editor' scripts instead of 'build:analyze' script

## 7.4.5 (Apr 28, 2020)

### :rocket: New Feature

- `image` `video`
  - [#972](https://github.com/wix-incubator/rich-content/pull/972) handle upload error - show message on block

### :bug: Bug Fix

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

### :house: Internal

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

### :bug: Bug Fix

- `plugin-emoji`
  - [#948](https://github.com/wix-incubator/rich-content/pull/948) es5 `const` in react-icons node module. Extract the needed icons and removed the dependency on 'react-icons'
- `map`
  - [#939](https://github.com/wix-incubator/rich-content/pull/939) Map Settings: dynamic style replaced with theme
- `editor`
  - [#917](https://github.com/wix-incubator/rich-content/pull/917) add tooltips for drop down buttons

### :house: Internal

- `general`
  - [#927](https://github.com/wix-incubator/rich-content/pull/927) Adding GitHub action that compares and fails if one of the current bundle sizes grows more then 5KB

## 7.3.4 (Apr 21, 2020)

### :house: Internal

- `editor`
  - [#912](https://github.com/wix-incubator/rich-content/pull/912) publish api
- `wrapper`
  - [#912](https://github.com/wix-incubator/rich-content/pull/912) onChange handle inside wrapper
- `editor-common`
  - [#912](https://github.com/wix-incubator/rich-content/pull/912) getPostContentSummary updated

### :bug: Bug Fix

- `code-block`
  - [#943](https://github.com/wix-incubator/rich-content/pull/943) Adding code block with backward direction of selection
- `giphy`
  - [#945](https://github.com/wix-incubator/rich-content/pull/945) Restore auto-focus after add giphy

### :house: Internal

- `wrapper`
  - [#931](https://github.com/wix-incubator/rich-content/pull/931) added internal static toolbar support

## 7.3.3 (Apr 20, 2020)

### :bug: Bug Fix

- `viewer`
  - [#929](https://github.com/wix-incubator/rich-content/pull/929) fix: empty lists viewer issues

### :rocket: New Feature

- `viewer`
  - [#908](https://github.com/wix-incubator/rich-content/pull/908) Support Viewer predefined anchors

### :house: Internal

- `vertical-embed`
  - [#728](https://github.com/wix-incubator/rich-content/pull/728) Vertical Embed Plugin - alpha verison
- `wrapper`
  - [#935](https://github.com/wix-incubator/rich-content/pull/935) back-office theme will appear as default theme for now

## 7.3.2 (Apr 16, 2020)

### :bug: Bug Fix

- `link-preview`
  - [#924](https://github.com/wix-incubator/rich-content/pull/924) disable link preview/embed when entered inside a list

## 7.3.1 (Apr 15, 2020)

### :bug: Bug Fix

- `editor-common`
  - [#913](https://github.com/wix-incubator/rich-content/pull/913) onChange - calculateDiff is debounced, for better performance
- `viewer`
  - [#923](https://github.com/wix-incubator/rich-content/pull/923) fix: inline styles in lists breaking viewer

### :house: Internal

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

### :rocket: New Feature

- `list`
  - [#815](https://github.com/wix-incubator/rich-content/pull/815) nested lists
- `editor`
  - [#906](https://github.com/wix-incubator/rich-content/pull/906) editor supports entering tab character ('\t') by clicking on tab
- `theme + wrapper: gallery, plugins & modals`
  - [#828](https://github.com/wix-incubator/rich-content/pull/828) style update related to a lot of components + wrapper compatibility.

### :bug: Bug Fix

- `preview`
  - [#903](https://github.com/wix-incubator/rich-content/pull/903) gallery fixed; resize flapping fixed
- `gallery`
  - [#909](https://github.com/wix-incubator/rich-content/pull/909) gallery size
- `editor`
  - [#914](https://github.com/wix-incubator/rich-content/pull/914) updating tooltips keys

### :house: Internal

- `wrapper`
  - [#907](https://github.com/wix-incubator/rich-content/pull/907) converted `wix-rich-content-wrapper` to typescript

## 7.2.0 (Apr 8, 2020)

### :rocket: New Feature

- `link`
  - [#750](https://github.com/wix-incubator/rich-content/pull/750) link toolbar

### :bug: Bug Fix

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

### :house: Internal

- `storybook`
  - [#891](https://github.com/wix-incubator/rich-content/pull/891) fixed textHighlightPlugin color (intro.js)
- `general`
  - [#905](https://github.com/wix-incubator/rich-content/pull/905) refactor - remove getConfigByFormFactor.js

## 7.1.5 (Apr 4, 2020)

### :bug: Bug Fix

- `gallery`
  - [#879](https://github.com/wix-incubator/rich-content/pull/879) blurry pictures & not rendering
  - [#877](https://github.com/wix-incubator/rich-content/pull/877) fix gallery plugin blurry pictures
- `link-preview`
  - [#871](https://github.com/wix-incubator/rich-content/pull/871) maxwidth
- `general`
  - [#889](https://github.com/wix-incubator/rich-content/pull/889) fix all plugins max-width for inline size

### :house: Internal

- `general`
  - [#878](https://github.com/wix-incubator/rich-content/pull/878) added git comment to pr's containing surge-examples url's

## 7.1.4 (Apr 2, 2020)

### :rocket: New Feature

- `html`
  - [#868](https://github.com/wix-incubator/rich-content/pull/868) save on click outside in html plugin
- `embed`
  - [#689](https://github.com/wix-incubator/rich-content/pull/689) embed for supported links

### :bug: Bug Fix

- `editor-common`
  - [#547](https://github.com/wix-incubator/rich-content/pull/547) accessibility issue fixed: focus on hidden elements when tab-clicking
  - [#873](https://github.com/wix-incubator/rich-content/pull/873) fix: ctrl/command support in win/osx
- `viewer`
  - [#867](https://github.com/wix-incubator/rich-content/pull/867) contextual props are passed to interactions

### :house: Internal

- `emoji`
  - [#870](https://github.com/wix-incubator/rich-content/pull/870) reduce the bundle size of plugin emoji

## 7.1.3 (Mar 30, 2020)

### :bug: Bug Fix

- `general`
  - [#843](https://github.com/wix-incubator/rich-content/pull/843) fix: mouse up event on overlay triggered the closing the modals
- `editor`
  - [#862](https://github.com/wix-incubator/rich-content/pull/862) fix inline resize reset on reload of editor
- `image`
  - [#853](https://github.com/wix-incubator/rich-content/pull/853) Image Original Size for images of width 350px and above

### :house: Internal

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

### :rocket: New Feature

- `html`
  - [#826](https://github.com/wix-incubator/rich-content/pull/826) initial state for html plugin
- `gallery`
  - [#833](https://github.com/wix-incubator/rich-content/pull/833) elipsis for too long image titles

### :house: Internal

- `gallery`
  - [#833](https://github.com/wix-incubator/rich-content/pull/833) using alt property instead of title for altText fixes mobile titles

### :bug: Bug Fix

- `link-preview`
  - [#841](https://github.com/wix-incubator/rich-content/pull/841) link preview fixes
- `fullscreen`
  - [#842](https://github.com/wix-incubator/rich-content/pull/842) itemId for legacy image type

## 7.1.1 (Mar 25, 2020)

### :house: Internal

- `wrapper`
  - jss dependencies as external to resolve cjs issue

## 7.1.0 (Mar 25, 2020)

### :rocket: New Feature

- `code-block`
  - [#827](https://github.com/wix-incubator/rich-content/pull/827) selection starts in the block
- `link-preview`
  - [#653](https://github.com/wix-incubator/rich-content/pull/653) add link preview

### :bug: Bug Fix

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

### :house: Internal

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

### :house: Internal

- `wrapper`
  - [#804](https://github.com/wix-incubator/rich-content/pull/804) engine-wrapper refactored
  - [#806](https://github.com/wix-incubator/rich-content/pull/806) locale dynamic import
  - [#807](https://github.com/wix-incubator/rich-content/pull/807) include common styles in styles.min.css
  - [#709](https://github.com/wix-incubator/rich-content/pull/709) support inlineStyleMappers
- `editor-common`
  - `convertFromHTML` exposed for Forum usage

## 7.0.1 (Mar 18, 2020)

### :house: Internal

- `editor`
  - [#801](https://github.com/wix-incubator/rich-content/pull/801) `editorStateConversion.js` consume `draft-js` directly to prevent bundle bloat of lib

## 7.0.0 (Mar 17, 2020)

### :boom: Breaking Change

- `editor`
  - [#752](https://github.com/wix-incubator/rich-content/pull/752) Move draft-js to dependency from peerDependency [Migration Detials](https://github.com/wix-incubator/rich-content/wiki/RCE-V.7-Migration-Guide)

### :rocket: New Feature

- `fullscreen`
  - [#776](https://github.com/wix-incubator/rich-content/pull/776) fullscreen closes on Esc key press

### :bug: Bug Fix

- `gallery`
  - [#775](https://github.com/wix-incubator/rich-content/pull/775) adding videos to gallery

