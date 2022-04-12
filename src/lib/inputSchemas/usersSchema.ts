import { Schema } from "express-validator";

const usersGetSchema: Schema = {
  id: {
    isString: {
      errorMessage: "id must be a string",
    },
  },
};

export default usersGetSchema;
