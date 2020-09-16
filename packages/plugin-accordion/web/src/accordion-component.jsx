import React from 'react';
import PropTypes from 'prop-types';
import AccordionViewer from './accordion-viewer';
import { mergeStyles } from 'wix-rich-content-common';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Accordion } from './components/domain/accordion';
import NewPairButton from './components/NewPairButton';
import { DEFAULTS, ACCORDION_TYPE } from './defaults';
import styles from '../statics/styles/accordion-component.rtlignore.scss';

class AccordionComponent extends React.Component {
  constructor(props) {
    super(props);
    const { theme, t } = props;
    this.state = {};
    this.styles = mergeStyles({ styles, theme });
    this.titlePlaceholder = t('Accordion_ShownText_Placeholder');
    this.contentPlaceholder = t('Accordion_CollapsedText_Placeholder');
    this.addNewPairPlaceHolder = t('Accordion_ShownText_Add_Placeholder');
    this.accordionRef = React.createRef();
  }

  focusPair = focusedPair =>
    setTimeout(() => {
      this.accordionRef.current.focusPair(focusedPair);
      this.setState({ focusedPair });
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

  onBackspace = (idx, isTitle) => editorState => {
    const selection = editorState.getSelection();
    const startKey = selection.getStartKey();
    const contentState = editorState.getCurrentContent();
    const isCollapsed = selection.isCollapsed();
    const isFirstBlock = contentState.getBlocksAsArray()[0].getKey() === startKey;
    const isBeginingOfBlock = selection.getAnchorOffset() === 0;

    if (isCollapsed && isFirstBlock && isBeginingOfBlock) {
      if (isTitle) {
        this.onTitleBackspace(idx);
      } else {
        this.onContentBackspace(idx);
      }
    }
  };

  onTitleBackspace = idx => {
    if (this.getDataManager().getPairs().length > 1) {
      this.getDataManager().deletePair(idx);
      if (idx === 0) {
        this.focusTitle(idx);
      } else {
        this.focusContent(idx - 1);
      }
    }
  };

  onContentBackspace = idx => this.focusTitle(idx);

  renderTitle = (idx, setRef) => {
    return (
      <this.renderInput
        idx={idx}
        value={this.getDataManager().getTitle(idx)}
        setRef={setRef}
        onChange={val => this.getDataManager().setTitle(idx, val)}
        placeholder={this.titlePlaceholder}
        isTitle
      />
    );
  };

  renderContent = (idx, setRef) => {
    return (
      <this.renderInput
        idx={idx}
        value={this.getDataManager().getContent(idx)}
        setRef={setRef}
        onChange={val => this.getDataManager().setContent(idx, val)}
        placeholder={this.contentPlaceholder}
      />
    );
  };

  renderInput = ({ idx, value, setRef, onChange, placeholder, isTitle }) => {
    const { renderInnerRCE } = this.props;

    const additionalProps = {
      direction: this.getDataManager().getDirection(),
      placeholder,
      onBackspace: this.onBackspace(idx, isTitle),
      handleReturn: isTitle && this.handleTitleReturn(idx),
    };

    return renderInnerRCE({
      contentState: value,
      callback: onChange,
      renderedIn: ACCORDION_TYPE,
      additionalProps,
      onFocus: this.onFocus(idx, isTitle),
      setRef,
    });
  };

  onFocus = (idx, isTitle) => () =>
    this.setState({
      focusedPair: { idx, isTitle },
    });

  handleTitleReturn = idx => () => () => {
    this.expandPair(idx);
    this.focusContent(idx);
    return 'handled';
  };

  onClick = () => {
    const newPairIdx = this.getDataManager().getPairs().length;
    this.getDataManager().insertNewPair();
    this.focusTitle(newPairIdx);
  };

  onDragEnd = result => {
    // dropped outside the list or no change
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }

    this.getDataManager().reorderPairs(result.source.index, result.destination.index);
  };

  getDataManager = () => {
    const { store, block, componentData } = this.props;
    return new Accordion(store, block, componentData);
  };

  render() {
    const { componentData, blockProps, theme, isMobile } = this.props;
    const direction = this.getDataManager().getDirection();

    return (
      <div className={this.styles[direction]} data-hook="accordionComponent">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <AccordionViewer
                  ref={this.accordionRef}
                  componentData={componentData}
                  theme={theme}
                  renderTitle={this.renderTitle}
                  renderContent={this.renderContent}
                  isPluginFocused={blockProps.isFocused}
                  isMobile={isMobile}
                  focusedPair={this.state.focusedPair}
                  Draggable={Draggable}
                  isEditor
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {blockProps.isFocused && (
          <NewPairButton placeholder={this.addNewPairPlaceHolder} onClick={this.onClick} />
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
