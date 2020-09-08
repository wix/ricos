import React from 'react';
import PropTypes from 'prop-types';
import AccordionViewer from './accordion-viewer';
import { DEFAULTS, FIRST_PAIR, Icons, NEW_PAIR_DATA, ACCORDION_TYPE } from './defaults';
import { mergeStyles } from 'wix-rich-content-common';
import { EditorState, convertToRaw } from 'wix-rich-content-editor';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { toInteger } from 'lodash';
import styles from '../statics/styles/accordion-component.rtlignore.scss';

const convertArrayToObject = array => {
  let idx = 0;
  return array.reduce((res, pair) => {
    return {
      ...res,
      [++idx]: pair[1],
    };
  }, {});
};

class AccordionComponent extends React.Component {
  constructor(props) {
    super(props);
    const { theme, t } = props;
    this.state = {};
    this.styles = mergeStyles({ styles, theme });
    this.titlePlaceholder = t('Accordion_ShownText_Add_Placeholder');
    this.contentPlaceholder = t('Accordion_CollapsedText_Add_Placeholder');
  }

  getPairs = () => this.props.componentData.pairs;

  getPair = id => this.props.componentData.pairs[id];

  getTitle = id => this.props.componentData.pairs[id].title;

  setTitle = (id, value) => {
    const { componentData, block, store } = this.props;
    const pair = this.getPair(id);
    pair.title = value;
    store.set('componentData', { ...componentData }, block.getKey());
  };

  getContent = id => this.props.componentData.pairs[id].content;

  setContent = (id, value) => {
    const { componentData, block, store } = this.props;
    const pair = this.getPair(id);
    pair.content = value;
    store.set('componentData', { ...componentData }, block.getKey());
  };

  insertNewPair = () => {
    const { block, store, componentData } = this.props;
    const pairs = this.getPairs();
    const id = Object.keys(pairs).length + 1;

    const updatedComponentData = {
      ...componentData,
      pairs: { ...pairs, [id]: NEW_PAIR_DATA },
    };
    store.update('componentData', updatedComponentData, block.getKey());
    this.setState({ shouldForceFocus: true, idToFocus: id.toString(), shouldFocusTitle: true });
  };

  deletePair = pairIndex => {
    const { block, store, componentData } = this.props;
    const pairs = this.getPairs();
    if (Object.keys(pairs).length < 2) {
      return;
    }

    const pairsArray = Object.entries(pairs);
    pairsArray.splice(pairIndex, 1);

    const updatedComponentData = { ...componentData, pairs: convertArrayToObject(pairsArray) };
    store.set('componentData', updatedComponentData, block.getKey());
    this.setState({
      shouldForceFocus: true,
      idToFocus: pairIndex.toString(),
      shouldFocusTitle: false,
    });
  };

  reorderPairs = (startIdx, endIdx) => {
    const { block, store, componentData } = this.props;
    const pairs = this.getPairs();
    const reorderedPairs = Object.entries(pairs);
    const [pairToMove] = reorderedPairs.splice(startIdx, 1);
    reorderedPairs.splice(endIdx, 0, pairToMove);

    const updatedComponentData = { ...componentData, pairs: convertArrayToObject(reorderedPairs) };
    store.set('componentData', updatedComponentData, block.getKey());
  };

  onFocus = (id, isTitle) => () => {
    this.setState({
      shouldForceFocus: undefined,
      idToFocus: undefined,
      shouldFocusTitle: undefined,
      lastFocusedPair: { id, isTitle },
    });
  };

  handleIconStyleChange = iconStyle => {
    const { componentData, block, store } = this.props;
    const { config } = componentData;
    const updatedComponentData = { ...componentData, config: { ...config, iconStyle } };
    store.update('componentData', updatedComponentData, block.getKey());
  };

