import React from 'react';
import PropTypes from 'prop-types';
import AccordionViewer from './accordion-viewer';
import { DEFAULTS } from './defaults';

class AccordionComponent extends React.Component {
  onChange = (id, data) => {
    const {
      componentData: {
        config: {
          pairs: { [id]: pair },
        },
      },
      block,
      store,
    } = this.props;

    const componentData = { config: { pairs: { [id]: { ...pair, ...data } } } };
    store.update('componentData', componentData, block.getKey());
  };

  handleIconStyleChange = iconStyle => {
    const {
      componentData: {
        config: { settings },
      },
      block,
      store,
    } = this.props;

    const componentData = { config: { settings: { ...settings, iconStyle } } };
    store.update('componentData', componentData, block.getKey());
  };

  render() {
    const { componentData, blockProps, setInPluginEditingMode } = this.props;

    return (
      <AccordionViewer
        componentData={componentData}
        setFocusToBlock={blockProps.setFocusToBlock}
        setInPluginEditingMode={setInPluginEditingMode}
        onChange={this.onChange}
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
