import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, anchorScroll } from 'wix-rich-content-common';
import ExpandCollapseButton from '../components/ExpandCollapseButton';
import styles from '../../statics/styles/accordion-pair.rtlignore.scss';
import { ACCORDION_TYPE } from '../types';

class AccordionPair extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.titleEditorRef = React.createRef();
    this.contentEditorRef = React.createRef();
    this.pairRef = React.createRef();
  }

  focusTitle = () => this.titleEditorRef.current?.focus();

  renderTitle = () => {
    const { idx, renderTitle } = this.props;

    return <div className={this.styles.title}>{renderTitle(idx, this.titleEditorRef)}</div>;
  };

  focusContent = () => this.contentEditorRef.current?.focus();

  renderContent = () => {
    const { idx, renderContent, isExpanded } = this.props;

    return (
      isExpanded && (
        <div className={this.styles.content}>{renderContent(idx, this.contentEditorRef)}</div>
      )
    );
  };

  onClick = e => {
    const { isExpanded, onCollapseClick, onExpandClick, idx, helpers } = this.props;
    isExpanded ? onCollapseClick(idx) : onExpandClick(idx);
    helpers.onViewerAction?.(ACCORDION_TYPE, 'Click', `${isExpanded ? 'collapse' : 'expand'}`);

    e.preventDefault();
    // Let scrolling begin after pair is rendered
    setTimeout(() => anchorScroll(this.pairRef));
  };

  onKeyDown = e => {
    if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
      e.stopPropagation();
    }
  };

  render() {
    const { isExpanded, idx, t } = this.props;

    return (
      <>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions*/}
        <div
          className={this.styles.titleContainer}
          onKeyDown={this.onKeyDown}
          ref={ref => (this.pairRef = ref)}
        >
          <ExpandCollapseButton
            isExpanded={isExpanded}
            onClick={this.onClick}
            idx={idx}
            ariaLabel={
              isExpanded
                ? t('AccordionPlugin_ExpandButton_AriaLabel')
                : t('AccordionPlugin_CollapseButton_AriaLabel')
            }
          />
          {this.renderTitle()}
        </div>
        {this.renderContent()}
      </>
    );
  }
}

AccordionPair.propTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  idx: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onCollapseClick: PropTypes.func.isRequired,
  onExpandClick: PropTypes.func.isRequired,
  renderTitle: PropTypes.func,
  renderContent: PropTypes.func,
  helpers: PropTypes.object,
};

export default AccordionPair;
