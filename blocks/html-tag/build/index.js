!function(){"use strict";var e,t={85:function(){var e=window.wp.blocks,t=window.wp.element,n=window.wp.primitives,r=(0,t.createElement)(n.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,t.createElement)(n.Path,{d:"M20.8 10.7l-4.3-4.3-1.1 1.1 4.3 4.3c.1.1.1.3 0 .4l-4.3 4.3 1.1 1.1 4.3-4.3c.7-.8.7-1.9 0-2.6zM4.2 11.8l4.3-4.3-1-1-4.3 4.3c-.7.7-.7 1.8 0 2.5l4.3 4.3 1.1-1.1-4.3-4.3c-.2-.1-.2-.3-.1-.4z"})),o=window.wp.blockEditor,l=window.wp.i18n,a=window.wp.components,c=function(e){let{attributes:n}=e;const{tagName:r}=n;return(0,t.createElement)(o.InspectorControls,null,(0,t.createElement)(a.Panel,null,(0,t.createElement)(a.PanelBody,null,(0,t.createElement)("strong",null,(0,l.__)("Tag Name","savvy-blocks"),":"),(0,t.createElement)("span",null," ",r))))};function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s.apply(this,arguments)}(0,e.registerBlockType)("savvy-blocks/html-tag",{edit:e=>{const{attributes:{tagName:n}}=e,r=n,l=(0,o.useBlockProps)({className:"savvy-html-tag"});return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(c,e),(0,t.createElement)(r,l,(0,t.createElement)(o.InnerBlocks,null)))},save:e=>{const{attributes:{tagName:n,htmlAttributes:r}}=e,l=n,a=o.useBlockProps.save({className:"savvy-html-tag"});return(0,t.createElement)(l,s({},a,r),(0,t.createElement)(o.InnerBlocks.Content,null))},icon:{foreground:"#af5bfd",src:r}})}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var l=n[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=function(t,n,o,l){if(!n){var a=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],l=e[u][2];for(var c=!0,s=0;s<n.length;s++)(!1&l||a>=l)&&Object.keys(r.O).every((function(e){return r.O[e](n[s])}))?n.splice(s--,1):(c=!1,l<a&&(a=l));if(c){e.splice(u--,1);var i=o();void 0!==i&&(t=i)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[n,o,l]},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,l,a=n[0],c=n[1],s=n[2],i=0;if(a.some((function(t){return 0!==e[t]}))){for(o in c)r.o(c,o)&&(r.m[o]=c[o]);if(s)var u=s(r)}for(t&&t(n);i<a.length;i++)l=a[i],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(u)},n=self.webpackChunksavvy_blocks=self.webpackChunksavvy_blocks||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var o=r.O(void 0,[431],(function(){return r(85)}));o=r.O(o)}();