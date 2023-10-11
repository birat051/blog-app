const users=require('./User')

const mongoose =require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    paragraphs: [{
      type: String,
      required: true,
    }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    imageUrl: {
        type: String,
        default: null
    }
  }, {
    timestamps: true, 
  },
);

const BlogDataModel =
mongoose.models.blogs || mongoose.model("blogs", blogSchema);

module.exports = BlogDataModel;
