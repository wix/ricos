import { RicosNode, IRicosDecoration } from 'ricos-schema';

export type ElementMapper = ({
  innerHtml,
  node,
}: {
  innerHtml?: string;
  node?: RicosNode;
}) => string;
type DecorationMapper = ({
  innerHtml,
  decoration,
}: {
  innerHtml?: string;
  decoration?: IRicosDecoration;
}) => string;

const decorationMappers: Record<IRicosDecoration['type'], DecorationMapper> = {
  bold: ({ innerHtml }) => `<strong>${innerHtml}</strong>`,
  italic: ({ innerHtml }) => `<i>${innerHtml}</i>`,
  underline: ({ innerHtml }) => `<u>${innerHtml}</u>`,
};

export const elementMappers: Record<RicosNode['type'], ElementMapper> = {
  text: ({ node }) => {
    const { text, decorations } = node?.ricosText || {};

    let innerHtml = text;
    decorations?.forEach(
      (decoration: IRicosDecoration) =>
        (innerHtml = decorationMappers[decoration.type]({
          innerHtml,
          decoration,
        }))
    );
    return innerHtml || '';
  },
  heading: ({ innerHtml }) => `<h1>${innerHtml}</h1>`,
  paragraph: ({ innerHtml }) => `<p>${innerHtml}</p>`,
  blockquote: ({ innerHtml }) =>
    `<div style="border-left: 5px solid blue; padding-left:20px; margin-left: 20px;">${innerHtml}</div>`,
};
