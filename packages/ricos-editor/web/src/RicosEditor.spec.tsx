/* eslint-disable max-len */
import React from 'react';
import { RicosEditor } from './index';
import { pluginHashtag } from '../../../plugin-hashtag/web/src/editor';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { default as hebResource } from 'wix-rich-content-common/dist/statics/locale/messages_he.json';
import { RicosEngine } from 'ricos-viewer';

Enzyme.configure({ adapter: new Adapter() });
const { shallow } = Enzyme;

const plugins = [pluginHashtag()];

const getRicosEditor = (ricosEditorProps?: RicosEditorProps) =>
  shallow(<RicosEditor {...(ricosEditorProps || {})} />)
    .children()
    .last();

const getRicosEngine = (ricosEditorProps?: RicosEditorProps) =>
  getRicosEditor(ricosEditorProps)
    .dive()
    .instance();

const getChild = ricosElement => ricosElement.dive().children();
const getRCE = (ricosEditorProps?: RicosEditorProps) => getChild(getRicosEditor(ricosEditorProps));

describe('RicosEditor', () => {
  it('should render editor', () => {
    const element = getRicosEditor();
    expect(element).toBeTruthy();
  });
  it('should render editor with locale', () => {
    const element = getRicosEditor({ locale: 'he' });
    expect(element).toBeTruthy();
  });
  it('should render locale="en" if unspecified', () => {
    const ricosEditorProps = getRicosEditor().props();
    expect(ricosEditorProps).toHaveProperty('locale');
    expect(ricosEditorProps.locale).toEqual('en');
  });
  it('should render editor child if provided', () => {
    const ricosEditorProps = getRicosEditor().props();
    expect(ricosEditorProps).toHaveProperty('children');
    expect(ricosEditorProps.children.type.displayName).toEqual('RichContentEditor');
  });
  it('should render with pluginsStrategy output', () => {
    const rceProps = getRCE({ plugins }).props();
    expect(rceProps).toHaveProperty('config');
    expect(rceProps.config).toHaveProperty('wix-draft-plugin-hashtag');
  });
  it('should render with themeStrategy output', () => {
    const rceProps = getRCE({ theme: 'Default' }).props();
    expect(rceProps).toHaveProperty('theme');
    expect(rceProps.theme).toHaveProperty('modalTheme');
  });
  it('should call updateLocale on componentDidMount', () => {
    const ricosEngineInstance = getRicosEngine() as RicosEngine;
    const spyUpdate = spyOn(ricosEngineInstance, 'updateLocale');
    ricosEngineInstance.componentDidMount();
    expect(spyUpdate.calls.count()).toEqual(1);
  });
  it('should render localeStrategy in strategies', async () => {
    const ricosEngineInstance = getRicosEngine({ locale: 'he' }) as RicosEngine;
    await ricosEngineInstance.updateLocale();
    const renderResult = ricosEngineInstance.render();
    expect(renderResult.props).toMatchObject({
      locale: 'he',
      localeResource: hebResource,
    });
  });
});
