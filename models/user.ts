import { Schema, model, models } from "mongoose";

export interface IUser {
  email: string;
  username: string;
  image?: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [/^[a-zA-Z0-9_]+$/, "Username is invalid"], // ✅ RegExp, not string
  },
  image: {
    type: String,
  },
});

// Avoid model overwrite errors in Next.js hot-reloading
const User = models.User || model<IUser>("User", UserSchema);

export default User;
