import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { mergeStyles } from 'wix-rich-content-common';
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
    preventButtonGettingFocus = event => {
      if (button.name !== 'GIF') {
        event.preventDefault();
      }
    };

    getButtonProps = () => {
      const { setEditorState, getEditorState, hidePopup, theme } = this.props;
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
        hidePopup,
        theme,
        toolbarName: this.toolbarName,
      });
    };

    renderButton = ({ icon: Icon, label, onClick }) => {
      const { styles } = this;
      const { showName, tabIndex, setEditorState } = this.props;
      const { wrappingComponent } = button;
      const WrappingComponent = wrappingComponent || 'button';

      let buttonCompProps = {};
      if (wrappingComponent) {
        buttonCompProps = {
          setEditorState,
          pubsub,
        };
      }

      return (
        <WrappingComponent
          aria-label={`Add ${name}`}
          tabIndex={tabIndex}
          className={classNames(
            styles.button,
            showName ? styles.sideToolbarButton : styles.footerToolbarButton
          )}
          data-hook={name}
          onClick={onClick}
          onMouseDown={this.preventButtonGettingFocus}
          ref={this.buttonRef}
          {...buttonCompProps}
        >
          <div className={styles.icon}>
            <Icon key="0" />
          </div>
          {showName && (
            <span key="1" className={styles.label}>
              {label}
            </span>
          )}
        </WrappingComponent>
      );
    };

    renderFileUploadButton = ({ icon: Icon, label, onChange, accept, multiple }) => {
      const { showName, tabIndex } = this.props;
      const { styles } = this;

      return (
        <FileInput
          dataHook={`${button.name}_file_input`}
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
      const {
        icon,
        label,
        tooltip,
        buttonType,
        onClick,
        onChange,
        accept,
        multiple,
      } = this.getButtonProps();
      const showTooltip = !isMobile && !isEmpty(tooltip);
      const buttonWrapperClassNames = classNames(styles.buttonWrapper, {
        [styles.mobile]: isMobile,
      });

      const Button = (
        <div className={buttonWrapperClassNames}>
          {buttonType === 'file'
            ? this.renderFileUploadButton({ icon, label, onChange, accept, multiple })
            : this.renderButton({ icon, label, onClick })}
        </div>
      );

      return (
        <ToolbarButton
          theme={theme}
          showTooltip={showTooltip}
          tooltipText={tooltip}
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
