import React from 'react';
import styles from './styles.scss';

const Separator = () => <div className={styles.separator} />;

const MobilePanel = ({ selected, styles, t, onChange, onSave, onCancel }) => {
  const lineHeightElement = (height, isSelected, onClick, showSeparator) => (
    <div>
      <button
        className={isSelected ? styles.lineSpacingMobilePanel_selectedLineHeight : ''}
        key={height}
        onClick={() => onClick(`${height}`)}
      >
        {height}
      </button>
      {showSeparator && <Separator />}
    </div>
  );

  const alignments = ['left', 'center', 'right'];
  return (
    <div className={styles.lineSpacingMobilePanel}>
      {/* <div className={styles.lineSpacingMobilePanel_header}>{t('LineSpacing_lineSpacing')}</div> */}
      <Separator />
      <div className={styles.lineSpacingMobilePanel_heights}>
        {alignments.map((alignment, i) => {
          const selected = alignment;
          const showSeparator = i !== alignments.length - 1;
          return lineHeightElement(alignment, selected, onChange, showSeparator);
        })}
      </div>
    </div>
  );
};

function AlignmentPanel({ onCancel, t, isMobile }) {
  //   const { onCancel, t, isMobile } = this.props;
  //   const { isCustomPanel, spacing } = this.state;
  //   const { styles, showCustomPanel, onChange, onSave } = this;
  //   const selected =  alignement['line-height'];
  const selected = () => undefined;
  const onSave = () => undefined;
  const onChange = () => undefined;
  //   const onSaveLineHeight = height => onSave({ 'line-height': height });
  //   const onChangeLineHeight = height => onChange({ 'line-height': height });
  return (
    <MobilePanel
      {...{
        styles,
        selected,
        t,
        onChange,
        onSave,
        onCancel,
      }}
    />
  );
}

export default AlignmentPanel;
