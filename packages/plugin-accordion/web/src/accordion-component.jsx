import React from 'react';
import PropTypes from 'prop-types';
import AccordionViewer from './accordion-viewer';
import { DEFAULTS, NEW_PAIR, NEW_PAIR_DATA, ACCORDION_TYPE } from './defaults';
import { mergeStyles } from 'wix-rich-content-common';
import AccordionPair from './components/viewer-components/accordion-pair';
import { EditorState, convertToRaw } from 'wix-rich-content-editor';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styles from '../statics/styles/accordion-component.scss';

class AccordionComponent extends React.Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.state = {};
    this.styles = mergeStyles({ styles, theme });
  }

  onChange = (id, contentState, isTitle) => {
    const {
      block,
      store,
      componentData: { pairs },
      componentData: {
        pairs: { [id]: pair },
      },
      componentData,
    } = this.props;

    if (isTitle) {
      pair.title = contentState;
    } else {
      pair.content = contentState;
    }

    const updatedComponentData = {
      ...componentData,
      pairs: { ...pairs, [id]: { ...pair } },
    };
    store.set('componentData', updatedComponentData, block.getKey());
  };

  insertNewPair = () => {
    const {
      block,
      store,
      componentData: { pairs },
      componentData,
    } = this.props;

    const key = Object.keys(pairs).length + 1;
    const updatedComponentData = {
      ...componentData,
      pairs: { ...pairs, [key]: NEW_PAIR_DATA },
    };
    store.update('componentData', updatedComponentData, block.getKey());
    this.setState({ shouldForceFocus: true });
  };

  resetForcedFocus = () => this.setState({ shouldForceFocus: false });

  onDragEnd = result => {
    // dropped outside the list or no change
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }
    this.reorder(result.source.index, result.destination.index);
  };

  reorder = (startIdx, endIdx) => {
    const {
      block,
      store,
      componentData: { pairs },
      componentData,
    } = this.props;

    const reorderedPairs = Object.entries(pairs);
    const [pairToMove] = reorderedPairs.splice(startIdx, 1);
    reorderedPairs.splice(endIdx, 0, pairToMove);

    const convertArrayToObject = array => {
      let idx = 0;
      return array.reduce((res, pair) => {
        return {
          ...res,
          [++idx]: pair[1],
        };
      }, {});
    };

    const updatedComponentData = { ...componentData, pairs: convertArrayToObject(reorderedPairs) };
    store.set('componentData', updatedComponentData, block.getKey());
  };

  handleIconStyleChange = iconStyle => {
    const {
      componentData: { config },
      componentData,
      block,
      store,
    } = this.props;

    const updatedComponentData = { ...componentData, config: { ...config, iconStyle } };
    store.update('componentData', updatedComponentData, block.getKey());
  };

  renderNewPairButton = () => {
    const { componentData, setInPluginEditingMode, theme, t } = this.props;

    return (
      <button className={this.styles.new_pair_button} onClick={this.insertNewPair}>
        <AccordionPair
          id={NEW_PAIR}
          isExpanded={false}
          componentData={componentData}
          setInPluginEditingMode={setInPluginEditingMode}
          theme={theme}
          t={t}
        />
      </button>
    );
  };

  isPluginFocused() {
    const blockKey = this.props.block.getKey();
    const selectedBlockKey = this.props.selection.getAnchorKey();

    return blockKey === selectedBlockKey;
  }

  isLastPair = (pairs, id) => Object.keys(pairs).length.toString() === id;

  renderInnerRCE = (id, isTitle) => {
    const {
      renderInnerRCE,
      componentData: {
        pairs: { [id]: pair },
      },
      componentData: { config, pairs },
    } = this.props;

    let contentState = isTitle ? pair.title : pair.content;

    if (!contentState) {
      contentState = convertToRaw(EditorState.createEmpty().getCurrentContent());
      this.onChange(id, contentState, isTitle);
    }

    return renderInnerRCE(
      contentState,
      newContentState => this.onChange(id, newContentState, isTitle),
      ACCORDION_TYPE,
      {
        direction: config.direction,
        shouldFocus: isTitle && this.state.shouldForceFocus && this.isLastPair(pairs, id),
        onFocusEnd: this.resetForcedFocus,
      }
    );
  };

  render() {
    const { componentData, setInPluginEditingMode, theme, t } = this.props;
    const isPluginFocused = this.isPluginFocused();

    return (
      <div className={this.styles.accordionComponent}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ zIndex: isPluginFocused ? '1' : '0' }}
              >
                <AccordionViewer
                  componentData={componentData}
                  setInPluginEditingMode={setInPluginEditingMode}
                  theme={theme}
                  renderInnerRCE={this.renderInnerRCE}
                  t={t}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {isPluginFocused && this.renderNewPairButton()}
      </div>
    );
  }
}

AccordionComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  setInPluginEditingMode: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  renderInnerRCE: PropTypes.func.isRequired,
};

export { AccordionComponent as Component, DEFAULTS };
