import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddPluginFloatingToolbar from './AddPluginFloatingToolbar';
import { version } from '../../../../package.json';

Enzyme.configure({ adapter: new Adapter() });
const { mount } = Enzyme;

describe('AddPluginFloatingToolbar', () => {
  it('should trigger "onMenuLoad" when clicked', () => {
    let params = {};
    const fn = jest.fn(args => (params = args));
    const moreButton = mount(
      <AddPluginFloatingToolbar helpers={{ onMenuLoad: fn }} structure={[]} t={() => ''} />
    );
    moreButton.instance().onClick({ preventDefault: () => '', stopPropagation: () => '' });
    expect(fn).toBeCalledTimes(1);
    expect(params).toStrictEqual({
      menu: 'SIDE',
      version,
    });
  });
});
