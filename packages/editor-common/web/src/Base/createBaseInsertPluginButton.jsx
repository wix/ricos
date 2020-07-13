import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import { BUTTON_TYPES } from '../consts';
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
  return class InsertPluginButton extends React.PureComponent {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object,
      hidePopup: PropTypes.func,
      showName: PropTypes.bool,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
      toolbarName: PropTypes.string,
      closePluginMenu: PropTypes.func,
      pluginMenuButtonRef: PropTypes.any,
    };

    constructor(props) {
      super(props);
      const { buttonStyles } = props.theme || {};
      this.styles = mergeStyles({ styles, theme: buttonStyles });
      this.buttonRef = React.createRef();
      this.toolbarName = props.toolbarName;
    }

    getButtonProps = () => {
      const { setEditorState, getEditorState, closePluginMenu, pluginMenuButtonRef } = this.props;
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
        toolbarName: this.toolbarName,
        closePluginMenu,
        pluginMenuButtonRef,
      });
    };

    renderButton = ({ getIcon, getLabel, onClick, dataHook, isDisabled, tooltip }) => {
      const { styles } = this;
      const { showName, tabIndex } = this.props;
      const Icon = getIcon();
      const label = getLabel();
      return (
        <button
          disabled={isDisabled()}
          aria-label={tooltip}
          tabIndex={tabIndex}
          className={classNames(
            styles.button,
            showName ? styles.sideToolbarButton : styles.footerToolbarButton
          )}
          data-hook={dataHook}
          onClick={onClick}
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
      getLabel,
      onChange,
      accept,
      multiple,
      dataHook,
      isDisabled,
    }) => {
      const { showName, tabIndex } = this.props;
      const { styles } = this;
      const Icon = getIcon();
      const label = getLabel();
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

    render() {
      const { styles } = this;
      const { theme, isMobile } = this.props;
      const buttonProps = this.getButtonProps();
      const buttonWrapperClassNames = classNames(styles.buttonWrapper, {
        [styles.mobile]: isMobile,
      });
      const Button = (
        <div className={buttonWrapperClassNames}>
          {buttonProps.type === BUTTON_TYPES.FILE
            ? this.renderFileUploadButton(buttonProps)
            : this.renderButton(buttonProps)}
        </div>
      );
      return (
        <ToolbarButton
          theme={theme}
          tooltipText={buttonProps.tooltip}
          button={Button}
          tooltipOffset={{ y: -10 }}
        />
      );
    }
  };
};
