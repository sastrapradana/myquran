import Cookies from "js-cookie";

export function formatTime(time) {
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
}

export const createCookies = (name, value) => {
  Cookies.set(name, value, { expires: 7 });
};

export const getCookies = (name) => {
  return Cookies.get(name);
};
