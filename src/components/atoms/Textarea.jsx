import React, { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Textarea = forwardRef(({ 
  className, 
  label,
  error,
  rows = 3,
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={cn(
          "flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200",
          error && "border-red-500 focus:ring-red-500/50 focus:border-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
})

Textarea.displayName = "Textarea"

export default Textarea