import React, { Component, ReactElement } from 'react';
import EngineWrapper from './EngineWrapper';
import themeStrategy from './themeStrategy/themeStrategy';
import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import localeStrategy from './localeStrategy/localeStrategy';
import './styles.global.css';
import { merge } from 'lodash';
import { EditorState } from 'draft-js';
import PropTypes from 'prop-types';

interface RichContentProps {
  locale?: string;
  localeResource?: object;
  placeholder?: string;
  editorKey?: string;
  onChange?(editorState: EditorState): void;
  initialState?: { blocks: object[]; entityMap: { [index: number]: object } };
  theme?: object;
  config?: object;
  plugins?: (config?: string) => { config: object; type: string; [propName: string]: any }[];
  ModalsMap?: { [propName: string]: Component };
  helpers?: { [propName: string]: (...args: any[]) => any };
}

interface RichContentWrapperProps {
  children: ReactElement;
  theme: string | object;
  locale: string;
  palette: object[];
  plugins: ({ config: object; type: string; theme?: (color: object) => object } & (
    | { createPlugin: (config?: object) => any; ModalsMap: object }
    | { typeMapper: () => object }
  ))[];
  editor: boolean;
  rcProps: RichContentProps;
}

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

  static propTypes = { children: PropTypes.element.isRequired, good: PropTypes.string.isRequired };

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

    const themeGenerators = plugins.filter(plugin => !!plugin.theme).map(plugin => plugin.theme);

    const mergedRCProps = merge(
      pluginsStrategy(editor, plugins, children?.props),
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
