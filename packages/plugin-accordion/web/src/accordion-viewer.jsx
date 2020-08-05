import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/accordion.scss';
import AccordionPair from './components/accordion-pair';
import { visualizations } from './defaults';

class AccordionViewer extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
  }

  isExpanded = (id, visualization) =>
    visualization === visualizations.EXPANDED ||
    (id === '1' && visualization === visualizations.FIRST_EXPANDED);

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
      onChange,
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
            {...this.props}
          />
        ))}
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
};

export default AccordionViewer;
