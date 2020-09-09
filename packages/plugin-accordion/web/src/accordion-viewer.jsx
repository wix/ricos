import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import AccordionPair from './components/accordion-pair';
import { visualizations } from './defaults';
import { Draggable } from 'react-beautiful-dnd';

class AccordionViewer extends Component {
  constructor(props) {
    super(props);
    this.pairsRefs = [];
    this.state = this.stateFromProps(props);
  }

  static getDerivedStateFromProps(props, state) {
    const {
      componentData: {
        config: { visualization },
      },
    } = props;

    let newState = {};

    if (visualization !== state.visualization) {
      newState = { ...state, visualization, pairExpandedIdx: undefined };
    }

    return newState;
  }

  stateFromProps(props) {
    const {
      componentData: {
        config: { visualization },
      },
    } = props;
    return { visualization };
  }

  isExpanded = (idx, visualization, expandOneSection) => {
    if (
      idx === 0 &&
      visualization === visualizations.FIRST_EXPANDED &&
      !this.state.pairExpandedIdx
    ) {
      return true;
    }

    return expandOneSection
      ? this.state.pairExpandedIdx === idx
      : visualization === visualizations.EXPANDED;
  };

  handleOneSectionExpanded = pairExpandedIdx =>
    this.setState({
      pairExpandedIdx: pairExpandedIdx === this.state.pairExpandedIdx ? 'none' : pairExpandedIdx,
    });

  focus = ({ idx, isTitle }) => {
    const pair = this.pairsRefs[idx];
    if (isTitle) {
      pair.focusTitle();
    } else {
      pair.focusContent();
    }
  };

  renderPair = (idx, provided) => {
    const {
      componentData: {
        config: { visualization, expandOneSection },
      },
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
        isExpanded={
          !!setInPluginEditingMode || this.isExpanded(idx, visualization, expandOneSection)
        }
        handleOneSectionExpanded={this.handleOneSectionExpanded}
        componentData={componentData}
        setInPluginEditingMode={setInPluginEditingMode}
        theme={theme}
        t={t}
        renderTitle={renderTitle}
        renderContent={renderContent}
        innerRCV={innerRCV}
        isPluginFocused={isPluginFocused}
        isMobile={isMobile}
        dragHandleProps={provided?.dragHandleProps}
        focusedPair={focusedPair}
      />
    );
  };

  render() {
    const { componentData, setInPluginEditingMode, isPluginFocused, isMobile } = this.props;
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
                <div ref={provided.innerRef} {...provided.draggableProps}>
                  {this.renderPair(idx, provided)}
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
};

export default AccordionViewer;
