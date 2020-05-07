---
id: intro
title: Introduction
sidebar_label: Introduction
---

## Installation

To install this package as editor, use the following command

```bash
npm install --save wix-rich-content-editor 
```

To install this package as viewer, use the following command:

```bash
npm install --save wix-rich-content-viewer
```

## Getting Started

### 1. Basic Editor

To get started with the editor, create a simple `React.Component`, and import the editor component:

```jsx
import { EditorState, RichContentEditor } from 'wix-rich-content-editor';
```

Then, create an empty `editorState` in your state:

```jsx
export class MyApp extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  };
}
```

Use the `RichContentEditor` component in your `render` function, and implement `onChange` function:

```jsx
import React from 'react';
import { EditorState, RichContentEditor } from 'wix-rich-content-editor';

export class MyApp extends React.Component {
  constructor(props) {
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onChange = editorState => {
    this.setState({
      editorState,
    });
  };

  render() {
    return (
      <div>
        <RichConentEditor onChange={this.onChange} editorState={this.state.editorState} />
      </div>
    );
  }
}
```
Now, to make sure you are getting the most of the rich-content editor, include the compiled CSS files in your app's main file:

`app.js`

```jsx
import 'wix-rich-content-editor-common/dist/styles.min.css';
import 'wix-rich-content-editor/dist/styles.min.css';
import 'wix-rich-content-plugin-...'/dist/styles.min.css';
```

> You can also import the CSS files using `@import '~...`;` from a SCSS file.

### 2. Add Plugins

To add plugins to your editor, choose one of the implemented plugins from [the list of available plugins](https://github.com/wix-incubator/rich-content/tree/master/packages).

Install the plugin you wish use from NPM:

```bash
npm install wix-rich-content-plugin-divider
```

Import the plugin's stylesheet file in your main app's file:

```jsx
import 'wix-rich-content-plugin-divider/dist/styles.min.css';
```

Then, add `plugins` prop with the plugin's creation method:

```jsx
import React from 'react';
import { EditorState, RichContentEditor } from 'wix-rich-content-editor';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';

const PLUGINS = [createDividerPlugin];

export class MyApp extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onChange = editorState => {
    this.setState({
      editorState,
    });
  };

  render() {
    return (
      <div>
        <RichContentEditor
          plugins={PLUGINS}
          onChange={this.onChange}
          editorState={this.state.editorState}
        />
      </div>
    );
  }
}
```
