import Cookies from "js-cookie";
export const cookier = {
  getRefreshToken: () => {
    return document.cookie.match(
      "(^|;)\\s*" + "refreshToken" + "\\s*=\\s*([^;]+)"
    )?.[0];
  },
};
