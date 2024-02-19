// Obtém todos os botões e conteúdos correspondentes
var dropUpBtns = document.querySelectorAll(".dropUpBtn");
var dropUpContents = document.querySelectorAll(".dropUpContent");

// Adiciona evento de clique a cada botão
dropUpBtns.forEach(function(btn, index) {
  btn.addEventListener("click", function() {
    // Oculta todos os conteúdos
    dropUpContents.forEach(function(content) {
      content.style.display = "none";
    });
    // Exibe o conteúdo correspondente ao botão clicado
    dropUpContents[index].style.display = "block";
  });
});
