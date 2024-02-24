import { user } from "./apiUser";

async function loadUserInfo(event: Event) {


  try {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    // Check if token is available
    if (token) {
      // Make a request to your server to fetch user details using Axios
      const response = await user.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Check if the response is successful
      if (response.status === 200) {
        // Parse the JSON response
        console.log(response.data);
        
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
