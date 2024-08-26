const mongoose = require("mongoose")
require('dotenv').config({override:true})



const connection = mongoose.connect(process.env.mongoURL);


// Basic Structure of the data = Schema
const candidateSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    dob: { type: Date, required: true },
    resiAddress: {
      street1: { type: String, required: true },
      street2: { type: String },
    },
    permanentAddress: {
      street1: { type: String },
      street2: { type: String },
    },
    documents: [
      {
        fileName: { type: String, required: true },
        fileType: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  }, { timestamps: true });


// Model for the data
const candidateModel = mongoose.model("candidate", candidateSchema)

module.exports={
    connection,
    candidateModel
}