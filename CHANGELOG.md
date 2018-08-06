# Changelog

> **Tags:**
> - :boom:       [Breaking Change]
> - :rocket:     [New Feature]
> - :bug:        [Bug Fix]
> - :house:      [Internal]

## [Unreleased]

## 1.2.10

#### :bug: Bug Fix
* `common` 
  * [#70](https://github.com/wix-incubator/rich-content/issues/70) use `button.componentData` to be consistent with `InlineButtons`
* `plugin-image`
  * update editorState as well as componentData on upload
* `plugin-gallery`
  * update editorState as well as componentData on upload
  * invoke `stateFromProps` only when a change has occured

#### :house: Internal
* `general`
  * [#82](https://github.com/wix-incubator/rich-content/pull/82) Transpile using rollup

<br />

## 1.2.9 (Aug 2, 2018)

#### :house: Internal
* `general`
  * [#75](https://github.com/wix-incubator/rich-content/pull/75) Added commonjs bundle

<br />

## 1.2.8 (Aug 2, 2018)

#### :rocket: New Feature
* `editor`
  * Decoupled mobile add button from mobile toolbar
* `plugin-code-block`
  * [#72](https://github.com/wix-incubator/rich-content/pull/72) Changed insert button position in toolbar + allow position configuration

#### :house: Internal
* `general`
  * [#71](https://github.com/wix-incubator/rich-content/pull/71) Bundled with rollup

<br />

## 1.2.7 (Jul 30, 2018)

#### :rocket: New Feature
* `plugin-code-block` added

#### :bug: Bug Fix
* `common`
  * plugin toolbar vertical position
* `plugin-link`
  * default target value now affects the links
* `plugin-image`
  * retina no longer blurry
<br />

## 1.2.6 (Jul 26, 2018)

#### :rocket: New Feature
* `editor`
  * `editorBounds` added to pubsub
  * Width is dynamic, no longer restricted to `740px`
* `plugin-divider`
  * Set width using `%` instead of `px`

#### :bug: Bug Fix
* `editor`
  * [#61](https://github.com/wix-incubator/rich-content/pull/61) aligned `AddPluginModal` with new data structure
  * Typo in `StaticToolbar` theme merging
* `common`
  * `BaseToolbar` uses `Measure` in order to be responsive
* `plugin-emoji`
  * Fixed responsive toolbar trigerring

#### :house: Internal
* `plugin-gallery`
  * Locked `pro-gallery-renderer` and `image-client-api` versions

<br />

## 1.2.5 (Jul 23, 2018)

#### :boom: Breaking Change
* `editor`
  * [#58](https://github.com/wix-incubator/rich-content/pull/58) Default `locale` is `'en'`, English texts are imported statically
  Set the `locale` and `localeResource` props to use another language
