import { user } from "./apiUser";

async function submitForm(event: Event) {
  event.preventDefault();
  try {
    const newUser: any = await user.post("/users", {
      username: (document.getElementById("username") as HTMLInputElement).value,
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value,
    });
    console.log(newUser);

    if (newUser.response.data.error) {
      throw new Error(newUser.response.data.error);
    }
    window.location.replace("../../pages/login/login.html");
  } catch (error) {
    // alert(`Error: ${error.message}`);
    // transformar o alert em um document.elementHtml
    document.getElementById("error").innerText = error.message;
    document.getElementById("error").style.display = "block";
    document
      .getElementById("username")
      .addEventListener("click", (event: Event) => {
        document.getElementById("error").style.display = "none";
      });
  }
}

document.getElementById("signUp_button")?.addEventListener("click", submitForm);

document
  .getElementById("password")
  .addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key == "Enter") {
      submitForm(event);
    }
  });
