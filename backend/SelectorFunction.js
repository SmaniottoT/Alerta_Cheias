 // Obtém referências para os selects
 const estadoSelect = document.getElementById('State');
 const cidadeSelect = document.getElementById('City');
 
 // Dados de exemplo de cidades por estado
 const cidadesPorEstado = {
     'SC': ['Timbó', 'Indaial', 'Blumenau'],
     'SP': ['São Paulo', 'Campinas', 'Guarulhos'],
     'RJ': ['Rio de Janeiro', 'Niterói', 'Duque de Caxias']
 };
 
 // Função para atualizar as opções da cidade com base no estado selecionado
 function atualizarCidades() {
     // Limpa as opções atuais da cidade
     cidadeSelect.innerHTML = '<option selected>Select your city </option>';
     
     // Obtém o valor selecionado do estado
     const estadoSelecionado = estadoSelect.value;
     
     // Obtém as cidades correspondentes ao estado selecionado
     const cidades = cidadesPorEstado[estadoSelecionado];
     
     // Adiciona as novas opções de cidade ao select
     cidades.forEach(cidade => {
         const option = document.createElement('option');
         option.textContent = cidade;
         cidadeSelect.appendChild(option);
     });
 }
 
 // Adiciona um ouvinte de evento para detectar mudanças no select de estado
 estadoSelect.addEventListener('change', atualizarCidades);