import React from 'react';
import PropTypes from 'prop-types';
import AccordionViewer from './accordion-viewer';
import { ACCORDION_TYPE } from './types';
import { DEFAULTS } from './defaults';

class AccordionComponent extends React.Component {
  static type = { ACCORDION_TYPE };
  render() {
    const { componentData, settings } = this.props;
    return <AccordionViewer componentData={componentData} settings={settings} />;
  }
}

AccordionComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export { AccordionComponent as Component, DEFAULTS };
