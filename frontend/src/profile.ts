import { user } from "./apiUser";

async function loadUserInfo(event: Event) {
  event.preventDefault();
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await user.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const userData = response.data;

        if (!userData.photo) {
          userData.photo = "/Alerta_Cheias/frontend/assets/icon_profile.png";
        }

        (document.getElementById("userPhoto") as HTMLImageElement).src =
          userData.photo;
        document.getElementById("username").innerText = `@${userData.username}`;
        document.getElementById("userName").innerText = userData.name;
        document.getElementById("userEmail").innerText = userData.email;
      } else {
        console.error("Failed to fetch user details");
      }
    } else {
      console.error("Token not found in local storage");
    }
  } catch (error) {
    console.error("An error occurred while loading user info:", error);
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  loadUserInfo(event);
});
