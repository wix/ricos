import React, { Component } from 'react';
import EngineWrapper from './EngineWrapper';
import themeStrategy from './themeStrategy/themeStrategy';
import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import localeStrategy from './localeStrategy/localeStrategy';
import './styles.global.css';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { isDefined } from 'ts-is-present';
import { RichContentProps, RichContentWrapperProps } from './RichContentWrapperTypes';

export default class RichContentWrapper extends Component<
  RichContentWrapperProps,
  { localeStrategy: RichContentProps }
> {
  constructor(props: RichContentWrapperProps) {
    super(props);
    this.state = {
      localeStrategy: {},
    };
  }

  static propTypes = { children: PropTypes.element.isRequired };

  static defaultProps = { locale: 'en' };

  updateLocale = async () => {
    const { locale, children } = this.props;
    await localeStrategy(children?.props.locale || locale).then(localeData => {
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

    const themeGenerators: ThemeGeneratorFunction[] = plugins
      .map(plugin => plugin.theme)
      .filter(isDefined);

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
