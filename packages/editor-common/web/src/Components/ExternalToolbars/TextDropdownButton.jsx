import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import Tooltip from '../Tooltip';
import TextToolbarButton from './TextToolbarButton';
import s from './button-group.scss';

class TextDropdownButton extends PureComponent {
  static propTypes = {
    isMobile: PropTypes.bool,
    tabIndex: PropTypes.number,
    buttons: PropTypes.array,
    activeItem: PropTypes.func,
    tooltip: PropTypes.any,
    dataHook: PropTypes.string,
    styles: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const { buttons } = props;
    const activeButton = buttons.filter(b => b.isActive())[0] || buttons[0];

    this.state = {
      isOpen: false,
      Icon: activeButton.getIcon(),
    };
  }

  showOptions = () => this.setState({ isOpen: true });

  hideOptions = () => this.setState({ isOpen: false });

  onChange = ({ onClick, getIcon }) => e => {
    onClick(e);
    this.setState({ Icon: getIcon(), isOpen: false });
  };

  renderOptions = () => {
    const { buttons } = this.props;

    return (
      <ClickOutside onClickOutside={this.hideOptions} className={s.group_buttons}>
        {buttons.map((props, i) => {
          const buttonProps = {
            ...this.props,
            shouldRefreshTooltips: () => this.state.isOpen,
            ...props,
            onClick: this.onChange(props),
          };
          return <TextToolbarButton key={i} tabIndex="0" {...buttonProps} />;
        })}
      </ClickOutside>
    );
  };

  render() {
    const { tooltip, dataHook, styles } = this.props;
    const { Icon } = this.state;
    return (
      <Tooltip content={tooltip} place="bottom" moveBy={{ y: -20 }}>
        <div className={s.button_group} style={styles}>
          <button onClick={this.showOptions} data-hook={dataHook}>
            <Icon />
          </button>
          {this.state.isOpen && this.renderOptions()}
        </div>
      </Tooltip>
    );
  }
}

export default TextDropdownButton;
