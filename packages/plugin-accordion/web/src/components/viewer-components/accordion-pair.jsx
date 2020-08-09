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
          settings: { visualization, direction },
        },
      },
      isExpanded,
    } = props;

    let newState = {};

    if (visualization !== state.visualization) {
      newState = { isExpanded, visualization };
    }

    if (direction !== state.direction) {
      newState = { ...state, direction };
    }

    return newState;
  }

  stateFromProps(props) {
    const {
      isExpanded,
      componentData: {
        config: {
          settings: { visualization, direction },
        },
      },
    } = props;
    return { isExpanded, visualization, direction };
  }

  handleIconClick = () => this.setState({ isExpanded: !this.state.isExpanded });

  isNewPair = id => id === NEW_PAIR;

  renderIcon = () => {
    const {
      componentData: {
        config: {
          settings: { iconStyle },
        },
      },
    } = this.props;
    const { isExpanded } = this.state;

    const Icon = isExpanded ? Icons[iconStyle].expanded : Icons[iconStyle].collapsed;

    return (
      <button className={this.styles.icon} onClick={this.handleIconClick}>
        <Icon />
      </button>
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
        {(setInPluginEditingMode || value?.title?.text) && (
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
          />
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
            {(setInPluginEditingMode || value?.content?.text) && (
              <PlainText //for now
                id={id}
                setInPluginEditingMode={setInPluginEditingMode}
                value={value?.content?.text || ''}
                onChange={this.onChange}
                setFocusToBlock={setFocusToBlock}
                placeholder={this.contentPlaceholder}
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
  setFocusToBlock: oneOf(PropTypes.func, undefined),
  onChange: PropTypes.func,
  componentData: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.object,
  isExpanded: PropTypes.bool.isRequired,
  shouldForceFocus: PropTypes.bool,
  resetForcedFocus: PropTypes.func,
  t: PropTypes.func.isRequired,
};

export default AccordionPair;
