import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MdClose, MdSettings } from 'react-icons/md';

export default class SectionHeader extends PureComponent {
  onHideClick = () => {
    this.props.onHide(this.props.title.replace(' ', ''), false);
  };

  render() {
    const { title, settings } = this.props;
    const hasSettings = !!settings.length;

    return (
      <div className="header">
        <div className="title">
          <MdClose onClick={this.onHideClick} />
          <h3>{title}</h3>
        </div>
        {hasSettings && (
          <div className="settings">
            <MdSettings />
            <div className="dropdown">
              <ul>
                {settings.map(({ name, action }) => (
                  <li key={`${title}-settings-${name}`} onClick={action}>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

SectionHeader.propTypes = {
  title: PropTypes.string,
  settings: PropTypes.array,
  onHide: PropTypes.func,
};

SectionHeader.defaultProps = {
  settings: [],
};
