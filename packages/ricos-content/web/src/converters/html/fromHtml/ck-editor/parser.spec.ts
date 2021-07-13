import { readFileSync } from 'fs';
import { toDraft } from '../../../draft/toDraft/toDraft';
import { Node_Type } from 'ricos-schema';
import { extract } from '../../../../RicosContentAPI/extract';
import parse from './parser';

const getHtml = filename => readFileSync(`${__dirname}/../__tests__/${filename}.html`, 'utf8');

describe('CKEditor parser', () => {
  const content = parse(getHtml('FAQContent'));
  it('iframe => video with youtube url', async () => {
    const videos = extract(content.nodes)
      .filter(({ type }) => type === Node_Type.VIDEO)
      .get();
    expect(videos.length).toEqual(1);
    expect(videos[0].videoData?.video?.src?.url).toEqual(
      'https://www.youtube.com/watch?v=4meDcOLeWSs'
    );
  });

  it('<a><img></a> => image with link', async () => {
    const images = extract(content.nodes)
      .filter(({ type }) => type === Node_Type.IMAGE)
      .get();
    expect(images.length).toEqual(5);
    expect(images[0].imageData?.image?.src?.url).toEqual(
      'https://static.wixstatic.com/media/23a20f14fc6d489d91b14aaa3033cd30.jpg'
    );
    expect(images[0].imageData?.link?.url).toEqual('javascript:void(0)'); // eslint-disable-line no-script-url
    expect(images[0].imageData?.link?.customData).toEqual(
      JSON.stringify({ method: 'navigateToPage', data: 'eihsd' })
    );
  });

  it('should output valid content for toDraft', () => {
    const content = getHtml('faq-no-nested-content');
    const rich = parse(content);
    console.log(JSON.stringify(rich, null, 2)); // eslint-disable-line no-console
    const draft = toDraft(rich);
    console.log(draft); // eslint-disable-line no-console
    expect(draft.blocks.length).toEqual(9);
    expect(Object.keys(draft.entityMap).length).toEqual(3);
  });
});
