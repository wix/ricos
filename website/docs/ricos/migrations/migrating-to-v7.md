---
id: v6-to-v7
title: Migrating to Version 7
sidebar_label: v.6 => v.7
---

V7 breaking change - `draft-js` moved from RCE `peerDependency` to `dependencies`

Consumers, therefore, should stop including `draft-js` in their dependencies (in dependencies, resolveAlias, code usage, etc...).

:::caution
This is not a proper breaking change, but will cause bundle bloat on the editor in case you keep `draft-js` as a dependency.
::::


This is a preparation step. The next step is switching to the `@wix/draft-js` fork which solves many issues in the mobile web for Android and provides a more seamless experience for consumers.

`rich-content-editor-common` package is [exposing](https://github.com/wix/ricos/blob/5f81918551b09406bfc5bfbbb6a33770bc4d0156/packages/editor-common/web/src/index.ts#L107) any `draft-js` functionality needed - please let us know if you consume `draft-js` in any other way.
