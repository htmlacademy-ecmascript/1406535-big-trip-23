(()=>{var e={10:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var s=n(537),i=n.n(s),r=n(645),o=n.n(r)()(i());o.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",s=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),s&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),s&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,s,i,r){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(s)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<e.length;c++){var u=[].concat(e[c]);s&&o[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),i&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=i):u[4]="".concat(i)),t.push(u))}},t}},537:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var s=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),r="/*# ".concat(i," */");return[t].concat([r]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",s="second",i="minute",r="hour",o="day",a="week",l="month",c="quarter",u="year",d="date",h="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var s=String(e);return!s||s.length>=t?e:""+Array(t+1-s.length).join(n)+e},_={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),s=Math.floor(n/60),i=n%60;return(t<=0?"+":"-")+m(s,2,"0")+":"+m(i,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var s=12*(n.year()-t.year())+(n.month()-t.month()),i=t.clone().add(s,l),r=n-i<0,o=t.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-o:o-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:u,w:a,d:o,D:d,h:r,m:i,s,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},g="en",y={};y[g]=v;var $=function(e){return e instanceof w},b=function e(t,n,s){var i;if(!t)return g;if("string"==typeof t){var r=t.toLowerCase();y[r]&&(i=r),n&&(y[r]=n,i=r);var o=t.split("-");if(!i&&o.length>1)return e(o[0])}else{var a=t.name;y[a]=t,i=a}return!s&&i&&(g=i),i||!s&&g},C=function(e,t){if($(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new w(n)},E=_;E.l=b,E.i=$,E.w=function(e,t){return C(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function v(e){this.$L=b(e.locale,null,!0),this.parse(e)}var m=v.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(E.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var s=t.match(f);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return E},m.isValid=function(){return!(this.$d.toString()===h)},m.isSame=function(e,t){var n=C(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return C(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<C(e)},m.$g=function(e,t,n){return E.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,c=!!E.u(t)||t,h=E.p(e),f=function(e,t){var s=E.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?s:s.endOf(o)},p=function(e,t){return E.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,m=this.$M,_=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case u:return c?f(1,0):f(31,11);case l:return c?f(1,m):f(0,m+1);case a:var y=this.$locale().weekStart||0,$=(v<y?v+7:v)-y;return f(c?_-$:_+(6-$),m);case o:case d:return p(g+"Hours",0);case r:return p(g+"Minutes",1);case i:return p(g+"Seconds",2);case s:return p(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var a,c=E.p(e),h="set"+(this.$u?"UTC":""),f=(a={},a[o]=h+"Date",a[d]=h+"Date",a[l]=h+"Month",a[u]=h+"FullYear",a[r]=h+"Hours",a[i]=h+"Minutes",a[s]=h+"Seconds",a[n]=h+"Milliseconds",a)[c],p=c===o?this.$D+(t-this.$W):t;if(c===l||c===u){var v=this.clone().set(d,1);v.$d[f](p),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](p);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[E.p(e)]()},m.add=function(n,c){var d,h=this;n=Number(n);var f=E.p(c),p=function(e){var t=C(h);return E.w(t.date(t.date()+Math.round(e*n)),h)};if(f===l)return this.set(l,this.$M+n);if(f===u)return this.set(u,this.$y+n);if(f===o)return p(1);if(f===a)return p(7);var v=(d={},d[i]=e,d[r]=t,d[s]=1e3,d)[f]||1,m=this.$d.getTime()+n*v;return E.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var s=e||"YYYY-MM-DDTHH:mm:ssZ",i=E.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,u=function(e,n,i,r){return e&&(e[n]||e(t,s))||i[n].slice(0,r)},d=function(e){return E.s(r%12||12,e,"0")},f=n.meridiem||function(e,t,n){var s=e<12?"AM":"PM";return n?s.toLowerCase():s},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:E.s(a+1,2,"0"),MMM:u(n.monthsShort,a,c,3),MMMM:u(c,a),D:this.$D,DD:E.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:E.s(r,2,"0"),h:d(1),hh:d(2),a:f(r,o,!0),A:f(r,o,!1),m:String(o),mm:E.s(o,2,"0"),s:String(this.$s),ss:E.s(this.$s,2,"0"),SSS:E.s(this.$ms,3,"0"),Z:i};return s.replace(p,(function(e,t){return t||v[e]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,h){var f,p=E.p(d),v=C(n),m=(v.utcOffset()-this.utcOffset())*e,_=this-v,g=E.m(this,v);return g=(f={},f[u]=g/12,f[l]=g,f[c]=g/3,f[a]=(_-m)/6048e5,f[o]=(_-m)/864e5,f[r]=_/t,f[i]=_/e,f[s]=_/1e3,f)[p]||_,h?g:E.a(g)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return y[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),s=b(e,t,!0);return s&&(n.$L=s),n},m.clone=function(){return E.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),M=w.prototype;return C.prototype=M,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",o],["$M",l],["$y",u],["$D",d]].forEach((function(e){M[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),C.extend=function(e,t){return e.$i||(e(t,w,C),e.$i=!0),C},C.locale=b,C.isDayjs=$,C.unix=function(e){return C(1e3*e)},C.en=y[g],C.Ls=y,C.p={},C}()},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,s=0;s<t.length;s++)if(t[s].identifier===e){n=s;break}return n}function s(e,s){for(var r={},o=[],a=0;a<e.length;a++){var l=e[a],c=s.base?l[0]+s.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var h=n(d),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==h)t[h].references++,t[h].updater(f);else{var p=i(f,s);s.byIndex=a,t.splice(a,0,{identifier:d,updater:p,references:1})}o.push(d)}return o}function i(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){var r=s(e=e||[],i=i||{});return function(e){e=e||[];for(var o=0;o<r.length;o++){var a=n(r[o]);t[a].references--}for(var l=s(e,i),c=0;c<r.length;c++){var u=n(r[c]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}r=l}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var s=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var s="";n.supports&&(s+="@supports (".concat(n.supports,") {")),n.media&&(s+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(s+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),s+=n.css,i&&(s+="}"),n.media&&(s+="}"),n.supports&&(s+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(s,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={id:s,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";const e=(e,t)=>{const n=Math.ceil(Math.min(e,t)),s=Math.floor(Math.max(e,t)),i=Math.random()*(s-n+1)+n;return Math.floor(i)},t=t=>t[e(0,t.length-1)],s=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],i="flight",r=["Moscow","Geneva","Berlin","London","Abu-Dabi","New York","Paris"],o=["Order Uber","Add luggage","Switch to comfort","Rent a car","Add breakfast","Book tickets","Lunch in city"],a=s.map((t=>(t=>({type:t,offers:Array.from({length:o.length},((n,s)=>({id:`${t[0]}-${s+1}`,title:o[s],price:e(0,200)})))}))(t))),l=[];for(let e=0;e<r.length;e++)l.push(`d-${e+1}`);const c=((t,n)=>{const s=[];return()=>{let t=e(0,n);if(s.length>=100001)return null;for(;s.includes(t);)t=e(0,n);return s.push(t),t}})(0,1e5),u=(t,n)=>{const s=e(t,n);return s<10?`0${s}`:s},d=()=>u(1,12),h=()=>u(1,31),f=()=>u(0,23),p=()=>u(0,59),v=()=>u(0,59),m=()=>u(0,99),_=Array.from({length:10},(()=>{const n=t(s),i=e(0,7),r=i?Array.from({length:i},((e,t)=>`${n[0]}-${t+1}`)):[];let o=`2024-${d()}-${h()}T${f()}:${p()}:${v()}.${m()}5Z`,a=`2024-${d()}-${h()}T${f()}:${p()}:${v()}.${m()}5Z`;return o>a&&([o,a]=[a,o]),{id:c(),basePrice:e(0,1e4),dateFrom:o,dateTo:a,destination:t(l),isFavorite:Boolean(e(0,1)),offers:r,type:n}})),g=["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Cras aliquet varius magna, non porta ligula feugiat eget.","Fusce tristique felis at fermentum pharetra.","Aliquam id orci ut lectus varius viverra.","Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.","Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.","Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.","Sed sed nisi sed augue convallis suscipit in sed felis.","Aliquam erat volutpat.","Nunc fermentum tortor ac porta dapibus.","In rutrum ac purus sit amet tempus."],y="https://loremflickr.com/248/152?random=",$=1e5,b=Array.from({length:r.length},((n,s)=>(n=>({id:`d-${n+1}`,description:Array.from({length:e(1,5)},(()=>t(g))).join(" "),name:r[n],pictures:[{src:`${y}${e(0,$)}`,description:t(g)},{src:`${y}${e(0,$)}`,description:t(g)}]}))(s))),C=_,E=b,w=a,M="afterbegin",S="beforeend";function D(e,t,n=S){if(!(e instanceof U))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function A(e,t){if(!(e instanceof U&&t instanceof U))throw new Error("Can replace only components");const n=e.element,s=t.element,i=s.parentElement;if(null===i)throw new Error("Parent element doesn't exist");i.replaceChild(n,s)}function T(e){if(null!==e){if(!(e instanceof U))throw new Error("Can remove only components");e.element.remove(),e.removeElement()}}var x=n(379),F=n.n(x),L=n(795),k=n.n(L),O=n(569),I=n.n(O),B=n(565),P=n.n(B),Y=n(216),N=n.n(Y),j=n(589),H=n.n(j),R=n(10),V={};V.styleTagTransform=H(),V.setAttributes=P(),V.insert=I().bind(null,"head"),V.domAPI=k(),V.insertStyleElement=N(),F()(R.Z,V),R.Z&&R.Z.locals&&R.Z.locals;const q="shake";class U{#e=null;constructor(){if(new.target===U)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(q),setTimeout((()=>{this.element.classList.remove(q),e?.()}),600)}}class W extends U{get template(){return'<li class="trip-events__item"></li>'}}var Z=n(484),z=n.n(Z);const J=e=>e.toString().padStart(2,"0"),X={format:e=>z()(e),formatDayTime:e=>z()(e).format("DD/MM/YY HH:mm"),formatDay:e=>z()(e).format("YYYY-MM-DD"),formatBriefDay:e=>z()(e).format("MMM D"),formatOnlyTime:e=>z()(e).format("hh:mm"),formatMachineTime:e=>z()(e).format("YYYY-MM-DDTHH:mm"),calcAndFormatDuration(e,t){e=z()(e);const n=(t=z()(t)).diff(e,"day"),s=t.diff(e,"hour"),i=J(s%24),r=J(t.diff(e,"minute")%60),o=[];return o.push(n?`${J(n)}D`:"",s?`${i}H`:"",`${r}M`),o.join(" ").trim()},calcDuration:(e,t)=>(e=z()(e),(t=z()(t)).diff(e)),isCurrent:(e,t)=>z()().isAfter(e)||z()().isSame(e)&&z()().isBefore(t)||z()().isSame(t),isFuture:e=>z()().isBefore(e),isPast:e=>z()().isAfter(e)};class K extends U{#t=null;#n=null;#s=null;#i=null;#r=null;constructor({event:e,destination:t,offers:n,onEdit:s,onSelect:i}){super(),this.#t=e,this.#n=t,this.#s=n,this.#i=s,this.#r=i,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#o),this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#a)}get template(){return((e,t,n)=>{const{type:s,offers:i,dateFrom:r,dateTo:o}=e,a=X.formatDay(r),l=X.formatBriefDay(r),c=X.formatOnlyTime(r),u=X.formatMachineTime(r),d=X.formatOnlyTime(o),h=X.formatMachineTime(o),f=X.calcAndFormatDuration(r,o),p=0!==i.length?i.map((e=>(({title:e,price:t})=>`<li class="event__offer"><span class="event__offer-title">${e}</span>\n    &plus;&euro;&nbsp; <span class="event__offer-price">${t}</span>\n  </li>`)(n.find((t=>t.id===e))))).join("\n"):"",v=e.isFavorite?"event__favorite-btn--active":"";return`<div class="event">\n      <time class="event__date" datetime="${a}">${l}</time>\n\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${s}.png" alt="Event type icon">\n      </div>\n\n      <h3 class="event__title">${s} ${t.name}</h3>\n\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="${u}">${c}</time> &mdash;\n          <time class="event__end-time" datetime="${h}">${d}</time>\n        </p>\n        <p class="event__duration">${f}</p>\n      </div>\n\n      <p class="event__price">&euro;&nbsp; <span class="event__price-value">${e.basePrice}</span></p>\n\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        ${p}\n      </ul>\n\n      <button class="event__favorite-btn ${v}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />\n        </svg>\n      </button>\n\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>`})(this.#t,this.#n,this.#s)}#o=e=>{e.preventDefault(),this.#i()};#a=e=>{e.preventDefault(),this.#r()}}class G extends U{#l=null;constructor(e){super(),this.#l=e}get template(){return((e=i)=>`<div class="event__type-wrapper">\n    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n      <span class="visually-hidden">Choose event type</span>\n      <img class="event__type-icon" width="17" height="17" src="img/icons/${e}.png" alt="Event type icon">\n    </label>\n    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n    <div class="event__type-list">\n      <fieldset class="event__type-group">\n        <legend class="visually-hidden">Event type</legend>\n        ${s.map((t=>((e,t=i)=>`<div class="event__type-item">\n    <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"\n      value="${e}" ${e===t?"checked":""}>\n    <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${e[0].toUpperCase()+e.slice(1)}</label>\n  </div>`)(t,e))).join("\n")}\n      </fieldset>\n    </div>\n  </div>`)(this.#l)}}class Q extends U{#n=null;constructor({destination:e}){super(),this.#n=e}get template(){return(({description:e,pictures:t})=>{const n=t.length?(e=>`<div class="event__photos-container">\n    <div class="event__photos-tape">\n      ${e.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}">`)).join("\n")}\n    </div>\n  </div>`)(t):"";return` <section class="event__section  event__section--destination">\n    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n    <p class="event__destination-description">${e}</p>\n    ${n}\n  </section>`})(this.#n)}}class ee extends U{#s=null;#c=null;constructor({offers:e,offersIds:t}){super(),this.#s=e,this.#c=t}get template(){return((e,t=[])=>`<section class="event__section  event__section--offers">\n    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n    <div class="event__available-offers">\n      ${e.map((e=>((e,t)=>{const n=e.title.split(" ").pop();return`<div class="event__offer-selector">\n    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${n}-1" type="checkbox" name="event-offer-${n}" ${t.includes(e.id)?"checked":""}>\n    <label class="event__offer-label" for="event-offer-${n}-1"><span class="event__offer-title">${e.title}</span>\n      &plus;&euro;&nbsp; <span class="event__offer-price">${e.price}</span></label>\n  </div>`})(e,t))).join("\n")}\n    </div>\n  </section>`)(this.#s,this.#c)}}class te extends U{#s=null;#c=null;#n=null;constructor({offers:e,offersIds:t,destination:n}){super(),this.#s=e,this.#c=t,this.#n=n}get template(){return e=this.#s,t=this.#c,n=this.#n,`<section class="event__details">\n    ${e?new ee({offers:e,offersIds:t}).template:""}\n    ${n?new Q({destination:n}).template:""}\n  </section>`;var e,t,n}}class ne extends U{#t=null;#u=null;#s=null;#d=null;#h=null;constructor({event:e,destinations:t,offers:n,onFormSubmit:s,onFormReset:i}){super(),this.#t=e,this.#u=t,this.#s=n,this.#d=i,this.#h=s,this.element.addEventListener("submit",this.#f),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#p)}get template(){return((e,t,n)=>{const{offers:s,destination:i,type:r,basePrice:o,dateFrom:a,dateTo:l}=e,c=X.formatDayTime(a),u=X.formatDayTime(l),d=new G(r).template,h=t.find((e=>e.id===i)),f=n||t?new te({offers:n,offersIds:s,destination:h}).template:"";return`<form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n\n          ${d}\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-1">\n              ${r}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-1" type="text"\n            name="event-destination" value="${h.name}" list="destination-list-1">\n            <datalist id="destination-list-1">\n              ${t.map((e=>`<option value="${e.name}"></option>`)).join("\n")}\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-1">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${c}"> &mdash;\n            <label class="visually-hidden" for="event-end-time-1">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${u}">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-1"><span class="visually-hidden">${o}</span> &euro;</label>\n            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${o}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Delete</button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        </header>\n\n        ${f}\n      </form>`})(this.#t,this.#u,this.#s)}#f=e=>{e.preventDefault(),this.#h()};#p=e=>{e.preventDefault(),this.#d()}}const se="view",ie="edit";class re{#v=null;#m=null;#u=null;#s=null;#t=null;#_=null;#g=null;#y=null;#$=null;#b=null;#C=se;constructor({container:e,model:t,onDataChange:n,onModeChange:s}){this.#v=e,this.#m=t,this.#$=n,this.#b=s,this.#u=t.destinations,this.#s=t.offers,this.#_=new W,D(this.#_,this.#v)}init(e){this.#t=e;const t=this.#g,n=this.#y,s=this.#m.getOffersByType(this.#t.type),i=this.#m.getDestinationById(this.#t.destination);this.#g=new K({event:this.#t,destination:i,offers:s,onEdit:this.#i,onSelect:this.#r}),this.#y=new ne({event:this.#t,destinations:this.#u,offers:s,onFormSubmit:this.#f,onFormReset:this.#E}),null!==t&&null!==n?(this.#C===se&&A(this.#g,t),this.#C===ie&&A(this.#y,n),T(t),T(n)):D(this.#g,this.#_.element)}resetView(){this.#C!==se&&this.#w()}destroy(){T(this.#_),document.removeEventListener("keydown",this.#M)}#S(){A(this.#y,this.#g),document.addEventListener("keydown",this.#M),this.#b(),this.#C=ie}#w(){A(this.#g,this.#y),document.removeEventListener("keydown",this.#M),this.#C=se}#M=e=>{"Escape"===e.key&&(e.preventDefault(),this.#w())};#i=()=>{this.#S()};#r=()=>{this.#$({...this.#t,isFavorite:!this.#t.isFavorite})};#f=()=>{this.#w()};#E=()=>{this.#w()}}class oe extends U{get template(){return'<ul class="trip-events__list"></ul>'}}class ae{#v=null;#m=null;#D=null;#A=new Map;#T=new oe;constructor({container:e,model:t}){this.#v=e,this.#m=t,D(this.#T,this.#v,S)}init(e){this.#D=e,e.forEach((e=>this.#x(e)))}#x(e){const t=new re({container:this.#T.element,model:this.#m,onDataChange:this.#$,onModeChange:this.#b});t.init(e),this.#A.set(e.id,t)}clearEventsList(){this.#A.forEach((e=>e.destroy())),this.#A.clear()}#$=e=>{var t,n;this.#D=(t=this.#D,n=e,t.map((e=>e.id===n.id?n:e))),this.#A.get(e.id).init(e)};#b=()=>{this.#A.forEach((e=>e.resetView()))}}class le extends U{get template(){return'<section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>\n\n      <p class="trip-info__dates">18&nbsp;—&nbsp;20 Mar</p>\n    </div>\n\n    <p class="trip-info__cost">\n      Total: €&nbsp;<span class="trip-info__cost-value">1230</span>\n    </p>\n  </section>'}}class ce{#v=null;#m=null;#F=new le;constructor({container:e,model:t}){this.#v=e,this.#m=t}init(){D(this.#F,this.#v,M)}}const ue="filter-";class de extends U{#L=null;#k=null;#O=null;constructor({filters:e,currentFilter:t,onChange:n}){super(),this.#L=e,this.#k=t,this.#O=n,this.element.querySelector("form").addEventListener("change",this.#I)}get template(){return e=this.#L,t=this.#k,`<div class="trip-main__trip-controls  trip-controls">\n      <div class="trip-controls__filters">\n        <h2 class="visually-hidden">Filter events</h2>\n        <form class="trip-filters" action="#" method="get">\n          ${e.map((e=>(({filter:e,isAvailable:t},n)=>`<div class="trip-filters__filter">\n    <input id="${ue}${e}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"\n      value="${e}" ${e===n?"checked":""} ${t?"":"disabled"}>\n    <label class="trip-filters__filter-label" for="${ue}${e}">${e}</label>\n  </div>`)(e,t))).join("\n")}\n          <button class="visually-hidden" type="submit">Accept filter</button>\n        </form>\n      </div>\n    </div>\n  </div>`;var e,t}#I=e=>{this.#O(e.target.id.replace(ue,""))}}class he extends U{get template(){return'<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>'}}const fe={DATE:"day",EVENT:"event",DURATION:"time",PRICE:"price",OPTION:"offers"},pe=fe.DATE,ve=[fe.EVENT,fe.OPTION],me={[fe.DATE]:e=>[...e].sort(((e,t)=>X.format(e.dateFrom)-X.format(t.dateFrom))),[fe.DURATION]:e=>[...e].sort(((e,t)=>X.calcDuration(t.dateFrom,t.dateTo)-X.calcDuration(e.dateFrom,e.dateTo))),[fe.PRICE]:e=>[...e].sort(((e,t)=>t.basePrice-e.basePrice))},_e="sort-";class ge extends U{#B=null;#O=null;#P=null;constructor({currentSort:e,onChange:t}){super(),this.#B=e,this.#O=t,this.element.addEventListener("change",this.#Y),this.#P=this.element.querySelectorAll(".trip-sort__input")}get template(){return e=this.#B,`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    ${Object.values(fe).map((t=>((e,t)=>{const n=e===t?"checked":"",s=ve.includes(e)?"disabled":"";return`<div class="trip-sort__item  trip-sort__item--${e}">\n      <input id="${_e}${e}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${e}" ${n} ${s}>\n      <label class="trip-sort__btn" for="${_e}${e}">${e}</label>\n    </div>`})(t,e))).join("\n")}\n  </form>`;var e}resetSort(){this.#P.forEach((e=>{e.checked=e.id===`${_e}${pe}`}))}#Y=e=>{this.#O(e.target.id.replace(_e,""))}}const ye="everything",$e="future",be="present",Ce="past",Ee=ye,we={[ye]:e=>e,[$e]:e=>e.filter((e=>X.isFuture(e.dateFrom))),[be]:e=>e.filter((e=>X.isCurrent(e.dateFrom,e.dateTo))),[Ce]:e=>e.filter((e=>X.isPast(e.dateTo)))};class Me extends U{#N=null;#j=null;constructor({err:e,filter:t}){super(),this.#N=e,this.#j=t}get template(){return e=this.#N,t=this.#j,`<p class="trip-events__msg">${((e,t)=>e?"Failed to load latest route information":t===Ee?"Click New Event to create your first point":`There are no ${t} events now`)(e,t)}</p>`;var e,t}}const Se=document.querySelector(".trip-main"),De=document.querySelector(".trip-events"),Ae=new class{#D=null;#u=null;#s=null;get events(){return this.#D}get destinations(){return this.#u}get offers(){return this.#s}getOffersByType(e){return this.#s.find((t=>t.type===e)).offers}getDestinationById(e){return this.#u.find((t=>t.id===e))}init(){this.#D=C,this.#u=E,this.#s=w}};Ae.init(),new class{#H=null;#R=null;#m=null;#V=null;#q=null;#D=null;#U=null;#j=null;#L=null;#W=null;#Z=null;#z=null;#J=!1;constructor({topContainer:e,bottomContainer:t,model:n}){this.#H=e,this.#R=t,this.#m=n,this.#j=Ee,this.#z=pe}init(){var e;this.#q=[...this.#m.events],this.#L=(e=this.#q,Object.entries(we).map((([t,n])=>({filter:t,isAvailable:0!==n(e).length})))),this.#D=we[this.#j](this.#q),this.#j!==Ee&&(this.#D=we[this.#j](this.#q)),this.#U=new ce({container:this.#H,model:this.#m}),this.#U.init(this.#D),this.#X(),this.#K(),this.#G(),this.#q.length?(this.#V=new ae({container:this.#R,model:this.#m}),this.#V.init(me[this.#z](this.#D))):this.#Q()}#X(){D(new de({filters:this.#L,currentFilter:this.#j,onChange:this.#I}),this.#H,S)}#K(){D(new he,this.#H,S)}#G(){this.#W=new ge({currentSort:this.#z,onChange:this.#Y}),D(this.#W,this.#R,M)}#Q(){this.#Z=new Me({err:this.#J,filter:this.#j}),A(this.#Z,this.#W)}#ee(){this.#V.clearEventsList(),this.#V.init(me[this.#z](this.#D))}#I=e=>{this.#j=e,this.#D=we[this.#j](this.#q),this.#z=pe,this.#W.resetSort(),this.#ee()};#Y=e=>{this.#z=e,this.#ee()}}({topContainer:Se,bottomContainer:De,model:Ae}).init()})()})();
//# sourceMappingURL=bundle.b4bb17bd8f9328266836.js.map