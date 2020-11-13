import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.jsx';
import TextToolbarButton from './TextToolbarButton';
import s from '../statics/styles/button-group.scss';

class FormattingGroupButton extends PureComponent {
  static propTypes = {
    isMobile: PropTypes.bool,
    tabIndex: PropTypes.number,
    buttons: PropTypes.array,
    activeItem: PropTypes.func,
    tooltip: PropTypes.string,
    dataHook: PropTypes.string,
    getButtonStyles: PropTypes.func,
    disableState: PropTypes.bool,
    isActive: PropTypes.func,
    isDisabled: PropTypes.func,
  };

  static defaultProps = {
    isActive: () => false,
    isDisabled: () => false,
    getButtonStyles: () => ({}),
  };

  constructor(props) {
    super(props);

    const { buttons } = props;
    const activeButton = buttons.filter(b => b.isActive())[0] || buttons[0];

    this.state = {
      isOpen: false,
      Icon: activeButton.getIcon(),
      isDisabled: activeButton.isDisabled,
    };
  }

  showOptions = () => this.setState({ isOpen: true });

  hideOptions = () => this.setState({ isOpen: false });

  onChange = ({ onClick, getIcon, isDisabled }) => e => {
    onClick(e);
    this.setState({ Icon: getIcon(), isOpen: false, isDisabled });
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
    const { tooltip, dataHook, getButtonStyles, disableState, isActive } = this.props;
    const { Icon, isDisabled, isOpen } = this.state;
    const disabled = disableState || isDisabled();
    return (
      <Tooltip content={tooltip} place="bottom" moveBy={{ y: -20 }}>
        <div className={s.button_group}>
          <button
            data-hook={dataHook}
            style={getButtonStyles({ disabled, active: isActive() })}
            disabled={disabled}
            onClick={this.showOptions}
          >
            <Icon />
          </button>
          {isOpen && this.renderOptions()}
        </div>
      </Tooltip>
    );
  }
}

export default FormattingGroupButton;
