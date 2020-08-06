import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../../statics/styles/accordion-pair.scss';
import PlainText from './PlainText';
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

  onChange = (id, text, isTitle) => {
    const { onChange } = this.props;
    onChange?.(id, isTitle ? { title: { text } } : { content: { text } });
  };

  render() {
    const { value, id, setFocusToBlock, setInPluginEditingMode } = this.props;
    const { title, content } = value;

    return (
      <div dir={this.state.direction}>
        <div className={this.styles.title}>
          {this.renderIcon()}
          {(setInPluginEditingMode || title?.text) && (
            <PlainText //for now
              dir={this.state.direction}
              id={id}
              setInPluginEditingMode={setInPluginEditingMode}
              value={title?.text}
              onChange={this.onChange}
              setFocusToBlock={setFocusToBlock}
              isTitle
            />
          )}
        </div>
        {(this.state.isExpanded || setInPluginEditingMode) && (
          <div className={this.styles.content}>
            {(setInPluginEditingMode || content?.text) && (
              <PlainText //for now
                dir={this.state.direction}
                id={id}
                setInPluginEditingMode={setInPluginEditingMode}
                value={content?.text}
                onChange={this.onChange}
                setFocusToBlock={setFocusToBlock}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

AccordionPair.propTypes = {
  theme: PropTypes.object.isRequired,
  setInPluginEditingMode: oneOf(PropTypes.func, undefined),
  setFocusToBlock: oneOf(PropTypes.func, undefined),
  onChange: PropTypes.func,
  componentData: PropTypes.object,
  id: PropTypes.string,
  value: PropTypes.object,
  isExpanded: PropTypes.bool,
};

export default AccordionPair;
