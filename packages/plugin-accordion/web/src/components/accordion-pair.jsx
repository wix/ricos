import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/accordion-pair.rtlignore.scss';
import { Icons, MIN_ZINDEX, MID_ZINDEX, MAX_ZINDEX } from '../defaults';

class AccordionPair extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = this.stateFromProps(props);
  }

  stateFromProps(props) {
    const { componentData, handleExpandOnlyOne, idx } = props;
    const { config } = componentData;
    const { expandState, direction, expandOnlyOne } = config;
    if (expandOnlyOne) {
      handleExpandOnlyOne(idx);
    }

    return { isExpanded: true, expandState, direction, expandOnlyOne };
  }

  static getDerivedStateFromProps(props, state) {
    const { componentData, isExpanded } = props;
    const { config } = componentData;
    const { expandState, direction, expandOnlyOne } = config;

    let newState = {};

    if (expandState !== state.expandState) {
      newState = { ...state, isExpanded, expandState, expandOnlyOne };
    }

    if (expandOnlyOne !== state.expandOnlyOne) {
      newState = { ...state, ...newState, expandOnlyOne };
    }

    if (direction !== state.direction) {
      newState = { ...state, ...newState, direction };
    }

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
    const { handleExpandOnlyOne, idx } = this.props;
    const { expandOnlyOne } = this.state;
    if (expandOnlyOne) {
      handleExpandOnlyOne(idx);
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
        className={classNames(
          this.styles.icon,
          this.styles[`${iconStyle}_${isExpanded ? 'expanded' : 'collapsed'}`]
        )}
        onClick={this.onClick}
        style={{ zIndex: this.getZIndex() }}
      >
        <Icon style={style} />
      </button>
    );
  };

  focusTitle = () => this.titleEditorRef?.focus();

  focusContent = () => this.contentEditorRef?.focus();

  renderTitle = () => {
    const { idx, renderTitle, innerRCV } = this.props;
    const getTitle = idx => this.props.componentData.pairs[idx].title;
    const setTitleEditorRef = ref => (this.titleEditorRef = ref);

    return (
      <div className={this.styles.title_content} style={{ zIndex: this.getZIndex(idx, true) }}>
        {renderTitle ? renderTitle(idx, setTitleEditorRef) : innerRCV(getTitle(idx))}
      </div>
    );
  };

  renderContent = () => {
    const { idx, renderContent, innerRCV } = this.props;
    const getContent = idx => this.props.componentData.pairs[idx].content;
    const setContentEditorRef = ref => (this.contentEditorRef = ref);

    return (
      <>
        {this.state.isExpanded && (
          <div className={this.styles.content} style={{ zIndex: this.getZIndex(idx) }}>
            {renderContent ? renderContent(idx, setContentEditorRef) : innerRCV(getContent(idx))}
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
  setInPluginEditingMode: oneOf(PropTypes.func, undefined),
  componentData: PropTypes.object.isRequired,
  idx: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  handleExpandOnlyOne: PropTypes.func.isRequired,
  expandOnlyOne: PropTypes.bool.isRequired,
  renderTitle: PropTypes.func,
  renderContent: PropTypes.func,
  innerRCV: PropTypes.func,
  isPluginFocused: PropTypes.bool,
  isMobile: PropTypes.bool,
  focusedPair: PropTypes.object,
};

export default AccordionPair;
