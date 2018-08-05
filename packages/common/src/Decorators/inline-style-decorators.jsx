import React from 'react';
import PropTypes from 'prop-types';
import { HEADING } from './inline-styles';

const propTypes = {
  children: PropTypes.node,
  theme: PropTypes.object,
};

const HeaderOneDecoration = ({ theme, children }) => <h1 className={theme.headerOne}>{children}</h1>;
const HeaderTwoDecoration = ({ theme, children }) => <h2 className={theme.headerTwo}>{children}</h2>;
const HeaderThreeDecoration = ({ theme, children }) => <h3 className={theme.headerThree}>{children}</h3>;

HeaderOneDecoration.propTypes =
HeaderTwoDecoration.propTypes =
HeaderThreeDecoration.propTypes = propTypes;

const styleToDecorationMap = {
  [HEADING.TITLE]: HeaderOneDecoration,
  [HEADING.TWO]: HeaderTwoDecoration,
  [HEADING.THREE]: HeaderThreeDecoration,
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

export default (getStrategyByStyle, theme) =>
  Object.keys(styleToDecorationMap).map(style => ({
    strategy: getStrategyByStyle(style),
    component: withTheme(styleToDecorationMap[style], theme)
  }));
