import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/button-sample.scss';

class ButtonSample extends PureComponent {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { componentData } = this.props;
    this.state = {
      buttonStyle: componentData.buttonStyle || {},
      index: this.props.i
    }
  }

  onClick = () => {
    const { componentData, pubsub, onClick, style } = this.props;
    if (onClick) {
      onClick({ ...componentData, buttonStyle: style, borderWidth: 0, borderRadius: 0 });
    } else {
      pubsub.update('componentData', { buttonStyle: style, borderWidth: 0, borderRadius: 0 });
    }
   this.props.onClickButton(this.state.index);
    this.setState({ buttonStyle: this.props.style });

  }


  render() {

    const { style, theme, active, i } = this.props;
    const { styles } = this;
    let displayActive = {
      display: 'inline'
    }
    if(active){
      displayActive = {
        display: 'inline'
      }
    }
    else {
      displayActive = {
        display: 'none'
      }
    }
    return (
      <div className={styles.buttonSample}>
        <div style={displayActive} className={styles.oval}>
        <div className={styles.active}/>
        </div>
      <button onClick={this.onClick} style={style.style} className={classNames(theme[style.className], styles.button_sample)}>
        Click Me!
      </button>
      </div>
    );
  }
}

ButtonSample.propTypes = {
  style: PropTypes.object
};

export default ButtonSample;
/*
.Oval {
  width: 18px;
  height: 18px;
  border: solid 1px #ffffff;
  background-color: #23d6b5;
}
*/