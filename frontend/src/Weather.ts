import axios from "axios";

async function getCityCode(city: any) {
  const cityCode = await axios.get(
    `https://brasilapi.com.br/api/cptec/v1/cidade/${city}`
  );
  return cityCode;
}

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

  document.getElementById("previsaoTempo").innerText = `${previsao}`;
  document.getElementById("previsaoTempo2").innerText = `${previsao2}`;
  document.getElementById("previsaoTempo3").innerText = `${previsao3}`;
  document.getElementById("previsaoTempo4").innerText = `${previsao4}`;
  document.getElementById("previsaoTempo5").innerText = `${previsao5}`;

  return response;
}

const city = "Timbó";
// aqui ao invés de texto fixo "Timbó", vincular a um getElement do HTML da seleção de cidade (que nem no login).

const citycode = getCityCode(city);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("climaTempo")?.addEventListener("click", getWeather);
});
