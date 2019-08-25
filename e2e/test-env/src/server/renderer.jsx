import React from 'react';
import { renderToString } from 'react-dom/server';
import Editor from '../shared/components/Editor';
import Viewer from '../shared/components/Viewer';

const COMPONENTS = {
  rce: {
    Components: [Editor],
    bundleName: 'editor',
  },
  combined: {
    Components: [Editor, Viewer],
    bundleName: 'combined',
  },
};

export default function renderer() {
  return (req, res) => {
    const [componentId, fixtureName = 'empty'] = req.path.replace(/^\/|\/$/g, '').split('/');
    const isMobile = req.query.mobile === '';
    const locale = req.query.he === '' ? 'he' : 'en';
    const { Components, bundleName } = COMPONENTS[componentId] || {};
    const props = { initialState: null, isMobile, locale };

    if (!Components) {
      return res.status(404).send(`Component for ${componentId} not found`);
    }

    try {
      props.initialState = require(`../../../tests/fixtures/${fixtureName}.json`);
    } catch (error) {
      console.log(error);
      return res.status(404).send(`Fixture ${fixtureName} not found`);
    }

    res.render('index', {
      html: renderToString(
        <>
          {Components.map((Comp, i) => (
            <Comp key={i} {...props} />
          ))}
        </>
      ),
      initialState: props.initialState,
      bundleName,
      isMobile,
    });
  };
}
