import React, { Component } from 'react';
import { BlockSpoilerComponent } from 'wix-rich-content-plugin-spoiler';
import PropTypes from 'prop-types';

export default config => WrappedComponent => {
  return class spoilerDecorator extends Component {
    static WrappedComponent = WrappedComponent;

    static propTypes = {
      blockProps: PropTypes.object,
      componentData: PropTypes.object,
      theme: PropTypes.object,
      pluginType: PropTypes.string,
      dataHook: PropTypes.string,
      onClick: PropTypes.func,
      className: PropTypes.string,
      setFocusToBlock: PropTypes.func,
      setInPluginEditingMode: PropTypes.func,
      store: PropTypes.object,
      block: PropTypes.object,
      size: PropTypes.object,
    };
    static defaultProps = {
      ...config,
    };

    getDataConfig = () => this.props.componentData?.config || {};

    render() {
      const { spoiler = {} } = this.getDataConfig();
      const hasSpoiler = spoiler?.enabled;
      const type = this.props.blockProps.type?.replace('wix-draft-plugin-', '');
      const pluginType = type[0].toUpperCase() + type.slice(1);
      const {
        componentData,
        theme,
        onClick,
        className,
        setFocusToBlock,
        setInPluginEditingMode,
        store,
        blockProps,
        block,
        size,
      } = this.props;

      return hasSpoiler ? (
        <BlockSpoilerComponent
          disabledRevealSpoilerBtn
          EditableSpoilerDescription
          pluginType={pluginType}
          componentData={componentData}
          theme={theme}
          onClick={onClick}
          className={className}
          setFocusToBlock={setFocusToBlock}
          setInPluginEditingMode={setInPluginEditingMode}
          store={store}
          blockProps={blockProps}
          block={block}
          size={size}
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
