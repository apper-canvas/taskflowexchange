import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import TaskStats from '@/components/molecules/TaskStats'
import TaskList from '@/components/organisms/TaskList'
import Modal from '@/components/molecules/Modal'
import TaskForm from '@/components/molecules/TaskForm'
import taskService from '@/services/api/taskService'

const Home = () => {
const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  // Update tasks when TaskList loads them
  const updateTasks = (newTasks) => {
    setTasks(newTasks)
  }

const handleAddTask = () => {
    setIsModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsEditModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingTask(null)
  }

const handleSubmitTask = async (taskData) => {
    try {
      setIsSubmitting(true)
      const newTask = await taskService.createTask(taskData)
      
      // Refresh task list
      setRefreshTrigger(prev => prev + 1)
      
      // Close modal
      setIsModalOpen(false)
      
      toast.success('Task added successfully! 🎯', {
        position: "top-right",
        autoClose: 2000,
      })
    } catch (err) {
      console.error('Error creating task:', err)
      toast.error('Failed to create task. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateTask = async (taskData) => {
    try {
      setIsSubmitting(true)
      await taskService.updateTask(editingTask.Id, taskData)
      
      // Refresh task list
      setRefreshTrigger(prev => prev + 1)
      
      // Close modal
      setIsEditModalOpen(false)
      setEditingTask(null)
      
      toast.success('Task updated successfully! ✅', {
        position: "top-right",
        autoClose: 2000,
      })
    } catch (err) {
      console.error('Error updating task:', err)
      toast.error('Failed to update task. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = totalTasks - completedTasks

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header with stats */}
          <TaskStats
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            pendingTasks={pendingTasks}
          />
          
          {/* Task list */}
<TaskList
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            refreshTrigger={refreshTrigger}
            onTasksUpdate={updateTasks}
          />
        </motion.div>
        
        {/* Floating Add Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          onClick={handleAddTask}
          className="floating-btn fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg flex items-center justify-center z-40 focus:outline-none focus:ring-4 focus:ring-primary/20"
          aria-label="Add new task"
        >
          <ApperIcon name="Plus" size={24} />
        </motion.button>
        
{/* Add Task Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <TaskForm
            onSubmit={handleSubmitTask}
            onCancel={handleCloseModal}
            isSubmitting={isSubmitting}
          />
        </Modal>

        {/* Edit Task Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
        >
          <TaskForm
            task={editingTask}
            onSubmit={handleUpdateTask}
            onCancel={handleCloseEditModal}
            isSubmitting={isSubmitting}
          />
        </Modal>
      </div>
    </div>
  )
}

export default Home