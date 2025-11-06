import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout