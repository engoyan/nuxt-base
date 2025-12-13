/**
 * Plugin to make touch event listeners passive by default
 * This fixes the browser console warning about non-passive touch event listeners
 * See: https://www.chromestatus.com/feature/5745543795965952
 */
export default defineNuxtPlugin(() => {
  // Only run on client-side
  if (import.meta.server) {
    return;
  }

  // List of touch events that should be passive
  const touchEvents = ["touchstart", "touchmove", "touchend", "touchcancel"];

  // Store original addEventListener
  const originalAddEventListener = EventTarget.prototype.addEventListener;

  // Override addEventListener
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    // If it's a touch event and options is not explicitly set to non-passive
    if (touchEvents.includes(type.toLowerCase())) {
      // Handle different option formats
      if (typeof options === "boolean") {
        // Legacy: (type, listener, useCapture)
        options = { capture: options, passive: true };
      } else if (typeof options === "object" && options !== null) {
        // Modern: (type, listener, { capture, passive, once, signal })
        // Only set passive to true if it's not explicitly set to false
        if (options.passive === undefined) {
          options = { ...options, passive: true };
        }
      } else {
        // No options provided, default to passive: true
        options = { passive: true };
      }
    }

    // Call original addEventListener with potentially modified options
    return originalAddEventListener.call(this, type, listener, options);
  };
});
