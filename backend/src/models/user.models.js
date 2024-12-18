import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true,  },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Organizer', 'Viewer'], default: 'Viewer' },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema); // Define User here
export default User;
