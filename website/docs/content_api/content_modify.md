---
id: content_modify
title: Content Modifier
sidebar_label: Content Modifier
---

## modify API

The Content Modifier provides access to content nodes regardless of their nesting level.

The `modify` API accepts RichContent object, and exposes `Modifier`:

```ts
interface Modifier {
  filter: (pred: (node: Node) => boolean) => Modifier;
  set: (setter: (node: Node) => Node | Node[]) => RichContent;
}
```

## Examples

1. Modify image nodes - ensure altText is not empty:

```ts
import { modify } from 'ricos-content/libs/extract';
import { content } from 'your-own-content-from-somewhere';
...
const newContent = modify(content)
  .filter(n => n.type === Node_Type.IMAGE)
  .set(n => ({
    ...n,
    imageData: {
      ...n.imageData,
      altText: n.imageData?.altText || 'Custom alt text',
    },
  }));
```

2. Multiply dividers:

```ts
const newContent = modify(content)
  .filter(({ type }) => type === Node_Type.DIVIDER)
  .set(n => [n, n]);
```
