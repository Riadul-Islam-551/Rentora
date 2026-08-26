"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

const ToastContext = createContext(undefined);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ message, type = "info", duration = 4000, position = "top-center" }) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { id, message, type, duration, position };

      setToasts((prev) => [...prev, newToast]);

      if (type !== "loading" && duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast],
  );

  const positions = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  const getPositionClasses = (pos) => {
    switch (pos) {
      case "top-left":
        return "top-4 left-4 items-start";
      case "top-center":
        return "top-4 left-1/2 -translate-x-1/2 items-center";
      case "top-right":
        return "top-4 right-4 items-end";
      case "bottom-left":
        return "bottom-4 left-4 items-start";
      case "bottom-center":
        return "bottom-4 left-1/2 -translate-x-1/2 items-center";
      case "bottom-right":
        return "bottom-4 right-4 items-end";
      default:
        return "top-4 right-4 items-end";
    }
  };

  const getToastStyle = (type) => {
    switch (type) {
      case "success":
        return {
          bg: "border-success",
          icon: <CheckCircle2 className="h-5 w-5 text-success shrink-0" />,
        };
      case "error":
        return {
          bg: "bg-card border-destructive/30 text-destructive",
          icon: <AlertCircle className="h-5 w-5 text-destructive shrink-0" />,
        };
      case "loading":
        return {
          bg: "bg-card border-primary/30 text-primary",
          icon: (
            <Loader2 className="h-5 w-5 text-primary animate-spin shrink-0" />
          ),
        };
      case "warning":
        return {
          bg: "bg-card border-amber-500/30 text-amber-600 dark:text-amber-400",
          icon: <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />,
        };
      case "info":
      default:
        return {
          bg: "bg-card border-primary/30 text-primary",
          icon: <Info className="h-5 w-5 text-primary shrink-0" />,
        };
    }
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {positions.map((pos) => {
        const activeToasts = toasts.filter((t) => t.position === pos);
        if (activeToasts.length === 0) return null;

        return (
          <div
            key={pos}
            className={`fixed z-100 flex flex-col gap-2 pointer-events-none transition-all duration-300 ${getPositionClasses(
              pos,
            )}`}
          >
            {activeToasts.map((item) => {
              const style = getToastStyle(item.type || "info");
              return (
                <div
                  key={item.id}
                  className={`pointer-events-auto flex items-center gap-3 w-80 max-w-[calc(100vw-2rem)] p-4 rounded-lg border-2 text-foreground shadow-lg transition-all transform animate-in fade-in slide-in-from-top-2 duration-200 ${style.bg}`}
                >
                  {style.icon}
                  <span className="text-sm font-medium flex-1 text-foreground">
                    {item.message}
                  </span>
                  <button
                    onClick={() => removeToast(item.id)}
                    className="p-1 rounded-md"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
