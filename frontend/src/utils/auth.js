import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
};

export const loader = () => {
  return getAuthToken();
};

export const checkAuthLoader = () => {
  const token = getAuthToken();
  if (!token) {
    redirect("/auth");
  }
  return null;
};

export const getTokenDuration = () => {
  const storedDuration = localStorage.getItem("expire");
  const expireDuration = new Date(storedDuration);

  const now = new Date();

  const duration = expireDuration.getTime() - now.getTime();

  return duration;
};
