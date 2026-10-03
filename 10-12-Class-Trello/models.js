const mongoose = require("mongoose")
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const userSchema = mongoose.Schema({
    username: { type: String },
    password: { type: String }
});

const organisationSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    admin: { type: mongoose.Types.ObjectId, ref: "user" },
    members: [{ type: mongoose.Types.ObjectId, ref: "user" }],

})

const organisationModel = mongoose.model("organisation", organisationSchema)
const userModel = mongoose.model("user", userSchema)

module.exports = {
    userModel,
    organisationModel
}