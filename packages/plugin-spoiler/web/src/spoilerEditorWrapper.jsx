import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockSpoilerComponent from './BlockSpoilerComponent';

export default config => WrappedComponent => {
  return class spoilerWrapper extends Component {
    constructor(props) {
      super(props);
      const type = props.blockProps.type?.replace('wix-draft-plugin-', '');
      this.pluginType = type[0].toUpperCase() + type.slice(1);
    }
    static propTypes = {
      blockProps: PropTypes.object,
      componentData: PropTypes.object,
      theme: PropTypes.object,
      pluginType: PropTypes.string,
      onClick: PropTypes.func,
      className: PropTypes.string,
      setFocusToBlock: PropTypes.func,
      setInPluginEditingMode: PropTypes.func,
      store: PropTypes.object,
      block: PropTypes.object,
      t: PropTypes.func,
      isMobile: PropTypes.bool,
    };

    handleDescriptionChange = description => {
      this.updateComponentData({ description });
    };

    handleButtonContentChange = buttonContent => {
      this.updateComponentData({ buttonContent });
    };

    updateComponentData = data => {
      const { componentData } = this.props;
      const { spoiler } = componentData?.config;
      const config = { ...componentData?.config, spoiler: { ...spoiler, ...data } };
      this.props.store.update(
        'componentData',
        { ...componentData, config },
        this.props.block.getKey()
      );
    };

    render() {
      const {
        componentData,
        theme,
        onClick,
        className,
        setInPluginEditingMode,
        blockProps,
        isMobile,
        t,
      } = this.props;

      const hasSpoiler = this.props.componentData?.config?.spoiler?.enabled || false;

      return hasSpoiler ? (
        <BlockSpoilerComponent
          disabledRevealSpoilerBtn
          isEditableText
          handleButtonContentChange={this.handleButtonContentChange}
          handleDescriptionChange={this.handleDescriptionChange}
          pluginType={this.pluginType}
          componentData={componentData}
          theme={theme}
          onClick={onClick}
          className={className}
          setFocusToBlock={blockProps?.setFocusToBlock}
          setInPluginEditingMode={setInPluginEditingMode}
          isMobile={isMobile}
          t={t}
          {...config}
        >
          <WrappedComponent {...this.props} />
        </BlockSpoilerComponent>
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };
};
