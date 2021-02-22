---
id: TruncateContent
title: Truncate Content
sidebar_label: Truncate Content
---

## Truncate Content

### Signature

```js
truncateContent = (
  contentState: RicosContent,
  index: number,
  opts: { wordsCount?: number; maxPlugins?: number } = {}
): { content: RicosContent; isTruncated: boolean }  
```

### Usage

```js
import { truncateContent } from 'wix-rich-content-common/libs/contentStateServices';
const {content} = truncateContent(fullContent, 4)
<RicosViewer content={content} ... />
```

