import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import { Tooltip } from 'wix-rich-content-editor-common';
import createTextToolbarButton from './createTextToolbarButton';
import styles from './button-group.scss';

export default ({ buttons, activeItem, tooltip, dataHook }) =>
  class TextDropdownButton extends PureComponent {
    static propTypes = {
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      tabIndex: PropTypes.number,
    };

    constructor(props) {
      super(props);
      this.state = { isOpen: false, Icon: activeItem() };
    }

    showOptions = () => this.setState({ isOpen: true });

    hideOptions = () => this.setState({ isOpen: false });

    onChange = ({ onClick, getIcon }) => e => {
      onClick(e);
      this.setState({ Icon: getIcon(), isOpen: false });
    };

    renderOptions = () => {
      const buttonProps = {
        ...this.props,
        shouldRefreshTooltips: () => this.state.isOpen,
      };
      return (
        <ClickOutside onClickOutside={this.hideOptions} className={styles.button_group}>
          {buttons.map((props, i) => {
            const Button = createTextToolbarButton({ ...props, onClick: this.onChange(props) });
            return <Button key={i} tabIndex="0" {...buttonProps} />;
          })}
        </ClickOutside>
      );
    };

    render() {
      const { Icon } = this.state;
      return (
        <Tooltip content={tooltip} place="bottom" moveBy={{ y: -20 }}>
          <div>
            <button onClick={this.showOptions}>
              <Icon />
            </button>
            {this.state.isOpen && this.renderOptions()}
          </div>
        </Tooltip>
      );
    }
  };
