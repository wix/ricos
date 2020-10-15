import React from 'react';
import PropTypes from 'prop-types';
import AccordionPairs from './components/AccordionPairs';
import { mergeStyles } from 'wix-rich-content-common';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Accordion } from './components/domain/accordion';
import NewPairButton from './components/NewPairButton';
import DndHandle from './components/DndHandle';
import { DEFAULTS, ACCORDION_TYPE } from './defaults';
import styles from '../statics/styles/accordion-component.rtlignore.scss';

class AccordionComponent extends React.Component {
  constructor(props) {
    super(props);
    const { theme, t } = props;
    this.styles = mergeStyles({ styles, theme });
    this.titlePlaceholder = t('Accordion_ShownText_Placeholder');
    this.contentPlaceholder = t('Accordion_CollapsedText_Placeholder');
    this.addNewPairLabel = t('Accordion_ShownText_Add_Placeholder');
    this.accordionRef = React.createRef();
  }

  focusPair = pair =>
    setTimeout(() => {
      this.accordionRef.current.focusPair(pair);
    });

  expandPair = idx => this.accordionRef.current.expandPair(idx);

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
      this.accordionRef.current.deletePair(idx);
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
      contentState: value,
      setRef,
      callback: onChange,
      renderedIn: ACCORDION_TYPE,
      onBackspaceAtBeginningOfContent,
      direction,
      additionalProps,
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
    this.accordionRef.current.insertNewPair();
    this.focusTitle(newPairIdx);
  };

  onDragEnd = result => {
    // dropped outside the list or no change
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }

    this.getDataManager().reorderPairs(result.source.index, result.destination.index);
    this.accordionRef.current.reorderPairs(result.source.index, result.destination.index);
  };

  getDataManager = props => {
    const { store, componentData } = props || this.props;
    return new Accordion(store, componentData);
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

  render() {
    const { blockProps, theme, isMobile } = this.props;
    const pairs = this.getDataManager().getPairs();
    const expandState = this.getDataManager().getExpandState();
    const expandOnlyOne = this.getDataManager().getExpandOnlyOne();
    const direction = this.getDataManager().getDirection();

    return (
      <div className={this.styles[direction]} data-hook="accordionComponent">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <AccordionPairs
                  ref={this.accordionRef}
                  theme={theme}
                  isMobile={isMobile}
                  pairs={pairs}
                  expandState={expandState}
                  expandOnlyOne={expandOnlyOne}
                  renderTitle={this.renderTitle}
                  renderContent={this.renderContent}
                  PairWrapper={this.PairWrapper}
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

AccordionComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  renderInnerRCE: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export { AccordionComponent as Component, DEFAULTS };
