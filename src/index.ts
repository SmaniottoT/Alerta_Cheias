import "reflect-metadata"
import express, { Request, Response, json } from "express";
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"



const server = express();
server.use(json());

server.get("", (request: Request, response: Response) => {
    return response.send("O servidor está funcionando");
});

AppDataSource.initialize()
    .then(async () => {
        console.log("database initialized");

        server.listen(3000, () => {
            console.log("Servidor escutando na porta 3000");
        });
    })
    .catch((error) => console.log(error));