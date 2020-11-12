import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import Styles from './Toolbar.scss';
import ToolbarButton from './ToolbarButton.jsx';

class GroupButton extends PureComponent {
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
    theme: PropTypes.object,
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

  componentWillReceiveProps = nextProps => {
    const { buttons } = this.props;
    const activeButton = buttons.filter(b => b.isActive())[0] || buttons[0];
    const nextActiveButton = nextProps.buttons.filter(b => b.isActive())[0] || buttons[0];
    if (activeButton !== nextActiveButton) {
      this.setState({
        Icon: nextActiveButton.getIcon(),
        isDisabled: nextActiveButton.isDisabled,
      });
    }
  };

  toggleOptions = () => this.setState({ isOpen: !this.state.isOpen });

  hideOptions = () => this.setState({ isOpen: false });

  onChange = ({ onClick, getIcon, isDisabled }) => e => {
    onClick(e);
    this.setState({ Icon: getIcon(), isOpen: false, isDisabled });
  };

  renderOptions = () => {
    const { buttons, theme } = this.props;

    return (
      <div className={Styles.modal}>
        {buttons.map((props, i) => {
          const buttonProps = {
            ...this.props,
            shouldRefreshTooltips: () => this.state.isOpen,
            ...props,
            onClick: this.onChange(props),
          };
          return (
            <ToolbarButton
              key={i}
              onClick={this.onChange(props)}
              isActive={buttonProps.isActive()}
              theme={theme}
              dataHook={buttonProps.dataHook}
              isMobile={this.props.isMobile}
              tooltipText={buttonProps.tooltip}
              icon={buttonProps.getIcon()}
              disabled={buttonProps.isDisabled()}
              asGroupButton
            />
          );
        })}
      </div>
    );
  };

  render() {
    const {
      tooltip,
      dataHook,
      getButtonStyles,
      disableState,
      isActive,
      isMobile,
      tabIndex,
      theme,
    } = this.props;
    const { Icon, isDisabled, isOpen } = this.state;
    const disabled = disableState || isDisabled();
    return (
      <ClickOutside onClickOutside={this.hideOptions}>
        <div className={Styles.buttonWrapper}>
          <ToolbarButton
            isActive={isActive()}
            onClick={this.toggleOptions}
            showArrowIcon
            getButtonStyles={getButtonStyles}
            tooltipText={tooltip}
            dataHook={dataHook}
            tabIndex={tabIndex}
            isMobile={isMobile}
            disabled={disabled}
            icon={Icon}
            theme={theme}
          />
          {isOpen && this.renderOptions()}
        </div>
      </ClickOutside>
    );
  }
}

export default GroupButton;
