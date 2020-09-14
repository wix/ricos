import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import AccordionPair from './components/accordion-pair';
import { Icons, EXPANDED, FIRST_EXPANDED } from './defaults';
import styles from '../statics/styles/accordion-viewer.rtlignore.scss';

class AccordionViewer extends Component {
  constructor(props) {
    super(props);
    this.pairsRefs = [];
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = this.stateFromProps(props);
  }

  stateFromProps(props) {
    const { componentData } = props;
    const { config } = componentData;
    const { expandState } = config;

    return { expandState };
  }

  static getDerivedStateFromProps(props, state) {
    const { componentData } = props;
    const { config } = componentData;
    const { expandState } = config;

    let newState = {};

    if (expandState !== state.expandState) {
      newState = { ...state, expandState, pairExpandedIdx: undefined };
    }

    return newState;
  }

  isExpanded = idx => {
    const { componentData } = this.props;
    const { config } = componentData;
    const { expandState, expandOnlyOne } = config;

    if (idx === 0 && expandState === FIRST_EXPANDED && !this.state.pairExpandedIdx) {
      return true;
    }

    return expandOnlyOne ? this.state.pairExpandedIdx === idx : expandState === EXPANDED;
  };

  handleExpandOnlyOne = pairExpandedIdx =>
    this.setState({
      pairExpandedIdx: pairExpandedIdx === this.state.pairExpandedIdx ? 'none' : pairExpandedIdx,
    });

  focus = ({ idx, isTitle }) => {
    const pair = this.pairsRefs[idx];
    if (isTitle) {
      pair?.focusTitle();
    } else {
      // try focus content, if pair is collapsed, focus title instead
      pair?.focusContent() || pair?.focusTitle();
    }
  };

  expand = idx => {
    const pair = this.pairsRefs[idx];
    pair.expand();
  };

  renderPair = idx => {
    const {
      componentData,
      setInPluginEditingMode,
      theme,
      t,
      renderTitle,
      renderContent,
      innerRCV,
      isPluginFocused,
      isMobile,
      focusedPair,
    } = this.props;

    return (
      <AccordionPair
        ref={ref => (this.pairsRefs[idx] = ref)}
        key={idx}
        idx={idx}
        isExpanded={this.isExpanded(idx)}
        handleExpandOnlyOne={this.handleExpandOnlyOne}
        componentData={componentData}
        setInPluginEditingMode={setInPluginEditingMode}
        theme={theme}
        t={t}
        renderTitle={renderTitle}
        renderContent={renderContent}
        innerRCV={innerRCV}
        isPluginFocused={isPluginFocused}
        isMobile={isMobile}
        focusedPair={focusedPair}
      />
    );
  };

  renderDndHandle = dragHandleProps => {
    const { setInPluginEditingMode, isMobile, isPluginFocused } = this.props;

    if (!setInPluginEditingMode || isMobile || !isPluginFocused) {
      return null;
    }

    const Icon = Icons.dndUnselected;

    return (
      <div className={this.styles.dndIcon} {...dragHandleProps}>
        <Icon />
      </div>
    );
  };

  getDirection = () => this.props.componentData.config.direction;

  render() {
    const {
      componentData,
      setInPluginEditingMode,
      isPluginFocused,
      isMobile,
      Draggable,
    } = this.props;
    const { pairs } = componentData;

    return (
      <>
        {pairs.map((_pair, idx) =>
          !setInPluginEditingMode ? (
            this.renderPair(idx)
          ) : (
            <Draggable
              key={idx}
              draggableId={idx.toString()}
              index={idx}
              isDragDisabled={!isPluginFocused || isMobile}
            >
              {provided => (
                <div
                  className={this.styles[this.getDirection()]}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                >
                  {this.renderDndHandle(provided.dragHandleProps)}
                  {this.renderPair(idx)}
                </div>
              )}
            </Draggable>
          )
        )}
      </>
    );
  }
}

AccordionViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  setInPluginEditingMode: oneOf(PropTypes.func, undefined),
  componentData: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  renderTitle: PropTypes.func,
  renderContent: PropTypes.func,
  innerRCV: PropTypes.func,
  isPluginFocused: PropTypes.bool,
  isMobile: PropTypes.bool,
  focusedPair: PropTypes.object,
  Draggable: PropTypes.object,
  dragHandleProps: PropTypes.object,
};

export default AccordionViewer;
