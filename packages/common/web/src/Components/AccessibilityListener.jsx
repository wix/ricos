import { Component } from 'react';
import { default as Context } from '../Utils/Context';
import noOutlineStyle from '../../statics/styles/no-outline.scss';

export default class AccessibilityListener extends Component {
  handleTabKeyUp = e => {
    if (e.which === 9 && document.body.classList.contains(noOutlineStyle.noOutline)) {
      document.body.classList.remove(noOutlineStyle.noOutline);
    }
  };

  handleClick = () => {
    if (!document.body.classList.contains(noOutlineStyle.noOutline)) {
      document.body.classList.add(noOutlineStyle.noOutline);
    }
  };

  componentDidMount() {
    document.body.classList.add(noOutlineStyle.noOutline);

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
