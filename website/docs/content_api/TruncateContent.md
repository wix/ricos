---
id: TruncateContent
title: Truncate Content
sidebar_label: Truncate Content
---

```tsx
truncateContent: (
  content: DraftContent,
  opts?: { wordsCount?: number; maxPlugins?: number; blocksCount?: number }
) => { content: DraftContent; isTruncated: boolean }  
```

Truncate existing content according to number of blocks, and optional words count and/or plugin count.


The content will be truncated by the first limit reached.
For example passing `blocksCount=5`, `wordsCount=100`, `maxPlugins=3` will yield a content that is not more than 5 blocks, shorter than 100 words and have no more than 3 plugin blocks

#### Example Usage

```js
import { truncateContent } from 'ricos-content/libs/truncateContent';
const {content} = truncateContent(fullContent, 4)
<RicosViewer content={content} ... />
```

