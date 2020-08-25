import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../../statics/styles/accordion-pair.rtlignore.scss';
import { Icons } from '../../defaults';

class AccordionPair extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = this.stateFromProps(props);
  }

  static getDerivedStateFromProps(props, state) {
    const {
      componentData: {
        config: { visualization, direction, expandOneSection },
      },
      isExpanded,
      setInPluginEditingMode,
    } = props;

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

  stateFromProps(props) {
    const {
      isExpanded,
      componentData: {
        config: { visualization, direction, expandOneSection },
      },
    } = props;
    return { isExpanded, visualization, direction, expandOneSection };
  }

  handleExpandCollapse = () => {
    const { handleOneSectionExpanded, id } = this.props;
    const { expandOneSection } = this.state;
    if (expandOneSection) {
      handleOneSectionExpanded(id);
    }
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  renderDndHoverIcon = () => {
    const { setInPluginEditingMode, isPluginFocused } = this.props;

    if (!setInPluginEditingMode || !isPluginFocused) {
      return null;
    }

    const Icon = Icons.dndUnselected;

    return (
      <div className={this.styles.hoverIcon}>
        <Icon />
      </div>
    );
  };

  renderIcon = () => {
    const {
      componentData: {
        config: { iconStyle },
      },
    } = this.props;
    const { isExpanded } = this.state;
    const Icon = Icons[iconStyle];

    return (
      <button className={this.styles.icon} onClick={this.handleExpandCollapse}>
        <Icon
          style={{
            transform: `rotate(${isExpanded ? '90' : '0'}deg)`,
            transition: 'transform 0.25s linear',
          }}
        />
      </button>
    );
  };

  renderInnerRCE = (id, isTitle) => {
    const {
      componentData: {
        pairs: { [id]: pair },
      },
      renderInnerRCE,
      innerRCV,
    } = this.props;

    const contentState = isTitle ? pair.title : pair.content;
    return renderInnerRCE ? renderInnerRCE(id, isTitle) : innerRCV(contentState);
  };

  renderTitle = () => {
    const { id } = this.props;

    return <div className={this.styles.title_content}>{this.renderInnerRCE(id, true)}</div>;
  };

  renderContent = () => {
    const { id } = this.props;

    return (
      <>
        {this.state.isExpanded && (
          <div className={this.styles.content}>{this.renderInnerRCE(id)}</div>
        )}
      </>
    );
  };

  render() {
    return (
      <div className={this.styles[this.state.direction]}>
        {this.renderDndHoverIcon()}
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
  renderInnerRCE: PropTypes.func,
  innerRCV: PropTypes.func,
  isPluginFocused: PropTypes.bool,
};

export default AccordionPair;
