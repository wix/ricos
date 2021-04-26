import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/table-settings-modal.scss';
import TableSettingsCountSection from './TableSettingsCountSection';
import { getDefaultsSettings, isCellsNumberInvalid } from '../tableUtil';
import { KEYS_CHARCODE } from 'wix-rich-content-editor-common';
import { CloseIcon } from '../icons';

export default class tableSettingsModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      rowCount: '4',
      colCount: '4',
    };
  }

  componentDidMount() {
    this.colsInput?.focus();
  }

  onCreateTableClicked = () => {
    const {
      colCount,
      rowCount,
      submittedInvalidCol,
      submittedInvalidRow,
      invalidCellNum,
    } = this.state;
    if (!invalidCellNum && colCount && rowCount && !submittedInvalidCol && !submittedInvalidRow) {
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

  isCellsNumberInvalid = (rows, cols) =>
    this.isNumber(rows) && this.isNumber(cols) && isCellsNumberInvalid(cols, rows);

  onColCountChange = colCount =>
    this.setState({
      colCount,
      submittedInvalidCol: colCount.length > 0 && !this.isNumber(colCount),
      invalidCellNum: this.isCellsNumberInvalid(this.state.rowCount, colCount),
    });

  onRowCountChange = rowCount =>
    this.setState({
      rowCount,
      submittedInvalidRow: rowCount.length > 0 && !this.isNumber(rowCount),
      invalidCellNum: this.isCellsNumberInvalid(rowCount, this.state.colCount),
    });

  setCreateTableButtonRef = ref => (this.createTableButton = ref);

  onKeyUp = e => e.keyCode === KEYS_CHARCODE.ENTER && this.onCreateTableClicked();

  setInputRef = ref => (this.colsInput = ref);

  render() {
    const { styles } = this;
    const {
      colCount,
      rowCount,
      submittedInvalidCol,
      submittedInvalidRow,
      invalidCellNum,
    } = this.state;
    const { isMobile, helpers, t } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onKeyUp={this.onKeyUp}>
        {isMobile && (
          // eslint-disable-next-line
          <div onClick={helpers.closeModal} className={styles.closeButton}>
            <CloseIcon />
          </div>
        )}
        <div className={styles.title}>{t('TablePlugin_SettingsModal_Title')}</div>
        <div className={styles.subtitle}>{t('TablePlugin_SettingsModal_SubTitle')}</div>
        <div className={styles.tableConfig}>
          <TableSettingsCountSection
            title={t('TablePlugin_SettingsModal_ColCount')}
            theme={this.props.theme}
            input={colCount}
            onCountChange={this.onColCountChange}
            error={
              (submittedInvalidCol || invalidCellNum) && t('TablePlugin_SettingsModal_ErrorMessage')
            }
            dataHook={'columnCount'}
            showErrorIcon={!invalidCellNum}
            setInputRef={this.setInputRef}
          />
          <TableSettingsCountSection
            title={t('TablePlugin_SettingsModal_RowCount')}
            theme={this.props.theme}
            input={rowCount}
            onCountChange={this.onRowCountChange}
            error={
              (submittedInvalidRow || invalidCellNum) && t('TablePlugin_SettingsModal_ErrorMessage')
            }
            dataHook={'rowCount'}
            showErrorIcon={!invalidCellNum}
          />
          {invalidCellNum && (
            <div className={styles.errorMsg}>{t('TablePlugin_SettingsModal_limitError')}</div>
          )}
          <div
            tabIndex="0" //eslint-disable-line
            className={styles.submit}
          >
            <button onClick={this.onCreateTableClicked} data-hook={'createTableButton'}>
              {t('TablePlugin_SettingsModal_CreateTable_Button')}
            </button>
          </div>
        </div>
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
  isMobile: PropTypes.bool,
};
