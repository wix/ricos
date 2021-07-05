import React, { useState } from 'react';
import styles from './styles.scss';

const Separator = () => <div className={styles.separator} />;

// const options = ['left', 'center', 'right'];

// const selected = () => console.log('On Select');
// const onSave = () => console.log('On Save');
// const onChange = () => console.log('On Change');
// const onCancel = () => console.log('On Change');

const MobilePanel = ({
  // selectedHeight,
  // styles,
  panelHeader,
  onChange,
  options,
  onSave,
  onCancel,
}) => {
  const [selected, setSelected] = useState<null | number | string>(null);
  const onClick = selected => {
    setSelected(selected);
    onChange(selected);
  };

  const lineHeightElement = (option, isSelected, showSeparator) => (
    <div>
      <button
        className={isSelected ? styles.mobilePanel_selectedLineHeight : ''}
        key={option}
        onClick={() => onClick(option)}
      >
        {option}
      </button>
      {showSeparator && <Separator />}
    </div>
  );

  return (
    <div className={styles.mobilePanel}>
      {/* t('LineSpacing_lineSpacing') */}
      <div className={styles.mobilePanel_header}>{panelHeader}</div>
      <Separator />
      <div className={styles.mobilePanel_heights}>
        {options.map((option, i) => {
          const isSelected = selected === option;
          const showSeparator = i !== options.length - 1;
          return lineHeightElement(option, isSelected, showSeparator);
        })}
      </div>
    </div>
  );
};

// function MobilePanel({ onCancel, t, options, isMobile = true }) {
//   //   const { onCancel, t, isMobile } = this.props;
//   //   const { isCustomPanel, spacing } = this.state;
//   //   const { styles, showCustomPanel, onChange, onSave } = this;
//   //   const selected =  alignement['line-height'];
//   const selected = () => console.log('On Select');
//   const onSave = () => console.log('On Save');
//   const onChange = () => console.log('On Change');
//   //   const onSaveLineHeight = height => onSave({ 'line-height': height });
//   //   const onChangeLineHeight = height => onChange({ 'line-height': height });
//   return (
//     <MobilePanel
//       {...{
//         styles,
//         selected,
//         t,
//         onChange,
//         onSave,
//         options,
//         onCancel,
//       }}
//     />
//   );
// }

export default MobilePanel;
