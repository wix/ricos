import React from 'react';
import EngineWrapper from './EngineWrapper';
import themeStrategyProvider from './themeStrategy/themeStrategyProvider';
import pluginsStrategyProvider from './pluginsStrategy/pluginsStrategyProvider';
import localeStrategyProvider from './localeStrategy/localeStrategyProvider';
import PropTypes from 'prop-types';
import './styles.global.css';

export default class RichContentWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localeStrategy: () => ({}),
    };
  }

  updateLocale = async () => {
    const { locale, children } = this.props;
    await localeStrategyProvider({ locale })(children.props).then(localeData => {
      this.setState({ localeStrategy: () => localeData });
    });
  };

  componentDidMount() {
    this.updateLocale();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.locale !== this.props.locale) this.updateLocale();
  }

  render() {
    const {
      strategies = [],
      theme,
      palette,
      plugins = [],
      children,
      editor = false,
      ...rest
    } = this.props;
    const { localeStrategy } = this.state;
    const themeGenerators = plugins.filter(plugin => !!plugin.theme).map(plugin => plugin.theme);
    const mergedStrategies = [
      themeStrategyProvider(editor, { theme, palette, themeGenerators }),
      pluginsStrategyProvider(editor, { plugins }),
      localeStrategy,
      ...strategies,
    ];

    return (
      <EngineWrapper strategies={mergedStrategies} {...rest} editor={editor}>
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
};

RichContentWrapper.defaultProps = {
  locale: 'en',
};
