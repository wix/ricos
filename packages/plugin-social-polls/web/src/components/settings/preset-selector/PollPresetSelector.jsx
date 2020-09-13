/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { merge } from 'lodash';

import { SelectionList } from 'wix-rich-content-plugin-commons';
import { Separator } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';

import { getRandomValue } from '../../../helpers';
import {
  LAYOUT,
  BACKGROUND_PRESETS,
  BACKGROUND_TYPE,
  POLL_IMAGES_POOL,
  OPTION_IMAGES_POOL,
} from '../../../defaults';
import { ListPollIcon, GridPollIcon, WithImagePollIcon, RemoveIcon } from '../../../assets/icons';

import styles from './poll-preset-selector.scss';

export class PollPresetSelector extends PureComponent {
  styles = mergeStyles({ styles, theme: this.props.theme });

  handleTypeSelection = preset => {
    const { helpers, componentData, onConfirm } = this.props;

    onConfirm(
      merge({}, componentData, {
        poll: {
          mediaId: getRandomValue(POLL_IMAGES_POOL),
          options: [
            {
              title: '',
              mediaId: getRandomValue(OPTION_IMAGES_POOL),
            },
            {
              title: '',
              mediaId: getRandomValue(OPTION_IMAGES_POOL),
            },
          ],
        },
        layout: preset,
        design: {
          poll: {
            backgroundType: BACKGROUND_TYPE.IMAGE,
            background: getRandomValue(BACKGROUND_PRESETS[BACKGROUND_TYPE.IMAGE]),
          },
        },
      })
    );
    helpers.closeModal();
  };

  renderOption = ({ item }) => (
    <>
      <item.icon />
      <p className={this.styles.selectionListOptionLabel}>{item.label}</p>
    </>
  );

  render() {
    const { t, isMobile, helpers } = this.props;

    return (
      <div className={this.styles.root}>
        {isMobile ? (
          <>
            <div className={this.styles.preset_mobile_header}>
              <p className={this.styles.title}>{t('Poll_Presets_Popup_Title')}</p>
              <RemoveIcon
                width={30}
                height={30}
                onClick={helpers.closeModal}
                className={styles.close_icon}
              />
            </div>
            <Separator horizontal className={this.styles.separator} />
          </>
        ) : (
          <>
            <p className={this.styles.title}>{t('Poll_Presets_Popup_Title')}</p>
            <p className={this.styles.subtitle}>{t('Poll_Presets_Popup_Subtitle')}</p>
          </>
        )}
        <div className={this.styles.preset_selection_list}>
          <SelectionList
            theme={this.styles}
            dataSource={[
              {
                value: {
                  poll: {
                    type: LAYOUT.LIST,
                    enableImage: false,
                  },
                  option: {
                    enableImage: false,
                  },
                },
                label: t('Poll_Presets_Popup_Option_TextList'),
                icon: ListPollIcon,
              },
              {
                value: {
                  poll: {
                    type: LAYOUT.LIST,
                    enableImage: true,
                  },
                  option: {
                    enableImage: false,
                  },
                },
                label: t('Poll_Presets_Popup_Option_TextListAndMainImage'),
                icon: WithImagePollIcon,
              },
              {
                value: {
                  poll: {
                    type: LAYOUT.GRID,
                    enableImage: false,
                  },
                  option: {
                    enableImage: true,
                  },
                },
                label: t('Poll_Presets_Popup_Option_ImagesGrid'),
                icon: GridPollIcon,
              },
            ]}
            renderItem={this.renderOption}
            onChange={this.handleTypeSelection}
            className={this.styles.preset_selector}
          />
        </div>
      </div>
    );
  }
}
