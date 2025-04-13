import mongoose from 'mongoose';

// Connect to MongoDb
mongoose.connect(process.env.URI);

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role: { type: String }
});

const User = mongoose.model('User', userSchema);

export { User };