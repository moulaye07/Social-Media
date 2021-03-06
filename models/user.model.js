const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
        trim: true
      },
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 3
    },
    picture: {
      type: String,
      default: "./uploads/profil/default.png"
    },
    cover: {
      type: String,
      default: "./uploads/profil/default.png"
    },
    bio :{
      type: String,
      max: 1024,
    },
    followers: {
      type: [String]
    },
    following: {
      type: [String]
    },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: true,
  }
);
//play function before save into display: 'block',
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(pseudo, password) {
  const user = await this.findOne({ pseudo });
  if (user) {
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      return user;
    }else{
      return { errorPassword: "pseudo incorrect"}
    }
    //throw Error('mot de passe incorrect');

  }
  throw Error('pseudo incorrect')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;