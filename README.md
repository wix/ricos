# Wix Rich Content
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

#### A super charged rich text editor with an extensible plugin system.

## Bootstrap
1. `cd rich-content`
2. `npm i` - installs all dependencies and links any cross-dependencies.
3. Build the modules by running one of the following:
    1. `npm run build` - build once
    2. `npm run watch` - rebuild on changes
4. Choose an example and run `npm start`.


## Modules


[wix-rich-content-editor](https://github.com/wix-incubator/rich-content/tree/master/packages/editor) is the rich content editor React Component.  
[wix-rich-content-common](https://github.com/wix-incubator/rich-content/tree/master/pacakges/common) is a shared library utilized by the rest of the modules.  
[config](https://github.com/wix-incubator/rich-content/tree/master/config) build config for rich-content-common and all plugins.  

##### Plugins

[wix-rich-content-plugin-link](https://github.com/wix-incubator/rich-content/tree/master/pacakges/plugin-link) convert plain text URLs into `<a>` tags.  
[wix-rich-content-plugin-hashtag](https://github.com/wix-incubator/rich-content/tree/master/pacakges/plugin-hashtag) convert plain text #hastags into dynamic elements.  
[wix-rich-content-plugin-emoji](https://github.com/wix-incubator/rich-content/tree/master/pacakges/plugin-emoji) add emojis to your content.  
[wix-rich-content-plugin-image](https://github.com/wix-incubator/rich-content/tree/master/pacakges/plugin-image) add images to your content.  
[wix-rich-content-plugin-video](https://github.com/wix-incubator/rich-content/tree/master/pacakges/plugin-video) add videos to your content.  
[wix-rich-content-plugin-gallery](https://github.com/wix-incubator/rich-content/tree/master/pacakges/plugin-gallery) add pro galleries to your content!!!  
[wix-rich-content-plugin-html](https://github.com/wix-incubator/rich-content/tree/master/pacakges/plugin-html) embed html code or sites in your content.  
[wix-rich-content-plugin-divider](https://github.com/wix-incubator/rich-content/tree/master/pacakges/plugin-divider) add dividers to your content.  

##### Examples
[rich-content-editor-example](https://github.com/wix-incubator/rich-content/tree/master/pacakges/editor-example) to see how to consume the Component as an editor.  
[rich-content-viewer-example](https://github.com/wix-incubator/rich-content/tree/master/pacakges/viewer-example) to see how to consume the Component as a viewer.  
[rich-content-editor-tpa](https://github.com/wix-incubator/rich-content/tree/master/pacakges/editor-tpa) to see how to consume the Component as an editor within a Wix Third Party Application.  