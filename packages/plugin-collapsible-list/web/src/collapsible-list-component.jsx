/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import CollapsibleListPairs from './components/CollapsibleListPairs';
import { mergeStyles } from 'wix-rich-content-common';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CollapsibleList } from './components/domain/collapsibleList';
import NewPairButton from './components/NewPairButton';
import DndHandle from './components/DndHandle';
import { DEFAULTS, COLLAPSIBLE_LIST_TYPE } from './defaults';
import styles from '../statics/styles/collapsible-list-component.rtlignore.scss';

class CollapsibleListComponent extends React.Component {
  constructor(props) {
    super(props);
    const { theme, t } = props;
    this.styles = mergeStyles({ styles, theme });
    this.titlePlaceholder = t('CollapsibleList_ShownText_Placeholder');
    this.contentPlaceholder = t('CollapsibleList_CollapsedText_Placeholder');
    this.addNewPairLabel = t('CollapsibleList_ShownText_Add_Placeholder');
    this.collapsibleListRef = React.createRef();
  }

  focusPair = pair =>
    setTimeout(() => {
      this.collapsibleListRef.current.focusPair(pair);
    });

  expandPair = idx => this.collapsibleListRef.current.expandPair(idx);

  focusTitle = idx => {
    const pair = { idx, isTitle: true };
    this.focusPair(pair);
  };

  focusContent = idx => {
    const pair = { idx, isTitle: false };
    this.focusPair(pair);
  };

  onTitleBackspace = idx => {
    if (this.getDataManager().getPairs().length > 1) {
      this.getDataManager().deletePair(idx);
      this.collapsibleListRef.current.deletePair(idx);
      if (idx === 0) {
        this.focusTitle(idx);
      } else {
        this.focusContent(idx - 1);
      }
    }
  };

  renderTitle = (idx, setRef) => {
    return (
      <this.renderInput
        value={this.getDataManager().getTitle(idx)}
        setRef={setRef}
        onChange={val => this.getDataManager().setTitle(idx, val)}
        placeholder={this.titlePlaceholder}
        onBackspaceAtBeginningOfContent={() => this.onTitleBackspace(idx)}
        handleReturn={this.handleTitleReturn(idx)}
        toolbarsToIgnore={['SideToolbar']}
      />
    );
  };

  renderContent = (idx, setRef) => {
    return (
      <this.renderInput
        value={this.getDataManager().getContent(idx)}
        setRef={setRef}
        onChange={val => this.getDataManager().setContent(idx, val)}
        placeholder={this.contentPlaceholder}
        onBackspaceAtBeginningOfContent={() => this.focusTitle(idx)}
      />
    );
  };

  renderInput = ({
    value,
    setRef,
    onChange,
    placeholder,
    onBackspaceAtBeginningOfContent,
    handleReturn,
    toolbarsToIgnore,
  }) => {
    const { renderInnerRCE } = this.props;
    const direction = this.getDataManager().getDirection();
    const textAlignment = direction === 'ltr' ? 'left' : 'right';
    const additionalProps = {
      textAlignment,
      placeholder,
      handleReturn,
    };

    return renderInnerRCE({
      editorState: value,
      setRef,
      onChange,
      renderedIn: COLLAPSIBLE_LIST_TYPE,
      onBackspaceAtBeginningOfContent,
      direction,
      additionalProps,
      toolbarsToIgnore,
      onFocus: () => this.props.disableKeyboardEvents(true),
      onBlur: () => this.props.disableKeyboardEvents(false),
    });
  };

  handleTitleReturn = idx => () => () => {
    this.expandPair(idx);
    this.focusContent(idx);
    return 'handled';
  };

  onNewPairButtonClick = () => {
    const newPairIdx = this.getDataManager().getPairs().length;
    this.getDataManager().insertNewPair();
    this.collapsibleListRef.current.insertNewPair();
    this.focusTitle(newPairIdx);
  };

  onDragEnd = result => {
    // dropped outside the list or no change
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }

    this.getDataManager().reorderPairs(result.source.index, result.destination.index);
    this.collapsibleListRef.current.reorderPairs(result.source.index, result.destination.index);
  };

  getDataManager = props => {
    const { store, componentData } = props || this.props;
    return new CollapsibleList(store, componentData);
  };

  PairWrapper = ({ id, index, children }) => {
    const { isMobile, blockProps } = this.props;
    const isDragDisabled = isMobile || !blockProps.isFocused;
    return (
      <Draggable key={id} draggableId={id} index={index} isDragDisabled={isDragDisabled}>
        {provided => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            {!isDragDisabled && <DndHandle dragHandleProps={provided.dragHandleProps} />}
            {children}
          </div>
        )}
      </Draggable>
    );
  };

  onFocus = e => e.stopPropagation();

  render() {
    const { blockProps, theme, t, isMobile, helpers } = this.props;
    const pairs = this.getDataManager().getPairs();
    const expandState = this.getDataManager().getExpandState();
    const expandOnlyOne = this.getDataManager().getExpandOnlyOne();
    const direction = this.getDataManager().getDirection();

    return (
      <div
        className={this.styles[direction]}
        onFocus={this.onFocus}
        tabIndex="0"
        data-hook="collapsibleListComponent"
      >
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <CollapsibleListPairs
                  ref={this.collapsibleListRef}
                  theme={theme}
                  t={t}
                  isMobile={isMobile}
                  pairs={pairs}
                  expandState={expandState}
                  expandOnlyOne={expandOnlyOne}
                  renderTitle={this.renderTitle}
                  renderContent={this.renderContent}
                  PairWrapper={this.PairWrapper}
                  helpers={helpers}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {blockProps.isFocused && (
          <NewPairButton label={this.addNewPairLabel} onClick={this.onNewPairButtonClick} />
        )}
      </div>
    );
  }
}

CollapsibleListComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  disableKeyboardEvents: PropTypes.func.isRequired,
  renderInnerRCE: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  helpers: PropTypes.object.isRequired,
};

export { CollapsibleListComponent as Component, DEFAULTS };
