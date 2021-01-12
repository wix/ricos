import React, { PureComponent } from 'react';
import { MdClose, MdSettings } from 'react-icons/md';
import { SectionSettings, OnVisibilityChanged } from '../types';

export default class SectionHeader extends PureComponent<{
  title?: string;
  settings: SectionSettings[];
  onHide: OnVisibilityChanged;
}> {
  static defaultProps = {
    settings: [],
  };

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
                {settings.map(({ name, active, action, items }) => (
                  <li
                    key={`${title}-settings-${name}`}
                    onClick={!items ? action : null}
                    className={!items && active ? 'active' : null}
                  >
                    <span>{name}</span>
                    {items && (
                      <ul>
                        {items.map(item => (
                          <li
                            key={item}
                            onClick={() => action(item)}
                            className={item === active ? 'active' : null}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
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
