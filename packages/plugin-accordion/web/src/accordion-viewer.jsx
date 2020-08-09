/* eslint-disable react/jsx-key */
import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/accordion.scss';
import AccordionPair from './components/viewer-components/accordion-pair';
import { visualizations, NEW_PAIR, FIRST_PAIR } from './defaults';

class AccordionViewer extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
  }

  isExpanded = (id, visualization) =>
    visualization === visualizations.EXPANDED ||
    (id === FIRST_PAIR && visualization === visualizations.FIRST_EXPANDED);

  onChange = (id, data) => {
    const { onChange } = this.props;

    if (id === NEW_PAIR) {
      this.setState({ shouldForceFocus: true });
    }

    onChange?.(id, data);
  };

  resetForcedFocus = () => this.setState({ shouldForceFocus: false });

  isLastPair = (pairs, id) => Object.keys(pairs).length.toString() === id;

  renderNewPair = () => {
    const { isPluginFocused, componentData, setInPluginEditingMode, theme } = this.props;

    return (
      isPluginFocused && (
        <div className={this.styles.new_pair_overlay}>
          <AccordionPair
            id={NEW_PAIR}
            onChange={this.onChange}
            isExpanded={false}
            componentData={componentData}
            setInPluginEditingMode={setInPluginEditingMode}
            theme={theme}
          />
        </div>
      )
    );
  };

  render() {
    const {
      componentData: {
        config: { pairs },
      },
      componentData: {
        config: {
          settings: { visualization },
        },
      },
      componentData,
      setInPluginEditingMode,
      theme,
    } = this.props;

    return (
      <div className={this.styles.accordionContainer}>
        {Object.entries(pairs).map(([id, value]) => (
          <AccordionPair
            id={id}
            value={value}
            onChange={this.onChange}
            isExpanded={this.isExpanded(id, visualization)}
            resetForcedFocus={this.resetForcedFocus}
            shouldForceFocus={this.state?.shouldForceFocus && this.isLastPair(pairs, id)}
            componentData={componentData}
            setInPluginEditingMode={setInPluginEditingMode}
            theme={theme}
          />
        ))}
        {this.renderNewPair()}
      </div>
    );
  }
}

AccordionViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  setInPluginEditingMode: oneOf(PropTypes.func, undefined),
  setFocusToBlock: oneOf(PropTypes.func, undefined),
  onChange: PropTypes.func,
  componentData: PropTypes.object,
  isPluginFocused: PropTypes.bool,
};

export default AccordionViewer;
