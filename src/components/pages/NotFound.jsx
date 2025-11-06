import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8 max-w-md"
      >
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto">
              <ApperIcon 
                name="SearchX" 
                size={60} 
                className="text-primary/60"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold text-lg">404</span>
            </div>
          </motion.div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-slate-900">
              Page Not Found
            </h1>
            <p className="text-slate-600 leading-relaxed">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGoHome}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            <ApperIcon name="Home" size={18} className="mr-2" />
            Go Back to TaskFlow
          </Button>
          
          <div className="text-sm text-slate-500 space-y-2">
            <p>Need help? Try these options:</p>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex items-center justify-center space-x-2">
                <ApperIcon name="RotateCcw" size={14} />
                <span>Refresh the page</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <ApperIcon name="ArrowLeft" size={14} />
                <span>Use browser back button</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <ApperIcon name="CheckSquare" size={14} />
                <span>Start managing your tasks</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound