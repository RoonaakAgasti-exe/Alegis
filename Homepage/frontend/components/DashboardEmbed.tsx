"use client"

type Props = {
  src?: string
  title?: string
  height?: string
}

export default function DashboardEmbed({ src = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:5173", title = "Dashboard", height = "800px" }: Props) {
  const resolved = typeof window !== "undefined" && (window as any).__DASHBOARD_URL__ ? (window as any).__DASHBOARD_URL__ : src

  return (
    <div style={{ width: "100%", height }}>
      <iframe
        title={title}
        src={resolved}
        style={{ width: "100%", height: "100%", border: "none" }}
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
      />
    </div>
  )
}
