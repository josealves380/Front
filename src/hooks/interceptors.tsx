import { api } from "../services/api";

api.interceptors.response.use(
  (response) => {
    //console.log(response)
    return response;
  },

  async function (error) {
    const originalRequest = await error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === "http://127.0.0.1:3316/refresh-token"
    ) {
      api.post("/login");
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("@PermissionYT:token");
      return api
        .post("/refresh-token", {
          refresh_token: refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            localStorage.setToken(res.data);
            api.defaults.headers.common["Authorization"] =
              "Bearer " + localStorage.getAccessToken();
            return api(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
