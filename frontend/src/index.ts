import { user } from "./apiUser";

document
  .getElementById("form")
  ?.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();
    const credentials = await user.post("/login", {
      username: (document.getElementById("username") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value,
    });

    localStorage.setItem("token", credentials.data.token);
    window.location.replace("/pages/main/main.html");
  });
