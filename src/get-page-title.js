import request from 'request'
import { load } from 'cheerio'

const getPageTitle = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const $ = load(body)
        const title = $('title').text()
        if (title) resolve(title)
        else resolve(url)
      } else {
        reject(error)
      }
    })
  })
}

export default getPageTitle
