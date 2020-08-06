/* eslint-disable react/jsx-key */
import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/accordion.scss';
import AccordionPair from './components/viewer-components/accordion-pair';
import { visualizations, NEW_PAIR, FIRST_PAIR } from './defaults';
//REFACTOR ASAP
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
      this.shouldForceFocus = true; // NEED TO FIGURE OUT PROPER WAY
    }

    onChange?.(id, data);
  };

  resetForcedFocus = () => (this.shouldForceFocus = false);

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
      isPluginFocused,
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
            shouldForceFocus={this.shouldForceFocus && Object.keys(pairs).length.toString() === id}
            componentData={componentData}
            setInPluginEditingMode={setInPluginEditingMode}
            theme={theme}
          />
        ))}
        {isPluginFocused && (
          <div className={this.styles.new_pair_overlay}>
            <AccordionPair
              id={NEW_PAIR}
              value={{}}
              onChange={this.onChange}
              isExpanded={false}
              componentData={componentData}
              setInPluginEditingMode={setInPluginEditingMode}
              theme={theme}
            />
          </div>
        )}
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
