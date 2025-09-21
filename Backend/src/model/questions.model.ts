import mongoose from "mongoose";

const questionShcema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option4: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

const questionModel = mongoose.model("questions", questionShcema);

export default questionModel;
