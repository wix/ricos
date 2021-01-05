import React from 'react';
import RicosFixture from '../../../../packages/ricos-content/web/src/migrateSchema/migratedFixtures/intro.json';
import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const supportedDecorations = {
  ricos_link: (inner, { ricosLink }) => {
    const { url, rel, target } = ricosLink;
    return `<a href='${url}' rel='${rel}' target='${target}'>${inner}</a>`;
  },
  bold: inner => `<strong>${inner}</strong>`,
  italic: inner => `<i>${inner}</i>`,
  underline: inner => `<u>${inner}</u>`,
  ricos_color: (inner, { ricosColor }) => {
    let style = '';
    if (ricosColor.foreground) {
      style += `color: ${ricosColor.foreground};`;
    }
    if (ricosColor.background) {
      style += `background-color: ${ricosColor.background};`;
    }
    return `<span style="${style}">${inner}</x>`;
  },
};

const supportedTypes = {
  text: (inner, { ricosText }) => {
    const { text, decorations } = ricosText;

    let res = text;
    decorations.forEach(deco => (res = (supportedDecorations[deco.type] || (x => x))(res, deco)));
    return res;
  },
  heading: inner => `<h1>${inner}</h1>`,
  paragraph: inner => `<p>${inner}</p>`,
  blockquote: inner =>
    `<div style="border-left: 5px solid blue; padding-left:20px; margin-left: 20px;">${inner}</div>`,
  codeblock: inner => `<pre style="background: black; color: white;">${escapeHtml(inner)}</pre>`,
  ricos_divider: (inner, { ricosDivider }) => {
    const { type } = ricosDivider;
    const border = type === 'DASHED' ? 'dashed' : 'solid';
    return `<hr style="border-top: ${border};">`;
  },
  ricos_giphy: (inner, { ricosGiphy }) => {
    const {
      gif: { originalUrl },
    } = ricosGiphy;
    return `<img role="img" aria-label="gif" src="${originalUrl}" alt="gif" />`;
  },

  ricos_gallery: inner => `<div><<< Missing no gallery plugin quite yet >>></div>`,
};

const nodeToHTML = node => {
  let res = '';
  if (node.nodes.length > 0) {
    res += node.nodes.map(nodeToHTML).join('');
  }
  const typeFn = supportedTypes[node.type];
  if (typeFn) {
    return typeFn(res, node);
  } else {
    return node.type + '|' + res;
  }
};

const toHTML = content => {
  const { nodes } = content.doc;
  return nodes.map(nodeToHTML).join('');
};

export default () => {
  return (
    <Page title="New Viewer">
      <Section title={'Viewer check'}>
        <RichContentViewerBox preset="blog-preset">
          <div dangerouslySetInnerHTML={{ __html: toHTML(RicosFixture) }} />
        </RichContentViewerBox>
      </Section>

      <Section title="Content State">
        <ContentState json={RicosFixture} />
      </Section>
    </Page>
  );
};
