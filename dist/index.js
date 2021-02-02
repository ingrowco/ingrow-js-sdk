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