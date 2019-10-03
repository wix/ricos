// import React from 'react';
// import { hydrate } from 'react-dom';
// import Editor from '../../../../examples/main/shared/editor/Editor.jsx';
// import './app.css';

// const props = {
//   initialState: window.__CONTENT_STATE__,
//   isMobile: window.isMobile,
//   locale: window.locale,
// };
// const app = (
//   <>
//     Editor
//     <Editor {...props} />
//   </>
// );

// hydrate(app, document.getElementById('root'));

import { hydrate } from 'react-dom';
import React from 'react';
import RichContentApp from '../../../../examples/main/shared/RichContentApp.jsx';
import './app.css';
// import Editor from '../../../../examples/main/shared/editor/Editor.jsx';
// const props = {
//   initialState: window.__CONTENT_STATE__,
//   isMobile: window.isMobile,
//   locale: window.locale,
// };

export const app = (
  <>
    {/* <RichContentApp mode={'test'} {...props}/> */}
    <RichContentApp mode={'test'} />

  </>
);
hydrate(app, document.getElementById('root'));
