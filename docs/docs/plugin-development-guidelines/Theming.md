---
id: theming
title: Theming Guidelines
sidebar_label: Theming Guidelines
---

## Motivation

The `wix-rich-content` project is designed with theming capability in mind. That is, every single UI element appearance can be easily modified by a consumer from outside, by passing the `theme` prop to the `RichContentEditor` or `RichContentViewer`.

## Theme vs Default Styles

In order to achieve that customability level, every single UI component has a *default style* (usually implemented in a dedicated SCSS file), and also accepts *`theme` prop*. The theme is expected to be an object that maps the CSS module names to the actual CSS class names.

The default styles and theme styles are merged, and the merged result is used for component styling. The [mergeStyles](https://github.com/wix-incubator/rich-content/blob/master/packages/common/web/src/Utils/mergeStyles.js) utility can be used for such merging.

For example, the [DividerComponent](https://github.com/wix-incubator/rich-content/blob/master/packages/plugin-divider/web/src/components/divider-component.jsx) imports default `styles` from [divider-viewer.rtlignore.scss](https://github.com/wix-incubator/rich-content/blob/master/packages/plugin-divider/web/statics/styles/divider-viewer.rtlignore.scss). This `styles` CSS module exposes `.divider`, `.divider-container`, etc class names. In addition, the `DividerComponent` has the `theme` prop. Both default `styles` and `theme` are passed to the `mergeStyles` utility, and the result is used for styling. The merging allows to override the default styles: if the `theme` contains the `divider-container` key, then the merged style will get its value; otherwise, it will get the default style value.

The example theme definition can be found in the [editor example](https://github.com/wix-incubator/rich-content/tree/master/examples/editor/src/theme).

## Theming Drawbacks

In order to support plugin theming, the following conditions should be met:

- every styled UI component should accept `theme` prop
- every UI component should be styled with merged styles resulted by `mergeStyles` utility
- the default plugin styles should be implemented in dedicated SCSS files
- all the styling should be implemented with *class selectors* only (avoid HTML element selectors, nth-child, etc)
- all the SCSS files should have *flat structure* (avoid nesting)
- all the SCSS class names should be *globally unique* to avoid name collisions in theme mapping. The current class naming convention is `[component_name]_[style_name]`, e.g. `.video_player`, `.video_container`, `.video_overlay`
