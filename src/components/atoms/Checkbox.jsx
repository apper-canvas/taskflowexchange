import React, { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = forwardRef(({ 
  className, 
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      className={cn(
        "relative w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 hover:scale-110 checkbox-animation",
        checked 
          ? "bg-gradient-to-br from-accent to-green-600 border-accent text-white focus:ring-accent/50" 
          : "bg-white border-slate-300 hover:border-slate-400 focus:ring-primary/50",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        className
      )}
      {...props}
    >
      {checked && (
        <ApperIcon 
          name="Check" 
          size={14} 
          className="text-white animate-check-in"
        />
      )}
    </button>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox