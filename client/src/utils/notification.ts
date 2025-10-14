import toast, { ToastPosition } from "react-hot-toast";

const toastConfig = {
  duration: 3000,
  position: "top-right" as ToastPosition,
  style: {
    fontSize: "15px",
    fontWeight: "500",
    borderRadius: "12px",
    padding: "16px 24px",
    background: "#ffffff",
    color: "#1a1a1a",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    border: "2px solid rgba(0, 0, 0, 0.08)",
    minWidth: "300px",
  },
};

export const notify = {
  success: ({ message }: { message: string }) => {
    toast.success(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        background: "#f0fdf4",
        border: "2px solid #22c55e",
        color: "#15803d",
      },
    });
  },
  error: ({ message }: { message: string }) => {
    toast.error(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        background: "#fef2f2",
        border: "2px solid #ef4444",
        color: "#b91c1c",
      },
    });
  },
  warning: ({ message }: { message: string }) => {
    toast(message, {
      ...toastConfig,
      icon: "⚠️",
      style: {
        ...toastConfig.style,
        background: "#fefce8",
        border: "2px solid #eab308",
        color: "#854d0e",
      },
    });
  },
  info: ({ message }: { message: string }) => {
    toast(message, {
      ...toastConfig,
      icon: "ℹ️",
      style: {
        ...toastConfig.style,
        background: "#eff6ff",
        border: "2px solid #3b82f6",
        color: "#1d4ed8",
      },
    });
  },
};
