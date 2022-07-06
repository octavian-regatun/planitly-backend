import { Schema } from "express-validator";
import { isStringValidDate } from "../dateUtilities";

export const eventsGetSchema: Schema = {
  query: {
    in: "query",
    optional: true,
  },
  participants: {
    isArray: {
      errorMessage: "participants should be an array",
    },
    in: "query",
    toArray: true,
    optional: true,
  },
  startDate: {
    isDate: {
      errorMessage: "startDate should be a date",
    },
    in: "query",
    toDate: true,
    optional: true,
  },
  endDate: {
    isDate: {
      errorMessage: "startDate should be a date",
    },
    in: "query",
    toDate: true,
    optional: true,
  },
};

export const eventsPostSchema: Schema = {
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

export const eventsPatchSchema: Schema = {
  username: {
    optional: true,
    in: "body",
    isString: {
      errorMessage: "username must be a string",
    },
    isLength: {
      options: {
        min: 1,
        max: 20,
      },
      errorMessage: "username length should be beetwen 1 and 20",
    },
  },
};
