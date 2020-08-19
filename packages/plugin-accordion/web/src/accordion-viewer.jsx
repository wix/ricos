import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/accordion-viewer.scss';
import AccordionPair from './components/viewer-components/accordion-pair';
import { visualizations, FIRST_PAIR } from './defaults';
import { Draggable } from 'react-beautiful-dnd';
import { toInteger } from 'lodash';

class AccordionViewer extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.state = this.stateFromProps(props);
    this.styles = mergeStyles({ styles, theme });
  }

  static getDerivedStateFromProps(props, state) {
    const {
      componentData: {
        config: {
          settings: { visualization },
        },
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
        config: {
          settings: { visualization },
        },
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

  isLastPair = (pairs, id) => Object.keys(pairs).length.toString() === id;

  handleOneSectionExpanded = pairExpandedID =>
    this.setState({
      pairExpandedID: pairExpandedID === this.state.pairExpandedID ? 'none' : pairExpandedID,
    });

  render() {
    const {
      componentData: {
        config: { pairs },
      },
      componentData: {
        config: {
          settings: { visualization, expandOneSection },
        },
      },
      componentData,
      setInPluginEditingMode,
      theme,
      t,
      onChange,
      resetForcedFocus,
      shouldForceFocus,
    } = this.props;

    return (
      <div className={this.styles.accordionViewer}>
        {Object.entries(pairs).map(([id, value]) =>
          !setInPluginEditingMode ? (
            <AccordionPair
              key={id}
              id={id}
              value={value}
              onChange={onChange}
              isExpanded={
                !!setInPluginEditingMode || this.isExpanded(id, visualization, expandOneSection)
              }
              handleOneSectionExpanded={this.handleOneSectionExpanded}
              resetForcedFocus={resetForcedFocus}
              shouldForceFocus={shouldForceFocus && this.isLastPair(pairs, id)}
              componentData={componentData}
              setInPluginEditingMode={setInPluginEditingMode}
              theme={theme}
              t={t}
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
                    value={value}
                    onChange={onChange}
                    isExpanded={
                      !!setInPluginEditingMode ||
                      this.isExpanded(id, visualization, expandOneSection)
                    }
                    handleOneSectionExpanded={this.handleOneSectionExpanded}
                    resetForcedFocus={resetForcedFocus}
                    shouldForceFocus={shouldForceFocus && this.isLastPair(pairs, id)}
                    componentData={componentData}
                    setInPluginEditingMode={setInPluginEditingMode}
                    theme={theme}
                    t={t}
                  />
                </div>
              )}
            </Draggable>
          )
        )}
      </div>
    );
  }
}

AccordionViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  setInPluginEditingMode: oneOf(PropTypes.func, undefined),
  setFocusToBlock: oneOf(PropTypes.func, undefined),
  onChange: PropTypes.func.isRequired,
  componentData: PropTypes.object.isRequired,
  resetForcedFocus: PropTypes.func,
  shouldForceFocus: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default AccordionViewer;
