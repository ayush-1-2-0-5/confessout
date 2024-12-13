'use client';
import React, { createContext, useContext, useReducer } from 'react';

// Toast types
export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  open: boolean;
};

type State = {
  toasts: Toast[];
};
export enum ActionType {
  ADD_TOAST = 'ADD_TOAST',
  UPDATE_TOAST = 'UPDATE_TOAST',
  DISMISS_TOAST = 'DISMISS_TOAST',
  REMOVE_TOAST = 'REMOVE_TOAST',
}

type Action =
  | { type: ActionType.ADD_TOAST; toast: Toast }
  | { type: ActionType.UPDATE_TOAST; toast: Partial<Toast> }
  | { type: ActionType.DISMISS_TOAST; toastId: string }
  | { type: ActionType.REMOVE_TOAST; toastId: string };

// Reducer
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts],
      };
    case ActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    case ActionType.DISMISS_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId ? { ...t, open: false } : t
        ),
      };
    case ActionType.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
};

// Context and provider
const ToastContext = createContext<{
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id' | 'open'>) => void;
  updateToast: (id: string, toast: Partial<Toast>) => void;
  dismissToast: (id: string) => void;
  removeToast: (id: string) => void;
  toast: (options: Omit<Toast, 'id' | 'open'> & { duration?: number; variant?: string }) => void;
} | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { toasts: [] });

  // Function to add a toast
  const addToast = (toast: Omit<Toast, 'id' | 'open'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({ type: ActionType.ADD_TOAST, toast: { ...toast, id, open: true } });
  };

  // Function to update a toast
  const updateToast = (id: string, toast: Partial<Toast>) => {
    dispatch({ type: ActionType.UPDATE_TOAST, toast: { id, ...toast } });
  };

  // Function to dismiss a toast
  const dismissToast = (id: string) => {
    dispatch({ type: ActionType.DISMISS_TOAST, toastId: id });
  };

  // Function to remove a toast
  const removeToast = (id: string) => {
    dispatch({ type: ActionType.REMOVE_TOAST, toastId: id });
  };

  // Utility function for simpler toast creation
  const toast = (options: Omit<Toast, 'id' | 'open'> & { duration?: number; variant?: string }) => {
    const id = Math.random().toString(36).substr(2, 9);
    const { duration, ...toastProps } = options;

    // Add the toast
    addToast({ ...toastProps });

    // Automatically dismiss the toast after the specified duration
    if (duration) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }
  };

  return (
    <ToastContext.Provider
      value={{
        toasts: state.toasts,
        addToast,
        updateToast,
        dismissToast,
        removeToast,
        toast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
