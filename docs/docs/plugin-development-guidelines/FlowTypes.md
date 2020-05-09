---
id: FlowTypes
title: Flow Types
sidebar_label: Flow Types
---

# Flow Types

## Motivation
In order to make the plugin development easier, some major public API types are defined. The type definitions are implemened with the [flow](https://flow.org/) type system.

This document describes the `flow` types available at the moment, which is subject of changes.

## Infrastructure
The `flow` type system is added to the project root ([flow-bin](https://www.npmjs.com/package/flow-bin) package). The type definitions are found in the default location ([`/flow-typed`](https://github.com/wix-incubator/rich-content/blob/develop/flow-typed) directory).

In addition, all the CSS modules are typed now. The types are generated automatically by [css-modules-flow-types-cli](https://www.npmjs.com/package/css-modules-flow-types-cli), within `npm test` step.

At the moment, the type definitions are not deployed.

## Available Types
### Plugin related types:
* `CreateInlineButtons` type validates the plugin toolbar button definitions
* `CreateInsertButtons` type validates the plugin insertion button definitions
* `TextButtonMapper` type validates the plugin text toolbar button definitions
* `PluginTypeMapper` type validates the type mapper functions used with `RichContentViewer`
### `RichContentEditor` configuration related types:
*  `GetToolbarSettings` type validates the `RichContentEditor`'s `config` prop `getToolbarSettings` value (see [Toolbar Customization](https://github.com/wix-incubator/rich-content/blob/develop/docs/ToolbarCustomization.md) for details)

## References and examples
All the mentioned types are used in existing plugins code. We prefer to use the [comment type annotations](https://flow.org/en/docs/types/comments/) to keep it less intrusive.


