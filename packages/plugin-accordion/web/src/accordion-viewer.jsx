import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import AccordionPairs from './components/AccordionPairs';
import styles from '../statics/styles/accordion-component.rtlignore.scss';

const getTextAlignment = componentData => {
  const { config } = componentData;
  const { direction } = config;
  const textAlignment = direction === 'ltr' ? 'left' : 'right';
  return textAlignment;
};

const getDirection = componentData => {
  const { config } = componentData;
  const { direction } = config;
  return direction;
};

class AccordionViewer extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
  }

  getPair = idx => {
    const { componentData } = this.props;
    const { pairs } = componentData;
    const pair = pairs[idx];
    return pair;
  };

  renderInnerRCV = contentState => {
    const { innerRCV, componentData } = this.props;
    const textAlignment = getTextAlignment(componentData);
    const direction = getDirection(componentData);
    return innerRCV({ contentState, textAlignment, direction });
  };

  renderTitle = idx => {
    const pair = this.getPair(idx);
    return this.renderInnerRCV(pair.title);
  };

  renderContent = idx => {
    const pair = this.getPair(idx);
    return this.renderInnerRCV(pair.content);
  };

  render() {
    const { theme, componentData, isMobile } = this.props;
    const { config, pairs } = componentData;
    const { direction, expandState, expandOnlyOne } = config;

    return (
      <div className={this.styles[direction]}>
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
