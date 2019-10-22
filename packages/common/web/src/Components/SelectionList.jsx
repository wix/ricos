import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/selection-list.scss';

function defaultDataMapper(item) {
  switch (typeof item) {
    case 'number':
      return { value: item, label: item.toString() };
    case 'string':
      return { value: item, label: item };
    case 'object':
      return item;
    default:
      return {};
  }
}

function defaultRenderItem({ option, selected }) {
  return (
    option &&
    option.value && (
      <SelectionListOption
        selected={selected}
        value={option.value}
        theme={{}}
        data-hook={option.value}
        onChange={() => {}}
      >
        {option.value}
      </SelectionListOption>
    )
  );
}

class SelectionList extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { focusIndex: -1 };
  }

  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    dataMapper: PropTypes.func,
    renderItem: PropTypes.func,
    theme: PropTypes.object.isRequired,
    className: PropTypes.string,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    optionClassName: PropTypes.string,
    readOnly: PropTypes.bool,
  };

  static defaultProps = {
    dataMapper: defaultDataMapper,
    renderItem: defaultRenderItem,
    readOnly: false,
  };

  mapItemToOptionData(item) {
    const option = this.props.dataMapper(item);
    return {
      item,
      option,
      selected: option.value === this.props.value,
    };
  }

  onKeyDown(event) {
    if (this.props.dataSource.length < 2 || this.props.readOnly) {
      return;
    }
    const index = this.state.focusIndex === -1 ? 0 : this.state.focusIndex;
    let nextIndex = -1;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = index === 0 ? this.props.dataSource.length - 1 : index - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % this.props.dataSource.length;
        break;
      case 'Tab':
        this.setState({ focusIndex: -1 });
        break;
      case ' ':
      case 'Enter':
        event.target.click();
        break;
      default:
        break;
    }

    if (nextIndex > -1) {
      this.setState({ focusIndex: nextIndex });
    }
  }

  render() {
    const {
      dataSource,
      className,
      onChange,
      renderItem,
      theme,
      optionClassName,
      readOnly,
    } = this.props;
    return (
      <div
        ref={el => (this.ref = el)}
        className={classnames(styles.selectionList, className)}
        role={'listbox'}
        aria-disabled={readOnly}
        aria-orientation={'horizontal'}
      >
        {dataSource
          .map(item => this.mapItemToOptionData(item))
          .map(({ item, option, selected }, i) => (
            <SelectionListOption
              tabIndex={i === 0 && !readOnly ? 0 : -1}
              selected={selected}
              focused={i === this.state.focusIndex}
              dataHook={item.dataHook}
              onChange={onChange}
              key={i}
              theme={theme}
              value={option.value}
              optionClassName={optionClassName}
              onKeyDown={e => this.onKeyDown(e)}
              readOnly={readOnly}
            >
              {renderItem({ item, option, selected })}
            </SelectionListOption>
          ))}
      </div>
    );
  }
}

class SelectionListOption extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    focused: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    value: PropTypes.any.isRequired,
    optionClassName: PropTypes.string,
    dataHook: PropTypes.string,
    tabIndex: PropTypes.number,
    onKeyDown: PropTypes.func,
    readOnly: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  componentDidUpdate() {
    if (this.props.focused) {
      this.ref.focus();
    }
  }

  render() {
    const {
      selected,
      onChange,
      children,
      value,
      optionClassName,
      dataHook,
      tabIndex,
      onKeyDown,
      readOnly,
    } = this.props;

    return (
      <div
        tabIndex={tabIndex}
        role={'option'}
        aria-selected={selected}
        aria-disabled={readOnly}
        ref={el => (this.ref = el)}
        onKeyDown={e => onKeyDown(e)}
        className={classnames(
          this.styles.selectionListOption,
          { [this.styles.selectionListOption_selected]: selected },
          optionClassName
        )}
        data-hook={dataHook}
        onClick={() => onChange(value)}
      >
        {children}
      </div>
    );
  }
}

export default SelectionList;
