# Toolbar Customization

## Motivation
As it turns out, various `RichContentEditor` consumers have different customization needs. On other hand, it is important to keep the public API clean, while providing the desired customability. In order to meet these requirements, the `RichContentEditor` exposes `config` object prop.

This document focuses on a specific `config` API `getToolbarSettings` that is responsible for the toolbar customization.
## `getToolbarSettings` API
### Signature
The `getToolbarSettings` is defined as follows: `{ textButtons, pluginButtons } => Array<Setting>`.

The `Setting` type is defined as follows:
```
{
  name: TOOBAR_TYPE,
  shouldCreate: () => {
    desktop: boolean,
    mobile: {
      ios: boolean,
      android: boolean
    }
  },
  getVisiblityFn: () => {
    desktop: editorState => boolean,
    mobile: {
      ios: editorState => boolean,
      android: editorState => boolean
    }
  },
  getPositionOffset: () => {
    desktop: { x: number, y: number },
    mobile: {
      ios: { x: number, y: number },
      android: { x: number, y: number }
    }
  },
  getButtons: () => {
    desktop: Array<Component>,
    mobile: {
      ios: Array<Component>,
      android: Array<Component>
    }
  }
}
```
As you can see, the `Settings` is form-factor aware, i.e. it defines different behaviors for desktop/mobile views.
### Toolbar types
The following toolbar types are available:
  * Plugin insertion toolbars:
    * Side toolbar
    * Footer toolbar
  * Text editing toolbars:
    * Static text toolbar
    * Inline text toolbar
    * Mobile toolbar
  * Plugin toolbars [WIP]

All the toolbar types are exposed by the `TOOLBARS` const found in `/packages/common/src/consts.js`.

### `Settings` properties
`name` : one of the toolbar types

`shouldCreate` : determines whether the toolbar should be created at the first place

`getVisibilityFn` : defines the toolbar visibility based on given `editorState`

`getPositionOffset` : defines the toolbar offset point in pixels, relatively to the default toolbar position

`getButtons` : defines a list of the toolbar buttons

## References and examples
The `/packages/editor/src/RichContentEditor/Toolbars/default-toolbar-settings.js` contains the default toolbar settings, and the `getToolbarSettings` code example could be found in `/examples/editor/src/App.jsx` (commented by default).

## Notes
The plugin toolbar customization is not available yet.


