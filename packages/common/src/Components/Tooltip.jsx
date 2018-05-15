import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../Styles/tooltip.scss';

const isValidProperty = property => /^--\S+$/.test(property);

const setStyleProperty = (element, property, value) => {
  if (isValidProperty(property)) {
    element.style.setProperty(property, value);
  }
};

class Tooltip extends React.Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { content, moveBy, textAlign, maxWidth } = props;
    this.components = [];
    this.customStyle = {
      '--content': `'${content}'`,
      '--moveByX': `${moveBy.x || 0}px`,
      '--moveByY': `${moveBy.y || 0}px`,
      '--textAlign': textAlign,
      '--maxWidth': maxWidth ? `${maxWidth}px` : '100%'
    };
  }

  static propTypes = {
    theme: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    moveBy: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    textAlign: PropTypes.oneOf(['center', 'left', 'right']),
    maxWidth: PropTypes.number,
    children: PropTypes.node.isRequired,
  };

  componentRef(element) {
    this.component = element;
  }

  componentDidMount() {
    this.components.forEach(component =>
      Object.keys(this.customStyle).forEach(key => {
        setStyleProperty(component, key, this.customStyle[key]);
      }));
  }

  static defaultProps = {
    moveBy: { x: 0, y: 0 },
    textAlign: 'center',
  };

  render() {
    const { children } = this.props;
    const { styles } = this;

    return React.Children.map(children, child => React.cloneElement(child, {
      className: classNames(child.props.className, styles.tooltip),
      ref: e => this.components.push(e)
    }))[0];
  }
}

export default Tooltip;
