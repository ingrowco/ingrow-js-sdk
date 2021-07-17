"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function getRandomString(e){for(var t="",n=0;n<e;n++)t+=Math.random().toString(36).substr(2,e-t.length);return t}function saveValue(e,t){var n;window.localStorage?window.localStorage.setItem(e,t):((n=new Date).setTime(n.getTime()+31536e7),n="expires="+n.toUTCString(),document.cookie="".concat(e,"=").concat(t,"; ").concat(n))}function getValue(e){return window.localStorage?window.localStorage.getItem(e):(null===(e=document.cookie.match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)"))||void 0===e?void 0:e.pop())||""}function getCreatedAnonymousId(){var e="ingrow_events_anonymous_id",t=getValue(e);return t||saveValue(e,t=getRandomString(32)),t}function getDeviceInfo(){var e=navigator.userAgent,t=window.screen;return{userAgent:e,screen:{width:t.width,height:t.height}}}var Ingrow=function(){function o(e,t,n){if(_classCallCheck(this,o),!e)throw"please set the apiKey";if(!t)throw"please set the projectID";this.apiKey=e,this.projectID=t,this.apiEndpoint="https://event.ingrow.co",this.anonymousId=getCreatedAnonymousId(),this.ip="autofill",this.streamDefaultName="events",this.setUserID(n)}return _createClass(o,[{key:"setUserID",value:function(e){this.userId=e||""}},{key:"setStreamDefault",value:function(e){this.streamDefaultName=e}},{key:"sendEvent",value:function(e,t,n){var o=t||this.streamDefaultName,t=n||{},n=t.sendDeviceInfo,n=void 0!==n&&n,i=t.done,r=[],t=function(e,t){r.push({name:e,input:t})};t("session",{anonymous_id:this.anonymousId,user_id:this.userId}),t("ip",{ip:this.ip}),n&&t("device",getDeviceInfo());var e={ingrow:{stream:o,project:this.projectID},enrichment:r,event:e},s=new XMLHttpRequest;s.open("POST","".concat(this.apiEndpoint,"/v1")),s.setRequestHeader("api-key",this.apiKey),s.send(JSON.stringify(e)),s.onload=function(){i&&i(s.response)},s.onerror=function(){i&&i(null,s.response)}}}]),o}();module.exports=Ingrow;
