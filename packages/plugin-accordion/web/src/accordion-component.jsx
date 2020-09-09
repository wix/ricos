/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import AccordionViewer from './accordion-viewer';
import { DEFAULTS, Icons, ACCORDION_TYPE } from './defaults';
import { mergeStyles } from 'wix-rich-content-common';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styles from '../statics/styles/accordion-component.rtlignore.scss';
import { Accordion } from './components/domain/accordion';

class AccordionComponent extends React.Component {
  constructor(props) {
    super(props);
    const { theme, t } = props;
    this.state = {};
    this.styles = mergeStyles({ styles, theme });
    this.titlePlaceholder = t('Accordion_ShownText_Add_Placeholder');
    this.contentPlaceholder = t('Accordion_CollapsedText_Add_Placeholder');
  }

  setFocusedPair = focusedPair => {
    this.accordionRef.focus(focusedPair);
    this.setState({ focusedPair });
  };

  deletePair = idx => {
    const pairs = this.getDataManager().getPairs();
    if (pairs.length === 1) {
      return;
    }

    this.getDataManager().deletePair(idx);
  };

  onBackspace = (idx, isTitle) => editorState => {
    const selection = editorState.getSelection();
    if (selection.isCollapsed() && selection.getAnchorOffset() === 0) {
      const startKey = selection.getStartKey();
      const contentState = editorState.getCurrentContent();

      if (contentState.getBlocksAsArray()[0].getKey() !== startKey) {
        return;
      }

      if (isTitle) {
        this.deletePair(idx);
        idx--;
      }

      if (idx >= 0) {
        const focusedPair = {
          idx,
          isTitle: !isTitle,
        };
        this.setFocusedPair(focusedPair);
      }
    }
  };

  renderTitle = (idx, setEditorRef) => {
    return (
      <this.renderInput
        idx={idx}
        value={this.getDataManager().getTitle(idx)}
        setEditorRef={setEditorRef}
        onChange={val => this.getDataManager().setTitle(idx, val)}
        placeholder={this.titlePlaceholder}
        isTitle
      />
    );
  };

  renderContent = (idx, setEditorRef) => {
    return (
      <this.renderInput
        idx={idx}
        value={this.getDataManager().getContent(idx)}
        setEditorRef={setEditorRef}
        onChange={val => this.getDataManager().setContent(idx, val)}
        placeholder={this.contentPlaceholder}
      />
    );
  };

  renderInput = ({ idx, value, setEditorRef, onChange, placeholder, isTitle }) => {
    const { renderInnerRCE } = this.props;

    const additionalProps = {
      direction: this.getDataManager().getDirection(),
      placeholder,
      onBackspace: this.onBackspace(idx, isTitle),
    };

    return renderInnerRCE({
      contentState: value,
      callback: newContentState => onChange(newContentState),
      renderedIn: ACCORDION_TYPE,
      additionalProps,
      onFocus: this.onFocus(idx, isTitle),
      setEditorRef,
    });
  };

  onClick = () => {
    this.getDataManager().insertNewPair();
    const focusedPair = {
      idx: this.getDataManager().getPairs().length,
      isTitle: true,
    };
    setTimeout(() => {
      this.setFocusedPair(focusedPair);
    });
  };

  renderNewPairButton = () => {
    const direction = this.getDataManager().getDirection();
    const Icon = Icons.plus;

    return (
      <div className={this.styles[direction]}>
        <button
          className={this.styles.new_pair_container}
          onClick={this.onClick}
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

  onFocus = (idx, isTitle) => () => {
    this.setState({
      focusedPair: { idx, isTitle },
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

    this.getDataManager().reorderPairs(result.source.index, result.destination.index);
  };

  getDataManager = () => {
    const { store, block, componentData } = this.props;
    return new Accordion(store, block, componentData);
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
                  ref={ref => (this.accordionRef = ref)}
                  componentData={componentData}
                  setInPluginEditingMode={setInPluginEditingMode}
                  theme={theme}
                  renderTitle={this.renderTitle}
                  renderContent={this.renderContent}
                  t={t}
                  isPluginFocused={isPluginFocused}
                  isMobile={isMobile}
                  focusedPair={this.state.focusedPair}
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
