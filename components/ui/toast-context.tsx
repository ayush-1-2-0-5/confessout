import React, { createContext, useReducer, useContext } from 'react'
import { reducer, ActionType } from './use-toast'

export type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  open: boolean
}

type State = {
  toasts: Toast[]
}

type ToastContextType = {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id' | 'open'>) => void
  updateToast: (id: string, toast: Partial<Toast>) => void
  dismissToast: (id: string) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { toasts: [] })

  const addToast = (toast: Omit<Toast, 'id' | 'open'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    dispatch({
      type: ActionType.ADD_TOAST,
      toast: { ...toast, id, open: true },
    })
  }

  const updateToast = (id: string, toast: Partial<Toast>) => {
    dispatch({
      type: ActionType.UPDATE_TOAST,
      toast: { id, ...toast },
    })
  }

  const dismissToast = (id: string) => {
    dispatch({
      type: ActionType.DISMISS_TOAST,
      toastId: id,
    })
  }

  const removeToast = (id: string) => {
    dispatch({
      type: ActionType.REMOVE_TOAST,
      toastId: id,
    })
  }

  return (
    <ToastContext.Provider
      value={{
        toasts: state.toasts,
        addToast,
        updateToast,
        dismissToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export const useToastContext = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider')
  }
  return context
}

