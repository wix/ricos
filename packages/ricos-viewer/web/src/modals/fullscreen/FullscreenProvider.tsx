import React, { Component, Fragment, Children, ReactElement, Suspense } from 'react';
import { emptyState } from 'ricos-common';
import { Helpers } from 'wix-rich-content-common';
import { RicosContent } from '../../index';

interface Props {
  children: ReactElement;
  helpers?: Helpers;
  initialState?: RicosContent;
}

interface State {
  isExpanded: boolean;
  index: number;
  expandModeData?: {
    images: Record<string, unknown>;
    imageMap: Record<number, number>;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FullscreenModal?: any;
}

export type ExpandModeData = {
  images: Record<string, unknown>;
  imageMap: Record<number, number>;
};

export default class FullscreenProvider extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      index: 0,
    };
  }

  componentDidMount() {
    const FullscreenModal = React.lazy(() =>
      import(/* webpackChunkName: "RicosEditorModal"  */ './FullscreenModal')
    );
    this.setState({ FullscreenModal });
  }

  onClose = () => this.setState({ isExpanded: false });

  setExpandModeData = expandModeData => this.setState({ expandModeData });

  addExpand = config => {
    const onExpand = (entityIndex: number, innerIndex = 0) =>
      this.setState({
        isExpanded: true,
        index: this.state.expandModeData?.imageMap[entityIndex] || 0 + innerIndex,
      });
    const imageConfig = config['wix-draft-plugin-image'];
    const galleryConfig = config['wix-draft-plugin-gallery'];
    if (imageConfig && !imageConfig.onExpand) {
      config['wix-draft-plugin-image'] = { ...imageConfig, onExpand };
    }
    if (galleryConfig && !galleryConfig.onExpand) {
      config['wix-draft-plugin-gallery'] = { ...galleryConfig, onExpand };
    }
    return config;
  };

  render() {
    const { FullscreenModal, isExpanded, index, expandModeData } = this.state;
    const { children, initialState } = this.props;
    const config = this.addExpand(children.props.config);

    return (
      <Fragment>
        {Children.only(React.cloneElement(children, { config }))}
        {FullscreenModal && (
          <Suspense fallback={<div />}>
            <FullscreenModal
              dataHook={'RicosFullScreen'}
              initialState={initialState || emptyState}
              isOpen={isExpanded}
              images={expandModeData?.images || []}
              onClose={this.onClose}
              index={index}
              setExpandModeData={this.setExpandModeData}
            />
          </Suspense>
        )}
      </Fragment>
    );
  }
}
