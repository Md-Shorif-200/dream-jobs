"use client"
import { Button } from '@/components/ui/button'
import { logOutAction } from '@/features/auth/Server/use-case/session'
import React from 'react'

const EmployerDashboard = () => {
  return (
    <div>EmployerDashboard

      <Button onClick={logOutAction}>Log Out</Button>
    </div>
  )
}

export default EmployerDashboard