
import * as React from "react";
import { cn } from "../../lib/utils"; // Make sure you have the `cn` utility for conditional class names

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium text-gray-700", className)}
      {...props}
    />
  )
);

Label.displayName = "Label";
