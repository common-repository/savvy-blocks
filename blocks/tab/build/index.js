!function(){"use strict";var e,t={37:function(){var e=window.wp.blocks,t=window.wp.element,n=window.wp.i18n,r=window.wp.blockEditor,o=window.wp.data,l=window.wp.components,c=function(e){const{attributes:{tabLabel:o},setAttributes:c}=e;return(0,t.createElement)(r.InspectorControls,null,(0,t.createElement)(l.PanelBody,null,(0,t.createElement)(l.BaseControl,null,(0,t.createElement)(l.TextControl,{label:(0,n.__)("Label","savvy-blocks"),value:o,onChange:e=>c({tabLabel:e})}))))};(0,e.registerBlockType)("savvy-blocks/tab",{edit:e=>{const{attributes:{tabPaneId:n,isActive:l},setAttributes:a,clientId:s,isSelected:i}=e,{isSelectedOrChild:d,parentBlock:u,blockIndex:b,parentBlockId:k,isInserted:p}=(0,o.useSelect)((e=>{const t=e("core/block-editor").getBlockParents(s)[0];return{isSelectedOrChild:e("core/block-editor").hasSelectedInnerBlock(s),selectedInnerBlock:e("core/block-editor").hasSelectedInnerBlock(s)?e("core/block-editor").getSelectedBlockClientId():null,parentBlock:t,parentBlockAttributes:e("core/editor").getBlockAttributes(t),parentBlockId:e("core/editor").getBlockAttributes(t).blockId,blockIndex:e("core/block-editor").getBlockIndex(s),isInserted:e("core/block-editor").wasBlockJustInserted(s)}})),v=(0,r.useBlockProps)({className:["savvy-tab","tab-pane fade",i||d||!wp.data.select("core/block-editor").hasSelectedInnerBlock(u)&&l?"show":""].join(" ")});return(0,t.useEffect)((()=>{a({tabPaneId:k+"-"+b})}),[]),(0,t.createElement)(t.Fragment,null,(0,t.createElement)(c,e),(0,t.createElement)("div",{className:v.className,id:"tab-pane-"+n,role:"tabpanel"},(0,t.createElement)(r.InnerBlocks,{renderAppender:r.InnerBlocks.ButtosvlockAppender})))},save:e=>{const{attributes:{isActive:n,tabPaneId:o}}=e,l=r.useBlockProps.save({className:["savvy-tab","tab-pane fade",n?"active show":""].join(" ")});return(0,t.createElement)("div",{className:l.className,id:"tab-pane-"+o,role:"tabpanel"},(0,t.createElement)(r.InnerBlocks.Content,null))},icon:{foreground:"#af5bfd",src:"welcome-add-page"},parent:["savvy-blocks/tabs"]})}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var l=n[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=function(t,n,o,l){if(!n){var c=1/0;for(d=0;d<e.length;d++){n=e[d][0],o=e[d][1],l=e[d][2];for(var a=!0,s=0;s<n.length;s++)(!1&l||c>=l)&&Object.keys(r.O).every((function(e){return r.O[e](n[s])}))?n.splice(s--,1):(a=!1,l<c&&(c=l));if(a){e.splice(d--,1);var i=o();void 0!==i&&(t=i)}}return t}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[n,o,l]},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,l,c=n[0],a=n[1],s=n[2],i=0;if(c.some((function(t){return 0!==e[t]}))){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(s)var d=s(r)}for(t&&t(n);i<c.length;i++)l=c[i],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(d)},n=self.webpackChunksavvy_blocks=self.webpackChunksavvy_blocks||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var o=r.O(void 0,[431],(function(){return r(37)}));o=r.O(o)}();