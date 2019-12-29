import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { isSSR } from 'wix-rich-content-common';
import * as PropTypes from 'prop-types';
import * as Plugins from './ViewerPlugins';
import theme from '../theme/theme'; // must import after custom styles
import getImagesData from 'wix-rich-content-fullscreen/src/lib/getImagesData';
import Fullscreen from 'wix-rich-content-fullscreen';

const anchorTarget = '_top';
const relValue = 'noreferrer';
const preview_img =
  'https://image.winudf.com/v2/image/Y29tLmJsYWNrYmFja2dyb3VuZHdhbGxwYXBlcnNpbWFnZXNfc2NyZWVuXzFfMTUwOTI1MjEyOV8wNzU/screen-1.jpg?fakeurl=1&type=.jpg';

export default class Viewer extends PureComponent {
  constructor(props) {
    super(props);

    if (!isSSR()) {
      ReactModal.setAppElement('#root');
      this.expandModeData = getImagesData(this.props.initialState);
    }
    this.state = {
      disabled: false,
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
        expendModeIsOpen: true,
        expandModeIndex: this.expandModeData.imageMap[entityIndex] + innerIndex,
      });
    },
    onProgressChange: updatePercentage => {
      let percent = 0;
      updatePercentage(percent, preview_img);
      const interval = setInterval(() => {
        updatePercentage(percent, preview_img);
        percent += 10;
        if (percent === 110) clearInterval(interval);
      }, 100);
    },
  };

  render() {
    const { expendModeIsOpen, expandModeIndex } = this.state;
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
            isOpen={expendModeIsOpen}
            images={this.expandModeData.images}
            onClose={() => this.setState({ expendModeIsOpen: false })}
            index={expandModeIndex}
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
