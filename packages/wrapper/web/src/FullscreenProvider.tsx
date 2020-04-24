import React, { Component, Fragment, Suspense, Children, ReactElement } from 'react';
import { emptyState } from './utils';
import { RawDraftContentState } from 'draft-js';

interface Props {
  children: ReactElement;
  helpers?: Helpers;
  initialState: RawDraftContentState;
}

interface State {
  isExpanded: boolean;
  index?: number;
  data?: any;
  Fullscreen?: any;
}

export default class FullscreenProvider extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  componentDidMount() {
    const Fullscreen = React.lazy(() =>
      import(/* webpackChunkName: "rce-ViewerModal"  */ './ViewerModal')
    );
    this.setState({ Fullscreen });
  }

  onExpand = (entityIndex, innerIndex = 0) =>
    this.setState({
      isExpanded: true,
      index: this.state.data?.imageMap[entityIndex] + innerIndex,
    });

  onClose = () => this.setState({ isExpanded: false });

  setData = data => this.setState({ data });

  addExpand = (helpers: Helpers) => ({ ...helpers, onExpand: this.onExpand });

  render() {
    const { isExpanded, index, data, Fullscreen } = this.state;
    const { children, helpers: viewerHelpers = {}, initialState } = this.props;
    const helpers = this.addExpand(viewerHelpers);
    return (
      <Fragment>
        {Children.only(React.cloneElement(children, { helpers }))}
        {Fullscreen && (
          <Suspense fallback={<div />}>
            <Fullscreen
              dataHook={'WrapperFullScreen'}
              initialState={initialState || emptyState}
              isOpen={isExpanded}
              images={data?.images || []}
              onClose={this.onClose}
              index={index}
              setExpandModeData={this.setData}
            />
          </Suspense>
        )}
      </Fragment>
    );
  }
}
