/* eslint-disable max-len */
import React from 'react';
import { RicosEditor } from './index';
import { RicosViewer } from './viewer';
import { pluginHashtag } from '../../../plugin-hashtag/web/src/editor';
import introState from '../../../../e2e/tests/fixtures/intro.json';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { default as hebResource } from 'wix-rich-content-common/dist/statics/locale/messages_he.json';
import './types';

Enzyme.configure({ adapter: new Adapter() });
const { shallow } = Enzyme;

const ricos = (ricosProps?: any) => ({
  withEditor: (editorProps?: RichContentProps) => (
    <RicosEditor {...(ricosProps || {})} {...(editorProps || {})} />
  ),
  withViewer: (viewerProps?: RichContentProps) => (
    <RicosViewer {...(ricosProps || {})} {...(viewerProps || { contentState: introState })} />
  ),
});

// eslint-disable-next-line no-unused-vars
const plugins = [pluginHashtag()];

const getRicosEditor = ricos =>
  shallow(ricos)
    .children()
    .last();
const getRicosViewer = ricos => shallow(ricos);

const getChild = ricosElement => ricosElement.dive().children();
const getRCE = ricos => getChild(getRicosEditor(ricos));
const getRCV = ricos => getChild(getRicosViewer(ricos));

describe('Ricos', () => {
  it('should render editor', () => {
    const element = shallow(ricos().withEditor());
    expect(element).toBeTruthy();
  });

  it('should render editor with locale', () => {
    const element = shallow(ricos({ locale: 'he' }).withEditor());
    expect(element).toBeTruthy();
  });

  it('should render viewer', () => {
    const element = shallow(ricos().withViewer());
    expect(element).toBeTruthy();
  });

  describe('Editor', () => {
    it('should render locale="en" if unspecified', () => {
      const ricosEditorProps = getRicosEditor(ricos().withEditor()).props();
      expect(ricosEditorProps).toHaveProperty('locale');
      expect(ricosEditorProps.locale).toEqual('en');
    });
    it('should render editor child if provided', () => {
      const ricosEditorProps = getRicosEditor(ricos().withEditor()).props();
      expect(ricosEditorProps).toHaveProperty('children');
      expect(ricosEditorProps.children.type.displayName).toEqual('RichContentEditor');
    });
    it('should render with pluginsStrategy output', () => {
      const rceProps = getRCE(ricos({ plugins }).withEditor()).props();
      expect(rceProps).toHaveProperty('config');
      expect(rceProps.config).toHaveProperty('wix-draft-plugin-hashtag');
    });
    it('should render with themeStrategy output', () => {
      const rceProps = getRCE(ricos({ theme: 'Default' }).withEditor()).props();
      expect(rceProps).toHaveProperty('theme');
      expect(rceProps.theme).toHaveProperty('modalTheme');
    });
    it('should call updateLocale on componentDidMount', () => {
      const ricosElement = getRicosEditor(ricos().withEditor());
      const instance = ricosElement.dive().instance();
      const spyUpdate = spyOn(instance, 'updateLocale');
      instance.componentDidMount();
      expect(spyUpdate.calls.count()).toEqual(1);
    });
    it('should render localeStrategy in strategies', async () => {
      const ricosElement = getRicosEditor(ricos({ locale: 'he' }).withEditor());
      const instance = ricosElement.dive().instance();
      await instance.updateLocale();
      const renderResult = instance.render();
      expect(renderResult.props).toMatchObject({
        locale: 'he',
        localeResource: hebResource,
      });
    });
  });

  describe('Viewer', () => {
    it('should render locale="en" if unspecified', () => {
      const ricosViewerProps = getRicosViewer(ricos().withViewer()).props();
      expect(ricosViewerProps).toHaveProperty('locale');
      expect(ricosViewerProps.locale).toEqual('en');
    });
    it('should render viewer child if provided', () => {
      const ricosViewerProps = getRicosViewer(ricos().withViewer()).props();
      expect(ricosViewerProps).toHaveProperty('children');
      expect(ricosViewerProps.children.type.displayName).toEqual('RichContentViewer');
    });
    it('should render with pluginsStrategy output', () => {
      const rcvProps = getRCV(ricos({ plugins }).withViewer()).props();
      expect(rcvProps).toHaveProperty('config');
      expect(rcvProps.config).toHaveProperty('wix-draft-plugin-hashtag');
    });
    it('should render with themeStrategy output', () => {
      const rcvProps = getRCV(ricos({ theme: 'Default' }).withViewer()).props();
      expect(rcvProps).toHaveProperty('theme');
      expect(rcvProps).toHaveProperty('decorators');
      expect(rcvProps.theme).toHaveProperty('modalTheme');
    });
  });
});
