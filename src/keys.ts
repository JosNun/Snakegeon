export let keys: Record<string, boolean> = {};

export function reset() {
  keys = {};
}

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});
