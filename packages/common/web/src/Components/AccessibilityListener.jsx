import { Component } from 'react';
import Context from '../Utils/Context';
import styles from '../../statics/styles/general.scss';

export default class AccessibilityListener extends Component {
  handleTabKeyUp = e => {
    if (e.which === 9 && document.body.classList.contains(styles.noOutline)) {
      document.body.classList.remove(styles.noOutline);
    }
  };

  handleClick = () => {
    if (!document.body.classList.contains(styles.noOutline)) {
      document.body.classList.add(styles.noOutline);
    }
  };

  componentDidMount() {
    document.body.classList.add(styles.noOutline);

    if (!this.context.isMobile) {
      document.addEventListener('keyup', this.handleTabKeyUp);
      document.addEventListener('click', this.handleClick);
    }
  }

  componentWillUnmount() {
    if (!this.context.isMobile) {
      document.removeEventListener('keyup', this.handleTabKeyUp);
      document.removeEventListener('click', this.handleClick);
    }
  }

  render = () => null;
}

AccessibilityListener.contextType = Context.type;
