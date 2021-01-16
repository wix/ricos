import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RicosViewer as RicosWrapper } from '../src/RicosViewer';
import RicosContentViewer from './RicosContentViewer';

export default class RicosViewer extends Component {
  render() {
    return (
      <RicosWrapper>
        <RicosContentViewer />
      </RicosWrapper>
    );
  }
}
