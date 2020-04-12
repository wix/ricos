import React from 'react';
import EngineWrapper from './EngineWrapper';
import themeStrategy from './themeStrategy/themeStrategy';
import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import localeStrategy from './localeStrategy/localeStrategy';
import PropTypes from 'prop-types';
import './styles.global.css';
import { merge } from 'lodash';

export default class RichContentWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localeStrategy: {},
    };
  }

  updateLocale = async () => {
    const { locale, children } = this.props;
    await localeStrategy(children.props.locale || locale).then(localeData => {
      this.setState({ localeStrategy: localeData });
    });
  };

  componentDidMount() {
    this.updateLocale();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.locale !== this.props.locale) {
      this.updateLocale();
    }
  }

  render() {
    const { theme, palette, plugins = [], children, editor = false, rcProps, ...rest } = this.props;
    const { localeStrategy } = this.state;
    const themeGenerators = plugins.filter(plugin => !!plugin.theme).map(plugin => plugin.theme);

    const mergedRCProps = merge(
      pluginsStrategy(editor, plugins, children.props),
      themeStrategy(editor, { theme, palette, themeGenerators }),
      localeStrategy,
      rcProps
    );

    return (
      <EngineWrapper
        rcProps={mergedRCProps}
        editor={editor}
        key={editor ? 'editor' : 'viewer'}
        {...rest}
      >
        {children}
      </EngineWrapper>
    );
  }
}
RichContentWrapper.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  locale: PropTypes.string,
  palette: PropTypes.array,
  plugins: PropTypes.arrayOf(PropTypes.object),
  strategies: PropTypes.arrayOf(PropTypes.func),
  editor: PropTypes.bool,
  rcProps: PropTypes.object,
};

RichContentWrapper.defaultProps = {
  locale: 'en',
};
