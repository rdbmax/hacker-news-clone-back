import {
  GraphQLNonNull,
  GraphQLID, GraphQLString, GraphQLInt, GraphQLList,
  GraphQLObjectType, GraphQLSchema
} from 'graphql'
import GraphQLDate from 'graphql-iso-date'
import mongoose from 'mongoose'
import linkModel from './link-model'
import getPageTitle from './get-page-title'


const LinkType = new GraphQLObjectType({
  name: 'link',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    vote: { type: GraphQLInt },
    created_at: { type: GraphQLDate }
  })
})

const Query = (type = 'popular') => {
  const sortingRule = (type === 'popular') ? { vote: -1 } : { created_at: -1 }

  return {
    type: new GraphQLList(LinkType),
    resolve: () => {
      return new Promise((resolve, reject) => {
        linkModel
          .find()
          .sort(sortingRule)
          .exec((err, links) => {
            if (err) reject(err)
            else resolve(links)
          })
      })
    }
  }
}

const MutationAdd = {
  type: LinkType,
  description: 'Add a Link',
  args: {
    url: {
      name: 'link url',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, { url }) => {
    return new Promise((resolve, reject) => {
      getPageTitle(url).then((name) => {
        const newLink = new linkModel({ url, name })

        newLink.save((err) => {
          if (err) reject(err)
          else resolve(newLink)
        })
      })
    })
  }
}

const MutationVote = (type = 'inc') => {
  const value = (type === 'inc') ? 1 : -1

  return {
    type: LinkType,
    description: `${(type === 'inc') ? 'Up' : 'Down'} vote a Link`,
    args: {
      _id: {
        name: 'link id',
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: (root, { _id }) => {
      return new Promise((resolve, reject) => {
        linkModel.findByIdAndUpdate(_id, { $inc: { vote: value }}, { new: true }, (err, link) => {
          if (err) reject(err)
          else resolve(link)
        })
      })
    }
  }
}

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: MutationAdd,
    upvote: MutationVote('inc'),
    downvote: MutationVote('dec')
  }
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    popular: Query('popular'),
    recent: Query('recent')
  }
})

const Schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})

export default Schema
