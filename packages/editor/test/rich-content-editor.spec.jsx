import React from 'react';
import { RichContentEditor } from '../src/index';
import localeResource from '../statics/locale/messages_en.json';
import { shallow } from 'enzyme';
import TestData from './TestData/initial-state';

const localeName = 'en';

describe('RichContentEditor', () => {

  it('should render', async () => {
    const wrapper = shallow(
      <RichContentEditor
        localeName={localeName}
        localeResource={localeResource}
      />
    );
    expect(wrapper.html()).toEqual(expect.stringContaining('class="DraftEditor-root"'));
  });

  it('should render edit mode', async () => {
    const wrapper = shallow(
      <RichContentEditor
        localeName={localeName}
        localeResource={localeResource}
      />
    );
    expect(wrapper.html()).toEqual(expect.stringContaining('contenteditable="true"'));
  });

  it('should render read only mode', async () => {
    const wrapper = shallow(
      <RichContentEditor
        localeName={localeName}
        localeResource={localeResource}
        readOnly
      />
    );
    expect(wrapper.html()).toEqual(expect.stringContaining('contenteditable="false"'));
  });

  it('should render text only', async () => {
    const wrapper = shallow(
      <RichContentEditor
        localeName={localeName}
        localeResource={localeResource}
        initialState={TestData.onlyText}
      />
    );
    expect(wrapper.html()).toEqual(expect.stringContaining('Hello text only'));
  });
  // it('should render legacy image', () => {
  //   const wrapper = shallow(<RichContentEditor initialState={TestData.legacyImage} readOnly />);
  //   expect(wrapper.html()).toEqual(expect.stringContaining('https://unsplash.it/500/500?image=20'));
  // });
  // it('should render image', () => {
  //   const wrapper = shallow(<RichContentEditor initialState={TestData.image} readOnly />);
  //   expect(wrapper.html()).toEqual(expect.stringContaining('https://unsplash.it/500/500?image=20'));
  // });
  // it('should render legacy video', () => {
  //   const wrapper = render(<RichContentEditor initialState={TestData.legacyVideo} readOnly={true} theme={{aaaa: 'aaaa'}}/>);
  //   expect(wrapper.html()).toEqual(expect.stringContaining('https://www.youtube.com/watch?v=eqZVIiD6wSg'));
  // });
  // it('should render video', () => {
  //   const wrapper = render(<RichContentEditor initialState={TestData.video} readOnly={true}/>);
  //   expect(wrapper.html()).toEqual(expect.stringContaining('https://www.youtube.com/watch?v=eqZVIiD6wSg'));
  // });
  // it('should render html', () => {
  //   const wrapper = shallow(<RichContentEditor initialState={TestData.html} readOnly />);
  //   expect(wrapper.html()).toEqual(expect.stringContaining('youtube'));
  // });
  // it('should render divider', () => {
  //   const wrapper = mount(<RichContentEditor initialState={TestData.divider} readOnly theme={TestData.theme}/>);
  //   /* eslint-disable no-useless-escape */
  //   expect(wrapper.html()).toEqual(
  //     expect.stringContaining('<div data-hook=\"divider\" class=\"draftJsFocusPlugin__focused__3Mksn\" style=\"width: 100%; margin: auto;\"></div>'));
  // });
  // /* eslint-enable no-useless-escape */
  // it('should render gallery', () => {
  //   const wrapper = shallow(<RichContentEditor initialState={TestData.gallery} readOnly />);
  //   expect(wrapper.html()).toEqual(expect.stringContaining('class="pro-gallery"'));
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
