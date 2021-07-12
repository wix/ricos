/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';
import NewMobilePanel from './MobilePanel';
import CustomPanel from '../line-spacing/CustomPanel';

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
  const hasIcons = !!options[0].icon;
  const lineHeightElement = (option, isSelected, onClick) => {
    return (
      <button
        className={isSelected ? styles.lineHeightsPanel_selectedLineHeight : ''}
        key={option.commandKey}
        onClick={() => onClick(option.commandKey)}
      >
        {hasIcons ? option.icon : option.text}
      </button>
    );
  };

  return (
    <div
      className={classNames(styles.lineHeightsPanel, {
        [styles.lineHeightsPanel_withIcons]: hasIcons,
      })}
    >
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

  onCustomPanelChange = spacing => {
    const merged = { ...this.state.selected, ...spacing };
    this.setState({ selected: merged });
    this.props.onChange(merged);
  };

  onCustomPanelSave = spacing => {
    this.props.onSave({ ...this.state.selected, ...spacing });
  };

  onSaveHeading = (type, headingName) => {
    this.props?.onToolbarButtonClick?.(type);
    return this.props.onSave(type);
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
      modalType,
    } = this.props;
    const { isCustomPanel, selected } = this.state;
    const { styles, showCustomPanel, onCustomPanelChange, onCustomPanelSave, onSaveHeading } = this;
    const onSaveLineHeight = height => onCustomPanelSave({ 'line-height': height });
    const onChangeLineHeight = height => onCustomPanelChange({ 'line-height': `${height}` });
    const isHeadingsModal = modalType === 'HEADINGS';
    const onLineClick = hasCustomPanel
      ? onChangeLineHeight
      : isHeadingsModal
      ? onSaveHeading
      : this.props.onChange;

    const defaultHeadings = () => {
      const { experiments } = this.context;
      const defaults = [...options];
      if (experiments?.useHeadingOne?.enabled) {
        defaults.splice(1, 0, this.props.headingOne);
      }
      return defaults;
    };

    const panel = isMobile ? (
      <NewMobilePanel
        {...{
          // styles,
          // selectedHeight,
          currentSelect,
          panelHeader,
          options: isHeadingsModal ? defaultHeadings() : options,
          onChange: onLineClick,
          onSave: hasCustomPanel ? onSaveLineHeight : this.props.onSave,
          onCancel,
        }}
      />
    ) : isCustomPanel ? (
      <CustomPanel
        {...{
          spacing: selected,
          onChange: onCustomPanelChange,
          onSave: onCustomPanelSave,
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
          options: isHeadingsModal ? defaultHeadings() : options,
          showCustomPanel,
          panelHeader,
          onClick: onLineClick,
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

// LabeledInput.propTypes = {
//   defaultValue: PropTypes.number,
//   label: PropTypes.string,
//   max: PropTypes.number,
//   min: PropTypes.number,
//   name: PropTypes.string,
//   onChange: PropTypes.func,
//   spacing: PropTypes.object,
//   unit: PropTypes.string,
// };

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
