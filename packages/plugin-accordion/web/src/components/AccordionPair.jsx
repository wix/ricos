/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import ExpandCollapseButton from '../components/ExpandCollapseButton';
import styles from '../../statics/styles/accordion-pair.rtlignore.scss';

class AccordionPair extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.titleEditorRef = React.createRef();
    this.contentEditorRef = React.createRef();
    this.state = {
      titleEditing: false,
      contentEditing: false,
    };
  }

  setTitleRef = ref => (this.titleRef = ref);
  setContentRef = ref => (this.contentRef = ref);
  addTitleEditing = () => this.setState({ titleEditing: true });
  addContentEditing = () => this.setState({ contentEditing: true });
  removeContentEditing = () => this.setState({ contentEditing: false });

  componentDidMount() {
    document.addEventListener('mousedown', this.pageClick);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.pageClick);
  }
  pageClick = e => {
    const titleElement = this.titleRef;
    const contentElement = this.contentRef;
    if (this.state.titleEditing && !titleElement.contains(e.target)) {
      this.setState({ titleEditing: false });
    }
    if (this.props.isExpanded && this.state.contentEditing && !contentElement.contains(e.target)) {
      this.setState({ contentEditing: false });
    }
  };

  focusTitle = () => this.titleEditorRef.current?.focus();

  renderTitle = () => {
    const { idx, renderTitle } = this.props;
    const { titleEditing } = this.state;

    return (
      <div ref={this.setTitleRef} className={this.styles.title}>
        {renderTitle(idx, this.titleEditorRef, titleEditing, this.addTitleEditing)}
      </div>
    );
  };

  focusContent = () => this.contentEditorRef.current?.focus();

  renderContent = () => {
    const { idx, renderContent, isExpanded } = this.props;
    const { contentEditing } = this.state;

    return (
      isExpanded && (
        <div ref={this.setContentRef} className={this.styles.content}>
          {renderContent(
            idx,
            this.contentEditorRef,
            contentEditing,
            this.addContentEditing,
            this.removeContentEditing
          )}
        </div>
      )
    );
  };

  onClick = () => {
    const { isExpanded, onCollapseClick, onExpandClick, idx } = this.props;
    isExpanded ? onCollapseClick(idx) : onExpandClick(idx);
  };

  render() {
    const { isExpanded, idx, t } = this.props;

    return (
      <>
        <div className={this.styles.titleContainer}>
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
};

export default AccordionPair;
