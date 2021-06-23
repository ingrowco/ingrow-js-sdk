function getRandomString(len) {
  let s = ""
  while (s.length < len)
    s += Math.random().toString(36).substr(2, len - s.length)
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

function getCreatedAnonymousId() {
  const ingrowKeyName = "ingrow_events_anonymous_id"
  let anonymousId = getValue(ingrowKeyName)

  if (!anonymousId) {
    anonymousId = getRandomString(32)
    saveValue(ingrowKeyName, anonymousId)
  }

  return anonymousId
}

function getDeviceInfo() {
  const { userAgent } = navigator;
  const { screen: { width, height } } = window;
  return { userAgent, screen: { width, height } };
}

export default class Ingrow {
  constructor(apiKey, projectID, userId) {
    this.apiKey = apiKey
    this.projectID = projectID
    this.apiEndpoint = "https://event.ingrow.co"
    this.anonymousId = getCreatedAnonymousId()
    this.ip = "autofill"
    this.setUserID(userId)
  }
  
  setUserID(userId) {
    this.userId = userId || ""
  }

  sendEvent(stream, data, sendDeviceInfo = false) {
    const enrichment = [];
    const enrich = (name, input) => { enrichment.push({ name , input }) }

    enrich('session', { anonymous_id: this.anonymousId, user_id: userId });
    enrich('ip', { ip: this.ip });
    if (sendDeviceInfo) { enrich('device', getDeviceInfo()); }

    return fetch(`${this.apiEndpoint}/v1`, {
      method: "POST",
      headers: {
        "api-key": this.apiKey,
      },
      body: JSON.stringify({
        ingrow: {
          stream,
          project: this.projectID,
        },
        enrichment,
        event: data,
      }),
    })
  }
}