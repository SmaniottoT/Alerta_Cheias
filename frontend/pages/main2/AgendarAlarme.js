// Obter o modal
var Modal_Background = document.getElementById("Modal_Background");

// Obter o botão que abre o modal
var Botao_Alarme = document.getElementById("Botao_Alarme");

// Obter o elemento <span> que fecha o modal
var x = document.getElementsByClassName("close")[0];

// Quando o usuário clica no botão, abrir o modal
Botao_Alarme.onclick = function() {
    Modal_Background.style.display = "block";
}

// Quando o usuário clica no <span> (x), fechar o modal
x.onclick = function() {
    Modal_Background.style.display = "none";
}

// Quando o usuário clica em qualquer lugar fora do modal, feche-o
window.onclick = function(event) {
  if (event.target == Modal_Background) {
    Modal_Background.style.display = "none";
  }
}

// Lidar com a submissão do formulário
document.getElementById("Modal_Formulario").addEventListener("submit", function(event){
  event.preventDefault(); // previne a submissão padrão do formulário
  
  // Você pode lidar com a submissão do formulário aqui, por exemplo, enviando dados para o servidor
  // Por agora, apenas fecharemos o modal
  Modal_Background.style.display = "none";
});
