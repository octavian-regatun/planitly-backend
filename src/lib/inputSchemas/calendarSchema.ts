import { Schema } from "express-validator";

const calendarGetSchema: Schema = {
  year: {
    in: "params",
    isInt: {
      errorMessage: "year is not a number",
    },
    toInt: true,
  },
  month: {
    in: "params",
    isInt: {
      errorMessage: "month should be a number beetwen 1 and 12",
      options: {
        min: 1,
        max: 12,
      },
    },
    toInt: true,
  },
  weekStart: {
    optional: true,
    in: "query",
    custom: {
      options: (value) => {
        if (value != "sunday" && value != "monday") {
          throw new Error("options.weekStart value should be sunday or monday");
        }
        return true;
      },
    },
  },
};

export default calendarGetSchema;
