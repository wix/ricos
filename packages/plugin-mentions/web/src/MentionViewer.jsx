import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MentionComponent from './MentionComponent';

class MentionViewer extends Component {
  render() {
    return <MentionComponent mention={this.props.componentData.mention} {...this.props} />;
  }
}

MentionViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
};

export default MentionViewer;
