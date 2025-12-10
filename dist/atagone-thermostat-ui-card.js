function e(e,t,i,a){var o,n=arguments.length,r=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),o=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new n(i,e,a)},s=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:m,getPrototypeOf:h}=Object,p=globalThis,_=p.trustedTypes,f=_?_.emptyScript:"",g=p.reactiveElementPolyfillSupport,b=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!l(e,t),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&c(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:o}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const n=a?.call(this);o?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...u(e),...m(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,a)=>{if(i)e.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of a){const a=document.createElement("style"),o=t.litNonce;void 0!==o&&a.setAttribute("nonce",o),a.textContent=i.cssText,e.appendChild(a)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(a):this.setAttribute(a,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=a;const n=o.fromAttribute(t,e.type);this[a]=n??this._$Ej?.get(a)??n,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const a=this.constructor,o=this[e];if(i??=a.getPropertyOptions(e),!((i.hasChanged??y)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[b("elementProperties")]=new Map,k[b("finalized")]=new Map,g?.({ReactiveElement:k}),(p.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,x=$.trustedTypes,A=x?x.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+E,j=`<${z}>`,S=document,D=()=>S.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,H="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,N=/>/g,V=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,R=/"/g,I=/^(?:script|style|textarea|title)$/i,U=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),F=U(1),Z=U(2),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),K=new WeakMap,q=S.createTreeWalker(S,129);function J(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,a=[];let o,n=2===t?"<svg>":3===t?"<math>":"",r=P;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===P?"!--"===l[1]?r=M:void 0!==l[1]?r=N:void 0!==l[2]?(I.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=V):void 0!==l[3]&&(r=V):r===V?">"===l[0]?(r=o??P,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,s=l[1],r=void 0===l[3]?V:'"'===l[3]?R:L):r===R||r===L?r=V:r===M||r===N?r=P:(r=V,o=void 0);const u=r===V&&e[t+1].startsWith("/>")?" ":"";n+=r===P?i+j:c>=0?(a.push(s),i.slice(0,c)+C+i.slice(c)+E+u):i+E+(-2===c?t:u)}return[J(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class G{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let o=0,n=0;const r=e.length-1,s=this.parts,[l,c]=Y(e,t);if(this.el=G.createElement(l,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=q.nextNode())&&s.length<r;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(C)){const t=c[n++],i=a.getAttribute(e).split(E),r=/([.?@])?(.*)/.exec(t);s.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?ie:"?"===r[1]?ae:"@"===r[1]?oe:te}),a.removeAttribute(e)}else e.startsWith(E)&&(s.push({type:6,index:o}),a.removeAttribute(e));if(I.test(a.tagName)){const e=a.textContent.split(E),t=e.length-1;if(t>0){a.textContent=x?x.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],D()),q.nextNode(),s.push({type:2,index:++o});a.append(e[t],D())}}}else if(8===a.nodeType)if(a.data===z)s.push({type:2,index:o});else{let e=-1;for(;-1!==(e=a.data.indexOf(E,e+1));)s.push({type:7,index:o}),e+=E.length-1}o++}}static createElement(e,t){const i=S.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,a){if(t===B)return t;let o=void 0!==a?i._$Co?.[a]:i._$Cl;const n=O(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=o:i._$Cl=o),void 0!==o&&(t=X(e,o._$AS(e,t.values),o,a)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??S).importNode(t,!0);q.currentNode=a;let o=q.nextNode(),n=0,r=0,s=i[0];for(;void 0!==s;){if(n===s.index){let t;2===s.type?t=new ee(o,o.nextSibling,this,e):1===s.type?t=new s.ctor(o,s.name,s.strings,this,e):6===s.type&&(t=new ne(o,this,e)),this._$AV.push(t),s=i[++r]}n!==s?.index&&(o=q.nextNode(),n++)}return q.currentNode=S,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),O(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=G.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new Q(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new G(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const o of e)a===t.length?t.push(i=new ee(this.O(D()),this.O(D()),this,this.options)):i=t[a],i._$AI(o),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,a){const o=this.strings;let n=!1;if(void 0===o)e=X(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==B,n&&(this._$AH=e);else{const a=e;let r,s;for(e=o[0],r=0;r<o.length-1;r++)s=X(this,a[i+r],t,r),s===B&&(s=this._$AH[r]),n||=!O(s)||s!==this._$AH[r],s===W?e=W:e!==W&&(e+=(s??"")+o[r+1]),this._$AH[r]=s}n&&!a&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ae extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class oe extends te{constructor(e,t,i,a,o){super(e,t,i,a,o),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??W)===B)return;const i=this._$AH,a=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==W&&(i===W||a);a&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const re=$.litHtmlPolyfillSupport;re?.(G,ee),($.litHtmlVersions??=[]).push("3.3.1");const se=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let le=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let o=a._$litPart$;if(void 0===o){const e=i?.renderBefore??null;a._$litPart$=o=new ee(t.insertBefore(D(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};le._$litElement$=!0,le.finalized=!0,se.litElementHydrateSupport?.({LitElement:le});const ce=se.litElementPolyfillSupport;ce?.({LitElement:le}),(se.litElementVersions??=[]).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},me=(e=ue,t,i)=>{const{kind:a,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,o,e)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const o=this[a];t.call(this,i),this.requestUpdate(a,o,e)}}throw Error("Unsupported decorator location: "+a)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function he(e){return(t,i)=>"object"==typeof i?me(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(e){return he({...e,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _e=1;class fe{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends fe{constructor(e){if(super(e),e.type!==_e||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const i=e.element.classList;for(const e of this.st)e in t||(i.remove(e),this.st.delete(e));for(const e in t){const a=!!t[e];a===this.st.has(e)||this.nt?.has(e)||(a?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return B}});var be="M18,11V12.5C21.19,12.5 23.09,16.05 21.33,18.71L20.24,17.62C21.06,15.96 19.85,14 18,14V15.5L15.75,13.25L18,11M18,22V20.5C14.81,20.5 12.91,16.95 14.67,14.29L15.76,15.38C14.94,17.04 16.15,19 18,19V17.5L20.25,19.75L18,22M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14C13.36,20.45 12.86,19.77 12.5,19H5V8H19V10.59C19.71,10.7 20.39,10.94 21,11.31V5A2,2 0 0,0 19,3Z",ve="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",ye="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",we="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",ke="M21 7C21 5.62 19.88 4.5 18.5 4.5C18.33 4.5 18.16 4.5 18 4.55V4C18 2.62 16.88 1.5 15.5 1.5C15.27 1.5 15.04 1.53 14.83 1.59C14.46 .66 13.56 0 12.5 0C11.27 0 10.25 .89 10.04 2.06C9.87 2 9.69 2 9.5 2C8.12 2 7 3.12 7 4.5V10.39C6.66 10.08 6.24 9.85 5.78 9.73L5 9.5C4.18 9.29 3.31 9.61 2.82 10.35C2.44 10.92 2.42 11.66 2.67 12.3L5.23 18.73C6.5 21.91 9.57 24 13 24C17.42 24 21 20.42 21 16V7M19 16C19 19.31 16.31 22 13 22C10.39 22 8.05 20.41 7.09 18L4.5 11.45L5 11.59C5.5 11.71 5.85 12.05 6 12.5L7 15H9V4.5C9 4.22 9.22 4 9.5 4S10 4.22 10 4.5V12H12V2.5C12 2.22 12.22 2 12.5 2S13 2.22 13 2.5V12H15V4C15 3.72 15.22 3.5 15.5 3.5S16 3.72 16 4V12H18V7C18 6.72 18.22 6.5 18.5 6.5S19 6.72 19 7V16Z",$e="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z";var xe={version:"version",current:"current"},Ae={card:{climate:{disable_window:"Turn off the window open indicator",disable_summer:"Turn off the summer indicator",disable_eco:"Turn off the eco button",disable_heat:"Turn off the on/heat button",disable_off:"Turn off the off button",disable_menu:"Disable menu",disable_battery_warning:"Turn off the battery warning",disable_buttons:"Turn off the plus/minus buttons",eco_temperature:"Target temp for night/away/eco mode triggerd by ui button",set_current_as_main:"Swap target with current temperature places"}}},Ce={window_open:"Window open",night_mode:"Night mode",eco:"Eco",summer:"Summer",cooling:"Cooling",heating:"Heating",cooling_off:"Cooling off",heating_off:"Heating off"},Ee={change_function:"Change function",automatic:"Automatic",holiday:"Holiday",extend:"Extend",fireplace:"Fireplace",manual:"Manual"},ze={current_temperature:"Current temperature",target_temperature:"Target temperature"},je={submit:"SET",cancel:"CANCEL",clear:"CLEAR",depart:"Departure",return:"Return",datetime:"(date & time)",note:"Note: In holiday mode the DHW mode will be set to ECO"},Se={common:xe,editor:Ae,extra_states:Ce,bottom:Ee,top:ze,holiday:je},De=Object.freeze({__proto__:null,bottom:Ee,common:xe,default:Se,editor:Ae,extra_states:Ce,holiday:je,top:ze}),Oe={version:"Version",current:"Aktuell",current_humidity:"Aktuelle Luftfeuchtigkeit",current_temperature:"Aktuelle Temperatur",target_temperature:"Zieltemperatur"},Te={card:{climate:{disable_window:"Fenster-offen-Anzeige deaktivieren",disable_summer:"Sommer-Anzeige deaktivieren",disable_eco:"Eco-Anzeige deaktivieren",disable_heat:"Heiz-Anzeige deaktivieren",disable_off:"Aus-Anzeige deaktivieren",disable_menu:"Menü deaktivieren",disable_battery_warning:"Batterie-Warnung deaktivieren",disable_buttons:"Plus/Minus Buttons deaktivieren",eco_temperature:"Eco Temperatur",set_current_as_main:"Zieltemperatur mit aktueller Temperatur tauschen"}}},He={window_open:"Fenster offen",window_closed:"Fenster geschlossen",night_mode:"Nachtmodus",eco:"Eco",summer:"Sommer",cooling:"Kühlen",heating:"Heizen",cooling_off:"Kühlung aus",heating_off:"Heizung aus"},Pe={common:Oe,editor:Te,extra_states:He},Me=Object.freeze({__proto__:null,common:Oe,default:Pe,editor:Te,extra_states:He}),Ne={version:"Version",current:"Actuel",current_humidity:"Humidité actuelle",current_temperature:"Température actuelle",target_temperature:"Température cible"},Ve={card:{climate:{disable_window:"Désactiver fenêtre",disable_summer:"Désactiver été",disable_eco:"Désactiver mode Éco",disable_heat:"Désactiver mode chauffe",disable_off:"Désactiver arrêt",disable_menu:"Désactiver le menu",disable_battery_warning:"Désactiver l'avertissement de batterie",disable_buttons:"Désactiver les boutons plus/moins",eco_temperature:"Température Éco",set_current_as_main:"Échanger température cible avec température locale"}}},Le={window_open:"Fenêtre ouverte",window_closed:"Fenêtre fermée",night_mode:"Mode nuit",eco:"Éco",summer:"Été",cooling:"Refroidissement",heating:"Chauffage",cooling_off:"Refroidissement éteint",heating_off:"Chauffage éteint"},Re={common:Ne,editor:Ve,extra_states:Le},Ie=Object.freeze({__proto__:null,common:Ne,default:Re,editor:Ve,extra_states:Le}),Ue={version:"версия",current:"текущий",current_humidity:"Текущая влажность",current_temperature:"Текущая температура",target_temperature:"Целевая температура"},Fe={card:{climate:{disable_window:"Отключить окно",disable_summer:"Отключить лето",disable_eco:"Отключить режим eco",disable_heat:"Отключить обогрев",disable_off:"Отключить",disable_menu:"Отключить меню",disable_battery_warning:"Отключить предупреждение о разряде батареи",disable_buttons:"Отключить кнопку плюс/минус",eco_temperature:"Eco температура",set_current_as_main:"Поменять местами требуемую и текущую температуру"}}},Ze={window_open:"Окно открыто",window_closed:"Окно закрыто",night_mode:"Ночной режим",eco:"Эко",summer:"Лето",cooling:"Охлаждение",heating:"Отопление",cooling_off:"Охлаждение выключено",heating_off:"Отопление выключено"},Be={common:Ue,editor:Fe,extra_states:Ze},We=Object.freeze({__proto__:null,common:Ue,default:Be,editor:Fe,extra_states:Ze}),Ke={version:"Wersja",current:"Aktualna",current_humidity:"Aktualna wilgotność",current_temperature:"Aktualna temperatura",target_temperature:"Temperatura docelowa"},qe={card:{climate:{disable_window:"Wyłącz okno",disable_summer:"Wyłacz lato",disable_eco:"Wyłącz tryb eko",disable_heat:"Wyłącz grzanie",disable_off:"Wyłącz wyłącznik",disable_menu:"Wyłącz menu",disable_battery_warning:"Wyłącz ostrzeżenie o baterii",disable_buttons:"Wyłącz przyciski plus/minus",eco_temperature:"Temperatura eko",set_current_as_main:"Zamień miejscami temperature docelową z aktualną"}}},Je={window_open:"Otwarte okno",window_closed:"Okno zamknięte",night_mode:"Tryb nocny",eco:"Tryb ekonomiczny",summer:"Lato",cooling:"Chłodzenie",heating:"Ogrzewanie",cooling_off:"Chłodzenie wyłączone",heating_off:"Ogrzewanie wyłączone"},Ye={common:Ke,editor:qe,extra_states:Je},Ge=Object.freeze({__proto__:null,common:Ke,default:Ye,editor:qe,extra_states:Je}),Xe={version:"verzia",current:"aktuálny",current_humidity:"Aktuálna vlhkosť",current_temperature:"Aktuálna teplota",target_temperature:"Cieľová teplota"},Qe={card:{climate:{disable_window:"Zakázať okno",disable_summer:"Zakázať leto",disable_eco:"Zakázať eco",disable_heat:"Zakázať kúrenie",disable_off:"Vypnúť",disable_menu:"Zakázať menu",disable_battery_warning:"Zakázať upozornenie na batériu",disable_buttons:"Zakázať plus/mínus tlačidlá",eco_temperature:"Eco teplota",set_current_as_main:"Vymeňte cieľ za miesta s aktuálnou teplotou"}}},et={window_open:"Okno otvorené",window_closed:"Okno zatvorené",night_mode:"Nočný mód",eco:"Eco",summer:"Leto",cooling:"Chladenie",heating:"Kúrenie",cooling_off:"Chladenie vypnuté",heating_off:"Kúrenie vypnuté"},tt={common:Xe,editor:Qe,extra_states:et},it={version:"verzija",current:"trenutno",current_humidity:"Trenutna vlažnost",current_temperature:"Trenutna temperatura",target_temperature:"Ciljana temperatura"},at={card:{climate:{disable_window:"Isključi indikator prozora",disable_summer:"Isključi indikator ljeta",disable_eco:"Isključi prikaz eco gumba",disable_heat:"Isključi prikaz gumba paljenja",disable_off:"Isključi prikaz gumba gašenja",disable_menu:"Isključi prikaz izbornika",disable_battery_warning:"Isključi upozorenje baterije",disable_buttons:"Isključi prikaz plus/minus gumbi",eco_temperature:"Eco temperatura",set_current_as_main:"Zamijeni prikaz željene i trenutne temperature"}}},ot={window_open:"Prozor otvoren",window_closed:"Prozor zatvoren",night_mode:"Noćni način",eco:"Eco",summer:"Ljeto",cooling:"Hlađenje",heating:"Grijanje",cooling_off:"Hlađenje isključeno",heating_off:"Grijanje isključeno"},nt={common:it,editor:at,extra_states:ot},rt={version:"Verzió",current:"Aktuális",current_humidity:"Jelenlegi páratartalom",current_temperature:"Jelenlegi hőmérséklet",target_temperature:"Célhőmérséklet"},st={card:{climate:{disable_window:"Ablak kikapcsolás",disable_summer:"Nyár kikapcsolás",disable_eco:"Eco kikapcsolás",disable_heat:"Fűtés kikacsolás",disable_off:"Kikapcsolás inaktiválás",disable_menu:"Menü letiltása",disable_battery_warning:"Akkumulátor figyelmeztetés letiltása",disable_buttons:"Plusz/mínusz gombok letiltása",eco_temperature:"Eco hőmérséklet",set_current_as_main:"Aktuális hőmérséklet használata"}}},lt={window_open:"Ablak nyitva",window_closed:"Ablak zárva",night_mode:"Éjszakai mód",eco:"Eco",summer:"Nyár",cooling:"Hűtés",heating:"Fűtés",cooling_off:"Hűtés kikapcsolva",heating_off:"Fűtés kikapcsolva"},ct={common:rt,editor:st,extra_states:lt},dt={version:"Version",current:"Nuværende",current_humidity:"Nuværende fugtighed",current_temperature:"Nuværende temperatur",target_temperature:"Målt temperatur"},ut={card:{climate:{disable_window:"Deaktiver vindue-åben indikator",disable_summer:"Deaktiver sommer indikator",disable_eco:"Deaktiver Eco indikator",disable_heat:"Deaktiver varme indikator",disable_off:"Deaktiver slukket indikator",disable_menu:"Deaktiver menu",disable_battery_warning:"Deaktiver batteriadvarsel",disable_buttons:"Deaktiver plus/minus knapper",eco_temperature:"Eco temperatur",set_current_as_main:"Erstat målt temperatur med nuværende temperatur"}}},mt={window_open:"Vindue åbent",window_closed:"Vindue lukket",night_mode:"Nattetilstand",eco:"Eco",summer:"Sommer",cooling:"Køling",heating:"Opvarmning",cooling_off:"Køling slukket",heating_off:"Opvarmning slukket"},ht={common:dt,editor:ut,extra_states:mt},pt={version:"Versión",current:"Actual",current_humidity:"Humedad actual",current_temperature:"Temperatura actual",target_temperature:"Temperatura objetivo"},_t={card:{climate:{disable_window:"Deshabilitar ventana",disable_summer:"Deshabilitar verano",disable_eco:"Deshabilitar eco",disable_heat:"Deshabilitar calor",disable_off:"Deshabilitar apagado",disable_menu:"Deshabilitar menú",disable_battery_warning:"Deshabilitar alerta de batería",disable_buttons:"Deshabilitar botones más/menos",eco_temperature:"Temperatura Eco",set_current_as_main:"Fijar temperatura objetivo a temperatura actual"}}},ft={window_open:"Ventana abierta",window_closed:"Ventana cerrada",night_mode:"Modo noche",eco:"Eco",summer:"Verano",cooling:"Enfriamiento",heating:"Calefacción",cooling_off:"Enfriamiento apagado",heating_off:"Calefacción apagada"},gt={common:pt,editor:_t,extra_states:ft},bt={version:"versiyon",current:"şimdiki",current_humidity:"Mevcut Nem",current_temperature:"Mevcut Sıcaklık",target_temperature:"Hedef Sıcaklık"},vt={card:{climate:{disable_window:"Pencereyi devre dışı bırak",disable_summer:"Yazı devre dışı bırak",disable_eco:"Eco'yu devre dışı bırak",disable_heat:"Isıtmayı devre dışı bırak",disable_off:"Kapatmayı devre dışı bırak",disable_menu:"Menüyü devre dışı bırak",disable_battery_warning:"Pil uyarısını devre dışı bırak",disable_buttons:"Artı/eksi düğmelerini devre dışı bırak",eco_temperature:"Eco sıcaklık",set_current_as_main:"Hedef ve mevcut sıcaklık yerlerini değiştir"}}},yt={window_open:"Pencere açık",window_closed:"Pencere kapalı",night_mode:"Gece modu",eco:"Eco",summer:"Yaz",cooling:"Soğutma",heating:"Isıtma",cooling_off:"Soğutma kapalı",heating_off:"Isıtma kapalı"},wt={common:bt,editor:vt,extra_states:yt},kt={version:"versione",current:"Corrente",current_humidity:"Umidità attuale",current_temperature:"Temperatura attuale",target_temperature:"Temperatura obiettivo"},$t={card:{climate:{disable_window:"Disabilita indicatore Finestra",disable_summer:"Disabilita indicatore Estate",disable_eco:"Disabilita tasto eco",disable_heat:"Disabilita tasto heat",disable_off:"Disabililita tasto off",disable_menu:"Disabilita menu",disable_battery_warning:"Disabilita avviso batteria",disable_buttons:"Disabilita pulsanti più/meno",eco_temperature:"Temperatura target",set_current_as_main:"Imposta la temperatura attuale come target"}}},xt={window_open:"Finestra aperta",window_closed:"Finestra chiusa",night_mode:"Modalità notturna",eco:"Eco",summer:"Estate",cooling:"Raffreddamento",heating:"Riscaldamento",cooling_off:"Raffreddamento spento",heating_off:"Riscaldamento spento"},At={common:kt,editor:$t,extra_states:xt},Ct={version:"Versão",current:"Atual",current_humidity:"Humidade atual",current_temperature:"Temperatura atual",target_temperature:"Temperatura alvo"},Et={card:{climate:{disable_window:"Desactivar Janela",disable_summer:"Desactivar Verão",disable_eco:"Desactivar Eco",disable_heat:"Desactivar Aquecimento",disable_off:"Desactivar Off",disable_menu:"Desativar menu",disable_battery_warning:"Desativar aviso de bateria",disable_buttons:"Desativar botões de mais/menos",eco_temperature:"Modo Eco",set_current_as_main:"Mudar para a temperatura local actual"}}},zt={window_open:"Janela aberta",window_closed:"Janela fechada",night_mode:"Modo noturno",eco:"Eco",summer:"Verão",cooling:"Refrigeração",heating:"Aquecimento",cooling_off:"Refrigeração desligada",heating_off:"Aquecimento desligado"},jt={common:Ct,editor:Et,extra_states:zt},St={version:"版本",current:"当前",current_humidity:"当前湿度",current_temperature:"当前温度",target_temperature:"目标温度"},Dt={card:{climate:{disable_window:"禁用窗口打开显示",disable_summer:"禁用夏季显示",disable_eco:"禁用节能显示",disable_heat:"禁用加热显示",disable_off:"禁用关闭显示",disable_menu:"禁用菜单",disable_battery_warning:"禁用电池警告",disable_buttons:"禁用加/减按钮",eco_temperature:"节能温度",set_current_as_main:"将目标温度与当前温度交换"}}},Ot={window_open:"窗口打开",window_closed:"窗口关闭",night_mode:"夜间模式",eco:"节能",summer:"夏季",cooling:"冷却",heating:"加热",cooling_off:"冷却关闭",heating_off:"加热关闭"},Tt={common:St,editor:Dt,extra_states:Ot},Ht={version:"версія",current:"поточний",current_humidity:"Поточна вологість",current_temperature:"Поточна температура",target_temperature:"Цільова температура"},Pt={card:{climate:{disable_window:"Прибрати вікно",disable_summer:"Прибрати літо",disable_eco:"Прибрати еко",disable_heat:"Прибрати обігрів",disable_off:"Прибрати відключення",disable_menu:"Прибрати меню",disable_battery_warning:"Прибрати попередження про акумулятор",disable_buttons:"Прибрати кнопки плюс/мінус",eco_temperature:"Еко температура",set_current_as_main:"Поміняйте місцями цільову з поточною температурою"}}},Mt={window_open:"Вікно відкрите",window_closed:"Вікно закрите",night_mode:"Нічний режим",eco:"Еко",summer:"Літо",cooling:"Охолодження",heating:"Опалення",cooling_off:"Охолодження вимкнено",heating_off:"Опалення вимкнено"},Nt={common:Ht,editor:Pt,extra_states:Mt},Vt={version:"Έκδοση",current:"Τρέχων",current_humidity:"Τρέχουσα υγρασία",current_temperature:"Τρέχουσα θερμοκρασία",target_temperature:"Στόχος θερμοκρασίας"},Lt={card:{climate:{disable_window:"Απενεργοποίηση ένδειξης ανοιχτού παραθύρου",disable_summer:"Απενεργοποίηση ένδειξης καλοκαιριού",disable_eco:"Απενεργοποίηση ένδειξης eco",disable_heat:"Απενεργοποίηση ένδειξης θέρμανσης",disable_off:"Απενεργοποίηση ένδειξης απενεργοποίησης",disable_menu:"Απενεργοποίηση μενού",disable_battery_warning:"Απενεργοποίηση προειδοποίησης μπαταρίας",disable_buttons:"Απενεργοποίηση κουμπιών συν/πλην",eco_temperature:"Eco θερμοκρασία",set_current_as_main:"Ανταλλαγή στόχου θερμοκρασίας με την τρέχουσα θερμοκρασία"}}},Rt={window_open:"Παράθυρο ανοιχτό",window_closed:"Παράθυρο κλειστό",night_mode:"Λειτουργία νυκτός",eco:"Εξοικονόμηση",summer:"Καλοκαίρι",cooling:"Ψύξη",heating:"Θέρμανση",cooling_off:"Ψύξη απενεργοποιημένη",heating_off:"Θέρμανση απενεργοποιημένη"},It={common:Vt,editor:Lt,extra_states:Rt},Ut={version:"versie",current:"huidig",current_humidity:"Huidige luchtvochtigheid",current_temperature:"Huidige temperatuur",target_temperature:"Doeltemperatuur"},Ft={card:{climate:{disable_window:"Venster-open-weergave uitschakelen",disable_summer:"Zomerweergave uitschakelen",disable_eco:"Eco-weergave uitschakelen",disable_heat:"Verwarmingsweergave uitschakelen",disable_off:"Uit-weergave uitschakelen",disable_menu:"Menu uitschakelen",disable_battery_warning:"Batterijwaarschuwing uitschakelen",disable_buttons:"Plus/min-knoppen uitschakelen",eco_temperature:"Eco temperatuur",set_current_as_main:"Doeltemperatuur verwisselen met huidige temperatuur"}}},Zt={window_open:"Venster open",window_closed:"Venster gesloten",night_mode:"Nachtmodus",eco:"Eco",summer:"Zomer",cooling:"Koeling",heating:"Verwarming",cooling_off:"Koeling uit",heating_off:"Verwarming uit"},Bt={current_temperature:"Huidige temperatuur",target_temperature:"Doel temperatuur"},Wt={change_function:"Wijzig functie",automatic:"Automatisch",holiday:"Vakantie",extend:"Verleng",fireplace:"Haard",manual:"Handmatig"},Kt={submit:"STEL IN",cancel:"AFBREKEN",clear:"WISSEN",depart:"Vertrek",return:"Aankomst",datetime:"(datum en tijd)",note:"Let op: in vakantiemodus wordt de warmwaterstand op ECO gezet"},qt={common:Ut,editor:Ft,extra_states:Zt,top:Bt,bottom:Wt,holiday:Kt},Jt={version:"versjon",current:"nåværende",current_humidity:"Nåværende luftfuktighet",current_temperature:"Nåværende temperatur",target_temperature:"Måltemperatur"},Yt={card:{climate:{disable_window:"Deaktiver vindu-åpen visning",disable_summer:"Deaktiver sommer visning",disable_eco:"Deaktiver eco visning",disable_heat:"Deaktiver varme visning",disable_off:"Deaktiver av visning",disable_menu:"Deaktiver meny",disable_battery_warning:"Deaktiver batterivarsel",disable_buttons:"Deaktiver pluss/minus knapper",eco_temperature:"Eco temperatur",set_current_as_main:"Bytt måltemperatur med nåværende temperatur"}}},Gt={window_open:"Vindu åpent",window_closed:"Vindu lukket",night_mode:"Nattmodus",eco:"Eco",summer:"Sommer",cooling:"Kjøling",heating:"Oppvarming",cooling_off:"Kjøling av",heating_off:"Oppvarming av"},Xt={common:Jt,editor:Yt,extra_states:Gt},Qt={version:"Verze",current:"Aktuální",current_humidity:"Aktuální vlhkost",current_temperature:"Aktuální teplota",target_temperature:"Cílová teplota"},ei={card:{climate:{disable_window:"Zakázat okno",disable_summer:"Zakázat léto",disable_eco:"Zakázat eco",disable_heat:"Zakázat topení",disable_off:"Zakázat vypnuto",disable_menu:"Zakázat menu",disable_battery_warning:"Zakázat upozornění baterie",disable_buttons:"Zakázat tlačítka plus/minus",eco_temperature:"Eco teplota",set_current_as_main:"Prohodit místa cílovoé a aktáalní teploty"}}},ti={window_open:"Okno otevřeno",window_closed:"Okno zavřeno",night_mode:"Noční režim",eco:"Eco",summer:"Léto",cooling:"Chlazení",heating:"Topení",cooling_off:"Chlazení vypnuto",heating_off:"Topení vypnuto"},ii={common:Qt,editor:ei,extra_states:ti},ai={version:"različica",current:"trenutno",current_humidity:"Trenutna vlažnost",current_temperature:"Trenutna temperatura",target_temperature:"Ciljna temperatura"},oi={card:{climate:{disable_window:"Onemogoči prikaz odprtega okna",disable_summer:"Onemogoči prikaz poletja",disable_eco:"Onemogoči prikaz eco",disable_heat:"Onemogoči prikaz ogrevanja",disable_off:"Onemogoči prikaz izklopa",disable_menu:"Onemogoči meni",disable_battery_warning:"Onemogoči opozorilo o bateriji",disable_buttons:"Onemogoči gumbe plus/minus",eco_temperature:"Eco temperatura",set_current_as_main:"Zamenjaj ciljno temperaturo s trenutno temperaturo"}}},ni={window_open:"Okno odprto",window_closed:"Okno zaprto",night_mode:"Nočni način",eco:"Eko",summer:"Poletje",cooling:"Hlajenje",heating:"Ogrevanje",cooling_off:"Hlajenje izklopljeno",heating_off:"Ogrevanje izklopljeno"},ri={common:ai,editor:oi,extra_states:ni},si={version:"version",current:"Nuvarande",current_humidity:"Nuvarande luftfuktighet",current_temperature:"Nuvarande temperatur",target_temperature:"Måltemperatur"},li={card:{climate:{disable_window:"Inaktivera fönster-öppen visning",disable_summer:"Inaktivera sommar visning",disable_eco:"Inaktivera eco visning",disable_heat:"Inaktivera värme visning",disable_off:"Inaktivera av visning",disable_menu:"Inaktivera meny",disable_battery_warning:"Inaktivera batterivarning",disable_buttons:"Inaktivera plus/minus knappar",eco_temperature:"Eco temperatur",set_current_as_main:"Byt måltemperatur med nuvarande temperatur"}}},ci={window_open:"Fönster öppet",window_closed:"Fönster stängt",night_mode:"Nattläge",eco:"Eco",summer:"Sommar",cooling:"Kylning",heating:"Uppvärmning",cooling_off:"Kylning av",heating_off:"Uppvärmning av"},di={common:si,editor:li,extra_states:ci},ui={version:"Версия",current:"Текущ",current_humidity:"Текуща влажност",current_temperature:"Текуща температура",target_temperature:"Целева температура"},mi={card:{climate:{disable_window:"Деактивиране на показване на отворен прозорец",disable_summer:"Деактивиране на показване на лято",disable_eco:"Деактивиране на показване на еко",disable_heat:"Деактивиране на показване на отопление",disable_off:"Деактивиране на показване на изключено",disable_menu:"Деактивиране на менюто",disable_battery_warning:"Деактивиране на предупреждение за батерията",disable_buttons:"Деактивиране на бутоните плюс/минус",eco_temperature:"Еко температура",set_current_as_main:"Размяна на целевата температура с текущата температура"}}},hi={window_open:"Прозорецът е отворен",window_closed:"Прозорецът е затворен",night_mode:"Нощен режим",eco:"Екологичен режим",summer:"Лято",cooling:"Охлаждане",heating:"Отопление",cooling_off:"Охлаждането е изключено",heating_off:"Отоплението е изключено"},pi={common:ui,editor:mi,extra_states:hi},_i={version:"Versio",current:"Nykyinen",current_humidity:"Nykyinen kosteus",current_temperature:"Nykyinen lämpötila",target_temperature:"Tavoitelämpötila"},fi={card:{climate:{disable_window:"Poista ikkuna auki -ilmoitus käytöstä",disable_summer:"Poista kesä -ilmoitus käytöstä",disable_eco:"Poista Eco -ilmoitus käytöstä",disable_heat:"Poista lämmitys -ilmoitus käytöstä",disable_off:"Poista pois päältä -ilmoitus käytöstä",disable_menu:"Poista valikko käytöstä",disable_battery_warning:"Poista akun varoitus käytöstä",disable_buttons:"Poista plus/miinus -painikkeet käytöstä",eco_temperature:"Eco lämpötila",set_current_as_main:"Vaihda tavoitelämpötila nykyiseen lämpötilaan"}}},gi={window_open:"Ikkuna auki",window_closed:"Ikkuna kiinni",night_mode:"Yötila",eco:"Eco",summer:"Kesä",cooling:"Jäähdytys",heating:"Lämmitys",cooling_off:"Jäähdytys pois päältä",heating_off:"Lämmitys pois päältä"},bi={common:_i,editor:fi,extra_states:gi},vi={version:"versiune",current:"curent",current_humidity:"Umiditate curentă",current_temperature:"Temperatură curentă",target_temperature:"Temperatură țintă"},yi={card:{climate:{disable_window:"Dezactivează fereastra",disable_summer:"Dezactivează vara",disable_eco:"Dezactivează eco",disable_heat:"Dezactivează încălzirea",disable_off:"Dezactivează oprirea",disable_menu:"Dezactivează meniul",disable_battery_warning:"Dezactivează avertizarea bateriei",disable_buttons:"Dezactivează butoanele plus/minus",eco_temperature:"Temperatura eco",set_current_as_main:"Schimbă locurile temperaturii țintă cu cea curentă"}}},wi={window_open:"Fereastră deschisă",window_closed:"Fereastră închisă",night_mode:"Mod noapte",eco:"Eco",summer:"Vara",cooling:"Răcire",heating:"Încălzire",cooling_off:"Răcire oprită",heating_off:"Încălzire oprită"},ki={common:vi,editor:yi,extra_states:wi},$i={version:"Versió",current:"Actual",current_humidity:"Humitat actual",current_temperature:"Temperatura actual",target_temperature:"Temperatura objectiu"},xi={card:{climate:{disable_window:"Desactivar indicador de finestra oberta",disable_summer:"Desactivar indicador d'estiu",disable_eco:"Desactivar indicador eco",disable_heat:"Desactivar indicador de calefacció",disable_off:"Desactivar indicador d'apagat",disable_menu:"Desactivar menú",disable_battery_warning:"Desactivar advertència de bateria",disable_buttons:"Desactivar botons de més/menys",eco_temperature:"Temperatura eco",set_current_as_main:"Intercanviar la temperatura objectiu amb la temperatura actual"}}},Ai={window_open:"Finestra oberta",window_closed:"Finestra tancada",night_mode:"Mode nocturn",eco:"Eco",summer:"Estiu",cooling:"Refredament",heating:"Escalfament",cooling_off:"Refredament apagat",heating_off:"Escalfament apagat"},Ci={common:$i,editor:xi,extra_states:Ai},Ei={version:"versijas",current:"pašreizējais",current_humidity:"Pašreizējais mitrums",current_temperature:"Pašreizējā temperatūra",target_temperature:"Mērķa temperatūra"},zi={card:{climate:{disable_window:"Atspējot logu indikatoru",disable_summer:"Atspējot vasaras režīmu",disable_eco:"Atspējot ekonomisko režīmu",disable_heat:"Atspējot sildīšanas režīmu",disable_off:"Atspējot izslēgšanu",disable_menu:"Atspējot izvēlni",disable_battery_warning:"Atspējot baterijas brīdinājumu",disable_buttons:"Atspējot plus/mīnus pogas",eco_temperature:"Eko režīma temperatūra",set_current_as_main:"Apmainīt pašreizējo un mērķa temperatūru vietām"}}},ji={window_open:"Logs atvērts",window_closed:"Logs aizvērts",night_mode:"Nakts režīms",eco:"Eko režīms",summer:"Vasaras režīms",cooling:"Dzesēšana",heating:"Apkure",cooling_off:"Dzesēšana izslēgta",heating_off:"Apkure izslēgta"},Si={common:Ei,editor:zi,extra_states:ji};const Di={en:De,de:Me,fr:Ie,ru:We,sk:Object.freeze({__proto__:null,common:Xe,default:tt,editor:Qe,extra_states:et}),hr:Object.freeze({__proto__:null,common:it,default:nt,editor:at,extra_states:ot}),hu:Object.freeze({__proto__:null,common:rt,default:ct,editor:st,extra_states:lt}),pl:Ge,da:Object.freeze({__proto__:null,common:dt,default:ht,editor:ut,extra_states:mt}),es:Object.freeze({__proto__:null,common:pt,default:gt,editor:_t,extra_states:ft}),tr:Object.freeze({__proto__:null,common:bt,default:wt,editor:vt,extra_states:yt}),it:Object.freeze({__proto__:null,common:kt,default:At,editor:$t,extra_states:xt}),pt:Object.freeze({__proto__:null,common:Ct,default:jt,editor:Et,extra_states:zt}),cn:Object.freeze({__proto__:null,common:St,default:Tt,editor:Dt,extra_states:Ot}),uk:Object.freeze({__proto__:null,common:Ht,default:Nt,editor:Pt,extra_states:Mt}),el:Object.freeze({__proto__:null,common:Vt,default:It,editor:Lt,extra_states:Rt}),nl:Object.freeze({__proto__:null,bottom:Wt,common:Ut,default:qt,editor:Ft,extra_states:Zt,holiday:Kt,top:Bt}),no:Object.freeze({__proto__:null,common:Jt,default:Xt,editor:Yt,extra_states:Gt}),cs:Object.freeze({__proto__:null,common:Qt,default:ii,editor:ei,extra_states:ti}),sl:Object.freeze({__proto__:null,common:ai,default:ri,editor:oi,extra_states:ni}),sv:Object.freeze({__proto__:null,common:si,default:di,editor:li,extra_states:ci}),bg:Object.freeze({__proto__:null,common:ui,default:pi,editor:mi,extra_states:hi}),fi:Object.freeze({__proto__:null,common:_i,default:bi,editor:fi,extra_states:gi}),ro:Object.freeze({__proto__:null,common:vi,default:ki,editor:yi,extra_states:wi}),ca:Object.freeze({__proto__:null,common:$i,default:Ci,editor:xi,extra_states:Ai}),lv:Object.freeze({__proto__:null,common:Ei,default:Si,editor:zi,extra_states:ji})},Oi="en";function Ti({hass:e,string:t,search:i="",replace:a=""}){var o;const n=null!==(o=null==e?void 0:e.locale.language)&&void 0!==o?o:Oi;let r;try{r=t.split(".").reduce((e,t)=>e[t],Di[n])}catch(e){r=t.split(".").reduce((e,t)=>e[t],Di.en)}return void 0===r&&(r=t.split(".").reduce((e,t)=>e[t],Di.en)),""!==i&&""!==a&&(r=r.replace(i,a)),r}function Hi(e,t){try{return e.split(".").reduce((e,t)=>e[t],Di[t])}catch(e){return}}var Pi,Mi,Ni=Number.isNaN||function(e){return"number"==typeof e&&e!=e};function Vi(e,t){return e===t||!(!Ni(e)||!Ni(t))}function Li(e,t){if(e.length!==t.length)return!1;for(var i=0;i<e.length;i++)if(!Vi(e[i],t[i]))return!1;return!0}function Ri(e,t){void 0===t&&(t=Li);var i=null;function a(){for(var a=[],o=0;o<arguments.length;o++)a[o]=arguments[o];if(i&&i.lastThis===this&&t(a,i.lastArgs))return i.lastResult;var n=e.apply(this,a);return i={lastResult:n,lastArgs:a,lastThis:this},n}return a.clear=function(){i=null},a}Ri(e=>new Intl.DateTimeFormat(e.language,{weekday:"long",month:"long",day:"numeric"})),Ri(e=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric"})),Ri(e=>new Intl.DateTimeFormat(e.language,{year:"numeric",month:"numeric",day:"numeric"})),Ri(e=>new Intl.DateTimeFormat(e.language,{day:"numeric",month:"short"})),Ri(e=>new Intl.DateTimeFormat(e.language,{month:"long",year:"numeric"})),Ri(e=>new Intl.DateTimeFormat(e.language,{month:"long"})),Ri(e=>new Intl.DateTimeFormat(e.language,{year:"numeric"})),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Pi||(Pi={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Mi||(Mi={}));const Ii=Ri(e=>{if(e.time_format===Mi.language||e.time_format===Mi.system){const t=e.time_format===Mi.language?e.language:void 0,i=(new Date).toLocaleString(t);return i.includes("AM")||i.includes("PM")}return e.time_format===Mi.am_pm});Ri(e=>new Intl.DateTimeFormat("en"!==e.language||Ii(e)?e.language:"en-u-hc-h23",{year:"numeric",month:"long",day:"numeric",hour:Ii(e)?"numeric":"2-digit",minute:"2-digit",hour12:Ii(e)})),Ri(e=>new Intl.DateTimeFormat("en"!==e.language||Ii(e)?e.language:"en-u-hc-h23",{year:"numeric",month:"long",day:"numeric",hour:Ii(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:Ii(e)})),Ri(e=>new Intl.DateTimeFormat("en"!==e.language||Ii(e)?e.language:"en-u-hc-h23",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",hour12:Ii(e)})),Ri(e=>new Intl.DateTimeFormat("en"!==e.language||Ii(e)?e.language:"en-u-hc-h23",{hour:"numeric",minute:"2-digit",hour12:Ii(e)})),Ri(e=>new Intl.DateTimeFormat("en"!==e.language||Ii(e)?e.language:"en-u-hc-h23",{hour:Ii(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:Ii(e)})),Ri(e=>new Intl.DateTimeFormat("en"!==e.language||Ii(e)?e.language:"en-u-hc-h23",{weekday:"long",hour:Ii(e)?"numeric":"2-digit",minute:"2-digit",hour12:Ii(e)}));const Ui=(e,t,i,a)=>{a=a||{},i=null==i?{}:i;const o=new Event(t,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return o.detail=i,e.dispatchEvent(o),o},Fi=(e,t,i)=>Math.min(Math.max(e,t),i),Zi=(e,t,i)=>{const a=t?(e=>{switch(e.number_format){case Pi.comma_decimal:return["en-US","en"];case Pi.decimal_comma:return["de","es","it"];case Pi.space_comma:return["fr","sv","cs"];case Pi.system:return;default:return e.language}})(t):void 0;if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},(null==t?void 0:t.number_format)!==Pi.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(a,Bi(e,i)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,Bi(e,i)).format(Number(e))}return"string"==typeof e?e:`${((e,t=2)=>Math.round(e*10**t)/10**t)(e,null==i?void 0:i.maximumFractionDigits).toString()}${"currency"===(null==i?void 0:i.style)?` ${i.currency}`:""}`},Bi=(e,t)=>{const i=Object.assign({maximumFractionDigits:2},t);if("string"!=typeof e)return i;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){const t=e.indexOf(".")>-1?e.split(".")[1].length:0;i.minimumFractionDigits=t,i.maximumFractionDigits=t}return i};class Wi extends TypeError{constructor(e,t){let i;const{message:a,explanation:o,...n}=e,{path:r}=e,s=0===r.length?a:`At path: ${r.join(".")} -- ${a}`;super(o??s),null!=o&&(this.cause=s),Object.assign(this,n),this.name=this.constructor.name,this.failures=()=>i??(i=[e,...t()])}}function Ki(e){return"object"==typeof e&&null!=e}function qi(e){return"symbol"==typeof e?e.toString():"string"==typeof e?JSON.stringify(e):`${e}`}function Ji(e,t,i,a){if(!0===e)return;!1===e?e={}:"string"==typeof e&&(e={message:e});const{path:o,branch:n}=t,{type:r}=i,{refinement:s,message:l=`Expected a value of type \`${r}\`${s?` with refinement \`${s}\``:""}, but received: \`${qi(a)}\``}=e;return{value:a,type:r,refinement:s,key:o[o.length-1],path:o,branch:n,...e,message:l}}function*Yi(e,t,i,a){(function(e){return Ki(e)&&"function"==typeof e[Symbol.iterator]})(e)||(e=[e]);for(const o of e){const e=Ji(o,t,i,a);e&&(yield e)}}function*Gi(e,t,i={}){const{path:a=[],branch:o=[e],coerce:n=!1,mask:r=!1}=i,s={path:a,branch:o};if(n&&(e=t.coercer(e,s),r&&"type"!==t.type&&Ki(t.schema)&&Ki(e)&&!Array.isArray(e)))for(const i in e)void 0===t.schema[i]&&delete e[i];let l="valid";for(const a of t.validator(e,s))a.explanation=i.message,l="not_valid",yield[a,void 0];for(let[c,d,u]of t.entries(e,s)){const t=Gi(d,u,{path:void 0===c?a:[...a,c],branch:void 0===c?o:[...o,d],coerce:n,mask:r,message:i.message});for(const i of t)i[0]?(l=null!=i[0].refinement?"not_refined":"not_valid",yield[i[0],void 0]):n&&(d=i[1],void 0===c?e=d:e instanceof Map?e.set(c,d):e instanceof Set?e.add(d):Ki(e)&&(void 0!==d||c in e)&&(e[c]=d))}if("not_valid"!==l)for(const a of t.refiner(e,s))a.explanation=i.message,l="not_refined",yield[a,void 0];"valid"===l&&(yield[void 0,e])}class Xi{constructor(e){const{type:t,schema:i,validator:a,refiner:o,coercer:n=e=>e,entries:r=function*(){}}=e;this.type=t,this.schema=i,this.entries=r,this.coercer=n,this.validator=a?(e,t)=>Yi(a(e,t),t,this,e):()=>[],this.refiner=o?(e,t)=>Yi(o(e,t),t,this,e):()=>[]}assert(e,t){return Qi(e,this,t)}create(e,t){return function(e,t,i){const a=ea(e,t,{coerce:!0,message:i});if(a[0])throw a[0];return a[1]}(e,this,t)}is(e){return function(e,t){const i=ea(e,t);return!i[0]}(e,this)}mask(e,t){return function(e,t,i){const a=ea(e,t,{coerce:!0,mask:!0,message:i});if(a[0])throw a[0];return a[1]}(e,this,t)}validate(e,t={}){return ea(e,this,t)}}function Qi(e,t,i){const a=ea(e,t,{message:i});if(a[0])throw a[0]}function ea(e,t,i={}){const a=Gi(e,t,i),o=function(e){const{done:t,value:i}=e.next();return t?void 0:i}(a);if(o[0]){const e=new Wi(o[0],function*(){for(const e of a)e[0]&&(yield e[0])});return[e,void 0]}return[void 0,o[1]]}function ta(e,t){return new Xi({type:e,schema:null,validator:t})}function ia(e){return new Xi({type:"array",schema:e,*entries(t){if(e&&Array.isArray(t))for(const[i,a]of t.entries())yield[i,a,e]},coercer:e=>Array.isArray(e)?e.slice():e,validator:e=>Array.isArray(e)||`Expected an array value, but received: ${qi(e)}`})}function aa(){return ta("boolean",e=>"boolean"==typeof e)}function oa(e){const t=qi(e),i=typeof e;return new Xi({type:"literal",schema:"string"===i||"number"===i||"boolean"===i?e:null,validator:i=>i===e||`Expected the literal \`${t}\`, but received: ${qi(i)}`})}function na(){return ta("number",e=>"number"==typeof e&&!isNaN(e)||`Expected a number, but received: ${qi(e)}`)}function ra(e){const t=e?Object.keys(e):[],i=ta("never",()=>!1);return new Xi({type:"object",schema:e||null,*entries(a){if(e&&Ki(a)){const o=new Set(Object.keys(a));for(const i of t)o.delete(i),yield[i,a[i],e[i]];for(const e of o)yield[e,a[e],i]}},validator:e=>Ki(e)||`Expected an object, but received: ${qi(e)}`,coercer:e=>Ki(e)?{...e}:e})}function sa(e){return new Xi({...e,validator:(t,i)=>void 0===t||e.validator(t,i),refiner:(t,i)=>void 0===t||e.refiner(t,i)})}function la(){return ta("string",e=>"string"==typeof e||`Expected a string, but received: ${qi(e)}`)}function ca(e){const t=Object.keys(e);return new Xi({type:"type",schema:e,*entries(i){if(Ki(i))for(const a of t)yield[a,i[a],e[a]]},validator:e=>Ki(e)||`Expected an object, but received: ${qi(e)}`,coercer:e=>Ki(e)?{...e}:e})}function da(e){const t=e.map(e=>e.type).join(" | ");return new Xi({type:"union",schema:null,coercer(t){for(const i of e){const[e,a]=i.validate(t,{coerce:!0});if(!e)return a}return t},validator(i,a){const o=[];for(const t of e){const[...e]=Gi(i,t,a),[n]=e;if(!n[0])return[];for(const[t]of e)t&&o.push(t)}return[`Expected the value to satisfy a union of \`${t}\`, but received: ${qi(i)}`,...o]}})}const ua=ra({user:la()}),ma=da([aa(),ra({text:sa(la()),excemptions:sa(ia(ua))})]),ha=ra({action:oa("url"),url_path:la(),confirmation:sa(ma)}),pa=ra({action:oa("call-service"),service:la(),service_data:sa(ra()),data:sa(ra()),target:sa(ra({entity_id:sa(da([la(),ia(la())])),device_id:sa(da([la(),ia(la())])),area_id:sa(da([la(),ia(la())]))})),confirmation:sa(ma)}),_a=ra({action:oa("navigate"),navigation_path:la(),confirmation:sa(ma)}),fa=ca({action:oa("fire-dom-event")}),ga=ra({action:function(e){const t={},i=e.map(e=>qi(e)).join();for(const i of e)t[i]=i;return new Xi({type:"enums",schema:t,validator:t=>e.includes(t)||`Expected one of \`${i}\`, but received: ${qi(t)}`})}(["none","toggle","more-info","call-service","url","navigate"]),confirmation:sa(ma)});var ba;ba=e=>{if(e&&"object"==typeof e&&"action"in e)switch(e.action){case"call-service":return pa;case"fire-dom-event":return fa;case"navigate":return _a;case"url":return ha}return ga},new Xi({type:"dynamic",schema:null,*entries(e,t){const i=ba(e,t);yield*i.entries(e,t)},validator:(e,t)=>ba(e,t).validator(e,t),coercer:(e,t)=>ba(e,t).coercer(e,t),refiner:(e,t)=>ba(e,t).refiner(e,t)}),r`
    #sortable a:nth-of-type(2n) paper-icon-item {
        animation-name: keyframes1;
        animation-iteration-count: infinite;
        transform-origin: 50% 10%;
        animation-delay: -0.75s;
        animation-duration: 0.25s;
    }

    #sortable a:nth-of-type(2n-1) paper-icon-item {
        animation-name: keyframes2;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        transform-origin: 30% 5%;
        animation-delay: -0.5s;
        animation-duration: 0.33s;
    }

    #sortable a {
        height: 48px;
        display: flex;
    }

    #sortable {
        outline: none;
        display: block !important;
    }

    .hidden-panel {
        display: flex !important;
    }

    .sortable-fallback {
        display: none;
    }

    .sortable-ghost {
        opacity: 0.4;
    }

    .sortable-fallback {
        opacity: 0;
    }

    @keyframes keyframes1 {
        0% {
            transform: rotate(-1deg);
            animation-timing-function: ease-in;
        }

        50% {
            transform: rotate(1.5deg);
            animation-timing-function: ease-out;
        }
    }

    @keyframes keyframes2 {
        0% {
            transform: rotate(1deg);
            animation-timing-function: ease-in;
        }

        50% {
            transform: rotate(-1.5deg);
            animation-timing-function: ease-out;
        }
    }

    .show-panel,
    .hide-panel {
        display: none;
        position: absolute;
        top: 0;
        right: 4px;
        --mdc-icon-button-size: 40px;
    }

    :host([rtl]) .show-panel {
        right: initial;
        left: 4px;
    }

    .hide-panel {
        top: 4px;
        right: 8px;
    }

    :host([rtl]) .hide-panel {
        right: initial;
        left: 8px;
    }

    :host([expanded]) .hide-panel {
        display: block;
    }

    :host([expanded]) .show-panel {
        display: inline-flex;
    }

    paper-icon-item.hidden-panel,
    paper-icon-item.hidden-panel span,
    paper-icon-item.hidden-panel ha-icon[slot="item-icon"] {
        color: var(--secondary-text-color);
        cursor: pointer;
    }
`;const va={auto:be,heat:we,eco:$e,summer:"M10 2L7.6 5.4C8.4 5.2 9.2 5 10 5C10.8 5 11.6 5.2 12.4 5.4M19 5C17.89 5 17 5.89 17 7V13.76C16.36 14.33 16 15.15 16 16C16 17.66 17.34 19 19 19C20.66 19 22 17.66 22 16C22 15.15 21.64 14.33 21 13.77V7C21 5.89 20.11 5 19 5M19 6C19.55 6 20 6.45 20 7V8H18V7C18 6.45 18.45 6 19 6M5.5 6.7L1.3 7L3.1 10.8C3.2 10 3.5 9.2 3.9 8.5C4.4 7.8 4.9 7.2 5.5 6.7M10 7C7.2 7 5 9.2 5 12C5 14.8 7.2 17 10 17C12.8 17 15 14.8 15 12C15 9.2 12.8 7 10 7M3.2 13.2L1.4 17L5.5 17.4C5 16.9 4.4 16.2 4 15.5C3.5 14.8 3.3 14 3.2 13.2M7.6 18.6L10 22L12.4 18.6C11.6 18.8 10.8 19 10 19C9.1 19 8.3 18.8 7.6 18.6Z",temperature:"M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z"};function ya(e){const t=window;t.customCards=t.customCards||[],t.customCards.push(Object.assign(Object.assign({},e),{preview:!0}))}console.info("%c  AtagOneThermostatUi-CARD \n%c  version: 1.0.0    ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),ya({type:"atagone-thermostat-ui-card",name:"AtagOne Thermostat Card",description:"Card for AtagOne entity"});let wa=class extends le{constructor(){super(),this.value={},this._selectTargetTemperature="low",this.current=0,this.min=4,this.max=27,this.step=.5,this.summer=!1,this.status="loading",this.mode="on",this.dragging=!1,this._vacationStart=null,this._vacationEnd=null,this._showHolidayEditor=!1,this._editingHoliday=!1,this.target="value",this._debouncedCallService=((e,t,i=!1)=>{let a;const o=(...o)=>{const n=i&&!a;clearTimeout(a),a=window.setTimeout(()=>{a=void 0,i||e(...o)},t),n&&e(...o)};return o.cancel=()=>{clearTimeout(a)},o})(e=>this._callService(e),1e3),this._firstRender=!0,this._hasSummer=!1,this._display_bottom=0,this._display_top=0,this.modes=[],this.error=[],this._showPresets=!1,this._swapDisplay=!1,this._leftPressed=!1,this._rightPressed=!1}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}static async getConfigElement(){return await Promise.resolve().then(function(){return za}),document.createElement("atagone-thermostat-ui-card-editor")}static async getStubConfig(e){const t=Object.keys(e.states).filter(e=>["climate"].includes(e.split(".")[0])),i=t.filter(t=>{var i;return null===(i=e.states[t].attributes)||void 0===i?void 0:i.call_for_heat});return{type:"custom:atagone-thermostat-ui-card",entity:i[0]||t[0]}}_callService(e){"high"!==e&&"low"!==e?this.hass.callService("climate","set_temperature",{entity_id:this.stateObj.entity_id,temperature:this.value.value}):this.hass.callService("climate","set_temperature",{entity_id:this.stateObj.entity_id,target_temp_low:this.value.low,target_temp_high:this.value.high})}_handleButton(e){var t;const i=e.currentTarget.target,a=e.currentTarget.step,o="high"===i?this.max:this.min;let n=null!==(t=this.value[i])&&void 0!==t?t:o;n+=a,n=Fi(n,this.min,this.max),"high"===i&&null!=this.value.low&&(n=Fi(n,this.value.low,this.max)),"low"===i&&null!=this.value.high&&(n=Fi(n,this.min,this.value.high)),this.value=Object.assign(Object.assign({},this.value),{[i]:n}),this._activateSwapDisplay(),this._updateDisplay(),this._vibrate(40),this._debouncedCallService(i)}_onLeftDown(){this._leftPressed=!0}_onLeftUp(){this._leftPressed=!1}_onRightDown(){this._rightPressed=!0}_onRightUp(){this._rightPressed=!1}setConfig(e){this._config=Object.assign({tap_action:{action:"toggle"},hold_action:{action:"more-info"}},e)}getCardSize(){return 1}_vibrate(e){try{navigator.vibrate(e)}catch(e){}}updated(e){super.updated(e),this._firstRender=!1}willUpdate(e){if(!this.hass||!this._config||!e.has("hass")&&!e.has("_config"))return;const t=this._config.entity,i=this.hass.states[t];if(!i)return;const a=e.get("hass");if(!a||a.states[t]!==i){if(!this._config||!this.hass||!this._config.entity)return;this.stateObj=i;const e=this.stateObj.attributes,t=this.stateObj.state;if(this.mode=t||"off",e.hvac_modes&&(this.modes=Object.values(e.hvac_modes)),this.value={value:(null==e?void 0:e.temperature)||0,low:(null==e?void 0:e.target_temp_low)||null,high:(null==e?void 0:e.target_temp_high)||null},e.target_temp_step&&(this.step=e.target_temp_step),e.min_temp&&(this.min=e.min_temp),e.max_temp&&(this.max=e.max_temp),e.current_temperature&&(this.current=e.current_temperature),void 0!==(null==e?void 0:e.call_for_heat)&&(this._hasSummer=!0,this.summer=!e.call_for_heat),void 0!==(null==e?void 0:e.errors)){const t=JSON.parse(e.errors);t.length>0?this.error=t[0]:this.error=[]}else this.error=[];this._updateDisplay()}}_isTopShowingTarget(){var e;return!!this._swapDisplay||!(null===(e=this._config)||void 0===e?void 0:e.set_current_as_main)}_isBottomShowingTarget(){return!this._isTopShowingTarget()}_updateDisplay(){var e;if(this._swapDisplay)return this._display_top=this._getCurrentSetpoint(),void(this._display_bottom=this.current);const t=this._getCurrentSetpoint(),i=this.current;(null===(e=null==this?void 0:this._config)||void 0===e?void 0:e.set_current_as_main)?(this._display_top=i,this._display_bottom=t):(this._display_top=t,this._display_bottom=i)}_handleAction(e){var t,i,a,o,n;if("eco"===e.currentTarget.mode){null===((null===(i=null===(t=null==this?void 0:this.stateObj)||void 0===t?void 0:t.attributes)||void 0===i?void 0:i.saved_temperature)||null)?this.hass.callService("atagone_thermostat","set_temp_target_temperature",{entity_id:this._config.entity,temperature:(null===(a=this._config)||void 0===a?void 0:a.eco_temperature)||18}):this.hass.callService("atagone_thermostat","restore_saved_target_temperature",{entity_id:this._config.entity})}else{null!==((null===(n=null===(o=null==this?void 0:this.stateObj)||void 0===o?void 0:o.attributes)||void 0===n?void 0:n.saved_temperature)||null)&&this.hass.callService("atagone_thermostat","restore_saved_target_temperature",{entity_id:this._config.entity}),this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:e.currentTarget.mode})}}_activateSwapDisplay(){this._swapDisplay=!0,this._swapTimeout&&clearTimeout(this._swapTimeout),this._swapTimeout=window.setTimeout(()=>{this._swapDisplay=!1,this._updateDisplay()},3e3)}_setTemperature(){this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:this.value})}_getCurrentSetpoint(){var e,t,i,a,o,n,r,s;return null!==(null===(e=null==this?void 0:this.value)||void 0===e?void 0:e.high)&&null!==(null===(t=null==this?void 0:this.value)||void 0===t?void 0:t.low)?((null===(i=null==this?void 0:this.value)||void 0===i?void 0:i.low)||0)>=this.current?(null===(a=null==this?void 0:this.value)||void 0===a?void 0:a.low)||0:((null===(o=null==this?void 0:this.value)||void 0===o?void 0:o.high)||0)<=this.current?(null===(n=null==this?void 0:this.value)||void 0===n?void 0:n.high)||0:(null===(r=null==this?void 0:this.value)||void 0===r?void 0:r.low)||0:(null===(s=null==this?void 0:this.value)||void 0===s?void 0:s.value)||0}_renderIcon(e,t){if(!va[e])return F``;const i=this.hass.localize(`component.climate.state._.${e}`)||Ti({hass:this.hass,string:`extra_states.${e}`});return F`
      <ha-icon-button
        title="${t===e?e:""}"
        class=${ge({"selected-icon":t===e})}
        .mode=${e}
        @click=${this._handleAction}
        tabindex="0"
        .path=${va[e]}
        .label=${i}
      >
      </ha-icon-button>
    `}_nowRounded(){const e=new Date;return e.setSeconds(0),e.setMilliseconds(0),e}_handleMoreInfo(){Ui(this,"hass-more-info",{entityId:this._config.entity})}_setPreset(e){if(this.hass&&this._config&&this.stateObj)if("holiday"!==e)this._showPresets=!1,this._editingHoliday=!1,this.hass.callService("climate","set_preset_mode",{entity_id:this._config.entity,preset_mode:e});else if(this._editingHoliday=!0,!this._vacationStart){const e=this._nowRounded(),t=new Date(e.getTime()+6048e5);this._vacationStart=e,this._vacationEnd=t}}_renderPresetIcon(e){switch(e){case"auto":return F`<ha-svg-icon .path=${be}></ha-svg-icon>`;case"holiday":return F`<ha-svg-icon .path=${"M9.5 18V9H8V18M12.75 18V9H11.25V18M16 18V9H14.5V18M17.03 6C18.11 6 19 6.88 19 8V19C19 20.13 18.11 21 17.03 21C17.03 21.58 16.56 22 16 22C15.5 22 15 21.58 15 21H9C9 21.58 8.5 22 8 22C7.44 22 6.97 21.58 6.97 21C5.89 21 5 20.13 5 19V8C5 6.88 5.89 6 6.97 6H9V3C9 2.42 9.46 2 10 2H14C14.54 2 15 2.42 15 3V6M10.5 3.5V6H13.5V3.5M17.03 19V8H6.97V19"}></ha-svg-icon>`;case"fireplace":return F`<ha-svg-icon .path=${we}></ha-svg-icon>`;default:return F`<ha-svg-icon .path=${ke}></ha-svg-icon>`}}_sevenDaysFromNow(){const e=new Date;return e.setDate(e.getDate()+7),e}_toLocalInputValue(e){if(!e)return"";const t=e=>String(e).padStart(2,"0"),i=new Date(e);return`${i.getFullYear()}-${t(i.getMonth()+1)}-${t(i.getDate())}T${t(i.getHours())}:${t(i.getMinutes())}`}_fromLocalInputValue(e){return e?new Date(e):null}_todayAt(e=12){const t=new Date;return t.setSeconds(0),t.setMilliseconds(0),t.setHours(e,0,0,0),t}_plusDays(e,t){const i=new Date(e);return i.setDate(i.getDate()+t),i}_submitHoliday(){var e,t,i;if(!this.hass||!this._config)return;if(!this._vacationStart||!this._vacationEnd)return;const a=this._vacationStart.toISOString(),o=this._vacationEnd.toISOString(),n=a.substring(0,10),r=a.substring(11,19),s=o.substring(0,10),l=o.substring(11,19),c=null!==(i=null===(t=null===(e=this.stateObj)||void 0===e?void 0:e.attributes)||void 0===t?void 0:t.temperature)&&void 0!==i?i:18;this.hass.callService("atagone","create_vacation",{entity_id:this._config.entity,start_date:n,start_time:r,end_date:s,end_time:l,heat_temp:c}),this._showHolidayEditor=!1,this._showPresets=!1}_cancelHoliday(){this._editingHoliday=!1,this._showPresets=!1}_clearHoliday(){this.hass&&this._config&&(this.hass.callService("atagone","cancel_vacation",{entity_id:this._config.entity}),this._showHolidayEditor=!1,this._showPresets=!1)}_renderHolidaySettings(){return F`
      <div class="holiday-editor">

        <div class="holiday-row">
          <div class="holiday-col-label">
            <label>Vertrek</label>
            <span class="description">(datum en tijd)</span>
          </div>

          <div class="holiday-col-input">
              <input
                class="holiday-input"
                type="datetime-local"
                .value=${this._vacationStart?this._toLocalInputValue(this._vacationStart):""}
                @change=${e=>this._vacationStart=this._fromLocalInputValue(e.target.value)}
              />
          </div>
        </div>

        <div class="holiday-row">
          <div class="holiday-col-label">
            <label>Aankomst</label>
            <span class="description">(datum en tijd)</span>
          </div>

          <div class="holiday-col-input">
              <input
                class="holiday-input"
                type="datetime-local"
                .value=${this._vacationEnd?this._toLocalInputValue(this._vacationEnd):""}
                @change=${e=>this._vacationEnd=this._fromLocalInputValue(e.target.value)}
              />
          </div>
        </div>

        <div class="holiday-row">
          <div class="holiday-col-label" style="width:100%; text-align:center;">
            <span class="description">
              <ha-svg-icon .path=${$e} style="color:#4db6ac"></ha-svg-icon>
              &nbsp;Note: in vacation mode DHW mode = ECO
            </span>
          </div>
        </div>

        <div class="holiday-buttons">
          <button class="holiday-btn holiday-btn-confirm" @click=${this._submitHoliday}>
            ${Ti({hass:this.hass,string:"holiday.submit"})||"STEL IN"}
          </button>
          <button class="holiday-btn holiday-btn-cancel" @click=${this._cancelHoliday}>
            ${Ti({hass:this.hass,string:"holiday.cancel"})||"AFBREKEN"}
          </button>
          <button class="holiday-btn holiday-btn-clear" @click=${this._clearHoliday}>
            ${Ti({hass:this.hass,string:"holiday.clear"})||"WISSEN"}
          </button>
        </div>

      </div>
    `}render(){var e,t,i,a,o,n,r,s,l,c,d,u,m,h,p,_,f,g,b,v,y,w;if(!this.hass||!this._config)return F``;const k=(null===(e=null==this?void 0:this._config)||void 0===e?void 0:e.set_current_as_main)?Ti({hass:this.hass,string:"common.current_temperature"}):Ti({hass:this.hass,string:"common.target_temperature"}),$=(null===(t=null==this?void 0:this._config)||void 0===t?void 0:t.set_current_as_main)?Ti({hass:this.hass,string:"common.target_temperature"}):Ti({hass:this.hass,string:"common.current_temperature"}),x=(null===(i=null==this?void 0:this._config)||void 0===i?void 0:i.set_current_as_main)?Ti({hass:this.hass,string:"top.current_temperature"})||"CURRENT TEMPERATURE":Ti({hass:this.hass,string:"top.target_temperature"})||"TARGET TEMPERATURE",A=(null===(a=null==this?void 0:this._config)||void 0===a?void 0:a.set_current_as_main)?Ti({hass:this.hass,string:"top.target_temperature"})||"TARGET TEMPERATURE":Ti({hass:this.hass,string:"top.current_temperature"})||"CURRENT TEMPERATURE",C=(null===(n=null===(o=this.stateObj)||void 0===o?void 0:o.attributes)||void 0===n?void 0:n.preset_mode)||"",E=Ti({hass:this.hass,string:"bottom.change_function"})||"Change function",z=Ti({hass:this.hass,string:"bottom.automatic"})||"Automatic",j=Ti({hass:this.hass,string:"bottom.holiday"})||"Holiday",S=Ti({hass:this.hass,string:"bottom.fireplace"})||"Fireplace",D=Ti({hass:this.hass,string:"bottom.manual"})||"Manual",O=this._getCurrentSetpoint(),T=this.current,H=this._isTopShowingTarget(),P=H&&O>T,M=!H&&O>T;this._swapDisplay;const N=Z`
      <text
        class=${ge({"main-value":!0,heating:P})}
        x="70"
        y="35%"
        dominant-baseline="middle"
        text-anchor="middle"
      >
        <title>${k}</title>
        ${Zi(this._display_top,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}
        <tspan dx="-25" dy="0" style="font-size: 65px;">°</tspan>
      </text>
    `,V=Z`${"unavailable"===(null===(r=null==this?void 0:this.stateObj)||void 0===r?void 0:r.state)||"unknown"===(null===(s=null==this?void 0:this.stateObj)||void 0===s?void 0:s.state)?Z`
      <text x="62.5" y="63%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">
        ${this.hass.localize("state.default.unavailable")}
      </text>`:""}`,L=Z`
      <g class=${ge({"current-info":!0,heating:M})} transform="translate(62.5,100)">
          <text
            x="5"
            dominant-baseline="middle"
            text-anchor="middle"
          >
            ${Zi(this._display_bottom,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}
            <tspan dx="-15" dy="0" style="font-size:35px;">°</tspan>
            <title>${$}</title>
          </text>
      </g>
    `,R=(null===(l=null==this?void 0:this._config)||void 0===l?void 0:l.disable_buttons)?F``:F`
        <div id="at-control-buttons">
          <div class="button">
            <at-ha-outlined-icon-left-button
                class=${ge({pressed:this._leftPressed})}
                .target=${this.target}
                .step=${-this.step}
                @mousedown=${this._onLeftDown}
                @mouseup=${this._onLeftUp}
                @mouseleave=${this._onLeftUp}
                @touchstart=${this._onLeftDown}
                @touchend=${this._onLeftUp}
                @click=${this._handleButton}
              >
              <ha-svg-icon style="width: 42px; height: 42px;" .path=${ve}></ha-svg-icon>
            </at-ha-outlined-icon-left-button>
          </div>
          <div class="button">
            <at-ha-outlined-icon-right-button
                class=${ge({pressed:this._rightPressed})}
                  .target=${this.target}
                  .step=${this.step}
                  @mousedown=${this._onRightDown}
                  @mouseup=${this._onRightUp}
                  @mouseleave=${this._onRightUp}
                  @touchstart=${this._onRightDown}
                  @touchend=${this._onRightUp}
                  @click=${this._handleButton}
              >
              <ha-svg-icon style="width: 42px; height: 42px;" .path=${ye}></ha-svg-icon>
            </at-ha-outlined-icon-right-button>
          </div>
        </div>
      `,I=F`
      <div class=${ge({"bottom-bar":!0,expanded:this._showPresets})}>
        <!-- CHANGE FUNCTION BUTTON -->
        <div
          class="bottom-button change-fn"
          @click=${()=>{this._showHolidayEditor?(this._showHolidayEditor=!1,this._showPresets=!0):this._showPresets=!this._showPresets}}
        >
          <div class="circle-button">
            <ha-svg-icon
              .path=${this._showPresets?ve:ye}
            ></ha-svg-icon>
          </div>
          <span class="label">${E}</span>
        </div>


        <!-- PRESETS -->
        ${this._showPresets?F`
              <div
                class=${ge({"bottom-button preset":!0,active:"manual"===C})}
                @click=${()=>this._setPreset("manual")}
              >
                ${this._renderPresetIcon("manual")}
                <span>${D}</span>
              </div>

              <div class=${ge({"bottom-button preset":!0,active:"auto"===C})}
                @click=${()=>this._setPreset("auto")}
              >
                ${this._renderPresetIcon("auto")}
                <span>${z}</span>
              </div>

              <div class=${ge({"bottom-button preset":!0,active:"holiday"===C})}
                @click=${()=>this._setPreset("holiday")}
              >
                ${this._renderPresetIcon("holiday")}
                <span>${j}</span>
              </div>

              <div class=${ge({"bottom-button preset":!0,active:"fireplace"===C})}
                @click=${()=>this._setPreset("fireplace")}
              >
                ${this._renderPresetIcon("fireplace")}
                <span>${S}</span>
              </div>
            `:F`
              <!-- CENTERED SELECTED PRESET -->
              <div class="bottom-button preset-centered active">
                ${this._renderPresetIcon(C)}
                <span>
                  ${(()=>{switch(C){case"auto":return z;case"holiday":return j;case"fireplace":return S;default:return D}})()}
                </span>
              </div>
            `}
      </div>
    `,U="heating"===(null===(c=this.stateObj)||void 0===c?void 0:c.attributes.hvac_action)||!0===(null===(d=this.stateObj)||void 0===d?void 0:d.attributes.call_for_heat),B="holiday"===((null===(m=null===(u=this.stateObj)||void 0===u?void 0:u.attributes)||void 0===m?void 0:m.preset_mode)||"");Ti({hass:this.hass,string:"bottom.change_function"});const W=F`
      <div class="top-indicators">
        <!-- Centered burner dot -->
        <div class=${ge({"burner-dot":!0,active:U})}></div>

        <!-- Holiday icon slightly to the right of center -->
        <div class=${ge({"holiday-icon":!0,active:B,hidden:!B})}>
          <ha-svg-icon .path=${"M17.03 6C18.11 6 19 6.88 19 8V19C19 20.13 18.11 21 17.03 21C17.03 21.58 16.56 22 16 22C15.5 22 15 21.58 15 21H9C9 21.58 8.5 22 8 22C7.44 22 6.97 21.58 6.97 21C5.89 21 5 20.13 5 19V8C5 6.88 5.89 6 6.97 6H9V3C9 2.42 9.46 2 10 2H14C14.54 2 15 2.42 15 3V6H17.03M13.5 6V3.5H10.5V6H13.5M8 9V18H9.5V9H8M14.5 9V18H16V9H14.5M11.25 9V18H12.75V9H11.25Z"}></ha-svg-icon>
        </div>
      </div>
    `;return F`
      <ha-card
        id="${(null===(h=null==this?void 0:this._config)||void 0===h?void 0:h.disable_buttons)?"":"expand"}"
        class=${ge({[this.mode]:!0})}
      >
        ${(null===(p=this._config)||void 0===p?void 0:p.disable_menu)?"":F`
            <ha-icon-button
              class="more-info"
              .label=${this.hass.localize("ui.panel.lovelace.cards.show_more_info")}
              .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}
              @click=${this._handleMoreInfo}
              tabindex="0"
            ></ha-icon-button>
          `}

        ${(null===(f=null===(_=null==this?void 0:this._config)||void 0===_?void 0:_.name)||void 0===f?void 0:f.length)?F`<div class="name">${null===(g=this._config)||void 0===g?void 0:g.name}</div>`:F`<div class="name">&nbsp;</div>`}

        <div class="center-block">
          ${W}
          <div class="top-label">${x}</div>

          <div class="content ${(null===(v=null===(b=null==this?void 0:this.stateObj)||void 0===b?void 0:b.attributes)||void 0===v?void 0:v.saved_temperature)&&null!==(null===(w=null===(y=null==this?void 0:this.stateObj)||void 0===y?void 0:y.attributes)||void 0===w?void 0:w.saved_temperature)?"eco":""} ${this.summer?"summer":""}">
            <svg id="main" viewBox="0 0 125 125">
              ${N}
              ${V}
              ${L}
            </svg>
          </div>

          <div class="bottom-small-label">${A}</div>

          ${R}
        </div>

        ${this.error.length>0?F`
            <div class="error">
              <ha-icon-button class="alert" .path=${"M3.27,1.44L2,2.72L4.05,4.77C2.75,5.37 1.5,6.11 0.38,7C4.2,11.8 8.14,16.67 12,21.5L15.91,16.63L19.23,19.95L20.5,18.68C14.87,13.04 3.27,1.44 3.27,1.44M12,3C10.6,3 9.21,3.17 7.86,3.5L9.56,5.19C10.37,5.07 11.18,5 12,5C15.07,5 18.09,5.86 20.71,7.45L16.76,12.38L18.18,13.8C20.08,11.43 22,9 23.65,7C20.32,4.41 16.22,3 12,3M5.57,6.29L14.5,15.21L12,18.3L3.27,7.44C4,7 4.78,6.61 5.57,6.29Z"}></ha-icon-button>
              <span>${this.error}</span>
            </div>
          `:F``}

      ${this._showPresets&&this._editingHoliday?this._renderHolidaySettings():F``}
      ${this._showPresets&&!this._editingHoliday?I:F``}
      ${this._showPresets?F``:I}
      </ha-card>
    `}};wa.styles=r`

    @font-face {
      font-family: 'OWOW';
      src: url('/local/fonts/owow_medium_03.woff2') format('woff2'),
          url('/local/fonts/owow_medium_03.ttf') format('truetype');
      font-style: normal;
      font-display: swap;
    }

    .main-value {
      font-family: 'OWOW', 'Roboto', 'Noto', sans-serif;
      font-size: 65px;
      letter-spacing: -0.03em;
      text-rendering: geometricPrecision;
      transition: fill 0.3s ease;
      fill: #ffffff;
    }

    .main-value.heating {
      fill: #f44336; /* bright red */
    }

    .current-info {
      font-family: 'OWOW', 'Roboto', 'Noto', sans-serif;
      font-size: 1.2em;
      transition: all 0.4s ease-in-out;
    }

    .current-info.heating text {
      fill: #ff5a4a;
      filter: drop-shadow(0 0 6px #ff5a4a);
      transition: fill 0.3s ease, filter 0.3s ease;
    }

    .current-info text {
      fill: #ffffff;
      filter: none;
      transition: fill 0.3s ease, filter 0.3s ease;
    }

    :host {
      display: block;
      box-sizing: border-box;
      position: relative;
      container: at-card / inline-size;
    }

    ha-card {
      overflow: hidden;
      height: 100%;
      min-height: 250px;
      width: 100%;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      align-content: stretch;
      justify-content: space-between;

      /* new black theme */
      background: #000;
      color: #fff;
      padding: 1.5em 0.2em 0.8em;
    }

    at-ha-outlined-icon-button {
      border: 1px solid var(--secondary-text-color);
      border-radius: 100%;
      padding: 0.5em;
      cursor: pointer;
    }

    at-ha-outlined-icon-left-button {
      color: #2196f3;
      border: 2px solid #2196f3;
      border-radius: 100%;
      padding: 0.6em;
      cursor: pointer;
      margin-right: 2em;
    }

    at-ha-outlined-icon-right-button {
      color: #f44336;
      border: 2px solid #f44336;
      border-radius: 100%;
      padding: 0.6em;
      cursor: pointer;
      margin-left: 2em;
    }

    .unavailable {
      opacity: 0.3;
    }

    .unavailable #bar, .unavailable .main-value, .unavailable #value,.unavailable #current, .unavailable .current-info,
    .unknown #bar, .unknown .main-value, .unknown #value,.unknown #current, .unknown .current-info {
      display: none;
    }

    .more-info {
      position: absolute;
      cursor: pointer;
      top: 0px;
      right: 0px;
      inset-inline-end: 0px;
      inset-inline-start: initial;
      border-radius: 100%;
      color: var(--secondary-text-color);
      z-index: 1;
      direction: var(--direction);
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .content {
      position: relative;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      box-sizing: border-box;
      text-align: center;
      overflow: visible;
      pointer-events: none;
    }

    .content > svg * {
      pointer-events: auto;
    }

    #main {
      width: 100%;
      height: auto;
      aspect-ratio: 1.25 / 1;
      max-width: 260px;
      transform: none;
    }

    .name {
      display: block;
      width: 100%;
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      word-break: keep-all;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 0.6em;
    }

    .top-indicators {
      position: absolute;
      top: 1.5em;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 2;
    }

    .burner-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ff3b30;
      box-shadow: 0 0 6px #ff3b30;
      opacity: 0;
      transition: opacity 0.4s ease, transform 0.3s ease;
      position: relative;
    }

    .burner-dot.active {
      opacity: 1;
      transform: scale(1.1);
      animation: pulse 1.6s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 6px #ff3b30;
      }
      50% {
        transform: scale(1.25);
        box-shadow: 0 0 10px #ff3b30;
      }
    }

    .holiday-icon {
      position: absolute;
      left: calc(50% + 9em); /* moves it slightly right of center */
      top: 0.05em;
      opacity: 0.4;
      transition: opacity 0.3s ease, transform 0.3s ease;
      pointer-events: none;
    }

    .holiday-icon.active {
      opacity: 1;
      transform: scale(1.05);
    }

    .holiday-icon.hidden {
      display: none !important;
    }

    .holiday-icon ha-svg-icon {
      --mdc-icon-size: 22px;
      color: #ffffff;
    }

    .top-icons ha-svg-icon {
      color: #fff;
      --mdc-icon-size: 20px;
      opacity: 0.6;
      transition: opacity 0.3s ease, transform 0.2s ease;
    }

    .top-icons ha-svg-icon.active {
      opacity: 1;
      transform: scale(1.05);
      color: #ffffff;
    }

    svg {
      height: auto;
      margin: auto;
      display: block;
      width: 100%;
      -webkit-backface-visibility: hidden;
      max-width: 260px;
    }
        
    path {
      stroke-linecap: round;
      stroke-width: 1;
    }

    text {
      fill: #ffffff;
    }

    .eco {
      --mode-color: var(--energy-non-fossil-color);
    }

    .summer {
      --mode-color: var(--label-badge-yellow);
    }

    .window_open {
      --mode-color: #80a7c4;
    }

    .auto,
    .heat_cool {
      --mode-color: var(--state-climate-auto-color);
    }
    .cool {
      --mode-color: var(--label-badge-red);
    }
    .heat, .heat_cool {
      --mode-color: var(--label-badge-red);
    }
    .manual {
      --mode-color: var(--state-climate-manual-color);
    }
    .off {
      --mode-color: var(--slider-track-color);
    }
    .fan_only {
      --mode-color: var(--state-climate-fan_only-color);
    }
    .dry {
      --mode-color: var(--state-climate-dry-color);
    }
    .idle {
      --mode-color: var(--state-climate-idle-color);
    }
    .unknown-mode {
      --mode-color: var(--state-unknown-color);
    }

    #modes {
      z-index: 3;
      position: relative;
      display: flex;
      width: 100%;
      justify-content: center;
      margin-top: 0.3em;
      margin-bottom: 0.3em;
    }

    #at-control-buttons {
      z-index: 3;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.2em 0 0.8em;
    }

    #at-control-buttons .button {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #modes > * {
      color: var(--disabled-text-color);
      cursor: pointer;
      display: inline-block;
    }

    #modes .selected-icon {
      color: var(--mode-color);
    }
        
    #shadowpath {
      stroke: #e7e7e8;
    }

    #value {
      fill: var(--mode-color);
      r: 5;
      z-index: 9999 !important;
      transition: r 0.3s ease-in-out, fill 0.6s ease-in-out;
    }

    #value,#current {
      filter: drop-shadow(0px 0px 1px #000);
    }

    #value:hover, #value:active, #value:focus, #value.active {
      r: 8 !important;
    }

    #current {
      pointer-events: none;
      fill: var(--label-badge-grey);
    }
        
    .status {
      transition: fill 0.6s ease-in-out, filter 0.6s ease-in-out;
      filter: none;
    }
    .status.active {
      fill: var(--error-color);
      filter: drop-shadow(0px 0px 6px var(--error-color));
    }

    .status.cooler.active {
      fill: #03A9F4;
      filter: drop-shadow(0px 0px 6px #03A9F4);
    }

    #bar {
      stroke: var(--mode-color);
      stroke-dasharray: 176;
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 5.1s ease-in-out 0s, stroke 0.6s ease-in-out;
    }

    #bar.drag {
      transition: none !important;
    }
    #c-minus,#c-plus {
      cursor: pointer;
    }
    .control {
      cursor: pointer;
      pointer-events: none;
    }
    ha-icon-button {
      transition: color 0.6s ease-in-out;
    }

    .summer,.window {
      transition: fill 0.3s ease;
      fill: var(--disabled-text-color);
    }
    line {
      stroke: var(--disabled-text-color);
    }
    .summer.active {
      fill: var(--label-badge-yellow);
    }
    .window.active {
      fill: #80a7c4;
    }
    ha-icon-button[title="eco"] {
      --mode-color: var(--energy-non-fossil-color) !important;
    }

    /* ---------- BLACK LAYOUT EXTRAS ---------- */

    .top-label {
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      opacity: 0.7;
      text-align: center;
      margin-bottom: 0.3em;
    }

    .bottom-small-label {
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      opacity: 0.7;
      text-align: center;
    }

    .center-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .error {
      display: flex;
      align-items: center;
      gap: 0.4em;
      font-size: 11px;
      margin: 0.4em 0 0;
      color: #ff8a80;
    }

    .bottom-bar {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0.2em;
      background: #111;
      border-radius: 10px;
      padding: 0.4em 0.3em 0.2em;
      overflow: hidden;
      transition: all 0.35s ease;
    }

    /* When expanded, show all buttons spaced out */
    .bottom-bar.expanded {
      justify-content: space-between;
    }

    /* When collapsed, keep centered preset and left button only */
    .bottom-bar:not(.expanded) {
      justify-content: space-between;
    }

    /* Buttons transition opacity/slide smoothly */
    .bottom-button {
      flex: 1;
      font-size: 9px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-align: center;
      color: #888;
      opacity: 0.65;
      transition: opacity 0.25s ease, transform 0.35s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.2em;
      cursor: pointer;
      padding: 0.15em 0.1em 0.2em;
      border-radius: 6px;
    }


    .bottom-button.preset {
      opacity: 1;
      background: #1e1e1e;
      color: #888;
      --mdc-icon-size: 24px;
    }
    
    .bottom-button.preset.active {
      color: #fff;
    }

    .bottom-button.preset-centered {  
      --mdc-icon-size: 24px;
      color: #fff;
    }

    /* Center the preset when collapsed */
    .preset-centered {
      position: absolute;
      left: 50%;
      transform: translateX(-50%) translateY(0);
      transition: transform 0.35s ease, opacity 0.35s ease;
      color: #fff;
    }

    /* Animate the preset row expanding/collapsing */
    .bottom-bar.expanded .preset-centered {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
      pointer-events: none;
    }

    .bottom-bar.expanded .bottom-button:not(.change-fn) {
      opacity: 1;
      transform: translateY(0);
    }

    .bottom-bar:not(.expanded) .bottom-button:not(.change-fn):not(.preset-centered) {
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
    }

    .change-fn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      gap: 0.3em;
      cursor: pointer;
      text-align: center;
    }

    .circle-button {
      width: 21px;
      height: 21px;
      border-radius: 50%;
      border: 2px solid #888;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.3s ease, transform 0.2s ease, background 0.3s ease;
    }

    .circle-button ha-svg-icon {
      --mdc-icon-size: 32px;
      color: #888;
      transition: color 0.3s ease;
    }

    /* Hover / active state */
    .change-fn:hover .circle-button {
      border-color: #bbb;
      transform: scale(1.05);
    }

    .change-fn:hover ha-svg-icon {
      color: #fff;
    }

    .change-fn .label {
      font-size: 0.65rem;
      color: #ccc;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }

    .content text.main-value {
      font-size: 4.2em;
    }

    .content .current-info {
      font-size: 30px;
    }

    /* LEFT button pressed → BLUE background + BLACK arrow */
    at-ha-outlined-icon-left-button.pressed {
      background: #2196f3 !important;
      border-color: #2196f3 !important;
    }

    at-ha-outlined-icon-left-button.pressed ha-svg-icon {
      color: #000 !important;
    }

    /* RIGHT button pressed → RED background + BLACK arrow */
    at-ha-outlined-icon-right-button.pressed {
      background: #f44336 !important;
      border-color: #f44336 !important;
    }

    at-ha-outlined-icon-right-button.pressed ha-svg-icon {
      color: #000 !important;
  }


    #modes {
      margin-top: 0.3em;
      margin-bottom: 0.4em;
    }

    @container at-card (max-width: 280px) {
      .content {
        top: calc(50% - 10px);
      }
      .bottom-bar {
        flex-wrap: wrap;
        row-gap: 0.2em;
      }
    }

    @container at-card (max-width: 255px) {
      #modes {
        margin-top: .5em;
      }
      ha-card {
        padding-top: 1.6em;
      }
    }

    /* ---------------- HOLIDAY EDITOR ---------------- */
    .holiday-editor {
      width: 100%;
      margin: 1em 0.1em;
      background: #111;
      border-radius: 12px;
      border: 1px solid #222;
    }

    .holiday-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.1em;
    }

    .holiday-col-label {
      width: 48%;
      display: flex;
      flex-direction: column;
      font-size: 1rem;
      letter-spacing: 0.02em;
    }

    .holiday-col-label .description {
      opacity: 0.6;
      margin-top: -0.2em;
      font-size: 0.82rem;
    }

    .holiday-col-input {
      width: 50%;
    }

    .holiday-input {
      width: 100%;
      font-size: 1rem;
      padding: 0.55em 0.6em;
      border-radius: 6px;
      background: #1a1a1a;
      color: #fff;
      border: 1px solid #333;
      outline: none;
    }

    .holiday-input:focus {
      border-color: #888;
    }

    .holiday-buttons {
      margin-top: 1.2em;
      display: flex;
      justify-content: space-between;
    }

    .holiday-btn {
      flex: 1;
      margin: 0 0.3em;
      padding: 0.55em 0;
      border-radius: 6px;
      font-size: 1rem;
      text-transform: uppercase;
      text-align: center;
      cursor: pointer;
      border: none;
    }

    .holiday-btn-confirm {
      background: #28a745;
      color: #fff;
    }

    .holiday-btn-cancel,
    .holiday-btn-clear {
      background: #c82333;
      color: #fff;
    }
  `,e([he({attribute:!1})],wa.prototype,"hass",void 0),e([he({type:Number})],wa.prototype,"value",void 0),e([pe()],wa.prototype,"_selectTargetTemperature",void 0),e([he({type:Number})],wa.prototype,"current",void 0),e([he({type:Number})],wa.prototype,"min",void 0),e([he({type:Number})],wa.prototype,"max",void 0),e([he({type:Number})],wa.prototype,"step",void 0),e([he({type:Boolean})],wa.prototype,"summer",void 0),e([he({type:String})],wa.prototype,"status",void 0),e([he({type:String})],wa.prototype,"mode",void 0),e([he({type:Boolean,reflect:!0})],wa.prototype,"dragging",void 0),e([pe()],wa.prototype,"changingHigh",void 0),e([pe()],wa.prototype,"_vacationStart",void 0),e([pe()],wa.prototype,"_vacationEnd",void 0),e([pe()],wa.prototype,"_showHolidayEditor",void 0),e([pe()],wa.prototype,"_editingHoliday",void 0),e([pe()],wa.prototype,"_config",void 0),e([pe()],wa.prototype,"_showPresets",void 0),e([pe()],wa.prototype,"_swapDisplay",void 0),e([pe()],wa.prototype,"_leftPressed",void 0),e([pe()],wa.prototype,"_rightPressed",void 0),wa=e([de("atagone-thermostat-ui-card")],wa);const ka=function(...e){const t="type"===e[0].type,i=e.map(e=>e.schema),a=Object.assign({},...i);return t?ca(a):ra(a)}(ra({index:sa(na()),view_index:sa(na()),view_layout:ta("any",()=>!0),type:la()}),ra({entity:sa(la()),name:sa(la()),icon:sa(la())}),ra({disable_summer:sa(aa()),disable_eco:sa(aa()),disable_heat:sa(aa()),set_current_as_main:sa(aa()),eco_temperature:sa(na()),disable_menu:sa(aa()),disable_buttons:sa(aa())})),$a=["icon_color","layout","fill_container","primary_info","secondary_info","icon_type","content_info","use_entity_picture","collapsible_controls","icon_animation"],xa=e=>{var t,i;customElements.get("ha-form")&&(customElements.get("hui-action-editor")||((e,t,i,a)=>{const[o,n,r]=e.split(".",3);return Number(o)>t||Number(o)===t&&(void 0===a?Number(n)>=i:Number(n)>i)||void 0!==a&&Number(o)===t&&Number(n)===i&&Number(r)>=a})(e,2022,11))||null===(t=customElements.get("hui-button-card"))||void 0===t||t.getConfigElement(),customElements.get("ha-entity-picker")||null===(i=customElements.get("hui-entities-card"))||void 0===i||i.getConfigElement()},Aa=["eco_temperature","disable_summer","disable_eco","disable_heat","disable_menu","set_current_as_main","disable_buttons"],Ca=Ri(()=>[{name:"entity",selector:{entity:{domain:["climate"]}}},{name:"name",selector:{text:{}}},{name:"eco_temperature",selector:{number:{placeholder:20,min:5,max:45,default:20}}},{type:"grid",name:"",schema:[{name:"disable_summer",selector:{boolean:{}}},{name:"disable_eco",selector:{boolean:{}}},{name:"disable_heat",selector:{boolean:{}}},{name:"disable_menu",selector:{boolean:{}}},{name:"set_current_as_main",selector:{boolean:{}}},{name:"disable_buttons",selector:{boolean:{}}}]}]);let Ea=class extends le{constructor(){super(...arguments),this._computeLabel=e=>{const t=(i=this.hass,function(e){var t;let a=Hi(e,null!==(t=null==i?void 0:i.locale.language)&&void 0!==t?t:Oi);return a||(a=Hi(e,Oi)),null!=a?a:e});var i;return $a.includes(e.name)?t(`editor.card.generic.${e.name}`):Aa.includes(e.name)?t(`editor.card.climate.${e.name}`):this.hass.localize(`ui.panel.lovelace.editor.card.generic.${e.name}`)}}connectedCallback(){super.connectedCallback(),xa(this.hass.connection.haVersion)}setConfig(e){Qi(e,ka),this._config=e}render(){if(!this.hass||!this._config)return F``;const e=Ca();return F`
            <ha-form
                .hass=${this.hass}
                .data=${this._config}
                .schema=${e}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `}_valueChanged(e){Ui(this,"config-changed",{config:e.detail.value}),Ui(this,"hass",{config:e.detail.value})}};e([pe()],Ea.prototype,"_config",void 0),e([he({attribute:!1})],Ea.prototype,"hass",void 0),Ea=e([de("atagone-thermostat-ui-card-editor")],Ea);var za=Object.freeze({__proto__:null,get ClimateCardEditor(){return Ea}});export{wa as AtagOneThermostatUi,ya as registerCustomCard};
