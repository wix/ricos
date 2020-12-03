<h1 align="center">
  <img width=200 src="logo.png"/>
</h1>


## A React based, super charged rich content editor with an extensible plugin system
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) 
![Demo](https://media.giphy.com/media/2rAwp4zLCrtGn2Tlbq/giphy.gif)

You can try it here: [https://wix-rich-content.herokuapp.com/](https://wix-rich-content.herokuapp.com/)
Or see full documentation here: [https://wix-incubator.github.io/rich-content/](https://wix-incubator.github.io/rich-content/)

## Quick start

Start from installing the package

```bash
npm i ricos-editor
```

Then add a basic rich text editor to your app. Try typing, and add some formatting to your text:

```jsx
import { RicosEditor } from 'ricos-editor';
import 'ricos-editor/dist/styles.min.css';

<RicosEditor placeholder={'Type here!'} />;
```

Now let's add some plugins:

```bash
npm i wix-rich-content-plugin-video wix-rich-content-plugin-divider
```

This is how you can add videos and dividers.

```jsx
import { RicosEditor } from 'ricos-editor';
import 'ricos-editor/dist/styles.min.css';

import { pluginVideo } from 'wix-rich-content-plugin-video';
import 'wix-rich-content-plugin-video/dist/styles.min.css';

import { pluginDivider } from 'wix-rich-content-plugin-divider';
import 'wix-rich-content-plugin-divider/dist/styles.min.css';

<RicosEditor placeholder={'Type here!'} plugins={[pluginDivider(), pluginVideo()]} />;
```

There you go! A rich content editor with plugins. 

[See full documentation](https://wix-incubator.github.io/rich-content/)

### SSR support

The compiled package also contains a CommonJS bundle, which you can consume if you are using SSR.


## Usage with [Yoshi](https://github.com/wix/yoshi)

To use the editor with Yoshi, you should do the same bootstrapping process, but make sure to include the package's `.css` files from a `.global.scss` file.  For example, create a file named `rich-content.global.scss` with the following content (make sure to import styles from any plugins you are using as well):

```scss
@import '~wix-rich-content-editor-common/dist/styles.min.css';
@import '~wix-rich-content-editor/dist/styles.min.css';
```

> This workaround is required because Yoshi re-compiles CSS files, and applies css-modules again.


## Development

### Run Locally

1. `cd rich-content`
2. `yarn` - installs all dependencies and links any cross-dependencies.
3. Build the modules by running one of the following:
   1. `npm run build` - build once and bundles
   2. `npm run watch` - rebuild on changes
4. Choose an [example](./examples/) and run:
   1. `npm start`

#### Examples

[rich-content-editor-example](./examples/main) to see how to consume the Component as:
- [editor](./examples/main/shared/editor/Editor.jsx)
- [viewer](./examples/main/shared/viewer/Viewer.jsx)


[rich-content-viewer-ssr](./examples/viewer-ssr) to see how to consume the Component as a viewer within a Yoshi-based SSR Application.

### Modules

[wix-rich-content-editor](./packages/editor) is the rich content editor React Component.

[wix-rich-content-viewer](./packages/viewer) is the rich content viewer React Component.

[wix-rich-content-editor-common](./packages/editor-common) is a shared library utilized by the rest of the modules.
