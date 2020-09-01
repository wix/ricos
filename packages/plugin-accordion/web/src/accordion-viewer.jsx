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

  renderPair = (id, snapshot) => {
    const {
      componentData: {
        config: { visualization, expandOneSection },
      },
      componentData,
      setInPluginEditingMode,
      theme,
      t,
      renderInnerRCE,
      innerRCV,
      isPluginFocused,
      calcZindex,
      isMobile,
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
        renderInnerRCE={renderInnerRCE}
        innerRCV={innerRCV}
        isPluginFocused={isPluginFocused}
        isDragging={snapshot?.isDragging}
        calcZindex={calcZindex}
        isMobile={isMobile}
      />
    );
  };

  render() {
    const {
      componentData: { pairs },
      setInPluginEditingMode,
      idToIndex,
    } = this.props;

    return (
      <>
        {Object.entries(pairs).map(([id]) =>
          !setInPluginEditingMode ? (
            this.renderPair(id)
          ) : (
            <Draggable key={id} draggableId={id} index={idToIndex(id)}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {this.renderPair(id, snapshot)}
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
  renderInnerRCE: PropTypes.func,
  innerRCV: PropTypes.func,
  isPluginFocused: PropTypes.bool,
  idToIndex: PropTypes.func,
  calcZindex: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default AccordionViewer;
