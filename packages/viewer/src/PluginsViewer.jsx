import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import { sizeClassName, alignmentClassName, textWrapClassName, mergeStyles, normalizeUrl } from 'wix-rich-content-common';
import styles from './Styles/rich-content-viewer.scss';

const renderLink = (componentData, anchorTarget, relValue) => {
  if (componentData.config && componentData.config.link) {
    const { url, target, rel } = componentData.config.link;
    return (
      <a
        target={target || anchorTarget || '_self'}
        rel={rel || relValue || 'noopener'}
        href={normalizeUrl(url)}
        className={styles.anchor}
      >{}
      </a>);
  }
  return null;
};

const AtomicBlock = ({ type, typeMap, componentData, children, theme, isMobile, anchorTarget, relValue, ...props }) => {
  const mergedStyles = mergeStyles({ theme, styles });
  const { component: Component, elementType } = typeMap[type];
  const { size, alignment, textWrap, container } = typeMap[type].classNameStrategies || {};

  if (Component) {
    if (elementType !== 'inline') {
      const containerClassNames = classNames(mergedStyles.pluginContainerReadOnly,
        { [mergedStyles.pluginContainerMobile]: isMobile },
        isFunction(alignment) ? alignment(componentData, theme, styles, isMobile) :
          alignmentClassName(componentData, theme, styles, isMobile),
        isFunction(size) ? size(componentData, theme, styles, isMobile) :
          sizeClassName(componentData, theme, styles, isMobile),
        isFunction(textWrap) ? textWrap(componentData, theme, styles, isMobile) :
          textWrapClassName(componentData, theme, styles, isMobile)
      );
      return (
        <div className={containerClassNames}>
          {isFunction(container) ?
            <div className={container(theme)}>
              <Component componentData={componentData} theme={theme} {...props}>
                {children}
              </Component>
            </div> :
            <Component componentData={componentData} theme={theme} {...props}>
              {children}
            </Component>}
          {renderLink(componentData, anchorTarget, relValue)}
        </div>);
    } else {
      return <Component componentData={componentData} theme={theme} {...props}> {children} </Component>;
    }
  }
  return null;
};

AtomicBlock.propTypes = {
  type: PropTypes.string.isRequired,
  componentData: PropTypes.object.isRequired,
  typeMap: PropTypes.object,
  children: PropTypes.node,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
};

//return a list of types with a function that wraps the viewer
const getPluginsViewer = (typeMap, pluginProps) => {
  const res = {};
  Object.keys(typeMap).forEach(type => {
    res[type] = (children, entity, { key }) => (
      <AtomicBlock typeMap={typeMap} type={type} key={key} componentData={entity} {...pluginProps}>{children}</AtomicBlock>);
  });
  return res;
};

export default getPluginsViewer;
