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

  const previsao = response?.data.clima[0].condicao_desc;
  const previsao2 = response?.data.clima[0].data;
  const previsao3 = response?.data.clima[0].indice_uv;
  const previsao4 = response?.data.clima[0].min;
  const previsao5 = response?.data.clima[0].max;

  document.getElementById("Condicao_Descricao").innerText = `${previsao}`;
  document.getElementById("Data").innerText = `${previsao2}`;
  document.getElementById("Indice_UV").innerText = `${previsao3}`;
  document.getElementById("Temperatura_Min").innerText = `${previsao4} ºC`;
  document.getElementById("Temperatura_Max").innerText = `${previsao5} ºC`;
  if (previsao == "Pancadas de Chuva") {
    document.getElementById(
      "elementoClima"
    ).innerHTML = `<!-- Cloudy with rain and lightning -->
    <div class="element">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60.7 80"
            style="enable-background:new 0 0 60.7 55;" xml:space="preserve">
            <g id="Cloud_6">
                <g id="White_cloud_6">
                    <path id="XMLID_81_" class="white"
                        d="M47.2,40H7.9C3.5,40,0,36.5,0,32.1l0,0c0-4.3,3.5-7.9,7.9-7.9h39.4c4.3,0,7.9,3.5,7.9,7.9v0 C55.1,36.5,51.6,40,47.2,40z" />
                    <circle id="XMLID_80_" class="white" cx="17.4" cy="22.8" r="9.3" />
                    <circle id="XMLID_77_" class="white" cx="34.5" cy="21.1" r="15.6" />
                </g>
                <g id="Gray_cloud_6">
                    <path id="XMLID_75_" class="gray"
                        d="M54.7,22.3H33.4c-3.3,0-6-2.7-6-6v0c0-3.3,2.7-6,6-6h21.3c3.3,0,6,2.7,6,6v0 C60.7,19.6,58,22.3,54.7,22.3z" />
                    <circle id="XMLID_74_" class="gray" cx="45.7" cy="10.7" r="10.7" />
                    <animateTransform attributeName="transform" attributeType="XML" dur="6s"
                        keyTimes="0;0.5;1" repeatCount="indefinite" type="translate"
                        values="0;-3;0" calcMode="linear">
                    </animateTransform>
                </g>
                <g id="Lightning_6">
                    <path id="XMLID_94_" class="yellow"
                        d="M43.6,22.7c-0.2,0.6-0.4,1.3-0.6,1.9c-0.2,0.6-0.4,1.2-0.7,1.8c-0.4,1.2-0.9,2.4-1.5,3.5
          c-1,2.3-2.2,4.6-3.4,6.8l-1.7-2.9c3.2-0.1,6.3-0.1,9.5,0l3,0.1l-1.3,2.5c-1.1,2.1-2.2,4.2-3.5,6.2c-0.6,1-1.3,2-2,3
          c-0.7,1-1.4,2-2.2,2.9c0.2-1.2,0.5-2.4,0.8-3.5c0.3-1.2,0.6-2.3,1-3.4c0.7-2.3,1.5-4.5,2.4-6.7l1.7,2.7c-3.2,0.1-6.3,0.2-9.5,0
          l-3.4-0.1l1.8-2.8c1.4-2.1,2.8-4.2,4.3-6.2c0.8-1,1.6-2,2.4-3c0.4-0.5,0.8-1,1.3-1.5C42.7,23.7,43.1,23.2,43.6,22.7z" />
                    <animate attributeType="CSS" attributeName="opacity" attributeType="XML"
                        dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite"
                        values="1;0;1" calcMode="linear" />
                </g>
                <g id="Rain_6">
                    <path id="Rain_6_right" class="white"
                        d="M36.3,51.9c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S36.3,50.2,36.3,51.9z" />
                    <path id="Rain_6_mid" class="white"
                        d="M26.4,51.9c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S26.4,50.2,26.4,51.9z" />
                    <path id="Rain_6_left" class="white"
                        d="M15.7,51.9c0,1.7-1.4,3.1-3.1,3.1s-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S15.7,50.2,15.7,51.9z" />
                    <animateTransform attributeName="transform" attributeType="XML" dur="1s"
                        keyTimes="0;1" repeatCount="indefinite" type="translate"
                        values="0 0;0 10" calcMode="linear">
                    </animateTransform>
                    <animate attributeType="CSS" attributeName="opacity" attributeType="XML"
                        dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"
                        calcMode="linear" />
                </g>
            </g>
        </svg>
    </div>`;
  } else if (previsao == "Chuvas Isoladas") {
    document.getElementById("elementoClima").innerHTML = ` <!-- Rainy -->
    <div class="element">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 55.1 60"
            style="enable-background:new 0 0 55.1 49.5;" xml:space="preserve">
            <g id="Cloud_2">
                <g id="Rain_2">
                    <path id="rain_2_left" class="white"
                        d="M20.7,46.4c0,1.7-1.4,3.1-3.1,3.1s-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S20.7,44.7,20.7,46.4z">
                    </path>
                    <path id="rain_2_mid" class="white"
                        d="M31.4,46.4c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S31.4,44.7,31.4,46.4z">
                    </path>
                    <path id="rain_2_right" class="white"
                        d="M41.3,46.4c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S41.3,44.7,41.3,46.4z">
                    </path>
                    <animateTransform attributeName="transform" attributeType="XML" dur="1s"
                        keyTimes="0;1" repeatCount="indefinite" type="translate"
                        values="0 0;0 10" calcMode="linear">
                    </animateTransform>
                    <animate attributeType="CSS" attributeName="opacity" attributeType="XML"
                        dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0"
                        calcMode="linear" />
                </g>
                <g id="White_cloud_2">
                    <path id="XMLID_14_" class="white"
                        d="M47.2,34.5H7.9c-4.3,0-7.9-3.5-7.9-7.9l0,0c0-4.3,3.5-7.9,7.9-7.9h39.4c4.3,0,7.9,3.5,7.9,7.9 v0C55.1,30.9,51.6,34.5,47.2,34.5z" />
                    <circle id="XMLID_13_" class="white" cx="17.4" cy="17.3" r="9.3" />
                    <circle id="XMLID_10_" class="white" cx="34.5" cy="15.6" r="15.6" />
                </g>
            </g>
        </svg>
    </div>`;
  } else {
    document.getElementById("elementoClima").innerHTML = `<!-- Sunny -->
    <div class="element">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 44.9 44.9" style="enable-background:new 0 0 44.9 44.9;"
            xml:space="preserve" height="40px" width="40px">
            <g id="Sun">
                <circle id="XMLID_61_" class="yellow" cx="22.4" cy="22.6" r="11" />
                <g>
                    <path id="XMLID_60_" class="yellow"
                        d="M22.6,8.1h-0.3c-0.3,0-0.6-0.3-0.6-0.6v-7c0-0.3,0.3-0.6,0.6-0.6l0.3,0c0.3,0,0.6,0.3,0.6,0.6 v7C23.2,7.8,22.9,8.1,22.6,8.1z" />
                    <path id="XMLID_59_" class="yellow"
                        d="M22.6,36.8h-0.3c-0.3,0-0.6,0.3-0.6,0.6v7c0,0.3,0.3,0.6,0.6,0.6h0.3c0.3,0,0.6-0.3,0.6-0.6v-7 C23.2,37,22.9,36.8,22.6,36.8z" />
                    <path id="XMLID_58_" class="yellow"
                        d="M8.1,22.3v0.3c0,0.3-0.3,0.6-0.6,0.6h-7c-0.3,0-0.6-0.3-0.6-0.6l0-0.3c0-0.3,0.3-0.6,0.6-0.6h7 C7.8,21.7,8.1,21.9,8.1,22.3z" />
                    <path id="XMLID_57_" class="yellow"
                        d="M36.8,22.3v0.3c0,0.3,0.3,0.6,0.6,0.6h7c0.3,0,0.6-0.3,0.6-0.6v-0.3c0-0.3-0.3-0.6-0.6-0.6h-7 C37,21.7,36.8,21.9,36.8,22.3z" />
                    <path id="XMLID_56_" class="yellow"
                        d="M11.4,31.6l0.2,0.3c0.2,0.2,0.2,0.6-0.1,0.8l-5.3,4.5c-0.2,0.2-0.6,0.2-0.8-0.1l-0.2-0.3 c-0.2-0.2-0.2-0.6,0.1-0.8l5.3-4.5C10.9,31.4,11.2,31.4,11.4,31.6z" />
                    <path id="XMLID_55_" class="yellow"
                        d="M33.2,13l0.2,0.3c0.2,0.2,0.6,0.3,0.8,0.1l5.3-4.5c0.2-0.2,0.3-0.6,0.1-0.8l-0.2-0.3 c-0.2-0.2-0.6-0.3-0.8-0.1l-5.3,4.5C33,12.4,33,12.7,33.2,13z" />
                    <path id="XMLID_54_" class="yellow"
                        d="M11.4,13.2l0.2-0.3c0.2-0.2,0.2-0.6-0.1-0.8L6.3,7.6C6.1,7.4,5.7,7.5,5.5,7.7L5.3,7.9 C5.1,8.2,5.1,8.5,5.4,8.7l5.3,4.5C10.9,13.5,11.2,13.5,11.4,13.2z" />
                    <path id="XMLID_53_" class="yellow"
                        d="M33.2,31.9l0.2-0.3c0.2-0.2,0.6-0.3,0.8-0.1l5.3,4.5c0.2,0.2,0.3,0.6,0.1,0.8l-0.2,0.3 c-0.2,0.2-0.6,0.3-0.8,0.1l-5.3-4.5C33,32.5,33,32.1,33.2,31.9z" />
                    <animate attributeType="CSS" attributeName="opacity" attributeType="XML"
                        dur="0.5s" keyTimes="0;0.5;1" repeatCount="indefinite"
                        values="1;0.6;1" calcMode="linear" />
                </g>
            </g>
        </svg>
    </div>`;
  }

  return response;
}

const city = "Timbó";
// aqui ao invés de texto fixo "Timbó", vincular a um getElement do HTML da seleção de cidade (que nem no login).

const citycode = getCityCode(city);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("climaTempo")?.addEventListener("click", getWeather);
});
