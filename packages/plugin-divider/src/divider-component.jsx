import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import styles from './default-divider-styles.scss';

const DEFAULTS = {
  type: 'divider3',
  width: 100,
  config: {
    size: 'content',
    alignment: 'center',
  },
};

class DividerComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    const type = props.componentData.type || DEFAULTS.type;
    const width = props.componentData.width || DEFAULTS.width;
    return {
      type,
      width,
    };
  };

  onKeyDown = (e, handler) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handler();
    }
  };

  render() {
    const { className, style, onClick } = this.props;
    /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-element-interactions */
    return (
      <div
        style={{ width: this.state.width + '%', margin: 'auto', ...style }}
        data-hook="divider" onClick={onClick} onKeyDown={e => this.onKeyDown(e, onClick)}
        className={classNames(className, this.styles[this.state.type])} role="separator"
      />
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-element-interactions */

  }
}

DividerComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  style: PropTypes.string,
  onClick: PropTypes.func,
};

export { DividerComponent as Component, DEFAULTS };
