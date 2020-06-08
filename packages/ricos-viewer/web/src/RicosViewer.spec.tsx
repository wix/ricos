import React from 'react';
import { RicosViewer } from './index';
import { pluginHashtag } from '../../../plugin-hashtag/web/src/editor';
import introState from '../../../../e2e/tests/fixtures/intro.json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import './types';

Enzyme.configure({ adapter: new Adapter() });
const { mount, shallow } = Enzyme;

const plugins = [pluginHashtag()];

const getRicosViewer = (ricosViewerProps?: RicosViewerProps) =>
  mount(<RicosViewer content={introState} {...(ricosViewerProps || {})} />);

const getRCV = (ricosViewerProps?: RicosViewerProps) =>
  shallow(<RicosViewer content={introState} {...(ricosViewerProps || {})} />)
    .dive()
    .children();

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
    const rcvProps = getRCV().props();
    expect(rcvProps).toHaveProperty('theme');
    expect(rcvProps).toHaveProperty('decorators');
    expect(rcvProps.theme).toHaveProperty('modalTheme');
  });
});
