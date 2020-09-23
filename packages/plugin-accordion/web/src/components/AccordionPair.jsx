import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
  }

  focusTitle = () => this.titleEditorRef.current?.focus();

  renderTitle = () => {
    const { idx, renderTitle, innerRCV, className } = this.props;
    const getTitle = idx => this.props.componentData.pairs[idx].title;

    return (
      <div className={classNames(this.styles.title, className)}>
        {renderTitle ? renderTitle(idx, this.titleEditorRef) : innerRCV(getTitle(idx))}
      </div>
    );
  };

  focusContent = () => this.contentEditorRef.current?.focus();

  renderContent = () => {
    const { idx, renderContent, innerRCV, isExpanded, className } = this.props;
    const getContent = idx => this.props.componentData.pairs[idx].content;

    return (
      isExpanded && (
        <div className={classNames(this.styles.content, className)}>
          {renderContent ? renderContent(idx, this.contentEditorRef) : innerRCV(getContent(idx))}
        </div>
      )
    );
  };

  onClick = () => {
    const { isExpanded, onCollapse, onExpand, idx } = this.props;
    isExpanded ? onCollapse(idx) : onExpand(idx);
  };

  render() {
    const { isExpanded, idx, className } = this.props;

    return (
      <>
        <div className={this.styles.titleContainer}>
          <ExpandCollapseButton
            className={className}
            isExpanded={isExpanded}
            onClick={this.onClick}
            idx={idx}
          />
          {this.renderTitle()}
        </div>
        {this.renderContent()}
      </>
    );
  }
}

AccordionPair.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  idx: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
  renderTitle: PropTypes.func,
  renderContent: PropTypes.func,
  innerRCV: PropTypes.func,
};

export default AccordionPair;
