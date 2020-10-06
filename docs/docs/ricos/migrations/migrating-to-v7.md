---
id: migrating-to-v7
title: Migrating to Version 7
sidebar_label: Version 7
---

V7 breaking change - `draft-js` moved from RCE `peerDependency` to `dependencies`

Consumers, therefore, should stop include `draft-js` in their dependencies. (in dependencies, resolveAlias, code usage, etc...)

NOTE - this is not a proper breaking change, but will cause bundle bloat on the editor in case consumer will keep draft-js in their dependency.

This is a preparation step,  the next step -  switching to `@wix/draft-js` fork which solves many issues in the mobile web for android  - will be seamless for consumers.

`rich-content-editor-common` package is [exposing](https://github.com/wix-incubator/rich-content/blob/master/packages/editor-common/web/src/index.js#L101) any draft-js functionality needed - please let us know if you consume draft-js in any other way.
