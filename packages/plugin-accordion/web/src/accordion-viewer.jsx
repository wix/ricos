import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import AccordionPair from './components/accordion-pair';
import { Icons, EXPANDED, FIRST_EXPANDED } from './defaults';
import styles from '../statics/styles/accordion-viewer.rtlignore.scss';

const getInitialPairKey = (componentData, expandState) =>
  expandState === FIRST_EXPANDED ? componentData.pairs[0].key : undefined;

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

    return { expandState, expandedPairKey: getInitialPairKey(componentData, expandState) };
  }

  static getDerivedStateFromProps(props, state) {
    const { componentData } = props;
    const { config } = componentData;
    const { expandState } = config;

    let newState = {};

    // If expandState changed, reset expandedPairKey
    if (expandState !== state.expandState) {
      newState = {
        ...state,
        expandState,
        expandedPairKey: getInitialPairKey(componentData, expandState),
      };
    }

    return newState;
  }

  isExpanded = (key, idx) => {
    const { componentData } = this.props;
    const { config } = componentData;
    const { expandState, expandOnlyOne } = config;

    // Expand only one
    if (expandOnlyOne) {
      return this.state.expandedPairKey === key;
    }

    // First expanded
    if (idx === 0 && expandState === FIRST_EXPANDED) {
      return true;
    }

    // Expanded
    return expandState === EXPANDED;
  };

  handleExpandOnlyOne = key => {
    let expandedPairKey;

    if (key !== this.state.expandedPairKey) {
      expandedPairKey = key;
    }

    this.setState({ expandedPairKey });
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

  expandPair = idx => {
    const pair = this.pairsRefs[idx];
    pair.expand();
  };

  isPairExpanded = idx => {
    const pair = this.pairsRefs[idx];
    return pair.isExpanded();
  };

  renderPair = (key, idx) => {
    const {
      componentData,
      isEditor,
      theme,
      renderTitle,
      renderContent,
      innerRCV,
      isPluginFocused,
      focusedPair,
    } = this.props;

    return (
      <AccordionPair
        ref={ref => (this.pairsRefs[idx] = ref)}
        key={key}
        idx={idx}
        pairKey={key}
        isExpanded={this.isExpanded(key, idx)}
        handleExpandOnlyOne={this.handleExpandOnlyOne}
        componentData={componentData}
        isEditor={isEditor}
        theme={theme}
        renderTitle={renderTitle}
        renderContent={renderContent}
        innerRCV={innerRCV}
        isPluginFocused={isPluginFocused}
        focusedPair={focusedPair}
      />
    );
  };

  renderDndHandle = dragHandleProps => {
    return (
      <div className={this.styles.dndIcon} {...dragHandleProps}>
        <Icons.dnd />
      </div>
    );
  };

  getDirection = () => this.props.componentData.config.direction;

  render() {
    const { componentData, isPluginFocused, isMobile, isEditor, Draggable } = this.props;
    const { pairs } = componentData;
    const isDragDisabled = !isPluginFocused || isMobile;

    return (
      <div className={this.styles.accordionViewer}>
        {pairs.map((pair, idx) =>
          isEditor ? (
            <Draggable
              key={pair.key}
              draggableId={pair.key}
              index={idx}
              isDragDisabled={isDragDisabled}
            >
              {provided => (
                <div
                  className={this.styles[this.getDirection()]}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                >
                  {!isDragDisabled && this.renderDndHandle(provided.dragHandleProps)}
                  {this.renderPair(pair.key, idx)}
                </div>
              )}
            </Draggable>
          ) : (
            this.renderPair(pair.key, idx)
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
  focusedPair: PropTypes.object,
  Draggable: PropTypes.object,
  dragHandleProps: PropTypes.object,
};

export default AccordionViewer;
