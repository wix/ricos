import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/accordion-pair.rtlignore.scss';
import { Icons } from '../defaults';

class AccordionPair extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = this.stateFromProps(props);
  }

  stateFromProps(props) {
    const { isExpanded, componentData } = props;
    const { config } = componentData;
    const { expandState, direction, expandOneSection } = config;
    return { isExpanded, expandState, direction, expandOneSection };
  }

  static getDerivedStateFromProps(props, state) {
    const { componentData, isExpanded, setInPluginEditingMode } = props;
    const { config } = componentData;
    const { expandState, direction, expandOneSection } = config;

    let newState = {};

    if (expandState !== state.expandState) {
      newState = { ...state, isExpanded, expandState, expandOneSection };
    }

    if (expandOneSection !== state.expandOneSection) {
      newState = { ...state, ...newState, expandOneSection };
    }

    if (direction !== state.direction) {
      newState = { ...state, ...newState, direction };
    }

    if (!setInPluginEditingMode && expandOneSection && isExpanded !== state.isExpanded) {
      newState = { ...state, ...newState, isExpanded };
    }

    return newState;
  }

  getZIndex = (idx, isTitle) => {
    const { isPluginFocused } = this.props;
    if (!isPluginFocused) {
      return 0;
    }

    const { focusedPair } = this.props;
    if (focusedPair?.idx === idx && focusedPair?.isTitle === isTitle) {
      return 5;
    } else {
      return 1;
    }
  };

  onClick = () => {
    const { handleOneSectionExpanded, idx } = this.props;
    const { expandOneSection } = this.state;
    if (expandOneSection) {
      handleOneSectionExpanded(idx);
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

  focusTitle = () => this.titleEditorRef.focus();

  focusContent = () => this.contentEditorRef.focus();

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
  handleOneSectionExpanded: PropTypes.func.isRequired,
  expandOneSection: PropTypes.bool.isRequired,
  renderTitle: PropTypes.func,
  renderContent: PropTypes.func,
  innerRCV: PropTypes.func,
  isPluginFocused: PropTypes.bool,
  isMobile: PropTypes.bool,
  focusedPair: PropTypes.object,
};

export default AccordionPair;
