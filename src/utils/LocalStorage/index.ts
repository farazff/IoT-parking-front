export const setToken = (sessionToken: string) => {
  localStorage.setItem("session_token", JSON.stringify(sessionToken));
};

export const setNumber = (number: string) => {
  localStorage.setItem("user_number", JSON.stringify(number));
};

export const getNumber = () => {
  return JSON.parse(localStorage.getItem("user_number") as string);
};

export const setApiKey = (apiKey: string) => {
  localStorage.setItem(
    "api_key",
    JSON.stringify(
      apiKey === "sysAdmin"
        ? "system"
        : apiKey === "parkingAdmin"
        ? "parking"
        : apiKey
    )
  );
};

export const getSessionToken = () => {
  return JSON.parse(localStorage.getItem("session_token") as string);
};

export const getApiKey = () => {
  return JSON.parse(localStorage.getItem("api_key") as string);
};

export const getRefreshToken = () => {
  return JSON.parse(localStorage.getItem("refresh_token") as string);
};
