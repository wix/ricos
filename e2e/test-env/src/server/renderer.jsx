import React from 'react';
import { renderToString } from 'react-dom/server';
import RichContentApp from '../../../../examples/main/shared/RichContentApp';

export default function renderer() {
  return (req, res) => {
    const [componentId, fixtureName = 'empty'] = req.path.replace(/^\/|\/$/g, '').split('/');
    if (componentId !== 'rce') {
      return res.status(404).send(`Component for ${componentId} not found`);
    }

    const isMobile = req.query.mobile === '';
    const locale = req.query.hebrew === '' ? 'he' : 'en';
    const seoMode = req.query.seoMode === '';
    const props = { isMobile, locale, seoMode };

    try {
      props.initialState = require(`../../../tests/fixtures/${fixtureName}.json`);
    } catch (error) {
      console.log(error);
      return res.status(404).send(`Fixture ${fixtureName} not found`);
    }

    res.render('index', {
      html: renderToString(<RichContentApp mode={'test'} {...props} />),
      initialState: props.initialState,
      bundleName: 'index',
      isMobile,
      locale,
    });
  };
}
