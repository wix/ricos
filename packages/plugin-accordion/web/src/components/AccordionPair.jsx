import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import ExpandCollapseButton from '../components/ExpandCollapseButton';
import styles from '../../statics/styles/accordion-pair.rtlignore.scss';

class AccordionPair extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = this.initState(props);
    this.titleEditorRef = React.createRef();
    this.contentEditorRef = React.createRef();
  }

  initState(props) {
    const { componentData, handleExpandOnlyOne, isExpanded, pairKey, isEditor } = props;
    const { config } = componentData;
    const { expandState, direction, expandOnlyOne } = config;

    if (isEditor && expandOnlyOne) {
      handleExpandOnlyOne(pairKey);
    }

    return {
      isExpanded: isEditor ? true : isExpanded,
      expandState,
      direction,
      expandOnlyOne,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { componentData, isExpanded } = props;
    const { config } = componentData;
    const { expandState, direction, expandOnlyOne } = config;

    let newState = {};

    // Expand state has changed
    if (expandState !== state.expandState) {
      newState = { ...state, isExpanded, expandState, expandOnlyOne };
    }

    // Expand only one state has changed
    if (expandOnlyOne !== state.expandOnlyOne) {
      newState = { ...state, ...newState, expandOnlyOne };
    }

    // Direction state has changed
    if (direction !== state.direction) {
      newState = { ...state, ...newState, direction };
    }

    // Expand only one changes state of expand/collapse
    if (expandOnlyOne && isExpanded !== state.isExpanded) {
      newState = { ...state, ...newState, isExpanded };
    }

    return newState;
  }

  isExpanded = () => this.state.isExpanded;

  handleExpandOnlyOne = () => {
    const { handleExpandOnlyOne, pairKey } = this.props;
    const { expandOnlyOne } = this.state;

    if (expandOnlyOne) {
      handleExpandOnlyOne(pairKey);
    }
  };

  expand = () => {
    if (!this.isExpanded()) {
      this.handleExpandOnlyOne();
      this.setState({ isExpanded: true });
    }
  };

  focusTitle = () => this.titleEditorRef.current?.focus();

  focusContent = () => this.contentEditorRef.current?.focus();

  renderTitle = () => {
    const { idx, renderTitle, innerRCV } = this.props;
    const getTitle = idx => this.props.componentData.pairs[idx].title;

    return (
      <div className={this.styles.title}>
        {renderTitle ? renderTitle(idx, this.titleEditorRef) : innerRCV(getTitle(idx))}
      </div>
    );
  };

  renderContent = () => {
    const { idx, renderContent, innerRCV } = this.props;
    const getContent = idx => this.props.componentData.pairs[idx].content;

    return (
      <>
        {this.isExpanded() && (
          <div className={this.styles.content}>
            {renderContent ? renderContent(idx, this.contentEditorRef) : innerRCV(getContent(idx))}
          </div>
        )}
      </>
    );
  };

  onClick = () => {
    this.handleExpandOnlyOne();
    this.setState({ isExpanded: !this.isExpanded() });
  };

  render() {
    return (
      <>
        <div className={this.styles.titleContainer}>
          <ExpandCollapseButton isExpanded={this.isExpanded()} onClick={this.onClick} />
          {this.renderTitle()}
        </div>
        {this.renderContent()}
      </>
    );
  }
}

AccordionPair.propTypes = {
  theme: PropTypes.object.isRequired,
  isEditor: PropTypes.bool,
  componentData: PropTypes.object.isRequired,
  pairKey: PropTypes.number.isRequired,
  idx: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  handleExpandOnlyOne: PropTypes.func.isRequired,
  expandOnlyOne: PropTypes.bool.isRequired,
  renderTitle: PropTypes.func,
  renderContent: PropTypes.func,
  innerRCV: PropTypes.func,
};

export default AccordionPair;
