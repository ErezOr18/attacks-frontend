export const TAKE = 5;
export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://localhost:5000";
