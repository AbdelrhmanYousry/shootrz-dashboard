import  { getCookie } from "./cookie";
const isBrowser = () => typeof window !== "undefined";
export const getUser = () =>
  isBrowser() && getCookie("shootrz-dashboard-token")
    ? getCookie("shootrz-dashboard-token")
    : null;
export const isLoggedIn = () => {
  const user = getUser();
  return !!user;
};
