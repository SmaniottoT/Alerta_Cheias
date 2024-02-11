import "reflect-metadata";
import express, { NextFunction, Request, Response, json } from "express";
import { AppDataSource } from "./data-source";
import { SessionController } from "./controller/SessionController";
import { UserController } from "./controller/UserController";
import { AuthenticationMiddleware } from "./middleware/AuthenticationMiddleware";
import cors from "cors";
import RouteExecutor from "./routes/RouteExecutor";
import { BaseHttpException } from "./exceptions/BaseHttpException";

const SERVER_PORT = 3000;
const server = express();
server.use(express.json());
server.use(cors());

server.post(
  "/login",
  (request: Request, response: Response, next: NextFunction) =>
    RouteExecutor(
      request,
      response,
      next,
      async (request: Request, response: Response) => {
        const sessionController = new SessionController();
        const token = await sessionController.login(
          request.body.username,
          request.body.password
        );
        return response.status(200).json({
          token,
        });
      }
    )
);

server.post(
  "/users",
  (request: Request, response: Response, next: NextFunction) =>
    RouteExecutor(
      request,
      response,
      next,
      async (request: Request, response: Response) => {
        const userController = new UserController();
        const user = await userController.createUser(
          request.body.username,
          request.body.name,
          request.body.email,
          request.body.password
        );
        return response.status(201).json(user);
      }
    )
);

server.get("/users", async (request: Request, response: Response) => {
  const userController = new UserController();
  const userList = await userController.getUser();
  return response.status(200).json(userList);
});

// ABAIXO DAQUI SOMENTE FUNÇÕES QUE SEJAM EXECUTADAS MEDIANTE AUTENTICAÇÃO (ALTERAR USUÁRIO, VINCULAR IMÓVEL, ETC)
server.use(new AuthenticationMiddleware().validateAuthentication);

// aqui precisa de uma função que adicione um ponto a um usuário

server.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    const exception = err as BaseHttpException;
    if (exception.statusCode) {
      return response.status(exception.statusCode).json({
        error: exception.message,
        errorCode: exception.errorCode,
      });
    }
    return response.status(500).json({
      error: exception.message,
    });
  }
);

AppDataSource.initialize()
  .then(async () => {
    console.log("Database initialized!");
    server.listen(SERVER_PORT, () => {
      console.log(`Server listening in port: ${SERVER_PORT}`);
    });
  })
  .catch((error) => console.log(error));
