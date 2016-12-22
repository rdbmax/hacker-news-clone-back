const WEBSITE_DOMAIN = (process.env.NODE_ENV === 'production') ?
  'http://production-website.com' :
  'http://localhost:8888'

const API_PORT = (process.env.NODE_ENV === 'production') ?
  '3232' :
  '3000'

const MONGODB_ADRESS = (process.env.NODE_ENV === 'production') ?
  'mongodb://mongodb-production-adress' :
  'mongodb://localhost/hackernewsclone'

export { WEBSITE_DOMAIN, API_PORT, MONGODB_ADRESS }
