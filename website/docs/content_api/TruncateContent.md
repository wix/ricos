---
id: TruncateContent
title: Truncate Content
sidebar_label: Truncate Content
---

```js
truncateContent = (
  contentState: RicosContent,
  blocksCount: number,
  opts?: { wordsCount?: number; maxPlugins?: number }
): { content: RicosContent; isTruncated: boolean }  
```

Truncate existing content according to number of blocks, and optional words count and/or plugin count.
(The first limit is reached will end the content, for example for blocksCount=5, wordsCount=100, maxPlugins=3, will yield a content that is not more than 5 blocks, shorter than 100 words and 3 plugins max)

#### Example Usage

```js
import { truncateContent } from 'wix-rich-content-common/libs/contentStateServices';
const {content} = truncateContent(fullContent, 4)
<RicosViewer content={content} ... />
```

