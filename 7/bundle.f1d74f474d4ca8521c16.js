(()=>{var e={10:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var i=n(537),s=n.n(i),r=n(645),o=n.n(r)()(s());o.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",i=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),i&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),i&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,i,s,r){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(i)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<e.length;c++){var u=[].concat(e[c]);i&&o[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),s&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=s):u[4]="".concat(s)),t.push(u))}},t}},537:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[t].concat([r]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",u="year",d="date",f="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},_={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,l),r=n-s<0,o=t.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:u,w:a,d:o,D:d,h:r,m:s,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",g={};g[y]=v;var $=function(e){return e instanceof M},b=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();g[r]&&(s=r),n&&(g[r]=n,s=r);var o=t.split("-");if(!s&&o.length>1)return e(o[0])}else{var a=t.name;g[a]=t,s=a}return!i&&s&&(y=s),s||!i&&y},w=function(e,t){if($(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new M(n)},C=_;C.l=b,C.i=$,C.w=function(e,t){return w(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var M=function(){function v(e){this.$L=b(e.locale,null,!0),this.parse(e)}var m=v.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(C.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(h);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return C},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(e,t){var n=w(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return w(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<w(e)},m.$g=function(e,t,n){return C.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,c=!!C.u(t)||t,f=C.p(e),h=function(e,t){var i=C.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(o)},p=function(e,t){return C.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(f){case u:return c?h(1,0):h(31,11);case l:return c?h(1,m):h(0,m+1);case a:var g=this.$locale().weekStart||0,$=(v<g?v+7:v)-g;return h(c?_-$:_+(6-$),m);case o:case d:return p(y+"Hours",0);case r:return p(y+"Minutes",1);case s:return p(y+"Seconds",2);case i:return p(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var a,c=C.p(e),f="set"+(this.$u?"UTC":""),h=(a={},a[o]=f+"Date",a[d]=f+"Date",a[l]=f+"Month",a[u]=f+"FullYear",a[r]=f+"Hours",a[s]=f+"Minutes",a[i]=f+"Seconds",a[n]=f+"Milliseconds",a)[c],p=c===o?this.$D+(t-this.$W):t;if(c===l||c===u){var v=this.clone().set(d,1);v.$d[h](p),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[C.p(e)]()},m.add=function(n,c){var d,f=this;n=Number(n);var h=C.p(c),p=function(e){var t=w(f);return C.w(t.date(t.date()+Math.round(e*n)),f)};if(h===l)return this.set(l,this.$M+n);if(h===u)return this.set(u,this.$y+n);if(h===o)return p(1);if(h===a)return p(7);var v=(d={},d[s]=e,d[r]=t,d[i]=1e3,d)[h]||1,m=this.$d.getTime()+n*v;return C.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=C.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,u=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},d=function(e){return C.s(r%12||12,e,"0")},h=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:C.s(a+1,2,"0"),MMM:u(n.monthsShort,a,c,3),MMMM:u(c,a),D:this.$D,DD:C.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:C.s(r,2,"0"),h:d(1),hh:d(2),a:h(r,o,!0),A:h(r,o,!1),m:String(o),mm:C.s(o,2,"0"),s:String(this.$s),ss:C.s(this.$s,2,"0"),SSS:C.s(this.$ms,3,"0"),Z:s};return i.replace(p,(function(e,t){return t||v[e]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,f){var h,p=C.p(d),v=w(n),m=(v.utcOffset()-this.utcOffset())*e,_=this-v,y=C.m(this,v);return y=(h={},h[u]=y/12,h[l]=y,h[c]=y/3,h[a]=(_-m)/6048e5,h[o]=(_-m)/864e5,h[r]=_/t,h[s]=_/e,h[i]=_/1e3,h)[p]||_,f?y:C.a(y)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return g[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=b(e,t,!0);return i&&(n.$L=i),n},m.clone=function(){return C.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),E=M.prototype;return w.prototype=E,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",u],["$D",d]].forEach((function(e){E[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),w.extend=function(e,t){return e.$i||(e(t,M,w),e.$i=!0),w},w.locale=b,w.isDayjs=$,w.unix=function(e){return w(1e3*e)},w.en=g[y],w.Ls=g,w.p={},w}()},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,i=0;i<t.length;i++)if(t[i].identifier===e){n=i;break}return n}function i(e,i){for(var r={},o=[],a=0;a<e.length;a++){var l=e[a],c=i.base?l[0]+i.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var f=n(d),h={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==f)t[f].references++,t[f].updater(h);else{var p=s(h,i);i.byIndex=a,t.splice(a,0,{identifier:d,updater:p,references:1})}o.push(d)}return o}function s(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,s){var r=i(e=e||[],s=s||{});return function(e){e=e||[];for(var o=0;o<r.length;o++){var a=n(r[o]);t[a].references--}for(var l=i(e,s),c=0;c<r.length;c++){var u=n(r[c]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}r=l}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var i=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(i,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={id:i,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";const e=(e,t)=>{const n=Math.ceil(Math.min(e,t)),i=Math.floor(Math.max(e,t)),s=Math.random()*(i-n+1)+n;return Math.floor(s)},t=t=>t[e(0,t.length-1)],i=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],s="flight",r=["Moscow","Geneva","Berlin","London","Abu-Dabi","New York","Paris"],o=["Order Uber","Add luggage","Switch to comfort","Rent a car","Add breakfast","Book tickets","Lunch in city"],a=i.map((t=>(t=>({type:t,offers:Array.from({length:o.length},((n,i)=>({id:`${t[0]}-${i+1}`,title:o[i],price:e(0,200)})))}))(t))),l=[];for(let e=0;e<r.length;e++)l.push(`d-${e+1}`);const c=((t,n)=>{const i=[];return()=>{let t=e(0,n);if(i.length>=100001)return null;for(;i.includes(t);)t=e(0,n);return i.push(t),t}})(0,1e5),u=(t,n)=>{const i=e(t,n);return i<10?`0${i}`:i},d=()=>u(1,12),f=()=>u(1,31),h=()=>u(0,23),p=()=>u(0,59),v=()=>u(0,59),m=()=>u(0,99),_=Array.from({length:10},(()=>{const n=t(i),s=e(0,7),r=s?Array.from({length:s},((e,t)=>`${n[0]}-${t+1}`)):[];let o=`2024-${d()}-${f()}T${h()}:${p()}:${v()}.${m()}5Z`,a=`2024-${d()}-${f()}T${h()}:${p()}:${v()}.${m()}5Z`;return o>a&&([o,a]=[a,o]),{id:c(),basePrice:e(0,1e4),dateFrom:o,dateTo:a,destination:t(l),isFavorite:Boolean(e(0,1)),offers:r,type:n}})),y=["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Cras aliquet varius magna, non porta ligula feugiat eget.","Fusce tristique felis at fermentum pharetra.","Aliquam id orci ut lectus varius viverra.","Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.","Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.","Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.","Sed sed nisi sed augue convallis suscipit in sed felis.","Aliquam erat volutpat.","Nunc fermentum tortor ac porta dapibus.","In rutrum ac purus sit amet tempus."],g="https://loremflickr.com/248/152?random=",$=1e5,b=Array.from({length:r.length},((n,i)=>(n=>({id:`d-${n+1}`,description:Array.from({length:e(1,5)},(()=>t(y))).join(" "),name:r[n],pictures:[{src:`${g}${e(0,$)}`,description:t(y)},{src:`${g}${e(0,$)}`,description:t(y)}]}))(i))),w=_,C=b,M=a,E="afterbegin",D="beforeend";function S(e,t,n=D){if(!(e instanceof U))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function A(e,t){if(!(e instanceof U&&t instanceof U))throw new Error("Can replace only components");const n=e.element,i=t.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}function x(e){if(null!==e){if(!(e instanceof U))throw new Error("Can remove only components");e.element.remove(),e.removeElement()}}var T=n(379),k=n.n(T),L=n(795),F=n.n(L),O=n(569),I=n.n(O),B=n(565),Y=n.n(B),H=n(216),j=n.n(H),P=n(589),q=n.n(P),N=n(10),V={};V.styleTagTransform=q(),V.setAttributes=Y(),V.insert=I().bind(null,"head"),V.domAPI=F(),V.insertStyleElement=j(),k()(N.Z,V),N.Z&&N.Z.locals&&N.Z.locals;const R="shake";class U{#e=null;constructor(){if(new.target===U)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(R),setTimeout((()=>{this.element.classList.remove(R),e?.()}),600)}}class W extends U{get template(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n      <label class="trip-sort__btn" for="sort-day">Day</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event"\n        disabled>\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time">Time</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price"\n        checked>\n      <label class="trip-sort__btn" for="sort-price">Price</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer"\n        disabled>\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n  </form>'}}class Z extends U{get template(){return'<ul class="trip-events__list"></ul>'}}var z=n(484),J=n.n(z);const X=e=>e.toString().padStart(2,"0"),K={formatDayTime:e=>J()(e).format("DD/MM/YY HH:mm"),formatDay:e=>J()(e).format("YYYY-MM-DD"),formatBriefDay:e=>J()(e).format("MMM D"),formatOnlyTime:e=>J()(e).format("hh:mm"),formatMachineTime:e=>J()(e).format("YYYY-MM-DDTHH:mm"),calculateDuration(e,t){e=J()(e);const n=(t=J()(t)).diff(e,"day"),i=t.diff(e,"hour"),s=X(i%24),r=X(t.diff(e,"minute")%60),o=[];return o.push(n?`${X(n)}D`:"",i?`${s}H`:"",`${r}M`),o.join(" ").trim()},isCurrent:(e,t)=>J()().isAfter(e,"day")||J()().isSame(e,"day")&&J()().isBefore(t,"day")||J()().isSame(t,"day"),isFuture:e=>J()().isBefore(e,"day"),isPast:e=>J()().isAfter(e,"day")},G="everything",Q="future",ee="present",te="past",ne=G,ie={[G]:e=>e,[Q]:e=>e.filter((e=>K.isFuture(e.dateFrom))),[ee]:e=>e.filter((e=>K.isCurrent(e.dateFrom,e.dateTo))),[te]:e=>e.filter((e=>K.isPast(e.dateTo)))};class se extends U{#t=null;#n=null;constructor({err:e,filter:t}){super(),this.#t=e,this.#n=t}get template(){return e=this.#t,t=this.#n,`<p class="trip-events__msg">${((e,t)=>e?"Failed to load latest route information":t===ne?"Click New Event to create your first point":`There are no ${t} events now`)(e,t)}</p>`;var e,t}}class re extends U{get template(){return'<li class="trip-events__item"></li>'}}class oe extends U{#i=null;#s=null;#r=null;#o=null;#a=null;constructor({event:e,destination:t,offers:n,onEdit:i,onSelect:s}){super(),this.#i=e,this.#s=t,this.#r=n,this.#o=i,this.#a=s,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#l),this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#c)}get template(){return((e,t,n)=>{const{type:i,offers:s,dateFrom:r,dateTo:o}=e,a=K.formatDay(r),l=K.formatBriefDay(r),c=K.formatOnlyTime(r),u=K.formatMachineTime(r),d=K.formatOnlyTime(o),f=K.formatMachineTime(o),h=K.calculateDuration(r,o),p=0!==s.length?s.map((e=>(({title:e,price:t})=>`<li class="event__offer"><span class="event__offer-title">${e}</span>\n    &plus;&euro;&nbsp; <span class="event__offer-price">${t}</span>\n  </li>`)(n.find((t=>t.id===e))))).join("\n"):"",v=e.isFavorite?"event__favorite-btn--active":"";return`<div class="event">\n      <time class="event__date" datetime="${a}">${l}</time>\n\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${i}.png" alt="Event type icon">\n      </div>\n\n      <h3 class="event__title">${i} ${t.name}</h3>\n\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="${u}">${c}</time> &mdash;\n          <time class="event__end-time" datetime="${f}">${d}</time>\n        </p>\n        <p class="event__duration">${h}</p>\n      </div>\n\n      <p class="event__price">&euro;&nbsp; <span class="event__price-value">${e.basePrice}</span></p>\n\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        ${p}\n      </ul>\n\n      <button class="event__favorite-btn ${v}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />\n        </svg>\n      </button>\n\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>`})(this.#i,this.#s,this.#r)}#l=e=>{e.preventDefault(),this.#o()};#c=e=>{e.preventDefault(),this.#a()}}class ae extends U{#u=null;constructor(e){super(),this.#u=e}get template(){return((e=s)=>`<div class="event__type-wrapper">\n    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n      <span class="visually-hidden">Choose event type</span>\n      <img class="event__type-icon" width="17" height="17" src="img/icons/${e}.png" alt="Event type icon">\n    </label>\n    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n    <div class="event__type-list">\n      <fieldset class="event__type-group">\n        <legend class="visually-hidden">Event type</legend>\n        ${i.map((t=>((e,t=s)=>`<div class="event__type-item">\n    <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"\n      value="${e}" ${e===t?"checked":""}>\n    <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${e[0].toUpperCase()+e.slice(1)}</label>\n  </div>`)(t,e))).join("\n")}\n      </fieldset>\n    </div>\n  </div>`)(this.#u)}}class le extends U{#s=null;constructor({destination:e}){super(),this.#s=e}get template(){return(({description:e,pictures:t})=>{const n=t.length?(e=>`<div class="event__photos-container">\n    <div class="event__photos-tape">\n      ${e.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}">`)).join("\n")}\n    </div>\n  </div>`)(t):"";return` <section class="event__section  event__section--destination">\n    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n    <p class="event__destination-description">${e}</p>\n    ${n}\n  </section>`})(this.#s)}}class ce extends U{#r=null;#d=null;constructor({offers:e,offersIds:t}){super(),this.#r=e,this.#d=t}get template(){return((e,t=[])=>`<section class="event__section  event__section--offers">\n    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n    <div class="event__available-offers">\n      ${e.map((e=>((e,t)=>{const n=e.title.split(" ").pop();return`<div class="event__offer-selector">\n    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${n}-1" type="checkbox" name="event-offer-${n}" ${t.includes(e.id)?"checked":""}>\n    <label class="event__offer-label" for="event-offer-${n}-1"><span class="event__offer-title">${e.title}</span>\n      &plus;&euro;&nbsp; <span class="event__offer-price">${e.price}</span></label>\n  </div>`})(e,t))).join("\n")}\n    </div>\n  </section>`)(this.#r,this.#d)}}class ue extends U{#r=null;#d=null;#s=null;constructor({offers:e,offersIds:t,destination:n}){super(),this.#r=e,this.#d=t,this.#s=n}get template(){return e=this.#r,t=this.#d,n=this.#s,`<section class="event__details">\n    ${e?new ce({offers:e,offersIds:t}).template:""}\n    ${n?new le({destination:n}).template:""}\n  </section>`;var e,t,n}}class de extends U{#i=null;#f=null;#r=null;#h=null;#p=null;constructor({event:e,destinations:t,offers:n,onFormSubmit:i,onFormReset:s}){super(),this.#i=e,this.#f=t,this.#r=n,this.#h=s,this.#p=i,this.element.addEventListener("submit",this.#v),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#m)}get template(){return((e,t,n)=>{const{offers:i,destination:s,type:r,basePrice:o,dateFrom:a,dateTo:l}=e,c=K.formatDayTime(a),u=K.formatDayTime(l),d=new ae(r).template,f=t.find((e=>e.id===s)),h=n||t?new ue({offers:n,offersIds:i,destination:f}).template:"";return`<form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n\n          ${d}\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-1">\n              ${r}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-1" type="text"\n            name="event-destination" value="${f.name}" list="destination-list-1">\n            <datalist id="destination-list-1">\n              ${t.map((e=>`<option value="${e.name}"></option>`)).join("\n")}\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-1">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${c}"> &mdash;\n            <label class="visually-hidden" for="event-end-time-1">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${u}">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-1"><span class="visually-hidden">${o}</span> &euro;</label>\n            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${o}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Delete</button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        </header>\n\n        ${h}\n      </form>`})(this.#i,this.#f,this.#r)}#v=e=>{e.preventDefault(),this.#p()};#m=e=>{e.preventDefault(),this.#h()}}const fe="view",he="edit";class pe{#_=null;#y=null;#f=null;#r=null;#i=null;#g=null;#$=null;#b=null;#w=null;#C=null;#M=fe;constructor({container:e,model:t,onDataChange:n,onModeChange:i}){this.#_=e,this.#y=t,this.#w=n,this.#C=i,this.#f=t.destinations,this.#r=t.offers,this.#g=new re,S(this.#g,this.#_)}init(e){this.#i=e;const t=this.#$,n=this.#b,i=this.#y.getOffersByType(this.#i.type),s=this.#y.getDestinationById(this.#i.destination);this.#$=new oe({event:this.#i,destination:s,offers:i,onEdit:this.#o,onSelect:this.#a}),this.#b=new de({event:this.#i,destinations:this.#f,offers:i,onFormSubmit:this.#v,onFormReset:this.#E}),null!==t&&null!==n?(this.#M===fe&&A(this.#$,t),this.#M===he&&A(this.#b,n),x(t),x(n)):S(this.#$,this.#g.element)}resetView(){this.#M!==fe&&this.#D()}destroy(){x(this.#g)}#S(){A(this.#b,this.#$),document.addEventListener("keydown",this.#A),this.#C(),this.#M=he}#D(){A(this.#$,this.#b),document.removeEventListener("keydown",this.#A),this.#M=fe}#A=e=>{"Escape"===e.key&&(e.preventDefault(),this.#D())};#o=()=>{this.#S()};#a=()=>{this.#w({...this.#i,isFavorite:!this.#i.isFavorite})};#v=()=>{this.#D()};#E=()=>{this.#D()}}class ve extends U{get template(){return'<section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>\n\n      <p class="trip-info__dates">18&nbsp;—&nbsp;20 Mar</p>\n    </div>\n\n    <p class="trip-info__cost">\n      Total: €&nbsp;<span class="trip-info__cost-value">1230</span>\n    </p>\n  </section>'}}class me extends U{#x=null;#T=null;#k=null;constructor({filters:e,currentFilter:t,onChange:n}){super(),this.#x=e,this.#T=t,this.#k=n,this.element.querySelector(".trip-filters").addEventListener("change",(e=>this.#L(e)))}get template(){return e=this.#x,t=this.#T,`<div class="trip-main__trip-controls  trip-controls">\n      <div class="trip-controls__filters">\n        <h2 class="visually-hidden">Filter events</h2>\n        <form class="trip-filters" action="#" method="get">\n          ${e.map((e=>(({filter:e,isAvailable:t},n)=>`<div class="trip-filters__filter">\n    <input id="filter-${e}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"\n      value="${e}" ${e===n?"checked":""} ${t?"":"disabled"}>\n    <label class="trip-filters__filter-label" for="filter-${e}">${e}</label>\n  </div>`)(e,t))).join("\n")}\n          <button class="visually-hidden" type="submit">Accept filter</button>\n        </form>\n      </div>\n    </div>\n  </div>`;var e,t}#L(e){this.#k(e.target.value)}}class _e extends U{get template(){return'<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>'}}const ye=document.querySelector(".trip-main"),ge=document.querySelector(".trip-events"),$e=new class{#F=null;#f=null;#r=null;get events(){return this.#F}get destinations(){return this.#f}get offers(){return this.#r}getOffersByType(e){return this.#r.find((t=>t.type===e)).offers}getDestinationById(e){return this.#f.find((t=>t.id===e))}init(){this.#F=w,this.#f=C,this.#r=M}};$e.init();const be=new class{#_=null;#y=null;#F=null;#O=!1;#I=new Map;#B=new Z;#Y=new W;_filter=ne;constructor({container:e,model:t}){this.#_=e,this.#y=t,S(this.#B,this.#_,D)}set filter(e){this._filter=e}get filter(){return this._filter}init(){this.#F=[...this.#y.events],this.filter!==ne&&(this.#F=ie[this.filter](this.#F)),this.#F.length?(this.#H(),this.#j()):this.#P()}#P(){S(new se({err:this.#O,filter:this.filter}),this.#_,E)}#H(){S(this.#Y,this.#_,E)}#j(){this.#F.forEach((e=>this.#q(e)))}#q(e){const t=new pe({container:this.#B.element,model:this.#y,onDataChange:this.#w,onModeChange:this.#C});t.init(e),this.#I.set(e.id,t)}#w=e=>{var t,n;this.#F=(t=this.#F,n=e,t.map((e=>e.id===n.id?n:e))),this.#I.get(e.id).init(e)};#C=()=>{this.#I.forEach((e=>e.resetView()))}}({container:ge,model:$e}),we=new class{#_=null;#y=null;#x=null;#n=ne;#N=new ve;#V=new _e;constructor({container:e,model:t}){this.#_=e,this.#y=t}set filter(e){this.#n=e}get filter(){return this.#n}init(){const e=[...this.#y.events];this.#x=(e=>Object.entries(ie).map((([t,n])=>({filter:t,isAvailable:0!==n(e).length}))))(e),S(this.#N,this.#_),S(new me({filters:this.#x,currentFilter:this.#n,onChange:this.#L}),this.#_),S(this.#V,this.#_)}#L=e=>{this.#n=e}}({container:ye,model:$e});be.filter="everything",be.init(),we.filter="everything",we.init()})()})();
//# sourceMappingURL=bundle.f1d74f474d4ca8521c16.js.map