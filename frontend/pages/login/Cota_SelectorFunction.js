// Obtém referências para os selects
const estadoSelect = document.getElementById("StateCota");
const cidadeSelect = document.getElementById("CityCota");

// Dados de exemplo de cidades por estado
const cidadesPorEstado = {
  SC: [
    "Timbó",
    "Indaial",
    "Rio dos Cedros",
    "Benedito Novo",
    "Pomerode",
    "Doutor Pedrinho",
    "Ibirama",
    "Ilhota",
    "José Boiteux",
    "Taió",
    "Ituporanga",
  ],
  SP: ["São Paulo", "Campinas", "Guarulhos"],
  RJ: ["Rio de Janeiro", "Niterói", "Duque de Caxias"],
};

// Função para atualizar as opções da cidade com base no estado selecionado
function atualizarCidades() {
  // Limpa as opções atuais da cidade
  cidadeSelect.innerHTML = "<option selected>Selecione sua cidade</option>";

  // Obtém o valor selecionado do estado
  const estadoSelecionado = estadoSelect.value;

  // Obtém as cidades correspondentes ao estado selecionado
  const cidades = cidadesPorEstado[estadoSelecionado];

  // Adiciona as novas opções de cidade ao select
  cidades.forEach((cidade) => {
    const option = document.createElement("option");
    option.textContent = cidade;
    cidadeSelect.appendChild(option);
  });
}

// Adiciona um ouvinte de evento para detectar mudanças no select de estado
estadoSelect.addEventListener("change", atualizarCidades);
