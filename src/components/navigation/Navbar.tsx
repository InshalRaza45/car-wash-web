import React, { useState, useEffect } from 'react'
import { BRAND_INFO } from '@/lib/constants'
import { Phone, Calendar, Menu, X } from 'lucide-react'

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#06080D]/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/80'
          : 'py-5 bg-gradient-to-b from-black/80 via-black/30 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* User Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <div className="relative w-12 h-12 rounded-xl bg-slate-950/80 border border-cyan-400/40 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 group-hover:border-cyan-300 transition-all">
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-wider text-white">
                CARCLEAN
              </span>
              <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 tracking-widest px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-800/40 shadow-sm">
                Studio
              </span>
            </div>
            <span className="text-[10px] font-sans text-slate-400 tracking-wide block">
              Premium Automotive Detailing
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono text-slate-300">
          <button
            onClick={() => scrollToSection('section-journey')}
            className="hover:text-cyan-400 transition-colors"
          >
            01. Story
          </button>
          <button
            onClick={() => scrollToSection('section-inspection')}
            className="hover:text-cyan-400 transition-colors"
          >
            02. 3D Inspection
          </button>
          <button
            onClick={() => scrollToSection('section-services')}
            className="hover:text-cyan-400 transition-colors"
          >
            03. Services
          </button>
          <button
            onClick={() => scrollToSection('section-before-after')}
            className="hover:text-cyan-400 transition-colors"
          >
            04. Before / After
          </button>
          <button
            onClick={() => scrollToSection('section-process')}
            className="hover:text-cyan-400 transition-colors"
          >
            05. Process
          </button>
          <button
            onClick={() => scrollToSection('section-washpark')}
            className="hover:text-cyan-400 transition-colors"
          >
            06. Wash Park
          </button>
          <button
            onClick={() => scrollToSection('section-fleet')}
            className="hover:text-cyan-400 transition-colors"
          >
            07. B2B Fleet
          </button>
          <button
            onClick={() => scrollToSection('section-about')}
            className="hover:text-cyan-400 transition-colors"
          >
            08. About
          </button>
        </nav>

        {/* Quick Contact & Action Buttons */}
        <div className="hidden md:flex items-center gap-3.5">
          <a
            href={`tel:${BRAND_INFO.contact.phoneRaw}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-400 border border-white/10 transition-all"
            title="Call Studio"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{BRAND_INFO.contact.phone}</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white text-xs font-mono font-bold hover:shadow-[0_0_25px_rgba(0,210,255,0.5)] transition-all hover:scale-105 active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07090F]/98 backdrop-blur-3xl border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-300">
            <button onClick={() => scrollToSection('section-journey')} className="p-3 bg-slate-900/70 rounded-xl text-left">
              01. Story
            </button>
            <button onClick={() => scrollToSection('section-inspection')} className="p-3 bg-slate-900/70 rounded-xl text-left">
              02. 3D Inspection
            </button>
            <button onClick={() => scrollToSection('section-services')} className="p-3 bg-slate-900/70 rounded-xl text-left">
              03. Services
            </button>
            <button onClick={() => scrollToSection('section-before-after')} className="p-3 bg-slate-900/70 rounded-xl text-left">
              04. Before / After
            </button>
            <button onClick={() => scrollToSection('section-process')} className="p-3 bg-slate-900/70 rounded-xl text-left">
              05. Process
            </button>
            <button onClick={() => scrollToSection('section-washpark')} className="p-3 bg-slate-900/70 rounded-xl text-left">
              06. Wash Park
            </button>
            <button onClick={() => scrollToSection('section-fleet')} className="p-3 bg-slate-900/70 rounded-xl text-left">
              07. B2B Fleet
            </button>
            <button onClick={() => scrollToSection('section-about')} className="p-3 bg-slate-900/70 rounded-xl text-left">
              08. About
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenBooking()
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
            <a
              href={`tel:${BRAND_INFO.contact.phoneRaw}`}
              className="w-full py-3 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono text-center flex items-center justify-center gap-2 border border-white/10"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{BRAND_INFO.contact.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
