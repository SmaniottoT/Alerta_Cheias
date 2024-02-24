import axios from "axios";

interface Barragem {
  nome: string;
  porc_reservatorio: number | null;
  nivel_montante: number | null;
  nivel_jusante: number | null;
  comp_abertas: number | null;
  comp_fechadas: number | null;
}

async function fetchCurrentDam(event: Event) {
  event.preventDefault();
  try {
    const response = await axios.post(
      "https://monitoramento.defesacivil.sc.gov.br/graphql",
      {
        operationName: "ListaEstacoes",
        variables: {},
        query: `query ListaEstacoes {\n  estacoes {\n    nome\n   nivel_montante\n    nivel_jusante\n    porc_reservatorio\n    comp_abertas\n    comp_fechadas\n }\n}`,
      }
    );

    const cityElement = document.getElementById(
      "CityBarragem"
    ) as HTMLSelectElement;

    var cityName = cityElement.value;

    // "Benedito Novo", "Pomerode", "Doutor Pedrinho", "Ibirama", "Ilhota"

    if (cityName == "José Boiteux") {
      cityName = "DCSC Barragem Norte José Boiteux";
    }
    if (cityName == "Taió") {
      cityName = "DCSC Barragem Oeste Taió";
    }
    if (cityName == "Ituporanga") {
      cityName = "DCSC Barragem Sul Ituporanga";
    }

    const estacoes: Barragem[] = response?.data?.data?.estacoes;

    const estacao = estacoes.find((estacao) => estacao.nome === cityName);

    if (!estacao) {
      document.getElementById("capacidadeBarragem").innerText = null;
      document.getElementById("nivelJusante").innerText = null;
      document.getElementById("nivelMontante").innerText = null;
      document.getElementById(
        "comportasAbertas"
      ).innerText = `Não há barragem neste município.`;
      document.getElementById("comportasFechadas").innerText = null;
    }

    const capacBarragem = estacao.porc_reservatorio.toFixed(2);
    const nivel_jusante = estacao.nivel_jusante.toFixed(2);
    const nivel_montante = estacao.nivel_montante.toFixed(2);
    const comp_abertas = estacao.comp_abertas;
    const comp_fechadas = estacao.comp_fechadas;

    document.getElementById(
      "capacidadeBarragem"
    ).innerText = `Capacidade do Reservatório: ${capacBarragem}%`;
    document.getElementById("nivelJusante").innerText = `Nível a Jusante: ${nivel_jusante}m`;
    document.getElementById("nivelMontante").innerText = `Nível a Montante: ${nivel_montante}m`;
    document.getElementById("comportasAbertas").innerText = `Comportas abertas: ${comp_abertas}`;
    document.getElementById("comportasFechadas").innerText = `Comportas fechadas: ${comp_fechadas}`;
    return estacao;
  } catch (error) {
    throw new Error(`Failed to fetch current River Level: ${error}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("boxBarragem")
    ?.addEventListener("click", fetchCurrentDam);
});
