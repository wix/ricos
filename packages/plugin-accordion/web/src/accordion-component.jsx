import React from 'react';
import PropTypes from 'prop-types';
import AccordionViewer from './accordion-viewer';
import { DEFAULTS, NEW_PAIR } from './defaults';

class AccordionComponent extends React.Component {
  onChange = (id, data) => {
    if (id === NEW_PAIR) {
      this.insertNewPair(data);
    } else {
      this.updateExistedPair(id, data);
    }
  };

  insertNewPair = data => {
    const {
      block,
      store,
      componentData: {
        config: { pairs },
      },
    } = this.props;

    const key = Object.keys(pairs).length + 1;
    const componentData = { config: { pairs: { ...pairs, [key]: { ...data } } } };
    store.update('componentData', componentData, block.getKey());
  };

  updateExistedPair = (id, data) => {
    const {
      block,
      store,
      componentData: {
        config: {
          pairs: { [id]: pair },
        },
      },
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

  isPluginFocused() {
    const blockKey = this.props.block.getKey();
    const selectedBlockKey = this.props.selection.getAnchorKey();

    return blockKey === selectedBlockKey;
  }

  render() {
    const { componentData, blockProps, setInPluginEditingMode } = this.props;

    return (
      <AccordionViewer
        componentData={componentData}
        setFocusToBlock={blockProps.setFocusToBlock}
        setInPluginEditingMode={setInPluginEditingMode}
        onChange={this.onChange}
        isPluginFocused={this.isPluginFocused()}
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
  selection: PropTypes.object,
};

export { AccordionComponent as Component, DEFAULTS };
