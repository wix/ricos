/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { validate } from 'wix-rich-content-common';
// eslint-disable-next-line max-len
import verticalEmbedSchema from 'wix-rich-content-common/dist/statics/schemas/vertical-embed.schema.json';
import classnames from 'classnames';
import styles from '../../statics/styles/widget.scss';
import { VERTICAL_EMBED_TYPE } from '../types';

class VerticalEmbedComponent extends PureComponent {
  constructor(props) {
    super(props);
    validate(props.componentData, verticalEmbedSchema);
  }

  onClick = () =>
    this.props.helpers.onViewerAction?.(
      VERTICAL_EMBED_TYPE,
      'Click',
      this.props.componentData.type
    );

  render() {
    const {
      componentData,
      className,
      settings: { slimLayout = false },
    } = this.props;

    const { selectedProduct } = componentData;
    const { html } = selectedProduct;

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        className={classnames(className, styles.card, { [styles.slimLayout]: slimLayout })}
        data-hook="vertical-embed"
        onClick={this.onClick}
      >
        {/* eslint-disable-next-line react/no-danger*/}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
}

VerticalEmbedComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  className: PropTypes.string,
  settings: PropTypes.object,
  helpers: PropTypes.object,
};

export default VerticalEmbedComponent;
