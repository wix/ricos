import React, { PureComponent } from 'react';
import styles from '../../statics/styles/default-styles.scss';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';

class ButtonComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.styles = mergeStyles({ styles, theme: this.props.theme });

    }

    render() {
        const { componentData } = this.props;
        const { styles } = this;
        const { className } = this.props;
        const containerClassNames = classNames(styles.button_container, className || '');
        const theme = this.props.theme;
        const userStyle = {
            fontSize: componentData.textSize,
            background: componentData.backgroundColor
        }
        let buttonName = (!componentData.buttonName) ? 'Click Me!' : componentData.buttonName;
        console.log(componentData);
        return (
            <div className={containerClassNames}>
                <button className={theme.button_primary} href={componentData.src}>
                    {
                        buttonName
                    }
                </button>
            </div>

        );
    }
}

export { ButtonComponent as Component, DEFAULTS };