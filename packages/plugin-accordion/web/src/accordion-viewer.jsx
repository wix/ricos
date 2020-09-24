import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import AccordionPairs from './components/AccordionPairs';
import styles from '../statics/styles/accordion-component.rtlignore.scss';

class AccordionViewer extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
  }

  renderTitle = idx => {
    const { innerRCV, componentData } = this.props;
    const { pairs, config } = componentData;
    const { direction } = config;
    const contentState = pairs[idx].title;
    return innerRCV({ contentState, direction });
  };

  renderContent = idx => {
    const { innerRCV, componentData } = this.props;
    const { pairs, config } = componentData;
    const { direction } = config;
    const contentState = pairs[idx].content;
    return innerRCV({ contentState, direction });
  };

  render() {
    const { theme, componentData, isMobile } = this.props;
    const { config, pairs } = componentData;
    const { direction, expandState, expandOnlyOne } = config;

    return (
      <div className={classNames(this.styles.accordionViewer, this.styles[direction])}>
        <AccordionPairs
          theme={theme}
          isMobile={isMobile}
          pairs={pairs}
          expandState={expandState}
          expandOnlyOne={expandOnlyOne}
          renderTitle={this.renderTitle}
          renderContent={this.renderContent}
        />
      </div>
    );
  }
}

AccordionViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  innerRCV: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default AccordionViewer;
