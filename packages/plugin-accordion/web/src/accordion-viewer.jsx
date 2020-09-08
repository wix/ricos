import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import AccordionPair from './components/accordion-pair';
import { visualizations, FIRST_PAIR } from './defaults';
import { Draggable } from 'react-beautiful-dnd';

class AccordionViewer extends Component {
  constructor(props) {
    super(props);
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
      newState = { ...state, visualization, pairExpandedID: undefined };
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

  isExpanded = (id, visualization, expandOneSection) => {
    if (
      id === FIRST_PAIR &&
      visualization === visualizations.FIRST_EXPANDED &&
      !this.state.pairExpandedID
    ) {
      return true;
    }

    return expandOneSection
      ? this.state.pairExpandedID === id
      : visualization === visualizations.EXPANDED;
  };

  handleOneSectionExpanded = pairExpandedID =>
    this.setState({
      pairExpandedID: pairExpandedID === this.state.pairExpandedID ? 'none' : pairExpandedID,
    });

  renderPair = (id, snapshot, provided) => {
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
      calcZindex,
      isMobile,
      shouldForceFocus,
      idToFocus,
      shouldFocusTitle,
    } = this.props;

    return (
      <AccordionPair
        key={id}
        id={id}
        isExpanded={
          !!setInPluginEditingMode || this.isExpanded(id, visualization, expandOneSection)
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
        isDragging={snapshot?.isDragging}
        calcZindex={calcZindex}
        isMobile={isMobile}
        dragHandleProps={provided?.dragHandleProps}
        shouldForceFocus={shouldForceFocus}
        idToFocus={idToFocus}
        shouldFocusTitle={shouldFocusTitle}
      />
    );
  };

  render() {
    const {
      componentData: { pairs },
      setInPluginEditingMode,
      idToIndex,
      isPluginFocused,
      isMobile,
    } = this.props;

    return (
      <>
        {Object.entries(pairs).map(([id]) =>
          !setInPluginEditingMode ? (
            this.renderPair(id)
          ) : (
            <Draggable
              key={id}
              draggableId={id}
              index={idToIndex(id)}
              isDragDisabled={!isPluginFocused || isMobile}
            >
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                  {this.renderPair(id, snapshot, provided)}
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
  idToIndex: PropTypes.func,
  calcZindex: PropTypes.func,
  isMobile: PropTypes.bool,
  shouldForceFocus: PropTypes.bool,
  idToFocus: PropTypes.string,
  shouldFocusTitle: PropTypes.bool,
};

export default AccordionViewer;
