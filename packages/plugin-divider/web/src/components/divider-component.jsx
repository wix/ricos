import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, validate, Context } from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import { getType, getConfig } from '../toolbar/selectors';
import DividerLine from './divider-line';
import schema from '../../statics/data-schema.json';
import styles from '../../statics/styles/divider-viewer.rtlignore.scss';

class DividerComponent extends PureComponent {
  constructor(props) {
    super(props);
    validate(props.componentData, schema);
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
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    // NOTE: editor-only logic in viewer component
    const editorBounds = this.context.getEditorBounds && this.context.getEditorBounds();
    const editorWidth = editorBounds && editorBounds.width ? editorBounds.width : 740;
    const { type, size, alignment } = this.state;
    const className = classNames(
      this.styles['divider-container'],
      this.styles[`divider-container--${type}`],
      this.context.isMobile && this.styles['divider-container--mobile'],
      this.props.className
    );
    return (
      <div className={className} data-hook={`divider-${type}`}>
        <DividerLine
          type={type}
          width={editorWidth}
          size={size}
          alignment={alignment}
          styles={this.styles}
          contextType={DividerComponent.contextType || Context.type}
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
};

DividerComponent.contextType = Context.type;

export default DividerComponent;
