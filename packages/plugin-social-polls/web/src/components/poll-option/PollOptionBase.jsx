import React from 'react';

import { RCEHelpersPropTypes } from '../rce-helpers-context';

import { LAYOUT } from '../../defaults';

import { OptionPropTypes } from './types';

export class PollOptionBase extends React.PureComponent {
  static propTypes = {
    ...OptionPropTypes,
    ...RCEHelpersPropTypes,
  };

  state = {
    loading: false,
  };

  isEditAllowed() {
    return !this.props.option.count && !this.props.rce.isPreview;
  }

  isUserChoice() {
    const { poll, option } = this.props;

    return !!poll.ownVotes?.includes(option.id);
  }

  isViewMode() {
    return this.props.rce.isViewMode;
  }

  isGridLayout() {
    return this.props.layout.poll?.type === LAYOUT.GRID;
  }

  isListLayout() {
    return this.props.layout.poll?.type === LAYOUT.LIST;
  }

  isImageEnabled() {
    return this.props.layout.option?.enableImage;
  }

  handleRemove = e => {
    e.stopPropagation();

    this.props.remove();
  };

  async toggleVote() {
    this.setState({ loading: true });

    try {
      if (this.isUserChoice()) {
        await this.props.unvote(this.props.option.id);
      } else {
        await this.props.vote(this.props.option.id);
      }
    } catch (error) {
    } finally {
      this.setState({ loading: false });
    }
  }

  handleVoteClick = async e => {
    const { validateUser, preventInteraction, preventVoting } = this.props.rce;

    e.preventDefault();

    if (e.keyCode || preventInteraction || preventVoting) {
      return;
    }

    if (validateUser) {
      validateUser().then(this.toggleVote.bind(this), () => {});
    } else {
      this.toggleVote();
    }
  };

  handleTitleChange = title => {
    const { update, option } = this.props;

    return update({ ...option, title });
  };

  handleImageChange = mediaId => {
    const { update, option } = this.props;

    return update({ ...option, mediaId });
  };

  getVotePercentage() {
    const { option } = this.props;

    return option.rating || 0;
  }

  render() {
    if (this.isViewMode()) {
      return this.renderViewMode();
    }

    return this.renderEditMode();
  }
}
