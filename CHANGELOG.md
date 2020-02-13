# Changelog
> **Tags:**
>
> - :boom: [Breaking Change]
> - :rocket: [New Feature]
> - :bug: [Bug Fix]
> - :book: [Documentation]
> - :house: [Internal]
## [Unreleased]
<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>

</details>
<hr/>

## 6.8.4 (Feb 12, 2020)
### :bug: Bug Fix
- `editor-common`
  - [#645](https://github.com/wix-incubator/rich-content/pull/645) When removing link from text the cursor is in the correct position
- `gallery`
  - [#672](https://github.com/wix-incubator/rich-content/pull/672) gallery images settings frozen
  
## 6.8.3 (Feb 11, 2020)
### :bug: Bug Fix
- `image`
  - [da631441](https://github.com/wix-incubator/rich-content/commit/da631441) gif opacity
### :house: Internal
- `general`
  - [#666](https://github.com/wix-incubator/rich-content/pull/666) ES5 syntax validation in `dist/statics` on postbuild
  
## 6.8.2 (Feb 9, 2020)
### :bug: Bug Fix
- `emoji`
  - [#669](https://github.com/wix-incubator/rich-content/pull/669) mouse cursor is shown as pointer on the actual icons + fix the emoji plugin in RTL+ position the modal at the bottom in mobile+ refactoring the emoji modal and giphy modal to be more consistent
- `common`
  - [#658](https://github.com/wix-incubator/rich-content/pull/658) `types` definitions moved to `src/consts` from `statics`
- `image`
  - [#657](https://github.com/wix-incubator/rich-content/pull/657) defaults for editor-only props in image-viewer
  - [#657](https://github.com/wix-incubator/rich-content/pull/657) in-plugin editing input rendered in edit mode only
  - [#657](https://github.com/wix-incubator/rich-content/pull/657) highres URL on SSR protection

## 6.8.1 (Feb 6, 2020)
### :bug: Bug Fix
- `viewer`
  - [#654](https://github.com/wix-incubator/rich-content/pull/654) plugin settings retrieved correctly

## 6.8.0 (Feb 5, 2020)
### :rocket: New Feature
- `editor`
  - [#570](https://github.com/wix-incubator/rich-content/pull/570) onError callback prop added
- `viewer`
  - [#570](https://github.com/wix-incubator/rich-content/pull/570) onError callback prop added
### :bug: Bug Fix
- `map`
  - [#612](https://github.com/wix-incubator/rich-content/pull/612) warnings issues of google-maps-loader props
- `link`
  - [#646](https://github.com/wix-incubator/rich-content/pull/646) backslash in link panel breaks editor
### :house: Internal
- `general`
  - [#627](https://github.com/wix-incubator/rich-content/pull/627) React Context completely removed
  - [#641](https://github.com/wix-incubator/rich-content/pull/641) `babel-plugin-transform-react-remove-prop-type` added
  - [#637](https://github.com/wix-incubator/rich-content/pull/637) moved deployment from Travis CI to Github Actions

## 6.7.1 (Jan 27, 2020)
### :bug: Bug Fix
- `gallery`
  - [#639](https://github.com/wix-incubator/rich-content/pull/639) numberOfImagesPerRow style removed from defaults
- `image`
  - [#635](https://github.com/wix-incubator/rich-content/pull/635) image reloaded when adding/removing link
- `video`
  - [#636](https://github.com/wix-incubator/rich-content/pull/636) facebook video ratio in SSR
### :house: Internal
- `e2e`
  - [#635](https://github.com/wix-incubator/rich-content/pull/635) disable css transitions in cypress

## 6.7.0 (Jan 27, 2020)
### :rocket: New Feature
- `image`
  - [#563](https://github.com/wix-incubator/rich-content/pull/563) on stage plugin editing for caption
### :bug: Bug Fix
- `image`
  - [#622](https://github.com/wix-incubator/rich-content/pull/622) ssr blurry image
  - [#634](https://github.com/wix-incubator/rich-content/pull/634) external image selection - fix multi selection
- `general`
  - [#632](https://github.com/wix-incubator/rich-content/pull/632) plugins flicker with "loading"
  - [#574](https://github.com/wix-incubator/rich-content/pull/574) improve custom icon API
- `giphy`
  - [#621](https://github.com/wix-incubator/rich-content/pull/621) insert plugin icon customization
- `divider`
  - [#615](https://github.com/wix-incubator/rich-content/pull/615) alignment changes space beneath divider
- `text-color`
  - [#572](https://github.com/wix-incubator/rich-content/pull/572) "Reset To Default" button position to bottom
  - [#576](https://github.com/wix-incubator/rich-content/pull/576) "Reset To Default" removes inlineStyle
- `editor-common`
  - [#550](https://github.com/wix-incubator/rich-content/pull/550) dashed border when focused
  - [#584](https://github.com/wix-incubator/rich-content/pull/584) gallery dropdown styles
  - [#594](https://github.com/wix-incubator/rich-content/pull/594) fix the selection after adding a new block in oneApp
  - [#633](https://github.com/wix-incubator/rich-content/pull/633) upload same file consecutively
- `link`
  - [#626](https://github.com/wix-incubator/rich-content/pull/626) when selecting part of link, editing changes the whole link
  - [#551](https://github.com/wix-incubator/rich-content/pull/551) tooltip for nofollow tag
  - [#546](https://github.com/wix-incubator/rich-content/pull/546) saves the last data and the initial state of the checkboxes("Open in a new tab", "Add a nofollow tag") is according to the defaults (anchorTarget, relValue)
  - [#566](https://github.com/wix-incubator/rich-content/pull/566) tooltip position below toolbar
- `video`
  - [#613](https://github.com/wix-incubator/rich-content/pull/613) native upload video
- `gallery`
  - [#602](https://github.com/wix-incubator/rich-content/pull/602) replace images
  - [#624](https://github.com/wix-incubator/rich-content/pull/624) nonnative replace image
  - [#606](https://github.com/wix-incubator/rich-content/pull/606) infinite loader in gallery settings (in blog old mobile app)
- `image`
  - [#624](https://github.com/wix-incubator/rich-content/pull/624) nonnative replace image
- `common`
  - [#620](https://github.com/wix-incubator/rich-content/pull/620) backward compatibility for legacy image custom size
- `html`
  - [#631](https://github.com/wix-incubator/rich-content/pull/631) HTML height issue
### :house: Internal
- `general`
  - [#561](https://github.com/wix-incubator/rich-content/pull/561) refactor - cleanup readOnly prop from code
  - [#562](https://github.com/wix-incubator/rich-content/pull/562) use `@lerna/project` to get all lerna packages
  - [#585](https://github.com/wix-incubator/rich-content/pull/585) deploy every branch to surge
- `e2e`
  - [#564](https://github.com/wix-incubator/rich-content/pull/564) snapshots renaming for gallery and image plugins tests
- `editor`
  - [#575](https://github.com/wix-incubator/rich-content/pull/575) ltr & rtl css yoshi issues solved (requested by forum)
- `example`
  - [#634](https://github.com/wix-incubator/rich-content/pull/634) toggle for mocking image multi-select
  - [#624](https://github.com/wix-incubator/rich-content/pull/575) video and image selection is uses external selection logic
    
## 6.6.8 (Jan 16, 2020)
### :bug: Bug Fix
- `editor-common`
  - [#608](https://github.com/wix-incubator/rich-content/pull/608) fileSelectionChanged works for a single image
  - [#601](https://github.com/wix-incubator/rich-content/pull/601) in order to edit the link settings its enough to select only part of the words that belongs to the link

## 6.6.7 (Jan 16, 2020)
### :bug: Bug Fix
- `editor`
  - [#604](https://github.com/wix-incubator/rich-content/pull/604) drag & drop to beginning of first block is disabled
- `video`
  - [#604](https://github.com/wix-incubator/rich-content/pull/604) missing thumbnail for custom uploaded video
- `editor-common`
  - [#605](https://github.com/wix-incubator/rich-content/pull/605) base toolbar relies on props rather context
### :house: Internal
- `examples`
  - [#604](https://github.com/wix-incubator/rich-content/pull/604) changed custom upload mock video to a wix media video

## 6.6.6 (Jan 9, 2020)
### :bug: Bug Fix
- `image`
  - [#581](https://github.com/wix-incubator/rich-content/pull/581) remove low resolution preload image for gif
- `mentions`
  - [#580](https://github.com/wix-incubator/rich-content/pull/580) mention list style fixed

## 6.6.5 (Dec 30, 2019)
### :bug: Bug Fix
- `editor-common`
  - [#560](https://github.com/wix-incubator/rich-content/pull/560) getBlockInfo returns entity type rather block type

## 6.6.4 (Dec 30, 2019)
### :bug: Bug Fix
- `editor-common`
  - [#558](https://github.com/wix-incubator/rich-content/pull/558) getBlockInfo util arguments fixed

## 6.6.3 (Dec 29, 2019)
### :rocket: New Feature
- `text-color`
  - [#520](https://github.com/wix-incubator/rich-content/pull/520) color Picker- adding an option to change back to default color
### :bug: Bug Fix
- `editor`
  - [#556](https://github.com/wix-incubator/rich-content/pull/556) fix onAtomicBlockFocus to work when alternating focus between different kinds of plugins

## 6.6.2 (Dec 11, 2019)
### :rocket: New Feature
- `editor-common`
  - [#526](https://github.com/wix-incubator/rich-content/pull/526) `onAtomicBlockFocus` is invoked with `undefined` when an atomic block loses focus
  - [#530](https://github.com/wix-incubator/rich-content/pull/530) `uiSettings.linkPanel.placeholder` determines the link panel's placeholder
- `image`
  - [#533](https://github.com/wix-incubator/rich-content/pull/533) add multiple images at once, enabling `config.createGalleryForMultipleImages` renders them as a gallery
- `file-upload`
  - [#533](https://github.com/wix-incubator/rich-content/pull/533) add multiple files at once
### :bug: Bug Fix
- `editor-common`
  - [#550](https://github.com/wix-incubator/rich-content/pull/550) remove dashed border when focused
- `editor`
  - [#504](https://github.com/wix-incubator/rich-content/pull/504) pasted links get the configured anchorTarget and relValue
  - [#521](https://github.com/wix-incubator/rich-content/pull/521) replace p element with div element in lists
  - [#552](https://github.com/wix-incubator/rich-content/pull/552) fix Plugin toolbar shouldCreate config crush
- `editor`
  - [#554](https://github.com/wix-incubator/rich-content/pull/554) change align shortcuts from cmd to cmd + shift
- `undo-redo`
  - [#543](https://github.com/wix-incubator/rich-content/pull/543) fix undo-redo icons on mobile
- `gallery`
  - [#545](https://github.com/wix-incubator/rich-content/pull/545) fix image ratio change in gallery slider layout
### :house: Internal
- `gallery-settings`
  - [#535](https://github.com/wix-incubator/rich-content/pull/535) gallery setting's header, tabs and footer position
- `images-settings`
  - [#537](https://github.com/wix-incubator/rich-content/pull/537) image and gallery setting's header, tabs and footer position
- `editor`
  - [#522](https://github.com/wix-incubator/rich-content/pull/522) support legacy margin scss attributes
- `e2e`
  - [#538](https://github.com/wix-incubator/rich-content/pull/538) moved tests out of Docker, e2e and unit tests run in github actions
  - [#542](https://github.com/wix-incubator/rich-content/pull/542) e2e tests run visual tests and content snapshots separately
- `codeBlock`
  - [#527](https://github.com/wix-incubator/rich-content/pull/527) remove onTab (moved to keyBindingFn/handleKeyCommand)
- `pubsub`
  - [#528](https://github.com/wix-incubator/rich-content/pull/528) rename visibleBlock to focusedBlock
- `common`
  - [#534](https://github.com/wix-incubator/rich-content/pull/534) exposes data normalization and data validation utils as separate entries
- `button`
  - [#517](https://github.com/wix-incubator/rich-content/pull/517) plugin button refactor

## 6.6.1 (Dec 11, 2019)
### :rocket: New Feature
- `fullscreen`
  - [#519](https://github.com/wix-incubator/rich-content/pull/519) add props: topMargin, backgroundColor, foregroundColor. Remove counter when only 1 image. Larger z-index
### :bug: Bug Fix
- `divider`
  - [#511](https://github.com/wix-incubator/rich-content/pull/511) divider's width set to 100% in editor&viewer when no initial state of width is given
- `emoji`
  - [#525](https://github.com/wix-incubator/rich-content/pull/525) fix emoji delete bug
### :house: Internal
- `editor`
  - [#510](https://github.com/wix-incubator/rich-content/pull/510) custom icons code refactoring

## 6.6.0 (Dec 8, 2019)
### :rocket: New Feature
- `file-upload`
  - [#489](https://github.com/wix-incubator/rich-content/pull/489) `config.downloadTarget` enables consumers to control in which tab files are opened
- `undo-redo`
  - [#495](https://github.com/wix-incubator/rich-content/pull/495) creates undo redo plugin
- `editor`
  - [#503](https://github.com/wix-incubator/rich-content/pull/503) activated drag and drop capability by default
- `video`
  - [#507](https://github.com/wix-incubator/rich-content/pull/507) support all video platform urls supported by `react-player`
- `soundcloud`
  - [#507](https://github.com/wix-incubator/rich-content/pull/507) support all audio platform urls supported by `react-player`
- `bi-events`
  - [#514](https://github.com/wix-incubator/rich-content/pull/514) supports `onPluginAdd` (toolbar only) and `onPluginDelete` callbacks via props
### :bug: Bug Fix
- `examples/viewer-ssr`
  - [#499](https://github.com/wix-incubator/rich-content/pull/499) highlight plugin configuration fixed
- `fullscreen`
  - [#496](https://github.com/wix-incubator/rich-content/pull/496) adds support for legacy image type
- `image`
  - [#478](https://github.com/wix-incubator/rich-content/pull/478) margin & size (alignment strategy updated)
- `mentions`
  - [#486](https://github.com/wix-incubator/rich-content/pull/486) suggestions can be navigated using keyboard arrows
- `giphy|emoji`
  - [#512](https://github.com/wix-incubator/rich-content/pull/512) correct popup positions on desktop
- `code-block`
  - [#506](https://github.com/wix-incubator/rich-content/pull/506) fixed functinality of custom key handler
### :house: Internal
- `rollup`
  - [#501](https://github.com/wix-incubator/rich-content/pull/501) remove rollup-plugin-node-builtins and rollup-plugin-node-globals
- `common`
  - [#493](https://github.com/wix-incubator/rich-content/pull/493) `common` package was split into `editor-common` and `common` in order to reduce `viewer` bundle size
  - [#502](https://github.com/wix-incubator/rich-content/pull/502) removed external dependency for detecting rtl
- `viewer examples`
  - [#493](https://github.com/wix-incubator/rich-content/pull/493) remove RichContentModal from viewer examples
- `e2e`
  - [#501](https://github.com/wix-incubator/rich-content/pull/501) update cypress 3.6 => 3.7
  - [#493](https://github.com/wix-incubator/rich-content/pull/493) fix video and soundcloud tests
- `viewer`
  - [d58d8916](https://github.com/wix-incubator/rich-content/commit/d58d8916) remove draftjs
  - [a02b632a](https://github.com/wix-incubator/rich-content/commit/a02b632a) remove draftjs
  - [#513](https://github.com/wix-incubator/rich-content/pull/513) removed `Immutable.js` dependency from `viewer`

## 6.5.0 (Nov 25, 2019)
### :bug: Bug Fix
- `editor`
  - [2a1e1b4a](https://github.com/wix-incubator/rich-content/commit/2a1e1b4a) fix import from common/src
- `e2e`
  - [98d8c980](https://github.com/wix-incubator/rich-content/commit/98d8c980) fix e2e
### :house: Internal
- `draftjs`
  - [#487](https://github.com/wix-incubator/rich-content/pull/487) update draftjs 0.11 => 0.11.2
<hr/>

## 6.4.0 (Nov 25, 2019)
### :rocket: New Feature
- `emoji`
  - [#470](https://github.com/wix-incubator/rich-content/pull/470) plugin reworked
- `text-color`
  - [#440](https://github.com/wix-incubator/rich-content/pull/440) text highlight plugin
- `editor`
  - [#462](https://github.com/wix-incubator/rich-content/pull/462) custom icons for all toolbar buttons
  - [#475](https://github.com/wix-incubator/rich-content/pull/475) plugin toolbar alignment
- `button`
  - [#472](https://github.com/wix-incubator/rich-content/pull/472) plugin improved
### :bug: Bug Fix
- `video`
  - [#480](https://github.com/wix-incubator/rich-content/pull/480) video file selection
- `gallery`
  - [#481](https://github.com/wix-incubator/rich-content/pull/481) fixed layout transition behavior
- `giphy`
  - [#485](https://github.com/wix-incubator/rich-content/pull/485) giphy-viewer: `data.config.sizes` fallbacks to empty object
<hr/>

## 6.3.0 (Nov 20, 2019)
### :rocket: New Feature
- `general`
  - [#477](https://github.com/wix-incubator/rich-content/pull/477) `uiSettings.disableRightClick` enables right click protection for gallery, video and image plugins
- `editor`
  - [#473](https://github.com/wix-incubator/rich-content/pull/473) enable consumers to set plugin defaults
- `image`
  - [#476](https://github.com/wix-incubator/rich-content/pull/476) `config.onImageEditorOpen` is invoked when media studio is launched
- `giphy`
  - [#474](https://github.com/wix-incubator/rich-content/pull/474) mp4 gifs and lower res gifs support
### :bug: Bug Fix
- `imageEditor`
  - [#482](https://github.com/wix-incubator/rich-content/pull/482) fix imageEditor doesn't load when requireJS is present
- `preview`
  - [#479](https://github.com/wix-incubator/rich-content/pull/479) seeFullPost default style fixed
- `gallery`
  - [#469](https://github.com/wix-incubator/rich-content/pull/469) styles reference
- `fullscreen`
  - [#465](https://github.com/wix-incubator/rich-content/pull/465) getImagesData was not working correctly
- `video`
  - [#468](https://github.com/wix-incubator/rich-content/pull/468) video file upload selection
### :house: Internal
- `gallery`
  - [#467](https://github.com/wix-incubator/rich-content/pull/467) `pro-gallery` updated to `v1.5.33`
- `draftjs`
  - reverted in next release. [#483](https://github.com/wix-incubator/rich-content/pull/483) update draftjs 0.11 => 0.11.2
- `e2e`
  - [#484](https://github.com/wix-incubator/rich-content/pull/484) fix atomic block alignment tests
<hr/>

## 6.2.0 (Nov 11, 2019)
### :boom: Breaking Change
- `locale`
  - [#435](https://github.com/wix-incubator/rich-content/pull/435) `messages_xx.json` files moved to `wix-rich-content-common`
### :rocket: New Feature
- `preview`
  - [#435](https://github.com/wix-incubator/rich-content/pull/435) package added
### :bug: Bug Fix
- `common`
  - [#458](https://github.com/wix-incubator/rich-content/pull/458) normalization: sparse entity map keys handled correctly
- `fullscreen`
  - [#457](https://github.com/wix-incubator/rich-content/pull/457) fix fullscreen
### :book: Documentation
- `preview`
  - [#435](https://github.com/wix-incubator/rich-content/pull/435) [documentation](./docs/rich-content-preview.md) added

## 6.1.0 (Nov 10, 2019)
### :rocket: New Feature
- `editor`
  - [#445](https://github.com/wix-incubator/rich-content/pull/445) initial intent for all plugins except file-upload plugins
- `mentions`
  - [#452](https://github.com/wix-incubator/rich-content/pull/452) `handleDropdownOpen`, `handleDropdownClose` and `popoverComponent` added to plugin settings
- `video`
  - [#443](https://github.com/wix-incubator/rich-content/pull/443) async url resolving support
  - [#444](https://github.com/wix-incubator/rich-content/pull/444) file upload support
  - [#449](https://github.com/wix-incubator/rich-content/pull/449) force video mime type for uploads
  - [#451](https://github.com/wix-incubator/rich-content/pull/451) uses unique file input id
- `editor`
  - [#453](https://github.com/wix-incubator/rich-content/pull/453) added drag and drop capability to plugins
- `html`
  - [#460](https://github.com/wix-incubator/rich-content/pull/460) adsense support
### :bug: Bug Fix
- `common`
  - [#454](https://github.com/wix-incubator/rich-content/pull/454) link panel not loading link data after page refresh
- `divider`
  - [#438](https://github.com/wix-incubator/rich-content/pull/438) container alignment
- `viewer`
  - [#442](https://github.com/wix-incubator/rich-content/pull/442) html plugin alignment
- `gallery`
  - [#455](https://github.com/wix-incubator/rich-content/pull/455) gallery image titles appears
- editor
  - [#448](https://github.com/wix-incubator/rich-content/pull/448) placeholder style fixed
### :house: Internal
- `gallery`
  - [#446](https://github.com/wix-incubator/rich-content/pull/446) `pro-gallery` updated to `v1.5.25`
- `e2e`
  - [#447](https://github.com/wix-incubator/rich-content/pull/447) added more supported browsers
- `resize`
  - [#450](https://github.com/wix-incubator/rich-content/pull/450) moved width from data into data.config
- `babel`
  - [#454](https://github.com/wix-incubator/rich-content/pull/454) add optional chaining support
<hr/>

## 6.0.0 "MOAV" (Oct 30, 2019)
### :boom: Breaking Change
- `general`
  - [#347](https://github.com/wix-incubator/rich-content/pull/347) replaced `@wix/draft-js@0.10.272` with `draft-js@0.11.0`
### :rocket: New Feature
- `fullscreen`
  - [#389](https://github.com/wix-incubator/rich-content/pull/389) fullscreen for gallery and images :)
- `gallery`
  - [#391](https://github.com/wix-incubator/rich-content/pull/391) gallery image titles
- `mentions`
  - [#402](https://github.com/wix-incubator/rich-content/pull/402) mentions suggestion box size controll
- `editor`
  - [#396](https://github.com/wix-incubator/rich-content/pull/396) sticky static toolbar on all platforms
  - [#445](https://github.com/wix-incubator/rich-content/pull/445) initial intent for all plugins except file-upload plugins
### :bug: Bug Fix
- `common`
  - [#436](https://github.com/wix-incubator/rich-content/pull/436) data-normalization: missing entity protection added
  - [#411](https://github.com/wix-incubator/rich-content/pull/411) base toolbar height calculated once
  - [#432](https://github.com/wix-incubator/rich-content/pull/432) fixed divider sizer when aligned
- `editor`
  - [#392](https://github.com/wix-incubator/rich-content/pull/392) text inline toolbar tooltips
  - [#421](https://github.com/wix-incubator/rich-content/pull/421) resize-decorator is not activated on mobile
  - [#400](https://github.com/wix-incubator/rich-content/pull/400) inline and mobile toolbar RTL support
  - [#407](https://github.com/wix-incubator/rich-content/pull/407) list indentation
  - [#427](https://github.com/wix-incubator/rich-content/pull/427) focus race condition
  - [#434](https://github.com/wix-incubator/rich-content/pull/434) text dropdown buttons tooltips display
  - [#433](https://github.com/wix-incubator/rich-content/pull/433) side toolbar is positioned to the right in RTL
- `divider`
  - [#406](https://github.com/wix-incubator/rich-content/pull/406) center alignment
- `image`
  - [75336e34](https://github.com/wix-incubator/rich-content/commit/75336e34) open imageStudio on crop tab
  - [#413](https://github.com/wix-incubator/rich-content/pull/413) new image doesn't replace existing image
  - [#428](https://github.com/wix-incubator/rich-content/pull/428) image settings works while uploading
  - [#423](https://github.com/wix-incubator/rich-content/pull/423) images are rendered in high resolution for seo
- `gallery`
  - [#404](https://github.com/wix-incubator/rich-content/pull/404) delete last remaining image in image settings returns to gallery settings
  - [#403](https://github.com/wix-incubator/rich-content/pull/403) re-render gallery on change only
- `example`
  - [#430](https://github.com/wix-incubator/rich-content/pull/430) editor + viewer: gallery config field `scrollingElement` value is a function
### :house: Internal
- `common`
  - [#441](https://github.com/wix-incubator/rich-content/pull/441) export `replaceWithEmptyBlock`, `deleteBlock` and `updateEntityData`
- `e2e`
  - [#393](https://github.com/wix-incubator/rich-content/pull/393) added atomic block alignment testing
  - [#394](https://github.com/wix-incubator/rich-content/pull/394) test-env changed to match main example
  - [#409](https://github.com/wix-incubator/rich-content/pull/409) added plugin tests
  - [#405](https://github.com/wix-incubator/rich-content/pull/405) visual tests run on applitools
- `mentions`
  - [#387](https://github.com/wix-incubator/rich-content/pull/387) data validation schema added
<hr/>

## 5.1.15 (Hotfix - Nov 19, 2019)
### :rocket: New Feature
- `image`
  - [#476](https://github.com/wix-incubator/rich-content/pull/476) `config.onImageEditorOpen` is invoked when media studio is launched
<hr />

## 5.1.14 (Hotfix - Nov 14, 2019)
### :house: Internal
- `gallery`
  - [#467](https://github.com/wix-incubator/rich-content/pull/467) `pro-gallery` updated to `v1.5.33`
<hr />

## 5.1.13 (Hotfix - Nov 5, 2019)
### :bug: Bug Fix
- `viewer`
  - [#426](https://github.com/wix-incubator/rich-content/pull/426) rtl issues
- `file-upload`
  - [#426](https://github.com/wix-incubator/rich-content/pull/426) spinner animation

## 5.1.12 (Hotfix - Nov 4, 2019)
### :house: Internal
- `gallery`
  - [#446](https://github.com/wix-incubator/rich-content/pull/446) `pro-gallery` updated to `v1.5.25`

## 5.1.11 (Oct 28, 2019)
### :bug: Bug Fix
- `html`
  - [#439](https://github.com/wix-incubator/rich-content/pull/439) apply style on container
<hr/>

## 5.1.10 (Oct 23, 2019)
### :bug: Bug Fix
- `gallery`
  - [#408](https://github.com/wix-incubator/rich-content/pull/408) `scrollingElement` should be passed within gallery config
<hr/>


## 5.1.9 (Oct 16, 2019)
### :bug: Bug Fix
- `gallery`
  - [#416](https://github.com/wix-incubator/rich-content/pull/416) alignment issues
<hr/>

## 5.1.8 (Oct 15, 2019)
### :bug: Bug Fix
- `gallery`
  - [#414](https://github.com/wix-incubator/rich-content/pull/414) additional height issues
<hr/>


## 5.1.7 (Oct 15, 2019)
### :bug: Bug Fix
- `gallery`
  - [#412](https://github.com/wix-incubator/rich-content/pull/412) height issues
<hr/>

## 5.1.6 (Oct 10, 2019)
### :bug: Bug Fix
- `gallery`
  - [#410](https://github.com/wix-incubator/rich-content/pull/410) layout change and events handler
### :house: Internal
- `gallery`
  - [#410](https://github.com/wix-incubator/rich-content/pull/410) `pro-gallery` updated to `v1.3.21`
<hr/>

## 5.1.5 (Oct 2, 2019)
### :bug: Bug Fix
- `image`
  - [38c6c4d](https://github.com/wix-incubator/rich-content/commit/38c6c4d)  disabled above the fold
<hr/>

## 5.1.4 (Sep 26, 2019)
### :bug: Bug Fix
- `gallery`
  - [#401](https://github.com/wix-incubator/rich-content/pull/401) resize media url returns absolute url when not resizing
### :house: Internal
- `gallery`
  - [#401](https://github.com/wix-incubator/rich-content/pull/401) `pro-gallery` updated to `v1.3.17`
<hr/>

## 5.1.2 (Sep 25, 2019)
### :bug: Bug Fix
- `editor`
  - [#395](https://github.com/wix-incubator/rich-content/pull/395) removed div wrapping editor that was added in [#359](https://github.com/wix-incubator/rich-content/pull/359)
- `gallery`
  - [d0986f3](https://github.com/wix-incubator/rich-content/commit/d0986f3) height issues - disabled above the fold
### :house: Internal
- `example`
  - [9add0fbc](https://github.com/wix-incubator/rich-content/commit/9add0fbc) gallery validation schema used for content validation
<hr/>

## 5.1.1 (Sep 22, 2019)
### :rocket: New Feature
- `image`
  - [#388](https://github.com/wix-incubator/rich-content/pull/388) changed default image alignment
### :bug: Bug Fix
- `viewer`
  - [#390](https://github.com/wix-incubator/rich-content/pull/390) justified text new lines disappear
### :house: Internal
- `e2e`
  - [#368](https://github.com/wix-incubator/rich-content/pull/368) test rtl support in toolbars, text and external modals
<hr/>

## 5.1.0 (Sep 16, 2019)
### :rocket: New Feature
- `html`
  - [#379](https://github.com/wix-incubator/rich-content/pull/379) edit panel opens on click when src is blank
- `image`
  - [#377](https://github.com/wix-incubator/rich-content/pull/377) custom resizing implemented
  - [#380](https://github.com/wix-incubator/rich-content/pull/380) Image Editor (Wix Image Studio)
### :bug: Bug Fix
- `html`
  - [#385](https://github.com/wix-incubator/rich-content/pull/385) edit panel resets to default state when focusing on different instances of the same plugin
- `viewer`
  - [#386](https://github.com/wix-incubator/rich-content/pull/386) code block duplication
### :house: Internal
- `editor`
  - [#377](https://github.com/wix-incubator/rich-content/pull/377) resize decoration added (based on `draftjs-resizeable-plugin`)
<hr/>

## 5.0.1 (Sep 10, 2019)
### :rocket: New Feature
- `editor`
  - [#378](https://github.com/wix-incubator/rich-content/pull/378) plus icon is displayed next to text
### :bug: Bug Fix
- `general`
  - [#381](https://github.com/wix-incubator/rich-content/pull/381) atomic block alignment functionality restored
- `example`
  - [84b10276](https://github.com/wix-incubator/rich-content/commit/84b10276) static toolbar styles
### :house: Internal
- `general`
  - [d100a69d](https://github.com/wix-incubator/rich-content/commit/d100a69d) rollup version fixed due to breaking changes
  - [#384](https://github.com/wix-incubator/rich-content/pull/384) upload e2e snapshots in ci
<hr/>

## 5.0.0 "Mamtak" (Sep 2, 2019)
### :boom: Breaking Change
- `editor`
  - [#359](https://github.com/wix-incubator/rich-content/pull/359) added support for rtl in editor
    - added postcss-rtl to our build process
    - updated inline/text static/mobile toolbar theme classes
### :rocket: New Feature
- `editor`
  - [#359](https://github.com/wix-incubator/rich-content/pull/359) added support for rtl in editor modals
- `general`
  - [#358](https://github.com/wix-incubator/rich-content/pull/358) viewport based lazy loading for plugin components
### :bug: Bug Fix
- `editor`
  - [#374](https://github.com/wix-incubator/rich-content/pull/374) removing line adjacent to atomic block removes line and not block
- `example`
  - [32580b58](https://github.com/wix-incubator/rich-content/commit/32580b58) webpack: SCSS plugin rule exclude fixed
- `image`
  - [#375](https://github.com/wix-incubator/rich-content/pull/375) image plugin doesn't render default or empty caption
### :house: Internal
- `general`
  - [#365](https://github.com/wix-incubator/rich-content/pull/365) moved packages into web directory
  - [#372](https://github.com/wix-incubator/rich-content/pull/372) github actions
- `e2e`
  - [4bb51408](https://github.com/wix-incubator/rich-content/commit/4bb51408) hide toolbar before snapshot comparison
  - [#373](https://github.com/wix-incubator/rich-content/pull/373) fix flaky test
- `gallery`
  - [#376](https://github.com/wix-incubator/rich-content/pull/376) migrated from `rich-content-plugins-wix` and updated to latest `pro-gallery`
<hr/>

## 4.0.18 (Aug 27, 2019)
### :bug: Bug Fix
- `html`
  - [#371](https://github.com/wix-incubator/rich-content/pull/371) flaky sendHeight from html
<hr/>

## 4.0.17 (Aug 26, 2019)
### :bug: Bug Fix
- `html`
  - [#370](https://github.com/wix-incubator/rich-content/pull/370) flaky sendHeight from html
<hr/>

## 4.0.16 (Aug 26, 2019)
### :bug: Bug Fix
- `html`
  - [#369](https://github.com/wix-incubator/rich-content/pull/369) instagram height bug on ios
<hr/>

## 4.0.14 (Aug 19, 2019)
### :bug: Bug Fix
- `editor`
  - [#357](https://github.com/wix-incubator/rich-content/pull/357) fix footerToolbar css
- `html`
  - [#364](https://github.com/wix-incubator/rich-content/pull/364) fix html embed height
- `general`
  - [#361](https://github.com/wix-incubator/rich-content/pull/361) icons: hard-coded `fill` values replaced by `currentColor` to support theming
- `giphy`
  - [fa229a0a](https://github.com/wix-incubator/rich-content/commit/fa229a0a) giphy viewer exposes GIPHY_TYPE
  - [#363](https://github.com/wix-incubator/rich-content/pull/363) giphy plugin popup positioned correctly in RTL
### :house: Internal
- `general`
  - [#356](https://github.com/wix-incubator/rich-content/pull/356) removed `WixUtils.isMobile`
  - [#356](https://github.com/wix-incubator/rich-content/pull/356) renamed `WixUtils` to `isiOS` and deleted everything except for isiOS
  - [#360](https://github.com/wix-incubator/rich-content/pull/360)  `editorBounds` pusub subscription replaced by `getEditorBounds` function passed via the context and params for plugin initialization
<hr/>

## 4.0.12 (Aug 7, 2019)
### :rocket: New Feature
- `viewer`
  - [#351](https://github.com/wix-incubator/rich-content/pull/351) `disable` prop allows pausing media
### :bug: Bug Fix
- `editor`
  - [#353](https://github.com/wix-incubator/rich-content/pull/353) fix line spacing in lists
- `mentions`
  - [#354](https://github.com/wix-incubator/rich-content/pull/354) fix Google 'Touch to Search' trigger when clicking on mention
### :house: Internal
- `tests`
    [#334](https://github.com/wix-incubator/rich-content/pull/334) add Cypress
- `example`
  - [#350](https://github.com/wix-incubator/rich-content/pull/350) ability to change locale
<hr/>

## 4.0.11 (Jul 31, 2019)
### :bug: Bug Fix
- `file-upload`
  - [#345](https://github.com/wix-incubator/rich-content/pull/345) handle empty file name
- `editor`
  - [#349](https://github.com/wix-incubator/rich-content/pull/349) Add rtlcss ignore directives
- `html`
  - [c2b2101d](https://github.com/wix-incubator/rich-content/commit/c2b2101d) fix height on iphone
<hr/>

## 4.0.10 (Jul 29, 2019)
### :bug: Bug Fix
- `image`
  - [#342](https://github.com/wix-incubator/rich-content/pull/342) in editor image is not show when helpers are provided
- `viewer`
  - [139f023](https://github.com/wix-incubator/rich-content/commit/139f023) atomic blocks are no longer rendered in `<p>` tags
- `file-upload`
  - [#343](https://github.com/wix-incubator/rich-content/pull/343) improve name function
### :house: Internal
- `general`
  - [#344](https://github.com/wix-incubator/rich-content/pull/344) import destructed members from `lodash`
<hr/>

## 4.0.9 (Jul 25, 2019)
### :bug: Bug Fix
- `html`
  - [#341](https://github.com/wix-incubator/rich-content/pull/341) fix ssr
- `image`
  - [#341](https://github.com/wix-incubator/rich-content/pull/341) fix ssr
<hr/>

## 4.0.8 (Jul 24, 2019)
### :bug: Bug Fix
- `html`
  - [#338](https://github.com/wix-incubator/rich-content/pull/338) fix performance.now() breaks ssr
- `file-upload`
  - [#340](https://github.com/wix-incubator/rich-content/pull/340) unique ids for icons
<hr/>

## 4.0.7 (Jul 24, 2019)
### :boom: Breaking Change
- `file-upload`
  - [#335](https://github.com/wix-incubator/rich-content/pull/335) visual update, styling and class name changes
### :bug: Bug Fix
- `file-upload`
  - [aa3a4c6d](https://github.com/wix-incubator/rich-content/commit/aa3a4c6d) redundant container removed (in the Viewer)
### :house: Internal
- `general`
  - [#319](https://github.com/wix-incubator/rich-content/pull/319) lock dependencies
  - [15de167](https://github.com/wix-incubator/rich-content/commit/15de167) upgrade to node 12
  - [#337](https://github.com/wix-incubator/rich-content/pull/337) upgrade to eslint 6
<hr/>

## 4.0.6 (Jul 15, 2019)
### :rocket: New Feature
- `common`
  - [#333](https://github.com/wix-incubator/rich-content/pull/333) `color-picker` layout now rendered by a component consumer via the `children` prop
- `file-upload`
  - [#332](https://github.com/wix-incubator/rich-content/pull/332) a11y: download triggered on Enter key
### :bug: Bug Fix
- `common`
  - [bbfc9038](https://github.com/wix-incubator/rich-content/commit/bbfc9038) `Context`: default value provided
- `editor`
  - [45968d56](https://github.com/wix-incubator/rich-content/commit/45968d56) static toolbar displays tooltips
- `map`
  - [4c4fc344](https://github.com/wix-incubator/rich-content/commit/4c4fc344) search icon fixed
### :house: Internal
- `text-color`
  - [#333](https://github.com/wix-incubator/rich-content/pull/333) `color-picker` layout rendered by a `text-color-panel`
- `general`
  - [e791fc1b](https://github.com/wix-incubator/rich-content/commit/e791fc1b) isMobile prop passed to internal plugin modals
<hr/>

## 4.0.5 (Jul 10, 2019)
### :bug: Bug Fix
- `editor`
  - [#331](https://github.com/wix-incubator/rich-content/pull/331) bad import of current version from common
  - [#331](https://github.com/wix-incubator/rich-content/pull/331) import only package.json version rather the whole package.json

## 4.0.3 (Jul 10, 2019)
### :rocket: New Feature
- `editor`
  - [b5f9a6e2](https://github.com/wix-incubator/rich-content/commit/b5f9a6e2) split editorStateConversion to a separate entry in editor/dist/lib
### :bug: Bug Fix
- `common`
  - [#328](https://github.com/wix-incubator/rich-content/pull/328) plugin + text inline toolbars positioning is direction-agnostic
- `file-upload`
  - [#327](https://github.com/wix-incubator/rich-content/pull/327) shows spinner while file URL is being resolved
- `viewer`
  - [ebca5ef8](https://github.com/wix-incubator/rich-content/commit/ebca5ef8) RTL alignment and class are applied only if textDirection equals 'rtl'
  - [e727e8e6](https://github.com/wix-incubator/rich-content/commit/e727e8e6) fix css for overflow-wrap: break-word
- `text-color`
  - [5cfbd247](https://github.com/wix-incubator/rich-content/commit/5cfbd247) viewer module build definition added
- `html`
  - [#329](https://github.com/wix-incubator/rich-content/pull/329) fix embed height on mobile
### :house: Internal
- `examples`
  - [1286b6e8](https://github.com/wix-incubator/rich-content/commit/1286b6e8) `text-color` plugin added to `examples/viewer-ssr`
- `rollup`
  - [9b31c8e4](https://github.com/wix-incubator/rich-content/commit/9b31c8e4) Every file in src/lib will evaluate to an entry in dist/lib/

## 4.0.2 (Jul 2, 2019)
### :rocket: New Feature
- `file-upload`
  - [#325](https://github.com/wix-incubator/rich-content/pull/325) added ability to resolve file url on demand, to handle private file downloading
<hr/>

## 4.0.0 "Lynn" (Jul 1, 2019)
### :boom: Breaking Change
- `hashtag`
  - [80d4880](https://github.com/wix-incubator/rich-content/commit/80d4880) replaced ~~`HashTagStrategy`~~ with `HashTagDecorator` please check [`ViewerPlugins.jsx`](https://github.com/wix-incubator/rich-content/blob/develop/examples/main/src/viewer/ViewerPlugins.jsx) for an example of how to implement the new decorator.
- `general`
  - [#313](https://github.com/wix-incubator/rich-content/pull/313) add versioning to the ContentState. Allows the removing linkify decorator.
- `hashtag`
  - [80d4880](https://github.com/wix-incubator/rich-content/commit/80d4880) replaced ~~`HashTagStrategy`~~ with `HashTagDecorator` please check [`ViewerPlugins.jsx`](https://github.com/wix-incubator/rich-content/blob/develop/examples/main/src/viewer/ViewerPlugins.jsx) for an example of how to implement the new decorator.
- `link`
  - [#315](https://github.com/wix-incubator/rich-content/pull/315) remove autolink config option (was never functional)
### :rocket: New Feature
- `link`
  - [#311](https://github.com/wix-incubator/rich-content/pull/311) link underline style is removable
### :bug: Bug Fix
- `common`
  - [2566224a](https://github.com/wix-incubator/rich-content/commit/2566224a) color-picker button style fixed
- `text-color`
  - [#311](https://github.com/wix-incubator/rich-content/pull/311) color applied to link underline decoration correctly
### :house: Internal
- `common`
  - [#311](https://github.com/wix-incubator/rich-content/pull/311) versioning utils added: `getCurrent`, `compare`, `evaluate`
  - [#311](https://github.com/wix-incubator/rich-content/pull/311) `normalizeInitialState` refactored; now considers versions; adds the underline style to links with version < 3.4.7
- `viewer`
  - [b7177a60](https://github.com/wix-incubator/rich-content/commit/b7177a60) text-utils refactoring
- `example`
  - [#314](https://github.com/wix-incubator/rich-content/pull/314) content state data validation improved
  - [ef6b7d14](https://github.com/wix-incubator/rich-content/commit/ef6b7d14) `viewer-ssr` example: hashtag config updated
- `link`
  - [#313](https://github.com/wix-incubator/rich-content/pull/313) new auto link system generates link entities. Stop using linkify decorator
<hr/>

## 3.5.4 (Jun 24, 2019)
### :bug: Bug Fix
- `video`
  - [e70e9d57](https://github.com/wix-incubator/rich-content/commit/e70e9d57) window is undefined on SSR
### :house: Internal
- `common`
  - [9e44b8ff](https://github.com/wix-incubator/rich-content/commit/9e44b8ff) SSR utils: `isWindowAvailable`, `getWindow` implemented

## 3.5.3 (Jun 10, 2019)
### :bug: Bug Fix
- `video`
  - [#317](https://github.com/wix-incubator/rich-content/pull/317) fix vimeo loading when requirejs is used in the site
- `viewer`
  - [#318](https://github.com/wix-incubator/rich-content/pull/318) children only from inline components in viewer

## 3.5.1 (Jun 10, 2019)
### :rocket: New Feature
- `example`
  - [e1fb3ae](https://github.com/wix-incubator/rich-content/commit/e1fb3ae) content-state is validated
### :bug: Bug Fix
- `hashtag`
  - [8678c06e](https://github.com/wix-incubator/rich-content/commit/8678c06e) props.children converted to array
<hr/>

## 3.5.0 (June 6, 2019)
### :boom: Breaking Change
- `text-color`
  - [#310](https://github.com/wix-incubator/rich-content/pull/310) viewer-side decorator replaced by `inline-style-mapper`. See [documentation](./docs/PluginCustomization.md) for more details
### :rocket: New Feature
- `viewer`
  - [#310](https://github.com/wix-incubator/rich-content/pull/310) `inlineStyleMappers` API exposed
### :bug: Bug Fix
- `text-color`
  - [#310](https://github.com/wix-incubator/rich-content/pull/310) color applied to `link`, `hashtag` and `mention` correctly
- `mention`
  - [#310](https://github.com/wix-incubator/rich-content/pull/310) merged styles applied to `mention-viewer`
- `hashtag`
  - [#310](https://github.com/wix-incubator/rich-content/pull/310) underline-style applied to the hashtag content rather itself
### :book: Documentation
- [#310](https://github.com/wix-incubator/rich-content/pull/310) [Plugin Customization doc](./docs/PluginCustomization.md) updated regarding the `text-color` API
### :house: Internal
- `example`
  - [#309](https://github.com/wix-incubator/rich-content/pull/309) removed standalone editor and viewer examples + overhaul on main example
<hr/>

## 3.4.7 (May 29, 2019)
### :bug: Bug Fix
- `viewer`
  - [8ee5a07e](https://github.com/wix-incubator/rich-content/commit/8ee5a07e) empty headers are not removed (same behavior as in the editor)
- `general`
  - [#308](https://github.com/wix-incubator/rich-content/pull/308) remove 'rollup-plugin-image-files' and switch rollup copy plugin
- `common`
  - [98414497](https://github.com/wix-incubator/rich-content/commit/98414497) CustomColorPicker: text input is editable
- `example`
  - [68978aff](https://github.com/wix-incubator/rich-content/commit/68978aff) make css load at top so that `theme` is preferred over it
<hr/>


## 3.4.6 (May 20, 2019)
### :bug: Bug Fix
- `line-spacing`
  - [d91d53b](https://github.com/wix-incubator/rich-content/commit/d91d53b) line-spacing should work now ;)
<hr/>

## 3.4.5 (May 20, 2019)
### :bug: Bug Fix
- `text-color`
  - [ca95d453](https://github.com/wix-incubator/rich-content/commit/ca95d453) selection state and text are preserved on panel closing
<hr/>

## 3.4.4 (May 20, 2019)
### :bug: Bug Fix
- `text-color`
  - [55e7609f](https://github.com/wix-incubator/rich-content/commit/55e7609f) `getSelectionStyles` now returns correct style list for multiple block selection
<hr/>

## 3.4.3 (May 20, 2019)
### :bug: Bug Fix
- `line-spacing`
  - [6e75d9b](https://github.com/wix-incubator/rich-content/commit/6e75d9bad9e604aaf72c59dd89c43a5579e53af9) fix import
- `text-color`
  - [6de0cbc](https://github.com/wix-incubator/rich-content/commit/6de0cbcc5dbd83ccf844982e479307b2d4e1423a) selection state is preserved on panel opening
<hr/>

## 3.4.2 (May 16, 2019)
### :bug: Bug Fix
- `editor`
  - [#304](https://github.com/wix-incubator/rich-content/pull/304) fix list items theme
<hr/>

## 3.4.1 (May 15, 2019)
### :bug: Bug Fix
- `common`
  - [6f787ae](https://github.com/wix-incubator/rich-content/commit/6f787ae05c42e3ca1897d328a989a758b03674dd) `InlineToolbarButton` `forwardRef` propType changed to support Node
<hr/>

## 3.4.0 (May 14, 2019)
### :rocket: New Feature
- `line-spacing`
  - [#282](https://github.com/wix-incubator/rich-content/pull/282) new plugin added
- `common`
  - [#294](https://github.com/wix-incubator/rich-content/pull/294) ColorPicker now accepts `onCustomPickerToggle`, `onCustomColorPicked` props for higher customability
  - [#301](https://github.com/wix-incubator/rich-content/pull/301) ColorPicker now accepts `schemeColor`, `schemeAttributes` props for scheme color support
- `text-color`
  - [#294](https://github.com/wix-incubator/rich-content/pull/294) plugin config now accepts `onCustomPickerToggle`, `onCustomColorPicked` handlers
  - [#301](https://github.com/wix-incubator/rich-content/pull/301) plugin config now accepts `colorScheme` mapping instead of `getPaletteColors` and converter functions
### :bug: Bug Fix
- `text-color`
  - [#301](https://github.com/wix-incubator/rich-content/pull/301) viewer decorator does not override other inline styles
  - [#300](https://github.com/wix-incubator/rich-content/pull/300) missing `getPaletteColors` won't crash
  - [#300](https://github.com/wix-incubator/rich-content/pull/300) pop-up is opened as internal modal rather external one
  - [#300](https://github.com/wix-incubator/rich-content/pull/300) pop-up is themable
- `common`
  - [86b94cc](https://github.com/wix-incubator/rich-content/commit/86b94cc19fac3fe6d04fe348735de7538992b1ac)&nbsp;&nbsp;`<Loader />`&nbsp;&nbsp;component supports getting theme from context or props (external modals)
- `editor`
  - [#297](https://github.com/wix-incubator/rich-content/pull/297) support rtl in lists
- `link`
  - [#302](https://github.com/wix-incubator/rich-content/pull/302) apply theme in link panel
### :book: Documentation
- [Plugin Customization](./docs/PluginCustomization.md) doc updated
### :house: Internal
- `toolbars`
  - [#296](https://github.com/wix-incubator/rich-content/pull/296) improve performance by eliminating a lot of unnecessary work that was done on the toolbars for every keystroke.
- `examples`
  - [#298](https://github.com/wix-incubator/rich-content/pull/296) hmr + error handling for viewer
<hr/>

## 3.3.3 (Apr 30, 2019)
### :rocket: New Feature
- `common`
  - [#295](https://github.com/wix-incubator/rich-content/pull/295) insert plugin button with `custom-block` type supported [allows to run custom add-block handler]
- `code-block`
  - [#295](https://github.com/wix-incubator/rich-content/pull/295) insert-buttons added
- `text-color`
  - [#290](https://github.com/wix-incubator/rich-content/pull/290) customization API exposed (defining and handling custom inline styles)
### :bug: Bug Fix
- `video`
  - [#293](https://github.com/wix-incubator/rich-content/pull/293) fix ratio
### :book: Documentation
- [#290](https://github.com/wix-incubator/rich-content/pull/290) [Plugin Customization doc]('./docs/PluginCustomization.md') update on `text-color`
<hr/>

## 3.3.2 (Apr 29, 2019)
### :bug: Bug Fix
- `general`
  - [a720dd6](https://github.com/wix-incubator/rich-content/commit/a720dd604cce4fcd8b9bf9cc22d15fb6840bd8c5) merged styles are used in plugins rather default ones
- `common`
  - [0595e88](https://github.com/wix-incubator/rich-content/commit/0595e88c3da6173df9c99c6ce56baf0b3f14fb2c) focus-manager: console log removed
- `html`
  - [69ccd8d](https://github.com/wix-incubator/rich-content/commit/69ccd8d38ccf70a4e282c137208c3c366db236fe) limit body width to viewport width
- `text-color`
  - [5227d93](https://github.com/wix-incubator/rich-content/commit/5227d9370ff0106ab16f1c44077991ead28ba856) selection state handled correctly
- `viewer`
  - [cc09f6f](https://github.com/wix-incubator/rich-content/commit/cc09f6ff1b72926885d357f955c93c54be688b22) atomic class is applied to a proper element [similar to editor layout]
  - [1a3ddc0](https://github.com/wix-incubator/rich-content/commit/1a3ddc060a32f187d8029488ac24bc3adfd7e8b0) headers line spacing
<hr/>

## 3.3.1 (Apr 17, 2019)
### :bug: Bug Fix
- `link`
  - [#288](https://github.com/wix-incubator/rich-content/pull/288) `link` fix link not using theme
- `viewer`
  - [#289](https://github.com/wix-incubator/rich-content/pull/289) `atomic-block` now has proper style to comply with the `editor` style
<hr/>

## 3.3.0 (Apr 17, 2019)
### :boom: Breaking Change
- `editor`
  - [#284](https://github.com/wix-incubator/rich-content/pull/284) `getToolbarSettings` API: `pluginTextButtons` parameter now exposes `mobile` and `desktop` button lists, more details [here](./docs/ToolbarCustomization.md)
### :rocket: New Feature
- `text-color`
  - [#284](https://github.com/wix-incubator/rich-content/pull/284) new plugin added
- `editor`
  - [#284](https://github.com/wix-incubator/rich-content/pull/284) `RichContentEditor` accepts the `customStyleFn` prop, details [here](https://draftjs.org/docs/api-reference-editor.html#customstylefn)
### :bug: Bug Fix
- `common`
  - [#284](https://github.com/wix-incubator/rich-content/pull/284) `color-picker` component UI adjusted according to design
  - [#284](https://github.com/wix-incubator/rich-content/pull/284) `getModalStyles` util: `customStyles` now affect both `desktop` and `mobile` styles
  - [#284](https://github.com/wix-incubator/rich-content/pull/284) `getSelectionStyles` util now accepts `styleSelectionPredicate` function parameter
### :book: Documentation
- [#284](https://github.com/wix-incubator/rich-content/pull/284) [Toolbar Customization](./docs/ToolbarCustomization.md) doc updated
<hr/>

## 3.2.3 (Apr 14, 2019)
### :house: Internal
- `general`
  - align version with `plugin-gallery` release
  - [ac27a91](https://github.com/wix-incubator/rich-content/commit/ac27a91b427f64555ca653a37772755e21315198) CI fails if any script fails
### :bug: Bug Fix
- `gallery`
  - gallery item links fixed
<hr/>

## 3.2.2 (Apr 14, 2019)
### :house: Internal
- `general`
  - [#287](https://github.com/wix-incubator/rich-content/pull/287) support building modules on Windows
<hr/>

## 3.2.1 (Apr 9, 2019)
### :house: Internal
- `general`
  - align version with `plugin-gallery` release
<hr/>

## 3.2.0 (Apr 8, 2019)
### :rocket: New Feature
- `button`
  - [#275](https://github.com/wix-incubator/rich-content/pull/275) new button plugin
### :bug: Bug Fix
- `general`
  - [#285](https://github.com/wix-incubator/rich-content/pull/285) prevent `context` from rerendering unnecessarily
- `gallery`
  - expand mode disabled
<hr/>

## 3.1.2 (Mar 28, 2019)
### :bug: Bug Fix
- `common`
  - [#283](https://github.com/wix-incubator/rich-content/pull/283) fix image upload `updateEntity` callback
- `editor`
  - [b1e720b](https://github.com/wix-incubator/rich-content/commit/b1e720b) inline-text-toolbar: link panel on mobile is now displayed as modal neither inline panel
<hr/>


## 3.1.1 (Mar 20, 2019)
### :rocket: New Feature
- `file-upload`
  - [#281](https://github.com/wix-incubator/rich-content/pull/281) new file upload plugin
- `gallery`
  - [#28](https://github.com/wix-incubator/rich-content-plugins-wix/pull/28) `Context` is integrated into `GalleryComponent` and `GalleryViewer`
- `map`
  - [92e3d9a6](https://github.com/wix-incubator/rich-content/commit/92e3d9a6), [#280](https://github.com/wix-incubator/rich-content/pull/280) dynamic map component dimentions; settings redesigned
### :bug: Bug Fix
- `gallery`
  - thumbnails layout size calculation fixed
  - **Load More** button is never displayed
- `map`
  - [#274](https://github.com/wix-incubator/rich-content/pull/274) redundant code removed
  - [39b380df](https://github.com/wix-incubator/rich-content/commit/39b380df) removed `store` from `map-viewer`, removed Maps API key from `component-data`, missing defaults added; styles fixed; `isMobile` prop used in `map-settings`
### :house: Internal
- `common`
  - [#274](https://github.com/wix-incubator/rich-content/pull/274) `Context` component is implemented as a `React.createContext()` wrapper
  - [#281](https://github.com/wix-incubator/rich-content/pull/281) renamed `ImageLoader` to `Loader`
- `editor`
  - [#274](https://github.com/wix-incubator/rich-content/pull/274) `Context.Provider` is integrated into `RCE`
- `viewer`
  - [#274](https://github.com/wix-incubator/rich-content/pull/274) `Context.Provider` is integrated into `RCV`
- `plugins`
  - [#274](https://github.com/wix-incubator/rich-content/pull/274) every plugin's `Component` and `Viewer` components now rely on Context
- `examples/viewer`
  - [#274](https://github.com/wix-incubator/rich-content/pull/274) `giphy`, `map`, and `soundCloud` examples added
<hr/>


## 3.0.9 (Mar 14, 2019)
### :rocket: New Feature
- `common`
  - [#278](https://github.com/wix-incubator/rich-content/pull/278) color-picker component initial implementation
### :bug: Bug Fix
- `gallery`
  - **Load More** button functionality fixed
<hr/>


## 3.0.8  (Mar 12, 2019)
### :rocket: New Feature
- `image`
  - [bebba18](https://github.com/wix-incubator/rich-content/commit/bebba1806a99a6704c72b1a0770fc2e7cf74bba3) support fallback image in wix media
### :house: Internal
- `viewer`
  - [d00fc1c](https://github.com/wix-incubator/rich-content/commit/d00fc1c2042150f3b9b121332d4b30dccbc0e982) removed `@wix/draft-js` dependency
<hr/>


## 3.0.7 (Mar 11, 2019)
### :house: Internal
- `viewer`
  - [d4dcbd7](https://github.com/wix-incubator/rich-content/commit/d4dcbd76366484b0133b040656f7f3f8ad1b23e7) react-native css-module issue fix
<hr/>


## 3.0.6 (Mar 11, 2019)
### :bug: Bug Fix
- `gallery`
  - helpers.openModal call protection added
### :house: Internal
- `viewer`
  - [bc46ff2](https://github.com/wix-incubator/rich-content/commit/bc46ff207a1f2c9b456f8b6d645e0ca001e307bc) mergedStyles are passed to AtomicBlock as a prop [React Native requirement]
<hr/>


## 3.0.5 (Mar 8, 2019)
### :rocket: New Feature
- `gallery`
  - [#27](https://github.com/wix-incubator/rich-content-plugins-wix/pull/27) expand mode implemented with the following limitations:
    - theming is not supported in expand mode (no CSS modules in pro-fullscreen)
    - consumer must provide `window.dateCreated = new Date()`
    - default site styles aren't available (use `tpa-style-webpack-plugin` or add `"enhancedTpaStyle": true` to the yoshi config)
### :bug: Bug Fix
- `common`
  - [c9d954d](https://github.com/wix-incubator/rich-content/commit/c9d954d39c1d496649794c7edfe43a199a8552b5) original size image streching in mobile
<hr/>


## 3.0.4 (Mar 6, 2019)
### :bug: Bug Fix
- `common`
  - [a9789d5](https://github.com/wix-incubator/rich-content/commit/a9789d5de23b5f5952019b4408a36fb7a2bd87c8) atomic block link no longer stretches the block
  - [4689018](https://github.com/wix-incubator/rich-content/commit/46890187df52b796947a7f8c23ab05a3d4d71708) disabled atomic block alignment on mobile
### :bug: Bug Fix
- `editor`
  - [#273](https://github.com/wix-incubator/rich-content/pull/273) `StaticToolbar` renders the correct active state
- `viewer`
  - [a2d6593](https://github.com/wix-incubator/rich-content/commit/a2d659375751f81d3d0873be1da01d2c7fbe30b3) don't clean up empty blocks after headers
### :house: Internal
- `common`
  - [acea872](https://github.com/wix-incubator/rich-content/commit/acea8725aad29588b5b314e6b1a03e0a142eda99) removed `key` from `componentData`
<hr/>


## 3.0.3 (Feb 28, 2019)
### :rocket: New Feature
- `map`
  - [#260](https://github.com/wix-incubator/rich-content/pull/260) new google maps plugin
### :bug: Bug Fix
- `viewer`
  - [#272](https://github.com/wix-incubator/rich-content/pull/272) plugin link height issues and enabled theming plugin links
### :house: Internal
- `examples`
  - [#269](https://github.com/wix-incubator/rich-content/pull/269) new integrated, editor/viewer, example
    <hr/>


## 3.0.2 (Feb 26, 2019)
### :bug: Bug Fix
- `html`
  - [#266](https://github.com/wix-incubator/rich-content/pull/266) fix instagram cut off on ios
### :house: Internal
- `general`
  - [#267](https://github.com/wix-incubator/rich-content/pull/267) auto deploy examples to surge on commits to master or PRs
<hr/>


## 3.0.1 (Feb 20, 2019)
### :bug: Bug Fix
- `gallery`
  - [#26](https://github.com/wix-incubator/rich-content-plugins-wix/pull/26) only last image link saved
### :house: Internal
- `general`
  - align version with `plugin-gallery` release
<hr/>


## 3.0.0 (Feb 19, 2019)
### :boom: Breaking Change
- `general`
  - [#259](https://github.com/wix-incubator/rich-content/pull/259) Minimum supported React version is now 16.4.2
### :bug: Bug Fix
- `gallery`
  - [#24](https://github.com/wix-incubator/rich-content-plugins-wix/pull/24) fix link settings bug
- `html`
  - [#261](https://github.com/wix-incubator/rich-content/pull/261) (ios) fix instagram too wide for mobile
### :house: Internal
- `general`
  - [#262](https://github.com/wix-incubator/rich-content/pull/262) update rollup-plugin-postcss
  - [#263](https://github.com/wix-incubator/rich-content/pull/263) migrate from Wix CI to Travis CI
<hr/>


## 2.0.4 (Feb 10, 2019)
### :bug: Bug Fix
- `general`
  - [#253](https://github.com/wix-incubator/rich-content/pull/253) fix statics copy in package.json
- `html`
  - [#253](https://github.com/wix-incubator/rich-content/pull/253) fix instagram too wide for mobile
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
- `gallery`
  - [#21](https://github.com/wix-incubator/rich-content-plugins-wix/pull/21) add dropdown support in link panel
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

## 1.5.8 (Dec 18, 2018)
### :house: Internal
- `gallery`
  - [61b2f2ce](https://github.com/wix-incubator/rich-content-plugins-wix/commit/61b2f2ce6fa205bf43a30deaa8659a4b5f68ada5) lock photography-client-lib version
<hr/>


## 1.5.2 (Sep 5, 2018)
~~### :rocket: New Feature~~
~~- `soundcloud`~~
~~- [#92](https://github.com/wix-incubator/rich-content/pull/92) `plugin-sound-cloud` implemented~~
### :bug: Bug Fix
- `gallery`
  - [#9](https://github.com/wix-incubator/rich-content-plugins-wix/pull/9) add theme support for `GalleryViewer` container
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
