import React, { Component } from 'react';
import cls from 'classnames';
import FlipMove from 'react-flip-move';
import Measure from 'react-measure';

import { AddIcon, LoaderIcon } from '../assets/icons';
import { LAYOUT, VISIBILITY, BACKGROUND_TYPE } from '../constants';
import { getBackgroundString } from '../helpers';

import { withPoll, PollContextPropTypes } from './poll-context';
import { withRCEHelpers, RCEHelpersPropTypes } from './rce-helpers-context';
import { PollHeader } from './poll-header';
import { VotedUsers } from './voted-users';
import { PollOption } from './poll-option';

import styles from './poll.scss';

class PollComponent extends Component {
  static propTypes = {
    ...PollContextPropTypes,
    ...RCEHelpersPropTypes,
  };

  state = {
    collapsed: this.isInitiallyCollapsed(),
    error: null,
    loading: false,
    bounds: null,
  };

  async componentDidMount() {
    const { poll } = this.props;

    if (poll.id) {
      this.fetchPoll();
    }
  }

  componentDidCatch(error) {
    this.setState({ error: error.message });
  }

  async fetchPoll() {
    if (this.props.rce.isWebView || this.props.rce.preventInteraction) {
      return;
    }
    this.setState({
      loading: true,
      error: null,
    });

    try {
      await this.props.fetchPoll();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[rce-social-polls] fetchPoll: ', error.response);
      this.setState({ error: this.props.t('Poll_Viewer_Toast_Error_ServerDown') });
    } finally {
      this.setState({ loading: false });
    }
  }

  vote = async optionId => {
    this.setState({ error: null });
    try {
      await this.props.vote(optionId);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[rce-social-polls] vote: ', error.response);
      this.setState({ error: error.message });

      return Promise.reject(error);
    }
  };

  unvote = async optionId => {
    this.setState({ error: null });
    try {
      await this.props.unvote(optionId);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[rce-social-polls] unvote: ', error.response);
      this.setState({ error: error.message });

      return Promise.reject(error);
    }
  };

  isInitiallyCollapsed() {
    const { poll } = this.props;

    return poll.options.length > 4;
  }

  toggleCollapse = () => this.setState({ collapsed: !this.state.collapsed });

  handleOptionUpdate(index) {
    return option => this.props.updatePollOption(index, option);
  }

  handleOptionRemove(index) {
    return () => this.props.removeOption(index);
  }

  getNotes() {
    const { poll, t } = this.props;

    return [
      {
        condition: poll.settings.multipleVotes,
        label: t('Poll_Viewer_Multiselect_Footer'),
      },
      {
        condition: poll.settings.resultsVisibility === VISIBILITY.ME && poll.creatorFlag,
        label: t('Poll_Viewer_Visibility_Owner_Footer'),
      },
    ].filter(note => !!note.condition);
  }

  showResults() {
    const { resultsVisibility } = this.props.poll.settings;

    switch (resultsVisibility) {
      case VISIBILITY.ALWAYS:
        return true;

      case VISIBILITY.VOTERS:
        return this.props.poll.creatorFlag || !!this.props.poll.ownVotes?.length;

      case VISIBILITY.ME:
        return this.props.poll.creatorFlag;

      default:
        return false;
    }
  }

  hasImageBackground() {
    return this.props.design.poll?.backgroundType === BACKGROUND_TYPE.IMAGE;
  }

  getOptionList() {
    const { poll, rce } = this.props;
    const { collapsed } = this.state;

    if (!rce.isViewMode || this.showEditControls()) {
      return poll.options;
    }

    let list;

    if (!this.showResults()) {
      list = poll.options;
    } else {
      list = Array.from(poll.options).sort((prev, option) => {
        if (!prev.rating) {
          return 1;
        }

        if (option.rating === prev.rating) {
          return 0;
        }

        if (option.rating > prev.rating) {
          return 1;
        }

        return -1;
      });
    }

    return collapsed ? list.slice(0, 4) : list;
  }

  handleCTAFocus = e => {
    e.stopPropagation();
    this.props.rce.setInPluginEditingMode(true);
  };

