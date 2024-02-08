import "reflect-metadata";
import express, { Request, Response, json } from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { SessionController } from "./controller/SessionController";
import { UserController } from "./controller/UserController";
import { AuthenticationMiddleware } from "./middleware/AuthenticationMiddleware";
import { request } from "http";

const SERVER_PORT = 3000;
const server = express();
server.use(express.json());


server.post("/login", async (request: Request, response: Response) => {
  const sessionController = new SessionController();
  try {
    const token = await sessionController.login(
      request.body.username,
      request.body.password
    );
    return response.status(200).json({
      token,
    });
  } catch (error) {
    return response.status(400).json({
      error: error.message,
    });
  }
});


server.post("/users", async (request: Request, response: Response) => {
  const userController = new UserController();
  try {
    const user = await userController.createUser(
      request.body.username,
      request.body.name,
      request.body.email,
      request.body.password
    );
    return response.status(201).json(user);
  } catch (error) {
    return response.status(400).json({
      error: error.message,
    });
  }
});

server.get("/users", async (request: Request, response: Response) => {
  const userController = new UserController();
  const userList = await userController.getUser();
  return response.status(200).json(userList);
});




// ABAIXO DAQUI SOMENTE FUNÇÕES QUE SEJAM EXECUTADAS MEDIANTE AUTENTICAÇÃO (ALTERAR USUÁRIO, VINCULAR IMÓVEL, ETC)
server.use(new AuthenticationMiddleware().validateAuthentication);

AppDataSource.initialize()
  .then(async () => {
    console.log("Database initialized!");
    server.listen(SERVER_PORT, () => {
      console.log(`Server listening in port: ${SERVER_PORT}`);
    });
  })
  .catch((error) => console.log(error));
