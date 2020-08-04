/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/accordion.scss';
import InPluginInput from './components/InPluginInput';
import { Icons } from './defaults';

class AccordionViewer extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = this.stateFromProps(props);
  }

  stateFromProps(props) {
    const {
      componentData: {
        config: { isExpanded },
      },
    } = props;
    return { isExpanded };
  }

  handleIconClick = () => this.setState({ isExpanded: !this.state.isExpanded });

  renderIcon = () => {
    const {
      componentData: {
        config: { iconStyle },
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

  handleTextChange = (key, text, isTitle) => {
    const { onTextChange } = this.props;
    onTextChange(key, isTitle ? { title: { text } } : { content: { text } });
  };

  renderPair = (key, value) => {
    const { setFocusToBlock, setInPluginEditingMode } = this.props;
    const { title, content } = value;

    return (
      <>
        <div className={this.styles.title}>
          {this.renderIcon()}
          {(setInPluginEditingMode || title?.text) && (
            <InPluginInput //for now
              index={key}
              setInPluginEditingMode={setInPluginEditingMode}
              value={title?.text}
              onChange={this.handleTextChange}
              setFocusToBlock={setFocusToBlock}
              isTitle
            />
          )}
        </div>
        {(this.state.isExpanded || setInPluginEditingMode) && (
          <div className={this.styles.content}>
            {(setInPluginEditingMode || content?.text) && (
              <InPluginInput //for now
                index={key}
                setInPluginEditingMode={setInPluginEditingMode}
                value={content?.text}
                onChange={this.handleTextChange}
                setFocusToBlock={setFocusToBlock}
              />
            )}
          </div>
        )}
      </>
    );
  };

  render() {
    const {
      componentData: {
        config: { pairs },
      },
    } = this.props;

    return (
      <div className={this.styles.accordionContainer}>
        {Object.entries(pairs).map(([key, value]) => this.renderPair(key, value))}
      </div>
    );
  }
}

AccordionViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  setInPluginEditingMode: oneOf(PropTypes.func, undefined),
  setFocusToBlock: oneOf(PropTypes.func, undefined),
  onTextChange: PropTypes.func,
  componentData: PropTypes.object,
};

export default AccordionViewer;
