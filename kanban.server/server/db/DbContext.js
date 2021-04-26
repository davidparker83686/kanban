import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import BoardSchema from '../models/Board'
import CommentSchema from '../models/Comment'
import ListSchema from '../models/List'
import TaskSchema from '../models/Task'
import AccountSchema from '../models/Account'

class DbContext {
  Board = mongoose.model('Board', BoardSchema);
  Comment = mongoose.model('Comment', CommentSchema);
  List = mongoose.model('List', ListSchema);
  Task = mongoose.model('Task', TaskSchema);
  Value = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
