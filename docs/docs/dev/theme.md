---
id: theming
title: Plugin Theming
sidebar_label: Plugin Theming
---

If your plugin should change appearance based on palette colors, you should dynamically define those classnames inside the `theme` function, which creates a new CSS object with the help of [JSS Library](https://cssinjs.org/?v=v10.1.1).

## Example
`Hashtag` css file:
```css
.hashtag {
  color: $accent-color;
  text-decoration: none;
}
```

`Hashtag` theme function that overrides the relevant classname:
```js
export const THEME = (colors, utils) => ({
  hashtag: {
    color: colors.actionColor,
  },
});
```

***

> Here's a [Cheat Sheet](https://pantaley.com/blog/Start-your-JSS-journey-with-the-selectors-cheat-sheet/) to get you started with the JSS Format.

***


## Arguments
|        | description |
| ------ | ------ |
| colors | contains: `actionColor`, `bgColor`, `textColor` and `secondaryColor` of a Wix Palette (colors in HEX) |
| utils | contains: `hexToRgbA(hexColor, opacity)`, `adaptForeground(hexColor)` and `isBright(hexColor)` functions. Also contains `fallbackColor` and `fallbackColorBright` fields. |

For complex CSS implementations (`:hover` / nested classnames...). You can also take example from [here](https://github.com/wix-incubator/rich-content/pull/828/files#diff-cffc486296140629f6a9c90351af6e0f), or have a look at other wrapper-ready plugins / [Cheat Sheet](https://pantaley.com/blog/Start-your-JSS-journey-with-the-selectors-cheat-sheet/).
