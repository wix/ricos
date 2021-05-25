import React from 'react';
import { RicosViewer, RicosViewerProps } from './index';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { BICallbacks } from 'wix-rich-content-common';
import { pluginHashtag, HASHTAG_TYPE } from '../../../plugin-hashtag/web/src';
import { version } from '../package.json';
import introState from '../../../../e2e/tests/fixtures/intro.json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
const { mount, shallow } = Enzyme;

const plugins = [pluginHashtag()];

const getRicosViewer = (ricosViewerProps?: RicosViewerProps) =>
  mount(<RicosViewer content={introState} {...(ricosViewerProps || {})} />);

const getRCV = (ricosViewerProps?: RicosViewerProps, asWrapper?: boolean) => {
  const toRender = !asWrapper ? (
    <RicosViewer content={introState} {...(ricosViewerProps || {})} />
  ) : (
    <RicosViewer content={introState} {...(ricosViewerProps || {})}>
      <RichContentViewer />
    </RicosViewer>
  );
  const element = shallow(toRender)
    .find('RicosEngine')
    .dive()
    .children();

  return element.at(element.length - 1); // due to add html by strategies
};

describe('RicosViewer', () => {
  it('should render viewer', () => {
    const element = getRicosViewer();
    expect(element).toBeTruthy();
  });
  it('should render locale="en" if unspecified', () => {
    const rcvProps = getRCV().props();
    expect(rcvProps).toHaveProperty('locale');
    expect(rcvProps.locale).toEqual('en');
  });
  it('should render locale="he"', () => {
    const rcvProps = getRCV({ locale: 'he' }).props();
    expect(rcvProps).toHaveProperty('locale');
    expect(rcvProps.locale).toEqual('he');
  });
  it('should render with pluginsStrategy output', () => {
    const rcvProps = getRCV({ plugins }).props();
    expect(rcvProps).toHaveProperty('config');
    expect(rcvProps.config).toHaveProperty('wix-draft-plugin-hashtag');
  });
  it('should render with themeStrategy output', () => {
    const rcvProps = getRCV({ theme: { palette: 'darkTheme' } }).props();

    expect(rcvProps).toHaveProperty('theme');
    expect(rcvProps).toHaveProperty('decorators');
    expect(rcvProps.theme).toHaveProperty('modalTheme');
  });
  it('should create same props with & without a wrapping component', () => {
    const props: RicosViewerProps = {
      theme: { palette: 'darkTheme' },
      locale: 'fr',
      content: introState,
      isMobile: true,
      _rcProps: {
        helpers: { dummyFunction: () => true },
        config: { [HASHTAG_TYPE]: {} },
      },
      plugins,
      onError: () => true,
    };
    const rcvProps = getRCV(props).props();
    const rcvPropsWrapped = getRCV(props, true).props();
    // hashed theme classnames can be different; assert keys only.
    const themeKeys = Object.keys(rcvProps.theme);
    const themeKeys_wrapped = Object.keys(rcvPropsWrapped.theme);
    expect(JSON.stringify(themeKeys)).toStrictEqual(JSON.stringify(themeKeys_wrapped));
    expect(JSON.stringify({ ...rcvProps, theme: {} })).toStrictEqual(
      JSON.stringify({ ...rcvPropsWrapped, theme: {} })
    );
  });
  it('should trigger onViewerLoaded upon mount', () => {
    let args = {};
    const onViewerLoadedMock: BICallbacks['onViewerLoaded'] = params => (args = params);
    const fn = jest.fn(onViewerLoadedMock);
    getRicosViewer({ _rcProps: { helpers: { onViewerLoaded: fn } } });
    expect(fn).toBeCalledTimes(1);
    expect(args).toStrictEqual({
      isPreview: false,
      pluginsCount: {
        EMOJI_TYPE: 2,
        LINK: 2,
        blockquote: 1,
        'code-block': 1,
        'header-three': 2,
        'wix-draft-plugin-divider': 1,
        'wix-draft-plugin-gallery': 1,
        'wix-draft-plugin-giphy': 1,
      },
      version,
    });
  });
});
