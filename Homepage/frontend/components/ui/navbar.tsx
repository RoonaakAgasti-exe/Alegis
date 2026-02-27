"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

const AnimatedNavLink = ({
  href,
  index,
  children,
  onClick,
  setRef,
}: {
  href: string
  index: number
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string, idx: number) => void
  setRef: (el: HTMLAnchorElement | null, idx: number) => void
}) => {
  return (
    <a
      href={href}
      ref={(el) => setRef(el, index)}
      onClick={(e) => onClick(e, href, index)}
      className="text-sm text-gray-300 hover:text-white relative z-10 px-2 py-1 rounded-md"
    >
      {children}
    </a>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full")
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const navInlineRef = useRef<HTMLDivElement | null>(null)
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const [indicatorLeft, setIndicatorLeft] = useState(0)
  const [indicatorWidth, setIndicatorWidth] = useState(0)
  const [indicatorActive, setIndicatorActive] = useState(false)
  const [animKey, setAnimKey] = useState(0)

  const resolvedDashboardUrl =
    process.env.NEXT_PUBLIC_DASHBOARD_URL ||
    (typeof window !== "undefined" && (window as any).__DASHBOARD_URL__) ||
    "http://localhost:5173"

  const goToDashboard = (view?: "login" | "signup") => {
    try {
      const url = new URL(resolvedDashboardUrl)
      if (typeof window !== "undefined") {
        url.searchParams.set("return_to", window.location.href)
      }
      if (view) url.searchParams.set("view", view)
      window.location.href = url.toString()
    } catch {
      const fallback = view ? `${resolvedDashboardUrl}?view=${encodeURIComponent(view)}` : resolvedDashboardUrl
      window.location.href = fallback
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current)
    }

    if (isOpen) {
      setHeaderShapeClass("rounded-xl")
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full")
      }, 300)
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current)
      }
    }
  }, [isOpen])

  const logoElement = (
    <a
      href="/"
      aria-label="Home"
      className="relative w-7 h-7 flex items-center justify-center rounded-md overflow-hidden group"
    >
      <div className="absolute inset-0 rounded-md ring-1 ring-white/20 bg-gradient-to-br from-white/10 to-transparent group-hover:ring-white/30 transition-all"></div>
      <div className="absolute w-1.5 h-1.5 bg-blue-400/80 rounded-sm top-1 left-1 blur-[1px]"></div>
      <span className="relative text-[10px] font-semibold tracking-tight text-white/90">AL</span>
    </a>
  )

  const navLinksData = [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
  ]

  const setLinkRef = (el: HTMLAnchorElement | null, idx: number) => {
    linkRefs.current[idx] = el
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, idx: number) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      try {
        const target = document.querySelector(href) as HTMLElement | null
        if (target) {
          const headerEl = headerRef.current
          const headerRect = headerEl ? headerEl.getBoundingClientRect() : ({ height: 0 } as DOMRect)
          const headerHeight = (headerRect as any).height ?? 0
          const targetY = window.scrollY + target.getBoundingClientRect().top - headerHeight - 16
          window.scrollTo({ top: Math.max(targetY, 0), behavior: "smooth" })
        }
      } catch {
        location.hash = href.slice(1)
      }
    }

    const navEl = navInlineRef.current
    const linkEl = linkRefs.current[idx]
    if (navEl && linkEl) {
      const navRect = navEl.getBoundingClientRect()
      const linkRect = linkEl.getBoundingClientRect()
      const left = linkRect.left - navRect.left
      const width = linkRect.width
      setIndicatorLeft(left)
      setIndicatorWidth(width)
      setIndicatorActive(false)
      void navEl.offsetHeight
      setIndicatorActive(true)
      setAnimKey((k) => k + 1)
    }
  }

  

  return (
    <header
      ref={headerRef}
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20
                       flex flex-col items-center
                       pl-6 pr-6 py-3 backdrop-blur-sm
                       ${headerShapeClass}
                       border border-[#333] bg-[#1f1f1f57]
                       w-[calc(100%-2rem)] sm:w-auto
                       transition-[border-radius] duration-0 ease-in-out`}
    >
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <div className="flex items-center">{logoElement}</div>

        <div className="hidden sm:flex items-center text-sm relative" ref={navInlineRef}>
          <span
            key={animKey}
            className="absolute left-0 top-0 h-full bg-white/5 rounded-md transition-transform duration-300 ease-out pointer-events-none"
            style={{
              width: `${indicatorWidth}px`,
              transform: `translateX(${indicatorLeft}px) scaleY(${indicatorActive ? 1 : 0})`,
              transformOrigin: "top",
            }}
          />
          <div className="flex items-center space-x-4 sm:space-x-6">
            {navLinksData.map((link, idx) => (
              <AnimatedNavLink
                key={link.href}
                href={link.href}
                index={idx}
                setRef={setLinkRef}
                onClick={handleNavClick}
              >
                {link.label}
              </AnimatedNavLink>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 sm:gap-3" />

        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      <div
        className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? "max-h-[1000px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => setLinkRef(el, idx)}
              onClick={(e) => {
                handleNavClick(e, link.href, idx)
                setIsOpen(false)
              }}
              className="text-gray-300 hover:text-white transition-colors w-full text-center py-2"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-4 w-full" />
      </div>
    </header>
  )
}
