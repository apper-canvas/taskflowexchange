import tasksData from '@/services/mockData/tasks.json'

class TaskService {
  constructor() {
    this.storageKey = 'taskflow-tasks'
    this.initializeLocalStorage()
  }

  initializeLocalStorage() {
    const existingTasks = localStorage.getItem(this.storageKey)
    if (!existingTasks) {
      localStorage.setItem(this.storageKey, JSON.stringify(tasksData))
    }
  }

  getTasks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
        resolve([...tasks])
      }, 200)
    })
  }

  getTaskById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
        const task = tasks.find(t => t.Id === parseInt(id))
        if (task) {
          resolve({ ...task })
        } else {
          reject(new Error('Task not found'))
        }
      }, 150)
    })
  }

  createTask(taskData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
        const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0
        const newTask = {
          Id: maxId + 1,
          title: taskData.title,
          description: taskData.description || "",
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        tasks.push(newTask)
        localStorage.setItem(this.storageKey, JSON.stringify(tasks))
        resolve({ ...newTask })
      }, 300)
    })
  }

  updateTask(id, updates) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
        const taskIndex = tasks.findIndex(t => t.Id === parseInt(id))
        if (taskIndex !== -1) {
          tasks[taskIndex] = {
            ...tasks[taskIndex],
            ...updates,
            updatedAt: new Date().toISOString()
          }
          localStorage.setItem(this.storageKey, JSON.stringify(tasks))
          resolve({ ...tasks[taskIndex] })
        } else {
          reject(new Error('Task not found'))
        }
      }, 250)
    })
  }

  deleteTask(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
        const taskIndex = tasks.findIndex(t => t.Id === parseInt(id))
        if (taskIndex !== -1) {
          const deletedTask = tasks.splice(taskIndex, 1)[0]
          localStorage.setItem(this.storageKey, JSON.stringify(tasks))
          resolve({ ...deletedTask })
        } else {
          reject(new Error('Task not found'))
        }
      }, 200)
    })
  }

  toggleTaskCompletion(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
        const taskIndex = tasks.findIndex(t => t.Id === parseInt(id))
        if (taskIndex !== -1) {
          tasks[taskIndex].completed = !tasks[taskIndex].completed
          tasks[taskIndex].updatedAt = new Date().toISOString()
          localStorage.setItem(this.storageKey, JSON.stringify(tasks))
          resolve({ ...tasks[taskIndex] })
        } else {
          reject(new Error('Task not found'))
        }
      }, 150)
    })
  }

  clearAllTasks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(this.storageKey, JSON.stringify([]))
        resolve([])
      }, 200)
    })
  }
}

export default new TaskService()