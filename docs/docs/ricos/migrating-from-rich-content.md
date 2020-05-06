---
id: migrating-from-rich-content
title: Migrating from open-source rich-content
sidebar_label: Migrating from OS rich-content
---

## Motivation

The motivation behind this project is to provide a better user experience for the Wix consumers of the `rich-content`.

The core idea is to wrap the `RichContentEditor`/`RichContentViewer` with a "transparent" wrapper which provides convenient default configuration to its child component, while keeping the full backward compatibility for existing applications. The three main goals are:

- simpler API and configuration
- less breaking changes
- reduced amount of code duplication among the consumers (e.g. media upload, oembed query, etc) by providing a default implementation

## Getting started

### Existing consumers

The existing consumers can gradually integrate the `WixRichContent` to their code. The `WixRichContent` wrapper provides configuration to its child based on its own props. The props which are passed directly to the child override the wrapper's ones.

### New consumers

TBD

### Examples

#### RCE with plugins in OOI widget

```jsx
import { WixRichContent } from '@wix/rich-content';
import { RichContentEditor } from 'wix-rich-content-editor';

import { pluginGiphy } from 'wix-rich-content-plugin-giphy';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginVideo } from 'wix-rich-content-plugin-video';

...

class App extends Component {

  render() {
  ...
    return (
      <WixRichContent
        initialState={initialState}
        theme={'Palette'}
        palette={site_palette}
        locale={'lt'}
        plugins={[pluginVideo(), pluginImage(), pluginGiphy({ giphySdkApiKey: 'secret_key' })]}
        consumer={'your app name for BI'}
        instance={user_instance}
        isMobile={mobile}
        isEditor
      >
        <RichContentEditor placeholder={'Type here!'} />
      </WixRichContent>
    );
  }
}
```

### RCV with plugins in biz-mgr environment

```jsx
import { WixRichContent } from '@wix/rich-content';
import { RichContentViewer} from 'wix-rich-content-viewer';

import { pluginGiphy } from 'wix-rich-content-plugin-giphy/dist/module.viewer.cjs';
import { pluginImage } from 'wix-rich-content-plugin-image/dist/module.viewer.cjs';
import { pluginVideo } from 'wix-rich-content-plugin-video/dist/module.viewer.cjs';

...

class App extends Component {

  render() {
  ...
    return (
      <WixRichContent
        initialState={initialState}
        theme={'BM'}
        locale={'lt'}
        plugins={[pluginVideo(), pluginImage(), pluginGiphy()]}
        isMobile={mobile}
      />
        <RichContentViewer />
      </WixRichContent>
    );
  }
}
```

## Why the `WixRichContent` is good for you?

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

The `WixRichContent` handles `onChange` internally, and provides the `editorState` to the RCE. This can be overridden by passing `onChange` and `editorState` directly to the RCE.

#### Translations and locale resource loading

The appropriate translation resource is loaded internally when provided `locale` differs from `en`.

#### Types

It's Typescript!

### Plugin-specific features

#### Media uploading for Image, Gallery, and Video plugins

TBD

#### File upload & download (permissions check)

TBD

#### Link Preview oembed queries

TBD

## API

### Common props

#### `isEditor: boolean`

Defines whether the wrapped component is the `RichContentEditor`; this determines certain props handling (e.g. theme, plugins) and internal functionality.

#### `isMobile: boolean`

Defines the form factor dependent behaviors, e.g. mobile toolbar rendering, modals appearance, etc.

#### `locale: string`

Determines the language (appropriate translation resource is loaded) and text direction.

#### `theme` and `palette`

TBD

#### `plugins`

TBD

### Editor-only props

#### `consumer: string`

A meaningful identifier of the consumer (e.g. Blog, Forum) to be used in the BI.

#### `instance: string`

Logged-in Wix user instance to be used for media uploads.

Note: all other props are passed as-is to the child component.
