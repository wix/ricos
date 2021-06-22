(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{159:function(t,e,n){"use strict";n.d(e,"a",(function(){return m})),n.d(e,"b",(function(){return u}));var o=n(0),r=n.n(o);function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,o,r=function(t,e){if(null==t)return{};var n,o,r={},c=Object.keys(t);for(o=0;o<c.length;o++)n=c[o],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(o=0;o<c.length;o++)n=c[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var s=r.a.createContext({}),p=function(t){var e=r.a.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):a(a({},e),t)),n},m=function(t){var e=p(t.components);return r.a.createElement(s.Provider,{value:e},t.children)},b={inlineCode:"code",wrapper:function(t){var e=t.children;return r.a.createElement(r.a.Fragment,{},e)}},d=r.a.forwardRef((function(t,e){var n=t.components,o=t.mdxType,c=t.originalType,i=t.parentName,s=l(t,["components","mdxType","originalType","parentName"]),m=p(n),d=o,u=m["".concat(i,".").concat(d)]||m[d]||b[d]||c;return n?r.a.createElement(u,a(a({ref:e},s),{},{components:n})):r.a.createElement(u,a({ref:e},s))}));function u(t,e){var n=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var c=n.length,i=new Array(c);i[0]=d;var a={};for(var l in e)hasOwnProperty.call(e,l)&&(a[l]=e[l]);a.originalType=t,a.mdxType="string"==typeof t?t:o,i[1]=a;for(var s=2;s<c;s++)i[s]=n[s];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},86:function(t,e,n){"use strict";n.r(e),n.d(e,"frontMatter",(function(){return i})),n.d(e,"metadata",(function(){return a})),n.d(e,"toc",(function(){return l})),n.d(e,"default",(function(){return p}));var o=n(3),r=n(7),c=(n(0),n(159)),i={id:"converters",title:"Content Converters",sidebar_label:"Content Converters"},a={unversionedId:"content_api/converters",id:"content_api/converters",isDocsHomePage:!1,title:"Content Converters",description:"Draft.js",source:"@site/docs/content_api/Converters.mdx",slug:"/content_api/converters",permalink:"/docs/content_api/converters",editUrl:"https://github.com/wix/ricos/edit/master/website/docs/content_api/Converters.mdx",version:"current",sidebar_label:"Content Converters",sidebar:"api",previous:{title:"Truncate Content",permalink:"/docs/content_api/TruncateContent"},next:{title:"Extract Media",permalink:"/docs/content_api/extract_media"}},l=[{value:"Draft.js",id:"draftjs",children:[]},{value:"Plain Text",id:"plain-text",children:[{value:"Plain text to rich content",id:"plain-text-to-rich-content",children:[]},{value:"Rich content to plain text",id:"rich-content-to-plain-text",children:[]}]},{value:"HTML",id:"html",children:[{value:"HTML to rich content",id:"html-to-rich-content",children:[]},{value:"Rich content to plain text",id:"rich-content-to-plain-text-1",children:[]}]},{value:"Tiptap",id:"tiptap",children:[{value:"HTML to rich content",id:"html-to-rich-content-1",children:[]},{value:"Rich content to plain text",id:"rich-content-to-plain-text-2",children:[]}]}],s={toc:l};function p(t){var e=t.components,n=Object(r.a)(t,["components"]);return Object(c.b)("wrapper",Object(o.a)({},s,n,{components:e,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:"draftjs"},"Draft.js"),Object(c.b)("p",null,"Ricos is in the preparation phase of migrating from a ",Object(c.b)("a",{parentName:"p",href:"https://draftjs.org"},"draft-js")," based content to our new ",Object(c.b)("a",{parentName:"p",href:"https://github.com/wix/ricos/tree/master/packages/ricos-schema/web"},"Ricos")," schema. To support this we provide conversion functions to & from draft."),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"fromDraft: (content: DraftContent) => RichContent;\ntoDraft: (content: RichContent) => DraftContent;\nensureRicosContent: (content: RichContent | DraftContent) => RichContent;\nensureDraftContent: (content: RichContent | DraftContent) => DraftContent;\n")),Object(c.b)("h4",{id:"example"},"Example"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"import { fromDraft, toDraft } from 'ricos-content/libs/migrateSchema';\nimport { RichContent } from 'ricos-schema';\nimport { RicosEditor, DraftContent } from 'ricos-editor';\nimport ricosContent from './ricosContent.json';\n\nconst draftContent: DraftContent = toDraft(ricosContent);\n\nconst onChange = (content: DraftContent) => publishContent(fromDraft(content));\n\n<RicosEditor content={draftContent} onChange={onChange} />;\n")),Object(c.b)("h2",{id:"plain-text"},"Plain Text"),Object(c.b)("p",null,"Ricos is a rich text & rich content editor. The following functions allow converting between plain text and rich content."),Object(c.b)("h3",{id:"plain-text-to-rich-content"},"Plain text to rich content"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"fromPlainText: (text: string) => RichContent;\n")),Object(c.b)("h4",{id:"example-1"},"Example"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"import { toDraft } from 'ricos-content/libs/migrateSchema';\nimport { fromPlainText } from 'ricos-content/libs/fromPlainText';\nimport { RichContent } from 'ricos-schema';\nimport { RicosEditor, DraftContent } from 'ricos-editor';\n\nconst TEXT = 'Hello there!';\n\nconst content: RichContent = fromPlainText(TEXT);\nconst draftContent: DraftContent = toDraft(content);\n\n<RicosEditor content={draftContent} />;\n")),Object(c.b)("h3",{id:"rich-content-to-plain-text"},"Rich content to plain text"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"toPlainText: (content: RichContent, options?: {\n  urlShortener?: (url: string) => Promise<string>;\n  getVideoUrl?: (fileId: string) => Promise<string>;\n}) => Promise<string>;\n")),Object(c.b)("h4",{id:"urlshortener"},"urlShortener"),Object(c.b)("p",null,"This function will be called on image source URLs and can be used with URL shortener services."),Object(c.b)("h4",{id:"getvideourl"},"getVideoUrl"),Object(c.b)("p",null,"Used to resolve a ",Object(c.b)("inlineCode",{parentName:"p"},"VideoSource")," object into an absolute URL.",Object(c.b)("br",null),"\nDefaults to ",Object(c.b)("inlineCode",{parentName:"p"},"src => https://video.wixstatic.com/${src.pathname}")),Object(c.b)("h4",{id:"example-2"},"Example"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"import { toPlainText } from 'ricos-content/libs/toPlainText';\nimport ricosContent from './ricosCotnent.json';\n\nconst text: string = toPlainText(ricosContent);\n\nconsole.log(text);\n")),Object(c.b)("h2",{id:"html"},"HTML"),Object(c.b)("p",null,"The following functions allow converting rich content to and from HTML."),Object(c.b)("p",null,"Supporting:"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},"Headings"),Object(c.b)("li",{parentName:"ul"},"Bold"),Object(c.b)("li",{parentName:"ul"},"Italic"),Object(c.b)("li",{parentName:"ul"},"Links"),Object(c.b)("li",{parentName:"ul"},"Lists"),Object(c.b)("li",{parentName:"ul"},"Line break"),Object(c.b)("li",{parentName:"ul"},"Emojis")),Object(c.b)("h3",{id:"html-to-rich-content"},"HTML to rich content"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"fromHtml: (html: string) => RichContent;\n")),Object(c.b)("h4",{id:"example-3"},"Example"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"import { fromHtml } from 'ricos-content/libs/htmlConverters';\nimport { RichContent } from 'ricos-schema';\nimport { RicosEditor, DraftContent } from 'ricos-editor';\n\nconst HTML = '<p><strong>Bold</strong> <em>italic</em> <u>underline</u></p>';\n\nconst content: RichContent = fromHtml(HTML);\nconst draftContent: DraftContent = toDraft(content);\n\n<RicosEditor content={draftContent} />;\n")),Object(c.b)("h3",{id:"rich-content-to-plain-text-1"},"Rich content to plain text"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"toHtml: (content: RichContent) => string;\n")),Object(c.b)("h4",{id:"example-4"},"Example"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"import { toHtml } from 'ricos-content/libs/htmlConverters';\nimport ricosContent from './ricosCotnent.json';\n\nconst html: string = toHtml(ricosContent);\n\ndocument.body.innerHTML = html;\n")),Object(c.b)("h2",{id:"tiptap"},"Tiptap"),Object(c.b)("p",null,"The following functions allow converting rich content to and from Tiptap."),Object(c.b)("h3",{id:"html-to-rich-content-1"},"HTML to rich content"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"fromTiptap: (content: ProseContent) => RichContent;\nfromTiptap: (node: ProseContent) => Node; // Convert a single node\nfromTiptap: (data: Record<string, any>) => Record<string, any>; // Convert a node's data\n")),Object(c.b)("h4",{id:"example-5"},"Example"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"import { fromTiptap } from 'ricos-content/libs/converters';\nimport { RichContent } from 'ricos-schema';\nimport { RicosEditor, DraftContent } from 'ricos-editor';\nimport proseContent from './proseContent.json';\n\nconst content: RichContent = fromTiptap(proseContent);\nconst draftContent: DraftContent = toDraft(content);\n\n<RicosEditor content={draftContent} />;\n")),Object(c.b)("h3",{id:"rich-content-to-plain-text-2"},"Rich content to plain text"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"toTiptap: (content: RichContent) => ProseContent;\ntoTiptap: (node: Node) => ProseContent; // Convert a single node\ntoTiptap: (data: Record<string, any>) => Record<string, any>; // Convert a node's data\n")),Object(c.b)("h4",{id:"example-6"},"Example"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-tsx"},"import { toTiptap } from 'ricos-content/libs/converters';\nimport ricosContent from './ricosCotnent.json';\n\nconst content: ProseContent = toTiptap(ricosContent);\n")))}p.isMDXComponent=!0}}]);