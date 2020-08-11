import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../../statics/styles/accordion-pair.rtlignore.scss';
import PlainText from './PlainText';
import { Icons, NEW_PAIR } from '../../defaults';

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
        config: {
          settings: { visualization, direction, expandOneSection },
        },
      },
      isExpanded,
      setInPluginEditingMode,
    } = props;

    let newState = {};

    if (visualization !== state.visualization) {
      newState = { isExpanded, visualization, expandOneSection };
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
        config: {
          settings: { visualization, direction, expandOneSection },
        },
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
        config: {
          settings: { iconStyle },
        },
      },
      id,
    } = this.props;
    const { isExpanded } = this.state;

    const Icon = Icons[iconStyle];

    const Element = this.isNewPair(id) ? 'div' : 'button';
    const props = !this.isNewPair(id) ? { onClick: this.handleExpandCollapse } : {};

    return (
      <Element className={this.styles.icon} {...props}>
        <Icon style={isExpanded ? { transform: 'rotate(90deg)' } : {}} />
      </Element>
    );
  };

  renderTitle = () => {
    const {
      value,
      id,
      setFocusToBlock,
      setInPluginEditingMode,
      shouldForceFocus,
      resetForcedFocus,
    } = this.props;

    return (
      <>
        {(!!setInPluginEditingMode || value?.title?.text) && (
          <div className={this.styles.title_content}>
            <PlainText //for now
              id={id}
              setInPluginEditingMode={setInPluginEditingMode}
              value={!this.isNewPair(id) ? value?.title?.text : ''}
              onChange={this.onChange}
              setFocusToBlock={setFocusToBlock}
              shouldForceFocus={shouldForceFocus}
              resetForcedFocus={resetForcedFocus}
              placeholder={this.titlePlaceholder}
              isTitle
              readOnly={this.isNewPair(id) || !setInPluginEditingMode}
            />
          </div>
        )}
      </>
    );
  };

  renderContent = () => {
    const { value, id, setFocusToBlock, setInPluginEditingMode } = this.props;

    return (
      <>
        {!this.isNewPair(id) && this.state.isExpanded && (
          <div className={this.styles.content}>
            {(!!setInPluginEditingMode || value?.content?.text) && (
              <PlainText //for now
                id={id}
                setInPluginEditingMode={setInPluginEditingMode}
                value={value?.content?.text || ''}
                onChange={this.onChange}
                setFocusToBlock={setFocusToBlock}
                placeholder={this.contentPlaceholder}
                readOnly={!setInPluginEditingMode}
              />
            )}
          </div>
        )}
      </>
    );
  };

  onChange = (id, text, isTitle) => {
    const { onChange } = this.props;
    const data = isTitle ? { title: { text } } : { content: { text } };
    onChange?.(id, data);
  };

  render() {
    const { id } = this.props;
    const props = this.isNewPair(id) ? { style: { opacity: '0.4' } } : {};

    return (
      <li className={this.styles[this.state.direction]}>
        <div className={this.styles.title} {...props}>
          {this.renderIcon()}
          {this.renderTitle()}
        </div>
        {this.renderContent()}
      </li>
    );
  }
}

AccordionPair.propTypes = {
  theme: PropTypes.object.isRequired,
  setInPluginEditingMode: oneOf(PropTypes.func, undefined),
  setFocusToBlock: oneOf(PropTypes.func, undefined),
  onChange: PropTypes.func,
  componentData: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.object,
  isExpanded: PropTypes.bool.isRequired,
  shouldForceFocus: PropTypes.bool,
  resetForcedFocus: PropTypes.func,
  t: PropTypes.func.isRequired,
  handleOneSectionExpanded: PropTypes.func.isRequired,
  expandOneSection: PropTypes.bool.isRequired,
  pairExpandedID: PropTypes.string,
};

export default AccordionPair;
