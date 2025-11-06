import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const TaskStats = ({ totalTasks, completedTasks, pendingTasks }) => {
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const stats = [
    {
      label: 'Total',
      value: totalTasks,
      icon: 'List',
      color: 'from-slate-500 to-slate-600',
      bgColor: 'from-slate-100 to-slate-200'
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: 'CheckCircle',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-100 to-green-200'
    },
    {
      label: 'Pending',
      value: pendingTasks,
      icon: 'Clock',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-100 to-orange-200'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Main progress section */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
          >
            TaskFlow
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600"
          >
            {totalTasks === 0 
              ? "Ready to start your productive day?"
              : `You have ${pendingTasks} ${pendingTasks === 1 ? 'task' : 'tasks'} remaining`
            }
          </motion.p>
        </div>

        {totalTasks > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            {/* Progress circle */}
            <div className="flex justify-center">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-accent"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${completionPercentage}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-slate-800">
                    {completionPercentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Progress text */}
            <p className="text-sm text-slate-600">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </motion.div>
        )}
      </div>

      {/* Stats grid */}
      {totalTasks > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center space-y-2"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.bgColor} flex items-center justify-center mx-auto`}>
                <ApperIcon 
                  name={stat.icon} 
                  size={20} 
                  className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
                />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-xs text-slate-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default TaskStats