"use strict";(self.webpackChunksjwilliams_world=self.webpackChunksjwilliams_world||[]).push([[614],{614:(l,e,a)=>{a.r(e),a.d(e,{default:()=>h});var r=a(43);const s="Gallery_galleryWrapper__yA45Z",t="Gallery_galleryContainer__AeYUJ",n="Gallery_galleryGrid__uC3VC",i="Gallery_galleryItem__8z30+",o="Gallery_modal__535bB",c="Gallery_modalImage__YgWZV",d="Gallery_shuffleButton__hlp9v";var u=a(579);const h=()=>{const[l,e]=(0,r.useState)([]),[a,h]=(0,r.useState)(!0),[g,_]=(0,r.useState)(""),[m,v]=(0,r.useState)(null);(0,r.useEffect)((()=>{(async()=>{try{h(!0);const l=100;let a=1,r=[],s=null;do{const e=await fetch(`https://api.are.na/v2/channels/gallery-5sy-esdksbc?per=${l}&page=${a}`,{headers:{Authorization:"Bearer J7ruXpTpvNRJGQNdJ6x4d_a2Pr396ODnIWFWVei_-1E"}});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json();1===a&&(s=t),r=r.concat(t.contents),a++}while(r.length<s.contents_count);const t=r.filter((l=>{var e,a,r;return l.class&&"image"===l.class.toLowerCase()&&((null===(e=l.image)||void 0===e||null===(a=e.original)||void 0===a?void 0:a.url)||(null===(r=l.image)||void 0===r?void 0:r.url))}));e(t)}catch(l){console.error("Error fetching gallery channel:",l),_("Error fetching gallery data.")}finally{h(!1)}})()}),[]);return a||g?(0,u.jsx)("div",{className:t}):(0,u.jsx)("div",{className:s,children:(0,u.jsxs)("div",{className:t,children:[l.length>0?(0,u.jsx)("div",{className:n,children:l.map(((l,e)=>{var a,r,s;const t=(null===(a=l.image)||void 0===a||null===(r=a.original)||void 0===r?void 0:r.url)||(null===(s=l.image)||void 0===s?void 0:s.url);return t?(0,u.jsx)("div",{className:i,onClick:()=>v(t),children:(0,u.jsx)("img",{src:t,alt:l.title||`Image ${e}`})},e):null}))}):(0,u.jsx)("p",{children:"No images found."}),m&&(0,u.jsx)("div",{className:o,onClick:()=>v(null),children:(0,u.jsx)("img",{src:m,alt:"Enlarged view",className:c})}),(0,u.jsx)("button",{className:d,onClick:()=>{e((l=>(l=>{let e=l.slice();for(let a=e.length-1;a>0;a--){const l=Math.floor(Math.random()*(a+1));[e[a],e[l]]=[e[l],e[a]]}return e})(l)))},children:"Shuffle Gallery"})]})})}}}]);
//# sourceMappingURL=614.d7b30e1d.chunk.js.map