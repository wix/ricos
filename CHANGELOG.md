# Changelog

> **Tags:**
> - :boom:       [Breaking Change]
> - :rocket:     [New Feature]
> - :bug:        [Bug Fix]
> - :house:      [Internal]

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
