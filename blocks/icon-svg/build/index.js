!function(){var e,t={576:function(e,t,n){"use strict";var a=window.wp.blocks,l=window.wp.element,o=window.wp.primitives,r=(0,l.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,l.createElement)(o.Path,{d:"M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z"})),s=window.wp.i18n,c=window.wp.blockEditor,i=window.wp.data,u=window.wp.serverSideRender,m=n.n(u),v=window.wp.components;window.wp.coreData;const p=[{label:(0,s.__)("Top"),posValue:"top"},{label:(0,s.__)("Right"),posValue:"right"},{label:(0,s.__)("Bottom"),posValue:"bottom"},{label:(0,s.__)("Left"),posValue:"left"}],b=e=>{const t=Object.values(e);return 4===t.length&&t.every((e=>e===t[0]))?t[0]:null},d=e=>{const{side:t}=e;let n;switch(t){case"top":n="M7 5h10V3.5H7V5z";break;case"right":n="M20.5 7H19v10h1.5V7z";break;case"bottom":n="M7 20.5h10V19H7v1.5z";break;case"left":n="M5 17H3.5V7H5v10z";break;case"all":n="M3.5 17H5V7H3.5v10zM7 20.5h10V19H7v1.5zM19 7v10h1.5V7H19zM7 5h10V3.5H7V5z"}return(0,l.createElement)(v.Icon,{icon:(0,l.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,l.createElement)("path",{d:"M3.5 17H5V7H3.5v10zM7 20.5h10V19H7v1.5zM19 7v10h1.5V7H19zM7 5h10V3.5H7V5z",fill:"#e8e8e8"}),n&&(0,l.createElement)("path",{d:n,fill:"#1e1e1e"}))})};var g=e=>{const{options:t,boxValues:n,onChange:a}=e,[o,r]=(0,l.useState)(!n||null!==b(n)),[s,c]=(0,l.useState)(o?"all":"");return(0,l.createElement)("div",{className:"box-controller position-relative"+(o?"":" expanded")},o?(0,l.createElement)("div",{className:"select-wrapper box-all"},(0,l.createElement)(v.SelectControl,{__nextHasNoMargisvottom:!0,value:n?b(n):"",options:t,onChange:e=>a({top:e,right:e,bottom:e,left:e})})):p.map((e=>{let{posValue:o}=e;return(0,l.createElement)("div",{className:`select-wrapper box-${o}`},(0,l.createElement)(v.SelectControl,{__nextHasNoMargisvottom:!0,value:n[o],options:t,onChange:e=>a({...n,[o]:e}),osvlur:()=>c(""),onFocus:()=>c(o)}))})),(0,l.createElement)(v.Button,{icon:(0,l.createElement)(d,{side:s}),isSmall:!0,onClick:()=>{c(o?"":"all"),r(!o)}}))};function h(e){for(let t in e)if(e[t]instanceof Object==1){if(!1===h(e[t]))return!1}else if(0!==e[t].length)return!1;return!0}const E=function(){const e={};for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return n.forEach((t=>t.forEach((t=>{var n,a;return Object.assign(null!==(a=e[n=t.name])&&void 0!==a?a:e[n]={},t)})))),Object.values(e)},f=e=>{const{value:t,onChange:n}=e,a=[],o=(0,c.useSetting)("color.palette.theme")||[],r=(0,c.useSetting)("color.palette.custom")||[],s=E(r,o);return o.length>0&&a.push({name:"Theme",colors:o}),r.length>0&&a.push({name:"Custom",colors:r}),(0,l.createElement)(v.ColorPalette,{colors:a,disableCustomColors:!0,clearable:!1,value:(0,c.getColorObjectByAttributeValues)(s,t).color,onChange:e=>{n(e?(0,c.getColorObjectByColorValue)(s,e):"")}})};var y=e=>{const{children:t}=e,n=t?.props.value,{settings:a}=(0,l.useContext)(ae),o=a?.breakpoints.reduce(((e,t)=>(e[t]=n&&n[t]&&C(n?.[t]),e)),{_:n&&n._&&C(n?._)}),r=[{name:"_",title:"None",className:o?._?"is-modified":""},...a?a?.breakpoints.map((e=>({name:e,title:e,className:o?.[e]?"is-modified":""}))):[]];return(0,l.createElement)(v.TabPanel,{className:"display-type-tabs",activeClass:"active-tab",initialTabName:"_",tabs:r},(t=>(0,l.createElement)(l.Fragment,null,(0,l.createElement)("div",null,React.Children.map(e.children,(e=>React.cloneElement(e,{tabName:t.name},null)))))))};function C(e){return!Object.values(e).every((e=>""===e))}const w=e=>{const{value:t,onChange:n,tabName:a}=e,{settings:o}=(0,l.useContext)(ae);if(void 0===t||0===t.length){const e=o?.breakpoints.reduce(((e,t)=>(e[t]={y:"",x:""},e)),{_:{y:"",x:""}});n(e)}const r=[{label:(0,s.__)("Column"),posValue:"x"},{label:(0,s.__)("Row"),posValue:"y"}];return(0,l.createElement)(l.Fragment,null,r.map((e=>{let{label:r,posValue:s}=e;return(0,l.createElement)(v.SelectControl,{label:r,value:t&&t[a]&&t[a][s],options:[{label:"-",value:""},...o?o.spaces.map((e=>({label:`${e}px`,value:e}))):[]],onChange:e=>n({...t,[a]:{...t[a],[s]:e}})})})),(0,l.createElement)(B,{attr:t,classGenerator:_}))},_=e=>{const t=[];for(const n in e){const a=e[n].y,l=e[n].x,o="_"!==n?`${n}-`:"";l===a&&l?t.push(`gap-${o}${l}`):(l&&t.push(`column-gap-${o}${l}`),a&&t.push(`row-gap-${o}${a}`))}return t.join(" ")},k=e=>{const{value:t,onChange:n}=e,{settings:a}=(0,l.useContext)(ae),o=a&&a?.gradients;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(v.GradientPicker,{__nextHasNoMargin:!0,value:t,onChange:e=>n(e),gradients:o||[]}))},x=e=>{const{value:t,onChange:n,tabName:a}=e,{settings:o}=(0,l.useContext)(ae);if(void 0===t||0===t.length){const e=o?.breakpoints.reduce(((e,t)=>(e[t]={top:"",right:"",bottom:"",left:""},e)),{_:{top:"",right:"",bottom:"",left:""}});n(e)}return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(v.Flex,null,t&&(0,l.createElement)(g,{options:[{label:"-",value:""},{label:"Auto",value:"auto"},{label:"0",value:"0"},...o?o.spaces.map((e=>({label:`${e}px`,value:e}))):[]],boxValues:t&&t[a],onChange:e=>{n({...t,[a]:e})}})),(0,l.createElement)(B,{attr:t,classGenerator:S}))},S=e=>{const t=[];for(const n in e){const a=e[n].top,l=e[n].right,o=e[n].bottom,r=e[n].left,s=a===o?a:"",c=l===r?l:"",i="_"!==n?`${n}-`:"";c===s&&c?t.push(`m-${i}${c}`):(c?t.push(`mx-${i}${c}`):(l&&t.push(`me-${i}${l}`),r&&t.push(`ms-${i}${r}`)),s?t.push(`my-${i}${s}`):(a&&t.push(`mt-${i}${a}`),o&&t.push(`mb-${i}${o}`)))}return t.join(" ")},$=e=>{const{value:t,onChange:n,tabName:a}=e,{settings:o}=(0,l.useContext)(ae);if(void 0===t||0===t.length){const e=o?.breakpoints.reduce(((e,t)=>(e[t]={top:"",right:"",bottom:"",left:""},e)),{_:{top:"",right:"",bottom:"",left:""}});n(e)}return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(v.Flex,null,t&&(0,l.createElement)(g,{options:[{label:"-",value:""},{label:"0",value:"0"},...o?o.spaces.map((e=>({label:`${e}px`,value:e}))):[]],boxValues:t&&t[a],onChange:e=>{n({...t,[a]:e})}})),(0,l.createElement)(B,{attr:t,classGenerator:N}))},N=e=>{const t=[];for(const n in e){const a=e[n].top,l=e[n].right,o=e[n].bottom,r=e[n].left,s=a===o?a:"",c=l===r?l:"",i="_"!==n?`${n}-`:"";c===s&&c?t.push(`p-${i}${c}`):(c?t.push(`px-${i}${c}`):(l&&t.push(`pe-${i}${l}`),r&&t.push(`ps-${i}${r}`)),s?t.push(`py-${i}${s}`):(a&&t.push(`pt-${i}${a}`),o&&t.push(`pb-${i}${o}`)))}return t.join(" ")};var B=e=>{const{attr:t,classGenerator:n,themeClass:a=""}=e;return!h(t)&&(0,l.createElement)("div",{className:`show-class-list ${a}`},t?[n(t)]:"")},O=window.wp.apiFetch,P=n.n(O);const{__:I}=wp.i18n,{BlockControls:T}=wp.blockEditor,{Button:V,DropdownMenu:F,Flex:j,MenuGroup:R,MenuItem:A,TextControl:M,ToolbarGroup:H,Modal:z}=wp.components;function D(){return D=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},D.apply(this,arguments)}var G=n(184),L=n.n(G),U=window.wp.compose,J=(0,l.createElement)(o.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,l.createElement)(o.Path,{d:"M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"})),Q=(0,l.createElement)(o.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,l.createElement)(o.Path,{d:"M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"})),q=window.lodash;const W=()=>{},K=(0,q.debounce)((e=>{e&&e.getBoundingClientRect().top<200&&e.scrollIntoView({inline:"start",block:"start",behavior:"instant"})}),0,{leading:!1,trailing:!0}),X=(0,l.forwardRef)(((e,t)=>{let{isOpened:n,icon:a,title:o,isPremiumPanel:r,showModifiedIndicator:s,checked:c,hasToggle:i,onChange:u,setIsOpened:m,...p}=e;return o?(0,l.createElement)("h2",{className:"components-panel__body-title"},(0,l.createElement)(v.Button,D({className:"savvy-component-body_toggle savvy-panel ","aria-expanded":n,ref:t},p),(0,l.createElement)("span",{"aria-hidden":"true"},(0,l.createElement)(v.Icon,{className:"components-panel__arrow",icon:n?J:Q})),i&&(0,l.createElement)(v.FormToggle,{className:"savvy-toggle-panel-form-toggle",checked:c,onClick:e=>{e.stopPropagation(),e.preventDefault(),c&&n||c||n||m((e=>!e)),u&&u(!c)},"aria-describedby":o}),o,(0,l.createElement)("span",{className:L()(["savvy-panel-selector",{"savvy-showed":s}])}),r&&(0,l.createElement)("div",{className:"savvy-circle-tab"}),a&&(0,l.createElement)(v.Icon,{icon:a,className:"savvy-components-panel_svg",size:20}))):null})),Y=(0,l.forwardRef)(((e,t)=>{let{buttonProps:n={},children:a,className:o,icon:r,initialOpen:s,onToggle:c=W,isOpen:i=!1,title:u,id:m="",checked:v,hasToggle:p,onChange:b=W,isPremiumPanel:d=!1,showModifiedIndicator:g=!1}=e;const[h,E]=(0,l.useState)(!1),f=(0,l.useRef)(),y=L()("components-panel__body","savvy-toggle-panel-body","focal-point-control",o,{"is-opened":h,[`savvy-panel--${m}`]:m,savvy_new_toggle_panel:d});return(0,l.createElement)("div",{className:y,ref:(0,U.useMergeRefs)([f,t])},(0,l.createElement)(X,D({icon:r,isOpened:h,onClick:e=>{e.preventDefault();const t=!h;E(t),c(t),t?setTimeout((()=>{K(f.current)}),0):K(f.current)},title:u,checked:v,hasToggle:void 0===p?!!b:p,onChange:b,setIsOpened:E,isPremiumPanel:d,showModifiedIndicator:g},n)),"function"==typeof a?a({opened:!0}):a)}));Y.displayName="PanelBody";var Z=Y;(0,l.memo)((e=>(0,l.createElement)(Z,e))).defaultProps={id:"",className:"",title:(0,s.__)("Panel settings","savvy-blocks"),checked:!1,onChange:null,initialOpen:!1,hasToggle:!1,onToggle:()=>{},isOpen:null};var ee=function(e){const{margin:t,padding:n,setAttributes:a}=e;return(0,l.createElement)(l.Fragment,null,e.hasOwnProperty("padding")&&(0,l.createElement)(v.BaseControl,{label:(0,s.__)("Padding","savvy-blocks")},(0,l.createElement)(y,null,(0,l.createElement)($,{value:n,onChange:e=>{a({padding:e})}}))),e.hasOwnProperty("margin")&&(0,l.createElement)(v.BaseControl,{label:(0,s.__)("Margin","savvy-blocks")},(0,l.createElement)(y,null,(0,l.createElement)(x,{value:t,onChange:e=>{a({margin:e})}}))))};const{createHigherOrderComponent:te}=wp.compose,ne=te((e=>t=>(0,l.createElement)(l.Fragment,null,(0,l.createElement)(le,null,(0,l.createElement)(re,null,(0,l.createElement)(e,t))))),"withInspectorControl");wp.hooks.addFilter("editor.BlockEdit","savvy-blocks",ne);const ae=(0,l.createContext)({});var le=e=>{let{children:t}=e;const n=(()=>{const[e,t]=(0,l.useState)();return(0,l.useEffect)((()=>{(async()=>svSettings)().then((e=>{t(e)}))}),[]),e})();return(0,l.createElement)(ae.Provider,{value:{settings:void 0!==n?n:void 0}},t)};const oe=(0,l.createContext)({});var re=e=>{let{children:t}=e;const{settings:n}=(0,l.useContext)(ae);return(0,l.createElement)(oe.Provider,{value:{features:void 0!==n?n?.blocks?.[t.props.name]?.editorSettings?.features:{}}},t)},se=function(e){const{border:t,elementStates:n,setAttributes:a,tabName:o,supports:r}=e,{settings:c}=(0,l.useContext)(ae);t?.width||c?.breakpoints.reduce(((e,t)=>(e[t]="",e)),{_:""});const i=[{name:"default",title:"Default",className:"tab-color",attrSlug:""},{name:"hover",title:"Hover",className:"tab-hover",attrSlug:"hover"}];return e.hasOwnProperty("border")&&(0,l.createElement)(l.Fragment,null,(void 0===r||void 0!==r&&r.includes("style"))&&(0,l.createElement)(v.BaseControl,null,(0,l.createElement)(v.SelectControl,{label:(0,s.__)("Style","savvy-blocks"),value:t?.[o]?.style||"",options:[{label:"Select",value:""},{label:"None",value:"none"},{label:"Solid",value:"solid"},{label:"Dotted",value:"dotted"},{label:"Dashed",value:"dashed"}],onChange:e=>a({border:{...t,[o]:{...t?.[o],style:e}}})})),(void 0===r||void 0!==r&&r.includes("radius"))&&(0,l.createElement)(v.BaseControl,null,(0,l.createElement)(v.__experimentalUnitControl,{label:(0,s.__)("Radius","savvy-blocks"),labelPostion:(0,s.__)("edge","savvy-blocks"),units:[{value:"px",label:"px",default:0},{value:"%",label:"%",default:0}],value:t?.[o]?.radius,onChange:e=>a({border:{...t,[o]:{...t?.[o],radius:e}}})})),(void 0===r||void 0!==r&&r.includes("width"))&&(0,l.createElement)(v.BaseControl,{label:(0,s.__)("width","savvy-blocks")},(0,l.createElement)(v.TabPanel,{className:"tabs",activeClass:"active-tab",tabs:i},(e=>"default"===e.name?(0,l.createElement)(l.Fragment,null,(0,l.createElement)(v.RangeControl,{value:parseInt(t?.[o]?.width),onChange:e=>{a({border:{...t,[o]:{...t?.[o],width:e?`${e}px`:""}}})},step:1,min:0,max:10,currentInput:0,allowReset:!0})):(0,l.createElement)(v.RangeControl,{value:parseInt(n?.[e.name]?.border?.[o]?.width),onChange:t=>a({elementStates:{...n,[e.name]:{...n?.[e.name],border:{...n?.[e.name]?.border,[o]:{...n?.[e.name]?.border?.[o],width:`${t}px`}}}}}),step:1,min:0,max:10,currentInput:0,allowReset:!0})))),(void 0===r||void 0!==r&&r.includes("color"))&&(0,l.createElement)(v.BaseControl,{label:(0,s.__)("Color","savvy-blocks")},(0,l.createElement)(v.TabPanel,{className:"tabs",activeClass:"active-tab",tabs:i},(e=>"default"===e.name?(0,l.createElement)(f,{value:t?.[o]?.color,onChange:e=>{a({border:{...t,[o]:{...t?.[o],color:e.slug}}})}}):(0,l.createElement)(f,{value:n?.[e.name]?.border?.[o]?.color,onChange:t=>a({elementStates:{...n,[e.name]:{...n?.[e.name],border:{...n?.[e.name]?.border,[o]:{...n?.[e.name]?.border?.[o],color:t.slug}}}}})})))))},ce=function(e){const{boxShadow:t,elementStates:n,setAttributes:a}=e,o=[{label:"none",value:"none"},{label:"Small",value:"sm"},{label:"Regular",value:""},{label:"Larger",value:"lg"}];return(0,l.createElement)(l.Fragment,null,e.hasOwnProperty("boxShadow")&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)(v.BaseControl,{label:(0,s.__)("Shadow","savvy-blocks")},(0,l.createElement)(v.TabPanel,{className:"tabs",activeClass:"active-tab",tabs:[{name:"default",title:"Default",className:"tab-color",attrSlug:""},{name:"hover",title:"Hover",className:"tab-hover",attrSlug:"hover"}]},(e=>"default"===e.name?(0,l.createElement)(v.SelectControl,{value:t,options:o,onChange:e=>{a({boxShadow:e})}}):(0,l.createElement)(v.SelectControl,{value:n?.[e.name]?.boxShadow,options:o,onChange:t=>{a({elementStates:{...n,[e.name]:{...n?.[e.name],boxShadow:t}}})}}))))))};const ie=e=>{const{value:t,onChange:n,tabName:a}=e,{settings:o}=(0,l.useContext)(ae);if(void 0===t||0===t.length){const e=o?.breakpoints.reduce(((e,t)=>(e[t]={"align-items":"","justify-content":""},e)),{_:{"align-items":"","justify-content":""}});n(e)}const r=[{label:(0,s.__)("Align Items"),flexItem:"align-items",values:["start","end","center","baseline","stretch"]},{label:(0,s.__)("Justify Content"),flexItem:"justify-content",values:["start","end","center","between","around","evenly"]}];return(0,l.createElement)(l.Fragment,null,r.map((e=>{let{label:o,flexItem:r,values:s}=e;return(0,l.createElement)(v.SelectControl,{label:o,value:t&&t[a]&&t[a][r],options:[{label:"-",value:""},...s.map((e=>({label:`${e}`,value:e})))],onChange:e=>n({...t,[a]:{...t[a],[r]:e}})})})),(0,l.createElement)(B,{attr:t,classGenerator:ue}))},ue=e=>{const t=[];for(const n in e){const a=e[n]["align-items"],l=e[n]["justify-content"],o="_"!==n?`${n}-`:"";l&&t.push(`justify-content-${o}${l}`),a&&t.push(`align-items-${o}${a}`)}return t.join(" ")};var me=e=>{const{blockType:t,setAttributes:n,settings:a,label:o,blockName:r}=e,c=a?.blocks?.[r];let i=c&&c?.blockTypes?Object.keys(c.blockTypes):[];return i=[...i.length?i.map((e=>({label:(0,s.__)(`${e}`),value:e}))):[],{label:"Custom",value:"custom"}],(0,l.useEffect)((()=>{void 0===c?.blockTypes&&n({blockType:"custom"})}),[]),(0,l.createElement)(l.Fragment,null,c?.blockTypes&&(0,l.createElement)(v.SelectControl,{label:(0,s.__)(o,"savvy-blocks"),options:i,onChange:e=>{n({...c.blockTypes?.[e]}),n({blockType:e})},value:t}))},ve=function(e){const{blockType:t,settings:n,attributes:{color:a,minHeight:o,opacity:r,rotation:i,size:u,elementStates:m},setAttributes:p}=e,b=(()=>{const e=(0,c.useSetting)("color.palette.theme")||[],t=(0,c.useSetting)("color.palette.custom")||[];return E(t,e)})(),d=[{name:"default",title:"Default",className:"tab-color",attrSlug:""},{name:"hover",title:"Hover",className:"tab-hover",attrSlug:"hover"}];return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(me,{blockName:"savvy-blocks/icon",label:"Icon Type",blockType:t,settings:n,setAttributes:p}),(0,l.createElement)(v.BaseControl,{label:(0,s.__)("Text Color","savvy-blocks")},(0,l.createElement)(v.TabPanel,{className:"tabs",activeClass:"active-tab",tabs:d},(e=>"default"===e.name?(0,l.createElement)(f,{value:(0,c.getColorObjectByColorValue)(b,a)?.slug,onChange:e=>{p({color:e.color})}}):(0,l.createElement)(f,{value:(0,c.getColorObjectByColorValue)(b,m?.[e.name]?.color)?.slug,onChange:t=>{p({elementStates:{...m,[e.name]:{...m?.[e.name],color:t.color}}})}})))),(0,l.createElement)(v.__experimentalDivider,null),(0,l.createElement)(y,null,(0,l.createElement)(he,{value:u,onChange:e=>{p({size:e})}})),(0,l.createElement)(v.__experimentalDivider,null),(0,l.createElement)(v.BaseControl,{label:(0,s.__)("Opacity","savvy-blocks")},(0,l.createElement)(v.TabPanel,{className:"tabs",activeClass:"active-tab",tabs:d},(e=>"default"===e.name?(0,l.createElement)(l.Fragment,null,(0,l.createElement)(v.RangeControl,{value:r,onChange:e=>p({opacity:e}),step:5,min:0,max:100,currentInput:100,allowReset:!0})):(0,l.createElement)(v.RangeControl,{value:m?.[e.name]?.opacity,onChange:t=>{p({elementStates:{...m,[e.name]:{...m?.[e.name],opacity:t}}})},step:5,min:0,max:100,currentInput:100,allowReset:!0})))),(0,l.createElement)(v.__experimentalDivider,null),(0,l.createElement)(v.BaseControl,{label:(0,s.__)("Rotation","savvy-blocks")},(0,l.createElement)(v.TabPanel,{className:"tabs",activeClass:"active-tab",tabs:d},(e=>"default"===e.name?(0,l.createElement)(l.Fragment,null,(0,l.createElement)(v.RangeControl,{value:i,onChange:e=>p({rotation:e}),step:5,min:0,max:360,currentInput:0,allowReset:!0})):(0,l.createElement)(v.RangeControl,{value:m?.[e.name]?.rotation,onChange:t=>{p({elementStates:{...m,[e.name]:{...m?.[e.name],rotation:t}}})},step:5,min:0,max:360,currentInput:0,allowReset:!0})))))},pe=window.wp.editor,be=window.wp.url,de=function(e){const{icon:t,setAttributes:n}=e,[a,o]=(0,l.useState)([]),[r,s]=(0,l.useState)(!1),[c,i]=(0,l.useState)(),u=()=>s(!1),m=[];(0,l.useEffect)((()=>{P()({path:"/savvy/v1/icon-svg/list"}).then((e=>{o(e)}))}),[]),a.map((e=>{m.push((0,l.createElement)("span",{key:e.ID,className:e.ID===t?"icon-item is-selected":"icon-item",onClick:()=>n({icon:e.ID})},(0,l.createElement)("img",{src:e.guid}),(0,l.createElement)(v.Icon,{style:{color:"#cc1818"},className:"savvy-icon-svg-remove",icon:"remove",size:"12",onClick:t=>{t.stopPropagation(),p(e.ID)}})))}));const p=e=>{s(!0),i(e)};return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(v.__experimentalGrid,{className:"icon-list",alignment:"bottom",columns:3},m),(0,l.createElement)(v.FormFileUpload,{isLarge:!0,className:"block-library-gallery-add-item-button",icon:"insert",accept:"image/svg+xml",onChange:e=>{var t;t=e.currentTarget.files,(0,pe.mediaUpload)({allowedTypes:["image/svg+xml"],filesList:t,onFileChange:e=>{P()({path:(0,be.addQueryArgs)("/savvy/v1/icon-svg/add",{id:e[0].id})}).then((e=>{P()({path:"/savvy/v1/icon-svg/list"}).then((e=>{o(e)}))}))},onError:e=>{console.log("onError",e)}})}},"Add Icon"),r&&(0,l.createElement)(v.Modal,{title:"Remove Icon?",onRequestClose:u},(0,l.createElement)("p",null,"All icon-svg blocks that used this icon no longer show anything."),(0,l.createElement)(v.Flex,{justify:"end"},(0,l.createElement)(v.Button,{variant:"secondary",onClick:u},"Cancel"),(0,l.createElement)(v.Button,{variant:"secondary",isDestructive:!0,onClick:()=>{return e=c,void P()({path:(0,be.addQueryArgs)("/savvy/v1/icon-svg/remove",{id:e})}).then((e=>{P()({path:"/savvy/v1/icon-svg/list"}).then((e=>{u(),o(e)}))}));var e}},"Remove"))))},ge=function(e){const{background:t,elementStates:n,setAttributes:a}=e;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(v.BaseControl,{label:(0,s.__)("Background Color","savvy-blocks")},(0,l.createElement)(v.TabPanel,{className:"tabs",activeClass:"active-tab",tabs:[{name:"default",title:"Default",className:"tab-color",attrSlug:""},{name:"hover",title:"Hover",className:"tab-hover",attrSlug:"hover"}]},(e=>"default"===e.name?(0,l.createElement)(l.Fragment,null,(0,l.createElement)(v.BaseControl,null,(0,l.createElement)(f,{value:t?.color,onChange:e=>a({background:{...t,color:e.slug}})})),(0,l.createElement)(v.BaseControl,{label:(0,s.__)("Gradient","savvy-blocks")},(0,l.createElement)(k,{value:t?.gradient,onChange:e=>{a({background:{...t,gradient:e}})}}))):(0,l.createElement)(l.Fragment,null,(0,l.createElement)(f,{value:n?.[e.name]?.background?.color,onChange:l=>{a({elementStates:{...n,[e.name]:{...n?.[e.name],background:{...t,color:l.slug}}}})}}),(0,l.createElement)(v.BaseControl,{label:(0,s.__)("Gradient","savvy-blocks")},(0,l.createElement)(k,{value:n?.[e.name]?.background?.gradient,onChange:t=>{a({elementStates:{...n,[e.name]:{...n?.[e.name],background:{...n?.[e.name]?.background,gradient:t}}}})}})))))))};const he=e=>{const{value:t,onChange:n,tabName:a}=e,{settings:o}=(0,l.useContext)(ae);if(!t){const e=o?.breakpoints.reduce(((e,t)=>(e[t]="",e)),{_:""});n(e)}return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(v.BaseControl,null,(0,l.createElement)(v.RangeControl,{label:(0,s.__)("Size","savvy-blocks"),onChange:e=>{n({...t,[a]:isNaN(parseInt(e))?"":`${parseInt(e)}px`})},value:t&&parseInt(t[a]),min:0,max:100,currentInput:16,allowReset:!0})),(0,l.createElement)(B,{attr:t,classGenerator:Ee}))},Ee=e=>{const t=[];for(const n in e){const a=e[n];if(a){const e="--width"+("_"!==n?`-${n}`:"");t.push(`${e}:${a}`)}}return t.join(";")};var fe=function(e){const{attributes:{blockType:t,background:n,border:a,boxShadow:o,flexAlignment:r,gap:i,icon:u,padding:m,elementStates:p},attributes:b,setAttributes:d}=e,{settings:g}=(0,l.useContext)(ae);return(0,l.createElement)(c.InspectorControls,null,(0,l.createElement)(v.Panel,null,(0,l.createElement)(v.PanelBody,{title:(0,s.__)("Icon","savvy-blocks")},(0,l.createElement)(de,{icon:u,blockType:t,setAttributes:d,settings:g})),(0,l.createElement)(v.PanelBody,{title:(0,s.__)("General Setting","savvy-blocks"),initialOpen:!1},(0,l.createElement)(ve,{icon:u,blockType:t,attributes:b,setAttributes:d,settings:g}))),"custom"===t&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)(v.Panel,null,(0,l.createElement)(v.PanelBody,{title:(0,s.__)("SVG Wrapper Setting","savvy-blocks"),initialOpen:!1},(0,l.createElement)(ge,{background:n,elementStates:p,setAttributes:d})),(0,l.createElement)(v.PanelBody,{title:(0,s.__)("Border","savvy-blocks"),initialOpen:!1},(0,l.createElement)(y,null,(0,l.createElement)(se,{border:a,elementStates:p,setAttributes:d,supports:["radius","width","color","style"]}))),(0,l.createElement)(v.PanelBody,{title:(0,s.__)("Box Shadow","savvy-blocks"),initialOpen:!1},(0,l.createElement)(ce,{boxShadow:o,elementStates:p,setAttributes:d})),(0,l.createElement)(v.PanelBody,{title:(0,s.__)("Alignment","savvy-blocks"),initialOpen:!1},(0,l.createElement)(y,null,(0,l.createElement)(ie,{value:r,onChange:e=>{d({flexAlignment:e})}}))),(0,l.createElement)(v.PanelBody,{title:(0,s.__)("Spacing","savvy-blocks"),initialOpen:!1},(0,l.createElement)(ee,{padding:m,setAttributes:d}),(0,l.createElement)(v.__experimentalDivider,null),(0,l.createElement)(v.BaseControl,{label:(0,s.__)("Gap","savvy-blocks")},(0,l.createElement)(y,null,(0,l.createElement)(w,{value:i,onChange:e=>{d({gap:e})}})))))))};(0,a.registerBlockType)("savvy-blocks/icon-svg",{edit:e=>{const{attributes:t,setAttributes:n,clientId:a}=e,{wasBlockJustInserted:o}=(0,i.useSelect)("core/block-editor");(0,l.useEffect)((()=>{o(a)&&n({size:{...t?.size,_:"48px"}})}),[]);const r=(0,c.useBlockProps)();return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(fe,e),(0,l.createElement)("div",r,(0,l.createElement)(m(),{block:"savvy-blocks/icon-svg",attributes:{...t}})))},icon:{foreground:"#af5bfd",src:r}})},184:function(e,t){var n;!function(){"use strict";var a={}.hasOwnProperty;function l(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var r=l.apply(null,n);r&&e.push(r)}}else if("object"===o){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var s in n)a.call(n,s)&&n[s]&&e.push(s)}}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):void 0===(n=function(){return l}.apply(t,[]))||(e.exports=n)}()}},n={};function a(e){var l=n[e];if(void 0!==l)return l.exports;var o=n[e]={exports:{}};return t[e](o,o.exports,a),o.exports}a.m=t,e=[],a.O=function(t,n,l,o){if(!n){var r=1/0;for(u=0;u<e.length;u++){n=e[u][0],l=e[u][1],o=e[u][2];for(var s=!0,c=0;c<n.length;c++)(!1&o||r>=o)&&Object.keys(a.O).every((function(e){return a.O[e](n[c])}))?n.splice(c--,1):(s=!1,o<r&&(r=o));if(s){e.splice(u--,1);var i=l();void 0!==i&&(t=i)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,l,o]},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,{a:t}),t},a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};a.O.j=function(t){return 0===e[t]};var t=function(t,n){var l,o,r=n[0],s=n[1],c=n[2],i=0;if(r.some((function(t){return 0!==e[t]}))){for(l in s)a.o(s,l)&&(a.m[l]=s[l]);if(c)var u=c(a)}for(t&&t(n);i<r.length;i++)o=r[i],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(u)},n=self.webpackChunksavvy_blocks=self.webpackChunksavvy_blocks||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var l=a.O(void 0,[431],(function(){return a(576)}));l=a.O(l)}();