/* eslint-disable no-param-reassign */
const normalizeSafariSpaceSpans = htmlString => {
  return htmlString.replace(
    /<span(?: class="Apple-converted-space"|)>(\s+)<\/span>/g,
    (fullMatch, spaces) => {
      return spaces.length === 1
        ? ' '
        : Array(spaces.length + 1)
            .join('\u00A0 ')
            .substr(0, spaces.length);
    }
  );
};

const normalizeSpacing = htmlString => {
  // Run normalizeSafariSpaceSpans() two times to cover nested spans.
  return (
    normalizeSafariSpaceSpans(normalizeSafariSpaceSpans(htmlString))
      // Remove all \r\n from "spacerun spans" so the last replace line doesn't strip all whitespaces.
      .replace(/(<span\s+style=['"]mso-spacerun:yes['"]>[\s]*?)[\r\n]+(\s*<\/span>)/g, '$1$2')
      .replace(/<span\s+style=['"]mso-spacerun:yes['"]><\/span>/g, '')
      .replace(/ <\//g, '\u00A0</')
      .replace(/ <o:p><\/o:p>/g, '\u00A0<o:p></o:p>')
      // Remove <o:p> block filler from empty paragraph. Safari uses \u00A0 instead of &nbsp;.
      .replace(/<o:p>(&nbsp;|\u00A0)<\/o:p>/g, '')
      // Remove all whitespaces when they contain any \r or \n.
      .replace(/>(\s*[\r\n]\s*)</g, '><')
  );
};

// Normalizes spacing in special Word `spacerun spans` (`<span style='mso-spacerun:yes'>\s+</span>`) by replacing
// All spaces with `&nbsp; ` pairs. This prevents spaces from being removed during further DOM/View processing
const normalizeSpacerunSpans = htmlDocument => {
  htmlDocument.querySelectorAll('span[style*=spacerun]').forEach(el => {
    const innerTextLength = el.innerText.length || 0;

    el.innerHTML = Array(innerTextLength + 1)
      .join('\u00A0 ')
      .substr(0, innerTextLength);
  });
};

//Fixes spaces deletion when pasting hyperlinks (draft-convert trimming)
const replaceSpansWithOnlySpaces = html =>
  // eslint-disable-next-line no-irregular-whitespace
  html.replace(/(<span> <\/span>)/g, ' ');

const cleanContentAfterBody = htmlString => {
  const regexp = /<\/body>(.*?)(<\/html>|$)/;
  const match = htmlString.match(regexp);

  if (match && match[1]) {
    htmlString =
      htmlString.slice(0, match.index) + htmlString.slice(match.index).replace(match[1], '');
  }

  return htmlString;
};

export default function normalizeHTML(htmlString) {
  const domParser = new DOMParser();
  // Remove Word specific "if comments"
  htmlString = htmlString.replace(/<!--\[if gte vml 1]>/g, '');
  htmlString = replaceSpansWithOnlySpaces(htmlString);
  const normalizedHtml = normalizeSpacing(cleanContentAfterBody(htmlString));
  const htmlDocument = domParser.parseFromString(normalizedHtml, 'text/html');
  normalizeSpacerunSpans(htmlDocument);
  const bodyString = htmlDocument.body.innerHTML;
  return bodyString;
}
