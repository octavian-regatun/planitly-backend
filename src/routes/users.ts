import { NextFunction, Request, Response, Router } from "express";
import { checkSchema } from "express-validator";
import usersGetSchema from "../lib/inputSchemas/usersSchema";
import db from "../lib/prisma";

const usersRouter = Router();

interface Params {
  id: string;
}

usersRouter.get("/", (req, res) => {
  void (async () => {
    return res.sendStatus(200);
  })();
});

usersRouter.get(
  "/:id",
  checkSchema(usersGetSchema),
  async (req: Request<Params>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (id === req.id) {
      return res.send(await db.user.findUnique({ where: { id } }));
    } else {
      return res.sendStatus(404);
    }
  }
);

export default usersRouter;
