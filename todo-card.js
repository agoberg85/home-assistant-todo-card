const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let a=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(s,t,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:r,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:l,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,_=p.trustedTypes,m=_?_.emptyScript:"",g=p.reactiveElementPolyfillSupport,f=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!r(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);a?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...l(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),a=t.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=a.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const o=this.constructor;if(!1===s&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??$)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[f("elementProperties")]=new Map,v[f("finalized")]=new Map,g?.({ReactiveElement:v}),(p.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,x=t=>t,w=k.trustedTypes,S=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,I="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+A,E=`<${C}>`,T=document,D=()=>T.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,M="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,N=/>/g,z=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,H=/"/g,R=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),Q=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),q=new WeakMap,W=T.createTreeWalker(T,129);function J(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const V=(t,e)=>{const i=t.length-1,s=[];let a,o=2===e?"<svg>":3===e?"<math>":"",n=U;for(let e=0;e<i;e++){const i=t[e];let r,d,c=-1,l=0;for(;l<i.length&&(n.lastIndex=l,d=n.exec(i),null!==d);)l=n.lastIndex,n===U?"!--"===d[1]?n=L:void 0!==d[1]?n=N:void 0!==d[2]?(R.test(d[2])&&(a=RegExp("</"+d[2],"g")),n=z):void 0!==d[3]&&(n=z):n===z?">"===d[0]?(n=a??U,c=-1):void 0===d[1]?c=-2:(c=n.lastIndex-d[2].length,r=d[1],n=void 0===d[3]?z:'"'===d[3]?H:F):n===H||n===F?n=z:n===L||n===N?n=U:(n=z,a=void 0);const h=n===z&&t[e+1].startsWith("/>")?" ":"";o+=n===U?i+E:c>=0?(s.push(r),i.slice(0,c)+I+i.slice(c)+A+h):i+A+(-2===c?e:h)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,o=0;const n=t.length-1,r=this.parts,[d,c]=V(t,e);if(this.el=Y.createElement(d,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&r.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(I)){const e=c[o++],i=s.getAttribute(t).split(A),n=/([.?@])?(.*)/.exec(e);r.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:X}),s.removeAttribute(t)}else t.startsWith(A)&&(r.push({type:6,index:a}),s.removeAttribute(t));if(R.test(s.tagName)){const t=s.textContent.split(A),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],D()),W.nextNode(),r.push({type:2,index:++a});s.append(t[e],D())}}}else if(8===s.nodeType)if(s.data===C)r.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(A,t+1));)r.push({type:7,index:a}),t+=A.length-1}a++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===Q)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const o=P(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=K(t,a._$AS(t,e.values),a,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);W.currentNode=s;let a=W.nextNode(),o=0,n=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new G(a,a.nextSibling,this,t):1===r.type?e=new r.ctor(a,r.name,r.strings,this,t):6===r.type&&(e=new st(a,this,t)),this._$AV.push(e),r=i[++n]}o!==r?.index&&(a=W.nextNode(),o++)}return W.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),P(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==Q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==j&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Y(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new G(this.O(D()),this.O(D()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}_$AI(t,e=this,i,s){const a=this.strings;let o=!1;if(void 0===a)t=K(this,t,e,0),o=!P(t)||t!==this._$AH&&t!==Q,o&&(this._$AH=t);else{const s=t;let n,r;for(t=a[0],n=0;n<a.length-1;n++)r=K(this,s[i+n],e,n),r===Q&&(r=this._$AH[n]),o||=!P(r)||r!==this._$AH[n],r===j?t=j:t!==j&&(t+=(r??"")+a[n+1]),this._$AH[n]=r}o&&!s&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==j)}}class it extends X{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??j)===Q)return;const i=this._$AH,s=t===j&&i!==j||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==j&&(i===j||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const at=k.litHtmlPolyfillSupport;at?.(Y,G),(k.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class nt extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new G(e.insertBefore(D(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Q}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const rt=ot.litElementPolyfillSupport;rt?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const dt="5",ct="mdi:checkbox-blank-outline",lt="var(--ha-card-background)",ht="var(--ha-card-background)",ut="var(--success-color)",pt="rgba(128, 128, 128, 0.2)",_t="var(--text-primary-color)",mt="var(--text-accent-color)";customElements.define("todo-list-card",class extends nt{static get properties(){return{hass:{type:Object},_config:{state:!0},_tasks:{state:!0},_isAddAreaOpen:{state:!0},_isFilterOpen:{state:!0},_isSearchOpen:{state:!0},_searchQuery:{state:!0},_filters:{state:!0},_editedTaskId:{state:!0},_expandedTaskId:{state:!0},_newItemSummary:{state:!0},_newItemDescription:{state:!0},_newItemPriority:{state:!0},_newItemIcon:{state:!0},_newItemLink:{state:!0},_newItemQuantity:{state:!0},_newItemDueDate:{state:!0},_newItemDueTime:{state:!0},_editSummary:{state:!0},_editDescription:{state:!0},_editPriority:{state:!0},_editIcon:{state:!0},_editLink:{state:!0},_editQuantity:{state:!0},_editDueDate:{state:!0},_editDueTime:{state:!0},_isLoading:{state:!0},_error:{state:!0}}}static getConfigElement(){return document.createElement("todo-list-card-editor")}static getStubConfig(){const t=Object.keys(window.hass?.states||{}).find(t=>t.startsWith("todo."))||"todo.my_list";return{type:"custom:todo-list-card",entity:t,title:"My List",mode:"tasks",card_background:lt,card_color:ht,completed_color:ut,icon_background:pt,text_color:_t,completed_text_color:mt,show_priority:!0,confirm_delete:!0,auto_complete_parent:!1,show_filter_menu:!0,show_search_button:!0,show_clear_button:!0}}_generateSubtaskUid(){return`sub_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}async _updateTaskMetadata(t,e,i=!1){try{await this._hass.callService("todo","update_item",{item:t.uid,description:JSON.stringify(e)},{entity_id:this._config.entity}),i||this.fetchTodoItems()}catch(t){console.error("Error updating task metadata:",t),this._error=`Failed to update sub-tasks: ${t.message}`,this.fetchTodoItems()}}async _handleAddSubtask(t,e){const i=this.shadowRoot.querySelector(`#subtask-input-${e.uid}`);if(!i)return;const s=i.value.trim();if(!s)return;const a={uid:this._generateSubtaskUid(),summary:this._sanitizeText(s),status:"needs_action"},o=e._cachedMetadata,n=[...o.subtasks||[],a],r={...o,subtasks:n};await this._updateTaskMetadata(e,r),i.value=""}async _handleSubtaskStatusUpdate(t,e,i){t.stopPropagation();const s=e._cachedMetadata;let a=!0;const o=s.subtasks.map(t=>{let e=t.status;return t.uid===i&&(e="needs_action"===t.status?"completed":"needs_action"),"needs_action"===e&&(a=!1),{...t,status:e}}),n={...s,subtasks:o};await this._updateTaskMetadata(e,n,!0),this._config.auto_complete_parent&&"completed"!==e.status&&a||this._config.auto_complete_parent&&"completed"===e.status&&!a?await this._handleStatusUpdate(t,e):await this.fetchTodoItems()}async _handleDeleteSubtask(t,e,i){t.stopPropagation();const s=e._cachedMetadata,a=s.subtasks.filter(t=>t.uid!==i),o={...s,subtasks:a};await this._updateTaskMetadata(e,o)}_toggleExpand(t){this._expandedTaskId=this._expandedTaskId===t?null:t,this._editedTaskId=null}constructor(){super(),this._tasks=[],this._isAddAreaOpen=!1,this._editedTaskId=null,this._expandedTaskId=null,this._isLoading=!1,this._error=null,this._isFilterOpen=!1,this._isSearchOpen=!1,this._searchQuery="",this._filters={active:!0,overdue:!0,completed:!0},this._resetNewItemInputs(),this._resetEditInputs(),this._boundClickListener=this._handleOutsideClick.bind(this)}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._boundClickListener)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundClickListener)}updated(t){t.has("_isFilterOpen")&&(this.style.zIndex=this._isFilterOpen?"20":"")}_handleOutsideClick(t){this._isFilterOpen&&(this._isFilterOpen=!1)}_resetNewItemInputs(){this._newItemSummary="",this._newItemDescription="",this._newItemPriority=dt,this._newItemIcon=ct,this._newItemLink="",this._newItemQuantity="",this._newItemDueDate="",this._newItemDueTime=""}_resetEditInputs(){this._editSummary="",this._editDescription="",this._editPriority=dt,this._editIcon=ct,this._editLink="",this._editQuantity="",this._editDueDate="",this._editDueTime=""}setConfig(t){if(!t.entity)throw new Error("You need to define a todo entity");this._config={mode:"tasks",card_background:lt,card_color:ht,completed_color:ut,icon_background:pt,text_color:_t,completed_text_color:mt,show_priority:!0,confirm_delete:!0,sort_by:"priority",sort_order:"asc",auto_complete_parent:!1,show_filter_menu:!0,show_search_button:!0,show_clear_button:!0,...t},this._loadFilters()}_loadFilters(){if(!this._config?.entity)return;const t=`todo-list-card-filters-${this._config.entity}`,e=localStorage.getItem(t);if(e)try{this._filters=JSON.parse(e)}catch(t){console.warn("Failed to parse stored filters, resetting to default"),this._filters={active:!0,overdue:!0,completed:!0}}}_saveFilters(){if(!this._config?.entity)return;const t=`todo-list-card-filters-${this._config.entity}`;localStorage.setItem(t,JSON.stringify(this._filters))}set hass(t){const e=this._hass;if(this._hass=t,!this._config?.entity||!e)return void this.fetchTodoItems();const i=e.states[this._config.entity],s=t.states[this._config.entity];i&&i.last_updated===s?.last_updated&&i.attributes?.items===s?.attributes?.items||this.fetchTodoItems()}async fetchTodoItems(){if(this._hass&&this._config.entity){this._tasks&&0!==this._tasks.length||(this._isLoading=!0),this._error=null;try{let t;try{t=await this._hass.callWS({type:"todo/item/list",entity_id:this._config.entity})}catch(e){if("unknown_command"!==e.code)throw e;t=await this._hass.callWS({type:"call_service",domain:"todo",service:"get_items",service_data:{entity_id:this._config.entity},return_response:!0}),t=t.response[this._config.entity]}this._tasks=(t.items||[]).map(t=>({...t,_cachedMetadata:this._parseTaskMetadata(t.description)}))}catch(t){console.error("Error fetching todo items:",t),this._error=`Failed to load items: ${t.message}`}finally{this._isLoading=!1}}}_parseTaskMetadata(t){try{const e=JSON.parse(t||"{}");return{description:this._sanitizeText(e.description??""),priority:this._sanitizePriority(e.priority??dt),icon:"string"==typeof e.icon?e.icon:ct,link:this._sanitizeUrl(e.link??""),quantity:this._sanitizeText(e.quantity??""),subtasks:Array.isArray(e.subtasks)?e.subtasks:[]}}catch{return{description:"",priority:dt,icon:ct,link:"",quantity:"",subtasks:[]}}}_sanitizePriority(t){const e=parseInt(t);return isNaN(e)?dt:Math.max(1,Math.min(10,e)).toString()}_sanitizeText(t){return"string"==typeof t?t.replace(/[<>"']/g,""):""}_sanitizeUrl(t){try{const e=new URL(t.startsWith("http")?t:`https://${t}`);return["http:","https:"].includes(e.protocol)?e.href:""}catch{return""}}async _handleStatusUpdate(t,e){t.stopPropagation();try{await this._hass.callService("todo","update_item",{item:e.uid,status:"needs_action"===e.status?"completed":"needs_action"},{entity_id:this._config.entity}),this.fetchTodoItems()}catch(t){console.error("Error updating status:",t),this._error=`Failed to update item: ${t.message}`,this.fetchTodoItems()}}async _handleAddItem(){if(!this._newItemSummary.trim())return void(this._error="Item name cannot be empty");this._isAddAreaOpen=!1;let t={};this._newItemDescription.trim()&&(t.description=this._sanitizeText(this._newItemDescription.trim())),"tasks"===this._config.mode?(t.priority=this._sanitizePriority(this._newItemPriority),t.icon=this._newItemIcon):"shopping"===this._config.mode&&(this._newItemLink&&(t.link=this._sanitizeUrl(this._newItemLink)),this._newItemQuantity&&(t.quantity=this._sanitizeText(this._newItemQuantity)),this._newItemIcon&&(t.icon=this._newItemIcon));const e={item:this._sanitizeText(this._newItemSummary.trim()),description:JSON.stringify(t)};this._newItemDueDate.trim()&&(this._newItemDueTime.trim()?e.due_datetime=`${this._newItemDueDate} ${this._newItemDueTime}:00`:e.due_date=this._newItemDueDate);try{await this._hass.callService("todo","add_item",e,{entity_id:this._config.entity}),this._resetNewItemInputs()}catch(t){console.error("Error adding item:",t),this._error=`Failed to add item: ${t.message}`}finally{this.fetchTodoItems()}}async _handleSaveEdit(t){if(!this._editSummary.trim())return void(this._error="Item name cannot be empty");const e=this._editedTaskId;this._editedTaskId=null;let i={subtasks:(t._cachedMetadata||{}).subtasks||[]};this._editDescription.trim()&&(i.description=this._sanitizeText(this._editDescription.trim())),"tasks"===this._config.mode?(i.priority=this._sanitizePriority(this._editPriority),i.icon=this._editIcon):"shopping"===this._config.mode&&(this._editLink&&(i.link=this._sanitizeUrl(this._editLink)),this._editQuantity&&(i.quantity=this._sanitizeText(this._editQuantity)),this._editIcon&&(i.icon=this._editIcon));const s={item:t.uid,rename:this._sanitizeText(this._editSummary.trim()),description:JSON.stringify(i)};this._editDueDate.trim()?this._editDueTime.trim()?s.due_datetime=`${this._editDueDate} ${this._editDueTime}:00`:s.due_date=this._editDueDate:s.due_date=null;try{await this._hass.callService("todo","update_item",s,{entity_id:this._config.entity}),this._resetEditInputs()}catch(t){console.error("Error updating item:",t),this._error=`Failed to update item: ${t.message}`,this._editedTaskId=e}finally{this.fetchTodoItems()}}async _handleDeleteItem(t,e){t.stopPropagation();if(!this._config.confirm_delete||confirm(`Are you sure you want to delete "${e.summary}"?`)){this._editedTaskId=null,this._expandedTaskId=null;try{await this._hass.callService("todo","remove_item",{item:[e.uid]},{entity_id:this._config.entity}),this.fetchTodoItems()}catch(t){console.error("Error deleting item:",t),this._error=`Failed to delete item: ${t.message}`}}}async _handleClearCompleted(){const t=this._tasks.filter(t=>"completed"===t.status);if(0===t.length)return;if(!confirm(`Are you sure you want to delete all ${t.length} completed items?`))return;const e=t.map(t=>t.uid);try{await this._hass.callService("todo","remove_item",{item:e},{entity_id:this._config.entity}),this.fetchTodoItems()}catch(t){console.error("Error clearing completed items:",t),this._error=`Failed to clear completed items: ${t.message}`}}_handleOpenLink(t,e){t.stopPropagation();const i=this._sanitizeUrl(e);i&&window.open(i,"_blank","noopener,noreferrer")}_toggleEditMode(t){if(this._editedTaskId===t)this._editedTaskId=null,this._resetEditInputs();else{const e=this._tasks.find(e=>e.uid===t);if(e){this._editedTaskId=t,this._expandedTaskId=null,this._editSummary=e.summary;const i=e._cachedMetadata||{};if(this._editDescription=i.description??"",this._editPriority=i.priority??dt,this._editIcon=i.icon??ct,this._editLink=i.link??"",this._editQuantity=i.quantity??"",e.due)try{const t=new Date(e.due);this._editDueDate=t.toISOString().split("T")[0];const i=e.due.split("T")[1];if(i&&!i.startsWith("00:00:00")){const e=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");this._editDueTime=`${e}:${i}`}else this._editDueTime=""}catch(t){console.error("Error parsing due date:",t),this._editDueDate="",this._editDueTime=""}else this._editDueDate="",this._editDueTime=""}}}_handleKeyDown(t,e){"Enter"===t.key?(t.preventDefault(),e()):"Escape"===t.key&&(t.preventDefault(),this._isAddAreaOpen?(this._isAddAreaOpen=!1,this._resetNewItemInputs()):this._editedTaskId?(this._editedTaskId=null,this._resetEditInputs()):this._expandedTaskId&&(this._expandedTaskId=null))}_getDueDateStatus(t){if(!t)return null;const e=(new Date).toISOString().split("T")[0],i=t.split("T")[0];return i<e?"overdue":i===e?"due-today":null}_getPriorityInfo(t){const e=parseInt(t,10);return isNaN(e)?null:e<=1?{text:"Urgent",color:"var(--error-color)"}:e<=4?{text:"High",color:"var(--error-color)"}:e<=7?{text:"Medium",color:"var(--warning-color)"}:{text:"Low",color:"var(--success-color)"}}_formatDueDate(t){if(!t)return null;try{const e=new Date(t),i=new Date,s=t.includes("T")&&!t.match(/T00:00:00/),a=t=>String(t).padStart(2,"0"),o=e.getDate();let n=`${o}.${new Intl.DateTimeFormat(this._hass.locale?.language||"en",{month:"short"}).format(e).toLowerCase()}`;if(e.getFullYear()!==i.getFullYear()&&(n+=`.${e.getFullYear()}`),s){const t=a(e.getHours());n+=`, ${t}:${a(e.getMinutes())}`}return n}catch(e){return console.error("Date formatting error:",e),t}}_toggleFilter(t){this._filters={...this._filters,[t]:!this._filters[t]},this._saveFilters()}_toggleSearch(){this._isSearchOpen=!this._isSearchOpen,this._isSearchOpen?setTimeout(()=>{const t=this.shadowRoot.querySelector("#search-input");t&&t.focus()},100):this._searchQuery=""}render(){if(!this._hass||!this._config)return B``;if(!this._hass.states[this._config.entity])return B`<ha-card><div class="warning">Entity not found: ${this._config.entity}</div></ha-card>`;let t=Array.isArray(this._tasks)?this._tasks:[];(this._config.show_filter_menu||this._searchQuery)&&(t=t.filter(t=>{if(this._searchQuery&&!t.summary.toLowerCase().includes(this._searchQuery.toLowerCase()))return!1;const e="completed"===t.status,i="overdue"===(e?null:this._getDueDateStatus(t.due)),s=!e&&!i;return!(e&&!this._filters.completed)&&(!(i&&!this._filters.overdue)&&!(s&&!this._filters.active))}));const e=(t,e)=>{const i=this._config.sort_by||"priority",s="desc"===(this._config.sort_order||"asc")?-1:1;let a,o;switch(i){case"duedate":a=t.due?new Date(t.due).getTime():1/0,o=e.due?new Date(e.due).getTime():1/0;break;case"priority":a=parseInt(t._cachedMetadata?.priority??dt,10),o=parseInt(e._cachedMetadata?.priority??dt,10);break;default:a=t.summary?.toLowerCase()||"",o=e.summary?.toLowerCase()||""}return a<o?-1*s:a>o?1*s:0},i=t.filter(t=>"needs_action"===t.status).sort(e),s=t.filter(t=>"completed"===t.status).sort(e),a="none"===this._config.card_background,o=a?"6px 4px 12px 16px":"6px 20px 12px 20px",n=a?"0 4px 4px":"0 12px 12px";let r="tasks"===this._config.mode?`${i.length} tasks · ${s.length} completed`:`${i.length} items · ${s.length} checked`;return this._searchQuery&&(r=`${i.length+s.length} results found`),B`
      <ha-card style="background: ${this._config.card_background};">
        <div class="card-header" style="padding: ${o};">
          <div class="header-text">
            <div class="name">${this._config.title??""}</div>
            <div class="header-count">${r}</div>
          </div>
          <div class="header-buttons">
            ${!1!==this._config.show_search_button?B`
            <ha-icon-button class="search-button" @click="${this._toggleSearch}">
                <ha-icon icon="mdi:magnify"></ha-icon>
            </ha-icon-button>
            `:""}

            ${!1!==this._config.show_clear_button&&s.length>0&&!this._searchQuery?B`
            <ha-icon-button class="clear-button" @click="${this._handleClearCompleted}" title="Clear Completed Items"><ha-icon icon="mdi:broom"></ha-icon></ha-icon-button>
            `:""}

            ${!1!==this._config.show_filter_menu?B`
            <div class="filter-menu-container">
                <ha-icon-button class="filter-button" @click="${t=>{t.stopPropagation(),this._isFilterOpen=!this._isFilterOpen}}">
                    <ha-icon icon="mdi:filter-variant"></ha-icon>
                </ha-icon-button>
                ${this._isFilterOpen?B`
                <div class="filter-dropdown" @click="${t=>t.stopPropagation()}">
                    <div class="filter-option" @click="${()=>this._toggleFilter("active")}">
                        <ha-icon icon="${this._filters.active?"mdi:checkbox-marked":"mdi:checkbox-blank-outline"}"></ha-icon>
                        <span>Active</span>
                    </div>
                    <div class="filter-option" @click="${()=>this._toggleFilter("overdue")}">
                        <ha-icon icon="${this._filters.overdue?"mdi:checkbox-marked":"mdi:checkbox-blank-outline"}"></ha-icon>
                        <span>Overdue</span>
                    </div>
                    <div class="filter-option" @click="${()=>this._toggleFilter("completed")}">
                        <ha-icon icon="${this._filters.completed?"mdi:checkbox-marked":"mdi:checkbox-blank-outline"}"></ha-icon>
                        <span>Completed</span>
                    </div>
                </div>
                `:""}
            </div>
            `:""}
            <ha-icon-button class="add-button" @click="${()=>{this._isAddAreaOpen=!this._isAddAreaOpen,this._editedTaskId=null,this._resetEditInputs()}}"><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button>
          </div>
        </div>
        
        ${this._isSearchOpen?B`
        <div class="search-bar-container">
            <ha-textfield 
                id="search-input"
                placeholder="Search items..." 
                .value="${this._searchQuery}" 
                @input="${t=>this._searchQuery=t.target.value}"
                iconTrailing
            >
                <ha-icon slot="trailingIcon" icon="mdi:close" @click="${()=>{this._searchQuery="",this._isSearchOpen=!1}}" style="cursor: pointer;"></ha-icon>
            </ha-textfield>
        </div>
        `:""}

        <div class="card-content" style="padding: ${n};">
          ${this._error?B`<div class="error-message" @click="${()=>this._error=null}">${this._error}</div>`:""}
          ${this._isLoading?B`<div class="loading">Loading...</div>`:""}
          ${this._isAddAreaOpen?this._renderAddForm():""}
          ${0!==t.length||this._isAddAreaOpen||this._isLoading?"":B`<div class="empty-list">No items</div>`}
          ${i.map(t=>this._renderItem(t))}
          ${s.map(t=>this._renderItem(t))}
        </div>
      </ha-card>
    `}_renderAddForm(){return"tasks"===this._config.mode?this._renderAddTaskForm():"shopping"===this._config.mode?this._renderAddShoppingItemForm():B``}_renderEditForm(t){return"tasks"===this._config.mode?this._renderEditTaskForm(t):"shopping"===this._config.mode?this._renderEditShoppingItemForm(t):B``}_renderItem(t){return"tasks"===this._config.mode?this._renderTask(t):"shopping"===this._config.mode?this._renderShoppingItem(t):B``}_renderAddTaskForm(){return B`<div class="add-edit-area" style="background-color: ${this._config.card_color};" @keydown="${t=>this._handleKeyDown(t,()=>this._handleAddItem())}"><h3>New Task</h3><ha-textfield label="Title" .value="${this._newItemSummary}" @input="${t=>this._newItemSummary=t.target.value}"></ha-textfield><ha-textfield label="Description (optional)" .value="${this._newItemDescription}" @input="${t=>this._newItemDescription=t.target.value}"></ha-textfield><div class="row"><ha-textfield label="Priority" type="number" min="1" max="10" .value="${this._newItemPriority}" @input="${t=>this._newItemPriority=t.target.value}"></ha-textfield><ha-textfield label="Due Date" type="date" .value="${this._newItemDueDate}" @input="${t=>this._newItemDueDate=t.target.value}"></ha-textfield><ha-textfield label="Time (optional)" type="time" .value="${this._newItemDueTime}" @input="${t=>this._newItemDueTime=t.target.value}"></ha-textfield></div><ha-icon-picker label="Icon" .value="${this._newItemIcon}" @value-changed="${t=>this._newItemIcon=t.detail.value}"></ha-icon-picker><div class="buttons"><mwc-button @click="${()=>{this._isAddAreaOpen=!1,this._resetNewItemInputs()}}" class="btn btn-cancel">Cancel</mwc-button><mwc-button @click="${this._handleAddItem}" raised class="btn btn-add">Add</mwc-button></div></div>`}_renderEditTaskForm(t){return B`<div class="add-edit-area edit-area" style="background-color: ${this._config.card_color};" @keydown="${e=>this._handleKeyDown(e,()=>this._handleSaveEdit(t))}"><h3>Edit Task</h3><ha-textfield label="Title" .value="${this._editSummary}" @input="${t=>this._editSummary=t.target.value}"></ha-textfield><ha-textfield label="Description (optional)" .value="${this._editDescription}" @input="${t=>this._editDescription=t.target.value}"></ha-textfield><div class="row"><ha-textfield label="Priority" type="number" min="1" max="10" .value="${this._editPriority}" @input="${t=>this._editPriority=t.target.value}"></ha-textfield><ha-textfield label="Due Date" type="date" .value="${this._editDueDate}" @input="${t=>this._editDueDate=t.target.value}"></ha-textfield><ha-textfield label="Time (optional)" type="time" .value="${this._editDueTime}" @input="${t=>this._editDueTime=t.target.value}"></ha-textfield></div><ha-icon-picker label="Icon" .value="${this._editIcon}" @value-changed="${t=>this._editIcon=t.detail.value}"></ha-icon-picker><div class="buttons"><mwc-button @click="${e=>this._handleDeleteItem(e,t)}" class="btn btn-delete">Delete</mwc-button><div style="flex-grow: 1;"></div><mwc-button @click="${()=>{this._editedTaskId=null,this._resetEditInputs()}}" class="btn btn-cancel">Cancel</mwc-button><mwc-button @click="${()=>this._handleSaveEdit(t)}" raised class="btn btn-add">Save</mwc-button></div></div>`}_renderAddShoppingItemForm(){return B`
    <div class="add-edit-area" style="background-color: ${this._config.card_color};" @keydown="${t=>this._handleKeyDown(t,()=>this._handleAddItem())}">
        <h3>New Shopping Item</h3>
        <div class="row">
            <ha-textfield label="Item Name" .value="${this._newItemSummary}" @input="${t=>this._newItemSummary=t.target.value}" style="flex-grow: 1;"></ha-textfield>
            <ha-textfield label="Qty" type="number" min="1" .value="${this._newItemQuantity}" @input="${t=>this._newItemQuantity=t.target.value}" style="width: 30%;"></ha-textfield>
        </div>
        <ha-textfield label="Description (optional)" .value="${this._newItemDescription}" @input="${t=>this._newItemDescription=t.target.value}"></ha-textfield>
        <ha-textfield label="Link (optional)" .value="${this._newItemLink}" @input="${t=>this._newItemLink=t.target.value}"></ha-textfield>
        <ha-icon-picker label="Icon" .value="${this._newItemIcon}" @value-changed="${t=>this._newItemIcon=t.detail.value}"></ha-icon-picker>
        <div class="buttons">
            <mwc-button @click="${()=>{this._isAddAreaOpen=!1,this._resetNewItemInputs()}}" class="btn btn-cancel">Cancel</mwc-button>
            <mwc-button @click="${this._handleAddItem}" raised class="btn btn-add">Add</mwc-button>
        </div>
    </div>`}_renderEditShoppingItemForm(t){return B`
    <div class="add-edit-area edit-area" style="background-color: ${this._config.card_color};" @keydown="${e=>this._handleKeyDown(e,()=>this._handleSaveEdit(t))}">
        <h3>Edit Item</h3>
        <div class="row">
            <ha-textfield label="Item Name" .value="${this._editSummary}" @input="${t=>this._editSummary=t.target.value}" style="flex-grow: 1;"></ha-textfield>
            <ha-textfield label="Qty" type="number" min="1" .value="${this._editQuantity}" @input="${t=>this._editQuantity=t.target.value}" style="width: 30%;"></ha-textfield>
        </div>
        <ha-textfield label="Description (optional)" .value="${this._editDescription}" @input="${t=>this._editDescription=t.target.value}"></ha-textfield>
        <ha-textfield label="Link (optional)" .value="${this._editLink}" @input="${t=>this._editLink=t.target.value}"></ha-textfield>
        <ha-icon-picker label="Icon" .value="${this._editIcon}" @value-changed="${t=>this._editIcon=t.detail.value}"></ha-icon-picker>
        <div class="buttons">
            <mwc-button @click="${e=>this._handleDeleteItem(e,t)}" class="btn btn-delete">Delete</mwc-button>
            <div style="flex-grow: 1;"></div>
            <mwc-button @click="${()=>{this._editedTaskId=null,this._resetEditInputs()}}" class="btn btn-cancel">Cancel</mwc-button>
            <mwc-button @click="${()=>this._handleSaveEdit(t)}" raised class="btn btn-add">Save</mwc-button>
        </div>
    </div>`}_renderPriorityLabel(t){const e=this._getPriorityInfo(t);return e?B`<span class="priority-label" style="background-color: ${e.color};" title="Priority: ${t}">${e.text}</span>`:""}_renderSubtasks(t){const e=t._cachedMetadata?.subtasks||[];return B`
      <div class="subtask-area" style="background-color: ${this._config.card_color};">
          <ul class="subtask-list">
              ${e.map(e=>B`
                  <li class="subtask-item ${e.status}">
                      <div class="checkbox" @click="${i=>this._handleSubtaskStatusUpdate(i,t,e.uid)}">
                          <ha-icon icon="${"completed"===e.status?"mdi:checkbox-marked":"mdi:checkbox-blank-outline"}"></ha-icon>
                      </div>
                      <span class="subtask-summary">${e.summary}</span>
                      <ha-icon-button class="delete-subtask" @click="${i=>this._handleDeleteSubtask(i,t,e.uid)}">
                          <ha-icon icon="mdi:close"></ha-icon>
                      </ha-icon-button>
                  </li>
              `)}
          </ul>
          <div class="add-subtask-row">
              <ha-textfield id="subtask-input-${t.uid}" placeholder="Add new sub-item" @keydown="${e=>{"Enter"===e.key&&this._handleAddSubtask(e,t)}}"></ha-textfield>
              <mwc-button raised class="btn btn-add-subtask" @click="${e=>this._handleAddSubtask(e,t)}"><ha-icon icon="mdi:plus"></ha-icon></mwc-button>
          </div>
          <div class="subtask-buttons">
              <div style="flex-grow: 1;"></div>
              <mwc-button @click="${e=>{e.stopPropagation(),this._toggleEditMode(t.uid)}}" class="btn btn-edit">Edit Details</mwc-button>
          </div>
      </div>
    `}_renderTask(t){const e="completed"===t.status,i=e?this._config.completed_text_color:this._config.text_color,s=t._cachedMetadata??{},a=s.description||null,o=s.priority||dt,n=s.icon||"mdi:hammer",r=t.due||null,d=this._getDueDateStatus(r),c=s.subtasks||[],l=c.filter(t=>"completed"===t.status).length,h=c.length,u=!!a,p=!e&&!!r;return B`
      <div class="task-container">
        <div class="task-item ${e?"completed":"active"} ${d||""}" @click="${()=>this._toggleExpand(t.uid)}" style="background-color: ${e?this._config.completed_color:this._config.card_color}; color: ${i};">
          <div class="icon" style="background-color: ${this._config.icon_background};"><ha-icon icon="${n}"></ha-icon></div>
          <div class="task-text">
            <div class="summary">
              <span>${t.summary}</span>
              ${this._config.show_priority&&!e?this._renderPriorityLabel(o):""}
              ${h>0&&!e?B`
                <div class="subtask-progress" title="${l} of ${h} completed">
                  <ha-icon icon="mdi:format-list-checks"></ha-icon>
                  <span>${l}/${h}</span>
                  <div class="progress-bar-background"><div class="progress-bar-foreground" style="width: ${h>0?l/h*100:0}%;"></div></div>
                </div>
              `:""}
            </div>
            ${u||p?B`
              <div class="priority">
                ${u?B`<span>${a}</span>`:""}
                ${u&&p?B`<span class="separator"> </span>`:""}
                ${p?B`<span class="due-date-wrapper"><ha-icon icon="mdi:clock-time-four"></ha-icon>${this._formatDueDate(r)}</span>`:""}
              </div>
            `:""}
          </div>
          <div class="checkbox" @click="${e=>this._handleStatusUpdate(e,t)}"><ha-icon icon="${e?"mdi:checkbox-marked":"mdi:checkbox-blank-outline"}"></ha-icon></div>
        </div>
        ${this._expandedTaskId===t.uid?this._renderSubtasks(t):""}
        ${this._editedTaskId===t.uid?this._renderEditForm(t):""}
      </div>
    `}_renderShoppingItem(t){const e="completed"===t.status,i=e?this._config.completed_text_color:this._config.text_color,s=t._cachedMetadata??{},a=s.description||null,o=s.link||null,n=s.quantity||null,r=s.subtasks||[],d=r.filter(t=>"completed"===t.status).length,c=r.length,l=s.icon||ct,h=l!==ct;return B`
      <div class="task-container">
        <div class="task-item shopping-item ${e?"completed":"active"}" @click="${()=>this._toggleExpand(t.uid)}" style="background-color: ${e?this._config.completed_color:this._config.card_color}; color: ${i};">
          ${h?B`<div class="icon" style="background-color: ${this._config.icon_background};"><ha-icon icon="${l}"></ha-icon></div>`:""}
          <div class="task-text" style="${h?"padding-left: 0;":""}">
            <div class="summary">
                <span>${t.summary}</span>
                ${n?B`<span class="quantity">(x${n})</span>`:""}
                ${c>0&&!e?B`
                    <div class="subtask-progress" title="${d} of ${c} completed">
                        <ha-icon icon="mdi:format-list-checks"></ha-icon>
                        <span>${d}/${c}</span>
                        <div class="progress-bar-background"><div class="progress-bar-foreground" style="width: ${c>0?d/c*100:0}%;"></div></div>
                    </div>
                `:""}
            </div>
            ${a?B`<div class="priority">${a}</div>`:""}
          </div>
          ${o?B`<ha-icon class="link-button" icon="mdi:open-in-new" @click="${t=>this._handleOpenLink(t,o)}"></ha-icon>`:""}
          <div class="checkbox" @click="${e=>this._handleStatusUpdate(e,t)}"><ha-icon icon="${e?"mdi:checkbox-marked":"mdi:checkbox-blank-outline"}"></ha-icon></div>
        </div>
        ${this._expandedTaskId===t.uid?this._renderSubtasks(t):""}
        ${this._editedTaskId===t.uid?this._renderEditForm(t):""}
      </div>
    `}static get styles(){return o`
      :host {
        display: block;
        position: relative; /* Allows z-index to work */
      }
      ha-card { 
        display: flex; 
        flex-direction: column; 
        height: 100%; 
        overflow: visible; /* Allows dropdown to extend outside */
        /* isolation: isolate; REMOVED to allow stacking interactions with siblings */
      }
      .card-header { display: flex; justify-content: space-between; align-items: center; }
      .header-text { flex-grow: 1; }
      .card-header .name { font-size: 20px; font-weight: 500; }
      .header-count { font-size: 12px; color: var(--secondary-text-color); opacity: 0.9; }
      .header-buttons { display: flex; align-items: center; gap: 4px; }
      .clear-button, .add-button, .filter-button, .search-button { color: var(--secondary-text-color); }
      ha-icon {display:flex!important;}
      .btn {border-radius: 20px; padding: 4px 12px; pointer: cursor;}
      .btn-edit, .btn-add {background:var(--primary-color); color: var(--mdc-theme-on-secondary); }
      .btn-delete {background:var(--error-color); color: var(--text-primary-color); }
      .btn-cancel {background:var(--card-background-color);}
      .warning, .empty-list, .loading { padding: 16px; text-align: center; }
      .error-message { padding: 12px; margin: 0 12px 12px; background-color: var(--error-color); color: var(--text-primary-color); border-radius: var(--ha-card-border-radius, 12px); text-align: center; cursor: pointer; }
      .card-content { flex-grow: 1; overflow-y: auto; }
      .task-item { display: flex; align-items: center; padding: 4px; min-height: 58px; border-radius: var(--ha-card-border-radius, 12px); cursor: pointer; margin-top: 8px; position: relative; z-index: 1; }
      .summary { font-weight: 500; font-size: 16px; display: flex; align-items: center; flex-wrap: wrap; gap: 0 4px; }
      .priority-label { font-size: 11px; font-weight: 600; padding: 2px 6px; border-radius: 8px; margin-left: 4px; color: var(--text-primary-color); opacity: 0.9; flex-shrink: 0; }
      .task-item.overdue .due-date-wrapper { color: var(--error-color)!important; }
      .task-item.due-today .due-date-wrapper { color: var(--warning-color)!important; }
      .task-container:first-child .task-item { margin-top: 0; }
      .task-item.completed { opacity: 0.7; }
      .completed .summary > span:first-child { text-decoration: line-through; }
      .completed .priority { color: inherit; }
      .icon { display: flex; align-items: center; justify-content: center; width: 58px; height: 58px; border-radius: 50%; margin-right: 12px; flex-shrink: 0; }
      .task-text { flex-grow: 1; overflow: hidden; text-overflow: ellipsis; padding: 0; }
      .quantity { font-weight: normal; opacity: 0.8; margin-left: 4px; flex-shrink: 0; }
      .priority { font-size: 14px; font-weight: 400; opacity: 0.7; display: flex; align-items: center; flex-wrap: wrap; }
      .priority .separator { margin: 0 3px; }
      .due-date-wrapper { display: inline-flex; align-items: center; }
      .due-date-wrapper ha-icon { --mdc-icon-size: 1.1em; margin-right: 4px; opacity: 0.9; }
      .checkbox { margin-left: 8px; margin-right: 8px; border-radius: 50%; padding: 4px; transition: background-color 0.2s; }
      .checkbox:hover { background-color: rgba(255, 255, 255, 0.1); }
      .add-edit-area { border-radius: var(--ha-card-border-radius, 12px); margin-bottom: 12px; animation: slide-down 0.3s ease-out; position: relative; z-index: 0; padding: 16px; }
      .edit-area { margin-top: -56px; padding-top: 66px; }
      .add-edit-area.edit-area { animation: slide-down-subtle 0.3s ease-out; }
      .add-edit-area h3 { margin: 0 0 16px; }
      .add-edit-area ha-textfield, .add-edit-area ha-icon-picker { display: block; width: 100%; margin-bottom: 8px; --mdc-text-field-fill-color: rgba(0,0,0,0.2); }
      .add-edit-area .row { display: flex; gap: 8px; align-items: flex-end; }
      .add-edit-area .buttons, .subtask-buttons { display: flex; justify-content: flex-end; margin-top: 16px; gap: 12px; }
      .shopping-item .task-text { padding-left: 20px; }
      .link-button { margin-left: auto; color: var(--secondary-text-color); }
      .subtask-progress { display: flex; align-items: center; font-size: 12px; margin-left: 8px; color: var(--secondary-text-color); background: rgba(128, 128, 128, 0.2); padding: 2px 6px; border-radius: 8px; flex-shrink: 0;}
      .subtask-progress ha-icon { --mdc-icon-size: 1.2em; margin-right: 4px; }
      .progress-bar-background { flex-grow: 1; height: 4px; background-color: rgba(128, 128, 128, 0.3); border-radius: 2px; margin-left: 6px; min-width: 30px; }
      .progress-bar-foreground { height: 100%; background-color: var(--secondary-text-color); border-radius: 2px; transition: width 0.3s ease; }
      .subtask-area { padding: 30px 12px 12px 12px; margin-top: -26px; border-bottom-left-radius: var(--ha-card-border-radius, 12px); border-bottom-right-radius: var(--ha-card-border-radius, 12px); animation: slide-down-subtle 0.3s ease-out; }
      .subtask-list { list-style: none; padding: 0; margin: 0 0 12px 0; }
      .subtask-item { display: flex; align-items: center; padding: 4px 0; }
      .subtask-item .checkbox { margin-left: 0; }
      .subtask-summary { flex-grow: 1; opacity: 0.9; }
      .subtask-item.completed .subtask-summary { text-decoration: line-through; opacity: 0.7; }
      .delete-subtask { --mdc-icon-button-size: 32px; color: var(--secondary-text-color); }
      .add-subtask-row { display: flex; gap: 8px; align-items: center; }
      .add-subtask-row ha-textfield { flex-grow: 1; --mdc-text-field-fill-color: rgba(0,0,0,0.2); }
      
      /* Search Bar Styles */
      .search-bar-container { padding: 0 16px 30px 16px; animation: slide-down-subtle 0.2s ease-out; }
      .search-bar-container ha-textfield { width: 100%; }

      /* Filter Menu Styles */
      .filter-menu-container { position: relative; }
      .filter-dropdown { 
        position: absolute; 
        top: 100%; 
        right: 0; 
        z-index: 100; 
        background: var(--ha-card-background, var(--card-background-color, white)); 
        box-shadow: 0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12);
        border-radius: 4px; 
        padding: 8px 0; 
        min-width: 150px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      }
      .filter-option { 
        display: flex; 
        align-items: center; 
        padding: 8px 16px; 
        cursor: pointer; 
        transition: background-color 0.1s; 
      }
      .filter-option:hover { background-color: rgba(128,128,128,0.1); }
      .filter-option ha-icon { margin-right: 12px; --mdc-icon-size: 20px; color: var(--primary-color); }
      .filter-option span { font-size: 14px; color: var(--primary-text-color); }

      @keyframes slide-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes slide-down-subtle { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    `}}),customElements.define("todo-list-card-editor",class extends nt{static get properties(){return{hass:{type:Object},_config:{type:Object}}}setConfig(t){this._config=t}configChanged(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}render(){return this.hass&&this._config?B`
      <div class="card-config">
        <ha-entity-picker label="Entity" .hass=${this.hass} .value=${this._config.entity} .includeDomains=${["todo"]} @value-changed=${this._entityChanged} allow-custom-entity></ha-entity-picker>
        <ha-textfield label="Title" .value=${this._config.title||""} @input=${this._titleChanged}></ha-textfield>
        <div class="row">
            <ha-select label="Sort By" .value=${this._config.sort_by||"priority"} @closed=${this._sortbyChanged} fixedMenuPosition naturalMenuWidth>
              <mwc-list-item value="priority">Priority</mwc-list-item>
              <mwc-list-item value="duedate">Due Date</mwc-list-item>
              <mwc-list-item value="title">Title</mwc-list-item>
            </ha-select>
            <ha-select label="Sort Order" .value=${this._config.sort_order||"asc"} @closed=${this._sortorderChanged} fixedMenuPosition naturalMenuWidth>
              <mwc-list-item value="asc">Ascending</mwc-list-item>
              <mwc-list-item value="desc">Descending</mwc-list-item>
            </ha-select>
        </div>
        <ha-select label="Mode" .value=${this._config.mode||"tasks"} @closed=${this._modeChanged} fixedMenuPosition naturalMenuWidth>
          <mwc-list-item value="tasks">Tasks</mwc-list-item>
          <mwc-list-item value="shopping">Shopping</mwc-list-item>
        </ha-select>
        <ha-textfield label="Card Background (CSS)" .value=${this._config.card_background||lt} .helper=${"Use any CSS background. Set to 'none' for no padding."} .helperPersistent=${!0} @input=${this._cardBackgroundChanged}></ha-textfield>
        <ha-textfield label="Card Color (CSS)" .value=${this._config.card_color||ht} @input=${this._cardColorChanged}></ha-textfield>
        <ha-textfield label="Completed Color (CSS)" .value=${this._config.completed_color||ut} @input=${this._completedColorChanged}></ha-textfield>
        <ha-textfield label="Icon Background (CSS)" .value=${this._config.icon_background||pt} @input=${this._iconBackgroundChanged}></ha-textfield>
        <ha-textfield label="Text Color (CSS)" .value=${this._config.text_color||_t} @input=${this._textColorChanged}></ha-textfield>
        <ha-textfield label="Completed Text Color (CSS)" .value=${this._config.completed_text_color||mt} @input=${this._completedTextColorChanged}></ha-textfield>
        <ha-formfield label="Show Priority"><ha-switch .checked=${!1!==this._config.show_priority} @change=${this._showPriorityChanged}></ha-switch></ha-formfield>
        <ha-formfield label="Confirm Before Delete"><ha-switch .checked=${!1!==this._config.confirm_delete} @change=${this._confirmDeleteChanged}></ha-switch></ha-formfield>
        <ha-formfield label="Auto-complete parent task"><ha-switch .checked=${!0===this._config.auto_complete_parent} @change=${this._autoCompleteChanged}></ha-switch></ha-formfield>
        <ha-formfield label="Show Filter Menu"><ha-switch .checked=${!1!==this._config.show_filter_menu} @change=${this._showFilterMenuChanged}></ha-switch></ha-formfield>
        <ha-formfield label="Show Search Button"><ha-switch .checked=${!1!==this._config.show_search_button} @change=${this._showSearchButtonChanged}></ha-switch></ha-formfield>
        <ha-formfield label="Show Clear Button"><ha-switch .checked=${!1!==this._config.show_clear_button} @change=${this._showClearButtonChanged}></ha-switch></ha-formfield>
      </div>
    `:B``}_entityChanged(t){this.configChanged({...this._config,entity:t.detail.value})}_titleChanged(t){this.configChanged({...this._config,title:t.target.value})}_sortbyChanged(t){t.stopPropagation(),t.target.value&&this.configChanged({...this._config,sort_by:t.target.value})}_sortorderChanged(t){t.stopPropagation(),t.target.value&&this.configChanged({...this._config,sort_order:t.target.value})}_modeChanged(t){t.stopPropagation(),t.target.value&&this.configChanged({...this._config,mode:t.target.value})}_cardBackgroundChanged(t){this.configChanged({...this._config,card_background:t.target.value})}_cardColorChanged(t){this.configChanged({...this._config,card_color:t.target.value})}_completedColorChanged(t){this.configChanged({...this._config,completed_color:t.target.value})}_iconBackgroundChanged(t){this.configChanged({...this._config,icon_background:t.target.value})}_textColorChanged(t){this.configChanged({...this._config,text_color:t.target.value})}_completedTextColorChanged(t){this.configChanged({...this._config,completed_text_color:t.target.value})}_showPriorityChanged(t){this.configChanged({...this._config,show_priority:t.target.checked})}_confirmDeleteChanged(t){this.configChanged({...this._config,confirm_delete:t.target.checked})}_autoCompleteChanged(t){this.configChanged({...this._config,auto_complete_parent:t.target.checked})}_showFilterMenuChanged(t){this.configChanged({...this._config,show_filter_menu:t.target.checked})}_showSearchButtonChanged(t){this.configChanged({...this._config,show_search_button:t.target.checked})}_showClearButtonChanged(t){this.configChanged({...this._config,show_clear_button:t.target.checked})}static get styles(){return o`.card-config { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; } .row { display: flex; gap: 16px; } .row > * { flex: 1; } ha-formfield { display: flex; align-items: center; padding: 8px 0; }`}}),window.customCards=window.customCards||[],window.customCards.push({type:"todo-list-card",name:"Todo List Card",preview:!0,description:"A customizable card for managing todo lists with tasks and shopping modes."});
//# sourceMappingURL=todo-card.js.map
