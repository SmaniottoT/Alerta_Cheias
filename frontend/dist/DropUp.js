//01 BOTAO COTA DE ENCHENTE
document.getElementById("Botao_DropUp_01").addEventListener("click", function () {
    var DropUp_Conteudo_01 = document.getElementById("DropUp_Conteudo_01");
    var style = window.getComputedStyle(DropUp_Conteudo_01); // Obter o estilo computado
    if (style.display === "block") {
        DropUp_Conteudo_01.style.display = "none";
    } else {
        DropUp_Conteudo_01.style.display = "block";
    }
});

//02 BOTAO INFO BARRAGEM
document.getElementById("Botao_DropUp_02").addEventListener("click", function () {
    var DropUp_Conteudo_02 = document.getElementById("DropUp_Conteudo_02");
    var style = window.getComputedStyle(DropUp_Conteudo_02); // Obter o estilo computado
    if (style.display === "block") {
        DropUp_Conteudo_02.style.display = "none";
    } else {
        DropUp_Conteudo_02.style.display = "block";
    }
});

//03 BOTAO PREVISÃO DO TEMPO
document.getElementById("Botao_DropUp_03").addEventListener("click", function () {
    var DropUp_Conteudo_03 = document.getElementById("DropUp_Conteudo_03");
    var style = window.getComputedStyle(DropUp_Conteudo_03); // Obter o estilo computado
    if (style.display === "block") {
        DropUp_Conteudo_03.style.display = "none";
    } else {
        DropUp_Conteudo_03.style.display = "block";
    }
});
