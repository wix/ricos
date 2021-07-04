import { preprocess } from './preprocess';

describe('CKEditor preprocess', () => {
  it('should replace block element container paragraphs with div tags', async () => {
    const expected =
      '<p>text</p><div><a><img></a></div>' +
      '<ol><li><p>item</p></li><li><div><img><p>This should be <strong>wrapped</strong> with P!</p></div></li></ol>';
    const actual = preprocess(
      '<p>text</p><p><a><img></a></p>' +
        '<ol><li><p>item</p></li><li><p><img>This should be <strong>wrapped</strong> with P!</p></li></ol>'
    );
    console.log(actual); // eslint-disable-line no-console
    expect(actual).toEqual(expected);
  });

  it('should replace empty paragraphs with div tags', async () => {
    const expected =
      '<p>text</p><div></div><div></div><ol><li><p>item</p></li><li><div></div></li></ol>';
    const actual = preprocess(
      '<p>text</p><div></div><div></div><ol><li><p>item</p></li><li><p/></li></ol>'
    );
    console.log(actual); // eslint-disable-line no-console
    expect(actual).toEqual(expected);
  });

  it('should remove text nodes directly under list and list item', async () => {
    const expected = '<p>text</p><ol><li><p>item</p></li></ol>';
    const actual = preprocess('<p>text</p><ol>remove me!<li>assa<p>item</p></li></ol>');
    console.log(actual); // eslint-disable-line no-console
    expect(actual).toEqual(expected);
  });
});
