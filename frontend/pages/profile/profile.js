$(document).ready(function () {
    $("#update_button").click(function () {
        var newEmail = $("#newEmail").val();
        var newPassword = $("#newPassword").val();

        // Aqui você pode adicionar a lógica para validar os dados, se necessário

        // Enviar solicitação AJAX para o backend
        $.ajax({
            type: "POST",
            url: "/caminho/para/seu/backend/atualizar_dados.php",
            data: {
                newEmail: newEmail,
                newPassword: newPassword
            },
            success: function (response) {
                // Aqui você pode lidar com a resposta do backend
                console.log(response);
                alert("Dados atualizados com sucesso!");
            },
            error: function (xhr, status, error) {
                // Lidar com erros de solicitação
                console.error(error);
                alert("Ocorreu um erro ao atualizar os dados.");
            }
        });
    });
});

function handleFileSelect(event) {
    const fileInput = event.target;
    const perfilFoto = document.getElementById('PerfilFoto');
    const iconeLabel = document.getElementById('IconeLabel');

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            perfilFoto.src = e.target.result;
            iconeLabel.style.display = 'none'; // Oculta o ícone quando uma imagem é selecionada
            perfilFoto.style.display = 'inline-block'; // Mostra a imagem de perfil
            perfilFoto.style.borderRadius = '50%'; // Adiciona a borda redonda
            perfilFoto.style.width = '100px'; // Defina o tamanho desejado para a imagem
            perfilFoto.style.height = '100px'; // Defina o tamanho desejado para a imagem
        };
        reader.readAsDataURL(file);
    }
}

// Adiciona evento de clique na imagem do ícone para acionar o clique no input de arquivo
document.getElementById('IconeFoto').addEventListener('click', function() {
    document.getElementById('InputFoto').click();
});