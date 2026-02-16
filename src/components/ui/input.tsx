import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm px-4 py-2.5 text-base text-foreground placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm transition-all duration-200 cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:border-slate-400 dark:hover:border-slate-600 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-0",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
