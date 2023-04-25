interface DivideValues {
  value1: number;
  value2: number;
}

export const parseArguments = (args: string[]): DivideValues => {
  const cleanedArgs = args
    .map((arg) => parseFloat(arg))
    .filter((arg) => !isNaN(arg));

  if (!isNaN(Number(cleanedArgs[0])) && !isNaN(Number(cleanedArgs[1]))) {
    return {
      value1: Number(cleanedArgs[0]),
      value2: Number(cleanedArgs[1]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calcBmi = (a: number, b: number) => {
  const length = a / 100;
  const bmi = b / length ** 2;
  console.log(bmi);

  if (bmi < 16.0) return "Underweight (Severe thinness)";
  else if (16 < bmi && bmi < 16.9) return "Underweight (Moderate thinnes)";
  else if (17 < bmi && bmi < 18.4) return "Underweight (Mild thinness)";
  else if (18.5 < bmi && bmi < 24.9) return "Normal range";
  else if (25 < bmi && bmi < 29.9) return "Overweight (Pre-obese)";
  else if (30 < bmi && bmi < 34.9) return "Obese (Class I)	";
  else if (35 < bmi && bmi < 39.9) return "Obese (Class II)";
  else if (bmi >= 40) return "Obese (Class III)";
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calcBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
