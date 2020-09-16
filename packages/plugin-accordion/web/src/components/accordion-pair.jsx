import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/accordion-pair.rtlignore.scss';
import { Icons, MIN_ZINDEX, MID_ZINDEX, MAX_ZINDEX } from '../defaults';

class AccordionPair extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = this.stateFromProps(props);
    this.titleEditorRef = React.createRef();
    this.contentEditorRef = React.createRef();
  }

  stateFromProps(props) {
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

  getZIndex = (idx, isTitle) => {
    const { isPluginFocused } = this.props;
    if (!isPluginFocused) {
      return MIN_ZINDEX;
    }

    const { focusedPair } = this.props;
    if (focusedPair?.idx === idx && focusedPair?.isTitle === isTitle) {
      return MAX_ZINDEX;
    }

    return MID_ZINDEX;
  };

  onClick = () => {
    const { handleExpandOnlyOne, pairKey } = this.props;
    const { expandOnlyOne } = this.state;

    if (expandOnlyOne) {
      handleExpandOnlyOne(pairKey);
    }

    this.setState({ isExpanded: !this.state.isExpanded });
  };

  renderIcon = () => {
    const { componentData } = this.props;
    const { config } = componentData;
    const { iconStyle } = config;
    const Icon = Icons[iconStyle];

    const { isExpanded } = this.state;
    const style = {
      transform: `rotate(${isExpanded ? '90' : '0'}deg)`,
      transition: 'transform 0.15s linear',
    };

    return (
      <button
        className={this.styles.icon}
        onClick={this.onClick}
        style={{ zIndex: this.getZIndex() }}
      >
        <Icon style={style} />
      </button>
    );
  };

  focusTitle = () => this.titleEditorRef.current?.focus();

  focusContent = () => this.contentEditorRef.current?.focus();

  expand = () => {
    const { handleExpandOnlyOne, pairKey } = this.props;
    const { expandOnlyOne } = this.state;

    if (expandOnlyOne) {
      handleExpandOnlyOne(pairKey);
    }

    this.setState({ isExpanded: true });
  };

  isExpanded = () => this.state.isExpanded;

  renderTitle = () => {
    const { idx, renderTitle, innerRCV } = this.props;
    const getTitle = idx => this.props.componentData.pairs[idx].title;

    return (
      <div className={this.styles.title_content} style={{ zIndex: this.getZIndex(idx, true) }}>
        {renderTitle ? renderTitle(idx, this.titleEditorRef) : innerRCV(getTitle(idx))}
      </div>
    );
  };

  renderContent = () => {
    const { idx, renderContent, innerRCV } = this.props;
    const getContent = idx => this.props.componentData.pairs[idx].content;

    return (
      <>
        {this.state.isExpanded && (
          <div className={this.styles.content} style={{ zIndex: this.getZIndex(idx) }}>
            {renderContent ? renderContent(idx, this.contentEditorRef) : innerRCV(getContent(idx))}
          </div>
        )}
      </>
    );
  };

  render() {
    return (
      <div className={this.styles[this.state.direction]}>
        <div className={this.styles.title}>
          {this.renderIcon()}
          {this.renderTitle()}
        </div>
        {this.renderContent()}
      </div>
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
  isPluginFocused: PropTypes.bool,
  focusedPair: PropTypes.object,
};

export default AccordionPair;
