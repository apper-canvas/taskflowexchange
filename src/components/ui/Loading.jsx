import React from 'react'

const Loading = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="text-center space-y-3">
        <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-48 mx-auto"></div>
        <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md w-32 mx-auto"></div>
      </div>
      
      {/* Task list skeleton */}
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
            <div className="flex items-start space-x-4">
              {/* Checkbox skeleton */}
              <div className="w-5 h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded border-2 border-slate-300 flex-shrink-0 mt-0.5"></div>
              
              {/* Content skeleton */}
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md w-full"></div>
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md w-2/3"></div>
              </div>
              
              {/* Delete button skeleton */}
              <div className="w-8 h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex-shrink-0"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Floating button skeleton */}
      <div className="fixed bottom-6 right-6">
        <div className="w-14 h-14 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full shadow-lg"></div>
      </div>
    </div>
  )
}

export default Loading