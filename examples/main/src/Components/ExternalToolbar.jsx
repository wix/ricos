import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withPluginButtons } from 'wix-rich-content-editor';

class ExternalToolbar extends Component {
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    console.log('ExternalToolbar buttons: ', props.buttons);
  }

  componentWillReceiveProps(nextProps) {
    console.log('ExternalToolbar buttons: ', nextProps.buttons);
  }

  render() {
    const { buttons } = this.props;
    return (
      <div>
        {buttons.map(({ buttonType, icon: Icon, onClick, isDisabled = () => false, ...fileInputProps }) => {
          if (buttonType === 'button') {
            return (
              <button onClick={onClick} disabled={isDisabled()}>
                <Icon />
              </button>
            );
          }
        })}
      </div>
    );
  }
}

export default withPluginButtons(ExternalToolbar);
