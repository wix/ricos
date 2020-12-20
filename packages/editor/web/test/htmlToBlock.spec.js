import { getBlockTypeOfElement } from '../src/RichContentEditor/utils/pasting/htmlToBlock';
const customHeadings = ['h2', 'h3', 'h5'];
const noHeaders = [];

describe('HtmlToBlock tests', () => {
  it('should convert h1 to h2', () => {
    expect(getBlockTypeOfElement('h1', customHeadings)).toEqual('header-two');
  });

  it('should convert h4 to h3', () => {
    expect(getBlockTypeOfElement('h4', customHeadings)).toEqual('header-three');
  });

  it('should convert h6 to h5', () => {
    expect(getBlockTypeOfElement('h6', customHeadings)).toEqual('header-five');
  });

  it('should convert h6 to unstyled', () => {
    expect(getBlockTypeOfElement('h6', noHeaders)).toEqual('unstyled');
  });

  it('should convert p to unstyled', () => {
    expect(getBlockTypeOfElement('p', noHeaders)).toEqual('unstyled');
  });
});
