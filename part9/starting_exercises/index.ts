import express from "express";
import { parseArguments, calcBmi } from "./bmiCalculator";
import { parseArgs, calculateExercises } from "./exerciesCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = req.query;

    if (typeof height !== "string" || typeof weight !== "string")
      throw new Error("Missing parameters.");

    const args = parseArguments([height, weight]);

    res.send({
      weight: args.value2,
      height: args.value1,
      bmi: calcBmi(args.value1, args.value2),
    });
  } catch (error: unknown) {
    res.status(400).send({
      error: error instanceof Error ? error.message : "Unknown error.",
    });
  }
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { exercises, curtarget } = req.body;
    if (exercises === undefined || curtarget === undefined) {
      return res.status(400).send({ error: "parameters missing" });
    }

    if (Array.isArray(exercises) === false || typeof curtarget !== "number") {
      return res.status(400).send({ error: "wrong format" });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { hours, target } = parseArgs([curtarget, ...exercises]);

    res.send(calculateExercises(hours, target));
  } catch (error: unknown) {
    res.status(400).send({
      error: error instanceof Error ? error.message : "Unknown error.",
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
