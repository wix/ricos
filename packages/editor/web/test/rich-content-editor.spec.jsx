import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestData from './TestData/initial-state';

Enzyme.configure({ adapter: new Adapter() });
const { shallow } = Enzyme;

// the mock is needed to overcome the 'Context is undefined' issue
const getRichContentEditor = () => require('../src/index').RichContentEditor;

describe('RichContentEditor', () => {
  it('should render', async () => {
    const RichContentEditor = getRichContentEditor();
    const wrapper = shallow(<RichContentEditor />);
    expect(wrapper.html()).toEqual(expect.stringContaining('class="DraftEditor-root"'));
  });

  it('should render edit mode', async () => {
    const RichContentEditor = getRichContentEditor();
    const wrapper = shallow(<RichContentEditor />);
    expect(wrapper.html()).toEqual(expect.stringContaining('contenteditable="true"'));
  });

  it('should render text only', async () => {
    const RichContentEditor = getRichContentEditor();
    const wrapper = shallow(<RichContentEditor initialState={TestData.onlyText} />);
    expect(wrapper.html()).toEqual(expect.stringContaining('Hello text only'));
  });
  // it('should render legacy video', () => {
  //   const wrapper = render(<RichContentEditor initialState={TestData.legacyVideo} theme={{aaaa: 'aaaa'}} />);
  //   expect(wrapper.html()).toEqual(expect.stringContaining('https://www.youtube.com/watch?v=eqZVIiD6wSg'));
  // });
  // it('should render video', () => {
  //   const wrapper = render(<RichContentEditor initialState={TestData.video} />);
  //   expect(wrapper.html()).toEqual(expect.stringContaining('https://www.youtube.com/watch?v=eqZVIiD6wSg'));
  // });
  // it('should render html', () => {
  //   const wrapper = shallow(<RichContentEditor initialState={TestData.html} />);
  //   expect(wrapper.html()).toEqual(expect.stringContaining('youtube'));
  // });
  // it('should render divider', () => {
  //   const wrapper = mount(<RichContentEditor initialState={TestData.divider} theme={TestData.theme} />);
  //   /* eslint-disable no-useless-escape */
  //   expect(wrapper.html()).toEqual(
  //     expect.stringContaining('<div data-hook=\"divider\" class=\"draftJsFocusPlugin__focused__3Mksn\" style=\"width: 100%; margin: auto;\"></div>'));
  // });
});

// describe('Modal', () => {
//   it('should render', () => {
//     const ModalElement = () => {
//       return <div id="someId" />;
//     };
//     const wrapper = shallow(<RichContentModal modalElement={ModalElement} keyName="someName" store={{}} componentData={{}} componentState={{}} />, { context: {} });
//     expect(wrapper.html()).toEqual(expect.stringContaining('id="someId"'));
//   });
// });
