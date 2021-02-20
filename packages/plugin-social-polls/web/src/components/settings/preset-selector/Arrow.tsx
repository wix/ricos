import React, { Component } from 'react';

import { mergeStyles, RichContentTheme } from 'wix-rich-content-common';

import styles from './arrow.scss';

interface Props {
  buttonRef: HTMLElement;
  theme: RichContentTheme;
}

export class Arrow extends Component<Props> {
  styles: Record<string, string>;

  constructor(props: Props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles } = this;
    const { buttonRef } = this.props;
    const { top } = buttonRef.getBoundingClientRect();

    return (
      <div>
        <div className={styles[`arrow_${top > 357 ? 'down' : 'up'}`]} />
      </div>
    );
  }
}
