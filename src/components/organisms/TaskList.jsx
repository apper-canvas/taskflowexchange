import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import taskService from '@/services/api/taskService'
import TaskCard from '@/components/molecules/TaskCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const TaskList = ({ onAddTask, onEditTask, refreshTrigger }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingTasks, setDeletingTasks] = useState(new Set())
  const loadTasks = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await taskService.getTasks()
      setTasks(data)
    } catch (err) {
      console.error('Error loading tasks:', err)
      setError('Failed to load tasks. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [refreshTrigger])

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleTaskCompletion(taskId)
      setTasks(prev => 
        prev.map(task => 
          task.Id === taskId ? updatedTask : task
        )
      )
      
      if (updatedTask.completed) {
        toast.success('Task completed! 🎉', {
          position: "top-right",
          autoClose: 2000,
        })
      } else {
        toast.info('Task marked as pending', {
          position: "top-right",
          autoClose: 2000,
        })
      }
    } catch (err) {
      console.error('Error toggling task:', err)
      toast.error('Failed to update task. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      // Add to deleting set to show animation
      setDeletingTasks(prev => new Set([...prev, taskId]))
      
      // Wait a bit for animation to start
      setTimeout(async () => {
        try {
          await taskService.deleteTask(taskId)
          setTasks(prev => prev.filter(task => task.Id !== taskId))
          toast.success('Task deleted successfully', {
            position: "top-right",
            autoClose: 2000,
          })
        } catch (err) {
          console.error('Error deleting task:', err)
          toast.error('Failed to delete task. Please try again.', {
            position: "top-right",
            autoClose: 3000,
          })
        } finally {
          setDeletingTasks(prev => {
            const newSet = new Set(prev)
            newSet.delete(taskId)
            return newSet
          })
        }
      }, 150)
    } catch (err) {
      console.error('Error initiating task deletion:', err)
      setDeletingTasks(prev => {
        const newSet = new Set(prev)
        newSet.delete(taskId)
        return newSet
      })
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadTasks} />
  if (tasks.length === 0) return <Empty onAddTask={onAddTask} />

// Sort tasks: pending first, then completed, within each group sort by priority then creation date
  const getPriorityValue = (priority) => {
    switch (priority) {
      case 'High': return 3
      case 'Medium': return 2
      case 'Low': return 1
      default: return 2
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1 // Pending tasks first
    }
    
    // Within same completion status, sort by priority (High > Medium > Low)
    const priorityDiff = getPriorityValue(b.priority) - getPriorityValue(a.priority)
    if (priorityDiff !== 0) {
      return priorityDiff
    }
    
    return new Date(b.createdAt) - new Date(a.createdAt) // Newest first within same priority
  })

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {sortedTasks.map((task, index) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05,
              layout: { duration: 0.2 }
            }}
          >
<TaskCard
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={onEditTask}
              isDeleting={deletingTasks.has(task.Id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Spacing for floating button */}
      <div className="h-20"></div>
    </div>
  )
}

export default TaskList