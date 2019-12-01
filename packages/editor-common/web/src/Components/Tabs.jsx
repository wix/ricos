import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/tabs.scss';

const tabPropTypes = {
  theme: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onTabSelected: PropTypes.func,
};

export class Tab extends Component {
  static propTypes = {
    ...tabPropTypes,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render = () =>
    this.props.selected && (
      <div
        role="tabpanel"
        key={this.props.value}
        aria-labelledby={`${this.props.value}_header`}
        id={`${this.props.value}_panel`}
        className={this.styles.tabs_panel}
      >
        {this.props.children}
      </div>
    );
}

export class Tabs extends Component {
  static propTypes = tabPropTypes;

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { activeTab: props.value };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.value !== this.state.activeTab) {
      this.setState({ activeTab: nextProps.value });
    }
  };

  getTabHeaders = tabs =>
    React.Children.map(tabs, tab => ({ label: tab.props.label, value: tab.props.value }));

  renderTabs = () =>
    React.Children.map(this.props.children, tab =>
      React.cloneElement(tab, {
        selected: this.state.activeTab === tab.props.value,
      })
    );

  render() {
    const { styles, props } = this;
    const headers = this.getTabHeaders(props.children);
    return (
      <div role="tablist" className={styles.tabs} aria-orientation="horizontal">
        <div className={styles.tabs_headers}>
          {headers.map(({ label, value }) => {
            const isSelected = value === this.state.activeTab;
            return (
              <button
                id={`${value}_header`}
                role="tab"
                tabIndex={0}
                name={`tabs`}
                key={value}
                className={classNames(styles.tabs_headers_option, {
                  [styles.tabs_headers_option_selected]: isSelected,
                })}
                data-hook={`${value}_Tab`}
                aria-controls={`${value}_panel`}
                aria-label={label}
                aria-selected={isSelected}
                onClick={() => {
                  this.setState({ activeTab: value });
                  if (this.props.onTabSelected) {
                    this.props.onTabSelected(value);
                  }
                  this.renderTabs();
                }}
              >
                <span className={this.styles.tabs_headers_option_label}>{label}</span>
              </button>
            );
          })}
        </div>
        {this.renderTabs()}
      </div>
    );
  }
}
