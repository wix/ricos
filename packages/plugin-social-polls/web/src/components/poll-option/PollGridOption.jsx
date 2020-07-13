import React from 'react';
import cls from 'classnames';
import { TooltipGenerator } from 'wix-rich-content-common';
import { RemoveIcon, NonEditableIcon, CheckIcon, LoaderIcon } from '../../assets/icons';
import { TextField } from '../text-field';
import { ImageUpload } from '../image-upload';

import { PollOptionBase } from './PollOptionBase';

import styles from './option.scss';

export class PollGridOption extends PollOptionBase {
  static propTypes = PollOptionBase.propTypes;

  getCustomStyle() {
    const { design } = this.props;

    const borderRadius = parseInt(design.option?.borderRadius);

    return {
      input: {
        borderRadius: this.isImageEnabled()
          ? `0 0 ${borderRadius}px ${borderRadius}px`
          : `${borderRadius}px`,
      },
      image: {
        borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
      },
    };
  }

  renderEditMode() {
    const { design, option, removeEnabled, dark, t } = this.props;

    const style = this.getCustomStyle();

    return (
      <div
        className={cls(styles.option, {
          [styles.with_image]: this.isImageEnabled(),
          [styles.dark]: dark,
        })}
        style={design.option}
      >
        {this.isImageEnabled() && (
          <ImageUpload
            className={styles.image}
            value={option.mediaId}
            onChange={this.handleImageChange}
            style={style.image}
            disabled={!this.isEditAllowed()}
          />
        )}
        <div className={styles.title}>
          <TextField
            disabled={!this.isEditAllowed()}
            maxLength={60}
            style={style.input}
            className={cls(styles.input, styles.centered)}
            value={option.title}
            placeholder={t('Poll_Editor_Answer_Placeholder')}
            onChange={this.handleTitleChange}
            endAdornment={
              <>
                {!this.isEditAllowed() ? (
                  <TooltipGenerator
                    content={t('Poll_Editor_Answer_Error_NoEdit_Tooltip')}
                    parent={<NonEditableIcon className={styles.adornment_icon} />}
                  />
                ) : null}
                {removeEnabled && (
                  <RemoveIcon onClick={this.handleRemove} className={styles.remove} />
                )}
              </>
            }
          />
        </div>
      </div>
    );
  }

  renderViewMode() {
    const { design, option, showResults, dark, t } = this.props;
    const { loading } = this.state;

    const style = this.getCustomStyle();

    return (
      <div
        className={cls(styles.option, styles.grid, styles.cta, {
          [styles.with_image]: this.isImageEnabled(),
          [styles.user_choice]: this.isUserChoice(),
          [styles.dark]: dark,
        })}
        style={design.option}
        onClick={this.handleVoteClick}
        onKeyPress={this.handleVoteClick}
        tabIndex={0}
        role="button"
      >
        <div
          className={cls(styles.overlay, {
            [styles.shown]: loading,
          })}
          style={design.option}
        >
          <LoaderIcon className={styles.spinner} width={36} height={36} />
        </div>
        {this.isImageEnabled() && (
          <ImageUpload className={styles.image} value={option.mediaId} style={style.image} />
        )}
        <div className={styles.title}>
          <TextField
            maxLength={60}
            style={style.input}
            className={cls(styles.input, styles.centered, {
              [styles.with_result]: showResults,
            })}
            value={option.title}
            placeholder={t('Poll_Editor_Answer_Placeholder')}
          >
            <span
              className={styles.progress}
              style={{
                width: `${this.getVotePercentage()}%`,
              }}
            />
            {showResults && (
              <span className={styles.progress_value}>{this.getVotePercentage()}%</span>
            )}
          </TextField>
        </div>
        <div
          className={styles.check}
          style={{
            color: dark ? '#000' : design.poll.background,
          }}
        >
          <CheckIcon className={styles.icon} />
        </div>
      </div>
    );
  }
}
