import mongoose from 'mongoose'
import express from 'express'
import { graphql } from 'graphql'
import cors from 'cors'
import bodyParser from 'body-parser'

import schema from './schema'
import { WEBSITE_DOMAIN, API_PORT, MONGODB_ADRESS } from './constant'


mongoose.connect(MONGODB_ADRESS)
const app  = express()

app.use(cors({ origin: WEBSITE_DOMAIN, optionsSuccessStatus: 200 }))

const graphQLParser = bodyParser.text({ type: 'application/graphql' })
app.post('/graphql', graphQLParser, (req, res) => {
  graphql(schema, req.body)
    .then((result) => {
      res.send(JSON.stringify(result, null, 2))
    })
})

app.listen(API_PORT, () => {
  console.log(`HackeNews Clone API listening`)
})
