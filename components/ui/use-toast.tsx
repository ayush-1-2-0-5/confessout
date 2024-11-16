'use client';

import React, { createContext, useContext, useState } from "react";

interface ToastMessage {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

interface ToastContextType {
  showToast: (message: ToastMessage) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

  const showToast = (message: ToastMessage) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000); // Auto-dismiss after 3 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
            toastMessage.variant === "destructive" ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          <h4 className="font-semibold">{toastMessage.title}</h4>
          {toastMessage.description && <p>{toastMessage.description}</p>}
        </div>
      )}
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