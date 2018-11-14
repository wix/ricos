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
    };
  }

  onClick = () => {
    this.props.onClickButton(this.state.index);
    this.setState({ buttonStyle: this.props.style });
  }


  render() {

    const { style, theme, active } = this.props;
    const { styles } = this;
    let displayActive = {
      display: 'inline'
    };
    if (active) {
      displayActive = {
        display: 'inline'
      };
    } else {
      displayActive = {
        display: 'none'
      };
    }
    return (
      <div className={styles.button_sample_container}>
        <div style={displayActive} className={styles.oval}>
          <div className={styles.active} />
        </div>
        <button onClick={this.onClick} style={{ ...style }} className={classNames(theme[style.className], styles.button_sample)}>
          Click Me!
        </button>
      </div>
    );
  }
}

ButtonSample.propTypes = {
  style: PropTypes.object,
  theme: PropTypes.object,
  componentData: PropTypes.object,
  pubsub: PropTypes.object,
  onConfirm: PropTypes.func,
  onClick: PropTypes.func,
  onClickButton: PropTypes.func,
  active: PropTypes.bool,
  i: PropTypes.number
};

export default ButtonSample;
