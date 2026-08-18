const _queue = ref([]);
let _nextId = 0;

function show({ text, type = "info", color, icon, location = "bottom center", timeout = 4000 }) {
  const colorMap = { success: "success", error: "error", warning: "warning", info: "info" };
  const iconMap = {
    success: "mdi-check-circle",
    error: "mdi-alert-circle",
    warning: "mdi-alert",
    info: "mdi-information",
  };

  _queue.value.push({
    id: _nextId++,
    text,
    color: color || colorMap[type] || "",
    icon: icon || iconMap[type],
    location,
    timeout,
  });
}

function dismiss(id) {
  _queue.value = _queue.value.filter((m) => m.id !== id);
}

function success(text, location, timeout) {
  show({ text, type: "success", location, timeout });
}

function error(text, location, timeout) {
  show({ text, type: "error", location, timeout });
}

function warning(text, location, timeout) {
  show({ text, type: "warning", location, timeout });
}

function info(text, location, timeout) {
  show({ text, type: "info", location, timeout });
}

const AppMessage = { queue: _queue, show, dismiss, success, error, warning, info };
export default AppMessage;
