import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockSpoilerComponent from './BlockSpoilerComponent';

export default config => WrappedComponent => {
  return class spoilerWrapper extends Component {
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
      const type = this.props.blockProps.type?.replace('wix-draft-plugin-', '');
      const pluginType = type[0].toUpperCase() + type.slice(1);
      const {
        componentData,
        theme,
        onClick,
        className,
        setInPluginEditingMode,
        blockProps,
      } = this.props;
      const hasSpoiler = this.props.componentData?.config?.spoiler?.enabled || false;

      return hasSpoiler ? (
        <BlockSpoilerComponent
          disabledRevealSpoilerBtn
          isEditableText
          handleButtonContentChange={this.handleButtonContentChange}
          handleDescriptionChange={this.handleDescriptionChange}
          pluginType={pluginType}
          componentData={componentData}
          theme={theme}
          onClick={onClick}
          className={className}
          setFocusToBlock={blockProps?.setFocusToBlock}
          setInPluginEditingMode={setInPluginEditingMode}
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
