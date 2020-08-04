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

  render() {
    const {
      setFocusToBlock,
      setInPluginEditingMode,
      onTextChange,
      componentData: {
        config: { text },
      },
    } = this.props;

    return (
      <div className={this.styles.accordionContainer}>
        {this.renderIcon()}
        {(setInPluginEditingMode || text) && (
          <InPluginInput //for now
            setInPluginEditingMode={setInPluginEditingMode}
            value={text}
            onChange={onTextChange}
            setFocusToBlock={setFocusToBlock}
          />
        )}
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
