import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { mergeStyles, isSSR } from 'wix-rich-content-common';
import styles from '../../statics/styles/dropdown.scss';
import DropdownArrowIcon from '../Icons/DropdownArrowIcon';

const DEFAULT_PLACEHOLDER_STRING = 'Select...';

class Dropdown extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.type,
        items: PropTypes.array,
        value: PropTypes.any.isRequired,
        label: PropTypes.string,
        icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    value: PropTypes.number,
    getValue: PropTypes.func,
    placeholder: PropTypes.string,
    onFocus: PropTypes.func,
    disabled: PropTypes.bool,
    dataHook: PropTypes.string,
    controlClassName: PropTypes.string,
    menuClassName: PropTypes.string,
    tabIndex: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: this.getCurrentValue(props),
      isOpen: false,
    };
    this.mounted = true;
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.id = `cmbx_${Math.floor(Math.random() * 9999)}`;
  }

  componentWillReceiveProps(newProps) {
    this.setState({ selected: this.getCurrentValue(newProps) });
  }

  componentDidMount() {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', this.handleDocumentClick, false);
      document.addEventListener('touchend', this.handleDocumentClick, false);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', this.handleDocumentClick, false);
      document.removeEventListener('touchend', this.handleDocumentClick, false);
    }
  }

  getCurrentValue(props) {
    if (typeof props.value !== 'undefined') {
      return props.value;
    } else if (typeof props.getValue === 'function') {
      return props.getValue();
    } else {
      return {
        label: props.placeholder || DEFAULT_PLACEHOLDER_STRING,
        value: '',
      };
    }
  }

  handleMouseDown = event => {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen);
    }
    if (event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  };

  setValue(value, label, component) {
    const newState = {
      selected: {
        value,
        label,
        component,
      },
      isOpen: false,
    };
    this.fireChangeEvent(newState);
    this.setState(newState);
  }

  fireChangeEvent = newState => {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected);
    }
  };

  renderOption(option) {
    const { styles } = this;
    const optionClass = classNames({
      [styles['Dropdown-option']]: true,
      [styles['Dropdown-option-selected']]: option === this.state.selected,
    });

    const { value, label, icon: Icon, component: OptionComponent } = option;

    return (
      <button
        key={value}
        className={optionClass}
        onMouseDown={this.setValue.bind(this, value, label, OptionComponent)}
        data-hook={`${label || value}_dropdown_option`}
        onClick={this.setValue.bind(this, value, label, OptionComponent)}
        role="option"
        aria-selected={option === this.state.selected}
        aria-label={label}
      >
        {Icon && <Icon className={styles['Dropdown-option-icon']} />}
        {label && <span className={styles['Dropdown-option-label']}>{label}</span>}
        {OptionComponent && <OptionComponent />}
      </button>
    );
  }

  buildMenu() {
    const { options } = this.props;
    const ops = options.map(option => {
      if (option.type === 'group') {
        const groupTitle = <div className={styles['Dropdown-title']}>{option.name}</div>;
        const _options = option.items.map(item => this.renderOption(item));

        return (
          <div className={styles['Dropdown-group']} key={option.name}>
            {groupTitle}
            {_options}
          </div>
        );
      } else {
        return this.renderOption(option);
      }
    });

    return ops.length ? ops : <div className={styles['Dropdown-noresults']}>No options found</div>;
  }

  handleDocumentClick = event => {
    if (this.mounted) {
      //eslint-disable-next-line
      if (!ReactDOM.findDOMNode(this)?.contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({ isOpen: false });
        }
      }
    }
  };

  render() {
    const { styles } = this;
    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
    const selected = this.state.selected;

    const placeHolderValue =
      typeof selected === 'string'
        ? selected
        : (() => {
            const label = selected.label || '';
            const Icon = selected.icon || null;
            const OptionComponent = selected.component || null;

            return (
              <span>
                {Icon ? <Icon className={styles['Dropdown-option-icon']} /> : null}
                {label && <span className={styles['Dropdown-option-label']}>{label}</span>}
                {OptionComponent && <OptionComponent />}
              </span>
            );
          })();
    const value = (
      <div className={styles['Dropdown-placeholder']} role="textbox">
        {placeHolderValue}
      </div>
    );
    const menu = this.state.isOpen ? (
      <div className={classNames(styles['Dropdown-menu'], this.props.menuClassName)} role="listbox">
        {this.buildMenu()}
      </div>
    ) : null;

    const dropdownClass = classNames(this.styles['Dropdown-root'], {
      [this.styles['Dropdown-root-isOpen']]: this.state.isOpen,
    });
    const { dataHook } = this.props;
    return (
      this.props.tabIndex > -1 && (
        <div className={dropdownClass}>
          <button
            role="combobox"
            aria-controls={isSSR ? undefined : `${this.id}_menu`}
            aria-expanded={this.state.isOpen}
            className={classNames(
              this.styles['Dropdown-control'],
              this.props.controlClassName,
              disabledClass
            )}
            data-hook={dataHook}
            onClick={this.handleMouseDown}
            onTouchEnd={this.handleMouseDown}
          >
            {value}
            <span
              className={classNames(this.styles['Dropdown-arrow'], {
                [this.styles['Dropdown-arrow-isOpen']]: this.state.isOpen,
              })}
            >
              <DropdownArrowIcon />
            </span>
          </button>
          {menu}
        </div>
      )
    );
  }
}

export default Dropdown;
