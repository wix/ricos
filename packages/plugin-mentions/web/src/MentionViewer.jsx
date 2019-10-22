import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Context } from 'wix-rich-content-common';
import MentionComponent from './MentionComponent';

class MentionViewer extends Component {
  render() {
    return (
      <MentionComponent
        contextType={MentionViewer.contextType || Context.type}
        mention={this.props.componentData.mention}
        {...this.props}
      />
    );
  }
}

MentionViewer.contextType = Context.type;

MentionViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
};

export default MentionViewer;
