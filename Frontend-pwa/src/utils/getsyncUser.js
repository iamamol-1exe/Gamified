import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Create a custom hook (must start with "use")
const useGetUser = () => {
  const { setUser } = useContext(AuthContext);

  const syncUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = import.meta.env.VITE_USER_PROFILE_URL;
      if (!url || !token) {
        return;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("User data synchronized with server", response.data);
    } catch (error) {
      console.error("Error synchronizing user data:", error);
    }
  };

  return syncUser;
};

export default useGetUser;
