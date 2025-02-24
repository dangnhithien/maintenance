import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "../apis/authApi";
import { LoginDto } from "../datas/LoginDto";

const KEY = "Auth";
export const useAuth = (initialParams?: any) => {
  const queryClient = useQueryClient();

  // Function to manually refetch user info with new params
  const fetchUserInfo = async (newParams: any) => {
    try {
      const data = await authApi.getUserInfo(newParams);
      localStorage.setItem("userInfo", JSON.stringify(data)); // Lưu thông tin người dùng

      queryClient.setQueryData([KEY], data);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  // Login
  const login = useMutation({
    mutationFn: (loginData: LoginDto) => authApi.login(loginData),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.user)); // Lưu thông tin người dùng

      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onError: (error) => {
      console.error("Failed to login:", error);
      queryClient.setQueryData([KEY], null); // Set data to null if login fails
    },
    // Always refetch user info after login
  });

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo"); // Xóa thông tin người dùng

    queryClient.invalidateQueries({ queryKey: [KEY] });
  };

  return {
    fetchUserInfo, // Now accepts params
    login: login.mutateAsync,
    logout,
    loading: false,
    error: null, // Placeholder for error
  };
};

export default useAuth;
