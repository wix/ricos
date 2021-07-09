/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';
import NewMobilePanel from './MobilePanel';

const Separator = () => <div className={styles.separator} />;

const LineHeightsPanel = ({
  currentSelect,
  options,
  onClick,
  showCustomPanel,
  styles,
  panelHeader,
  hasCustomPanel,
}) => {
  const lineHeightElement = (option, isSelected, onClick) => (
    <button
      className={isSelected ? styles.lineHeightsPanel_selectedLineHeight : ''}
      key={option.commandKey}
      onClick={() => onClick(option.commandKey)}
    >
      {option.icon ? option.icon : option.text}
    </button>
  );

  return (
    <div className={styles.lineHeightsPanel}>
      {options.map(option =>
        lineHeightElement(
          option,
          (currentSelect['line-height'] ?? currentSelect) === option.commandKey,
          onClick
        )
      )}
      {hasCustomPanel && (
        <>
          <Separator />
          <button onClick={showCustomPanel}>{panelHeader}</button>
        </>
      )}
    </div>
  );
};

// const MobilePanel = ({ selectedHeight, styles, t, onChange, onSave, onCancel }) => {
//   const lineHeightElement = (height, isSelected, onClick, showSeparator) => (
//     <div>
//       <button
//         className={isSelected ? styles.lineSpacingMobilePanel_selectedLineHeight : ''}
//         key={height}
//         onClick={() => onClick(`${height}`)}
//       >
//         {height}
//       </button>
//       {showSeparator && <Separator />}
//     </div>
//   );

//   const lineHeights = [1, 1.5, 2, 2.5, 3];
//   return (
//     <div className={styles.lineSpacingMobilePanel}>
//       <div className={styles.lineSpacingMobilePanel_header}>{t('LineSpacing_lineSpacing')}</div>
//       <Separator />
//       <div className={styles.lineSpacingMobilePanel_heights}>
//         {lineHeights.map((height, i) => {
//           const selected = parseFloat(selectedHeight) === height;
//           const showSeparator = i !== lineHeights.length - 1;
//           return lineHeightElement(height, selected, onChange, showSeparator);
//         })}
//       </div>
//       {/* <Separator /> */}
//       {/* <div className={styles.lineSpacingMobilePanel_buttons}>
//         <button onClick={onCancel}>{t('LineSpacing_cancel')}</button>
//         <button onClick={() => onSave()}>{t('LineSpacing_save')}</button>
//       </div> */}
//     </div>
//   );
// };

