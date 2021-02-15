(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{150:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=i.a.createContext({}),p=function(e){var t=i.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=p(e.components);return i.a.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},m=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),b=p(n),m=r,d=b["".concat(o,".").concat(m)]||b[m]||s[m]||a;return n?i.a.createElement(d,c(c({ref:t},u),{},{components:n})):i.a.createElement(d,c({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var u=2;u<a;u++)o[u]=n[u];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},94:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return p}));var r=n(3),i=n(7),a=(n(0),n(150)),o={id:"plugin_structure",title:"Plugin Structure",sidebar_label:"Plugin Structure"},c={unversionedId:"dev/plugin_structure",id:"dev/plugin_structure",isDocsHomePage:!1,title:"Plugin Structure",description:"Requirements",source:"@site/docs/dev/plugin.md",slug:"/dev/plugin_structure",permalink:"/ricos/docs/dev/plugin_structure",version:"current",sidebar_label:"Plugin Structure",sidebar:"dev",previous:{title:"Bundle analyzer",permalink:"/ricos/docs/dev/bundle_analyzer"},next:{title:"Plugin Theming",permalink:"/ricos/docs/dev/theming"}},l=[{value:"Requirements",id:"requirements",children:[]},{value:"Example",id:"example",children:[]}],u={toc:l};function p(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"requirements"},"Requirements"),Object(a.b)("p",null,"Each plugin should have 2 entry points for the Wrapper:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"viewer.js")," for the ",Object(a.b)("inlineCode",{parentName:"li"},"RichContentViewer")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"editor.js")," for the ",Object(a.b)("inlineCode",{parentName:"li"},"RichContentEditor"))),Object(a.b)("p",null,"For your own convenience: ",Object(a.b)("inlineCode",{parentName:"p"},"npm run generatePlugin")," creates those files for you by default."),Object(a.b)("p",null,"Each entry should export a function that generates the plugin's necessities in order to work: one for the viewer, and one for the editor."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"The Editor entry object must contain:",Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"config")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"type")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"createPlugin")))),Object(a.b)("li",{parentName:"ul"},"The Viewer entry must contain:",Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"config")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"type"))))),Object(a.b)("h2",{id:"example"},"Example"),Object(a.b)("p",null,"Editor entry for ",Object(a.b)("strong",{parentName:"p"},"Hashtag")," plugin (29.03.2020):"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"import { createHashtagPlugin } from './createHashtagPlugin';\nimport { HASHTAG_TYPE } from './types';\nimport { DEFAULTS, THEME as theme } from './defaults';\n\nexport const pluginHashtag = (config = {}) => {\n  return {\n    config: { ...DEFAULTS.config, ...config },\n    type: HASHTAG_TYPE,\n    createPlugin: createHashtagPlugin,\n    ModalsMap: {},\n    theme,\n  };\n};\n")))}p.isMDXComponent=!0}}]);