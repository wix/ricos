import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextButton from '../TextButton';
import { mergeStyles } from 'wix-rich-content-common';
import { Tooltip } from 'wix-rich-content-editor-common';
import createTextToolbarButton from './createTextToolbarButton';
import styles from '../../../../../statics/styles/inline-toolbar-dropdown-button.scss';
import ClickOutside from 'react-click-outside';

export default ({ buttons, activeItem, tooltipTextKey }) =>
  class TextDropdownButton extends PureComponent {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      isVisible: PropTypes.bool,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
    };

    constructor(props) {
      super(props);
      this.state = { isOpen: false, Icon: activeItem() };
      const theme = props.theme || {};
      /* eslint-disable @typescript-eslint/camelcase, camelcase*/
      this.theme = {
        ...theme,
        buttonStyles: {
          inlineToolbarButton_wrapper: classNames(
            styles.inlineToolbarDropdownButton_wrapper,
            theme && theme.inlineToolbarDropdownButton_wrapper
          ),
          inlineToolbarButton: classNames(
            styles.inlineToolbarDropdownButton,
            theme && theme.inlineToolbarDropdownButton
          ),
          inlineToolbarButton_icon: classNames(
            styles.inlineToolbarDropdownButton_icon,
            theme && theme.inlineToolbarDropdownButton_icon
          ),
          inlineToolbarButton_active: classNames(
            styles.inlineToolbarButton_active,
            theme && theme.inlineToolbarDropdownButton_active
          ),
        },
      };
      this.styles = mergeStyles({ styles, theme: this.theme });
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.isVisible === true && nextProps.isVisible === false) {
        this.setState({ isOpen: false });
      }
    }

    showOptions = () => this.setState({ isOpen: true });
    hideOptions = () => this.setState({ isOpen: false });

    onChange = ({ onClick, getIcon }) => e => {
      onClick(e);
      this.setState({ Icon: getIcon(), isOpen: false });
    };

    renderOptions = () => {
      const buttonProps = {
        ...this.props,
        theme: this.theme,
        shouldRefreshTooltips: () => this.state.isOpen,
      };
      return (
        <ClickOutside
          onClickOutside={this.hideOptions}
          className={this.styles.inlineToolbarDropdown_options}
        >
          {buttons.map((props, i) => {
            const Button = createTextToolbarButton({ ...props, onClick: this.onChange(props) });
            return <Button key={i} tabIndex="0" {...buttonProps} />;
          })}
        </ClickOutside>
      );
    };

    render() {
      const { isMobile, tabIndex, t } = this.props;
      const tooltipText = t(tooltipTextKey);
      const textForHooks = tooltipText.replace(/\s+/, '');
      const dataHookText = `textDropDownButton_${textForHooks}`;
      const { Icon } = this.state;
      return (
        <Tooltip content={tooltipText} moveBy={{ y: -20 }}>
          <div className={this.styles.inlineToolbarDropdown_wrapper}>
            <TextButton
              icon={Icon}
              theme={this.theme}
              isMobile={isMobile}
              dataHook={dataHookText}
              onClick={this.showOptions}
              tabIndex={tabIndex}
            />
            {this.state.isOpen && this.renderOptions()}
          </div>
        </Tooltip>
      );
    }
  };
