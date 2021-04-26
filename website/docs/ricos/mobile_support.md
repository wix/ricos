---
id: mobile_support
title: Mobile support
sidebar_label: Mobile support
---

Originally, the `rich-content-editor` was based on [draft-js](https://github.com/facebook/draft-js). It inherited its strengths and limitations as well. The most significant limitation was the lack of mobile support. 

In order to overcome this, today the `rich-content-editor` relies on [wix/draft-js](https://github.com/wix/draft-js) -- a fork of the original `draft-js`. The forking allowed to fix lots of issues, however there are still issues exist. 

### Editing with Gboard

The Android phones feature the [Gboard](https://play.google.com/store/apps/details?id=com.google.android.inputmethod.latin) keyboard. The `rich-content-editor` has the following compatibility issues with it:

* **inline style toggling is not supported** -- whie typing with Gboard, the inline style (e.g. `Bold`, `Italic`, `Underline`) toggle has no effect (however, inline styles could be applied on selected text)
