import React, { Component, Suspense } from 'react';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onButtonClick: any;
  container: HTMLElement;
}

export default class TextSelectionToolbarProvider extends Component<Props> {
  _TextSelectionToolbar;

  componentDidMount() {
    this.lazyLoadToolbar();
  }

  componentWillReceiveProps() {
    if (!this._TextSelectionToolbar) {
      this.lazyLoadToolbar();
    }
  }

  lazyLoadToolbar() {
    const TextSelectionToolbar = React.lazy(() => import('./TextSelectionToolbar'));
    this._TextSelectionToolbar = TextSelectionToolbar;
  }

  render() {
    const TextSelectionToolbar = this._TextSelectionToolbar;
    return TextSelectionToolbar ? (
      <Suspense fallback={<div />}>
        <TextSelectionToolbar {...this.props} />
      </Suspense>
    ) : null;
  }
}
