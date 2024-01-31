// JavaScript (script.js)
function toggleDropdownState() {
    var dropdown = document.getElementById("DropdownState");
    dropdown.classList.toggle("show");
}

function toggleDropdownCity() {
    var dropdown = document.getElementById("DropdownCity");
    dropdown.classList.toggle("show");
}
// Fechar o dropdown se o usuário clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}