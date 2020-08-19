import React from 'react';
import PropTypes from 'prop-types';
import TableViewer from './table-viewer';
import { TABLE_TYPE } from './types';
import { DEFAULTS } from './defaults';

class TableComponent extends React.Component {
  static type = { TABLE_TYPE };
  render() {
    const { componentData, settings } = this.props;
    return <TableViewer componentData={componentData} settings={settings} />;
  }
}

TableComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export { TableComponent as Component, DEFAULTS };
