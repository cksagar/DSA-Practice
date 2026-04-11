import { Schema, model } from 'mongoose';

const companyLocationSchema = new Schema(
  {
    country: { type: String },
    address: { type: String },
  },
  { _id: false }
);

const companySchema = new Schema(
  {
    title: { type: String },
    email: { type: String },
    phone: { type: String },
    location: { type: companyLocationSchema },
  },
  { _id: false }
);

// Shape matches playground seed: top-level index, name, profile fields, company.* (incl. company.email),
// tags. Root `email` is optional — seed JSON has no top-level email; API signup still supplies it.
const userSchema = new Schema(
  {
    index: { type: Number },
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://placehold.co/150x200`,
        localPath: '',
      },
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      index: true,
    },
    isActive: { type: Boolean, default: true },
    registered: { type: Date },
    age: { type: Number },
    gender: { type: String },
    eyeColor: { type: String },
    favoriteFruit: { type: String },
    company: { type: companySchema },
    tags: [{ type: String }],
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isEmailVerified: { type: Boolean, default: false },
    refreshToken: { type: String },
    forgotPasswordToken: { type: String },
    forgotPasswordExpiry: { type: Date },
    emailVerificationToken: { type: String },
    emailVerificationExpiry: { type: Date },
    salt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', userSchema);

export default User;
