import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '~/Styles/static-toolbar.scss';

export default class StaticToolbar extends React.Component {
  static propTypes = {
    pubsub: PropTypes.object.isRequired,
    structure: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    linkModal: PropTypes.bool,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    helpers: PropTypes.object,
    t: PropTypes.func,
    dataHook: PropTypes.string,
    id: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const { isMobile, structure } = this.props;
    this.state = {
      overrideContent: undefined,
      extendContent: undefined,
      showRightArrow: isMobile && structure.length > 7,
      showLeftArrow: false
    };
  }

  componentDidMount() {
    this.handleToolbarScroll();
  }

  componentWillUnmount() {
    this.buttons && this.buttons.removeEventListener('scroll', this.handleToolbarScroll);
    window && window.removeEventListener('resize', this.handleToolbarScroll);
    window && window.removeEventListener('orientationchange', this.handleToolbarScroll);
  }

  handleButtonsRef = node => {
    this.buttons = node;
    if (this.buttons) {
      this.buttons.addEventListener('scroll', this.handleToolbarScroll);
      window && window.addEventListener('resize', this.handleToolbarScroll);
      window && window.addEventListener('orientationchange', this.handleToolbarScroll);
    }
  };

  scrollToolbar(event, direction) {
    event.preventDefault();
    const { scrollLeft, clientWidth, scrollWidth } = this.buttons;
    switch (direction) {
      case 'right':
        this.buttons.scrollLeft += scrollWidth - clientWidth - scrollLeft;
        break;
      case 'left':
        this.buttons.scrollLeft -= scrollLeft;
        break;
      default:
        break;
    }
  }

  handleToolbarScroll = () => {
    if (this.buttons) {
      const spaceLeft = this.buttons.scrollLeft;
      const eleWidth = this.buttons.clientWidth;
      const fullWidth = this.buttons.scrollWidth;

      const spaceRight = fullWidth - eleWidth - spaceLeft;

      this.setState({
        showLeftArrow: (spaceLeft > 2),
        showRightArrow: (spaceRight > 26)
      });
    }
  }

  onOverrideContent = overrideContent => this.setState({ overrideContent });

  onExtendContent = extendContent => this.setState({ extendContent });

  render() {
    const { theme, pubsub, structure, helpers, isMobile, linkModal, anchorTarget, relValue, t, dataHook, id } = this.props;
    const { showLeftArrow, showRightArrow, overrideContent: OverrideContent, extendContent: ExtendContent } = this.state;
    const hasArrow = showLeftArrow || showRightArrow;
    const { toolbarStyles } = theme || {};
    const toolbarClassNames = classNames(Styles.toolbar, toolbarStyles && toolbarStyles.toolbar);
    const buttonClassNames = classNames(Styles.buttons, toolbarStyles && toolbarStyles.buttons);
    const extendClassNames = classNames(Styles.extend, toolbarStyles && toolbarStyles.extend);
    const childrenProps = {
      theme,
      helpers,
      isMobile,
      linkModal,
      anchorTarget,
      relValue,
      t,
      getEditorState: pubsub.get('getEditorState'),
      setEditorState: pubsub.get('setEditorState'),
      onOverrideContent: this.onOverrideContent,
      onExtendContent: this.onExtendContent,
    };

    return (
      <div role="toolbar" aria-orientation="horizontal" id={id} className={toolbarClassNames} data-hook={dataHook}>
        <div className={buttonClassNames} ref={this.handleButtonsRef} >
          {
            showLeftArrow &&
            <button
              className={classNames(toolbarStyles.responsiveArrow, toolbarStyles.responsiveArrowLeft)}
              data-hook="staticToolbarLeftArrow" onMouseDown={e => this.scrollToolbar(e, 'left')}
            >
              <i className={toolbarStyles.responsiveArrowLeft_icon}/>
            </button>
          }
          {
            OverrideContent ?
              <OverrideContent {...childrenProps} /> :
              structure.map((Button, index) => <Button key={index} {...childrenProps} />)
          }
          {hasArrow && <div className={toolbarStyles.responsiveSpacer} />}
          {
            showRightArrow &&
            <button
              className={classNames(toolbarStyles.responsiveArrow, toolbarStyles.responsiveArrowRight)}
              data-hook="staticToolbarRightArrow" onMouseDown={e => this.scrollToolbar(e, 'right')}
            >
              <i className={toolbarStyles.responsiveArrowRight_icon}/>
            </button>
          }
        </div>
        {ExtendContent && (
          <div className={extendClassNames}>
            <ExtendContent {...childrenProps} />
          </div>
        )}
      </div>
    );
  }
}
