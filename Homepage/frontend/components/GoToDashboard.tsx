"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

type Props = {
  dashboardUrl?: string
  view?: "login" | "signup" | "dashboard"
}

export default function GoToDashboard({ dashboardUrl, view }: Props) {
  const resolvedDashboardUrl =
    dashboardUrl || process.env.NEXT_PUBLIC_DASHBOARD_URL || (typeof window !== "undefined" && (window as any).__DASHBOARD_URL__) || "http://localhost:5173"

  const handleClick = () => {
    try {
      const returnTo = window.location.href
      const url = new URL(resolvedDashboardUrl)
      url.searchParams.set("return_to", returnTo)
      if (view) {
        url.searchParams.set("view", view)
      }
      window.location.href = url.toString()
    } catch (e) {
      const fallback = view ? `${resolvedDashboardUrl}?view=${encodeURIComponent(view)}` : resolvedDashboardUrl
      window.location.href = fallback
    }
  }

  return (
    <Button size="lg" onClick={handleClick} className="bg-white text-black hover:bg-gray-100">
      Protect My Business
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  )
}
