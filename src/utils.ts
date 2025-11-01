export const fmt = {
  default: (t) => t.toLocaleTimeString(),
  time: (t) => t.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  }),
  date: (t) => t.toLocaleDateString("en-GB", {
    weekday: "short",
    year: "2-digit",
    month: "short",
    day: "numeric",
  }),
}