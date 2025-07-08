import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const baseClasses = "font-medium transition-all duration-200 flex items-center justify-center gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white focus:ring-primary/30 shadow-lg hover:shadow-elevated",
    secondary: "bg-white border border-gray-200 text-secondary-700 hover:bg-gray-50 focus:ring-accent/30 shadow-card",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/30",
    ghost: "text-secondary-600 hover:bg-gray-100 focus:ring-gray-300",
    danger: "bg-gradient-to-r from-error to-error/80 hover:from-error/90 hover:to-error/70 text-white focus:ring-error/30 shadow-lg",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;