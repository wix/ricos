---
id: modals
title: Modal Dialogs
sidebar_label: Modal Dialogs

---

## Motivation

Almost every plugin has configuration settings whose UI complexity prevents to display them directly on the toolbar. The modal dialog infrastructure provides a solution to this problem.

This document focuses on major modal dialog components, APIs, utilities, and customization.

## Consumer Modal-Related Responsibilities

Since different consumers have different ways to display modal dialogs, the `rich-content` modal infrastructure intensively involves the consumer code. The consumer *must* implement certain methods and fulfill certain conditions to get the modal dialogs displayed.

### `RichContentModal` and `RichContentEditorModal` Components

Any `rich-content` consumer application should render at least one instance of [RichContentModal](https://github.com/wix-incubator/rich-content/blob/master/packages/editor-common/web/src/Modals/RichContentModal.tsx) **or** [RichContentEditorModal](https://github.com/wix-incubator/rich-content/blob/master/packages/editor/web/src/RichContentEditor/RichContentEditorModal.tsx).

The `RichContentModal` is a dialog host, while the `RichContentEditorModal` is a wrapper whose responsibility is to integrate all the installed plugin dialogs into the `RichContentEditor`.

The `RichContentModal` is not dependent on `RichContentEditor`, thus can be used with `RichContentViewer`, too.

Since the consumer application renders the dialog host, it has complete freedom to place it anywhere, even in a different frame.

**Note**: these components are not providing the modality by themselves, and must be rendered inside some modality provider, such as [react-modal](https://www.npmjs.com/package/react-modal).

### `openModal` and `closeModal` APIs

The `openModal` and `closeModal` functions are helper methods that *must* be implemented by a consumer and provided to the `RichContentEditor`/`RichContentViewer` via the `helpers` prop; otherwise, no dialogs can be displayed and closed.

The `openModal` method accepts configuration object that should contain `modalElement` or `modalName` (accordingly to modal mapping), `modalStyles`, and other properties, depending on modal type. The provided configuration should be passed to one of the dialog hosts (`RichContentModal`/`RichContentEditorModal`).

## Plugin Modal Dialog Integration

### Modal Mappings

Every plugin should export a modal mapping in order to make the dialogs available within `RichContentEditor`. The mapping is an object with globally unique string keys, and components as values.

All these mappings are imported, merged, and passed to the `RichContentEditorModal` host by the consumer application. The mappings allow to provide the `modalName` parameter to the `openModal` helper method (`modalName` should be an existing key in the mapping).

For example, the `video-plugin` modal mapping is defined as follows:

```js

const ModalsMap = {
  [Modals.VIDEO_URL_INPUT]: VideoURLInputModal
};

```

## Modal Styles

### `ModalStyles` object structure

The `openModal` method configuration parameter should contain the `modalStyes` property. This object determines the appearance of the modal dialog. The `ModalStyles` structure consists of two properties: `content` and `overlay`. Each property contains inline style rules that are applied to the modality provider (e.g. `rect-modal`). The `content` styles affect the dialog element, while the `overlay` styles affect the overlay.

The toolbar button definition structures contain `modalStyles` property. This is useful when toolbar button is used to open dialog.

### `getModalStyles` utility

The [getModalStyles](https://github.com/wix-incubator/rich-content/blob/master/packages/editor-common/web/src/Utils/getModalStyles.js) utility provides some basic predefined modal styles. It returns the `modalStyles` object accordingly to parameters. The function signature is:

```js

({ customStyles: ModalStyles, fullScreen: bool, inline: bool }) => ModalStyles

```

The `customStyles` object is a `ModalStyles` object the result is based on. The `fullScreen` flag determines whether the dialog should be rendered as a sidebar, or a pop-up. The `inline` flag allows to create an inline dialog by hiding the overlay.

### `modalStylesFn` API

Both insert plugin buttons and plugin functionality toolbar buttons can trigger modal dialog. Sometimes, the modal styles have to be calculated dynamically, considering the editor boundaries and toolbar button position. This can be achieved by using the `modalStylesFn` property within toolbar button definition structure. The property value is expected to be a function with the following signature:

```js

({ buttonRef: DOMElement, pubsub: object }) => ModalStyles

```

The `buttonRef` parameter is the toolbar button DOM element. The `pubsub` parameter is the plugin pubsub.

**Note:** if both `modalStyles` and `modalStylesFn` properties are defined in the same button structure, then the `modalStyles` is applied, and the `modalStylesFn` is ignored.

## Dialog Decorations

Sometimes the dialog is required to have custom features like a chevron. To support this requirement, the custom modal decorations were added.

The modal decorations allow to wrap the dialog content in a custom decorator, and add a custom decorator before or after the dialog content. The decorator accepts all the props passed to the dialog component.

### `modalDecorations` API

The decorators are provided by populating the `modalDecorations` property of the `openModal` configuration object. It also can be passed within the toolbar button definition structure. The value is expected to be an array of objects:

```js

modalDecorations: [{
  decorationMode: DECORATION_MODE.PREPEND | DECORATION_MODE.APPEND | DECORATION_MODE.WRAP,
  decorator: Component
},]

```

The number of decorators is not limited, and their rendering order is defined by their order in array. The decoration mode is defined by `decorationMode` property.

#### Decoration Modes

The `DECORATION_MODE` emuneration is defined in [consts.js](https://github.com/wix-incubator/rich-content/blob/master/packages/editor-common/web/src/consts.ts). It defines 3 possible values: PREPEND, APPEND, and WRAP. The PREPEND mode adds a decorator before the dialog content, WRAP mode wraps the dialog content in decorator, and the APPEND adds the decorator after the content.
