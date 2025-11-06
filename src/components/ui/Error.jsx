import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
      <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
        <ApperIcon 
          name="AlertTriangle" 
          size={40} 
          className="text-red-600"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900">
          Oops! Something went wrong
        </h3>
        <p className="text-slate-600 max-w-md">
          {message}. Don't worry, this happens sometimes.
        </p>
      </div>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        >
          <ApperIcon name="RotateCcw" size={18} className="mr-2" />
          Try Again
        </Button>
      )}
      
      <div className="text-sm text-slate-500 space-y-1">
        <p>If this problem persists, try:</p>
        <ul className="list-disc list-inside text-left space-y-1">
          <li>Refreshing the page</li>
          <li>Clearing your browser cache</li>
          <li>Checking your internet connection</li>
        </ul>
      </div>
    </div>
  )
}

export default Error