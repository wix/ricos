/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/new-link-panel.scss';
import Dropdown from './Dropdown';
import { filterAnchorableBlocks } from './AnchorComponents/anchorUtils';
import { ANCHORABLE_BLOCKS } from './AnchorComponents/consts';
import FilterDropdownElement from './AnchorComponents/FilterDropdownElement';
import AnchorableElement from './AnchorComponents/AnchorableElement';

class AnchorPanel extends Component {
  constructor(props) {
    super(props);
    const { theme, t } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = {
      showValidation: false,
      filter: {
        value: 'all',
        component: () => (
          <FilterDropdownElement label={t('LinkTo_Modal_Section_Filter_All')} theme={this.styles} />
        ),
      },
    };
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    const { anchorValues } = this.props;
    if (anchorValues.anchor) {
      const target = this.scrollRef.current;
      target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;
    }
  }

  onChange = (changes, options = {}) => {
    this.props.onChange({
      ...this.props.anchorValues,
      anchor: changes.key,
      defaultName: options.defaultName,
    });
  };

  filterChanged = newFilter => {
    this.setState({ filter: newFilter });
  };

  dropdownOptions = options => {
    const { t } = this.props;
    const optionsArray = options.map(option => {
      return {
        value: option,
        component: () => (
          <FilterDropdownElement label={t(ANCHORABLE_BLOCKS[option].filter)} theme={this.styles} />
        ),
      };
    });
    return [
      {
        value: 'all',
        component: () => (
          <FilterDropdownElement
            label={this.props.t('LinkTo_Modal_Section_Filter_All')}
            theme={this.styles}
          />
        ),
      },
      ...optionsArray,
    ];
  };

  renderEmptyState = () => {
    const { styles } = this;
    const { t } = this.props;
    return (
      <div className={styles.linkPanel_emptyStateContainer}>
        <div className={styles.linkPanel_emptyStateTitle}>
          {t('LinkTo_Modal_Section_EmptyState_Title')}
        </div>
        <div className={styles.linkPanel_emptyStateText}>
          {t('LinkTo_Modal_Section_EmptyState_Text')}
        </div>
      </div>
    );
  };

  render() {
    const { styles } = this;
    const { filter } = this.state;
    const { ariaProps, t, anchorValues, onEnter, anchorableBlocksData } = this.props;
    const { anchorableBlocks, pluginsIncluded } = anchorableBlocksData;
    const filteredAnchorableBlocks =
      filter.value === 'all'
        ? anchorableBlocks
        : filterAnchorableBlocks(anchorableBlocks, filter.value);

    return anchorableBlocks.length === 0 ? (
      this.renderEmptyState()
    ) : (
      <div className={styles.linkPanel_Content} {...ariaProps} role="form">
        <div className={styles.AnchorPanel_header}>
          <div className={styles.AnchorPanel_title}>{t('LinkTo_Modal_Section_Title')}</div>
          <div className={styles.AnchorPanel_dropdownWrapper}>
            <Dropdown
              theme={styles}
              value={filter}
              options={this.dropdownOptions(pluginsIncluded)}
              controlClassName={styles.AnchorPanel_dropdownControl}
              menuClassName={styles.AnchorPanel_dropdownMenu}
              onChange={this.filterChanged}
              tabIndex={0}
            />
          </div>
        </div>
        <div className={styles.AnchorPanel_anchorsElementsContainer}>
          {filteredAnchorableBlocks.map(block => (
            <div
              key={block.key}
              ref={anchorValues.anchor === block.key ? this.scrollRef : undefined}
            >
              <AnchorableElement
                dataHook={block.key}
                block={block}
                theme={styles}
                onClick={args => this.onChange(block, { ...args })}
                isSelected={anchorValues.anchor === block.key}
                t={t}
                onEnter={onEnter}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

AnchorPanel.propTypes = {
  anchorableBlocksData: PropTypes.array.isRequired,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  anchorValues: PropTypes.shape({
    anchor: PropTypes.string,
  }).isRequired,
  ariaProps: PropTypes.object,
  dropDown: PropTypes.object,
  onEnter: PropTypes.func,
  onEscape: PropTypes.func,
  placeholder: PropTypes.string,
};
export default AnchorPanel;
