webpackJsonp([1],{"/hm6":function(t,e){},0:function(t,e){},1:function(t,e){},G1q7:function(t,e){},JSlh:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("7+uW");document.addEventListener("DOMContentLoaded",function(){var t=document.querySelector("html"),e=window.innerWidth/10;e=e>50?50:e,t.style.fontSize=e+"px"});var s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var o=i("VU/8")({name:"App"},s,!1,function(t){i("/hm6")},null,null).exports,a=i("/ocq"),r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:"slide-down"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.ifShowTitleAndMenu,expression:"ifShowTitleAndMenu"}],staticClass:"title-wrapper"},[e("div",{staticClass:"left"},[e("span",{staticClass:"icon-arrow-left2 icon"})]),this._v(" "),e("div",{staticClass:"right"},[e("div",{staticClass:"icon-wrapper"},[e("span",{staticClass:"icon-cart icon"})]),this._v(" "),e("div",{staticClass:"icon-wrapper"},[e("span",{staticClass:"icon-user icon"})]),this._v(" "),e("div",{staticClass:"icon-wrapper"},[e("span",{staticClass:"icon-cog icon"})])])])])},staticRenderFns:[]};var c=i("VU/8")({props:["ifShowTitleAndMenu"]},r,!1,function(t){i("lc8j")},null,null).exports,l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"content"},[t.bookAvailable?i("div",{staticClass:"content_wrapper"},t._l(t.navigation.toc,function(e,n){return i("div",{key:n,staticClass:"content_item",on:{click:function(i){t.jumpTo(e.href)}}},[i("span",{staticClass:"text"},[t._v(t._s(e.label))])])})):i("div",{staticClass:"empty"},[t._v("加载中...")])])},staticRenderFns:[]};var h={props:["ifShowTitleAndMenu","fontSizeList","defaultFontSize","themeList","defaultTheme","bookAvailable","navigation"],components:{contentBar:i("VU/8")({props:["ifShowContent","navigation","bookAvailable"],methods:{jumpTo:function(t){this.$emit("jumpTo",t),this.$refs.MenuBar.hideContent()}}},l,!1,function(t){i("u8Uv")},"data-v-1d6130e4",null).exports},data:function(){return{ifSettingShow:!1,showTag:0,progress:0,ifShowContent:!1}},methods:{showSetting:function(t){this.showTag=t,3==t?(this.ifSettingShow=!1,this.ifShowContent=!0):this.ifSettingShow=!0},hideSetting:function(){this.ifSettingShow=!1},setFontSize:function(t){this.$emit("setFontSize",t)},setTheme:function(t){this.$emit("setTheme",t)},onProgressInput:function(t){this.progress=t,this.$refs.progress.style.backgroundSize=this.progress+" % 100"},onProgressChange:function(t){this.$emit("onProgressChange",t)},hideContent:function(){this.ifShowContent=!1},jumpTo:function(t){this.$emit("jumpTo",t)}}},u={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"menuBar"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.ifShowTitleAndMenu,expression:"ifShowTitleAndMenu"}],staticClass:"menu-wrapper",class:{hideBoxShadow:t.ifSettingShow||!t.ifShowTitleAndMenu}},[i("div",{staticClass:"icon-wrapper",on:{click:function(e){t.showSetting(3)}}},[i("span",{staticClass:"icon-menu icon"})]),t._v(" "),i("div",{staticClass:"icon-wrapper",on:{click:function(e){t.showSetting(2)}}},[i("span",{staticClass:"icon-equalizer icon"})]),t._v(" "),i("div",{staticClass:"icon-wrapper",on:{click:function(e){t.showSetting(1)}}},[i("span",{staticClass:"icon-sun icon"})]),t._v(" "),i("div",{staticClass:"icon-wrapper",on:{click:function(e){t.showSetting(0)}}},[i("span",{staticClass:"icon-folder-upload icon"})])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.ifSettingShow,expression:"ifSettingShow"}],staticClass:"setting_wrapper"},[0==t.showTag?i("div",{staticClass:"setting_font_size"},[i("div",{staticClass:"preview",style:{fontSize:t.fontSizeList[0].fontSize+"px"}},[t._v("A")]),t._v(" "),i("div",{staticClass:"select"},t._l(t.fontSizeList,function(e,n){return i("div",{key:n,staticClass:"select_wrapper",on:{click:function(i){t.setFontSize(e.fontSize)}}},[i("div",{staticClass:"line"}),t._v(" "),i("div",{staticClass:"point_wrapper"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.defaultFontSize===e.fontSize,expression:"defaultFontSize === item.fontSize"}],staticClass:"point"},[i("div",{staticClass:"small_point"})])]),t._v(" "),i("div",{staticClass:"line"})])})),t._v(" "),i("div",{staticClass:"preview",style:{fontSize:t.fontSizeList[t.fontSizeList.length-1].fontSize+"px"}},[t._v("A")])]):1===t.showTag?i("div",{staticClass:"setting_theme"},t._l(t.themeList,function(e,n){return i("div",{key:n,staticClass:"setting_theme_item",on:{click:function(e){t.setTheme(n)}}},[i("div",{staticClass:"preview",class:{no_border:"#fff"==e.style.body.background},style:{background:e.style.body.background}}),t._v(" "),i("div",{staticClass:"text",class:{selected:n==t.defaultTheme}},[t._v(t._s(e.name))])])})):2===t.showTag?i("div",{staticClass:"setting_progress"},[i("div",{staticClass:"progress_wrapper"},[i("input",{ref:"progress",staticClass:"progress",attrs:{type:"range",max:"100",min:"0",step:"1",disabled:!t.bookAvailable},domProps:{value:t.progress},on:{change:function(e){t.onProgressChange(e.target.value)},input:function(e){t.onProgressInput(e.target.value)}}})]),t._v(" "),i("div",{staticClass:"text_wrapper"},[i("span",[t._v(t._s(t.bookAvailable?t.progress+"%":"加载中..."))])])]):t._e()]),t._v(" "),i("contentBar",{directives:[{name:"show",rawName:"v-show",value:t.ifShowContent,expression:"ifShowContent"}],attrs:{ifShowContent:t.ifShowContent,navigation:t.navigation,bookAvailable:t.bookAvailable},on:{jumpTo:t.jumpTo}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.ifShowContent,expression:"ifShowContent"}],staticClass:"content_mask",on:{click:t.hideContent}})],1)},staticRenderFns:[]};var d=i("VU/8")(h,u,!1,function(t){i("JSlh")},null,null).exports,f=i("3+Zp"),v={data:function(){return{ifShowTitleAndMenu:!1,fontSizeList:[{fontSize:12},{fontSize:14},{fontSize:16},{fontSize:18},{fontSize:20},{fontSize:22},{fontSize:24}],defaultFontSize:16,themeList:[{name:"default",style:{body:{color:"#000",background:"#fff"}}},{name:"eye",style:{body:{color:"#000",background:"#ceeaba"}}},{name:"night",style:{body:{color:"#fff",background:"#000"}}},{name:"gold",style:{body:{color:"#000",background:"rgba(241,236,216)"}}}],defaultTheme:0,bookAvailable:!1,navigation:""}},components:{TitleBar:c,MenuBar:d},methods:{showEpub:function(){var t=this;this.book=new f.a("./static/66485.epub"),this.rendition=this.book.renderTo("read",{width:window.innerWidth,height:window.innerHeight}),this.rendition.display(),this.themes=this.rendition.themes,this.setFontSize(this.defaultFontSize),this.registerTheme(),this.setTheme(3),this.book.ready.then(function(){return t.navigation=t.book.navigation,t.book.locations.generate()}).then(function(e){t.locations=t.book.locations,t.bookAvailable=!0});var e=this;this.book.ready.then(function(){return e.navigation=e.book.navigation,e.book.locations.generate()}).then(function(t){e.locations=e.book.locations,e.bookAvailable=!0})},prevPage:function(){this.rendition&&this.rendition.prev()},nextPage:function(){this.rendition&&this.rendition.next()},toggleTitleAndMenu:function(){this.ifShowTitleAndMenu=!this.ifShowTitleAndMenu,this.ifShowTitleAndMenu||this.$refs.menuBar.hideSetting()},setFontSize:function(t){this.defaultFontSize=t,this.themes&&this.themes.fontSize(t+"px")},registerTheme:function(){var t=this;this.themeList.forEach(function(e){t.themes.register(e.name,e.style)})},setTheme:function(t){this.themes.select(this.themeList[t].name)},onProgressChange:function(t){var e=t/100,i=e>0?this.locations.cfiFromPercentage(e):0;this.rendition.display(i)},jumpTo:function(t){this.rendition.display(t),this.hideTitleAndMenu()},hideTitleAndMenu:function(){this.ifShowTitleAndMenu=!1,this.$refs.MenuBar.hideSetting(),this.$refs.MenuBar.hideContent()}},mounted:function(){this.showEpub()}},p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ebook"},[i("TitleBar",{attrs:{ifShowTitleAndMenu:t.ifShowTitleAndMenu}}),t._v(" "),i("div",{staticClass:"read-wrapper"},[i("div",{attrs:{id:"read"}}),t._v(" "),i("div",{staticClass:"mask"},[i("div",{staticClass:"left",on:{click:t.prevPage}}),t._v(" "),i("div",{staticClass:"center",on:{click:t.toggleTitleAndMenu}}),t._v(" "),i("div",{staticClass:"right",on:{click:t.nextPage}})])]),t._v(" "),i("MenuBar",{ref:"menuBar",attrs:{ifShowTitleAndMenu:t.ifShowTitleAndMenu,fontSizeList:t.fontSizeList,defaultFontSize:t.defaultFontSize,themeList:t.themeList,defaultTheme:t.defaultTheme,bookAvailable:t.bookAvailable,navigation:t.navigation},on:{setFontSize:t.setFontSize,setTheme:t.setTheme,onProgressChange:t.onProgressChange,jumpTo:t.jumpTo}})],1)},staticRenderFns:[]};var m=i("VU/8")(v,p,!1,function(t){i("cnau")},"data-v-3f4fa1ee",null).exports;n.a.use(a.a);var g=new a.a({routes:[{path:"/",redirect:"/ebook"},{path:"/ebook",component:m}]});i("jYjM"),i("G1q7");n.a.config.productionTip=!1,new n.a({el:"#app",router:g,components:{App:o},template:"<App/>"})},cnau:function(t,e){},jYjM:function(t,e){},lc8j:function(t,e){},u8Uv:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.1f8018612b459afa26b2.js.map