import React, { PureComponent, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Section as ResizerSection } from 'react-simple-resizer';
import { MdClose, MdSettings } from 'react-icons/md';
class Section extends PureComponent {
  onHideClick = () => {
    this.props.onHide(this.props.title.replace(' ', ''), false);
  };

  render() {
    const { title, fallback, settings, children, onHide, ...resizerSectionProps } = this.props;
    const hasSettings = !!settings.length;
    return (
      <ResizerSection className="section" {...resizerSectionProps}>
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
        <Suspense fallback={fallback}>
          <div className="content">{children}</div>
        </Suspense>
      </ResizerSection>
    );
  }
}

Section.propTypes = {
  title: PropTypes.string,
  fallback: PropTypes.element,
  onHide: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Section.defaultProps = {
  settings: [],
  minSize: 100,
  fallback: <div className="placeholder">Loading...</div>,
};

export default Section;
