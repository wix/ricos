import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, validate } from 'wix-rich-content-common';
import isEqual from 'lodash/isEqual';
import { getType, getConfig } from '../toolbar/selectors';
import DividerLine from './divider-line';
import schema from '../../statics/data-schema.json';
import styles from '../../statics/styles/divider-viewer.scss';

class DividerComponent extends PureComponent {
  constructor(props) {
    super(props);
    validate(props.componentData, schema);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = ({ componentData }) => {
    const config = getConfig(componentData);
    return {
      type: getType(componentData),
      size: config.size,
      alignment: config.alignment,
    };
  };

  render() {
    const styles = this.styles;
    const { editorBounds } = this.props;
    const editorWidth = editorBounds ? editorBounds.width : 740;
    const { type, size, alignment } = this.state;
    const className = classNames(
      styles['divider-container'],
      this.styles[`divider-container--${type}`],
      this.props.isMobile && this.styles['divider-container--mobile'],
      this.props.className
    );
    return (
      <div className={className} data-hook={`divider-${type}`}>
        <DividerLine
          type={type}
          width={editorWidth}
          size={size}
          isMobile={this.props.isMobile}
          alignment={alignment}
          styles={styles}
        />
      </div>
    );
  }
}

DividerComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object,
  store: PropTypes.object,
  blockProps: PropTypes.object,
  className: PropTypes.string,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  editorBounds: PropTypes.object,
};

export default DividerComponent;
