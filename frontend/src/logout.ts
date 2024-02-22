async function logout(event: Event) {
  event.preventDefault();
  try {
    localStorage.removeItem("token");

    window.location.replace("../../pages/login/login.html");
  } catch (error) {
    console.error(`Logout error: ${error.message}`);
  }
}

document.getElementById("logout")?.addEventListener("click", logout);
