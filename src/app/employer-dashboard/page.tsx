
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/features/auth/Server/auth.queries'
import { EmployerProfileCompletionStatus } from '@/features/employer/components/EmployerProfileStats'
import { EmployerStatsCard } from '@/features/employer/components/EmployerStatsCard'
// import { logOutAction } from '@/features/auth/Server/use-case/session'
import { redirect } from 'next/navigation'
import React from 'react'

const EmployerDashboard = async () => {
const user = await getCurrentUser();


  if (!user) return redirect("/log-in");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Hello, <span className="capitalize">{user?.name.toLowerCase()}</span>
        </h1>
        <p className="text-muted-foreground">
          Here is your daily activities and appLications
        </p>
      </div>

        <EmployerStatsCard />

         <EmployerProfileCompletionStatus />

      {/* <Button onClick={logOutAction}>Log Out</Button> */}
    </div>
  )
}

export default EmployerDashboard