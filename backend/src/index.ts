import "reflect-metadata";
import express, { NextFunction, Request, Response, json } from "express";
import { AppDataSource } from "./data-source";
import { SessionController } from "./controller/SessionController";
import { UserController } from "./controller/UserController";
import {
  AuthenticatedRequest,
  AuthenticationMiddleware,
} from "./middleware/AuthenticationMiddleware";
import cors from "cors";
import RouteExecutor from "./routes/RouteExecutor";
import { BaseHttpException } from "./exceptions/BaseHttpException";
import { FloodLevelController } from "./controller/FloodLevelController";
import { request } from "http";
import { UserToBenchmark } from "./entity/UserToFloodLevel";

const SERVER_PORT = 3000;
const server = express();
server.use(express.json());
server.use(cors());

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

server.get("/users", async (request: Request, response: Response) => {
  const userController = new UserController();
  const userList = await userController.getUser();
  return response.status(200).json(userList);
});

server.post(
  "/benchmarks",
  (request: Request, response: Response, next: NextFunction) =>
    RouteExecutor(
      request,
      response,
      next,
      async (request: Request, response: Response) => {
        const floodLevelController = new FloodLevelController();
        const benchmark = await floodLevelController.createBenchmark(
          request.body.floodLevel,
          request.body.street,
          request.body.lat,
          request.body.long
        );
        return response.status(201).json(benchmark);
      }
    )
);

server.get("/benchmarks", async (request: Request, response: Response) => {
  const floodLevelController = new FloodLevelController();
  const benchmarkList = await floodLevelController.getBenchmark();
  return response.status(200).json(benchmarkList);
});

// ABAIXO DAQUI SOMENTE FUNÇÕES QUE SEJAM EXECUTADAS MEDIANTE AUTENTICAÇÃO (ALTERAR USUÁRIO, VINCULAR IMÓVEL, ETC)
server.use(new AuthenticationMiddleware().validateAuthentication);

server.post(
  "/user/benchmarks",
  (request: Request, response: Response, next: NextFunction) =>
    RouteExecutor(
      request,
      response,
      next,
      async (request: AuthenticatedRequest, response: Response) => {
        const userController = new UserController();
        const associatedBenchmark = await userController.associateUserBenchmark(
          request.userId,
          request.body.benchmark
        );
        return response.status(201).json(associatedBenchmark);
      }
    )
);

server.get(
  "/user/benchmarks",
  async (request: AuthenticatedRequest, response: Response) => {
    const userId = request.userId;
    const userController = new UserController();
    const associatedBenchmarkList =
      await userController.getAssociatedBenchmarks(userId);
    return response.status(200).json(associatedBenchmarkList);
  }
);

server.delete(
  "/user/benchmarks/:id",
  async (request: AuthenticatedRequest, response: Response) => {
    const userId = request.userId;
    const benchmarkId = Number(request.params.id); //PARA VINCULAR NO FRONT html atribute data-id event.target.data.id
    const userController = new UserController();
    const associatedBenchmarkList =
      await userController.disassociateUserToBenchmark(userId, benchmarkId);
    return response.status(200).json(associatedBenchmarkList);
  }
);

server.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.error("Error caught:", err);
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
    // setInterval tempo e chama execução.
    server.listen(SERVER_PORT, () => {
      console.log(`Server listening in port: ${SERVER_PORT}`);
    });
  })
  .catch((error) => console.log(error));
