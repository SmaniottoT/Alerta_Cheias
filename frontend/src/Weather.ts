import axios from "axios";

async function getCityCode(city: any) {
  const cityCode = await axios.get(
    `https://brasilapi.com.br/api/cptec/v1/cidade/${city}`
  );
  return cityCode;
}

async function getWeather(cityCode: any) {
  const weather = await axios.get(
    `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cityCode}`
  );
  console.log(weather);

  return weather;
}

getCityCode("Timbó");
getWeather(5400);
