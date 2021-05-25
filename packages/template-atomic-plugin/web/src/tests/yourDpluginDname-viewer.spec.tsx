import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import YourPluginNameViewer from '../yourDpluginDname-viewer';

Enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = Enzyme;

const createYourPluginName = props => shallow(<YourPluginNameViewer {...props} />);

describe('YourPluginName - Viewer', () => {
  it('should render container', () => {
    const viewer = createYourPluginName({});
    expect(viewer.dive()).toBeFalsy();
  });
});
