---
id: plugin_structure
title: Plugin Structure
sidebar_label: Plugin Structure
---

## Requirements
Each plugin should have 2 entry points for the Wrapper:
- `viewer.js` for the `RichContentViewer`
- `editor.js` for the `RichContentEditor`

For your own convenience: `npm run generatePlugin` creates those files for you by default.

Each entry should export a function that generates the plugin's necessities in order to work: one for the viewer, and one for the editor.

- The Editor entry object must contain:
  - `config`
  - `type`
  - `createPlugin`
- The Viewer entry must contain:
  - `config`
  - `type`

## Example
Editor entry for **Hashtag** plugin (29.03.2020):
```js
import { createHashtagPlugin } from './createHashtagPlugin';
import { HASHTAG_TYPE } from './types';
import { DEFAULTS, THEME as theme } from './defaults';

export const pluginHashtag = (config = {}) => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HASHTAG_TYPE,
    createPlugin: createHashtagPlugin,
    ModalsMap: {},
    theme,
  };
};
```
