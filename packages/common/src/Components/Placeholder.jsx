import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from '../Utils/Context';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/placeholder.scss';

export default class Placeholder extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };
  render() {
    const { style } = this.props;
    const { theme } = this.context;
    this.styles = this.styles || mergeStyles({ styles, theme });

    return (
      <div className={this.styles.placeholder} style={style}>
        Loading...
      </div>
    );
  }
}

Placeholder.contextType = Context.type;
