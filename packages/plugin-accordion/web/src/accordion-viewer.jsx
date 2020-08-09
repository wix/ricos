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

  resetForcedFocus = () => this.setState({ shouldForceFocus: false });

  isLastPair = (pairs, id) => Object.keys(pairs).length.toString() === id;

  insertNewPair = () => {
    const { onChange } = this.props;
    onChange?.(NEW_PAIR);
    this.setState({ shouldForceFocus: true });
  };

  renderNewPairButton = () => {
    const { componentData, setInPluginEditingMode, theme, t } = this.props;

    return (
      <button className={this.styles.new_pair_button} onClick={this.insertNewPair}>
        <AccordionPair
          id={NEW_PAIR}
          isExpanded={false}
          componentData={componentData}
          setInPluginEditingMode={setInPluginEditingMode}
          theme={theme}
          t={t}
        />
      </button>
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
      t,
      onChange,
      isPluginFocused,
    } = this.props;

    return (
      <div className={this.styles.accordionContainer}>
        {Object.entries(pairs).map(([id, value]) => (
          <AccordionPair
            key={id}
            id={id}
            value={value}
            onChange={onChange}
            isExpanded={this.isExpanded(id, visualization)}
            resetForcedFocus={this.resetForcedFocus}
            shouldForceFocus={this.state?.shouldForceFocus && this.isLastPair(pairs, id)}
            componentData={componentData}
            setInPluginEditingMode={setInPluginEditingMode}
            theme={theme}
            t={t}
          />
        ))}
        {isPluginFocused && this.renderNewPairButton()}
      </div>
    );
  }
}

AccordionViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  setInPluginEditingMode: oneOf(PropTypes.func, undefined),
  setFocusToBlock: oneOf(PropTypes.func, undefined),
  onChange: PropTypes.func,
  componentData: PropTypes.object.isRequired,
  isPluginFocused: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default AccordionViewer;
