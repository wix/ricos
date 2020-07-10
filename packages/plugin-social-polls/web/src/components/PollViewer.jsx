import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { PollContextProvider } from './poll-context';
import { RCEHelpersContext } from './rce-helpers-context';
import { Poll } from './Poll';

export class PollViewer extends PureComponent {
  render() {
    const { componentData, settings, t, theme, isMobile } = this.props;
    const { layout, design, poll } = componentData;

    return (
      <RCEHelpersContext.Provider
        value={{
          isMobile,
          layout,
          design,
          t,
          theme,
          isViewMode: true,
          ...settings,
        }}
      >
        <PollContextProvider poll={poll} settings={settings}>
          <Poll />
        </PollContextProvider>
      </RCEHelpersContext.Provider>
    );
  }
}

PollViewer.propTypes = {
  componentData: PropTypes.shape({
    poll: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    design: PropTypes.object.isRequired,
    pollId: PropTypes.string,
  }).isRequired,
  settings: PropTypes.object,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
};
