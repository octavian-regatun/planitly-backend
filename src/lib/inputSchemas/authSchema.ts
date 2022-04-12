import { Schema } from "express-validator";

const authPostSchema: Schema = {
  tokenId: {
    isString: {
      errorMessage: "tokenId must be a string",
    },
  },
};

export default authPostSchema;
