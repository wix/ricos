---
id: migrating-from-rich-content
title: Migrating from rich-content
sidebar_label: RichContent -> Ricos
---

This section is intended for users of the legacy RichContentEditor & RichContentViewer API.

## Motivation

The motivation behind this project is to provide a better user experience for `rich-content` consumers.

The core idea is to wrap the `RichContentEditor`/`RichContentViewer` with a "transparent" wrapper which provides convenient default configuration to its child component, while keeping full backward compatibility for existing applications. The three main goals are:

- simpler API and configuration
- less breaking changes
- reduced amount of code duplication among the consumers by providing a default implementation

## Getting started

### Existing consumers

Existing consumers can gradually integrate `Ricos` into their code. The `Ricos` wrapper provides a configuration to its child based on its own props. Any props that are passed directly to the child override the wrapper's ones.

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
        content={initialState}
        theme={{ palette: site_palette }}
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

import { pluginGiphy } from 'wix-rich-content-plugin-giphy/viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/viewer';

...

class App extends Component {

  render() {
  ...
    return (
      <RicosViewer
        content={initialState}
        locale={'he'}
        plugins={[pluginVideo(), pluginImage(), pluginGiphy()]}
        isMobile={mobile}
      >
        <RichContentViewer />
      </RicosViewer>
    );
  }
}
```

## Why `Ricos` is good for you?

### Core features

#### Themes and site palette wiring

TBD

#### Plugin configuration

TBD

#### RCE: Mobile/Static toolbar handling

By default, the mobile toolbar is rendered internally if the `isMobile` prop is truthy. If `textToolbarType` is 'static', the static text toolbar is rendered internally. Both mobile and and static toolbars are rendered above the RCE, unless `toolbarContainerElement` prop is passed.

#### Modals and Fullscreen

##### RCV

Expand for image and gallery is handled internally by default. If `onExpand` config supply for image and gallery plugins will override this behavior.

##### RCE

If the `helpers.openModal`/`helpers.closeModal` are undefined, the modal dialogs are handled internally.

#### RCE: `editorState` handling and `onChange` callback

The `RicosEditor` handles `onChange` internally, and provides the `editorState` to the RCE. This can be overridden by passing `onChange` and `editorState` directly to the RCE.

#### Translations and locale resource loading

For any locale, the appropriate translation resource is loaded internally when provided with the `locale` prop.

#### Types

It has Typescript support!

[API Reference Here](../ricos-api)
