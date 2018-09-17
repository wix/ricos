import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Measure from 'react-measure';
import Styles from '../../../../statics/styles/static-toolbar.scss';

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
    offset: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    visibilityFn: PropTypes.func,
    uiSettings: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      overrideContent: undefined,
      extendContent: undefined,
      showRightArrow: false,
      showLeftArrow: false
    };
  }

  scrollToolbar(event, leftDirection) {
    event.preventDefault();
    const { clientWidth, scrollWidth } = this.scrollContainer;
    this.scrollContainer.scrollLeft = leftDirection ? 0 : Math.min(this.scrollContainer.scrollLeft + clientWidth, scrollWidth);
  }

  setToolbarScrollButton = (scrollLeft, scrollWidth, clientWidth) => {
    if (this.props.isMobile) {
      return;
    }

    const currentScrollButtonWidth = this.state.showLeftArrow || this.state.showRightArrow ? 20 : 0;
    const isScroll = scrollWidth - clientWidth - currentScrollButtonWidth > 8;

    this.setState({
      showLeftArrow: isScroll && scrollLeft === scrollWidth - clientWidth,
      showRightArrow: isScroll && scrollLeft < scrollWidth - clientWidth
    });
  };

  onOverrideContent = overrideContent => this.setState({ overrideContent });

  onExtendContent = extendContent => this.setState({ extendContent });

  render() {

    const { visibilityFn, pubsub } = this.props;
    if (visibilityFn) {
      const editorState = pubsub.get('getEditorState');
      if (!visibilityFn(editorState)) {
        return null;
      }
    }

    const { theme, structure, helpers, isMobile, linkModal, anchorTarget, relValue, t, dataHook, id, offset, uiSettings } = this.props;
    const { showLeftArrow, showRightArrow, overrideContent: OverrideContent, extendContent: ExtendContent } = this.state;
    const hasArrow = showLeftArrow || showRightArrow;
    const { toolbarStyles } = theme || {};

    const toolbarClassNames = classNames(Styles.staticToolbar, toolbarStyles.toolbar);
    const buttonClassNames = classNames(Styles.staticToolbar_buttons, toolbarStyles.buttons);
    const extendClassNames = classNames(Styles.staticToolbar_extend, toolbarStyles.extend);
    const scrollableClassNames = classNames(
      Styles.staticToolbar_scrollableContainer,
      toolbarStyles.scrollableContainer,
      {
        [Styles.mobile]: isMobile,
      }
    );

    const arrowClassNames = classNames(Styles.staticToolbar_responsiveArrow, toolbarStyles.responsiveArrow);
    const leftArrowIconClassNames = classNames(Styles.staticToolbar_responsiveArrowLeft_icon, toolbarStyles.responsiveArrowLeft_icon);
    const rightArrowIconClassNames = classNames(Styles.staticToolbar_responsiveArrowRight_icon, toolbarStyles.responsiveArrowRight_icon);

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
      uiSettings,
    };

    let style = {};
    if (offset) {
      style = { top: offset.y || 0, left: offset.x || 0 };
    }

    return (
      <div role="toolbar" aria-orientation="horizontal" id={id} className={toolbarClassNames} data-hook={dataHook} style={style}>
        <div className={buttonClassNames}>
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
          {
            hasArrow &&
            <button
              className={arrowClassNames}
              data-hook="toolbarArrow" onMouseDown={e => this.scrollToolbar(e, showLeftArrow)}
            >
              <i className={showLeftArrow ? leftArrowIconClassNames : rightArrowIconClassNames} />
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
