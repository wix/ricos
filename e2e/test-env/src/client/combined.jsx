import { hydrate } from 'react-dom';
import React from 'react';
import RichContentApp from '../../../../examples/main/shared/RichContentApp.jsx';
import './app.css';

const app = <RichContentApp mode={'test'} />;
hydrate(app, document.getElementById('root'));
