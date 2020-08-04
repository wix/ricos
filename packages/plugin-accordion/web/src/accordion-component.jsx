import React from 'react';
import PropTypes from 'prop-types';
import AccordionViewer from './accordion-viewer';
import { ACCORDION_TYPE } from './types';
import { DEFAULTS } from './defaults';

class AccordionComponent extends React.Component {
  static type = { ACCORDION_TYPE };
  // constructor(props) {
  //   super(props);
  // }

  handleTextChange = (key, data) => {
    const {
      componentData: {
        config: {
          pairs: { [key]: pair },
        },
      },
      block,
      store,
    } = this.props;

    const componentData = { config: { pairs: { [key]: { ...pair, ...data } } } };
    store.update('componentData', componentData, block.getKey());
  };

  handleIconStyleChange = iconStyle => {
    const {
      componentData: { config },
      block,
      store,
    } = this.props;
    store.update('componentData', { config: { ...config, iconStyle } }, block.getKey());
  };

  render() {
    const { componentData, settings, blockProps, setInPluginEditingMode } = this.props;
    return (
      <AccordionViewer
        componentData={componentData}
        settings={settings}
        setFocusToBlock={blockProps.setFocusToBlock}
        setInPluginEditingMode={setInPluginEditingMode}
        onTextChange={this.handleTextChange}
      />
    );
  }
}

AccordionComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  blockProps: PropTypes.object,
  setInPluginEditingMode: PropTypes.func,
  block: PropTypes.object,
  store: PropTypes.object,
  theme: PropTypes.object,
};

export { AccordionComponent as Component, DEFAULTS };
