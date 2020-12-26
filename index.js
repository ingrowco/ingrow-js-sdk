class cookieHandler {
  static getRandomString = () => {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var result = ''
    for ( var i = 0; i < 32; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
    }
    return result
  }

  static setCookie = (cname) => {
    const cookie = cookieHandler.getRandomString()
    document.cookie = cname + "=" + cookie
    return cookie
  }
  
  static getCookie = (cname) => {
    var name = cname + "="
    var ca = document.cookie.split(';')
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ""
  }
  
  static checkCookie = (cname) => {
    var id = cookieHandler.getCookie(cname)
    if (id != "") {
      return true
    } else {
      return false
    }
  }
}

export default class lungo {
  constructor(apiKey, projectID) {
    this.apiKey = apiKey
    this.projectID = projectID
    this.apiEndpoint = process?.env?.LUNGO_ENDPOINT || "https://event.st.ingrow.co"
    this.anonymousId = cookieHandler.checkCookie("ingrow_events_anonymous_id") 
      ? cookieHandler.getCookie("ingrow_events_anonymous_id") 
      : cookieHandler.setCookie("ingrow_events_anonymous_id")
    fetch(`https://ipapi.co/json/`)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        this.ip = {
          ip: res.ip,
          version: res.version,
          city: res.city,
          region: res.region,
          country: res.country,
          country_code_iso3: res.country_code_iso3,
          country_name: res.country_name,
          country_tld: res.country_tld,
          continent_code: res.continent_code,
          country_population: res.country_population,
          country_area: res.country_area,
          org: res.org,
        }
      })
  }

  sendEvent(stream, data, userId = "") {
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
        enrichment: [{
          name: "session",
          input: {
            anonymous_id: this.anonymousId,
            user_id: userId,
          }
        }],
        event: { ...this.ip, ...data },
      }),
    })
  }
}