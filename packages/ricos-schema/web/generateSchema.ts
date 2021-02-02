import { mkdirSync, readdirSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const GEN_DIR = 'build';
const TS_PROTO_DIR = '../../../node_modules/.bin/protoc-gen-ts_proto';

execSync(`rm -rf ${GEN_DIR}`);
mkdirSync(GEN_DIR);

const schemas = readdirSync('./schemas');

schemas.forEach(schema => {
  if (schema.endsWith('.proto')) {
    execSync(
      // eslint-disable-next-line max-len
      `protoc --plugin=${TS_PROTO_DIR} --proto_path schemas --ts_proto_opt=useOptionals=true,outputEncodeMethods=false,stringEnums=true,useDate=false --ts_proto_out=${GEN_DIR} schemas/${schema}`
    );
  }
});

writeFileSync(
  `${GEN_DIR}/index.ts`,
  `export {
    DeepPartial,
    protobufPackage,
    Common_DynamicStyles,
    Spoiler,
    Common_TextAlignment,
  } from './common';
  export * from './plugin_button';
  export * from './node_code';
  export * from './plugin_divider';
  export * from './plugin_file';
  export * from './plugin_gallery';
  export * from './plugin_giphy';
  export * from './node_heading';
  export * from './plugin_html';
  export * from './plugin_image';
  export * from './plugin_link_preview';
  export * from './plugin_map';
  export * from './node_paragraph';
  export * from './plugin_poll';
  export * from './plugin_sound_cloud';
  export * from './plugin_vertical_embed';
  export * from './plugin_video';
  export * from './decoration_anchor';
  export * from './decoration_color';
  export * from './decoration_link';
  export * from './decoration_mention';
  export * from './selection';
  export * from './rich_content';
  export * from './timestamp';  
`
);
