import React, { Component, Fragment, Suspense, Children, ReactElement } from 'react';

interface Props {
  children: ReactElement;
  helpers?: object;
  initialState: object;
}

interface State {
  isExpanded: boolean;
  index?: number;
  data?: any;
  Fullscreen?: any;
  isMounted: boolean;
}

export default class FullscreenRenderer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      isMounted: false,
    };
  }

  componentDidMount() {
    const Fullscreen = React.lazy(() =>
      import(/* webpackChunkName: "rce-ViewerModal"  */ './ViewerModal')
    );
    this.setState({ Fullscreen, isMounted: true });
  }

  onExpand = (entityIndex, innerIndex = 0) =>
    this.setState({
      isExpanded: true,
      index: this.state.data?.imageMap[entityIndex] + innerIndex,
    });

  onClose = () => this.setState({ isExpanded: false });

  setData = data => this.setState({ data });

  createHelpers = (helpers: object) => ({ ...helpers, onExpand: this.onExpand });

  render() {
    const { isExpanded, index, data, Fullscreen, isMounted } = this.state;
    const { children } = this.props;
    const { helpers: viewerHelpers = {}, initialState } = children.props;
    const helpers = this.createHelpers(viewerHelpers);
    return (
      <Fragment>
        {Children.only(React.cloneElement(children, { helpers }))}
        {isMounted && (
          <Suspense fallback={<div />}>
            {Fullscreen && (
              <Fullscreen
                dataHook={'WrapperFullScreen'}
                initialState={initialState || { entityMap: {} }}
                isOpen={isExpanded}
                images={data?.images || []}
                onClose={this.onClose}
                index={index}
                setExpandModeData={this.setData}
              />
            )}
          </Suspense>
        )}
      </Fragment>
    );
  }
}
