import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import AccordionPair from './components/viewer-components/accordion-pair';
import { visualizations, FIRST_PAIR } from './defaults';
import { Draggable } from 'react-beautiful-dnd';
import { toInteger } from 'lodash';
//TODO: refactor
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

  // isLastPair = (pairs, id) => Object.keys(pairs).length.toString() === id;

  handleOneSectionExpanded = pairExpandedID =>
    this.setState({
      pairExpandedID: pairExpandedID === this.state.pairExpandedID ? 'none' : pairExpandedID,
    });

  render() {
    const {
      componentData: { pairs },
      componentData: {
        config: { visualization, expandOneSection },
      },
      componentData,
      setInPluginEditingMode,
      theme,
      t,
      // resetForcedFocus,
      // shouldForceFocus,
      renderInnerRCE,
      innerRCV,
    } = this.props;

    return (
      <>
        {Object.entries(pairs).map(([id]) =>
          !setInPluginEditingMode ? (
            <AccordionPair
              key={id}
              id={id}
              isExpanded={
                !!setInPluginEditingMode || this.isExpanded(id, visualization, expandOneSection)
              }
              handleOneSectionExpanded={this.handleOneSectionExpanded}
              // resetForcedFocus={resetForcedFocus}
              // shouldForceFocus={shouldForceFocus && this.isLastPair(pairs, id)}
              componentData={componentData}
              setInPluginEditingMode={setInPluginEditingMode}
              theme={theme}
              t={t}
              renderInnerRCE={renderInnerRCE}
              innerRCV={innerRCV}
            />
          ) : (
            <Draggable key={id} draggableId={id} index={toInteger(id) - 1}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <AccordionPair
                    key={id}
                    id={id}
                    isExpanded={
                      !!setInPluginEditingMode ||
                      this.isExpanded(id, visualization, expandOneSection)
                    }
                    handleOneSectionExpanded={this.handleOneSectionExpanded}
                    // resetForcedFocus={resetForcedFocus}
                    // shouldForceFocus={shouldForceFocus && this.isLastPair(pairs, id)}
                    componentData={componentData}
                    setInPluginEditingMode={setInPluginEditingMode}
                    theme={theme}
                    t={t}
                    renderInnerRCE={renderInnerRCE}
                    innerRCV={innerRCV}
                  />
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
  // setFocusToBlock: oneOf(PropTypes.func, undefined),
  componentData: PropTypes.object.isRequired,
  // resetForcedFocus: PropTypes.func,
  // shouldForceFocus: PropTypes.bool,
  t: PropTypes.func.isRequired,
  renderInnerRCE: PropTypes.func,
  innerRCV: PropTypes.func,
};

export default AccordionViewer;
