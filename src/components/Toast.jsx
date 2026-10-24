
import { CheckCircle2, X, XCircle } from "lucide-react";

function Toast({ message, type = "success", onClose }) {
  if (!message) return null;

  const Icon = type === "error" ? XCircle : CheckCircle2;

  return (
    <div
      className={`toast toast-${type}`}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      <Icon size={20} aria-hidden="true" />

      <span>{message}</span>

      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

export default Toast;
