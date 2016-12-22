import mongoose, { Schema } from 'mongoose'

const { ObjectId } = mongoose.Schema


const linkSchema = new Schema({
  id: ObjectId,
  name: { type: String, default: 'not found' },
  url: String,
  vote: { type: Number, default: 0 }
}, {
  timestamps: { createdAt: 'created_at' }
})

var linkModel = mongoose.model('Link', linkSchema)

export default linkModel
