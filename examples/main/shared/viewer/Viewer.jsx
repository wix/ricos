import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { isSSR } from 'wix-rich-content-common';
import * as PropTypes from 'prop-types';
import * as Plugins from './ViewerPlugins';
import theme from '../theme/theme'; // must import after custom styles
import getImagesData from 'wix-rich-content-fullscreen/dist/lib/getImagesData';
import Fullscreen from 'wix-rich-content-fullscreen';
import 'wix-rich-content-fullscreen/dist/styles.min.css';

const anchorTarget = '_top';
const relValue = 'noreferrer';

export default class Viewer extends PureComponent {
  constructor(props) {
    super(props);

    if (!isSSR()) {
      ReactModal.setAppElement('#root');
      this.expandModeData = getImagesData(this.props.initialState);
    }
    this.state = {
      disabled: false,
      expandModeIsOpen: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialState !== this.props.initialState) {
      this.expandModeData = getImagesData(this.props.initialState);
    }
  }

  helpers = {
    onExpand: (entityIndex, innerIndex = 0) => {
      //galleries have an innerIndex (i.e. second image will have innerIndex=1)
      this.setState({
        expandModeIsOpen: true,
        expandModeIndex: this.expandModeData.imageMap[entityIndex] + innerIndex,
      });
    },
  };

  render() {
    const { expandModeIndex, expandModeIsOpen } = this.state;
    return (
      <div id="rich-content-viewer" className="viewer">
        <RichContentViewer
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
          locale={this.props.locale}
          // siteDomain="https://www.wix.com"
        />
        {!isSSR() && (
          <Fullscreen
            images={this.expandModeData.images}
            onClose={() => this.setState({ expandModeIsOpen: false })}
            isOpen={expandModeIsOpen}
            index={expandModeIndex}
            relValue={relValue}
            anchorTarget={anchorTarget}
            locale={this.props.locale}
          />
        )}
      </div>
    );
  }
}

Viewer.propTypes = {
  initialState: PropTypes.any,
  isMobile: PropTypes.bool,
  locale: PropTypes.string.isRequired,
};
