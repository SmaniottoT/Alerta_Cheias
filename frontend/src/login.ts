import { user } from "./apiUser";

async function login(event: Event) {
  event.preventDefault();
  try {
    const credentials: any = await user.post("/login", {
      username: (document.getElementById("username") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value,
    });
    console.log(credentials);

    if (credentials.response?.data.error) {
      throw new Error(credentials.response.data.error);
    }
    localStorage.setItem("token", credentials.data.token);
    window.location.replace("../../pages/main2/main2.html");
  } catch (error) {
    document.getElementById("error").innerText = error.message;
    document.getElementById("error").style.display = "block";
    document
      .getElementById("username")
      .addEventListener("click", (event: Event) => {
        document.getElementById("error").style.display = "none";
      });
  }
}

document.getElementById("Login_Button")?.addEventListener("click", login);
