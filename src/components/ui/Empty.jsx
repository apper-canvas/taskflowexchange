import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ onAddTask }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-8">
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
          <ApperIcon 
            name="CheckSquare" 
            size={60} 
            className="text-primary/60"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/30 rounded-full flex items-center justify-center">
          <ApperIcon 
            name="Sparkles" 
            size={20} 
            className="text-accent"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-slate-900">
          Ready to get organized?
        </h3>
        <p className="text-slate-600 max-w-md leading-relaxed">
          You don't have any tasks yet. Create your first task to start managing your daily activities and boost your productivity!
        </p>
      </div>
      
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={onAddTask}
          className="btn-primary bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          Add Your First Task
        </button>
        
        {/* Animated arrow pointing to floating button */}
        <div className="hidden sm:flex flex-col items-center space-y-2 text-slate-400 animate-bounce">
          <p className="text-sm">or use the</p>
          <div className="flex items-center space-x-2">
            <ApperIcon name="ArrowDown" size={16} />
            <span className="text-sm">floating button</span>
            <ApperIcon name="ArrowDownRight" size={16} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-md mt-8">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
            <ApperIcon name="PlusCircle" size={20} className="text-blue-600" />
          </div>
          <p className="text-xs text-slate-600">Add tasks</p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
            <ApperIcon name="Check" size={20} className="text-green-600" />
          </div>
          <p className="text-xs text-slate-600">Mark complete</p>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
            <ApperIcon name="Trash2" size={20} className="text-purple-600" />
          </div>
          <p className="text-xs text-slate-600">Delete when done</p>
        </div>
      </div>
    </div>
  )
}

export default Empty