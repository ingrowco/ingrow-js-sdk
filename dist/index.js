"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}function getRandomString(e){for(var n="";n.length<e;)n+=Math.random().toString(36).substr(2,e-n.length);return s}function saveValue(e,n){var t;window.localStorage?window.localStorage.setItem(e,n):((t=new Date).setTime(t.getTime()+31536e7),t="expires="+t.toUTCString(),document.cookie="".concat(e,"=").concat(n,"; ").concat(t))}function getValue(e){return window.localStorage?window.localStorage.getItem(e):(null===(e=document.cookie.match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)"))||void 0===e?void 0:e.pop())||""}function getCreatedAnonymousId(){var e=getValue("ingrow_events_anonymous_id");return e||saveValue("ingrow_events_anonymous_id",e=getRandomString(32)),e}function getDeviceInfo(){var e=navigator.userAgent,n=window.screen;return{userAgent:e,screen:{width:n.width,height:n.height}}}var Ingrow=function(){function o(e,n,t){_classCallCheck(this,o),this.apiKey=e,this.projectID=n,this.apiEndpoint="https://event.ingrow.co",this.anonymousId=getCreatedAnonymousId(),this.ip="autofill",this.setUserID(t)}return _createClass(o,[{key:"setUserID",value:function(e){this.userId=e||""}},{key:"sendEvent",value:function(e,n,t){var o=t||{},t=o.sendDeviceInfo,i=o.done,r=[],o=function(e,n){r.push({name:e,input:n})};o("session",{anonymous_id:this.anonymousId,user_id:this.userId}),o("ip",{ip:this.ip}),void 0!==t&&t&&o("device",getDeviceInfo());var n={ingrow:{stream:e,project:this.projectID},enrichment:r,event:n},s=new XMLHttpRequest;s.open("POST","".concat(this.apiEndpoint,"/v1")),s.setRequestHeader("api-key",this.apiKey),s.send(JSON.stringify(n)),s.onload=function(){i&&i(s.response)},s.onerror=function(){i&&i(null,s.response)}}}]),o}();module.exports=Ingrow;
