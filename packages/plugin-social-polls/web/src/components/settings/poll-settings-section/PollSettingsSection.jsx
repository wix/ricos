import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LabeledToggle } from 'wix-rich-content-plugin-commons';
import { Separator, RadioGroup, InfoIcon } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';

import { MEMBER_ROLES, VISIBILITY } from '../../../defaults';
import styles from './poll-settings-section.scss';

export class PollSettingsSection extends Component {
  styles = mergeStyles({ styles, theme: this.props.theme });

  VOTE_ROLE_OPTIONS = [
    {
      value: MEMBER_ROLES.SITE_MEMBERS,
      labelText: this.props.t(
        'Poll_PollSettings_Tab_Settings_Section_Voting_Permission_SiteMember'
      ),
    },
    {
      value: MEMBER_ROLES.ALL,
      labelText: this.props.t('Poll_PollSettings_Tab_Settings_Section_Voting_Permission_All'),
    },
  ];

  VIEW_ROLE_OPTIONS = [
    {
      value: VISIBILITY.ALWAYS,
      labelText: (
        <>
          {this.props.t('Poll_PollSettings_Tab_Settings_Section_Results_Permission_All')}
          &nbsp;
          <InfoIcon
            tooltipText={this.props.t(
              'Poll_PollSettings_Tab_Settings_Section_Results_Permission_All_Tooltip'
            )}
          />
        </>
      ),
    },
    {
      value: VISIBILITY.VOTERS,
      labelText: (
        <>
          {this.props.t('Poll_PollSettings_Tab_Settings_Section_Results_Permission_Voters')}
          &nbsp;
          <InfoIcon
            tooltipText={this.props.t(
              'Poll_PollSettings_Tab_Settings_Section_Results_Permission_Voters_Tooltip'
            )}
          />
        </>
      ),
    },
    {
      value: VISIBILITY.ME,
      labelText: (
        <>
          {this.props.t('Poll_PollSettings_Tab_Settings_Section_Results_Permission_Owner')}
          &nbsp;
          <InfoIcon
            tooltipText={this.props.t(
              'Poll_PollSettings_Tab_Settings_Section_Results_Permission_Owner_Tooltip'
            )}
          />
        </>
      ),
    },
  ];

  updateSettings(settings) {
    this.props.store.update('componentData', {
      poll: {
        settings,
      },
    });
  }

  render() {
    const { componentData, t } = this.props;

    const {
      votersDisplay,
      votesDisplay,
      multipleVotes,
      resultsVisibility,
      voteRole,
    } = componentData.poll.settings;

    const { enableVoteRole } = componentData.config || {};

    return (
      <section className={styles.section}>
        <h3 className={styles.title}>
          {t('Poll_PollSettings_Tab_Settings_Section_Voting_Header')}
        </h3>
        {enableVoteRole && (
          <>
            <p className={styles.label}>
              {t('Poll_PollSettings_Tab_Settings_Section_Voting_Permission_Title')}
            </p>
            <RadioGroup
              name="voteRole"
              theme={this.styles}
              value={voteRole}
              onChange={voteRole => this.updateSettings({ voteRole })}
              dataSource={this.VOTE_ROLE_OPTIONS}
              className={styles.radioPanel}
            />
          </>
        )}

        <LabeledToggle
          label={t('Poll_PollSettings_Tab_Settings_Section_Voting_Multiselect')}
          checked={multipleVotes}
          onChange={() => this.updateSettings({ multipleVotes: !multipleVotes })}
          theme={this.styles}
        />

        <Separator horizontal className={styles.separator} />

        <h3 className={styles.title}>
          {t('Poll_PollSettings_Tab_Settings_Section_Results_Header')}
        </h3>

        <p className={styles.label}>
          {t('Poll_PollSettings_Tab_Settings_Section_Results_Permission_Title')}
        </p>

        <RadioGroup
          name="resultsVisibility"
          theme={this.styles}
          value={resultsVisibility}
          onChange={resultsVisibility => this.updateSettings({ resultsVisibility })}
          dataSource={this.VIEW_ROLE_OPTIONS}
          className={styles.radioPanel}
        />

        {resultsVisibility !== VISIBILITY.ME && (
          <>
            <LabeledToggle
              label={t('Poll_PollSettings_Tab_Settings_Section_Results_VoteVisibility')}
              theme={this.styles}
              checked={votesDisplay}
              onChange={() =>
                this.updateSettings({
                  votesDisplay: !votesDisplay,
                  votersDisplay: !votesDisplay,
                })
              }
            />

            {votesDisplay && (
              <LabeledToggle
                label={t('Poll_PollSettings_Tab_Settings_Section_Results_VoterAnonymous')}
                theme={this.styles}
                checked={votersDisplay}
                onChange={() => this.updateSettings({ votersDisplay: !votersDisplay })}
              />
            )}
          </>
        )}
      </section>
    );
  }
}

PollSettingsSection.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};
