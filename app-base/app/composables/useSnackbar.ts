interface SnackbarMessage {
  id: number;
  text: string;
  color: string;
  icon?: string;
  timeout: number;
}

const queue = ref<SnackbarMessage[]>([]);
let nextId = 0;

export const useSnackbar = () => {
  function show(text: string, options: { color?: string; icon?: string; timeout?: number } = {}) {
    const msg: SnackbarMessage = {
      id: nextId++,
      text,
      color: options.color || "",
      icon: options.icon,
      timeout: options.timeout ?? 4000,
    };
    queue.value.push(msg);
  }

  function success(text: string, timeout?: number) {
    show(text, { color: "success", icon: "mdi-check-circle", timeout });
  }

  function error(text: string, timeout?: number) {
    show(text, { color: "error", icon: "mdi-alert-circle", timeout });
  }

  function info(text: string, timeout?: number) {
    show(text, { color: "info", icon: "mdi-information", timeout });
  }

  function warning(text: string, timeout?: number) {
    show(text, { color: "warning", icon: "mdi-alert", timeout });
  }

  function dismiss(id: number) {
    queue.value = queue.value.filter((m) => m.id !== id);
  }

  return { queue: readonly(queue), show, success, error, info, warning, dismiss };
};
