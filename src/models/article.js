var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var articleSchema = new Schema({
  title: {
    type: String,
    required: [true, "title not provided "],
  },
  articleId: {
    type: String,
    unique: [true, "articleId already exists in database!"],
    required: [true, "articleId not provided"]
  },
  description: {
    type: String,
    required: [true, "Please specify description"]
  },
  created: {
    type: Date,
    default: Date.now
  },
  userId:{
    type: Number,
    required: [true, "userId not provided "]
  }
});

module.exports = mongoose.model('Article', articleSchema);