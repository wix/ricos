import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import AccordionPair from './components/AccordionPair';
import DndHandle from './components/DndHandle';
import { EXPANDED, FIRST_EXPANDED } from './defaults';
import styles from '../statics/styles/accordion-component.rtlignore.scss';

const getPairsAllCollpased = pairs => pairs.map(() => false);

const getPairsAllExpanded = pairs => pairs.map(() => true);

const getDefaultPairsState = (pairs, expandState) => {
  if (expandState === EXPANDED) {
    return getPairsAllExpanded(pairs);
  }

  const pairsState = getPairsAllCollpased(pairs);

  if (expandState === FIRST_EXPANDED) {
    pairsState[0] = true;
  }

  return pairsState;
};

class AccordionViewer extends Component {
  constructor(props) {
    super(props);
    this.pairsRefs = [];
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = this.initState(props);
  }

  initState(props) {
    const { componentData } = props;
    const { config, pairs } = componentData;
    const { expandState } = config;

    return {
      expandState,
      pairsState: getDefaultPairsState(pairs, expandState),
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { componentData } = props;
    const { config, pairs } = componentData;
    const { expandState, expandOnlyOne } = config;

    if (
      expandState !== state.expandState ||
      (expandOnlyOne && expandOnlyOne !== state.expandOnlyOne)
    ) {
      return {
        expandState,
        expandOnlyOne,
        pairsState: getDefaultPairsState(pairs, expandState),
      };
    }

    return null;
  }

  onExpand = idx => {
    const { componentData } = this.props;
    const { config, pairs } = componentData;
    const { expandOnlyOne } = config;
    let { pairsState } = this.state;

    if (expandOnlyOne) {
      pairsState = getPairsAllCollpased(pairs);
    }
    pairsState[idx] = true;
    this.setState({ pairsState });
  };

  onCollapse = idx => {
    const pairsState = [...this.state.pairsState];
    pairsState[idx] = false;
    this.setState({ pairsState });
  };

  focusPair = ({ idx, isTitle }) => {
    const pair = this.pairsRefs[idx];
    if (isTitle) {
      pair?.focusTitle();
    } else {
      // try focus content, if pair is collapsed, focus title instead
      pair?.focusContent() || pair?.focusTitle();
    }
  };

  expandPair = idx => this.onExpand(idx);

  insertNewPair = () => {
    const { expandOnlyOne } = this.state;
    let { pairsState } = this.state;
    if (expandOnlyOne) {
      pairsState = getPairsAllCollpased(pairsState);
    }
    pairsState = [...pairsState, true];
    this.setState({ pairsState });
  };

  deletePair = idx => {
    const { pairsState } = this.state;
    pairsState.splice(idx, 1);
    this.setState({ pairsState });
  };

  reorderPairs = (startIdx, endIdx) => {
    const { pairsState } = this.state;
    const [pairToMove] = pairsState.splice(startIdx, 1);
    pairsState.splice(endIdx, 0, pairToMove);
    this.setState({ pairsState });
  };

  renderPair = (pair, idx) => {
    const { componentData, isEditor, theme, renderTitle, renderContent, innerRCV } = this.props;
    const { pairsState } = this.state;

    return (
      <AccordionPair
        ref={ref => (this.pairsRefs[idx] = ref)}
        key={pair.key}
        idx={idx}
        isExpanded={pairsState[idx]}
        onCollapse={this.onCollapse}
        onExpand={this.onExpand}
        componentData={componentData}
        isEditor={isEditor}
        theme={theme}
        renderTitle={renderTitle}
        renderContent={renderContent}
        innerRCV={innerRCV}
      />
    );
  };

  render() {
    const { componentData, isPluginFocused, isMobile, isEditor, Draggable } = this.props;
    const { config, pairs } = componentData;
    const { direction } = config;
    const isDragDisabled = !isPluginFocused || isMobile;

    return (
      <div className={classNames(this.styles.accordionViewer, this.styles[direction])}>
        {pairs.map((pair, idx) =>
          isEditor ? (
            <Draggable
              key={pair.key}
              draggableId={pair.key}
              index={idx}
              isDragDisabled={isDragDisabled}
            >
              {provided => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                  {!isDragDisabled && <DndHandle dragHandleProps={provided.dragHandleProps} />}
                  {this.renderPair(pair, idx)}
                </div>
              )}
            </Draggable>
          ) : (
            this.renderPair(pair, idx)
          )
        )}
      </div>
    );
  }
}

AccordionViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  isEditor: PropTypes.bool,
  componentData: PropTypes.object.isRequired,
  renderTitle: PropTypes.func,
  renderContent: PropTypes.func,
  innerRCV: PropTypes.func,
  isPluginFocused: PropTypes.bool,
  isMobile: PropTypes.bool,
  Draggable: PropTypes.object,
  dragHandleProps: PropTypes.object,
};

export default AccordionViewer;
