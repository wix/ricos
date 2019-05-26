import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import {
  sizeClassName,
  alignmentClassName,
  textWrapClassName,
  normalizeUrl,
  Context,
} from 'wix-rich-content-common';

class AtomicBlock extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  renderComponent(Component, children, props) {
    return <Component {...props}>{children}</Component>;
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    const { type, typeMap, componentData, children, styles } = this.props;
    const { theme, isMobile, anchorTarget, relValue, config } = this.context;

    const { component: Component, elementType } = typeMap[type];
    const { size, alignment, textWrap, container } = typeMap[type].classNameStrategies || {};
    const settings = (config && config[type]) || {};

    if (Component) {
      Component.contextType = Context.type;
      if (elementType !== 'inline') {
        const hasLink = componentData.config && componentData.config.link;
        const ContainerElement = !hasLink ? 'div' : 'a';
        const containerClassNames = classNames(
          styles.pluginContainerReadOnly,
          {
            [styles.pluginContainerMobile]: isMobile,
            [styles.anchor]: hasLink,
            [theme.anchor]: hasLink && theme.anchor,
          },
          isFunction(alignment)
            ? alignment(componentData, theme, styles, isMobile)
            : alignmentClassName(componentData, theme, styles, isMobile),
          isFunction(size)
            ? size(componentData, theme, styles, isMobile)
            : sizeClassName(componentData, theme, styles, isMobile),
          isFunction(textWrap)
            ? textWrap(componentData, theme, styles, isMobile)
            : textWrapClassName(componentData, theme, styles, isMobile)
        );
        let containerProps = {};
        if (hasLink) {
          const { url, target, rel } = componentData.config.link;
          containerProps = {
            href: normalizeUrl(url),
            target: target || anchorTarget || '_self',
            rel: rel || relValue || 'noopener',
          };
        }
        return (
          <div className={styles.atomic}>
            <ContainerElement className={containerClassNames} {...containerProps}>
              {isFunction(container) ? (
                <div className={container(theme)}>
                  {this.renderComponent(Component, children, { componentData, settings })}
                </div>
              ) : (
                this.renderComponent(Component, children, { componentData, settings })
              )}
            </ContainerElement>
          </div>
        );
      } else {
        return this.renderComponent(Component, children, { componentData, settings });
      }
    }
    return null;
  }
}

AtomicBlock.contextType = Context.type;

AtomicBlock.propTypes = {
  type: PropTypes.string.isRequired,
  componentData: PropTypes.object.isRequired,
  typeMap: PropTypes.object,
  children: PropTypes.node,
  styles: PropTypes.object,
};

AtomicBlock.defaultProps = {
  styles: {},
};

//return a list of types with a function that wraps the viewer
const getPluginsViewer = (typeMap, pluginProps, styles) => {
  const res = {};
  Object.keys(typeMap).forEach(type => {
    res[type] = (children, entity, { key }) => (
      <AtomicBlock
        typeMap={typeMap}
        type={type}
        key={key}
        componentData={entity}
        {...pluginProps}
        styles={styles}
      >
        {children}
      </AtomicBlock>
    );
  });
  return res;
};

export default getPluginsViewer;
