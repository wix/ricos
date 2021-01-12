import React from 'react';
import RicosFixture from '../../../../packages/ricos-content/web/src/migrateSchema/migratedFixtures/intro.json';
import { RichContentViewerBox, ContentState, Section, Page } from '../Components/StoryParts';
import RicosViewer from 'ricos-viewer/libs/RicosViewer';

const ReactAndStaticHtmlPOC = () => {
  /* what we want to achieve

<react>
  {...html}
  <comp>
  {...html}
  <comp>
  {...html}
</react>

toHTML should return array of mix html and react components

*/
  const Comp = () => <div>react!</div>;

  const test = [
    '<div>some html</div>',
    '<div>some html</div>',
    <Comp />,
    '<div>some more html</div>',
    <Comp />,
    '<div>some more html</div>',
  ];

  let test2 = [];
  let currentHtml = '';
  test.forEach(x => {
    if (typeof x === 'string') {
      currentHtml += x;
    } else {
      //flush
      if (currentHtml) {
        test2.push(currentHtml);
        currentHtml = '';
      }
      test2.push(x);
    }
  });
  //last flush
  if (currentHtml) {
    test2.push(currentHtml);
  }

  return test2.map(x => {
    if (typeof x === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: x }} />;
    } else {
      return x;
    }
  });
};

export default () => {
  return (
    <Page title="New Viewer">
      <Section title={'Viewer check'}>
        <RichContentViewerBox preset="blog-preset">
          <RicosViewer content={RicosFixture} />
        </RichContentViewerBox>
      </Section>
      <ReactAndStaticHtmlPOC />

      <Section title="Content State">
        <ContentState json={RicosFixture} />
      </Section>
    </Page>
  );
};
