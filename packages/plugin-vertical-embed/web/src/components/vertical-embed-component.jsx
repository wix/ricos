import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { validate } from 'wix-rich-content-common';
// eslint-disable-next-line max-len
import verticalEmbedSchema from 'wix-rich-content-common/dist/statics/schemas/vertical-embed.schema.json';
import classnames from 'classnames';
import styles from '../../statics/styles/widget.scss';

class VerticalEmbedComponent extends PureComponent {
  constructor(props) {
    super(props);
    validate(props.componentData, verticalEmbedSchema);
  }

  render() {
    const {
      componentData,
      className,
      settings: { slimLayout = false },
    } = this.props;

    const { selectedProduct } = componentData;
    const { html } = selectedProduct;

    return (
      <div
        className={classnames(className, styles.card, { slimLayout })}
        data-hook="vertical-embed"
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
};

export default VerticalEmbedComponent;
