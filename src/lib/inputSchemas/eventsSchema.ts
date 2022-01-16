import { Schema } from "express-validator";
import { isStringValidDate } from "../dateUtilities";

const eventsSchema: Schema = {
  title: {
    isString: {
      errorMessage: "title must be a string",
    },
  },
  startDate: {
    custom: {
      errorMessage: "startDate must be a date",
      options: (value: string) => {
        return isStringValidDate(value);
      },
    },
    customSanitizer: {
      options: (value: string) => {
        return new Date(value);
      },
    },
  },
  endDate: {
    custom: {
      errorMessage: "endDate must be a date",
      options: (value: string) => {
        return isStringValidDate(value);
      },
    },
    customSanitizer: {
      options: (value: string) => {
        return new Date(value);
      },
    },
  },
  authorId: {
    isString: {
      errorMessage: "authorId must be a string",
    },
  },
  fullDay: {
    isBoolean: {
      errorMessage: "fullDay must be a boolean",
    },
  },
};

export default eventsSchema;
