import axios from "axios";

async function getCityCode(city: any) {
  const cityCode = await axios.get(
    `https://brasilapi.com.br/api/cptec/v1/cidade/${city}`
  );
  return cityCode;
}

// Exemplo de uso:
const cityCode: string = "5400"; // Timbó
getWeather(cityCode)
  .then((response) => {
    console.log("Dados climáticos obtidos com sucesso:", response.data);
  })
  .catch((error) => {
    console.error("Erro ao obter dados climáticos:", error);
  });





async function getWeather(cityCode: any) {
  const response = await axios.get(
    // `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cityCode}`  ESSE É O CÓDIGO CERTO. 5400 É TIMBÓ.
    `https://brasilapi.com.br/api/cptec/v1/clima/previsao/5400`

  );





  console.log(response);
  const previsao = response?.data.clima[0].condicao_desc;
  const previsao2 = response?.data.clima[0].data;
  const previsao3 = response?.data.clima[0].indice_uv;
  const previsao4 = response?.data.clima[0].min;
  const previsao5 = response?.data.clima[0].max;

  document.getElementById("Condicao_Descricao").innerText = `${previsao}`;
  document.getElementById("Data").innerText = `${previsao2}`;
  document.getElementById("Indice_UV").innerText = `${previsao3}`;
  document.getElementById("Temperatura_Min").innerText = `${previsao4}`;
  document.getElementById("Temperatura_Max").innerText = `${previsao5}`;

  return response;
}

const city = "Timbó";
// aqui ao invés de texto fixo "Timbó", vincular a um getElement do HTML da seleção de cidade (que nem no login).

const citycode = getCityCode(city);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("climaTempo")?.addEventListener("click", getWeather);
});
