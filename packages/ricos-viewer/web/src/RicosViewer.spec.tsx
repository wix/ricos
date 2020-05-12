/* eslint-disable max-len */
import React from 'react';
import { RicosViewer } from './index';
import { pluginHashtag } from '../../../plugin-hashtag/web/src/editor';
import introState from '../../../../e2e/tests/fixtures/intro.json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import './types';

Enzyme.configure({ adapter: new Adapter() });
const { shallow } = Enzyme;

const plugins = [pluginHashtag()];

const getRicosViewer = (ricosViewerProps?: RicosViewerProps) =>
  shallow(<RicosViewer content={introState} {...(ricosViewerProps || {})} />);

const getChild = ricosElement => ricosElement.dive().children();
const getRCV = (ricosViewerProps?: RicosViewerProps) => getChild(getRicosViewer(ricosViewerProps));

describe('RicosViewer', () => {
  it('should render viewer', () => {
    const element = getRicosViewer();
    expect(element).toBeTruthy();
  });
  it('should render locale="en" if unspecified', () => {
    const ricosViewerProps = getRicosViewer({}).props();
    expect(ricosViewerProps).toHaveProperty('locale');
    expect(ricosViewerProps.locale).toEqual('en');
  });
  it('should render viewer child if provided', () => {
    const ricosViewerProps = getRicosViewer({}).props();
    expect(ricosViewerProps).toHaveProperty('children');
    expect(ricosViewerProps.children.type.displayName).toEqual('RichContentViewer');
  });
  it('should render with pluginsStrategy output', () => {
    const rcvProps = getRCV({ plugins }).props();
    expect(rcvProps).toHaveProperty('config');
    expect(rcvProps.config).toHaveProperty('wix-draft-plugin-hashtag');
  });
  it('should render with themeStrategy output', () => {
    const rcvProps = getRCV({ theme: 'Default' }).props();
    expect(rcvProps).toHaveProperty('theme');
    expect(rcvProps).toHaveProperty('decorators');
    expect(rcvProps.theme).toHaveProperty('modalTheme');
  });
});
