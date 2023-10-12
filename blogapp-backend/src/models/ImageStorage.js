const mongoose =require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
    filename: String,
    imageUrl: String,
});

const ImageDataModel =
mongoose.models.images || mongoose.model("images", imageSchema);

module.exports = ImageDataModel;