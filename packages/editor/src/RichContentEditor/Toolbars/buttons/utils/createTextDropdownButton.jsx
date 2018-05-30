import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextButton from '../TextButton';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '~/Styles/inline-toolbar-dropdown-button.scss';

export default ({ buttons, activeItem, onChange, tooltipTextKey }) =>
  class TextDropdownButton extends PureComponent {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
    };

    constructor(props) {
      super(props);
      const { getEditorState } = this.props;
      this.state = {
        isOpen: false,
        selected: activeItem({ getEditorState }),
      };

      const { buttonStyles, ...rest } = props.theme || {};

      this.theme = {
        buttonStyles: {
          inlineToolbarButton_wrapper: classNames( //eslint-disable-line camelcase
            styles.inlineToolbarDropdownButton_wrapper,
            buttonStyles && buttonStyles.inlineToolbarDropdownButton_wrapper
          ),
          inlineToolbarButton: classNames(
            styles.inlineToolbarDropdownButton,
            buttonStyles && buttonStyles.inlineToolbarDropdownButton
          ),
          inlineToolbarButton_icon: classNames( //eslint-disable-line camelcase
            styles.inlineToolbarDropdownButton_icon,
            buttonStyles && buttonStyles.inlineToolbarDropdownButton_icon
          ),
        },
        ...rest
      };
      this.styles = mergeStyles({ styles, theme: this.theme });
    }

    showOptions = () => this.setState({ isOpen: true });

    renderOptions = () => {
      const { getEditorState, setEditorState } = this.props;
      const { selected } = this.state;
      const onClick = value => {
        onChange(getEditorState, setEditorState, value);
        this.setState({ selected: activeItem({ value }), isOpen: false });
      };

      const typeKey = Object.keys(selected).filter(k => k !== 'Icon')[0];
      const buttonProps = {
        [typeKey]: selected[typeKey],
        onClick,
        ...this.props,
        theme: this.theme,
      };
      return (
        <div className={this.styles.inlineToolbarDropdown_options}>
          {buttons.map((Button, i) => <Button key={i} tabIndex={i} {...buttonProps} />)}
        </div>
      );
    };

    render() {
      const { selected: { Icon }, isOpen } = this.state;
      const { isMobile, tabIndex, t } = this.props;
      const tooltipText = t(tooltipTextKey);
      const textForHooks = tooltipText.replace(/\s+/, '');
      const dataHookText = `textDropDownButton_${textForHooks}`;

      return (
        <div className={this.styles.inlineToolbarDropdown_wrapper}>
          <TextButton
            icon={Icon}
            theme={this.theme}
            isMobile={isMobile}
            dataHook={dataHookText}
            onClick={this.showOptions}
            tooltipText={tooltipText}
            tabIndex={tabIndex}
          />
          {isOpen && this.renderOptions()}
        </div>
      );
    }
  };
