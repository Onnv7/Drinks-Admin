export const storageManager = {
  getUserId: () => {
    return window.localStorage.getItem("userId");
  },
  setUserId: (userId: string) => {
    return window.localStorage.setItem("userId", userId);
  },

  getToken: () => {
    return window.localStorage.getItem("token");
  },
  setToken: (token: string) => {
    return window.localStorage.setItem("token", token);
  },
  clearStore: () => {
    window.localStorage.clear();
  },
};
