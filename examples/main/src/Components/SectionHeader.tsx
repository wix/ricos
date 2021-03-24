import React, { PureComponent } from 'react';
import { MdClose, MdSettings, MdInvertColors } from 'react-icons/md';
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
                {settings.map(({ name, active, action, items, itemsType, getActive }) => (
                  <li
                    key={`${title}-settings-${name}`}
                    onClick={!items ? action : null}
                    className={!items && active ? 'active' : null}
                  >
                    <span>{name}</span>
                    {items && (
                      <ul>
                        {!itemsType ? (
                          items.map(item => (
                            <li
                              key={item}
                              onClick={() => action(item)}
                              className={item === active ? 'active' : null}
                            >
                              {item}
                            </li>
                          ))
                        ) : itemsType === 'experiments' ? (
                          <Experiments items={items} active={getActive()} action={action} />
                        ) : itemsType === 'palettes' ? (
                          <Palettes items={items} active={getActive()} action={action} />
                        ) : (
                          itemsType === 'fonts' && (
                            <Fonts items={items} active={getActive()} action={action} />
                          )
                        )}
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

const Experiments = ({ items, active, action }) =>
  items.map(({ name, scope, input = ['true', 'false'] }) => (
    <li key={name} className="experimentContainer">
      <div className="experiment">
        <div className="scope">{scope}</div>
        <div className="experimentTitle">{`specs.${scope}.${name}`}</div>
        <div className="options">
          {input.map(value => (
            <div
              className={`option ${active?.[name]?.value === value ? 'active' : null}`}
              onClick={() => action(name, value)}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </li>
  ));

const Palettes = ({ items, active, action }) =>
  items.map(({ bgColor, textColor, actionColor }, i) => (
    <li
      key={i}
      className={`paletteContainer ${active === i ? 'active' : null}`}
      onClick={() => action(i)}
    >
      <div className="actionColor" style={{ backgroundColor: actionColor }}>
        <MdInvertColors />
      </div>
      {i < 6 ? <div>Light Mode</div> : <div>Dark Mode</div>}
      <div className="palette">
        <div style={{ backgroundColor: bgColor }} />
        <div style={{ backgroundColor: textColor }} />
        <div style={{ backgroundColor: actionColor }} />
      </div>
    </li>
  ));

const Fonts = ({ items, active, action }) =>
  items.map(({ h2, p }, i) => (
    <li onClick={() => action(i)} key={i} className={`fontContainer ${active === i && 'active'}`}>
      <div>
        <span>H2: </span>
        <span style={{ fontFamily: h2.fontFamily }}>{h2.fontFamily} </span>
      </div>
      <div>
        <span>P: </span>
        <span style={{ fontFamily: p.fontFamily }}>{p.fontFamily} </span>
      </div>
    </li>
  ));
