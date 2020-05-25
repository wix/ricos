import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { mergeStyles } from 'wix-rich-content-common';
import { BUTTON_TYPES } from 'wix-rich-content-editor-common';
import classNames from 'classnames';
import { generateInsertPluginButtonProps } from '../Utils/generateInsertPluginButtonProps';
import FileInput from '../Components/FileInput';
import ToolbarButton from '../Components/ToolbarButton';
import styles from '../../statics/styles/toolbar-button.scss';

/**
 * createBaseInsertPluginButton
 */
export default ({
  blockType,
  button,
  helpers,
  pubsub,
  commonPubsub,
  settings,
  t,
  isMobile,
  pluginDefaults,
}) => {
  class InsertPluginButton extends React.PureComponent {
    constructor(props) {
      super(props);
      const { buttonStyles } = props.theme || {};
      this.styles = mergeStyles({ styles, theme: buttonStyles });
      this.buttonRef = React.createRef();
      this.toolbarName = props.toolbarName;
    }

    getButtonProps = () => {
      const { setEditorState, getEditorState } = this.props;
      return generateInsertPluginButtonProps({
        blockType,
        button,
        helpers,
        pubsub,
        commonPubsub,
        settings,
        t,
        isMobile,
        pluginDefaults,
        getEditorState,
        setEditorState,
        toolbarName: this.props.toolbarName,
      });
    };

    renderButton = buttonProps => {
      const { styles } = this;
      const { getIcon, dataHook, label, isDisabled } = buttonProps;
      const { showName, tabIndex } = this.props;
      const Icon = getIcon();
      return (
        <button
          disabled={isDisabled()}
          aria-label={buttonProps.tooltip}
          tabIndex={tabIndex}
          className={classNames(
            styles.button,
            showName ? styles.sideToolbarButton : styles.footerToolbarButton
          )}
          data-hook={dataHook}
          onClick={this.handleClick(buttonProps)}
          ref={this.buttonRef}
        >
          <div className={styles.icon}>
            <Icon key="0" />
          </div>
          {showName && (
            <span key="1" className={styles.label}>
              {label}
            </span>
          )}
        </button>
      );
    };

    renderFileUploadButton = ({
      getIcon,
      label,
      onChange,
      accept,
      multiple,
      dataHook,
      isDisabled,
    }) => {
      const { showName, tabIndex } = this.props;
      const { styles } = this;
      const Icon = getIcon();
      return (
        <FileInput
          disabled={isDisabled()}
          dataHook={dataHook}
          className={classNames(
            styles.button,
            showName ? styles.sideToolbarButton : styles.footerToolbarButton
          )}
          onChange={onChange}
          accept={accept}
          multiple={multiple}
          theme={this.props.theme}
          tabIndex={tabIndex}
        >
          <div className={styles.icon}>
            <Icon key="0" />
          </div>
          {showName && (
            <span key="1" className={styles.label}>
              {label}
            </span>
          )}
        </FileInput>
      );
    };

    toggleButtonModal(
      event,
      {
        modalDecorations,
        modalName,
        modalElement,
        modalStyles,
        modalStylesFn,
        onConfirm,
        componentData,
      }
    ) {
      const buttonRef = event.target;
      if (helpers && helpers.openModal) {
        const styles = modalStylesFn?.({ buttonRef }) || modalStyles;
        helpers.openModal({
          modalName,
          modalElement,
          modalDecorations,
          buttonRef: event.target,
          modalStyles: styles,
          theme: this.props.theme,
          componentData,
          pubsub,
          helpers,
          t,
          isMobile,
          onConfirm,
        });
      }
    }

    handleClick = ({ onClick, ...modalProps }) => event => {
      if (onClick) {
        onClick(event);
      } else {
        this.toggleButtonModal(event, modalProps);
      }
    };

    render() {
      const { styles } = this;
      const { theme, isMobile } = this.props;
      const buttonProps = this.getButtonProps();
      const showTooltip = !isMobile && !isEmpty(buttonProps.tooltip);
      const buttonWrapperClassNames = classNames(styles.buttonWrapper, {
        [styles.mobile]: isMobile,
      });
      const Button = (
        <div className={buttonWrapperClassNames}>
          {buttonProps.buttonType === BUTTON_TYPES.FILE
            ? this.renderFileUploadButton(buttonProps)
            : this.renderButton(buttonProps)}
        </div>
      );
      return (
        <ToolbarButton
          theme={theme}
          showTooltip={showTooltip}
          tooltipText={buttonProps.tooltip}
          button={Button}
          tooltipOffset={{ y: -10 }}
        />
      );
    }
  }

  InsertPluginButton.propTypes = {
    getEditorState: PropTypes.func.isRequired,
    setEditorState: PropTypes.func.isRequired,
    theme: PropTypes.object,
    hidePopup: PropTypes.func,
    showName: PropTypes.bool,
    isMobile: PropTypes.bool,
    t: PropTypes.func,
    tabIndex: PropTypes.number,
    toolbarName: PropTypes.string,
  };

  return InsertPluginButton;
};
