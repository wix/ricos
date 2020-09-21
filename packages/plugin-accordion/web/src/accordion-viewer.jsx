import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import AccordionPair from './components/AccordionPair';
import DndHandle from './components/DndHandle';
import {
  getDefaultState,
  onInsertNewPair,
  onDeletePair,
  getPairsAllCollpased,
} from './utils/utils';
import styles from '../statics/styles/accordion-component.rtlignore.scss';

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
      ...getDefaultState(pairs, expandState),
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { componentData, isEditor } = props;
    const { config, pairs } = componentData;
    const { expandState, expandOnlyOne } = config;
    const pairsStateLength = Object.entries(state.pairsState).length;

    if (
      expandState !== state.expandState ||
      (expandOnlyOne && expandOnlyOne !== state.expandOnlyOne)
    ) {
      return {
        expandState,
        expandOnlyOne,
        ...getDefaultState(pairs, expandState),
      };
    }

    if (pairs.length > pairsStateLength) {
      const newState = onInsertNewPair(
        pairs,
        state.pairsState,
        expandState,
        expandOnlyOne,
        isEditor
      );
      return newState;
    }

    if (pairs.length < pairsStateLength) {
      const pairsState = onDeletePair(pairs, state.pairsState);
      return { pairsState };
    }

    return null;
  }

  onExpand = key => {
    const { componentData } = this.props;
    const { config, pairs } = componentData;
    const { expandOnlyOne } = config;
    let { pairsState } = this.state;

    if (expandOnlyOne) {
      pairsState = getPairsAllCollpased(pairs);
    }

    pairsState = { ...pairsState, [key]: { isExpanded: true } };
    this.setState({ pairsState });
  };

  onCollapse = key => {
    const pairsState = { ...this.state.pairsState, [key]: { isExpanded: false } };
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

  idxToPairKey = idx => {
    const { componentData } = this.props;
    const { pairs } = componentData;
    return pairs[idx].key;
  };

  expandPair = idx => {
    const pairKey = this.idxToPairKey(idx);
    this.onExpand(pairKey);
  };

  renderPair = (pair, idx) => {
    const { componentData, isEditor, theme, renderTitle, renderContent, innerRCV } = this.props;
    const { pairsState } = this.state;
    const isExpanded = pairsState[pair.key].isExpanded;

    return (
      <AccordionPair
        ref={ref => (this.pairsRefs[idx] = ref)}
        key={pair.key}
        idx={idx}
        pairKey={pair.key}
        isExpanded={isExpanded}
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
