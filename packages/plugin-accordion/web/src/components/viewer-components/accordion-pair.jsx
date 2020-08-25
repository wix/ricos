import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../../statics/styles/accordion-pair.rtlignore.scss';
import { Icons, NEW_PAIR, directions } from '../../defaults';

class AccordionPair extends Component {
  constructor(props) {
    super(props);
    const { theme, t } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = this.stateFromProps(props);
    this.titlePlaceholder = t('Accordion_ShownText_Add_Placeholder');
    this.contentPlaceholder = t('Accordion_CollapsedText_Add_Placeholder');
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

  isNewPair = id => id === NEW_PAIR;

  renderIcon = () => {
    const {
      componentData: {
        config: { iconStyle },
      },
      id,
    } = this.props;
    const { isExpanded } = this.state;

    const Icon = Icons[this.isNewPair(id) ? 'plus' : iconStyle];

    const Element = this.isNewPair(id) ? 'div' : 'button';
    const props = !this.isNewPair(id) ? { onClick: this.handleExpandCollapse } : {};

    return (
      <Element
        className={this.styles.icon}
        style={{ paddingTop: this.isNewPair(id) ? '7px' : 'unset' }}
        {...props}
      >
        <Icon
          style={{
            transform: `rotate(${isExpanded ? '90' : '0'}deg)`,
            transition: 'transform 0.25s linear',
          }}
        />
      </Element>
    );
  };

  renderInnerRCE = (id, isTitle) => {
    const {
      componentData: {
        config: { direction },
      },
    } = this.props;
    if (id === NEW_PAIR) {
      return (
        <label
          style={{ float: direction === directions.LTR ? 'left' : 'right' }}
          className={this.styles.newPairLabel}
        >
          {this.titlePlaceholder}
        </label>
      );
    }

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
        {!this.isNewPair(id) && this.state.isExpanded && (
          <div className={this.styles.content}>{this.renderInnerRCE(id)}</div>
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
  id: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  handleOneSectionExpanded: PropTypes.func.isRequired,
  expandOneSection: PropTypes.bool.isRequired,
  renderInnerRCE: PropTypes.func,
  innerRCV: PropTypes.func,
};

export default AccordionPair;
