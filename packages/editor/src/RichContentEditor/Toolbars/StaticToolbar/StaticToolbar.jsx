import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '~/Styles/static-toolbar.scss';
import Measure from 'react-measure';

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

  scrollToolbar(event, direction) {
    event.preventDefault();
    const { scrollLeft, clientWidth, scrollWidth } = this.scrollContainer;
    switch (direction) {
      case 'right':
        this.scrollContainer.scrollLeft += scrollWidth - clientWidth - scrollLeft;
        break;
      case 'left':
        this.scrollContainer.scrollLeft -= scrollLeft;
        break;
      default:
        break;
    }
  }

  setToolbarScrollButton = (scrollLeft, scrollWidth, clientWidth) => {
    const isScroll = scrollWidth - clientWidth > 8;

    this.setState({
      showLeftArrow: isScroll && scrollLeft > 2,
      showRightArrow: isScroll && scrollLeft <= 2
    });
  };

  onOverrideContent = overrideContent => this.setState({ overrideContent });

  onExtendContent = extendContent => this.setState({ extendContent });

  render() {
    const { theme, pubsub, structure, helpers, isMobile, linkModal, anchorTarget, relValue, t, dataHook, id } = this.props;
    const { showLeftArrow, showRightArrow, overrideContent: OverrideContent, extendContent: ExtendContent } = this.state;
    const hasArrow = showLeftArrow || showRightArrow;
    const { toolbarStyles } = theme || {};

    const toolbarClassNames = classNames(Styles.staticToolbar, toolbarStyles && toolbarStyles.toolbar);
    const buttonClassNames = classNames(Styles.staticToolbar_buttons, toolbarStyles && toolbarStyles.scrollContainer);
    const extendClassNames = classNames(Styles.staticToolbar_extend, toolbarStyles && toolbarStyles.extend);
    const scrollableClassNames = classNames(Styles.staticToolbar_scrollableContainer, toolbarStyles && toolbarStyles.scrollableContainer);
    const leftArrowClassNames = classNames(Styles.staticToolbar_responsiveArrow, Styles.staticToolbar_responsiveArrowLeft,
      toolbarStyles && toolbarStyles.responsiveArrow, toolbarStyles && toolbarStyles.responsiveArrowLeft);
    const leftArrowIconClassNames = classNames(Styles.staticToolbar_responsiveArrowLeft_icon,
      toolbarStyles && toolbarStyles.responsiveArrowLeft_icon);
    const rightArrowClassNames = classNames(Styles.staticToolbar_responsiveArrow, Styles.staticToolbar_responsiveArrowRight,
      toolbarStyles && toolbarStyles.responsiveArrow, toolbarStyles && toolbarStyles.responsiveArrowRight);
    const rightArrowIconClassNames = classNames(Styles.staticToolbar_responsiveArrowRight_icon,
      toolbarStyles && toolbarStyles.responsiveArrowRight_icon);
    const spacerClassNames = classNames(Styles.staticToolbar_responsiveSpacer, toolbarStyles && toolbarStyles.responsiveSpacer);

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
        <div className={buttonClassNames}>
          {
            showLeftArrow &&
            <button
              className={leftArrowClassNames}
              data-hook="staticToolbarLeftArrow" onMouseDown={e => this.scrollToolbar(e, 'left')}
            >
              <i className={leftArrowIconClassNames}/>
            </button>
          }
          <Measure
            client
            scroll
            innerRef={ref => this.scrollContainer = ref}
            onResize={({ scroll, client }) => this.setToolbarScrollButton(scroll.left, scroll.width, client.width)}
          >
            {({ measure, measureRef }) => (
              <div className={scrollableClassNames} ref={measureRef} onScroll={() => measure()}>
                {
                  OverrideContent ?
                    <OverrideContent {...childrenProps} /> :
                    structure.map((Button, index) => <Button key={index} {...childrenProps} />)
                }
              </div>
            )}
          </Measure>
          {hasArrow && <div className={spacerClassNames} />}
          {
            showRightArrow &&
            <button
              className={rightArrowClassNames}
              data-hook="staticToolbarRightArrow" onMouseDown={e => this.scrollToolbar(e, 'right')}
            >
              <i className={rightArrowIconClassNames}/>
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
