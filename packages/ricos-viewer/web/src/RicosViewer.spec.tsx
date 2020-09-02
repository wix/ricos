import React from 'react';
import { RicosViewer, RicosViewerProps } from './index';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { pluginHashtag } from '../../../plugin-hashtag/web/src/editor';
import introState from '../../../../e2e/tests/fixtures/intro.json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import createThemeStrategy from 'ricos-theme';

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
    .dive()
    .children();
  return ricosViewerProps?.theme?.palette ? element.at(1) : element; // due to <styles /> creation
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
    const rcvProps = getRCV({ theme: { createThemeStrategy } }).props();
    expect(rcvProps).toHaveProperty('theme');
    expect(rcvProps).toHaveProperty('decorators');
    expect(rcvProps.theme).toHaveProperty('modalTheme');
  });
  it('should create same props with & without a wrapping component', () => {
    const props: RicosViewerProps = {
      theme: {
        palette: 'darkTheme',
        createThemeStrategy,
      },
      locale: 'fr',
      content: introState,
      isMobile: true,
      _rcProps: {
        helpers: { dummyFunction: () => true },
        config: { dummyPluginJustForThisTest: {} },
      },
      plugins,
      onError: () => true,
    };
    const rcvProps = getRCV(props).props();
    const rcvPropsWrapped = getRCV(props, true).props();
    // hashed theme classnames can be different; assert keys only.
    const themeKeys = Object.keys(rcvProps.theme);
    const themeKeys_wrapped = Object.keys(rcvPropsWrapped.theme);
    expect(themeKeys).toStrictEqual(themeKeys_wrapped);
    expect({ ...rcvProps, theme: {} }).toStrictEqual({ ...rcvPropsWrapped, theme: {} });
  });
});
