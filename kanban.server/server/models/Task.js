import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Task = new Schema(
  {
    title: { type: String, required: true },
    listId: { type: String, ref: 'List', required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Task
