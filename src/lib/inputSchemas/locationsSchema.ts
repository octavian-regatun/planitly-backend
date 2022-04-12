import { Schema } from "express-validator";

const locationsPostSchema: Schema = {
  name: {
    isString: {
      errorMessage: "name must be a string",
    },
  },
  authorId: {
    isString: {
      errorMessage: "authorId must be a string",
    },
  },
};

export default locationsPostSchema;
