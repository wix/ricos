import React, { PureComponent } from 'react';
import { ContentStateTransformation, RichContentPreview } from 'wix-rich-content-preview';
import * as PropTypes from 'prop-types';
import * as Plugins from './PreviewPlugins';
import theme from '../theme/theme'; // must import after custom styles
import 'wix-rich-content-preview/dist/styles.min.css';

const anchorTarget = '_top';
const relValue = 'noreferrer';

export default class Preview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
    this.transformations = [
      new ContentStateTransformation({
        _if: metadata => metadata.plain.length > 0,
        _then: (metadata, preview) =>
          preview.plain(metadata.plain[0].join('')).readMore({ lines: 3 }),
      }),
      new ContentStateTransformation({
        _if: metadata => metadata.images.length > 0,
        _then: (metadata, preview) =>
          preview.image({ mediaInfo: metadata.images[0] }).seeFullPost(),
      }),
      new ContentStateTransformation({
        _if: metadata => metadata.plain.length > 0,
        _then: (metadata, preview) =>
          preview.plain(metadata.plain[0].join('')).readMore({ lines: 1 }),
      }).rule({
        _if: metadata => metadata.images.length > 3,
        _then: (metadata, preview) =>
          preview
            .gallery({ mediaInfo: metadata.images.slice(0, 3) })
            .imageCounter({ counter: metadata.images.length - 3 }),
      }),
    ];
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      modalContent: null,
    });
  };

  helpers = {};

  render() {
    return (
      <div id="rich-content-preview" className="viewer">
        <h2>{'Default Rule'}</h2>
        <div className="content-preview">
          <RichContentPreview
            locale={this.props.locale}
            helpers={this.helpers}
            typeMappers={Plugins.typeMappers}
            inlineStyleMappers={Plugins.getInlineStyleMappers(this.props.initialState)}
            decorators={Plugins.decorators}
            config={Plugins.config}
            initialState={this.props.initialState}
            theme={theme}
            isMobile={this.props.isMobile}
            anchorTarget={anchorTarget}
            relValue={relValue}
            disabled={this.state.disabled}
          />
        </div>
        <h2>{'Rule I'}</h2>
        <p>{'_if: metadata => metadata.plain.length > 0'}</p>
        <p>
          {
            "_then: (metadata, preview) => preview .plain(metadata.plain[0].join('')).readMore({ lines: 3 })"
          }
        </p>
        <div className="content-preview">
          <RichContentPreview
            locale={this.props.locale}
            helpers={this.helpers}
            typeMappers={Plugins.typeMappers}
            inlineStyleMappers={Plugins.getInlineStyleMappers(this.props.initialState)}
            decorators={Plugins.decorators}
            config={Plugins.config}
            initialState={this.props.initialState}
            transformation={this.transformations[0]}
            theme={theme}
            isMobile={this.props.isMobile}
            anchorTarget={anchorTarget}
            relValue={relValue}
            disabled={this.state.disabled}
          />
        </div>
        <h2>{'Rule II'}</h2>
        <p>{'_if: metadata => metadata.images.length > 0'}</p>
        <p>
          {
            '_then: (metadata, preview) => preview.image({ mediaInfo: metadata.images[0] }).seeFullPost()'
          }
        </p>
        <div className="content-preview">
          <RichContentPreview
            locale={this.props.locale}
            helpers={this.helpers}
            typeMappers={Plugins.typeMappers}
            inlineStyleMappers={Plugins.getInlineStyleMappers(this.props.initialState)}
            decorators={Plugins.decorators}
            config={Plugins.config}
            initialState={this.props.initialState}
            transformation={this.transformations[1]}
            theme={theme}
            isMobile={this.props.isMobile}
            anchorTarget={anchorTarget}
            relValue={relValue}
            disabled={this.state.disabled}
          />
        </div>
        <h2>{'Rule III'}</h2>
        <p>{'_if: metadata => metadata.plain.length > 0'}</p>
        <p>
          {
            "_then: (metadata, preview) => preview .plain(metadata.plain[0].join('')).readMore({ lines: 1 })"
          }
        </p>
        <p>{'_if: metadata => metadata.images.length > 3'}</p>
        <p>
          {
            '_then: (metadata, preview) => preview .gallery({ mediaInfo: metadata.images.slice(0, 3), }) .imageCounter({ counter: metadata.images.length - 3 })'
          }
        </p>
        <div className="content-preview">
          <RichContentPreview
            locale={this.props.locale}
            helpers={this.helpers}
            typeMappers={Plugins.typeMappers}
            inlineStyleMappers={Plugins.getInlineStyleMappers(this.props.initialState)}
            decorators={Plugins.decorators}
            config={Plugins.config}
            initialState={this.props.initialState}
            transformation={this.transformations[2]}
            theme={theme}
            isMobile={this.props.isMobile}
            anchorTarget={anchorTarget}
            relValue={relValue}
            disabled={this.state.disabled}
          />
        </div>
      </div>
    );
  }
}

Preview.propTypes = {
  initialState: PropTypes.any,
  isMobile: PropTypes.bool,
};
