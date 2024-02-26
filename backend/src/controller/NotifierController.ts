// buscar pontos de interesse cadastrado que o usuário marcou
// buscar cota de enchente atual (defesa civil)
// percorrer cada ponto (forEach)
// comparar a cota de enchente do ponto com a cota de enchente da DC.
// se a cota da DC for >= que cota do ponto -> enviar e-mail -> salvar ID da cota na nova tabela criada
// se a cota da DC for > porém a cota do ponto já está cadastrada -> não faz nada
// se a cota da DC for < exclui da tabela nova.
// SET INTERVAL

// verificar funcionalidade no ~futuro~ para 'alertar sempre'

// COMO INSERIR REGISTRO MANY TO MANY
// COMO ESPECIFICAR QUAL ENTIDADE USAR PARA MANY TO MANY

import axios from "axios";
import { AppDataSource } from "../data-source";
import { UserToBenchmark } from "../entity/UserToFloodLevel";
import { User } from "../entity/User";
import nodemailer from "nodemailer";

interface Estacao {
  nome: string;
  nivel_rio: number | null;
}

export class NotifierController {
  async fetchCurrentLevel() {
    try {
      const response = await axios.post(
        "https://monitoramento.defesacivil.sc.gov.br/graphql",
        {
          operationName: "ListaEstacoes",
          variables: {},
          query: `query ListaEstacoes {\n  estacoes {\n    nome\n    nivel_rio\n       }\n}`,
        }
      );

      const estacoes: Estacao[] = response.data.estacoes;

      const estacao = estacoes.find(
        (estacao) => estacao.nome === "DCSC Timbó 1"
      );
      if (!estacao) {
        throw new Error("Não foi possível buscar a estação");
      }
      const nivelRio = estacao.nivel_rio;

      console.log(nivelRio);

      return nivelRio;
    } catch (error) {
      throw new Error(`Failed to fetch current River Level: ${error}`);
    }
  }

  async getAssociatedBenchmarks(userId: number) {
    const associatedBenchmarkRepository =
      AppDataSource.getRepository(UserToBenchmark);
    const userRepository = AppDataSource.getRepository(User);

    const foundUser = await userRepository.findOne({
      where: { id: userId },
    });

    if (!foundUser) {
      throw new Error("User or Benchmark not found.");
    }

    const associatedList = await associatedBenchmarkRepository.find({
      where: { user: foundUser },
      order: {},
      relations: { user: true, benchmark: true },
    });
    return associatedList;
  }

  async verifyFlood(userId: number) {
    const currentFloodLevel = await this.fetchCurrentLevel();
    const associatedBenchmarks = await this.getAssociatedBenchmarks(userId);
    console.log(associatedBenchmarks);
    console.log(currentFloodLevel);

    associatedBenchmarks.forEach((benchmark) => {
      if (currentFloodLevel >= benchmark.benchmark.floodLevel) {
        const transporter = nodemailer.createTransport({
          service: "Gmail", // Use your email service
          auth: {
            user: "alertacheias@gmail.com", // Your email address
            pass: "AlertaCheias@Entra21", // Your password
          },
        });

        const mailOptions = {
          from: "alertacheias@gmail.com", // Sender
          to: benchmark.user.email, // Recipient
          subject: "ALERTA CHEIAS", // Email subject
          html: `<h1>ALERTA CHEIAS - AVISO</h1><p>Atenção!</p><p>O nível do Rio atual é de: ${currentFloodLevel}.</p><p>Você selecionou o alerta para a Rua ${benchmark.benchmark.street} faltando ${benchmark.alert}m. </p>`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Email sending failed:", error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      } else {
        throw new Error("Socorro?");
      }
    });
  }
}
