import { optional } from "joi";
import questionModel from "../model/questions.model";

export const addQuestionsService = async (
  question: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  subject: string,
  answer: string,
  standard: string
) => {
  if (
    !question ||
    !option1 ||
    !option2 ||
    !option4 ||
    !option3 ||
    !subject ||
    !standard
  ) {
    throw new Error("all fields are required");
  }
  const response = questionModel.create({
    question: question,
    option1: option1,
    option2: option2,
    option3: option3,
    option4: option4,
    subject: subject,
    answer: answer,
    standard: standard,
  });
  return response;
};
