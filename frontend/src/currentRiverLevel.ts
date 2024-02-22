import axios from "axios";

interface Estacao {
  nome: string;
  nivel_rio: number | null;
}

async function fetchCurrentLevel(event: Event) {
  event.preventDefault();
  try {
    const response = await axios.post(
      "https://monitoramento.defesacivil.sc.gov.br/graphql",
      {
        operationName: "ListaEstacoes",
        variables: {},
        query: `query ListaEstacoes {\n  estacoes {\n    nome\n    nivel_rio\n      nivel_montante\n    nivel_jusante\n    porc_reservatorio\n    comp_abertas\n    comp_fechadas\n }\n}`,
      }
    );
    console.log(response);
    

    const estacoes: Estacao[] = response?.data?.data?.estacoes;
    // precisa ajustar aqui pra que busque a partir de um getElement html, e não "DCSC Timbó 1"
    const estacao = estacoes.find((estacao) => estacao.nome === "DCSC Timbó 1");
    if (!estacao) {
      throw new Error("Não foi possível buscar a estação");
    }
    const nivelRio = estacao.nivel_rio.toFixed(2);

    document.getElementById("cotaRio").innerText = `${nivelRio}m`;
    return nivelRio;
  } catch (error) {
    throw new Error(`Failed to fetch current River Level: ${error}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("riverLevel")
    ?.addEventListener("click", fetchCurrentLevel);
});
