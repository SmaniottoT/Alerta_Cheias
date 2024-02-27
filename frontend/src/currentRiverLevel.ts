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
        query: `query ListaEstacoes {\n  estacoes {\n    nome\n    nivel_rio\n }\n}`,
      }
    );

    const cityElement = document.getElementById(
      "CityCota"
    ) as HTMLSelectElement;

    var cityName = cityElement.value;

    if (cityName == "Timbó") {
      cityName = "DCSC Timbó 1";
    }
    if (cityName == "Indaial") {
      cityName = "DCSC Indaial";
    }
    if (cityName == "Rio dos Cedros") {
      cityName = "DCSC Rio dos Cedros 1";
    }
    if (cityName == "Benedito Novo") {
      cityName = "DCSC Benedito Novo";
    }
    if (cityName == "Pomerode") {
      cityName = "DCSC Pomerode";
    }
    if (cityName == "Doutor Pedrinho") {
      cityName = "DCSC Doutor Pedrinho";
    }
    if (cityName == "Ibirama") {
      cityName = "DCSC Ibirama";
    }
    if (cityName == "Ilhota") {
      cityName = "DCSC Ilhota";
    }
    if (cityName == "José Boiteux") {
      cityName = "DCSC José Boiteux";
    }
    if (cityName == "Taió") {
      cityName = "DCSC Taió";
    }
    if (cityName == "Ituporanga") {
      cityName = "DCSC Ituporanga";
    }

    const estacoes: Estacao[] = response?.data?.data?.estacoes;

    const estacao = estacoes.find((estacao) => estacao.nome === cityName);

    if (!estacao) {
      document.getElementById("cotaRio").innerText = `0.00m`;
      document.getElementById("Info_Est_Cid").innerText = `Informe o estado e a cidade!`;
    }
    const nivelRio = estacao.nivel_rio.toFixed(2);
    

    document.getElementById("cotaRio").innerText = `${nivelRio}m`;
    document.getElementById("Info_Est_Cid").innerText = null;
    return nivelRio;
  } catch (error) {
    throw new Error(`Failed to fetch current River Level: ${error}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("boxCota")
    ?.addEventListener("click", fetchCurrentLevel);
});


document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("boxCota")
    ?.addEventListener("click", fetchCurrentLevel);
});
