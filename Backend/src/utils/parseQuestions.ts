interface QuestionData {
  question: string;
  options: string[];
  answer: string;
  subject: string;
  standard?: string;
  totalMarks: number;
}

interface RawQuestionInput {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  subject: string;
  standard: string;
}

/**
 * Parses raw question input into the standardized question format
 * @param rawInput - Object containing question, option1-4, answer, subject, and standard
 * @returns Formatted question object
 */
export function parseQuestionInput(rawInput: RawQuestionInput): QuestionData {
  // Validate required fields
  if (!rawInput.question || !rawInput.answer || !rawInput.subject) {
    throw new Error(
      "Missing required fields: question, answer, and subject are required"
    );
  }

  // Collect all options, filtering out empty ones
  const options = [
    rawInput.option1,
    rawInput.option2,
    rawInput.option3,
    rawInput.option4,
  ].filter((option) => option && option.trim() !== "");

  if (options.length === 0) {
    throw new Error("At least one option is required");
  }

  // Validate that the answer exists in the options
  if (!options.includes(rawInput.answer)) {
    console.warn(
      `Answer "${rawInput.answer}" not found in options. This might cause issues.`
    );
  }

  return {
    question: rawInput.question.trim(),
    options: options.map((option) => option.trim()),
    answer: rawInput.answer.trim(),
    subject: rawInput.subject.trim(),
    standard: rawInput.standard?.trim(),
    totalMarks: 20,
  };
}

/**
 * Parses multiple questions from an array of raw inputs
 * @param rawInputs - Array of raw question objects
 * @returns Array of formatted question objects
 */
export function parseMultipleQuestions(
  rawInputs: RawQuestionInput[]
): QuestionData[] {
  return rawInputs.map((input, index) => {
    try {
      return parseQuestionInput(input);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(
        `Error parsing question at index ${index}: ${errorMessage}`
      );
    }
  });
}
