// authentication only with google at the moment

import { User } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import ApiResponse from "../lib/apiResponse";
import authPostSchema from "../lib/inputSchemas/authSchema";
import { createJwt, getPayload } from "../lib/jwt";
import db from "../lib/prisma";
import { isUserInDatabase, saveUser } from "../lib/user";

const authRouter = Router();

interface Body {
  tokenId: string;
}

authRouter.post(
  "/",
  checkSchema(authPostSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { tokenId }: Body = req.body;

    const apiResponse = new ApiResponse(res, next);

    const result = validationResult(req);

    if (!result.isEmpty()) {
      apiResponse.error.badRequest(result);
      return;
    }

    const payload = await getPayload(tokenId);

    if (await isUserInDatabase(payload.sub)) {
      const existingUser = (await db.user.findUnique({
        where: { id: payload.sub },
      })) as User;

      return res.send(createJwt(existingUser));
    } else {
      const newUser = await saveUser(payload);

      const jwt = createJwt(newUser);

      return res.send(jwt);
    }
  }
);

export default authRouter;
