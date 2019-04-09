import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, Context } from 'wix-rich-content-common';
import MentionComponent from './MentionComponent';
import Styles from '../statics/mentions.scss';

class MentionViewer extends Component {
  render() {
    this.styles = this.styles || mergeStyles({ styles: Styles, theme: this.context.theme });
    return (
      <MentionComponent
        contextType={MentionViewer.contextType || Context.type}
        mention={this.props.componentData.mention}
        {...this.props}
        theme={this.styles}
      />
    );
  }
}

MentionViewer.contextType = Context.type;

MentionViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
};

export default MentionViewer;
