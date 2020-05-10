---
id: migrating-from-rich-content
title: Migrating from rich-content
sidebar_label: Migrating from rich-content
---

## Motivation

The motivation behind this project is to provide a better user experience for the consumers of the `rich-content`.

The core idea is to wrap the `RichContentEditor`/`RichContentViewer` with a "transparent" wrapper which provides convenient default configuration to its child component, while keeping the full backward compatibility for existing applications. The three main goals are:

- simpler API and configuration
- less breaking changes
- reduced amount of code duplication among the consumers by providing a default implementation

## Getting started

### Existing consumers

The existing consumers can gradually integrate the `Ricos` to their code. The `Ricos` wrapper provides configuration to its child based on its own props. The props which are passed directly to the child override the wrapper's ones.

### Examples

#### Wrapping the RCE with Ricos

```jsx
import { RicosEditor } from 'ricos-editor';
import { RichContentEditor } from 'wix-rich-content-editor';

import { pluginGiphy } from 'wix-rich-content-plugin-giphy';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginVideo } from 'wix-rich-content-plugin-video';

...

class App extends Component {

  render() {
  ...
    return (
      <RicosEditor
        initialState={initialState}
        theme={'Palette'}
        palette={site_palette}
        locale={'he'}
        plugins={[pluginVideo(), pluginImage(), pluginGiphy({ giphySdkApiKey: 'secret_key' })]}
        isMobile={mobile}
      >
        <RichContentEditor placeholder={'Type here!'} />
      </RicosEditor>
    );
  }
}
```

### Wrapping the RCV

```jsx
import { RicosViewer } from 'ricos-viewer';
import { RichContentViewer} from 'wix-rich-content-viewer';

import { pluginGiphy } from 'wix-rich-content-plugin-giphy/dist/module.viewer.cjs';
import { pluginImage } from 'wix-rich-content-plugin-image/dist/module.viewer.cjs';
import { pluginVideo } from 'wix-rich-content-plugin-video/dist/module.viewer.cjs';

...

class App extends Component {

  render() {
  ...
    return (
      <RicosViewer
        initialState={initialState}
        locale={'he'}
        plugins={[pluginVideo(), pluginImage(), pluginGiphy()]}
        isMobile={mobile}
      />
        <RichContentViewer />
      </RicosViewer>
    );
  }
}
```

## Why the `Ricos` is good for you?

### Core features

#### Themes and site palette wiring

TBD

#### Plugin configuration

TBD

#### RCE: Mobile/Static toolbar handling

By default, mobile toolbar is rendered internally if `isMobile` prop is truthy. If `textToolbarType` is 'static', the static text toolbar is rendered internally. Both mobile and and static toolbars are rendered above the RCE, unless `toolbarContainerElement` prop is passed.

#### Modals and Fullscreen

##### RCV

If the `helpers.onExpand` is undefined, the expand mode is handled internally.

##### RCE

If the `helpers.openModal`/`helpers.closeModal` are undefined, the modal dialogs are handled internally.

#### RCE: `editorState` handling and `onChange` callback

The `RicosEditor` handles `onChange` internally, and provides the `editorState` to the RCE. This can be overridden by passing `onChange` and `editorState` directly to the RCE.

#### Translations and locale resource loading

The appropriate translation resource is loaded internally when provided `locale` differs from `en`.

#### Types

It's Typescript!

[API Reference Here](./ricos_api)
