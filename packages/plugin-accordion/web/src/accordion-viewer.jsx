import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/accordion-viewer.scss';
import AccordionPair from './components/viewer-components/accordion-pair';
import { visualizations, NEW_PAIR, FIRST_PAIR } from './defaults';

class AccordionViewer extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.state = this.stateFromProps(props);
    this.styles = mergeStyles({ styles, theme });
  }

  static getDerivedStateFromProps(props, state) {
    const {
      componentData: {
        config: {
          settings: { visualization },
        },
      },
    } = props;

    let newState = {};

    if (visualization !== state.visualization) {
      newState = { ...state, visualization, pairExpandedID: undefined };
    }

    return newState;
  }

  stateFromProps(props) {
    const {
      componentData: {
        config: {
          settings: { visualization },
        },
      },
    } = props;
    return { visualization };
  }

  isExpanded = (id, visualization, expandOneSection) => {
    if (
      id === FIRST_PAIR &&
      visualization === visualizations.FIRST_EXPANDED &&
      !this.state.pairExpandedID
    ) {
      return true;
    }

    return expandOneSection
      ? this.state.pairExpandedID === id
      : visualization === visualizations.EXPANDED;
  };

  resetForcedFocus = () => this.setState({ shouldForceFocus: false });

  isLastPair = (pairs, id) => Object.keys(pairs).length.toString() === id;

  insertNewPair = () => {
    const { onChange } = this.props;
    onChange?.(NEW_PAIR);
    this.setState({ shouldForceFocus: true });
  };

  handleOneSectionExpanded = pairExpandedID =>
    this.setState({
      pairExpandedID: pairExpandedID === this.state.pairExpandedID ? 'none' : pairExpandedID,
    });

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
          settings: { visualization, expandOneSection },
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
      <ol className={this.styles.accordionContainer}>
        {Object.entries(pairs).map(([id, value]) => (
          <AccordionPair
            key={id}
            id={id}
            value={value}
            onChange={onChange}
            isExpanded={
              !!setInPluginEditingMode || this.isExpanded(id, visualization, expandOneSection)
            }
            handleOneSectionExpanded={this.handleOneSectionExpanded}
            resetForcedFocus={this.resetForcedFocus}
            shouldForceFocus={this.state?.shouldForceFocus && this.isLastPair(pairs, id)}
            componentData={componentData}
            setInPluginEditingMode={setInPluginEditingMode}
            theme={theme}
            t={t}
          />
        ))}
        {isPluginFocused && this.renderNewPairButton()}
      </ol>
    );
  }
}

AccordionViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  setInPluginEditingMode: oneOf(PropTypes.func, undefined),
  setFocusToBlock: oneOf(PropTypes.func, undefined),
  onChange: PropTypes.func.isRequired,
  componentData: PropTypes.object.isRequired,
  isPluginFocused: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default AccordionViewer;
