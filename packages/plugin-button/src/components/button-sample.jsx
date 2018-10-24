import React, { PureComponent } from 'react';
import styles from '../../statics/styles/button-sample.scss';

class ButtonSample extends PureComponent {

    render() {
        return (
            <button style={this.props.style} className={styles.button_sample}>
                Click Me!
            </button>
        )
    }
}
export default ButtonSample