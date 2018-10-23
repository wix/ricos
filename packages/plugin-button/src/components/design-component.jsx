import React, { PureComponent } from 'react'
import { SliderWithInput, SettingsPanelFooter } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/design-component-styles.scss';


class DesignComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.styles = mergeStyles({ styles, theme: props.theme });
        const { componentData } = this.props;
        this.state = {
            textSize: componentData.textSize || '5',
        }

    }
    onSliderStatusChange = (value) => {
        this.setState({ textSize: value });
    }

    onCloseRequested = () => {
        this.setState({ isOpen: false });
        this.props.helpers.closeModal();
    };

    onConfirm = () => {
        const { textSize } = this.state;
        console.log('designComponent', this.props.pubsub);
        const { componentData, helpers, pubsub, onConfirm } = this.props;
        if (onConfirm) {
            onConfirm({ ...componentData, textSize: textSize });
        } else {
            pubsub.update('componentData', { textSize: textSize });
        }

        if (helpers && helpers.onVideoSelected) {
            helpers.onVideoSelected(textSize, data => pubsub.update('componentData', { metadata: { ...data } }));
        }

        this.onCloseRequested();

        this.setState({ submitted: true });

    };

    render() {
        const styles = this.styles;
        const { theme, t } = this.props;
        console.log('changed', this.state.textSize);
        return (
            <div>
                <div className={styles.row} >
                    Text Size:
                <SliderWithInput
                        value={100}
                        min={5}
                        max={200}
                        onChange={this.onSliderStatusChange.bind(this)}
                        theme={styles}
                    />

                </div>
                <SettingsPanelFooter
                    className={styles.modal_footer}
                    save={() => this.onConfirm()}
                    cancel={() => this.onCloseRequested()}
                    saveLabel={'Add Now'}
                    cancelLabel={'Cancel'}
                    theme={theme}
                    t={t}
                />
            </div>
        );
    }
}
DesignComponent.defaultProps = {
    doneLabel: 'Add Now',
    cancelLabel: 'Cancel',
};

export default DesignComponent;