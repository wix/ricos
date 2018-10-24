import React, { PureComponent } from 'react'
import { SliderWithInput, RadioGroup } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';
import ColorPicker from '../components/color-picker';
import ButtonSample from '../components/button-sample';
import styles from '../../statics/styles/design-component-styles.scss';

const arr =[
    {
        border: '1px solid #0261FF',
        background: '#0261FF',
        color: 'white',
        borderRadius: '0px'

    },
    {
        border: '1px solid #0261FF',
        background: 'white',
        color: '#0261FF',
        borderRadius: '0px'

    },
    {
        border: '1px solid #0261FF',
        background: '#B5D1FF',
        color: '#0261FF',
        borderRadius: '0px'

    },
    {
        border: '1px solid #0261FF',
        background: '#B5D1FF',
        color: '#0261FF',
        borderRadius: '8px'

    },
    {
        border: '5px solid #0261FF',
        background: 'white',
        color: '#0261FF',
        borderRadius: '0px'

    },


]

class DesignComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.styles = mergeStyles({ styles, theme: props.theme });
        const { componentData } = this.props;
        this.state = {
            width: componentData.width || 20,
            buttonSize: componentData.buttonSize || 'M',
        }

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
    onRadioButtonsChange = (value) => {
        this.setState({ buttonSize: value });
    }
    onSliderStatusChange = (value) => {
        this.setState({ textSize: value });
    }

    render() {
        const styles = this.styles;
        const { theme, t } = this.props;
        const sizeOptions = [
            { value: 'L', labelText: 'L' },
            { value: 'M', labelText: 'M' },
            { value: 'S', labelText: 'S' },
        ]
        console.log('changed', this.state.textSize);
        return (
            <div className={styles.design_component}>
                <div className={classNames(styles.row, styles.button_samples)}>
                    <ButtonSample style={arr[0]} />
                    <ButtonSample style={arr[1]}/>
                    <ButtonSample style={arr[2]} />
                    <ButtonSample style={arr[3]}/>
                    <ButtonSample style={arr[4]}/>
                </div>
                <div className={styles.row} >
                    Size
                    <br /><br />
                    <RadioGroup
                        label='Size'
                        dataSource={sizeOptions}
                        value={this.state.buttonSize}
                        onChange={this.onRadioButtonsChange.bind(this)}
                        theme={theme}
                        className={styles.radioItem}
                    />

                </div>
                <div className={styles.row} >
                    Border
                    <br /><br />
                    <SliderWithInput
                        value={parseInt(this.state.width, 10)}
                        min={0}
                        max={30}
                        label="width"
                        onChange={this.onSliderStatusChange.bind(this)}
                        theme={theme}
                    />
                    <SliderWithInput
                        value={10}
                        min={0}
                        max={30}
                        label="Height"
                        onChange={this.onSliderStatusChange.bind(this)}
                        theme={theme}
                    />

                </div>
                <div className={styles.row} >
                    Color
                    <br /><br />
                    <ColorPicker theme={theme} initialColor={'white'}>Text</ColorPicker>
                    <ColorPicker theme={theme} initialColor={'#0261FF'}>Border</ColorPicker>
                    <ColorPicker theme={theme} initialColor={'#B5D1FF'}>Background</ColorPicker>


                </div>
            </div>
        );
    }
}
DesignComponent.defaultProps = {
    doneLabel: 'Add Now',
    cancelLabel: 'Cancel',
};

export default DesignComponent;