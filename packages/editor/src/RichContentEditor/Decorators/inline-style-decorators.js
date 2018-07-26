import React from 'react';
import PropTypes from 'prop-types';
import { CompositeDecorator } from '@wix/draft-js';
import classNames from 'classnames';
import styles from '../../../statics/styles/rich-content-editor.scss';

const propTypes = {
  children: PropTypes.node,
  theme: PropTypes.object,
};

const HeaderOneDecoration = ({ theme, children }) => <h2 className={classNames(styles.headerOne, theme.headerOne)}>{children}</h2>;
const HeaderTwoDecoration = ({ theme, children }) => <h3 className={classNames(styles.headerTwo, theme.headerTwo)}>{children}</h3>;

HeaderOneDecoration.propTypes = HeaderTwoDecoration.propTypes = propTypes;

const styleToDecorationMap = {
  'inline-header-one': HeaderOneDecoration,
  'inline-header-two': HeaderTwoDecoration,
};

const getStrategyByStyle = style => (contentBlock, callback) => {
  contentBlock.findStyleRanges(character => character.hasStyle(style),
    (start, end) => callback(start, end));
};

const withTheme = (Component, theme) => {
  const Themed = props => <Component theme={theme} {...props} />;
  Themed.propTypes = Component.propTypes || {};
  return Themed;
};

withTheme.propTypes = {
  Component: PropTypes.element,
  theme: PropTypes.object
};

export default theme => new CompositeDecorator(
  Object.keys(styleToDecorationMap).map(style => ({
    strategy: getStrategyByStyle(style),
    component: withTheme(styleToDecorationMap[style], theme)
  }))
);
