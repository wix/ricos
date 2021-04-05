<div align="center">
  <img width=100 src="logo.png"/>
</div>
<h2>A React-based, supercharged rich content editor with an extensible plugin system</h2>


[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) 

<div align="center">
  <img src="ricos.gif"/>
</div>

<br />


Try out our [demo](https://wix-rich-content.herokuapp.com/). You can see the full documentation here: [https://wix.github.io/ricos/](https://wix.github.io/ricos/)

## Quick start

Start with installing the package:

```bash
npm i ricos-editor
```

Then add a basic rich text editor to your app. You can now test typing and adding formatting to your text:

```jsx
import { RicosEditor } from 'ricos-editor';
import 'ricos-editor/dist/styles.min.css';

<RicosEditor placeholder={'Type here!'} />;
```

Let's add some plugins:

```bash
npm i wix-rich-content-plugin-video wix-rich-content-plugin-divider
```

Adding videos and dividers:

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

[See full documentation](https://wix.github.io/ricos/)

### SSR support

Compiled package also contains a CommonJS bundle, which you can consume if you are using SSR.

## Using with [Yoshi](https://github.com/wix/yoshi)

To use editor with Yoshi, follow the same bootstrapping process, but make sure to include the package `.css` files from the `.global.scss` file.  For example, create a file named `rich-content.global.scss` with the following content (make sure to import styles from any plugins you are using as well):

```scss
@import '~wix-rich-content-editor-common/dist/styles.min.css';
@import '~wix-rich-content-editor/dist/styles.min.css';
```

> This workaround is required because Yoshi re-compiles CSS files and applies css-modules again.


## Development

### Prerequisites
- `protoc` - install [protoc](http://google.github.io/proto-lens/installing-protoc.html) on your local machine
### Run Locally

1. `yarn` - installs all dependencies and links any cross-dependencies.
1. `yarn build` - Build the modules
1. Run `yarn exampleApp` or `yarn storybook` to start the magic

#### Examples

See [rich-content-editor-example](./examples/main) to see how to consume the Component as:
- [editor](./examples/main/shared/editor/Editor.jsx)
- [viewer](./examples/main/shared/viewer/Viewer.jsx)

### Modules

- [wix-rich-content-editor](./packages/editor) is the rich content editor React Component.

- [wix-rich-content-viewer](./packages/viewer) is the rich content viewer React Component.

- [wix-rich-content-editor-common](./packages/editor-common) is a shared library utilized by the rest of the modules.

### Contributing

Want to help or just have ideas on how to improve Ricos? Open an issue or suggest a pull request.

### License

[MIT License](./LICENSE)
