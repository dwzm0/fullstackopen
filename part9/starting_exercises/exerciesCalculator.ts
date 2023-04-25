interface ExerciesResp {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface StartingValues {
  hours: number[];
  target: number;
}

const ratingCalib = (avg: number, target: number): object => {
  if (avg < target) {
    return { 1: "bad" };
  } else if (avg === target) {
    return { 2: "normal" };
  } else {
    return { 3: "good" };
  }
};

export const calculateExercises = (
  hours: number[],
  target: number
): ExerciesResp => {
  const average = hours.reduce((acc, curr) => acc + curr, 0) / hours.length;
  const currRating = ratingCalib(average, target);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [rating, ratingDescription] = Object.entries(currRating).flat();
  return {
    periodLength: hours.length,
    trainingDays: hours.filter((day) => day > 0).length,
    success: average >= target,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    rating,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ratingDescription,
    target,
    average,
  };
};

export const parseArgs = (argv: string[]): StartingValues => {
  const cleanedArgs = argv
    .flat()
    .map((arg) => parseFloat(arg))
    .filter((arg) => !isNaN(arg));

  if (cleanedArgs.length < 2)
    throw new Error("At least two numeric arguments are required.");

  const [target, ...hours] = cleanedArgs;
  return {
    hours,
    target,
  };
};

try {
  const { hours, target } = parseArgs(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