const LabeledInput = ({
  label,
  name,
  unit = '',
  defaultValue = 0,
  spacing,
  onChange,
  min,
  max,
}) => {
  const value = spacing[name] === undefined ? defaultValue : parseFloat(spacing[name]);
  return (
    <label className={styles.customSpacingPanel_labeledInput}>
      <span>{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={e => {
          onChange({ [name]: Number(e.target.value) + unit });
        }}
        onMouseDown={event => event.stopPropagation()}
      />
    </label>
  );
};

const CustomPanel = ({ selected, onChange, onSave, onCancel, styles, t }) => {
  return (
    <div className={styles.customSpacingPanel}>
      <LabeledInput
        label={t('LineSpacing_lineSpacing')}
        name="line-height"
        defaultValue={1.5}
        onChange={onChange}
        spacing={selected}
        min={1}
        max={100}
      />
      <Separator />
      <LabeledInput
        label={t('LineSpacing_beforeParagraph')}
        name="padding-top"
        unit="px"
        onChange={onChange}
        spacing={selected}
        min={0}
        max={250}
      />
      <LabeledInput
        label={t('LineSpacing_afterParagraph')}
        name="padding-bottom"
        unit="px"
        onChange={onChange}
        spacing={selected}
        min={0}
        max={250}
      />
      <div className={styles.customSpacingPanel_buttons}>
        <button onClick={onCancel}>{t('LineSpacing_cancel')}</button>
        <button onClick={() => onSave()}>{t('LineSpacing_save')}</button>
      </div>
    </div>
  );
};

export default class NewPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: props.currentSelect };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  showCustomPanel = () => {
    this.setState({ isCustomPanel: true });
  };

  onBlur = e => {
    const { target, relatedTarget, currentTarget } = e;
    if (!currentTarget.contains(relatedTarget)) {
      setTimeout(() => target.focus());
    }
  };

  onChange = spacing => {
    const merged = { ...this.state.selected, ...spacing };
    this.setState({ selected: merged });
    this.props.onChange(merged);
  };

  onSave = spacing => {
    this.props.onSave({ ...this.state.selected, ...spacing });
  };

  render() {
    const {
      onCancel,
      t,
      isMobile,
      options,
      panelHeader,
      currentSelect,
      // onChange,
      // onSave,
      hasCustomPanel,
    } = this.props;
    const { isCustomPanel, selected } = this.state;
    const { styles, showCustomPanel } = this;
    // const selectedHeight = spacing['line-height'];//!TODO selected row
    const onSaveLineHeight = height => onSave({ 'line-height': height });
    const onChangeLineHeight = height => onChange({ 'line-height': `${height}` });
    // console.log('props ', this.props);
    // const onChangeLineHeight = selected => onChange({ currentSelect: `${selected}` });
    // const options = [1, 1.5, 2, 2.5, 3];
    const onChange = hasCustomPanel ? this.onChange : this.props.onChange;
    const onSave = hasCustomPanel ? this.onSave : this.props.onSave;

    const panel = isMobile ? (
      <NewMobilePanel
        {...{
          // styles,
          // selectedHeight,
          currentSelect,
          panelHeader,
          options,
          onChange: hasCustomPanel ? onChangeLineHeight : onChange,
          onSave,
          onCancel,
        }}
      />
    ) : isCustomPanel ? (
      <CustomPanel
        {...{
          selected,
          onChange,
          onSave,
          onCancel,
          styles,
          t,
          isMobile,
        }}
      />
    ) : (
      <LineHeightsPanel
        {...{
          currentSelect,
          options,
          showCustomPanel,
          panelHeader,
          onClick: hasCustomPanel ? onSaveLineHeight : onChange,
          styles,
          hasCustomPanel,
        }}
      />
    );

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        onBlur={this.onBlur}
        className={classNames(styles.lineSpacingContainer, {
          [styles.lineSpacingContainer_mobile]: isMobile,
        })}
      >
        {panel}
      </div>
    );
  }
}

NewPanel.propTypes = {
  isMobile: PropTypes.bool,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onCustomPanel: PropTypes.func,
  onSave: PropTypes.func,
  showCustomPanel: PropTypes.func,
  currentSelect: PropTypes.string,
  options: PropTypes.array,
  panelHeader: PropTypes.string,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

// NewPanel.defaultProps = { spacing: {} };

CustomPanel.propTypes = {
  isMobile: PropTypes.bool,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  spacing: PropTypes.object,
  styles: PropTypes.object,
  t: PropTypes.func,
};

LabeledInput.propTypes = {
  defaultValue: PropTypes.number,
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  spacing: PropTypes.object,
  unit: PropTypes.string,
};

LineHeightsPanel.propTypes = {
  onSave: PropTypes.func,
  currentSelect: PropTypes.string,
  panelHeader: PropTypes.string,
  options: PropTypes.Array,
  selectedHeight: PropTypes.any,
  showCustomPanel: PropTypes.func,
  styles: PropTypes.object,
  t: PropTypes.func.isRequired,
};

// MobilePanel.propTypes = {
//   onCancel: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   onSave: PropTypes.func.isRequired,
//   selectedHeight: PropTypes.string.isRequired,
//   styles: PropTypes.object.isRequired,
//   t: PropTypes.func.isRequired,
// };
