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
    const { visualization, direction, expandOneSection } = config;
    return { isExpanded, visualization, direction, expandOneSection };
  }

  static getDerivedStateFromProps(props, state) {
    const { componentData, isExpanded, setInPluginEditingMode } = props;
    const { config } = componentData;
    const { visualization, direction, expandOneSection } = config;

    let newState = {};

    if (visualization !== state.visualization) {
      newState = { ...state, isExpanded, visualization, expandOneSection };
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

  componentDidUpdate() {
    const { focusedPair } = this.props;
    if (this.props.shouldFocus && this.props.id === focusedPair?.id) {
      if (focusedPair?.isTitle) {
        this.titleEditorRef.focus();
      } else {
        this.contentEditorRef.focus();
      }
    }
  }

  getTitle = id => this.props.componentData.pairs[id].title;

  getContent = id => this.props.componentData.pairs[id].content;

  setTitleEditorRef = ref => (this.titleEditorRef = ref);

  setContentEditorRef = ref => (this.contentEditorRef = ref);

  getZIndex = (id, isTitle) => {
    const { isPluginFocused } = this.props;
    if (!isPluginFocused) {
      return 0;
    }

    const { focusedPair } = this.props;
    if (focusedPair?.id === id && focusedPair?.isTitle === isTitle) {
      return 5;
    } else {
      return 1;
    }
  };

  renderTitle = () => {
    const { id, renderTitle, innerRCV } = this.props;

    return (
      <div className={this.styles.title_content} style={{ zIndex: this.getZIndex(id, true) }}>
        {renderTitle ? renderTitle(id, this.setTitleEditorRef) : innerRCV(this.getTitle(id))}
      </div>
    );
  };

  renderContent = () => {
    const { id, renderContent, innerRCV } = this.props;

    return (
      <>
        {this.state.isExpanded && (
          <div className={this.styles.content} style={{ zIndex: this.getZIndex(id) }}>
            {renderContent
              ? renderContent(id, this.setContentEditorRef)
              : innerRCV(this.getContent(id))}
          </div>
        )}
      </>
    );
  };

  handleExpandCollapse = () => {
    const { handleOneSectionExpanded, id } = this.props;
    const { expandOneSection } = this.state;
    if (expandOneSection) {
      handleOneSectionExpanded(id);
    }
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  renderDndHandle = () => {
    const { setInPluginEditingMode, isMobile, isPluginFocused, dragHandleProps } = this.props;

    if (!setInPluginEditingMode) {
      return null;
    }

    const props = isMobile || !isPluginFocused ? { style: { visibility: 'hidden' } } : {};
    const Icon = Icons.dndUnselected;

    return (
      <div className={this.styles.hoverIcon} {...dragHandleProps} {...props}>
        <Icon />
      </div>
    );
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
        onClick={this.handleExpandCollapse}
        style={{ zIndex: this.getZIndex() }}
      >
        <Icon style={style} />
      </button>
    );
  };

  render() {
    return (
      <div className={this.styles[this.state.direction]}>
        {this.renderDndHandle()}
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
  id: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  handleOneSectionExpanded: PropTypes.func.isRequired,
  expandOneSection: PropTypes.bool.isRequired,
  renderTitle: PropTypes.func,
  renderContent: PropTypes.func,
  innerRCV: PropTypes.func,
  isPluginFocused: PropTypes.bool,
  isMobile: PropTypes.bool,
  dragHandleProps: PropTypes.object,
  shouldFocus: PropTypes.bool,
  focusedPair: PropTypes.object,
};

export default AccordionPair;
