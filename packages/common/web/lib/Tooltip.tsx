/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { ReactElement } from 'react';
import { getTooltipStyles } from './tooltipStyles';
import ToolTip from 'react-portal-tooltip';
import { GlobalContext } from '../src/Utils/contexts';

declare global {
  interface Window {
    richContentHideTooltips: boolean;
  }
}

interface Props {
  content: string;
  tooltipOffset?: { x: number; y: number };
  children: ReactElement;
  isError?: boolean;
  place?: 'top' | 'bottom' | 'left' | 'right';
  followMouse?: boolean;
  hideArrow?: boolean;
}

class Tooltip extends React.Component<Props> {
  static defaultProps = {
    isError: false,
    place: 'top',
    tooltipOffset: { x: 0, y: 0 },
  };

  disabled: boolean;
  mousePosition: { x: number; y: number };
  timeoutId: NodeJS.Timeout;

  state = {
    tooltipVisible: false,
  };

  static contextType = GlobalContext;

  componentDidUpdate() {
    this.disabled = window.richContentHideTooltips; //used to hide tooltips in tests
  }

  componentWillUnmount() {
    this.hideTooltip();
  }

  showTooltip = (e: MouseEvent) => {
    if (!(e.target as HTMLButtonElement).disabled) {
      this.mousePosition = { x: e.clientX, y: e.clientY };

      this.timeoutId = setTimeout(() => {
        this.setState({ tooltipVisible: true });
        setTimeout(() => this.props.followMouse && this.updateTooltipPosition());
      }, 300);
    }
  };

  onMouseMove = (e: MouseEvent) => {
    if (this.props.followMouse) {
      this.mousePosition = { x: e.clientX, y: e.clientY };
      this.updateTooltipPosition();
    }
  };

  updateTooltipPosition = () => {
    const { x, y } = this.mousePosition;
    const element = document.querySelector<HTMLElement>('.ToolTipPortal > div');
    if (element) {
      const { offsetWidth: width, offsetHeight: height } = element;
      element.style.left = `${x - width / 2}px`;
      element.style.top = `${y - height - 25}px`;
    }
  };

  hideTooltip = () => {
    clearTimeout(this.timeoutId);
    this.setState({ tooltipVisible: false });
  };

  wrappChildrenProp = (propName: string, func: (e?: MouseEvent) => void) => {
    return {
      [propName]: e => {
        func(e);
        this.props.children.props[propName]?.(e);
      },
    };
  };

  tooltipId = 'Tooltip_' + Math.floor(Math.random() * 9999);

  wrapperProps = {
    ...this.wrappChildrenProp('onMouseEnter', this.showTooltip),
    ...this.wrappChildrenProp('onMouseLeave', this.hideTooltip),
    ...this.wrappChildrenProp('onClick', this.hideTooltip),
    ...this.wrappChildrenProp('onMouseMove', this.onMouseMove),
    'data-tooltipid': this.tooltipId,
  };

  render() {
    const { children, content, isError, place, tooltipOffset, followMouse, hideArrow } = this.props;
    const style = getTooltipStyles(isError, followMouse, tooltipOffset, place);
    const { isMobile } = this.context;

    return isMobile ? (
      children
    ) : (
      <>
        {React.cloneElement(React.Children.only(children), this.wrapperProps)}
        {this.tooltipId && !this.disabled ? (
          <ToolTip
            active={this.state.tooltipVisible}
            parent={`[data-tooltipid=${this.tooltipId}]`}
            position={place}
            arrow={!hideArrow ? 'center' : null}
            style={style}
            tooltipTimeout={10}
          >
            {content}
          </ToolTip>
        ) : null}
      </>
    );
  }
}

export default Tooltip;
