// buscar pontos de interesse cadastrado que o usuário marcou
// buscar cota de enchente atual (defesa civil)
// percorrer cada ponto (forEach)
// comparar a cota de enchente do ponto com a cota de enchente da DC.
// se a cota da DC for >= que cota do ponto -> enviar e-mail -> salvar ID da cota na nova tabela criada
// se a cota da DC for > porém a cota do ponto já está cadastrada -> não faz nada
// se a cota da DC for < exclui da tabela nova.

// verificar funcionalidade no ~futuro~ para 'alertar sempre'

import axios from "axios";
export class NotifierController {
  async fetchCurrentLevel() {
    try {
      const response = await axios.post(
        "https://monitoramento.defesacivil.sc.gov.br/graphql",
        {
          operationName: "ListaEstacoes",
          variables: {},
          query: `query ListaEstacoes {\n  estacoes {\n    ${"DCSC Timbó 1"}\n    nivel_rio\n       }\n}`,
        }
      );
      console.log(response);
    } catch (error) {
      throw new Error(`Failed to fetch current River Level: ${error}`);
    }
  }
}
