import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { mergeStyles } from 'wix-rich-content-common';
import PickedIcon from './../icons/pickedIcon.svg';
import styles from '../../statics/styles/button-sample.scss';

class ButtonSample extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { style } = this.props;
    this.state = {
      buttonStyle: style || {},
      index: this.props.i,
    };
  }

  onClick = () => {
    this.props.onClick(this.state.index);
    this.setState({ buttonStyle: this.props.style });
  };

  render() {
    const { buttonObj, style, active, t, i } = this.props;
    const { styles } = this;
    const { buttonStyle } = this.state;
    const propsStyle = {
      backgroundColor: buttonObj.backgroundColor,
      borderColor: buttonObj.borderColor,
      textColor: buttonObj.textColor,
      borderRadius: buttonObj.borderRadius + 'px',
      borderWidth: buttonObj.borderWidth + 'px',
    };
    const stateStyle = {
      backgroundColor: buttonStyle.background,
      borderColor: buttonStyle.borderColor,
      textColor: buttonStyle.color,
      borderRadius: buttonStyle.borderRadius,
      borderWidth: buttonStyle.borderWidth,
    };
    const onStyleChanged = isEqual(propsStyle, stateStyle);
    return (
      <div className={styles.button_sample_container} data-hook={`buttonSample_${i}`}>
        {active && onStyleChanged && <PickedIcon className={styles.button_picked} />}
        <button onClick={this.onClick} style={{ ...style }} className={styles.button_sample}>
          {t('ButtonModal_Button_Sample_text')}
        </button>
      </div>
    );
  }
}

ButtonSample.propTypes = {
  style: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  t: PropTypes.func,
  active: PropTypes.bool,
  i: PropTypes.number,
  buttonObj: PropTypes.object.isRequired,
};

export default ButtonSample;
