function getRandomString(len) {
  let s = ''
  for (var i = 0; i < len; i++) {
    s += Math.random().toString(36).substr(2, len - s.length)
  }
  return s
}

function saveValue(key, value) {
  if (window.localStorage) {
    window.localStorage.setItem(key, value)
  } else {
    let date = new Date();
    date.setTime(date.getTime() + (315360000000)); //10 years
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${key}=${value}; ${expires}`;
  }
}
function getValue(key) {
  if (window.localStorage) {
    return window.localStorage.getItem(key)
  } else {
    return document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')?.pop() || ''
  }
}

export function getCreatedAnonymousId() {
  const ingrowKeyName = "ingrow_events_anonymous_id"
  let anonymousId = getValue(ingrowKeyName)

  if (!anonymousId) {
    anonymousId = getRandomString(32)
    saveValue(ingrowKeyName, anonymousId)
  }

  return anonymousId
}
