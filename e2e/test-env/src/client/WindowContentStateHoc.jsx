import React from 'react';
import PropTypes from 'prop-types';

const putContentStateStateOnWindowForTests = contentState => {
  if (typeof window !== 'undefined') {
    window.__CONTENT_STATE__ = contentState;
    window.__CONTENT_SNAPSHOT__ = {
      ...contentState,
      // blocks keys are random so for snapshot diffing they are changed to indexes
      blocks: contentState.blocks.map((block, index) => ({ ...block, key: index })),
    };
    // eslint-disable-next-line fp/no-delete
    delete window.__CONTENT_SNAPSHOT__.VERSION;
  }
};
export default WrappedComponent => {
  class WindowContentStateHoc extends React.Component {
    componentDidUpdate(prevProps) {
      const { contentState } = this.props;
      if (prevProps.contentState !== contentState) {
        putContentStateStateOnWindowForTests(contentState);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WindowContentStateHoc.propTypes = {
    contentState: PropTypes.object,
  };

  return WindowContentStateHoc;
};
