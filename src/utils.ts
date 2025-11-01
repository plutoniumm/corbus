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
  date_sm: (t) => t.toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }),
};

export function visibility (dx = 0) {
  const body = document.body;
  let OP = getComputedStyle(body).opacity;

  OP = parseFloat(OP) + dx;
  OP = Math.min(Math.max(OP, 0), 1);
  OP = Math.round(OP * 10) / 10;

  body.style.opacity = OP;
  return OP;
}

export function LS (key, defaultValue) {
  let value;
  try {
    value = JSON.parse(localStorage.getItem(key));
  } catch {
    value = defaultValue;
  };
  if (value === null) {
    value = defaultValue;
  };

  return new Proxy(value, {
    set (target, prop, val) {
      target[prop] = val;
      localStorage.setItem(key, JSON.stringify(target));
      return true;
    },

    deleteProperty (target, prop) {
      delete target[prop];
      localStorage.setItem(key, JSON.stringify(target));
      return true;
    }
  });
};