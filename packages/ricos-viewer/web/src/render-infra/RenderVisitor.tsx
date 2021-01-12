import React from 'react';
import { renderToString } from 'react-dom/server';
import { RicosNode } from 'ricos-schema';
import { ViewBuilder } from './ViewBuilder';
import { elementMappers, ElementMapper } from './element-mappers';

function nodeToHTML(elementMapper: ElementMapper, node: RicosNode) {
  let innerHtml = '';
  if (node.nodes.length > 0) {
    innerHtml += node.nodes.map(n => nodeToHTML(elementMappers[n.type], n)).join('');
  }
  return elementMapper({ innerHtml, node });
}

export class RenderVisitor {
  builder: ViewBuilder;

  constructor(builder: ViewBuilder) {
    this.builder = builder;
  }

  renderHtml() {
    return (node: RicosNode) => {
      const html = nodeToHTML(elementMappers[node.type], node);
      this.builder.appendHtml(html);
    };
  }

  renderStaticComponent(type: string, Component: React.Component) {
    return (node: RicosNode) => {
      const html = renderToString(<Component {...node[type]} />);
      this.builder.appendHtml(html);
    };
  }

  renderReactComponent(type: string, Component: React.Component) {
    return (node: RicosNode) => {
      this.builder.addReactNode(<Component {...node[type]} />);
    };
  }

  getView() {
    return this.builder.getView();
  }
}
