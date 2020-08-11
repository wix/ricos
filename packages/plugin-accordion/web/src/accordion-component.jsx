import React from 'react';
import PropTypes from 'prop-types';
import AccordionViewer from './accordion-viewer';
import { DEFAULTS, NEW_PAIR, NEW_PAIR_DATA } from './defaults';

class AccordionComponent extends React.Component {
  onChange = (id, data) => {
    if (id === NEW_PAIR) {
      this.insertNewPair();
    } else {
      this.updateExistedPair(id, data);
    }
  };

  insertNewPair = () => {
    const {
      block,
      store,
      componentData: {
        config: { pairs },
      },
    } = this.props;

    const key = Object.keys(pairs).length + 1;
    const componentData = { config: { pairs: { ...pairs, [key]: NEW_PAIR_DATA } } };
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
    const { componentData, blockProps, setInPluginEditingMode, theme, t } = this.props;

    return (
      <AccordionViewer
        componentData={componentData}
        setFocusToBlock={blockProps.setFocusToBlock}
        setInPluginEditingMode={setInPluginEditingMode}
        onChange={this.onChange}
        isPluginFocused={this.isPluginFocused()}
        theme={theme}
        t={t}
      />
    );
  }
}

AccordionComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  setInPluginEditingMode: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export { AccordionComponent as Component, DEFAULTS };
