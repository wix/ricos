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
import { RicosEditor } from 'ricos/editor';
import { RichContentEditor } from 'ricos/editor';

import { pluginGiphy } from 'ricos/giphy/editor';
import { pluginImage } from 'ricos/image/editor';
import { pluginVideo } from 'ricos/video/editor';

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
import { RicosViewer } from 'ricos/viewer';
import { RichContentViewer} from 'ricos/viewer';

import { pluginGiphy } from 'ricos/giphy/viewer';
import { pluginImage } from 'ricos/image/viewer';
import { pluginVideo } from 'ricos/video/viewer';

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
