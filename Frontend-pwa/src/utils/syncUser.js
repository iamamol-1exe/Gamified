import axios from "axios";

const synchronizedUser = async (user) => {
  try {
    const token = localStorage.getItem("token");
    const url = import.meta.env.VITE_USER_UPDATE_URL;
    if (!url || !token) {
      return;
    }
    await axios.post(url, user, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("User data synchronized with server");
  } catch (error) {
    console.error("Error synchronizing user data:", error);
  }
};

export default synchronizedUser;
