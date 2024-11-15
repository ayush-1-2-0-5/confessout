// components/ui/input.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const inputVariants = cva(
  "block w-full rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-input bg-background text-foreground",
        error: "border-red-500 text-red-900",
        success: "border-green-500 text-green-900",
      },
      inputSize: {
        sm: "p-2 text-xs",
        default: "p-3",
        lg: "p-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
  VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, ...props }, ref) => (
    <input className={cn(inputVariants({ variant, inputSize, className }))} ref={ref} {...props} />
  )
)
Input.displayName = "Input"

export { Input, inputVariants }
