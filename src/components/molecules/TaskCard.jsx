import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'
import Checkbox from '@/components/atoms/Checkbox'

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onDelete,
  isDeleting = false 
}) => {
  const handleToggleComplete = async () => {
    // Add completion animation class temporarily
    const element = document.getElementById(`task-${task.Id}`)
    if (element && !task.completed) {
      element.classList.add('task-completed')
      setTimeout(() => {
        element.classList.remove('task-completed')
      }, 300)
    }
    
    onToggleComplete(task.Id)
  }

  const handleDelete = () => {
    onDelete(task.Id)
  }

  return (
    <motion.div
      id={`task-${task.Id}`}
      initial={{ opacity: 1, scale: 1 }}
      animate={isDeleting ? { 
        opacity: 0, 
        scale: 0.95,
        x: 20
      } : { 
        opacity: 1, 
        scale: 1,
        x: 0
      }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut" 
      }}
      className={cn(
        "task-card bg-white rounded-lg border border-slate-200 p-4 shadow-sm",
        task.completed && "bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-green-200"
      )}
    >
      <div className="flex items-start space-x-4">
        <Checkbox
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mt-0.5 flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-medium text-slate-900 transition-all duration-200",
            task.completed && "line-through text-slate-500"
          )}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={cn(
              "text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed",
              task.completed && "text-slate-400"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center space-x-4 mt-3 text-xs text-slate-400">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Calendar" size={12} />
              <span>
                {new Date(task.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            {task.completed && (
              <div className="flex items-center space-x-1 text-green-600">
                <ApperIcon name="CheckCircle" size={12} />
                <span>Completed</span>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-shrink-0 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          aria-label="Delete task"
        >
          <ApperIcon name="Trash2" size={16} />
        </button>
      </div>
    </motion.div>
  )
}

export default TaskCard