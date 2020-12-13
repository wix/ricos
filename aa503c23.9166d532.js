(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{91:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return r})),a.d(t,"rightToc",(function(){return o})),a.d(t,"default",(function(){return l}));var n=a(3),i=a(7),b=(a(0),a(127)),c={id:"v7-to-v8",title:"Migrating to Version 8",sidebar_label:"v.7 => v.8"},r={unversionedId:"ricos/migrations/v7-to-v8",id:"ricos/migrations/v7-to-v8",isDocsHomePage:!1,title:"Migrating to Version 8",description:"plugin-commons separation",source:"@site/docs/ricos/migrations/migrating-to-v8.mdx",slug:"/ricos/migrations/v7-to-v8",permalink:"/rich-content/docs/ricos/migrations/v7-to-v8",version:"current",sidebar_label:"v.7 => v.8",sidebar:"ricos",previous:{title:"Preview",permalink:"/rich-content/docs/ricos/preview"},next:{title:"Migrating to Version 7",permalink:"/rich-content/docs/ricos/migrations/v6-to-v7"}},o=[{value:"plugin-commons separation",id:"plugin-commons-separation",children:[]},{value:"Theme",id:"theme",children:[{value:"<code>createTheme()</code> is removed",id:"createtheme-is-removed",children:[]},{value:"Design Updates",id:"design-updates",children:[]}]}],s={rightToc:o};function l(e){var t=e.components,a=Object(i.a)(e,["components"]);return Object(b.b)("wrapper",Object(n.a)({},s,a,{components:t,mdxType:"MDXLayout"}),Object(b.b)("h2",{id:"plugin-commons-separation"},"plugin-commons separation"),Object(b.b)("p",null,"The ",Object(b.b)("inlineCode",{parentName:"p"},"wix-rich-content-editor-common")," package size has been significantly reduced -- all the plugin-related stuff now resides in a separate ",Object(b.b)("inlineCode",{parentName:"p"},"wix-rich-content-plugin-commons")," package."),Object(b.b)("p",null,"The change is ",Object(b.b)("em",{parentName:"p"},"almost")," internal, except just the one drawback. It is now required to import ",Object(b.b)("inlineCode",{parentName:"p"},"plugin-commons")," styles:"),Object(b.b)("p",null,"either in JS:"),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"import 'wix-rich-content-plugin-commons/dist/styles.min.css';\n")),Object(b.b)("p",null,"or in CSS:"),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-css"}),"@import '~wix-rich-content-plugin-commons/dist/styles.min.css';\n")),Object(b.b)("h2",{id:"theme"},"Theme"),Object(b.b)("h3",{id:"createtheme-is-removed"},Object(b.b)("inlineCode",{parentName:"h3"},"createTheme()")," is removed"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"Please remove any calls for ",Object(b.b)("inlineCode",{parentName:"li"},"createTheme")," as those will no longer work"),Object(b.b)("li",{parentName:"ul"},"In addition, you can safely remove ",Object(b.b)("inlineCode",{parentName:"li"},"ricos-theme")," from your ",Object(b.b)("inlineCode",{parentName:"li"},"package.json")," as it is also no longer in use")),Object(b.b)("h4",{id:"before"},"Before"),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-tsx"}),"import { createTheme } from 'ricos-theme';\n//...\n<RicosEditor theme={createTheme({ palette, parentClass })} />;\n")),Object(b.b)("h4",{id:"after"},"After"),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-tsx"}),"<RicosEditor theme={{ palette, parentClass }} />\n")),Object(b.b)("hr",null),Object(b.b)("h3",{id:"design-updates"},"Design Updates"),Object(b.b)("p",null,"(relevant to ",Object(b.b)("inlineCode",{parentName:"p"},"cssOverride")," / legacy ",Object(b.b)("inlineCode",{parentName:"p"},"theme")," prop)"),Object(b.b)("p",null,"If you're overriding styles, make sure your CSS files are aligned with this version's updates."),Object(b.b)("p",null,"Listed below are the major style changes.\nIf you face conflicts related to other changes that aren't listed here, you can check the ",Object(b.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/wix-incubator/rich-content/pull/1607/files?file-filters%5B%5D=.scss"}),"the rest of the .scss differences here"),"."),Object(b.b)("h4",{id:"plugin-mentions"},Object(b.b)("inlineCode",{parentName:"h4"},"plugin-mentions")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Before"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"After"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("img",{width:"260",alt:"Screen Shot 2020-10-04 at 17 35 55",src:"https://user-images.githubusercontent.com/22775305/95095237-79048d00-0733-11eb-899a-d887a784a2a5.png"})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("img",{width:"251",alt:"Screen Shot 2020-10-04 at 17 35 55",src:"https://user-images.githubusercontent.com/22775305/95095355-9f2a2d00-0733-11eb-9287-a07f867e2e74.png"}))))),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/wix-incubator/rich-content/blob/master/packages/plugin-mentions/web/statics/mentions.scss"}),"mentions.scss"))),Object(b.b)("hr",null),Object(b.b)("h4",{id:"inline-toolbar"},Object(b.b)("inlineCode",{parentName:"h4"},"Inline Toolbar")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Before"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"After"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("img",{width:"614",alt:"Screen Shot 2020-10-04 at 17 36 17 3",src:"https://user-images.githubusercontent.com/22775305/95096162-98e88080-0734-11eb-8113-47da9d5b37df.png"})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("img",{width:"623",alt:"Screen Shot 2020-10-04 at 17 36 17 2",src:"https://user-images.githubusercontent.com/22775305/95096165-9a19ad80-0734-11eb-9dea-e516aaa62b11.png"}))))),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/wix-incubator/rich-content/blob/master/packages/editor-common/web/statics/styles/inline-toolbar-button.scss"}),"inline-toolbar-button.scss")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/wix-incubator/rich-content/blob/master/packages/editor/web/statics/styles/inline-toolbar-dropdown-button.scss"}),"inline-toolbar-dropdown-button.scss"))),Object(b.b)("hr",null),Object(b.b)("h4",{id:"plugin-toolbar"},Object(b.b)("inlineCode",{parentName:"h4"},"Plugin Toolbar")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"Before"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"After"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("img",{width:"480",alt:"Screen Shot 2020-10-04 at 17 31 48 3",src:"https://user-images.githubusercontent.com/22775305/95100351-af450b00-0739-11eb-82ee-02e6181060b3.png"})),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(b.b)("img",{width:"480",alt:"Screen Shot 2020-10-04 at 17 31 48 2",src:"https://user-images.githubusercontent.com/22775305/95100360-b0763800-0739-11eb-9177-43126c878d76.png"}))))),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/wix-incubator/rich-content/blob/master/packages/plugin-commons/web/statics/styles/plugin-toolbar.scss"}),"plugin-toolbar.scss")),Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/wix-incubator/rich-content/blob/master/packages/plugin-commons/web/statics/styles/plugin-toolbar-button.scss"}),"plugin-toolbar-button.scss"))))}l.isMDXComponent=!0}}]);