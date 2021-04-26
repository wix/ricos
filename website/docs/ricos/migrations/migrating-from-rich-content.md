---
id: migrating-from-rich-content
title: Migrating from rich-content
sidebar_label: RichContent -> Ricos
---

This section is intended for users of the legacy RichContentEditor & RichContentViewer API.

## Motivation

The motivation behind this project is to provide a better user experience for `rich-content` consumers.

The core idea is to wrap the `RichContentEditor`/`RichContentViewer` with a "transparent" wrapper which would provide convenient default configuration to its child component, while maintaining it fully backwards-compatible for existing applications. The three main goals are:

- simpler API and configuration
- less breaking changes
- reduced amount of code duplication between consumers via providing a default implementation

## Getting started

### Existing consumers

Existing consumers can gradually integrate Ricos into their code. The Ricos wrapper provides a configuration to its children based on its own properties. Any props that are passed directly to the child override the wrapper's ones.

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

[API Reference Here](../ricos-api)
