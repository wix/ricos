import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/table-settings-modal.scss';
import { TableSettingsCountSection } from '../components';
import { getDefaultsSettings } from '../defaults';
import { KEYS_CHARCODE } from 'wix-rich-content-editor-common';

export default class tableSettingsModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      rowCount: '4',
      colCount: '4',
    };
  }

  onCreateTableClicked = () => {
    const { colCount, rowCount, submittedInvalidCol, submittedInvalidRow } = this.state;
    if (colCount && rowCount && !submittedInvalidCol && !submittedInvalidRow) {
      const { componentData, pubsub, onConfirm, helpers } = this.props;
      const { config } = getDefaultsSettings(parseInt(rowCount), parseInt(colCount));
      if (onConfirm) {
        onConfirm({
          ...componentData,
          config,
        });
      } else {
        pubsub.update('componentData', { config });
      }
      helpers.closeModal();
    }
  };

  isNumber = n => /^[1-9][0-9]*$/.test(n);

  onColCountChange = colCount =>
    this.setState({
      colCount,
      submittedInvalidCol: colCount.length > 0 && !this.isNumber(colCount),
    });

  onRowCountChange = rowCount =>
    this.setState({
      rowCount,
      submittedInvalidRow: rowCount.length > 0 && !this.isNumber(rowCount),
    });

  setCreateTableButtonRef = ref => (this.createTableButton = ref);

  onKeyUp = e => e.keyCode === KEYS_CHARCODE.ENTER && this.onCreateTableClicked();

  render() {
    const { styles } = this;
    const { colCount, rowCount, submittedInvalidCol, submittedInvalidRow } = this.state || {};
    return (
      <div>
        <div className={styles.title}>Table Configuration</div>
        <div className={styles.subtitle}>You can customize the number of rows & columns</div>
        <div className={styles.tableConfig}>
          <TableSettingsCountSection
            title={'Column Count'}
            theme={this.props.theme}
            input={colCount}
            onCountChange={this.onColCountChange}
            errorMessage={'count should be a number greater then 0'}
            submittedInvalidInput={submittedInvalidCol}
            dataHook={'columnCount'}
          />
          <TableSettingsCountSection
            title={'Row Count'}
            theme={this.props.theme}
            input={rowCount}
            onCountChange={this.onRowCountChange}
            errorMessage={'count should be a number greater then 0'}
            submittedInvalidInput={submittedInvalidRow}
            dataHook={'rowCount'}
          />
        </div>
        {/*eslint-disable-next-line*/}
        <div
          tabIndex="0" //eslint-disable-line
          className={styles.submit}
          onClick={this.onCreateTableClicked}
          onKeyUp={this.onKeyUp}
          data-hook={'createTableButton'}
        >
          Create Table
        </div>
        {/*eslint-disable-next-line*/}
        <div tabIndex="0" />
      </div>
    );
  }
}

tableSettingsModal.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  pubsub: PropTypes.object,
  onConfirm: PropTypes.func,
  helpers: PropTypes.object,
};
