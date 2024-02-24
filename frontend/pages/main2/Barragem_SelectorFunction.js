// Obtém referências para os selects
const stateSelect = document.getElementById("StateBarragem");
const citySelect = document.getElementById("CityBarragem");

// Dados de exemplo de cidades por estado
const citiesByState = {
  SC: ["José Boiteux", "Taió", "Ituporanga"],
  SP: ["São Paulo", "Campinas", "Guarulhos"],
  RJ: ["Rio de Janeiro", "Niterói", "Duque de Caxias"],
};

// Função para atualizar as opções da cidade com base no estado selecionado
function updateCities() {
  // Limpa as opções atuais da cidade
  citySelect.innerHTML = "<option selected>Selecione sua cidade</option>";

  // Obtém o valor selecionado do estado
  const stateSelected = stateSelect.value;

  // Obtém as cidades correspondentes ao estado selecionado
  const cities = citiesByState[stateSelected];

  // Adiciona as novas opções de cidade ao select
  cities.forEach((cidade) => {
    const opt = document.createElement("option");
    opt.textContent = cidade;
    citySelect.appendChild(opt);
  });
}

// Adiciona um ouvinte de evento para detectar mudanças no select de estado
stateSelect.addEventListener("change", updateCities);
