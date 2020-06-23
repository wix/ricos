import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Measure from 'react-measure';
import Button from '../button/Button';
import Styles from '../../statics/styles/static-toolbar.scss';

export default class Toolbar extends React.PureComponent {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
    setKeepOpen: PropTypes.func,
  };

  static defaultProps = {
    isVisible: true,
    setKeepOpen: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      showRightArrow: false,
      showLeftArrow: false,
    };
  }

  scrollToolbar(event, leftDirection) {
    event.preventDefault();
    const { clientWidth, scrollWidth } = this.scrollContainer;
    this.scrollContainer.scrollLeft = leftDirection
      ? 0
      : Math.min(this.scrollContainer.scrollLeft + clientWidth, scrollWidth);
  }

  setToolbarScrollButton = (scrollLeft, scrollWidth, clientWidth) => {
    if (this.props.isMobile) {
      return;
    }

    const currentScrollButtonWidth = this.state.showLeftArrow || this.state.showRightArrow ? 20 : 0;
    const isScroll = scrollWidth - clientWidth - currentScrollButtonWidth > 8;

    this.setState({
      showLeftArrow: isScroll && scrollLeft === scrollWidth - clientWidth,
      showRightArrow: isScroll && scrollLeft < scrollWidth - clientWidth,
    });
  };

  renderToolbarContent() {
    const { theme, isMobile, buttons, ...rest } = this.props;
    const { toolbarStyles } = theme || {};
    const { showLeftArrow, showRightArrow } = this.state;
    const hasArrow = showLeftArrow || showRightArrow;
    const arrowClassNames = classNames(
      Styles.staticToolbar_responsiveArrow,
      toolbarStyles.responsiveArrow
    );
    const leftArrowIconClassNames = classNames(
      Styles.staticToolbar_responsiveArrowStart_icon,
      toolbarStyles.responsiveArrowStart_icon
    );
    const rightArrowIconClassNames = classNames(
      Styles.staticToolbar_responsiveArrowEnd_icon,
      toolbarStyles.responsiveArrowEnd_icon
    );

    const buttonClassNames = classNames(Styles.staticToolbar_buttons, toolbarStyles.buttons);
    const scrollableClassNames = classNames(
      Styles.staticToolbar_scrollableContainer,
      toolbarStyles.scrollableContainer,
      {
        [Styles.mobile]: isMobile,
      }
    );

    return (
      <div className={buttonClassNames}>
        <Measure
          client
          scroll
          innerRef={ref => (this.scrollContainer = ref)}
          onResize={({ scroll, client }) =>
            this.setToolbarScrollButton(scroll.left, scroll.width, client.width)
          }
        >
          {({ measure, measureRef }) => (
            <div className={scrollableClassNames} ref={measureRef} onScroll={() => measure()}>
              {Object.values(buttons).map((props, idx) => {
                return (
                  <Button
                    key={`${props.name}_${idx}`}
                    {...props}
                    theme={theme}
                    isMobile={isMobile}
                    {...rest}
                  />
                );
              })}
            </div>
          )}
        </Measure>
        {hasArrow && (
          <button
            className={arrowClassNames}
            data-hook="toolbarArrow"
            onMouseDown={e => this.scrollToolbar(e, showLeftArrow)}
          >
            <i className={showLeftArrow ? leftArrowIconClassNames : rightArrowIconClassNames} />
          </button>
        )}
      </div>
    );
  }

  render() {
    const { toolbarStyles } = this.props.theme;
    const props = {
      className: classNames(
        Styles.staticToolbar,
        toolbarStyles.toolbar,
        toolbarStyles.staticToolbar
      ),
      role: 'toolbar',
      'aria-orientation': 'horizontal',
    };

    return <div {...props}>{this.renderToolbarContent()}</div>;
  }
}
