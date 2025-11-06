import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Textarea from '@/components/atoms/Textarea'

const TaskForm = ({ onSubmit, onCancel, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required'
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Task title must be at least 2 characters'
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Task title must be less than 100 characters'
    }
    
    if (formData.description && formData.description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim()
      })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel()
    }
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
      onKeyDown={handleKeyDown}
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">
          Add New Task
        </h2>
        <p className="text-slate-600">
          Create a new task to add to your productivity list
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Task Title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="e.g., Complete project proposal"
          error={errors.title}
          autoFocus
        />

        <Textarea
          label="Description (Optional)"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Add more details about this task..."
          rows={4}
          error={errors.description}
        />

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="text-sm text-slate-500 space-y-1">
            <p>Tips:</p>
            <ul className="text-xs space-y-0.5">
              <li>• Press Esc to cancel</li>
              <li>• Press Cmd/Ctrl + Enter to save quickly</li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              disabled={isSubmitting || !formData.title.trim()}
              className="min-w-[100px]"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Adding...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Plus" size={16} />
                  <span>Add Task</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default TaskForm