!function(e){function t(t){for(var r,i,c=t[0],s=t[1],l=t[2],u=0,m=[];u<c.length;u++)i=c[u],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&m.push(n[i][0]),n[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(d&&d(t);m.length;)m.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],r=!0,c=1;c<a.length;c++){var s=a[c];0!==n[s]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=a[0]))}return e}var r={},n={0:0},o=[];function i(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=r,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(a,r,function(t){return e[t]}.bind(null,r));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="https://static-fastly.hackerearth.com/static/";var c=window.webpackJsonp_badges=window.webpackJsonp_badges||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var d=s;o.push([0,2,1]),a()}({"+rYh":function(e,t,a){e.exports={"showcase-container":"showcase-container",label:"label","points-level-section":"points-level-section","progress-data":"progress-data",data:"data","points-data":"points-data","stars-container":"stars-container",stars:"stars","dropdown-container":"dropdown-container",icon:"icon","divider-left":"divider-left","current-badge-section":"current-badge-section","badge-container":"badge-container","current-badge":"current-badge","points-details-container":"points-details-container","points-needed-statement":"points-needed-statement","level-progress-bar":"level-progress-bar","filled-bar":"filled-bar","show-more-badges":"show-more-badges","older-badges-section":"older-badges-section","older-badges-container":"older-badges-container",badge:"badge","badge-wrapper":"badge-wrapper",descriptor:"descriptor","wiki-link-wrapper":"wiki-link-wrapper","wiki-link":"wiki-link","padding-right-32":"padding-right-32","js-invisible":"js-invisible","js-no-display":"js-no-display"}},0:function(e,t,a){a("87sv"),e.exports=a("5K2z")},1:function(e,t){},"5K2z":function(e,t,a){"use strict";a.r(t);var r=a("q1tI"),n=a.n(r),o=a("i8i4"),i=a("t3Eu"),c=a.n(i),s=(a("17x9"),a("EvEz")),l=a("cr+I"),d=a.n(l),u=window.STATIC_URL,m=function(e){return"".concat(u,"/badges/practice_track/").concat(e.replaceAll("-","_"),"_0.svg")},g=function(e,t){var a=function(e){return d.a.stringify({badge_category:e.category,badge_type:e.type,badge_level:e.level})}(t);return"".concat(window.location.origin,"/@").concat(e,"?").concat(a)},b=function(e){return e.map((function(e){var t=e.badge;return{userBadgeId:e.id,badgeName:t.name,imageUrl:t.image_url,level:t.level,category:t.category,type:t.b_type}}))},f=function(e){return"".concat(e.badgeName||"HackerEarth"," badge")},p=(a("CWGD"),function(e){var t=e.badge,a=e.onClose,r=e.username,o=g(r,t),i="I just won the ".concat(t.badgeName," badge on HackerEarth. Checkout my other badges.");return n.a.createElement("div",{className:"badge-card"},n.a.createElement("div",{className:"card-top"},n.a.createElement("div",{className:"badge-image-wrapper"},n.a.createElement("img",{src:t.imageUrl,alt:t.badgeName,className:"badge-image",title:f(t)})),n.a.createElement("div",{className:"close-button",onClick:function(){a()},role:"presentation"},n.a.createElement("i",{className:"icon ui-close"}))),n.a.createElement("div",{className:"card-body"},n.a.createElement("div",{className:"card-title"},"You have won the ",t.badgeName," badge"),n.a.createElement("div",{className:"social-media-message"},i),n.a.createElement("div",{className:"social-media-share-buttons"},n.a.createElement("div",{className:"social-share-icon"},n.a.createElement("a",{className:"social-link",href:"https://www.linkedin.com/sharing/share-offsite/?url=".concat(encodeURIComponent(o)),target:"_blank",rel:"noopener noreferrer"},n.a.createElement("i",{className:"icon ui-linkedin"}))),n.a.createElement("div",{className:"social-share-icon"},n.a.createElement("a",{className:"social-link",href:"https://twitter.com/intent/tweet?text=".concat(encodeURIComponent(o)),target:"_blank",rel:"noopener noreferrer"},n.a.createElement("i",{className:"icon ui-twitter"}))),n.a.createElement("div",{className:"social-share-icon"},n.a.createElement("a",{className:"social-link",href:"https://www.facebook.com/sharer.php?u=".concat(encodeURIComponent(o)),target:"_blank",rel:"noopener noreferrer"},n.a.createElement("i",{className:"icon ui-facebook"}))))))});p.propTypes={};var v=p;a("R8RJ");function h(e){return function(e){if(Array.isArray(e))return E(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||y(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,o=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(r=a.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){c=!0,n=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw n}}return o}(e,t)||y(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){if(e){if("string"==typeof e)return E(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?E(e,t):void 0}}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var N=function(e){var t=e.userId,a=e.username,o=w(Object(r.useState)([]),2),i=o[0],l=o[1],d=w(Object(r.useState)(!1),2),u=d[0],m=d[1],g=w(Object(r.useState)(!1),2),f=g[0],p=g[1],y=function(e){var t=e.doc.data().user_badges;if(t){var a=JSON.parse(t);(a=b(a)).length>0&&(l((function(e){return[].concat(h(e),h(a))})),p(!0))}};Object(r.useEffect)((function(){if(t){m(!0);var e=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return"/badges/api/user-badges/?is_shown=".concat(e)}();Object(s.a)(e).then((function(e){var t;if(null!==(t=e.data)&&void 0!==t&&t.user_badges){var a=b(e.data.user_badges);l(a),a.length>0&&p(!0)}}),(function(){window.addAlert&&window.addAlert("Something went wrong fetching badges. Try again.")})).finally((function(){m(!1)}))}}),[t]),Object(r.useEffect)((function(){var e=i.filter((function(e){return!e.shown})).length>0;if(!u&&!e){for(var t=[],a=0;a<i.length;a+=1)i[a].shown&&t.push(i[a].userBadgeId);if(0!==t.length){var r={user_badge_ids:t};Object(s.b)("/badges/api/user-badges/",r).then((function(e){"OK"!==e.data.status&&window.addAlert?window.addAlert("Something went wrong."):(p(!1),l([]))}),(function(){window.addAlert&&window.addAlert("Something went wrong")}))}}}),[i,u]),Object(r.useEffect)((function(){window.CustomRealTimeMessageListener&&t&&window.CustomRealTimeMessageListener("gamification-user-badges",t,y)}),[t]);var E=i.filter((function(e){return!e.shown}))[0];return n.a.createElement("div",{className:"badge-win-modal-wrapper"},f&&E&&n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"badge-modal"},n.a.createElement("div",{className:"badge-card-wrapper"},n.a.createElement(v,{badge:E,username:a,onClose:function(){l((function(e){for(var t=h(e),a=0;a<t.length;a+=1)if(!t[a].shown)return t[a].shown=!0,t}))}}))),n.a.createElement(c.a,{width:window.innerWidth-20,height:window.innerHeight,wind:.03})))};N.propTypes={};var j=N,O=a("OG9N"),k=a.n(O),_=a("4JLo"),S=a("TSYQ"),P=a.n(S);a("+rYh");function T(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function A(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?T(Object(a),!0).forEach((function(t){I(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):T(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function I(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function B(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,o=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(r=a.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){c=!0,n=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw n}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return x(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return x(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var C=function(e){var t=e.trackSlug,a=e.numTotalLevels,o=e.username,i=B(Object(r.useState)(!1),2),c=i[0],l=i[1],d=B(Object(r.useState)(!1),2),u=d[0],g=d[1],b=B(Object(r.useState)(!1),2),f=b[0],p=b[1],v=B(Object(r.useState)({currPoints:0,level:0,pointsToNextBadge:30,pointsToPreviousBadge:0,currentBadge:{image_url:m(t),level:0},moreBadges:[]}),2),h=v[0],w=v[1],y=function(e){var a=e.user_progress,r=e.badges,n=a.current_score,o=a.for_next_badge,i=a.for_last_badge,c=r.length,s=B(function(e){return 0===e.length?[{image_url:m(t),level:0},[]]:(e.sort((function(e,t){return e.badge.level-t.badge.level})).reverse(),[e[0].badge,e.slice(1).map((function(e){return e.badge})).reverse()])}(r),2),l=s[0],d=s[1];w((function(e){return A(A({},e),{},{level:c,currPoints:n,pointsToNextBadge:o,pointsToPreviousBadge:i,currentBadge:l,moreBadges:d})}))};if(Object(r.useEffect)((function(){l(!0);var e=function(e,t){return"/badges/api/".concat(e,"/?category=practice_track&type=").concat(t.replaceAll("-","_"))}(o,t);Object(s.a)(e).then((function(e){var t=e.data.badge_sections;y(t[0]),l(!1)}),(function(){p(!0),l(!1)}))}),[o,t]),c)return n.a.createElement("div",{className:"showcase-container"},n.a.createElement(_.a,null));if(f)return n.a.createElement("div",{className:"showcase-container"});var E=h.currPoints,N=h.pointsToPreviousBadge,j=h.pointsToNextBadge,O=j-E,S=100*(E-N)/(j-N),T=h.level>1,I=0!==E,x=h.level===a&&a>0,C=x?"Badges Earned":"Progress in Track",R="".concat(O," points more to get the next badge");I?x&&(R="You have earned all the badges for this track"):R="Start solving problems to earn this badge";var D=function(e){var t=e.name,a=e.level;return a&&0!==a?"".concat(t," badge"):"No badge awarded"};return n.a.createElement("div",{className:"showcase-container"},n.a.createElement("div",{className:"points-level-section"},n.a.createElement("div",{className:"progress-data"},n.a.createElement("div",{className:"label padding-right-32"},"Points"),n.a.createElement("div",{className:"data points-data"},h.currPoints)),n.a.createElement("div",{className:"progress-data divider-left"},n.a.createElement("div",{className:"label"},"Level"),n.a.createElement("div",{className:"stars-container"},n.a.createElement(k.a,{classNames:"stars",count:a,value:h.level,edit:!1,color:"#D8DDE6",size:16,activeColor:"#FEC664"})))),n.a.createElement("div",{className:"current-badge-section"},n.a.createElement("div",{className:"label"},C),n.a.createElement("div",{className:"progress-data"},n.a.createElement("div",{className:"badge-container"},n.a.createElement("img",{className:"badge current-badge",src:h.currentBadge.image_url,alt:"current badge",title:D(h.currentBadge)})),n.a.createElement("div",{className:"points-details-container"},n.a.createElement("div",{className:"points-needed-statement"},R),n.a.createElement("div",{className:P()("level-progress-bar",{"js-invisible":!I,"js-no-display":x})},n.a.createElement("div",{className:"filled-bar",style:{width:"".concat(S,"%")}})),n.a.createElement("div",{className:P()("show-more-badges",{"js-invisible":!T}),onClick:function(){g((function(e){return!e}))},role:"presentation"},u?"- Show less":"+ ".concat(h.level-1," more badge(s)"))))),u&&T&&n.a.createElement("div",{className:"older-badges-section"},n.a.createElement("div",{className:P()("label",{"js-no-display":x})},"Earned badges"),n.a.createElement("div",{className:"older-badges-container"},h.moreBadges.map((function(e){var t=e.image_url,a=e.points,r=e.level;return n.a.createElement("div",{className:"badge-wrapper"},n.a.createElement("img",{className:"badge",src:t,alt:"badge level ".concat(r),title:D(e)}),n.a.createElement("div",{className:"descriptor"},a," Points"))})))),n.a.createElement("div",{className:"wiki-link-wrapper"},n.a.createElement("a",{href:"/docs/wiki/developers/points-and-badges-on-hackerearth/",target:"_blank",className:"wiki-link"},"Learn about earning badges")))};C.propTypes={};var R=C;window.renderBadgeWinModal=function(e,t){var a=t.userId,r=t.username;Object(o.render)(n.a.createElement(j,{userId:a,username:r}),document.getElementById(e))},window.renderPracticeTrackBadgeShowcase=function(e,t){var a=t.trackSlug,r=t.numTotalLevels,i=t.username;Object(o.render)(n.a.createElement(R,{trackSlug:a,numTotalLevels:r,username:i}),document.getElementById(e))}},CWGD:function(e,t,a){e.exports={"badge-card":"badge-card","card-top":"card-top","badge-image-wrapper":"badge-image-wrapper","badge-image":"badge-image","close-button":"close-button","card-body":"card-body","card-title":"card-title","social-media-message":"social-media-message","social-media-share-buttons":"social-media-share-buttons","social-share-icon":"social-share-icon","social-link":"social-link"}},R8RJ:function(e,t,a){e.exports={"badge-win-modal-wrapper":"badge-win-modal-wrapper","badge-modal":"badge-modal"}}});