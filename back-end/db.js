import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Connect to MongoDb
mongoose.connect(process.env.URI);

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  email: { type: String },
  role: { type: String },
});

const User = mongoose.model("User", userSchema);

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String },
    artist: { type: String, required: true },
    genre: { type: String },
    format: { type: String },
    releaseDate: { type: String },
    description: { type: String },
  },
  {
    timestamps: true, // auto adds createdAt & updatedAt
    toJSON: { virtuals: true }, // allows us to export id
    toObject: { virtuals: true },
  }
);

albumSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const Album = mongoose.model("Album", albumSchema);

const contactSchema = new mongoose.Schema({ 
  id: { type: Number, required: true, unqiue: true}, 
  name: { type: String, required: true}, 
  role: { type: String, required: true}, 
  email: { type: String, required: true, unique: true}, 
  phone: { type: String, required: true, unique: true} 
})

const Contact = mongoose.model("Contact", contactSchema);

export { User, Album, Contact };
