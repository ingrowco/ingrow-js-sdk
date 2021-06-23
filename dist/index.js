<<<<<<< Updated upstream
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cookieHandler = function () {
  function cookieHandler() {
    _classCallCheck(this, cookieHandler);
  }

  _createClass(cookieHandler, null, [{
    key: 'getRandomString',
    value: function getRandomString() {
      var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var result = '';
      for (var i = 0; i < 32; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
      return result;
    }
  }, {
    key: 'setCookie',
    value: function setCookie(cname) {
      var cookie = cookieHandler.getRandomString();
      document.cookie = cname + "=" + cookie;
      return cookie;
    }
  }, {
    key: 'getCookie',
    value: function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  }, {
    key: 'checkCookie',
    value: function checkCookie(cname) {
      var id = cookieHandler.getCookie(cname);
      if (id != "") {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return cookieHandler;
}();

var ingrow = function () {
  function ingrow(apiKey, projectID) {
    _classCallCheck(this, ingrow);

    this.apiKey = apiKey;
    this.projectID = projectID;
    this.apiEndpoint = "https://event.ingrow.co";
    this.anonymousId = cookieHandler.checkCookie("ingrow_events_anonymous_id") ? cookieHandler.getCookie("ingrow_events_anonymous_id") : cookieHandler.setCookie("ingrow_events_anonymous_id");
    this.ip = { IP: "autofill" };
  }

  _createClass(ingrow, [{
    key: 'sendEvent',
    value: function sendEvent(stream, data) {
      var userId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

      return fetch(this.apiEndpoint + '/v1', {
        method: "POST",
        headers: {
          "api-key": this.apiKey
        },
        body: JSON.stringify({
          ingrow: {
            stream: stream,
            project: this.projectID
          },
          enrichment: [{
            name: "session",
            input: {
              anonymous_id: this.anonymousId,
              user_id: userId
            }
          }],
          event: _extends({}, this.IP, data)
        })
      });
    }
  }]);

  return ingrow;
}();

exports.default = ingrow;
=======
<<<<<<< Updated upstream
"use strict";var _createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,"__esModule",{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function getRandomString(a){for(var b="";b.length<a;)b+=Math.random().toString(36).substr(2,a-b.length);return s}function getCreatedAnonymousId(){var a=localStorage.getItem("ingrow_events_anonymous_id");return a||(a=getRandomString(32),localStorage.setItem("ingrow_events_anonymous_id",a)),a}function getDeviceInfo(){var a=navigator,b=a.userAgent,c=a.appName,d=window,e=d.screen,f=e.width,g=e.height;return{userAgent:b,browserName:c,screen:{width:f,height:g}}}var ingrow=function(){function a(b,c,d){_classCallCheck(this,a),this.apiKey=b,this.projectID=c,this.apiEndpoint="https://event.ingrow.co",this.anonymousId=getCreatedAnonymousId(),this.ip="autofill",this.setUserID(d)}return _createClass(a,[{key:"setUserID",value:function b(a){this.userId=a||""}},{key:"sendEvent",value:function k(a,b,c){var d=c||{},e=d.sendDeviceInfo,f=d.done,g=[],h=function(a,b){g.push({name:a,input:b})};h("session",{anonymous_id:this.anonymousId,user_id:userId}),h("ip",{ip:this.ip}),void 0!==e&&e&&h("device",getDeviceInfo());var i={ingrow:{stream:a,project:this.projectID},enrichment:g,event:b},j=new XMLHttpRequest;j.setRequestHeader("api-key",this.apiKey),j.open("POST",this.apiEndpoint+"/v1"),j.send(JSON.stringify(i)),j.onload=function(){f&&f(j.response)},j.onerror=function(){f&&f(null,j.response)}}}]),a}();exports.default=ingrow;
=======
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}function getRandomString(a){for(var b="";b.length<a;)b+=Math.random().toString(36).substr(2,a-b.length);return s}function saveValue(a,b){if(window.localStorage)window.localStorage.setItem(a,b);else{var c=new Date;c.setTime(c.getTime()+31536e7);//10 years
var d="expires="+c.toUTCString();document.cookie="".concat(a,"=").concat(b,"; ").concat(d)}}function getValue(a){if(window.localStorage)return window.localStorage.getItem(a);var b;return(null===(b=document.cookie.match("(^|;)\\s*"+a+"\\s*=\\s*([^;]+)"))||void 0===b?void 0:b.pop())||""}function getCreatedAnonymousId(){var a=getValue("ingrow_events_anonymous_id");return a||(a=getRandomString(32),saveValue("ingrow_events_anonymous_id",a)),a}function getDeviceInfo(){var a=navigator,b=a.userAgent,c=window,d=c.screen,e=d.width,f=d.height;return{userAgent:b,screen:{width:e,height:f}}}var ingrow=/*#__PURE__*/function(){function a(b,c,d){_classCallCheck(this,a),this.apiKey=b,this.projectID=c,this.apiEndpoint="https://event.ingrow.co",this.anonymousId=getCreatedAnonymousId(),this.ip="autofill",this.setUserID(d)}return _createClass(a,[{key:"setUserID",value:function setUserID(a){this.userId=a||""}},{key:"sendEvent",value:function sendEvent(a,b,c){var d=c||{},e=d.sendDeviceInfo,f=d.done,g=[],h=function(a,b){g.push({name:a,input:b})};h("session",{anonymous_id:this.anonymousId,user_id:userId}),h("ip",{ip:this.ip}),void 0!==e&&e&&h("device",getDeviceInfo());var i={ingrow:{stream:a,project:this.projectID},enrichment:g,event:b},j=new XMLHttpRequest;j.setRequestHeader("api-key",this.apiKey),j.open("POST","".concat(this.apiEndpoint,"/v1")),j.send(JSON.stringify(i)),j.onload=function(){f&&f(j.response)},j.onerror=function(){f&&f(null,j.response)}}}]),a}();exports["default"]=ingrow;
>>>>>>> Stashed changes
>>>>>>> Stashed changes