  handleCTABlur = () => this.props.rce.setInPluginEditingMode(false);

  onResize = ({ bounds }) => this.setState({ bounds: this.state.bounds || bounds });

  showEditControls() {
    const { rce } = this.props;

    return !rce.isViewMode && !rce.isPreview;
  }

  render() {
    const { poll, rce, getVoters, addOption, design, layout, t, siteMembers } = this.props;
    const { collapsed, loading, bounds } = this.state;

    const style = {
      ...design.poll,
      background: getBackgroundString(
        design.poll?.background,
        design.poll?.backgroundType,
        bounds?.width,
        bounds?.height
      ),
    };

    return (
      <Measure bounds onResize={this.onResize}>
        {({ measureRef }) => (
          <div
            className={cls(styles.container, {
              [styles.isMobile]: rce.isMobile,
              [styles.webview]: rce.isWebView,
              [styles.fullscreen]: rce.isPreview,
              [styles.dark]: this.hasImageBackground(),
            })}
            style={style}
            dir={layout.poll?.direction}
            ref={measureRef}
          >
            <div
              className={cls(styles.background_overlay, {
                [styles.with_image]: this.hasImageBackground(),
              })}
            />
            <PollHeader />

            <ul
              className={cls(styles.options, {
                [styles.list]: layout.poll?.type === LAYOUT.LIST,
                [styles.grid]: layout.poll?.type === LAYOUT.GRID,
                [styles.with_image]: layout.option?.enableImage,
              })}
            >
              <FlipMove
                typeName={null}
                disableAllAnimations={this.showEditControls()}
                enterAnimation="none"
                leaveAnimation="none"
                verticalAlignment="bottom"
              >
                {this.getOptionList().map((option, i) => (
                  <li className={styles.option} key={option.id || i}>
                    <PollOption
                      option={option}
                      update={this.handleOptionUpdate(i)}
                      remove={this.handleOptionRemove(i)}
                      removeEnabled={this.showEditControls() && poll.options.length > 1}
                      vote={this.vote}
                      unvote={this.unvote}
                      poll={poll}
                      showResults={this.showResults()}
                      dark={this.hasImageBackground()}
                    />
                    <VotedUsers
                      option={option}
                      siteMembers={siteMembers}
                      showResults={this.showResults()}
                      showVoters={poll.settings.votersDisplay}
                      showVotes={poll.settings.votesDisplay}
                      fetchVoters={params => getVoters(option.id, params)}
                    />
                  </li>
                ))}

                {this.showEditControls() && (
                  <li className={styles.column}>
                    <button
                      onClick={addOption}
                      onFocus={this.handleCTAFocus}
                      onBlur={this.handleCTABlur}
                      className={styles.add_option}
                      style={design.option}
                    >
                      {layout.poll?.type === LAYOUT.GRID && layout.option?.enableImage ? (
                        <AddIcon />
                      ) : (
                        <>
                          <AddIcon width={24} height={24} />
                          &nbsp;
                          {t('Poll_Editor_Answer_AddAnswer')}
                        </>
                      )}
                    </button>
                  </li>
                )}
              </FlipMove>
            </ul>

            {poll.options.length > 4 && !this.showEditControls() && (
              <button
                onClick={this.toggleCollapse}
                className={styles.see_more}
                style={design.option}
              >
                {collapsed
                  ? this.showResults()
                    ? t('Poll_Viewer_ShowAllResults_CTA')
                    : t('Poll_Viewer_ShowAllOptions_CTA')
                  : t('Poll_Viewer_ShowLess_CTA')}
              </button>
            )}

            {this.getNotes().map((note, i) => (
              <p className={styles.additional_note} key={i}>
                {note.label}
              </p>
            ))}

            <LoaderIcon
              className={cls(styles.spinner, {
                [styles.shown]: loading,
              })}
              width={24}
              height={24}
            />
          </div>
        )}
      </Measure>
    );
  }
}

export const Poll = withRCEHelpers(withPoll(PollComponent));
