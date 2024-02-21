import axios from "axios";



const clima = axios.get("https://brasilapi.com.br/api/cptec/v1/clima/previsao/{cityCode}");
console.log(clima);
