const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const whiteListSchema = new Schema({
  address: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

whiteListSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.passwordHash;
  },
});

module.exports = mongoose.model("WhiteList", whiteListSchema, "whitelists");