  renderNewPairButton = () => {
    const direction = this.props.componentData.config.direction;
    const Icon = Icons.plus;

    return (
      <div className={this.styles[direction]}>
        <button
          className={this.styles.new_pair_container}
          onClick={this.insertNewPair}
          data-hook={'AccordionNewPair_button'}
        >
          <div className={this.styles.new_pair_button}>
            <Icon />
            <label className={this.styles.new_pair_label}>{this.titlePlaceholder}</label>
          </div>
        </button>
      </div>
    );
  };

  idToIndex = id => toInteger(id) - 1;

  calcZindex = (id, isTitle) =>
    this.state.lastFocusedPair?.id === id && this.state.lastFocusedPair?.isTitle === isTitle
      ? 5
      : 1;

  onBackspace = (id, isTitle) => editorState => {
    const selection = editorState.getSelection();
    if (selection.isCollapsed() && selection.getAnchorOffset() === 0) {
      const startKey = selection.getStartKey();
      const contentState = editorState.getCurrentContent();

      if (contentState.getBlocksAsArray()[0].getKey() === startKey) {
        if (isTitle) {
          this.deletePair(this.idToIndex(id));
        } else {
          this.setState({ shouldForceFocus: true, idToFocus: id, shouldFocusTitle: true });
        }
      }
    }
  };

  renderTitle = (id, setEditorRef) => {
    return (
      <this.renderInput
        id={id}
        value={this.getContent(id)}
        setEditorRef={setEditorRef}
        onChange={val => this.setTitle(id, val)}
        isTitle
      />
    );
  };

  renderContent = (id, setEditorRef) => {
    return (
      <this.renderInput
        id={id}
        value={this.getContent(id)}
        setEditorRef={setEditorRef}
        onChange={val => this.setContent(id, val)}
      />
    );
  };

  renderInput = ({ id, isTitle, setEditorRef, onChange }) => {
    const {
      renderInnerRCE,
      componentData: { config },
    } = this.props;

    let contentState = isTitle ? this.getTitle(id) : this.getContent(id);

    if (!contentState) {
      contentState = convertToRaw(EditorState.createEmpty().getCurrentContent());
      onChange(contentState);
    }

    const additionalProps = {
      direction: config.direction,
      style: {
        zIndex: !isTitle && this.isPluginFocused() ? this.calcZindex(id, isTitle) : 0,
        cursor: 'auto',
      },
      placeholder:
        id === FIRST_PAIR ? (isTitle ? this.titlePlaceholder : this.contentPlaceholder) : '',
      onBackspace: this.onBackspace(id, isTitle),
    };

    return renderInnerRCE({
      contentState,
      callback: newContentState => onChange(newContentState),
      renderedIn: ACCORDION_TYPE,
      additionalProps,
      onFocus: this.onFocus(id, isTitle),
      setEditorRef,
    });
  };

  isPluginFocused() {
    const blockKey = this.props.block.getKey();
    const selectedBlockKey = this.props.selection.getAnchorKey();

    return blockKey === selectedBlockKey;
  }

  onDragEnd = result => {
    // dropped outside the list or no change
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }

    this.reorderPairs(result.source.index, result.destination.index);
  };

  render() {
    const { componentData, setInPluginEditingMode, theme, t, isMobile } = this.props;
    const isPluginFocused = this.isPluginFocused();

    return (
      <div data-hook="accordionComponent">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <AccordionViewer
                  componentData={componentData}
                  setInPluginEditingMode={setInPluginEditingMode}
                  theme={theme}
                  renderTitle={this.renderTitle}
                  renderContent={this.renderContent}
                  t={t}
                  isPluginFocused={isPluginFocused}
                  idToIndex={this.idToIndex}
                  calcZindex={this.calcZindex}
                  isMobile={isMobile}
                  shouldForceFocus={this.state.shouldForceFocus}
                  idToFocus={this.state.idToFocus}
                  shouldFocusTitle={this.state.shouldFocusTitle}
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
  setInPluginEditingMode: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  renderInnerRCE: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export { AccordionComponent as Component, DEFAULTS };
